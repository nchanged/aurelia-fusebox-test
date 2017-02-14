/*eslint dot-notation:0*/
import { Origin } from 'aurelia-metadata';
import { TemplateRegistryEntry, Loader } from 'aurelia-loader';
import { TextTemplateLoader } from './text-template-loader';
import { PLATFORM } from 'aurelia-pal';

function ensureOriginOnExports(executed, name) {
  let target = executed;
  let key;
  let exportedValue;

  if (target.__useDefault) {
    target = target['default'];
  }

  Origin.set(target, new Origin(name, 'default'));

  for (key in target) {
    exportedValue = target[key];

    if (typeof exportedValue === 'function') {
      Origin.set(exportedValue, new Origin(name, key));
    }
  }

  return executed;
}


function debugPrint(title, args) {
  console.log('[DEBUG]:' + title,args);
}



/**
* A default implementation of the Loader abstraction which works with SystemJS, RequireJS and Dojo Loader.
*/
export class FuseAureliaLoader extends Loader {
  /**
  * The name of the underlying native loader plugin used to load text.
  */
  textPluginName = 'text';
  loaderPlugins = Object.create(null);



  /**
  * Creates an instance of the DefaultLoader.
  */
  constructor() {
    super();
    this.moduleRegistry = Object.create(null);
    this.useTemplateLoader(new TextTemplateLoader());

    let that = this;

    this.addPlugin('template-registry-entry', {
      'fetch': function (address) {
        debugPrint('template-registry-entry- fetch =>', address)
        let entry = that.getOrCreateTemplateRegistryEntry(address);
        return entry.templateIsLoaded ? entry : that.templateLoader.loadTemplate(that, entry).then(x => entry);
      }
    });

  }



  /**
  * Instructs the loader to use a specific TemplateLoader instance for loading templates
  * @param templateLoader The instance of TemplateLoader to use for loading templates.
  */
  useTemplateLoader(templateLoader) {
    this.templateLoader = templateLoader;
  }



  /**
  * Loads a collection of modules.
  * @param ids The set of module ids to load.
  * @return A Promise for an array of loaded modules.
  */
  loadAllModules(ids): Promise {
    debugPrint("loadAllModules => ", arguments);
    let loads = [];

    for (let i = 0, ii = ids.length; i < ii; ++i) {
      let item = ids[i];
       if(item.endsWith(".html")) {
         loads.push(this._import(item));
       }else{
        loads.push(this.loadModule(item));
      }

    }

    return Promise.all(loads);
  }



  /**
  * Loads a template.
  * @param url The url of the template to load.
  * @return A Promise for a TemplateRegistryEntry containing the template.
  */
  loadTemplate(url): Promise {
    debugPrint("loadTemplate => ", arguments);
    return this._import(this.applyPluginToUrl(url, 'template-registry-entry'));
  }



  /**
  * Loads a text-based resource.
  * @param url The url of the text file to load.
  * @return A Promise for text content.
  */
  loadText(url): Promise {
    debugPrint("loadText => ", arguments);
    return Promise.resolve(this.loadWithFusebox(this.findFuseBoxPath(url))).then(textOrModule => {
      if (typeof textOrModule === 'string') {
        return textOrModule;
      }
      return textOrModule['default'];
    })

  }



  /**
  * Loads a module.
  * @param id The module id to normalize.
  * @return A Promise for the loaded module.
  */
  loadModule(id) {
    debugPrint("loadModule => ", arguments);
    let module = this.loadWithFusebox(this.findFuseBoxPath(id));
    module = ensureOriginOnExports(module, id);
    return Promise.resolve(module);
  }



  /**
  * Registers a plugin with the loader.
  * @param pluginName The name of the plugin.
  * @param implementation The plugin implementation.
  */
  addPlugin(pluginName, implementation) {
    debugPrint("loadModule => ", arguments);
    if (!this.loaderPlugins[pluginName]) {
      this.loaderPlugins[pluginName] = implementation;
    }

  }



  /**
  * Normalizes a module id.
  * @param moduleId The module id to normalize.
  * @param relativeTo What the module id should be normalized relative to.
  * @return A promise for the normalized module id.
  */
  normalize(moduleId, relativeTo) {
    debugPrint("normalize =>", arguments);
    return Promise.resolve(moduleId);
  }



  /**
  * Maps a module id to a source.
  * @param id The module id.
  * @param source The source to map the module to.
  */
  map(id, source) {
    debugPrint("map =>", arguments);
  }



  _import(address) {
    const addressParts = address.split('!');
    const moduleId = addressParts.splice(addressParts.length - 1, 1)[0];
    const loaderPlugin = addressParts.length === 1 ? addressParts[0] : null;

    if (loaderPlugin) {
      const plugin = this.loaderPlugins[loaderPlugin];
      if (!plugin) {
        throw new Error(`Plugin ${loaderPlugin} is not registered in the loader.`);
      }
      return Promise.resolve(plugin.fetch(moduleId));
    }
    //throw new Error(`Unable to find module with ID: ${moduleId}`);
    return null
  }



  /**
  * Alters a module id so that it includes a plugin loader.
  * @param url The url of the module to load.
  * @param pluginName The plugin to apply to the module id.
  * @return The plugin-based module id.
  */
  applyPluginToUrl(url, pluginName) {
    debugPrint("applyPluginToUrl =>", arguments);
    return `${pluginName}!${url}`;
  }


  // returns result
  loadWithFusebox(args){
    return FuseBox.import(args);
  }


  // temp fix for bug
  fuseBoxExist(id) {
    let result = false;
    try {
      result = FuseBox.exists(id);
    } catch (e) { result = false }
    return result;
  }



  //finds correct path to use
  findFuseBoxPath(path){
    let retunValue;
    let modulePart;
    switch (true) {
      
      
      case path.startsWith("html-resource-plugin!"):
        retunValue = path; // this should never trigger loadmodule should catch this...
        debugPrint("WHY!", arguments)
        break;
      
      
      case path.startsWith("css-resource-plugin!"):
        
        path = path.replace("css-resource-plugin!", "")
        
        modulePart = path.split("/")[0];
        
        switch (true) {
          case this.fuseBoxExist(path):
            retunValue = path;
            break;
          case this.fuseBoxExist('~/' + path):
            retunValue = '~/' + path;
            break
          case this.fuseBoxExist(path.replace(modulePart, modulePart + "/dist/commonjs")):
            retunValue = path.replace(modulePart, modulePart + "/dist/commonjs");
            break;
          default:
            debugPrint("findFuseBoxPath() failed to find", arguments)
        }
        break;
      
      
      case path.includes("/"):

        // package path, lets test where it is
        modulePart = path.split("/")[0];
        switch (true) {
          case this.fuseBoxExist(path):// exsist sometimes fails...
            retunValue = path;
            break;
          case this.fuseBoxExist('~/' + path):
            retunValue = '~/' + path;
            break
          case this.fuseBoxExist(path.replace(modulePart, modulePart + "/dist/commonjs")):
            retunValue = path.replace(modulePart, modulePart + "/dist/commonjs");
            break;
          default:

            debugPrint("findFuseBoxPath() failed to find", arguments)
        }
        break;

      default:

        //default
        switch (true) {
          case this.fuseBoxExist(path):
            retunValue = path;
            break;
          case this.fuseBoxExist('~/' + path):
            retunValue = '~/' + path;
            break;
          default:
            debugPrint("findFuseBoxPath() failed to find", arguments)

        }
    }

    return retunValue;
  }


}

PLATFORM.Loader = FuseAureliaLoader;