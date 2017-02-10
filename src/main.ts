import  "aurelia-framework"
import {bootstrap} from 'aurelia-bootstrapper';



bootstrap(async aurelia => {
  debugger;
  aurelia.use
    .standardConfiguration()
    .developmentLogging();
  await aurelia.start();
  aurelia.setRoot('app', document.body);
});