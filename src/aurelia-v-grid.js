(function(FuseBox){
var __fsbx_css = function(__filename, contents) {
    if (FuseBox.isServer) {
        return;
    }
    var styleId = __filename.replace(/[\.\/]+/g, "-");
    if (styleId.charAt(0) === '-') styleId = styleId.substring(1);
    var exists = document.getElementById(styleId);
    if (!exists) {
        //<link href="//fonts.googleapis.com/css?family=Covered+By+Your+Grace" rel="stylesheet" type="text/css">
        var s = document.createElement(contents ? "style" : "link");
        s.id = styleId;
        s.type = "text/css";
        if (contents) {
            s.innerHTML = contents;
        } else {
            s.rel = "stylesheet";
            s.href = __filename;
        }
        document.getElementsByTagName("head")[0].appendChild(s);
    } else {
        if (contents) {
            exists.innerHTML = contents;
        }
    }
}
FuseBox.on("async", function(name) {
    if (FuseBox.isServer) {
        return;
    }
    if (/\.css$/.test(name)) {
        __fsbx_css(name);
        return false;
    }
});
FuseBox.pkg("aurelia-v-grid", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){ 

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./interfaces"));
var prefix = './grid';
function configure(config) {
    config.globalResources(prefix + '/attributes/v-filter', prefix + '/attributes/v-filter-observer', prefix + '/attributes/v-sort', prefix + '/attributes/v-image', prefix + '/attributes/v-drag-drop-col', prefix + '/attributes/v-changed', prefix + '/attributes/v-data-handler', prefix + '/attributes/v-resize-col', prefix + '/attributes/v-menu', prefix + '/attributes/v-selection', prefix + '/v-grid-row-repeat', prefix + '/v-grid-group-row', prefix + '/v-grid-group-element', prefix + '/v-grid-loadingscreen', prefix + '/v-grid-contextmenu', prefix + '/v-grid-footer', prefix + '/v-grid-col', prefix + '/v-grid');
}
exports.configure = configure;

});
___scope___.file("interfaces.js", function(exports, require, module, __filename, __dirname){ 

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("aurelia-framework"));
var htmlCache_1 = require("./grid/htmlCache");
exports.HtmlCache = htmlCache_1.HtmlCache;
var controller_1 = require("./grid/controller");
exports.Controller = controller_1.Controller;
var mainMarkup_1 = require("./grid/mainMarkup");
exports.MainMarkup = mainMarkup_1.MainMarkup;
var mainScrollEvents_1 = require("./grid/mainScrollEvents");
exports.MainScrollEvents = mainScrollEvents_1.MainScrollEvents;
var rowMarkup_1 = require("./grid/rowMarkup");
exports.RowMarkup = rowMarkup_1.RowMarkup;
var rowScrollEvents_1 = require("./grid/rowScrollEvents");
exports.RowScrollEvents = rowScrollEvents_1.RowScrollEvents;
var columnMarkup_1 = require("./grid/columnMarkup");
exports.ColumnMarkup = columnMarkup_1.ColumnMarkup;
var htmlHeightWidth_1 = require("./grid/htmlHeightWidth");
exports.HtmlHeightWidth = htmlHeightWidth_1.HtmlHeightWidth;
var viewSlots_1 = require("./grid/viewSlots");
exports.ViewSlots = viewSlots_1.ViewSlots;
var columnBindingContext_1 = require("./grid/columnBindingContext");
exports.ColumnBindingContext = columnBindingContext_1.ColumnBindingContext;
var rowDataBinder_1 = require("./grid/rowDataBinder");
exports.RowDataBinder = rowDataBinder_1.RowDataBinder;
var rowClickHandler_1 = require("./grid/rowClickHandler");
exports.RowClickHandler = rowClickHandler_1.RowClickHandler;
var groupingElements_1 = require("./grid/groupingElements");
exports.GroupingElements = groupingElements_1.GroupingElements;
var loadingScreen_1 = require("./grid/loadingScreen");
exports.LoadingScreen = loadingScreen_1.LoadingScreen;
var contextMenu_1 = require("./grid/contextMenu");
exports.ContextMenu = contextMenu_1.ContextMenu;
var v_grid_1 = require("./grid/v-grid");
exports.VGrid = v_grid_1.VGrid;
var gridConnector_1 = require("./gridConnector");
exports.GridConnector = gridConnector_1.GridConnector;
var dataSource_1 = require("./dataSource");
exports.DataSource = dataSource_1.DataSource;
var selection_1 = require("./selection");
exports.Selection = selection_1.Selection;
var arrayFilter_1 = require("./utils/arrayFilter");
exports.ArrayFilter = arrayFilter_1.ArrayFilter;
var arraySort_1 = require("./utils/arraySort");
exports.ArraySort = arraySort_1.ArraySort;
var arrayGrouping_1 = require("./utils/arrayGrouping");
exports.ArrayGrouping = arrayGrouping_1.ArrayGrouping;
var footer_1 = require("./grid/footer");
exports.Footer = footer_1.Footer;

});
___scope___.file("grid/htmlCache.js", function(exports, require, module, __filename, __dirname){ 

var HtmlCache = (function () {
    function HtmlCache(element) {
        this.element = element;
        this.avg_top_panel = null;
        this.avg_header = null;
        this.avg_header_left = null;
        this.avg_header_main = null;
        this.avg_header_main_scroll = null;
        this.avg_header_right = null;
        this.avg_content = null;
        this.avg_content_left = null;
        this.avg_content_left_scroll = null;
        this.avg_content_main = null;
        this.avg_content_main_scroll = null;
        this.avg_content_right = null;
        this.avg_content_right_scroll = null;
        this.avg_footer = null;
        this.avg_content_group = null;
        this.avg_content_group_scroll = null;
        this.avg_content_vhandle = null;
        this.avg_content_vhandle_scroll = null;
        this.avg_content_hhandle = null;
        this.avg_content_hhandle_scroll = null;
        this.avg_left_rows = null;
        this.avg_main_rows = null;
        this.avg_right_rows = null;
        this.avg_group_rows = null;
        this.rowCache = [];
        this.headerCache = {
            left: null,
            main: null,
            right: null,
            group: null,
            bindingContext: null,
            overrideContext: null,
            leftRowViewSlot: null,
            mainRowViewSlot: null,
            rightRowViewSlot: null,
            groupRowViewSlot: null
        };
    }
    HtmlCache.prototype.updateRowsMarkup = function () {
        this.avg_left_rows = this.avg_content_left_scroll.getElementsByTagName('avg-row');
        this.avg_main_rows = this.avg_content_main_scroll.getElementsByTagName('avg-row');
        this.avg_right_rows = this.avg_content_right_scroll.getElementsByTagName('avg-row');
        this.avg_group_rows = this.avg_content_group_scroll.getElementsByTagName('avg-row');
    };
    HtmlCache.prototype.updateMainMarkup = function () {
        this.avg_top_panel = this.element.getElementsByTagName('avg-top-panel')[0];
        this.avg_header = this.element.getElementsByTagName('avg-header')[0];
        this.avg_header_left = this.element.getElementsByTagName('avg-header-left')[0];
        this.avg_header_main = this.element.getElementsByTagName('avg-header-main')[0];
        this.avg_header_main_scroll = this.element.getElementsByTagName('avg-header-main-scroll')[0];
        this.avg_header_right = this.element.getElementsByTagName('avg-header-right')[0];
        this.avg_content = this.element.getElementsByTagName('avg-content')[0];
        this.avg_content_left = this.element.getElementsByTagName('avg-content-left')[0];
        this.avg_content_left_scroll = this.element.getElementsByTagName('avg-content-left-scroll')[0];
        this.avg_content_main = this.element.getElementsByTagName('avg-content-main')[0];
        this.avg_content_main_scroll = this.element.getElementsByTagName('avg-content-main-scroll')[0];
        this.avg_content_right = this.element.getElementsByTagName('avg-content-right')[0];
        this.avg_content_right_scroll = this.element.getElementsByTagName('avg-content-right-scroll')[0];
        this.avg_footer = this.element.getElementsByTagName('avg-footer')[0];
        this.avg_content_group = this.element.getElementsByTagName('avg-content-group')[0];
        this.avg_content_group_scroll = this.element.getElementsByTagName('avg-content-group-scroll')[0];
        this.avg_content_vhandle = this.element.getElementsByTagName('avg-content-vhandle')[0];
        this.avg_content_vhandle_scroll = this.element.getElementsByTagName('avg-content-vhandle-scroll')[0];
        this.avg_content_hhandle = this.element.getElementsByTagName('avg-content-hhandle')[0];
        this.avg_content_hhandle_scroll = this.element.getElementsByTagName('avg-content-hhandle-scroll')[0];
    };
    return HtmlCache;
}());
exports.HtmlCache = HtmlCache;

});
___scope___.file("grid/controller.js", function(exports, require, module, __filename, __dirname){ 

var Controller = (function () {
    function Controller(vGrid) {
        this.vGrid = vGrid;
        this.element = vGrid.element;
    }
    Controller.prototype.getContext = function () {
        var c = this.vGrid;
        this.colConfig = c.colConfig;
        this.backupColConfig = c.backupColConfig;
        this.colRepeater = c.colRepeater;
        this.colGroupRow = c.colGroupRow;
        this.colGroupElement = c.colGroupElement;
        this.colRepeatRowTemplate = c.colRepeatRowTemplate;
        this.colRepeatRowHeaderTemplate = c.colRepeatRowHeaderTemplate;
        this.customMenuTemplates = c.customMenuTemplates;
        this.loadingScreenTemplate = c.loadingScreenTemplate;
        this.footerTemplate = c.footerTemplate;
        this.viewCompiler = c.viewCompiler;
        this.container = c.container;
        this.viewResources = c.viewResources;
        this.taskQueue = c.taskQueue;
        this.htmlCache = c.htmlCache;
        this.htmlHeightWidth = c.htmlHeightWidth;
        this.viewSlots = c.viewSlots;
        this.columnBindingContext = c.columnBindingContext;
        this.rowDataBinder = c.rowDataBinder;
        this.mainMarkup = c.mainMarkup;
        this.mainScrollEvents = c.mainScrollEvents;
        this.rowMarkup = c.rowMarkup;
        this.rowScrollEvents = c.rowScrollEvents;
        this.rowClickHandler = c.rowClickHandler;
        this.htmlcolumnMarkupCache = c.columnMarkup;
        this.columnMarkup = c.columnMarkup;
        this.groupingElements = c.groupingElements;
        this.loadingScreen = c.loadingScreen;
        this.contextMenu = c.contextMenu;
        this.footer = c.footer;
        this.bindingContext = c.bindingContext;
        this.overrideContext = c.overrideContext;
        this.attRowHeight = c.attRowHeight;
        this.attHeaderHeight = c.attHeaderHeight;
        this.attFooterHeight = c.attFooterHeight;
        this.attPanelHeight = c.attPanelHeight;
        this.attMultiSelect = c.attMultiSelect;
        this.attManualSelection = c.attManualSelection;
        this.attGridConnector = c.attGridConnector;
        this.attOnRowDraw = c.attOnRowDraw;
        this.attI18N = c.attI18N;
        this.attDataDelay = c.attDataDelay;
        this.attVariableRowHeight = c.attVariableRowHeight;
    };
    Controller.prototype.triggerI18N = function () {
        var _this = this;
        var keys = Object.keys({
            close: 'Close',
            pinLeft: 'Pin left',
            pinRight: 'Pin Right',
            groupBy: 'Group By',
            sortAscending: 'Sort Ascending',
            sortDescending: 'Sort Descending',
            showAll: 'Show All',
            clearCurrent: 'Clear Current',
            clearAll: 'Clear All',
            chooseOperator: 'Choose Operator',
            back: 'Back',
            equals: 'Equals',
            lessThanOrEqual: 'Less than or equal',
            greaterThanOrEqual: 'Greater than or equal',
            lessThan: 'Less than',
            greaterThan: 'Greater than',
            contains: 'Contains',
            notEqualTo: 'Not equal to',
            doesNotContain: 'Does not contain',
            beginsWith: 'Begins with',
            endsWith: 'Ends with',
            loading: 'loading'
        });
        if (this.attI18N) {
            keys.forEach(function (key) {
                if (_this.vGrid.filterOperatorTranslationKeys[key]) {
                    _this.vGrid.filterOperatorNames[_this.vGrid.filterOperatorTranslationKeys[key]] = _this.attI18N(key);
                }
                _this.contextMenu.updateMenuStrings(key, _this.attI18N(key));
            });
            this.raiseEvent('filterTranslation', {});
            var loading = this.attI18N('loading') || keys.loading;
            this.loadingScreen.updateLoadingDefaultLoadingMessage(loading);
        }
    };
    Controller.prototype.getRowHeightState = function () {
        return this.attGridConnector.getRowHeightState();
    };
    Controller.prototype.createGrid = function () {
        if (this.attI18N) {
            this.triggerI18N();
        }
        this.htmlHeightWidth.addDefaultsAttributes(this.attHeaderHeight, this.attRowHeight, this.attFooterHeight, this.attPanelHeight);
        this.htmlHeightWidth.setWidthFromColumnConfig(this.colConfig);
        this.mainMarkup.generateMainMarkup();
        this.htmlCache.updateMainMarkup();
        this.rowDataBinder.init();
        this.mainScrollEvents.init();
        this.rowMarkup.init(this.attRowHeight);
        this.htmlCache.updateRowsMarkup();
        this.rowScrollEvents.init(this.attRowHeight, this.attDataDelay, this.attVariableRowHeight);
        this.columnMarkup.init(this.colConfig, this.overrideContext, this.colRepeater, this.colRepeatRowTemplate, this.colRepeatRowHeaderTemplate, this.colGroupRow);
        this.rowClickHandler.init(this.attMultiSelect, this.attManualSelection, this);
        this.groupingElements.init(this, this.colGroupElement);
        this.loadingScreen.init(this.overrideContext, this.loadingScreenTemplate);
        this.footer.init(this.overrideContext, this.footerTemplate);
        this.contextMenu.init(this.customMenuTemplates, this.overrideContext);
    };
    Controller.prototype.getElement = function (rowNumber, isDownScroll, callbackFN) {
        var _this = this;
        this.attGridConnector.getElement({
            row: rowNumber,
            isDown: isDownScroll,
            callback: function (rowContext) {
                if (_this.attOnRowDraw) {
                    _this.attOnRowDraw(rowContext);
                }
                callbackFN(rowContext);
            }
        });
    };
    Controller.prototype.expandGroup = function (id) {
        this.attGridConnector.expandGroup(id);
    };
    Controller.prototype.collapseGroup = function (id) {
        this.attGridConnector.collapseGroup(id);
    };
    Controller.prototype.select = function (row) {
        this.attGridConnector.select(row);
    };
    Controller.prototype.addToGrouping = function (groupObj) {
        var currentGrouping = this.attGridConnector.getGrouping();
        var exist = false;
        currentGrouping.forEach(function (group) {
            if (group.field === groupObj.field) {
                exist = true;
            }
        });
        if (!exist) {
            currentGrouping.push(groupObj);
            this.attGridConnector.group(currentGrouping, true);
        }
    };
    Controller.prototype.removeFromGrouping = function (field) {
        var currentGrouping = this.attGridConnector.getGrouping();
        var index = -1;
        currentGrouping.forEach(function (group, i) {
            if (field === group.field) {
                index = i;
            }
        });
        if (index !== -1) {
            currentGrouping.splice(index, 1);
            this.attGridConnector.group(currentGrouping, true);
        }
    };
    Controller.prototype.getSelectionContext = function () {
        var sel = this.attGridConnector.getSelection();
        return sel;
    };
    Controller.prototype.raiseEvent = function (name, data) {
        if (data === void 0) { data = {}; }
        var event = new CustomEvent(name, {
            detail: data,
            bubbles: true
        });
        this.element.dispatchEvent(event);
    };
    Controller.prototype.setLoadingScreen = function (value, msg, collectionLength) {
        if (value) {
            return this.loadingScreen.enable(msg, collectionLength);
        }
        else {
            return this.loadingScreen.disable();
        }
    };
    Controller.prototype.updateHeights = function () {
        var totalRowHeight = this.htmlHeightWidth.getNewHeight(this.attGridConnector.getDatasourceLength());
        var bodyHeight = this.htmlCache.avg_content_main.clientHeight;
        if (bodyHeight < totalRowHeight) {
            this.htmlCache.avg_content_vhandle.style.display = 'block';
        }
        else {
            this.htmlCache.avg_content_vhandle.style.display = 'none';
        }
        this.rowScrollEvents.setCollectionLength(this.attGridConnector.getDatasourceLength());
        this.htmlHeightWidth.setCollectionLength(this.attGridConnector.getDatasourceLength(), bodyHeight < totalRowHeight);
    };
    Controller.prototype.udateHorizontalScroller = function () {
        var bodyWidth = this.htmlCache.avg_content_main.clientWidth;
        var scrollWidth = this.htmlHeightWidth.avgContentMainScroll_Width;
        if (bodyWidth < scrollWidth) {
            this.htmlCache.avg_content_hhandle.style.display = 'block';
            this.htmlHeightWidth.setCollectionLength(this.collectionLength(), true);
        }
        else {
            this.htmlCache.avg_content_hhandle.style.display = 'none';
            this.htmlHeightWidth.setCollectionLength(this.collectionLength(), false);
        }
    };
    Controller.prototype.updateHeaderGrouping = function (groups) {
        var _this = this;
        var length = groups.length;
        this.columnBindingContext.setupgrouping = length;
        if (length === 0) {
            var groupings = this.groupingElements.getGroups();
            groupings.forEach(function (group) {
                _this.groupingElements.removeGroup(group.field);
            });
        }
        else {
            var check_1 = true;
            groups.forEach(function (group) {
                if (!_this.groupingElements[group.field]) {
                    check_1 = false;
                }
            });
            if (!check_1) {
                var groupings = this.groupingElements.getGroups();
                groupings.forEach(function (group) {
                    _this.groupingElements.removeGroup(group);
                });
                groups.forEach(function (group) {
                    _this.groupingElements.addGroup(group.title, group.field);
                });
            }
        }
        this.htmlHeightWidth.adjustWidthsColumns(this.columnBindingContext, length);
    };
    Controller.prototype.collectionLength = function () {
        return this.attGridConnector.getDatasourceLength();
    };
    Controller.prototype.triggerScroll = function (position) {
        if (position === null || position === undefined) {
            position = this.htmlCache.avg_content_vhandle.scrollTop;
        }
        else {
            this.htmlCache.avg_content_vhandle.scrollTop = position;
            this.htmlCache.avg_content_left.scrollTop = position;
            this.htmlCache.avg_content_main.scrollTop = position;
            this.htmlCache.avg_content_right.scrollTop = position;
        }
        this.raiseEvent('avg-scroll', {
            isScrollBarScrolling: true,
            isDown: true,
            newTopPosition: position
        });
    };
    Controller.prototype.getTopRow = function () {
        var position = this.htmlCache.avg_content_vhandle.scrollTop;
        return Math.floor(position / this.attRowHeight);
    };
    Controller.prototype.rebindAllRows = function () {
        this.raiseEvent('avg-rebind-all-rows', {
            rowCache: this.htmlCache.rowCache,
            downScroll: true
        });
    };
    Controller.prototype.getColumnConfig = function () {
        var colContext = this.columnBindingContext;
        var tempArray = [];
        for (var i = 0; i < this.colConfig.length; i++) {
            switch (true) {
                case colContext.setupleft[i].show:
                    tempArray.push({
                        no: i,
                        set: 1,
                        colPinLeft: true,
                        colPinRight: false,
                        left: colContext.setupleft[i].left - 10000,
                        width: colContext.setupleft[i].width
                    });
                    break;
                case colContext.setupmain[i].show:
                    tempArray.push({
                        no: i,
                        set: 2,
                        colPinLeft: false,
                        colPinRight: false,
                        left: colContext.setupmain[i].left,
                        width: colContext.setupmain[i].width
                    });
                    break;
                case colContext.setupright[i].show:
                    tempArray.push({
                        no: i,
                        set: 3,
                        colPinLeft: false,
                        colPinRight: true,
                        left: colContext.setupright[i].left + 10000,
                        width: colContext.setupright[i].width
                    });
                    break;
                default:
            }
        }
        var newColConfig = [];
        this.colConfig.forEach(function (col, i) {
            var temp = {
                colWidth: tempArray[i].width,
                colRowTemplate: col.colRowTemplate,
                colHeaderTemplate: col.colHeaderTemplate,
                colField: col.colField ? col.colField.replace('rowRef.', '') : col.colField,
                colPinLeft: tempArray[i].colPinLeft,
                colPinRight: tempArray[i].colPinRight,
                colHeaderName: col.colHeaderName,
                colAddLabelAttributes: col.colAddLabelAttributes,
                colAddFilterAttributes: col.colAddFilterAttributes,
                colAddRowAttributes: col.colAddRowAttributes,
                colSort: col.colSort,
                colDisplayEdit: col.colDisplayEdit,
                colFilter: col.colFilter,
                colFilterTop: col.colFilterTop,
                colCss: col.colCss,
                colType: col.colType,
                __colSortHelper: tempArray[i].left,
            };
            newColConfig.push(temp);
        });
        newColConfig.sort(function (a, b) {
            return a.__colSortHelper - b.__colSortHelper;
        });
        return newColConfig;
    };
    Controller.prototype.setColumnConfig = function (colConfig) {
        var length = this.columnBindingContext.setupgrouping;
        this.viewSlots.unbindAndDetachColumns();
        this.columnBindingContext.clear();
        this.viewSlots.clear();
        this.colConfig = colConfig || this.backupColConfig;
        this.columnMarkup.init(this.colConfig, this.overrideContext, this.colRepeater, this.colRepeatRowTemplate, this.colRepeatRowHeaderTemplate, this.colGroupRow);
        this.viewSlots.bindAndAttachColumns(this.overrideContext, this.columnBindingContext, this.attGridConnector.getSelection());
        this.htmlHeightWidth.setWidthFromColumnConfig(this.colConfig);
        this.columnBindingContext.setupgrouping = length;
        this.htmlHeightWidth.adjustWidthsColumns(this.columnBindingContext, length);
        this.udateHorizontalScroller();
        this.rebindAllRows();
    };
    return Controller;
}());
exports.Controller = Controller;

});
___scope___.file("grid/mainMarkup.js", function(exports, require, module, __filename, __dirname){ 

var aurelia_framework_1 = require("aurelia-framework");
var mainMarkupHtmlString_1 = require("./mainMarkupHtmlString");
var MainMarkup = (function () {
    function MainMarkup(element, viewCompiler, container, viewResources, htmlHeightWidth, viewSlots) {
        this.element = element;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.htmlHeightWidth = htmlHeightWidth;
        this.viewSlots = viewSlots;
    }
    MainMarkup.prototype.generateMainMarkup = function () {
        this.viewFactory = this.viewCompiler.compile('<template>' + mainMarkupHtmlString_1.MainMarkupHtmlString + '</template>', this.viewResources);
        this.view = this.viewFactory.create(this.container);
        this.viewSlots.mainViewSlot = new aurelia_framework_1.ViewSlot(this.element, true);
        this.viewSlots.mainViewSlot.add(this.view);
        this.viewSlots.mainViewSlot.bind(this, {
            bindingContext: this,
            parentOverrideContext: this.htmlHeightWidth
        });
        this.viewSlots.mainViewSlot.attached();
    };
    return MainMarkup;
}());
exports.MainMarkup = MainMarkup;

});
___scope___.file("grid/mainMarkupHtmlString.js", function(exports, require, module, __filename, __dirname){ 

exports.MainMarkupHtmlString = "\n        <avg-top-panel v-drag-drop-col class=\"avg-top-panel\" css=\"height:$au{avgPanel_Height}px\">\n\n        </avg-top-panel>\n\n        <avg-header class=\"avg-header\" css=\"height:$au{avgHeader_Height}px;top:$au{avgHeader_Top}px\">\n\n          <avg-header-left class=\"avg-header-left\" css=\"width:$au{avgHeaderLeft_Width}px\">\n           </avg-header-left>  \n\n           <avg-header-main class=\"avg-header-main\" css=\"left:$au{avgHeaderMain_Left}px;right:$au{avgHeaderMain_Right}px\">\n             <avg-header-main-scroll css=\"width:$au{avgHeaderMainScroll_Width}px;height:$au{avgHeaderMainScroll_Height}px\"> \n             </avg-header-main-scroll> \n           </avg-header-main> \n\n           <avg-header-right class=\"avg-header-right\" css=\"right:$au{avgHeaderRight_Right}px;width:$au{avgHeaderRight_Width}px\">\n           </avg-header-right> \n\n        </avg-header>\n\n        <avg-content class=\"avg-content\" css=\"top:$au{avgContent_Top}px;bottom:$au{avgContent_Bottom}px\">\n           \n            <avg-content-left  class=\"avg-content-left\" css=\"width:$au{avgContentLeft_Width}px\">\n              <avg-content-left-scroll css=\"width:$au{avgContentLeftScroll_Width};height:$au{avgContentLeftScroll_Height}px\">  \n              </avg-content-left-scroll> \n            </avg-content-left>  \n\n            <avg-content-main  class=\"avg-content-main\" css=\"left:$au{avgContentMain_Left}px;right:$au{avgContentMain_Right}px\">\n              <avg-content-main-scroll css=\"min-width: 100%;width:$au{avgContentMainScroll_Width}px;height:$au{avgContentMainScroll_Height}px\"> \n              </avg-content-main-scroll> \n            </avg-content-main> \n\n            <avg-content-right  class=\"avg-content-right\" css=\"right:$au{avgContentRight_Right}px;width:$au{avgContentRight_Width}px\">\n              <avg-content-right-scroll css=\"width:$au{avgContentRightScroll_Width};height:$au{avgContentRightScroll_Height}px\">  \n              </avg-content-right-scroll> \n            </avg-content-right>  \n            \n        </avg-content>\n\n       <avg-footer class=\"avg-footer\" css=\"height:$au{avgFooter_Height}px\">\n       </avg-footer> \n\n       <avg-content-group css=\"left:0;right:0;top:$au{avgContentGroup_Top}px;bottom:$au{avgContentGroup_Bottom}px\">\n          <avg-content-group-scroll css=\"left:0;right:0;height:$au{avgContentGroup_Height}px\">  \n          </avg-content-group-scroll> \n        </avg-content-group> \n\n        <avg-content-vhandle css=\"right:0;bottom:$au{avgContentVhandle_Bottom}px;right:$au{avgContentVhandle_Right}px;left:$au{avgContentVhandle_Left}px;top:$au{avgContentVhandle_Top}px\">\n          <avg-content-vhandle-scroll css=\"width:5px;height:$au{avgContentVhandleScroll_Height}px\"> \n          </avg-content-vhandle-scroll> \n        </avg-content-vhandle> \n\n        <avg-content-hhandle css=\"bottom:$au{avgContentHhandle_Bottom}px;right:$au{avgContentHhandle_Right}px;left:$au{avgContentHhandle_Left}px;height:$au{avgContentHhandle_Height}px\">\n          <avg-content-hhandle-scroll css=\"height:7px;width:$au{avgContentHhandleScroll_Width}px\"> \n          </avg-content-hhandle-scroll> \n        </avg-content-hhandle> \n\n        ".replace(/\$(au{)/g, '${');

});
___scope___.file("grid/mainScrollEvents.js", function(exports, require, module, __filename, __dirname){ 

var MainScrollEvents = (function () {
    function MainScrollEvents(element, htmlCache) {
        this.element = element;
        this.htmlCache = htmlCache;
        this.timerLeft = null;
        this.timerMain = null;
        this.timerRight = null;
        this.timerVhandle = null;
        this.timerHhandle = null;
        this.timerWheel = null;
        this.isScrollbar = false;
        this.lastTopPosition = 0;
        this.wheelEvent = 'onwheel';
        this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
        if (this.isIE11) {
            this.wheelEvent = 'onmousewheel';
            console.warn('IE11, why!?!?!');
        }
    }
    MainScrollEvents.prototype.init = function () {
        this.updateInternalHtmlCache();
        this.addScrollEvents('all');
    };
    MainScrollEvents.prototype.updateInternalHtmlCache = function () {
        this.left = this.htmlCache.avg_content_left;
        this.main = this.htmlCache.avg_content_main;
        this.right = this.htmlCache.avg_content_right;
        this.mainHead = this.htmlCache.avg_header_main_scroll;
        this.vhandle = this.htmlCache.avg_content_vhandle;
        this.hhandle = this.htmlCache.avg_content_hhandle;
        this.group = this.htmlCache.avg_content_group;
    };
    MainScrollEvents.prototype.onWeel = function (event) {
        var _this = this;
        if (this.vhandle.scrollHeight === this.vhandle.parentNode.clientHeight) {
            return false;
        }
        requestAnimationFrame(function () {
            var deltaY = event.deltaY;
            if (event.deltaMode) {
                deltaY = deltaY * 40;
            }
            if (!event.deltaY && !event.deltaMode) {
                if (event.wheelDelta < 0) {
                    deltaY = 100;
                }
                else {
                    deltaY = -100;
                }
            }
            _this.handleEventWheelScroll(deltaY);
        });
        event.preventDefault();
        return false;
    };
    MainScrollEvents.prototype.addScrollEvents = function (type) {
        switch (type) {
            case 'all':
                this.right[this.wheelEvent] = this.onWeel.bind(this);
                this.main[this.wheelEvent] = this.onWeel.bind(this);
                this.left[this.wheelEvent] = this.onWeel.bind(this);
                this.group[this.wheelEvent] = this.onWeel.bind(this);
                this.vhandle.onscroll = this.handleEventVhandle.bind(this);
                this.hhandle.onscroll = this.handleEventHhandle.bind(this);
                this.htmlCache.element.addEventListener('touchmove', this.touchMove.bind(this));
                this.htmlCache.element.addEventListener('touchstart', this.touchStart.bind(this));
                break;
            case 'wheel':
                this.vhandle.onscroll = this.handleEventVhandle.bind(this);
                break;
            default:
        }
    };
    MainScrollEvents.prototype.removeScrollEvents = function (type) {
        switch (type) {
            case 'all':
                this.vhandle.onscroll = null;
                break;
            case 'wheel':
                this.vhandle.onscroll = null;
                break;
            default:
        }
    };
    MainScrollEvents.prototype.touchStart = function (e) {
        var touchobj = e.changedTouches[0];
        this.touchY = parseInt(touchobj.clientY, 10);
        this.touchX = parseInt(touchobj.clientX, 10);
    };
    MainScrollEvents.prototype.touchMove = function (e) {
        var touchobj = e.changedTouches[0];
        var dist = this.touchY - parseInt(touchobj.clientY, 10);
        var distX = parseInt(touchobj.clientX, 10) - this.touchX;
        this.touchY = parseInt(touchobj.clientY, 10);
        this.touchX = parseInt(touchobj.clientX, 10);
        this.handleEventWheelScroll(dist, -distX);
        e.preventDefault();
    };
    MainScrollEvents.prototype.handleEventWheelScroll = function (newTopPosition, left) {
        var _this = this;
        requestAnimationFrame(function () {
            if (_this.timerWheel) {
                clearTimeout(_this.timerWheel);
                _this.removeScrollEvents('wheel');
            }
            requestAnimationFrame(function () {
                _this.vhandle.scrollTop = _this.vhandle.scrollTop + newTopPosition;
                _this.main.scrollTop = _this.vhandle.scrollTop;
                _this.right.scrollTop = _this.vhandle.scrollTop;
                _this.left.scrollTop = _this.vhandle.scrollTop;
                _this.group.scrollTop = _this.vhandle.scrollTop;
                if (left !== undefined) {
                    _this.main.scrollLeft = _this.main.scrollLeft + left;
                    _this.mainHead.style.left = -_this.main.scrollLeft + 'px';
                }
                _this.isScrollbar = false;
                _this.checkScroll(_this.main.scrollTop);
                _this.timerWheel = setTimeout(function () {
                    _this.addScrollEvents('wheel');
                    _this.timerWheel = null;
                }, 30);
            });
        });
    };
    MainScrollEvents.prototype.handleEventVhandle = function () {
        var _this = this;
        requestAnimationFrame(function () {
            if (_this.timerVhandle) {
                clearTimeout(_this.timerVhandle);
                _this.removeScrollEvents('Vhandle');
            }
            requestAnimationFrame(function () {
                var newTopPosition = _this.vhandle.scrollTop;
                _this.right.scrollTop = newTopPosition;
                _this.main.scrollTop = newTopPosition;
                _this.left.scrollTop = newTopPosition;
                _this.group.scrollTop = newTopPosition;
                _this.isScrollbar = true;
                _this.checkScroll(newTopPosition);
                _this.timerVhandle = setTimeout(function () {
                    _this.addScrollEvents('Vhandle');
                    _this.timerVhandle = null;
                }, 30);
            });
        });
    };
    MainScrollEvents.prototype.handleEventHhandle = function () {
        var _this = this;
        requestAnimationFrame(function () {
            if (_this.timerHhandle) {
                clearTimeout(_this.timerHhandle);
                _this.removeScrollEvents('Hhandle');
            }
            requestAnimationFrame(function () {
                var newLeftPosition = _this.hhandle.scrollLeft;
                _this.main.scrollLeft = newLeftPosition;
                _this.mainHead.style.left = -newLeftPosition + 'px';
                _this.timerHhandle = setTimeout(function () {
                    _this.addScrollEvents('Hhandle');
                    _this.timerHhandle = null;
                }, 30);
            });
        });
    };
    MainScrollEvents.prototype.checkScroll = function (newTopPosition) {
        if (this.lastTopPosition !== newTopPosition) {
            var isDown = true;
            if (this.lastTopPosition > newTopPosition) {
                isDown = false;
            }
            this.lastTopPosition = newTopPosition;
            this.triggerGridScrollEvent(this.isScrollbar, isDown, newTopPosition);
        }
    };
    MainScrollEvents.prototype.triggerGridScrollEvent = function (scrollbarScrolling, down, topPosition) {
        var event = new CustomEvent('avg-scroll', {
            detail: {
                isScrollBarScrolling: scrollbarScrolling,
                isDown: down,
                newTopPosition: topPosition
            },
            bubbles: false
        });
        this.element.dispatchEvent(event);
    };
    return MainScrollEvents;
}());
exports.MainScrollEvents = MainScrollEvents;

});
___scope___.file("grid/rowMarkup.js", function(exports, require, module, __filename, __dirname){ 

var RowMarkup = (function () {
    function RowMarkup(element, htmlCache) {
        this.element = element;
        this.htmlCache = htmlCache;
    }
    RowMarkup.prototype.init = function (rowHeight) {
        this.rowHeight = rowHeight;
        this.updateInternalHtmlCache();
        this.generateRows();
    };
    RowMarkup.prototype.generateRows = function () {
        var markupLeft = '';
        var markupMain = '';
        var markupRight = '';
        var markupGroup = '';
        for (var i = 0; i < 40; i++) {
            var translateY = this.rowHeight * i;
            var avgRowMarkup = "\n        <avg-row \n          class=\"avg-row\" \n          style=\"height:" + this.rowHeight + "px; \n            transform:translate3d(0px, " + translateY + "px, 0px);\n            z-index:5;\" \n          row=\"" + i + "\">\n        </avg-row>";
            var avgRowMarkupGroup = "\n        <avg-row \n          class=\"avg-row-helper\" \n          style=\"height:" + this.rowHeight + "px; \n            transform:translate3d(0px, " + translateY + "px, 0px);\n            z-index:5;\" \n          row=\"" + i + "\">\n        </avg-row>";
            markupLeft = markupLeft + avgRowMarkup;
            markupMain = markupMain + avgRowMarkup;
            markupRight = markupRight + avgRowMarkup;
            markupGroup = markupGroup + avgRowMarkupGroup;
        }
        this.left.innerHTML = markupLeft;
        this.main.innerHTML = markupLeft;
        this.right.innerHTML = markupLeft;
        this.group.innerHTML = markupGroup;
    };
    RowMarkup.prototype.updateInternalHtmlCache = function () {
        this.left = this.htmlCache.avg_content_left_scroll;
        this.main = this.htmlCache.avg_content_main_scroll;
        this.right = this.htmlCache.avg_content_right_scroll;
        this.group = this.htmlCache.avg_content_group_scroll;
    };
    return RowMarkup;
}());
exports.RowMarkup = RowMarkup;

});
___scope___.file("grid/rowScrollEvents.js", function(exports, require, module, __filename, __dirname){ 

var RowScrollEvents = (function () {
    function RowScrollEvents(element, htmlCache, controller) {
        this.htmlCache = htmlCache;
        this.element = element;
        this.controller = controller;
        this.timer = null;
        this.largeScroll = false;
        this.collectionLength = 0;
        this.largeScrollUpdateDelay = 0;
    }
    RowScrollEvents.prototype.init = function (rowHeight, attDataDelay, attVariableRowHeight) {
        this.rowCache = this.htmlCache.rowCache;
        this.largeScrollUpdateDelay = attDataDelay;
        this.rowHeight = rowHeight;
        this.updateInternalHtmlCache();
        this.createRowCache();
        if (attVariableRowHeight) {
            this.scrollNormal = this.scrollNormalVariableRowHeight.bind(this);
            this.scrollScrollBar = this.scrollScrollBarVariableRowHeight.bind(this);
        }
        this.addEventListener();
    };
    RowScrollEvents.prototype.setCollectionLength = function (length) {
        this.collectionLength = length;
    };
    RowScrollEvents.prototype.createRowCache = function () {
        for (var i = 0; i < this.cacheLength; i++) {
            this.rowCache.push({
                left: this.leftRows[i],
                main: this.mainRows[i],
                right: this.rightRows[i],
                group: this.groupRows[i],
                top: this.rowHeight * i,
                row: i
            });
        }
    };
    RowScrollEvents.prototype.updateInternalHtmlCache = function () {
        this.left = this.htmlCache.avg_content_left_scroll;
        this.main = this.htmlCache.avg_content_main_scroll;
        this.right = this.htmlCache.avg_content_right_scroll;
        this.scroller = this.htmlCache.avg_content_right_scroll;
        this.leftRows = this.htmlCache.avg_left_rows;
        this.mainRows = this.htmlCache.avg_main_rows;
        this.rightRows = this.htmlCache.avg_right_rows;
        this.groupRows = this.htmlCache.avg_group_rows;
        this.cacheLength = this.leftRows.length;
    };
    Object.defineProperty(RowScrollEvents.prototype, "contentHeight", {
        get: function () {
            return this.htmlCache.avg_content_main.offsetHeight;
        },
        enumerable: true,
        configurable: true
    });
    RowScrollEvents.prototype.onScroll = function (event) {
        var _this = this;
        var isDown = event.detail.isDown;
        var isScrollBarScrolling = event.detail.isScrollBarScrolling;
        var newTopPosition = event.detail.newTopPosition;
        if (this.largeScroll || isScrollBarScrolling) {
            if (this.largeScrollUpdateDelay) {
                clearTimeout(this.timer);
                this.largeScroll = true;
                this.timer = setTimeout(function () {
                    _this.largeScroll = false;
                    _this.scrollScrollBar(newTopPosition, isDown);
                }, this.largeScrollUpdateDelay);
            }
            else {
                this.scrollScrollBar(newTopPosition, isDown);
            }
        }
        else {
            switch (true) {
                case isDown && !isScrollBarScrolling:
                    this.scrollNormal(newTopPosition, true);
                    break;
                case !isDown && !isScrollBarScrolling:
                    this.scrollNormal(newTopPosition, false);
                    break;
                default:
            }
        }
    };
    RowScrollEvents.prototype.setRowTopValue = function (cache, top) {
        cache.left.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.main.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.right.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.group.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.top = top;
        cache.row = Math.floor(top / this.rowHeight);
    };
    RowScrollEvents.prototype.setRowTopValueVariableRowHeight = function (cache, top) {
        cache.left.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.main.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.right.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.group.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.top = top;
        var rowHeightState = this.controller.getRowHeightState();
        cache.row = rowHeightState.top.indexOf(top);
    };
    RowScrollEvents.prototype.scrollNormal = function (newTopPosition, downScroll) {
        var rowHeight = this.rowHeight;
        var currentRow = Math.floor(newTopPosition / rowHeight);
        var cacheHeight = rowHeight * this.cacheLength;
        for (var i = 0; i < this.cacheLength; i++) {
            var cache = this.rowCache[i];
            var top_1 = this.rowCache[i].top;
            var update = false;
            var newTop = void 0;
            if (!downScroll) {
                if (top_1 > (newTopPosition + this.contentHeight)) {
                    update = true;
                    newTop = top_1 - cacheHeight;
                    currentRow = (top_1 - cacheHeight) / rowHeight;
                }
            }
            else {
                if (top_1 < (newTopPosition - rowHeight)) {
                    update = true;
                    newTop = top_1 + cacheHeight;
                    currentRow = (top_1 + cacheHeight) / rowHeight;
                }
            }
            if (update === true && currentRow >= 0 && currentRow <= this.collectionLength - 1) {
                this.setRowTopValue(cache, newTop);
                this.triggerRebindRowEvent(currentRow, cache, downScroll);
            }
        }
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
    };
    RowScrollEvents.prototype.scrollScrollBar = function (newTopPosition, downScroll) {
        var _this = this;
        if (this.collectionLength <= this.cacheLength) {
            newTopPosition = 0;
        }
        var rowHeight = this.rowHeight;
        var bodyHeight = this.contentHeight;
        var currentRow = Math.floor(newTopPosition / rowHeight);
        var firstRow = Math.floor(newTopPosition / rowHeight);
        var currentRowTop = rowHeight * currentRow;
        var firstRowTop = rowHeight * firstRow;
        var collectionLength = this.collectionLength;
        var setAfter = function (no) {
            var row = _this.rowCache[no];
            _this.setRowTopValue(row, currentRowTop);
            currentRowTop = currentRowTop + rowHeight;
        };
        var setBefore = function (no) {
            var row = _this.rowCache[no];
            firstRowTop = firstRowTop - rowHeight;
            _this.setRowTopValue(row, firstRowTop);
        };
        var setHiddenFromView = function (no) {
            var row = _this.rowCache[no];
            _this.setRowTopValue(row, -(currentRowTop + (rowHeight * 50)));
        };
        for (var i = 0; i < this.cacheLength; i++) {
            var moved = false;
            switch (true) {
                case currentRow >= 0 && currentRow <= collectionLength - 1:
                    setAfter(i);
                    moved = true;
                    break;
                case currentRow >= collectionLength && (collectionLength * rowHeight) >= bodyHeight:
                    setBefore(i);
                    moved = true;
                    break;
                default:
            }
            if (!moved) {
                if (currentRow >= collectionLength && (currentRowTop - rowHeight) >= bodyHeight) {
                    setHiddenFromView(i);
                }
                else {
                    if (currentRow >= collectionLength) {
                        setHiddenFromView(i);
                    }
                }
            }
            currentRow++;
        }
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
        this.triggerRebindAllRowsEvent(downScroll, this.rowCache);
    };
    RowScrollEvents.prototype.setRowHeight = function (rowElement, rowNo) {
        var rowHeightState = this.controller.getRowHeightState();
        rowElement.left.style.height = rowHeightState.rows[rowNo] + 'px';
        rowElement.main.style.height = rowHeightState.rows[rowNo] + 'px';
        rowElement.right.style.height = rowHeightState.rows[rowNo] + 'px';
        rowElement.group.style.height = rowHeightState.rows[rowNo] + 'px';
    };
    RowScrollEvents.prototype.scrollNormalVariableRowHeight = function (newTopPosition, downScroll) {
        var rowHeightState = this.controller.getRowHeightState();
        for (var i = 0; i < this.cacheLength; i++) {
            var cache = this.rowCache[i];
            var top_2 = this.rowCache[i].top;
            var currentRow = rowHeightState.top.indexOf(top_2);
            this.setRowHeight(this.rowCache[i], currentRow);
            var update = false;
            var newTop = void 0;
            if (!downScroll) {
                if (top_2 > (newTopPosition + this.contentHeight)) {
                    currentRow = currentRow - this.cacheLength;
                    if (currentRow > -1) {
                        update = true;
                        newTop = rowHeightState.top[currentRow];
                    }
                }
            }
            else {
                if (top_2 < (newTopPosition - rowHeightState.rows[currentRow])) {
                    update = true;
                    newTop = rowHeightState.top[currentRow + this.cacheLength];
                    currentRow = currentRow + this.cacheLength;
                }
            }
            if (update === true && currentRow >= 0 && currentRow <= this.collectionLength - 1) {
                this.setRowTopValueVariableRowHeight(cache, newTop);
                this.triggerRebindRowEvent(currentRow, cache, downScroll);
            }
        }
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
    };
    RowScrollEvents.prototype.scrollScrollBarVariableRowHeight = function (newTopPosition, downScroll) {
        var _this = this;
        if (this.collectionLength <= this.cacheLength) {
            newTopPosition = 0;
        }
        var rowHeightState = this.controller.getRowHeightState();
        var x = 1000;
        var currentRow = 0;
        var currentRowTop = 0;
        var firstRow = 0;
        var i = 0;
        var run = true;
        if (newTopPosition !== 0) {
            while (i < rowHeightState.top.length) {
                var checkValue = Math.abs(newTopPosition - (rowHeightState.top[i]));
                if (checkValue === x) {
                    currentRow = i - 1;
                    firstRow = i - 1;
                    run = false;
                }
                else {
                    if (checkValue < x) {
                        currentRow = i - 1;
                        firstRow = i - 1;
                        x = checkValue;
                    }
                }
                i++;
            }
        }
        var bodyHeight = this.contentHeight;
        currentRowTop = rowHeightState.top[currentRow];
        var firstRowTop = currentRowTop * 1;
        var collectionLength = this.collectionLength;
        var setAfter = function (no) {
            var row = _this.rowCache[no];
            _this.setRowHeight(row, currentRow);
            _this.setRowTopValueVariableRowHeight(row, currentRowTop);
            row.row = currentRow;
            currentRowTop = currentRowTop + rowHeightState.rows[currentRow];
        };
        var setBefore = function (no) {
            var row = _this.rowCache[no];
            _this.setRowHeight(row, currentRow);
            firstRowTop = firstRowTop - rowHeightState.rows[currentRow];
            _this.setRowTopValueVariableRowHeight(row, firstRowTop);
        };
        var setHiddenFromView = function (no) {
            var row = _this.rowCache[no];
            _this.setRowTopValueVariableRowHeight(row, -(currentRowTop + (rowHeightState.rows[currentRow] * 50)));
        };
        for (var i_1 = 0; i_1 < this.cacheLength; i_1++) {
            var moved = false;
            switch (true) {
                case currentRow >= 0 && currentRow <= collectionLength - 1:
                    setAfter(i_1);
                    moved = true;
                    break;
                case currentRow >= collectionLength && (rowHeightState.total) >= bodyHeight:
                    setBefore(i_1);
                    moved = true;
                    break;
                default:
            }
            if (!moved) {
                if (currentRow >= collectionLength && (currentRowTop - rowHeightState.rows[currentRow]) >= bodyHeight) {
                    setHiddenFromView(i_1);
                }
                else {
                    if (currentRow >= collectionLength) {
                        setHiddenFromView(i_1);
                    }
                }
            }
            currentRow++;
        }
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
        this.triggerRebindAllRowsEvent(downScroll, this.rowCache);
    };
    RowScrollEvents.prototype.addEventListener = function () {
        this.onScrollBinded = this.onScroll.bind(this);
        this.element.addEventListener('avg-scroll', this.onScrollBinded);
    };
    RowScrollEvents.prototype.triggerRebindRowEvent = function (curRow, curRowCache, isDownScroll) {
        var event = new CustomEvent('avg-rebind-row', {
            detail: {
                currentRow: curRow,
                rowCache: curRowCache,
                downScroll: isDownScroll
            },
            bubbles: false
        });
        this.element.dispatchEvent(event);
    };
    RowScrollEvents.prototype.triggerRebindAllRowsEvent = function (isDownScroll, curRowCache) {
        var event = new CustomEvent('avg-rebind-all-rows', {
            detail: {
                downScroll: isDownScroll,
                rowCache: curRowCache
            },
            bubbles: false
        });
        this.element.dispatchEvent(event);
    };
    return RowScrollEvents;
}());
exports.RowScrollEvents = RowScrollEvents;

});
___scope___.file("grid/columnMarkup.js", function(exports, require, module, __filename, __dirname){ 

var aurelia_framework_1 = require("aurelia-framework");
var columnMarkupHelper_1 = require("./columnMarkupHelper");
var ColumnMarkup = (function () {
    function ColumnMarkup(element, viewCompiler, container, viewResources, htmlCache, viewSlots, columnBindingContext) {
        this.element = element;
        this.htmlCache = htmlCache;
        this.viewSlots = viewSlots;
        this.columnBindingContext = columnBindingContext;
        this.markupHelper = new columnMarkupHelper_1.ColumnMarkupHelper();
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
    }
    ColumnMarkup.prototype.init = function (colConfig, overrideContext, colRepeater, colRepeatRowTemplate, colRepeatRowHeaderTemplate, colGroup) {
        this.overrideContext = overrideContext;
        this.colConfig = colConfig;
        this.configLength = colConfig.length;
        this.colRepeater = colRepeater;
        this.colRepeatRowTemplate = colRepeatRowTemplate;
        this.colRepeatHeaderTemplate = colRepeatRowHeaderTemplate;
        this.colGroup = colGroup;
        this.updateInternalHtmlCache();
        if (this.colConfig.length > 0) {
            this.markupHelper.generate(this.colConfig);
        }
        this.generateColumns();
    };
    ColumnMarkup.prototype.getRowViews = function (type) {
        var viewMarkup = '';
        var markupArray = [];
        if (type === 'group') {
            var defaultMarkup = [
                '<i click.delegate="changeGrouping(rowRef)">',
                '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">',
                '<path show.bind="rowRef.__groupExpanded" d="M4.8 7.5h6.5v1H4.8z"/>',
                '<path show.bind="!rowRef.__groupExpanded" d="M7.4 4.8v2.7H4.7v1h2.7v3h1v-3h2.8v-1H8.5V4.8h-1z"/>',
                '</svg>',
                '</i>&nbsp;${rowRef.__groupName} (${rowRef.__groupTotal})',
            ];
            var gTemplate = this.colGroup || defaultMarkup.join('');
            markupArray = [
                '<avg-col ',
                'class="avg-col-group"',
                'if.bind="rowRef.__group ===true"',
                'css="left:${rowRef.__groupLvl ? rowRef.__groupLvl *15:0}px;right:0">',
                gTemplate,
                '</avg-col>'
            ];
            viewMarkup = markupArray.join('');
        }
        else {
            if (this.colRepeater && type === 'main') {
                var style = 'style="left:0;right:0"';
                viewMarkup = "<avg-repeat                         class=\"avg-col\"                         if.bind=\"rowRef.__group !== true\" " + style + ">" + this.colRepeatRowTemplate + "                      </avg-repeat>";
            }
            else {
                for (var i = 0; i < this.configLength; i++) {
                    var style = void 0;
                    switch (type) {
                        case 'left':
                            style = 'css="width:${setupleft[' + i + '].width}px;\
                            left:${setupleft[' + i + '].left+ (setupgrouping * 15)}px"';
                            break;
                        case 'main':
                            style = 'css="width:${setupmain[' + i + '].width}px;\
                            left:${setupmain[' + i + '].left}px"';
                            break;
                        case 'right':
                            style = 'css="width:${setupright[' + i + '].width}px;\
                            left:${setupright[' + i + '].left}px"';
                            break;
                        default:
                    }
                    var template = this.colConfig[i].__colRowTemplateGenerated;
                    var colMarkup = "<avg-col                               class=\"avg-col\"                               if.bind=\"setup" + type + "[" + i + "].show && rowRef.__group !== true\" " + style + ">" + template + "                          </avg-col>";
                    viewMarkup = viewMarkup + colMarkup;
                }
            }
        }
        var groupingBlock = '';
        if (type === 'left') {
            groupingBlock = '<avg-col \
      class="avg-col-grouping" \
      css="left:0px;width:${rowRef.__groupLvl ? rowRef.__groupLvl *15:0}px"></avg-col>';
        }
        return this.viewCompiler.compile("<template>" + (groupingBlock + viewMarkup) + "</template>", this.viewResources);
    };
    ColumnMarkup.prototype.createColSetupContext = function (type) {
        var leftCur = 0;
        for (var i = 0; i < this.configLength; i++) {
            var widthCur = this.colConfig[i].colWidth;
            var showme = false;
            switch (type) {
                case 'left':
                    showme = this.colConfig[i].colPinLeft;
                    break;
                case 'main':
                    showme = !this.colConfig[i].colPinLeft && !this.colConfig[i].colPinRight;
                    break;
                case 'right':
                    showme = this.colConfig[i].colPinRight;
                    break;
                default:
            }
            this.columnBindingContext['setup' + type].push({
                width: widthCur,
                show: showme,
                left: leftCur
            });
            if (showme) {
                leftCur = leftCur + widthCur;
            }
        }
    };
    ColumnMarkup.prototype.getHeaderViews = function (type) {
        var viewMarkup = '';
        if (this.colRepeater && type === 'main' && this.colRepeatHeaderTemplate) {
            var style = 'css="left:0;right:0"';
            viewMarkup = "<div class=\"avg-col\" " + style + ">" + this.colRepeatHeaderTemplate + "</div>";
        }
        else {
            for (var i = 0; i < this.configLength; i++) {
                var style = void 0;
                switch (type) {
                    case 'left':
                        style = 'css="width:${setupleft[' + i + '].width}px;\
                          left:${setupleft[' + i + '].left + (setupgrouping * 15)}px"';
                        break;
                    case 'main':
                        style = 'css="width:${setupmain[' + i + '].width}px;\
                          left:${setupmain[' + i + '].left}px"';
                        break;
                    case 'right':
                        style = 'css="width:${setupright[' + i + '].width}px;\
                          left:${setupright[' + i + '].left}px"';
                        break;
                    default:
                }
                var template = this.colConfig[i].__colHeaderTemplateGenerated;
                var colMarkup = "<avg-col                             avg-type=\"" + type + "\"                             avg-config-col=\"" + i + "\"                             class=\"avg-col\"                             if.bind=\"setup" + type + "[" + i + "].show\"                             " + style + ">" + template + "                          </avg-col>";
                viewMarkup = viewMarkup + colMarkup;
            }
        }
        var groupingBlock = '';
        if (type === 'left') {
            groupingBlock = '<avg-col \
                          class="avg-col-grouping-header" \
                          css="left:0px;width:${setupgrouping ? (setupgrouping * 15):0}px"> \
                       </avg-col>';
        }
        return this.viewCompiler.compile("<template>" + (groupingBlock + viewMarkup) + "</template>", this.viewResources);
    };
    ColumnMarkup.prototype.generateColumns = function () {
        if (this.columnBindingContext.setupmain.length === 0) {
            this.createColSetupContext('left');
            this.createColSetupContext('main');
            this.createColSetupContext('right');
            this.createColSetupContext('group');
        }
        var viewFactoryLeft = this.getRowViews('left');
        var viewFactoryMain = this.getRowViews('main');
        var viewFactoryRight = this.getRowViews('right');
        var viewFactoryGroup = this.getRowViews('group');
        for (var i = 0; i < this.rowLength; i++) {
            this.viewSlots.leftRowViewSlots[i] = this.createViewSlot(this.leftRows[i], viewFactoryLeft);
            this.viewSlots.mainRowViewSlots[i] = this.createViewSlot(this.mainRows[i], viewFactoryMain);
            this.viewSlots.rightRowViewSlots[i] = this.createViewSlot(this.rightRows[i], viewFactoryRight);
            this.viewSlots.groupRowViewSlots[i] = this.createViewSlot(this.groupRows[i], viewFactoryGroup);
            this.htmlCache.rowCache[i].leftRowViewSlot = this.viewSlots.leftRowViewSlots[i];
            this.htmlCache.rowCache[i].mainRowViewSlot = this.viewSlots.mainRowViewSlots[i];
            this.htmlCache.rowCache[i].rightRowViewSlot = this.viewSlots.rightRowViewSlots[i];
            this.htmlCache.rowCache[i].groupRowViewSlot = this.viewSlots.groupRowViewSlots[i];
        }
        var viewFactoryHeaderLeft = this.getHeaderViews('left');
        var viewFactoryHeaderMain = this.getHeaderViews('main');
        var viewFactoryHeaderRight = this.getHeaderViews('right');
        this.viewSlots.leftHeaderViewSlot = this.createViewSlot(this.leftHeader, viewFactoryHeaderLeft);
        this.viewSlots.mainHeaderViewSlot = this.createViewSlot(this.mainHeader, viewFactoryHeaderMain);
        this.viewSlots.rightHeaderViewSlot = this.createViewSlot(this.rightHeader, viewFactoryHeaderRight);
    };
    ColumnMarkup.prototype.createViewSlot = function (element, viewFactory) {
        var view = viewFactory.create(this.container);
        var viewSlot = new aurelia_framework_1.ViewSlot(element, true);
        viewSlot.add(view);
        return viewSlot;
    };
    ColumnMarkup.prototype.updateInternalHtmlCache = function () {
        this.leftScroll = this.htmlCache.avg_content_left_scroll;
        this.mainScroll = this.htmlCache.avg_content_main_scroll;
        this.rightScroll = this.htmlCache.avg_content_right_scroll;
        this.groupScroll = this.htmlCache.avg_content_group_scroll;
        this.leftHeader = this.htmlCache.avg_header_left;
        this.mainHeader = this.htmlCache.avg_header_main_scroll;
        this.rightHeader = this.htmlCache.avg_header_right;
        this.leftRows = this.htmlCache.avg_left_rows;
        this.mainRows = this.htmlCache.avg_main_rows;
        this.rightRows = this.htmlCache.avg_right_rows;
        this.groupRows = this.htmlCache.avg_group_rows;
        this.rowLength = this.leftRows.length;
    };
    return ColumnMarkup;
}());
exports.ColumnMarkup = ColumnMarkup;

});
___scope___.file("grid/columnMarkupHelper.js", function(exports, require, module, __filename, __dirname){ 

var ColumnMarkupHelper = (function () {
    function ColumnMarkupHelper() {
    }
    ColumnMarkupHelper.prototype.generate = function (colConfig) {
        var type = null;
        if (colConfig && colConfig.length > 0) {
            type = 'typeHtml';
        }
        if (!type) {
            throw new Error('column setup missing');
        }
        this.processColumns(colConfig);
    };
    ColumnMarkupHelper.prototype.processColumns = function (array) {
        var _this = this;
        array.forEach(function (col, index) {
            if (!col.colField && !col.colRowTemplate) {
                if (col.colType !== 'selection') {
                    throw new Error('colField is not set on column' + index);
                }
            }
            col.colType = col.colType || 'text';
            col.colFilterTop = col.colFilterTop || false;
            col.colHeaderName = col.colHeaderName || _this.getAttribute(col.colField, true);
            col.colWidth = col.colWidth || 100;
            col.colCss = col.colCss || '';
            col.colField = _this.checkAttribute(col.colField);
            _this.createHeaderTemplate(col);
            _this.createRowTemplate(col);
            if (col.colRowTemplate) {
                col.__colRowTemplateGenerated = col.colRowTemplate;
            }
            if (col.colHeaderTemplate) {
                col.__colHeaderTemplateGenerated = col.colHeaderTemplate;
            }
        });
    };
    ColumnMarkupHelper.prototype.createHeaderTemplate = function (col) {
        if (!col.colHeaderTemplate) {
            var inputHeader = void 0;
            var labelHeader = void 0;
            switch (col.colType) {
                case 'selection':
                    labelHeader = '';
                    inputHeader = "<input \n            class=\"avg-row-checkbox-100\" \n            v-selection=\"type:header;selected.bind:selected\" \n            type=\"checkbox\">";
                    break;
                case 'image':
                    inputHeader = '<p class="avg-label-top"></p>';
                    if (!col.colFilterTop) {
                        col.colFilter = 'x';
                    }
                    labelHeader = this.createLabelMarkup(col);
                    break;
                default:
                    inputHeader = this.createInputHeaderMarkup(col);
                    labelHeader = this.createLabelMarkup(col);
                    break;
            }
            if (col.colFilterTop) {
                col.__colHeaderTemplateGenerated = inputHeader + labelHeader;
            }
            else {
                col.__colHeaderTemplateGenerated = labelHeader + inputHeader;
            }
        }
    };
    ColumnMarkupHelper.prototype.createRowTemplate = function (col) {
        if (!col.colRowTemplate) {
            switch (col.colType) {
                case 'selection':
                    col.colRowTemplate = "<input \n            v-key-move \n            class=\"avg-row-checkbox-100\"  \n            v-selection=\"type:row;selected.bind:selected\" \n            type=\"checkbox\" >";
                    break;
                case 'image':
                    this.createImageRowMarkup(col);
                    break;
                default:
                    this.createInputRowMarkup(col);
                    break;
            }
        }
    };
    ColumnMarkupHelper.prototype.getAttribute = function (value, capitalize) {
        var returnValue = value || 'missing!';
        if (value) {
            value = value.replace('rowRef.', '');
            value = value.replace('tempRef.', '');
            var newValue = '';
            var done = false;
            for (var x = 0; x < value.length; x++) {
                var letter = value.charAt(x);
                if (!done && letter !== ' ' && letter !== '&' && letter !== '|' && letter !== ':') {
                    newValue = newValue + letter;
                }
                else {
                    done = true;
                }
            }
            if (capitalize) {
                returnValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
            }
            else {
                returnValue = newValue;
            }
        }
        return returnValue;
    };
    ;
    ColumnMarkupHelper.prototype.checkAttribute = function (attribute) {
        var value = attribute;
        if (attribute) {
            if (attribute.indexOf('rowRef') === -1 && attribute.indexOf('tempRef') === -1) {
                value = 'rowRef.' + attribute;
            }
        }
        return value;
    };
    ColumnMarkupHelper.prototype.createImageRowMarkup = function (col) {
        var classNames = 'class="avg-image-round"';
        var attributeRow = col.colAddRowAttributes ? col.colAddRowAttributes : '';
        var css = col.colCss ? "css=\"" + col.colCss + "\"" : '';
        var imageFix = "v-image-fix.bind=\"" + col.colField + "\"";
        col.__colRowTemplateGenerated = "<image " + css + " " + classNames + " " + imageFix + " " + attributeRow + ">";
    };
    ColumnMarkupHelper.prototype.createInputRowMarkup = function (col) {
        var colClass = "class=\"" + (col.colType === 'checkbox' ? 'avg-row-checkbox-100' : 'avg-row-input') + "\"";
        var colType = "type=\"" + col.colType + "\"";
        var colAddRowAttributes = col.colAddRowAttributes ? col.colAddRowAttributes : '';
        var colRowMenu = col.colRowMenu ? "v-menu=\"" + col.colRowMenu + "\"" : '';
        var colCss = col.colCss ? "css=\"" + col.colCss + "\"" : '';
        if (col.colType === 'checkbox') {
            col.__colRowTemplateGenerated = "<input \n        " + colCss + " \n        " + colClass + " \n        " + colType + " \n        " + colAddRowAttributes + " \n        " + colRowMenu + "  \n        checked.bind=\"" + col.colField + "\">";
        }
        else {
            var binding = "value.bind=\"" + col.colField + "\"";
            if (col.colDisplayEdit) {
                binding = "v-data-handler=\"value.bind:" + col.colField + ";" + col.colDisplayEdit + "\"";
            }
            col.__colRowTemplateGenerated = "<input \n        " + colCss + " \n        " + colClass + " \n        " + colType + " \n        " + colRowMenu + "\n        " + colAddRowAttributes + "  \n        " + binding + ">";
        }
    };
    ColumnMarkupHelper.prototype.createInputHeaderMarkup = function (col) {
        var markup;
        if (col.colFilter) {
            var type = "type=\"" + col.colType + "\"";
            var filter = col.colFilter ? "v-filter=\"" + col.colFilter + "\"" : '';
            var colAddFilterAttributes = col.colAddFilterAttributes ? col.colAddFilterAttributes : '';
            var classNames = '';
            if (col.colType === 'checkbox') {
                classNames = "class=\"" + (col.colFilterTop ? 'avg-row-checkbox-50' : 'avg-row-checkbox-50') + "\"";
            }
            else {
                classNames = "class=\"" + (col.colFilterTop ? 'avg-header-input-top' : 'avg-header-input-bottom') + "\"";
            }
            var colRowMenu = col.colFilterMenu ? "v-menu=\"" + col.colFilterMenu + "\"" : '';
            markup = "<input " + colRowMenu + " " + classNames + " " + colAddFilterAttributes + " " + type + " " + filter + "\">";
        }
        else {
            markup = '';
        }
        return markup;
    };
    ColumnMarkupHelper.prototype.createLabelMarkup = function (col) {
        var filterClass = col.colFilter ? "" + (col.colFilterTop ? 'avg-label-bottom' : 'avg-label-top') : 'avg-label-full';
        var dragDropClass = col.colDragDrop ? 'avg-vGridDragHandle' : '';
        var classname = "class=\"" + dragDropClass + " " + filterClass + "\"";
        var colAddLabelAttributes = col.colAddLabelAttributes ? col.colAddLabelAttributes : '';
        var sort = col.colSort ? "v-sort=\"" + col.colSort + "\"" : '';
        var colLabelMenu = col.colLabelMenu ? "v-menu=\"" + col.colLabelMenu + "\"" : '';
        var colDragDrop = col.colDragDrop !== 'false' ? "v-drag-drop-col=\"" + col.colDragDrop + "\"" : '';
        var colResizeable = col.colResizeable !== 'false' ? "v-resize-col" : '';
        var extraAttributes = colDragDrop + " " + colResizeable + " " + colLabelMenu;
        return "<p \n      " + extraAttributes + " \n      " + classname + " \n      " + sort + " \n      " + colAddLabelAttributes + ">\n      " + col.colHeaderName + "\n      </p>";
    };
    return ColumnMarkupHelper;
}());
exports.ColumnMarkupHelper = ColumnMarkupHelper;

});
___scope___.file("grid/htmlHeightWidth.js", function(exports, require, module, __filename, __dirname){ 

var HtmlHeightWidth = (function () {
    function HtmlHeightWidth(controller) {
        this.controller = controller;
        this.avgScrollBarWidth = this.getScrollbarWidth() || 17;
        this.avgPanel_Height = 0;
        this.avgHeader_Height = 30;
        this.avgHeader_Top = 0;
        this.avgContent_Top = 30;
        this.avgContent_Bottom = 30;
        this.avgHeaderLeft_Width = 200;
        this.avgHeaderMain_Left = 200;
        this.avgHeaderMain_Right = 150;
        this.avgHeaderMainScroll_Width = 0;
        this.avgHeaderMainScroll_Height = 100;
        this.avgHeaderRight_Right = 0;
        this.avgHeaderRight_Width = 150;
        this.avgContentLeft_Width = 200 + this.avgScrollBarWidth;
        this.avgContentLeftScroll_Width = '100%';
        this.avgContentLeftScroll_Height = 0 + this.avgScrollBarWidth;
        this.avgContentMain_Left = 200;
        this.avgContentMain_Right = 150 - this.avgScrollBarWidth;
        this.avgContentMainScroll_Width = 0;
        this.avgContentMainScroll_Height = 0;
        this.avgContentRight_Right = 0;
        this.avgContentRight_Width = 150;
        this.avgContentRightScroll_Width = '100%';
        this.avgContentRightScroll_Height = 0 + this.avgScrollBarWidth;
        this.avgContentGroup_Width = 150;
        this.avgContentGroup_Height = 0;
        this.avgContentGroup_Top = 0;
        this.avgContentGroup_Bottom = 0;
        this.avgContentVhandle_Width = 0 + this.avgScrollBarWidth;
        this.avgContentVhandle_Height = 0;
        this.avgContentVhandle_Top = 0;
        this.avgContentVhandleScroll_Height = 0;
        this.avgContentVhandle_Bottom = 0;
        this.avgContentHhandle_Bottom = 0;
        this.avgContentHhandle_Right = 0 + this.avgScrollBarWidth;
        this.avgContentHhandle_Left = 0;
        this.avgContentHhandle_Height = 17;
        this.avgContentHhandleScroll_Width = 17;
        this.avgFooter_Height = 30;
    }
    HtmlHeightWidth.prototype.getNewHeight = function (length) {
        var lengthTotal = 0;
        if (this.controller.attVariableRowHeight) {
            lengthTotal = this.controller.getRowHeightState().total;
        }
        else {
            lengthTotal = this.controller.attRowHeight * length;
        }
        return lengthTotal;
    };
    HtmlHeightWidth.prototype.setCollectionLength = function (length, includeScroller) {
        var rowTotal = this.getNewHeight(length);
        var avgScrollbarHeightValue = includeScroller === false ? 0 : this.avgScrollBarWidth;
        var total = rowTotal + avgScrollbarHeightValue;
        this.avgContentRightScroll_Height = total;
        this.avgContentGroup_Height = total;
        this.avgContentVhandleScroll_Height = total;
        this.avgContentMainScroll_Height = total;
        this.avgContentLeftScroll_Height = total;
    };
    HtmlHeightWidth.prototype.addDefaultsAttributes = function (attHeaderHeight, attRowHeight, attFooterHeight, attPanelHeight) {
        this.attHeaderHeight = attHeaderHeight;
        this.attRowHeight = attRowHeight;
        this.attFooterHeight = attFooterHeight;
        this.attPanelHeight = attPanelHeight;
        this.avgPanel_Height = attPanelHeight;
        this.avgHeader_Top = attPanelHeight;
        this.avgHeader_Height = attHeaderHeight;
        this.avgContent_Top = attHeaderHeight + attPanelHeight;
        this.avgContent_Bottom = attFooterHeight;
        this.avgFooter_Height = attFooterHeight;
        this.avgHeaderMainScroll_Height = attHeaderHeight;
        this.avgContentGroup_Height = this.avgContentGroup_Height;
        this.avgContentGroup_Top = this.avgContent_Top;
        this.avgContentGroup_Bottom = this.avgContent_Bottom;
        this.avgContentVhandle_Height = this.avgContentVhandle_Height;
        this.avgContentVhandle_Top = this.avgContent_Top;
        this.avgContentVhandle_Bottom = this.avgContent_Bottom;
        this.avgContentHhandle_Bottom = attFooterHeight;
        this.avgContentHhandle_Height = this.avgScrollBarWidth;
    };
    HtmlHeightWidth.prototype.adjustWidthsColumns = function (columnBindingContext, groupsLength) {
        var left = groupsLength ? groupsLength * 15 : 0;
        var main = 0;
        var right = 0;
        for (var i = 0; i < columnBindingContext.setupmain.length; i++) {
            if (columnBindingContext.setupleft[i].show) {
                left = left + columnBindingContext.setupleft[i].width;
            }
            if (columnBindingContext.setupmain[i].show) {
                main = main + columnBindingContext.setupmain[i].width;
            }
            if (columnBindingContext.setupright[i].show) {
                right = right + columnBindingContext.setupright[i].width;
            }
        }
        this.avgContentLeft_Width = left;
        this.avgHeaderLeft_Width = left;
        this.avgContentMain_Left = left;
        this.avgContentMain_Right = right;
        this.avgHeaderMain_Left = left;
        this.avgHeaderMain_Right = right;
        this.avgHeaderMainScroll_Width = main;
        this.avgContentMainScroll_Width = main;
        this.avgContentRight_Width = right;
        this.avgHeaderRight_Width = right;
        this.avgContentHhandle_Right = right;
        this.avgContentHhandle_Left = left;
        this.avgContentHhandleScroll_Width = main;
    };
    HtmlHeightWidth.prototype.setWidthFromColumnConfig = function (colConfig, groupsLength) {
        var left = groupsLength ? groupsLength * 15 : 0;
        var main = 0;
        var right = 0;
        for (var i = 0; i < colConfig.length; i++) {
            switch (true) {
                case colConfig[i].colPinLeft && colConfig[i].colPinRight:
                    left = left + colConfig[i].colWidth;
                    right = right + colConfig[i].colWidth;
                    break;
                case colConfig[i].colPinLeft:
                    left = left + colConfig[i].colWidth;
                    break;
                case colConfig[i].colPinRight:
                    right = right + colConfig[i].colWidth;
                    break;
                case !colConfig[i].colPinLeft && !colConfig[i].colPinRight:
                    main = main + colConfig[i].colWidth;
                    break;
                default:
            }
        }
        this.avgContentLeft_Width = left;
        this.avgHeaderLeft_Width = left;
        this.avgContentMain_Left = left;
        this.avgContentMain_Right = right;
        this.avgHeaderMain_Left = left;
        this.avgHeaderMain_Right = right;
        this.avgHeaderMainScroll_Width = main;
        this.avgContentMainScroll_Width = main;
        this.avgContentRight_Width = right;
        this.avgHeaderRight_Width = right;
        this.avgContentHhandle_Right = right;
        this.avgContentHhandle_Left = left;
        this.avgContentHhandleScroll_Width = main;
    };
    HtmlHeightWidth.prototype.getScrollbarWidth = function () {
        var outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        document.body.appendChild(outer);
        var widthNoScroll = outer.offsetWidth;
        outer.style.overflow = 'scroll';
        var inner = document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);
        var widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    };
    return HtmlHeightWidth;
}());
exports.HtmlHeightWidth = HtmlHeightWidth;

});
___scope___.file("grid/viewSlots.js", function(exports, require, module, __filename, __dirname){ 

var ViewSlots = (function () {
    function ViewSlots(htmlCache) {
        this.rowCache = htmlCache.rowCache;
        this.headerCache = htmlCache.headerCache;
        this.leftRowViewSlots = [];
        this.mainRowViewSlots = [];
        this.rightRowViewSlots = [];
        this.groupRowViewSlots = [];
        this.leftHeaderViewSlot = null;
        this.mainHeaderViewSlot = null;
        this.rightHeaderViewSlot = null;
        this.mainViewSlot = null;
        this.loadingScreenViewSlot = null;
        this.groupingViewSlots = [];
        this.contextMenu = null;
    }
    ViewSlots.prototype.bindAndAttachColumns = function (overrideContext, columnBindingContext, curSelection) {
        var context;
        var newParentOverrideContext = {
            bindingContext: columnBindingContext,
            parentOverrideContext: overrideContext
        };
        for (var i = 0; i < this.rowCache.length; i++) {
            context = { rowRef: {}, tempRef: {} };
            this.rowCache[i].bindingContext = context;
            this.rowCache[i].parentOverrideContext = {
                bindingContext: context,
                parentOverrideContext: newParentOverrideContext
            };
            this.leftRowViewSlots[i].bind(this.rowCache[i].bindingContext, this.rowCache[i].parentOverrideContext);
            this.leftRowViewSlots[i].attached();
            this.mainRowViewSlots[i].bind(this.rowCache[i].bindingContext, this.rowCache[i].parentOverrideContext);
            this.mainRowViewSlots[i].attached();
            this.rightRowViewSlots[i].bind(this.rowCache[i].bindingContext, this.rowCache[i].parentOverrideContext);
            this.rightRowViewSlots[i].attached();
            this.groupRowViewSlots[i].bind(this.rowCache[i].bindingContext, this.rowCache[i].parentOverrideContext);
            this.groupRowViewSlots[i].attached();
        }
        context = { selection: curSelection };
        this.headerCache.bindingContext = context;
        this.headerCache.parentOverrideContext = {
            bindingContext: context,
            parentOverrideContext: newParentOverrideContext
        };
        this.leftHeaderViewSlot.bind(this.headerCache.bindingContext, this.headerCache.parentOverrideContext);
        this.leftHeaderViewSlot.attached();
        this.mainHeaderViewSlot.bind(this.headerCache.bindingContext, this.headerCache.parentOverrideContext);
        this.mainHeaderViewSlot.attached();
        this.rightHeaderViewSlot.bind(this.headerCache.bindingContext, this.headerCache.parentOverrideContext);
        this.rightHeaderViewSlot.attached();
    };
    ViewSlots.prototype.unbindAndDetachColumns = function () {
        for (var i = 0; i < this.groupRowViewSlots.length; i++) {
            this.leftRowViewSlots[i].unbind();
            this.leftRowViewSlots[i].detached();
            this.mainRowViewSlots[i].unbind();
            this.mainRowViewSlots[i].detached();
            this.rightRowViewSlots[i].unbind();
            this.rightRowViewSlots[i].detached();
            this.groupRowViewSlots[i].unbind();
            this.groupRowViewSlots[i].detached();
        }
        this.leftHeaderViewSlot.unbind();
        this.leftHeaderViewSlot.detached();
        this.mainHeaderViewSlot.unbind();
        this.mainHeaderViewSlot.detached();
        this.rightHeaderViewSlot.unbind();
        this.rightHeaderViewSlot.detached();
    };
    ViewSlots.prototype.clear = function () {
        for (var i = 0; i < this.groupRowViewSlots.length; i++) {
            this.leftRowViewSlots[i].removeAll();
            this.mainRowViewSlots[i].removeAll();
            this.rightRowViewSlots[i].removeAll();
            this.groupRowViewSlots[i].removeAll();
        }
        this.leftHeaderViewSlot.removeAll();
        this.mainHeaderViewSlot.removeAll();
        this.rightHeaderViewSlot.removeAll();
        this.leftRowViewSlots = null;
        this.mainRowViewSlots = null;
        this.rightRowViewSlots = null;
        this.groupRowViewSlots = null;
        this.leftRowViewSlots = [];
        this.mainRowViewSlots = [];
        this.rightRowViewSlots = [];
        this.groupRowViewSlots = [];
        this.leftHeaderViewSlot = null;
        this.mainHeaderViewSlot = null;
        this.rightHeaderViewSlot = null;
    };
    return ViewSlots;
}());
exports.ViewSlots = ViewSlots;

});
___scope___.file("grid/columnBindingContext.js", function(exports, require, module, __filename, __dirname){ 

var ColumnBindingContext = (function () {
    function ColumnBindingContext(controller) {
        var _this = this;
        this.controller = controller;
        this.setupleft = [];
        this.setupmain = [];
        this.setupright = [];
        this.setupgroup = [];
        this.setupgrouping = 0;
        this.changeGrouping = function (x) {
            if (x) {
                if (x.__groupExpanded) {
                    _this.controller.collapseGroup(x.__groupID);
                }
                else {
                    _this.controller.expandGroup(x.__groupID);
                }
            }
        };
    }
    ColumnBindingContext.prototype.clear = function () {
        var _this = this;
        this.setupleft = [];
        this.setupmain = [];
        this.setupright = [];
        this.setupgroup = [];
        this.setupgrouping = 0;
        this.changeGrouping = function (x) {
            if (x) {
                if (x.__groupExpanded) {
                    _this.controller.collapseGroup(x.__groupID);
                }
                else {
                    _this.controller.expandGroup(x.__groupID);
                }
            }
        };
    };
    return ColumnBindingContext;
}());
exports.ColumnBindingContext = ColumnBindingContext;

});
___scope___.file("grid/rowDataBinder.js", function(exports, require, module, __filename, __dirname){ 

var RowDataBinder = (function () {
    function RowDataBinder(element, controller) {
        this.element = element;
        this.controller = controller;
    }
    RowDataBinder.prototype.init = function () {
        this.addEventListener();
    };
    RowDataBinder.prototype.rebindRowNo = function (row) {
        var rowCache = this.controller.htmlCache.rowCache;
        var foundRowCache = null;
        rowCache.forEach(function (cache) {
            if (cache.row === row) {
                foundRowCache = cache;
            }
        });
        if (foundRowCache) {
            this.rebindRow({
                detail: {
                    currentRow: row,
                    rowCache: foundRowCache,
                    downScroll: true
                }
            });
        }
    };
    RowDataBinder.prototype.addEventListener = function () {
        this.rebindRowBinded = this.rebindRow.bind(this);
        this.rebindAllRowsBinded = this.rebindAllRows.bind(this);
        this.element.addEventListener('avg-rebind-row', this.rebindRowBinded);
        this.element.addEventListener('avg-rebind-all-rows', this.rebindAllRowsBinded);
    };
    RowDataBinder.prototype.rebindRow = function (event) {
        var currentRow = event.detail.currentRow;
        var rowCache = event.detail.rowCache;
        var downScroll = event.detail.downScroll;
        var bindingContext = rowCache.bindingContext;
        this.controller.getElement(currentRow, downScroll, function (data) {
            if (data.rowRef) {
                if (data.rowRef.__group) {
                    rowCache.isGroup = true;
                }
                else {
                    rowCache.isGroup = false;
                }
            }
            var isSelected = data.selection.isSelected(rowCache.row);
            if (isSelected) {
                if (!rowCache.selected) {
                    rowCache.selected = true;
                    rowCache.left.classList.add('avg-selected-row');
                    rowCache.main.classList.add('avg-selected-row');
                    rowCache.right.classList.add('avg-selected-row');
                }
            }
            else {
                if (rowCache.selected) {
                    rowCache.selected = false;
                    rowCache.left.classList.remove('avg-selected-row');
                    rowCache.main.classList.remove('avg-selected-row');
                    rowCache.right.classList.remove('avg-selected-row');
                }
            }
            if (data.rowRef === undefined || data.rowRef === null) {
                rowCache.left.style.display = 'none';
                rowCache.main.style.display = 'none';
                rowCache.right.style.display = 'none';
                rowCache.group.style.display = 'none';
            }
            else {
                rowCache.left.style.display = 'block';
                rowCache.main.style.display = 'block';
                rowCache.right.style.display = 'block';
                rowCache.group.style.display = 'block';
            }
            bindingContext.rowRef = data.rowRef;
            bindingContext.tempRef = data.tempRef;
            bindingContext.selection = data.selection;
            bindingContext.selected = isSelected;
            bindingContext.row = currentRow;
        });
    };
    RowDataBinder.prototype.rebindAllRows = function (event) {
        var rowCache = event.detail.rowCache;
        var downScroll = event.detail.downScroll;
        var _loop_1 = function (i) {
            this_1.controller.getElement(rowCache[i].row, downScroll, function (data) {
                var bindingContext = rowCache[i].bindingContext;
                if (data.rowRef) {
                    if (data.rowRef.__group) {
                        rowCache[i].isGroup = true;
                    }
                    else {
                        rowCache[i].isGroup = false;
                    }
                }
                var isSelected = data.selection.isSelected(rowCache[i].row);
                if (isSelected) {
                    if (!rowCache[i].selected) {
                        rowCache[i].selected = true;
                        rowCache[i].left.classList.add('avg-selected-row');
                        rowCache[i].main.classList.add('avg-selected-row');
                        rowCache[i].right.classList.add('avg-selected-row');
                    }
                }
                else {
                    if (rowCache[i].selected) {
                        rowCache[i].selected = false;
                        rowCache[i].left.classList.remove('avg-selected-row');
                        rowCache[i].main.classList.remove('avg-selected-row');
                        rowCache[i].right.classList.remove('avg-selected-row');
                    }
                }
                if (data.rowRef === undefined || data.rowRef === null) {
                    rowCache[i].left.style.display = 'none';
                    rowCache[i].main.style.display = 'none';
                    rowCache[i].right.style.display = 'none';
                    rowCache[i].group.style.display = 'none';
                }
                else {
                    rowCache[i].left.style.display = 'block';
                    rowCache[i].main.style.display = 'block';
                    rowCache[i].right.style.display = 'block';
                    rowCache[i].group.style.display = 'block';
                }
                bindingContext.rowRef = data.rowRef;
                bindingContext.tempRef = data.tempRef;
                bindingContext.selection = data.selection;
                bindingContext.selected = isSelected;
                bindingContext.row = rowCache[i].row;
            });
        };
        var this_1 = this;
        for (var i = 0; i < rowCache.length; i++) {
            _loop_1(i);
        }
    };
    return RowDataBinder;
}());
exports.RowDataBinder = RowDataBinder;

});
___scope___.file("grid/rowClickHandler.js", function(exports, require, module, __filename, __dirname){ 

var RowClickHandler = (function () {
    function RowClickHandler(element, htmlCache) {
        this.element = element;
        this.htmlCache = htmlCache;
        this.selectionMode = 'none';
        this.lastRowSelected = -1;
        this.lastKeyKodeUsed = 'none';
        this.selectedRows = 0;
    }
    RowClickHandler.prototype.init = function (mode, manualSelection, controller) {
        this.controller = controller;
        this.getSelection = controller.getSelectionContext.bind(controller);
        this.manualSelection = manualSelection;
        if (mode === false) {
            this.selectionMode = 'single';
        }
        if (mode === true) {
            this.selectionMode = 'multiple';
        }
        this.addEventlistener();
    };
    RowClickHandler.prototype.updateSelectionOnAllRows = function () {
        var rowCache = this.htmlCache.rowCache;
        for (var i = 0; i < rowCache.length; i++) {
            var selection = this.getSelection();
            var isSelected = selection.isSelected(rowCache[i].row);
            rowCache[i].bindingContext.selected = isSelected;
            rowCache[i].bindingContext.selected = isSelected;
            rowCache[i].bindingContext.selected = isSelected;
            if (isSelected) {
                if (!rowCache[i].selected) {
                    rowCache[i].selected = true;
                    rowCache[i].left.classList.add('avg-selected-row');
                    rowCache[i].main.classList.add('avg-selected-row');
                    rowCache[i].right.classList.add('avg-selected-row');
                }
            }
            else {
                if (rowCache[i].selected) {
                    rowCache[i].selected = false;
                    rowCache[i].left.classList.remove('avg-selected-row');
                    rowCache[i].main.classList.remove('avg-selected-row');
                    rowCache[i].right.classList.remove('avg-selected-row');
                }
            }
        }
    };
    RowClickHandler.prototype.getSelectionMode = function () {
        var selection = this.getSelection();
        return selection.getMode();
    };
    RowClickHandler.prototype.removeEventlistener = function () {
        var avgLeftRows = this.htmlCache.avg_left_rows;
        var avgMainRows = this.htmlCache.avg_main_rows;
        var avgRightRows = this.htmlCache.avg_right_rows;
        for (var i = 0; i < avgLeftRows.length; i++) {
            avgLeftRows[i].onclick = null;
            avgLeftRows[i].ondblclick = null;
            avgMainRows[i].onclick = null;
            avgMainRows[i].ondblclick = null;
            avgRightRows[i].onclick = null;
            avgRightRows[i].ondblclick = null;
        }
    };
    RowClickHandler.prototype.addEventlistener = function () {
        var avgLeftRows = this.htmlCache.avg_left_rows;
        var avgMainRows = this.htmlCache.avg_main_rows;
        var avgRightRows = this.htmlCache.avg_right_rows;
        for (var i = 0; i < avgLeftRows.length; i++) {
            avgLeftRows[i].onclick = this.singleClick.bind(this);
            avgLeftRows[i].ondblclick = this.doubleClick.bind(this);
            avgMainRows[i].onclick = this.singleClick.bind(this);
            avgMainRows[i].ondblclick = this.doubleClick.bind(this);
            avgRightRows[i].onclick = this.singleClick.bind(this);
            avgRightRows[i].ondblclick = this.doubleClick.bind(this);
        }
    };
    RowClickHandler.prototype.getCache = function (target) {
        var no = -1;
        this.htmlCache.rowCache.forEach(function (row, i) {
            if (row.left === target) {
                no = i;
            }
            if (row.main === target) {
                no = i;
            }
            if (row.right === target) {
                no = i;
            }
            if (row.group === target) {
                no = i;
            }
        });
        if (no !== -1) {
            return this.htmlCache.rowCache[no];
        }
        else {
            return null;
        }
    };
    RowClickHandler.prototype.singleClick = function (event) {
        var cache = this.getCache(event.currentTarget) || {};
        if (!cache.isGroup) {
            this.highlightRow(event, cache.row);
            this.controller.select(cache.row);
        }
        if (!this.manualSelection) {
            this.controller.raiseEvent('v-row-onclick', {
                evt: event,
                data: cache.bindingContext.rowRef,
                bindingContext: cache.bindingContext,
                row: cache.row
            });
        }
    };
    RowClickHandler.prototype.doubleClick = function (event) {
        var cache = this.getCache(event.currentTarget) || {};
        this.controller.raiseEvent('v-row-ondblclick', {
            evt: event,
            data: cache.bindingContext.rowRef,
            bindingContext: cache.bindingContext,
            row: cache.row
        });
    };
    RowClickHandler.prototype.isSelected = function (row) {
        var selection = this.getSelection();
        return selection.isSelected(row);
    };
    RowClickHandler.prototype.deSelect = function (row) {
        var selection = this.getSelection();
        selection.deSelect(row);
    };
    RowClickHandler.prototype.select = function (row, addToSelection) {
        var selection = this.getSelection();
        selection.select(row, addToSelection);
    };
    RowClickHandler.prototype.selectRange = function (start, end) {
        var selection = this.getSelection();
        selection.selectRange(start, end);
    };
    RowClickHandler.prototype.getSelectedRows = function () {
        var selection = this.getSelection();
        return selection.getSelectedRows();
    };
    RowClickHandler.prototype.setSelectedRows = function (newRows) {
        var selection = this.getSelection();
        selection.setSelectedRows(newRows);
    };
    RowClickHandler.prototype.highlightRow = function (e, currentRow) {
        var isSel;
        var manualSel = this.manualSelection;
        if (!manualSel) {
            var currentselectedRows = this.getSelectedRows();
            var currentKeyKode = '';
            if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {
                if (currentRow <= (this.controller.collectionLength() - 1)) {
                    if (this.selectionMode === 'multiple') {
                        if (e.shiftKey) {
                            currentKeyKode = 'shift';
                            currentselectedRows = this.getSelectedRows();
                            if (currentselectedRows.length > 0 && this.lastKeyKodeUsed === 'none') {
                                this.lastRowSelected = currentselectedRows[0];
                                this.lastKeyKodeUsed = 'shift';
                            }
                        }
                        if (e.ctrlKey) {
                            currentKeyKode = 'ctrl';
                        }
                        if (!e.ctrlKey && !e.shiftKey) {
                            currentKeyKode = 'none';
                        }
                        switch (true) {
                            case currentKeyKode === 'none':
                                this.select(currentRow, false);
                                break;
                            case this.lastKeyKodeUsed === 'shift' && currentKeyKode === 'ctrl':
                                isSel = this.isSelected(currentRow);
                                if (isSel === true) {
                                    this.deSelect(currentRow);
                                }
                                else {
                                    this.select(currentRow, true);
                                }
                                this.lastRowSelected = currentRow;
                                break;
                            case this.lastKeyKodeUsed === 'ctrl' && currentKeyKode === 'shift':
                                var oldSel = this.getSelectedRows();
                                this.selectRange(this.lastRowSelected, currentRow);
                                var newSel = this.getSelectedRows();
                                this.setSelectedRows(oldSel.concat(newSel));
                                break;
                            case this.lastKeyKodeUsed === 'ctrl' && currentKeyKode === 'ctrl':
                                isSel = this.isSelected(currentRow);
                                if (isSel === true) {
                                    this.deSelect(currentRow);
                                }
                                else {
                                    this.select(currentRow, true);
                                }
                                this.lastRowSelected = currentRow;
                                break;
                            case this.lastKeyKodeUsed === 'none' && currentKeyKode === 'ctrl':
                                isSel = this.isSelected(currentRow);
                                if (isSel === true) {
                                    this.deSelect(currentRow);
                                }
                                else {
                                    this.select(currentRow, true);
                                }
                                this.lastRowSelected = currentRow;
                                break;
                            case this.lastKeyKodeUsed === 'shift' && currentKeyKode === 'shift':
                                if (this.lastRowSelected > currentRow) {
                                    this.selectRange(currentRow, this.lastRowSelected);
                                }
                                else {
                                    this.selectRange(this.lastRowSelected, currentRow);
                                }
                                break;
                            case this.lastKeyKodeUsed === 'none' && currentKeyKode === 'shift':
                                if (this.lastRowSelected !== -1) {
                                    if (this.lastRowSelected > currentRow) {
                                        this.selectRange(currentRow, this.lastRowSelected);
                                    }
                                    else {
                                        this.selectRange(this.lastRowSelected, currentRow);
                                    }
                                }
                                else {
                                    this.lastRowSelected = currentRow;
                                    this.select(currentRow, false);
                                }
                                break;
                            default:
                                console.error('error, this should not happen, debug selection');
                        }
                    }
                    else {
                        this.select(currentRow, false);
                    }
                    this.lastKeyKodeUsed = currentKeyKode;
                    this.updateSelectionOnAllRows();
                }
            }
            else {
                if (e.ctrlKey) {
                    currentKeyKode = 'ctrl';
                }
                if (currentKeyKode === 'ctrl') {
                    this.lastKeyKodeUsed = currentKeyKode;
                    isSel = this.isSelected(currentRow);
                    if (isSel === true) {
                        this.deSelect(currentRow);
                    }
                    this.lastRowSelected = currentRow;
                }
                else {
                    this.select(currentRow, false);
                }
                this.updateSelectionOnAllRows();
            }
        }
    };
    return RowClickHandler;
}());
exports.RowClickHandler = RowClickHandler;

});
___scope___.file("grid/groupingElements.js", function(exports, require, module, __filename, __dirname){ 

var aurelia_framework_1 = require("aurelia-framework");
var GroupContext = (function () {
    function GroupContext(name, field, groupingElements) {
        this.name = name;
        this.field = field;
        this.groupingElements = groupingElements;
    }
    GroupContext.prototype.remove = function () {
        this.groupingElements.removeGroup(this.field);
        this.groupingElements.removeFromGrouping(this.field);
    };
    return GroupContext;
}());
var GroupingElements = (function () {
    function GroupingElements(element, viewCompiler, container, viewResources, htmlCache, viewSlots, columnBindingContext) {
        this.element = element;
        this.htmlCache = htmlCache;
        this.viewSlots = viewSlots;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.columnBindingContext = columnBindingContext;
        this.groupContext = {};
        this.lastAdded = null;
    }
    GroupingElements.prototype.getGroups = function () {
        var x = [];
        for (var i in this.groupContext) {
            if (i) {
                x.push(i);
            }
        }
        return x;
    };
    GroupingElements.prototype.init = function (controller, colGroupElement) {
        this.controller = controller;
        this.avgTopPanel = this.htmlCache.avg_top_panel;
        this.colGroupElement = colGroupElement;
    };
    GroupingElements.prototype.addGroup = function (name, field) {
        if (!this.groupContext[field]) {
            this.lastAdded = field;
            this.groupContext[field] = new GroupContext(name, field, this);
            var viewMarkup = this.colGroupElement ||
                "<div class=\"avg-grouping\">  \n          <p class=\"avg-grouping-element\" v-sort=\"field.bind:field\">" + name + " \n            <i><svg click.delegate=\"remove()\" class=\"icon iconhidden\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n              <path d=\"M3 4l4.3 4L3 12h1.4L8 8.7l3.5 3.3H13L8.6 8 13 4h-1.5L8 7.3 4.4 4H3z\"/>\n            </svg></i>\n          </p>\n         </div>";
            var viewFactory = this.viewCompiler.compile("<template>" + viewMarkup + "</template>", this.viewResources);
            var view = viewFactory.create(this.container);
            var viewSlot = new aurelia_framework_1.ViewSlot(this.avgTopPanel, true);
            viewSlot.add(view);
            this.groupContext[field].viewSlot = viewSlot;
            this.viewSlots.groupingViewSlots.push(this.groupContext[field]);
        }
        this.groupContext[field].viewSlot.bind(this.groupContext[field]);
        this.groupContext[field].viewSlot.attached();
    };
    GroupingElements.prototype.removeGroup = function (field) {
        if (field) {
            if (this.groupContext[field] !== null) {
                this.groupContext[field].viewSlot.unbind();
                this.groupContext[field].viewSlot.detached();
                this.groupContext[field].viewSlot.removeAll();
                this.groupContext[field] = null;
            }
        }
        else {
            if (this.lastAdded) {
                if (this.groupContext[this.lastAdded] !== null) {
                    this.groupContext[this.lastAdded].viewSlot.unbind();
                    this.groupContext[this.lastAdded].viewSlot.detached();
                    this.groupContext[this.lastAdded].viewSlot.removeAll();
                    this.groupContext[this.lastAdded] = null;
                    this.lastAdded = null;
                }
            }
        }
    };
    GroupingElements.prototype.addToGrouping = function () {
        if (this.lastAdded) {
            var toAddField = this.groupContext[this.lastAdded].field;
            var toAddTitle = this.groupContext[this.lastAdded].name;
            this.controller.addToGrouping({ field: toAddField, title: toAddTitle });
            this.lastAdded = null;
        }
    };
    GroupingElements.prototype.removeFromGrouping = function (field) {
        this.controller.removeFromGrouping(field);
    };
    return GroupingElements;
}());
exports.GroupingElements = GroupingElements;

});
___scope___.file("grid/loadingScreen.js", function(exports, require, module, __filename, __dirname){ 

var aurelia_framework_1 = require("aurelia-framework");
var LoadingScreen = (function () {
    function LoadingScreen(element, viewCompiler, container, viewResources, viewSlots) {
        this.element = element;
        this.viewSlots = viewSlots;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.loading = false;
        this.loadingMessage = 'Loading';
    }
    LoadingScreen.prototype.updateLoadingDefaultLoadingMessage = function (msg) {
        this.loadingMessage = msg;
    };
    LoadingScreen.prototype.init = function (overrideContext, loadingScreenTemplate) {
        this.overrideContext = overrideContext;
        var loadingScreentHtml = loadingScreenTemplate || "[\n      <div class=\"avg-overlay\" if.bind=\"loading\">\n      </div>\n      <div if.two-way=\"loading\" class=\"avg-progress-indicator\">\n      <div class=\"avg-progress-bar\" role=\"progressbar\" style=\"width:100%\">\n      <span>$au{ loadingMessage }</span>\n      </div>\n      </div>".replace(/\$(au{)/g, '${');
        var viewFactory = this.viewCompiler.compile("<template>\n      " + loadingScreentHtml + "\n      </template>", this.viewResources);
        var view = viewFactory.create(this.container);
        var loadingScreenViewSlot = new aurelia_framework_1.ViewSlot(this.element, true);
        loadingScreenViewSlot.add(view);
        loadingScreenViewSlot.bind(this, {
            bindingContext: this,
            parentOverrideContext: this.overrideContext
        });
        loadingScreenViewSlot.attached();
        this.viewSlots.loadingScreenViewSlot = loadingScreenViewSlot;
    };
    LoadingScreen.prototype.enable = function (msg, collectionLength) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.loading = collectionLength ? collectionLength > 10000 ? true : false : false;
            _this.loadingMessage = msg || '...';
            setTimeout(function () {
                resolve(null);
            });
        });
    };
    LoadingScreen.prototype.disable = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.loading = false;
            setTimeout(function () {
                resolve();
            });
        });
    };
    return LoadingScreen;
}());
exports.LoadingScreen = LoadingScreen;

});
___scope___.file("grid/contextMenu.js", function(exports, require, module, __filename, __dirname){ 

var aurelia_framework_1 = require("aurelia-framework");
var ContextMenu = (function () {
    function ContextMenu(viewCompiler, container, viewResources, viewSlots) {
        this.menuStrings = {
            close: 'Close',
            pinLeft: 'Pin left',
            pinRight: 'Pin Right',
            groupBy: 'Group By',
            sortAscending: 'Sort Ascending',
            sortDescending: 'Sort Descending',
            showAll: 'Show All',
            clearCurrent: 'Clear Current',
            clearAll: 'Clear All',
            chooseOperator: 'Choose Operator',
            back: 'Back',
            equals: 'Equals',
            lessThanOrEqual: 'Less than or equal',
            greaterThanOrEqual: 'Greater than or equal',
            lessThan: 'Less than',
            greaterThan: 'Greater than',
            contains: 'Contains',
            notEqualTo: 'Not equal to',
            doesNotContain: 'Does not contain',
            beginsWith: 'Begins with',
            endsWith: 'Ends with'
        };
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.viewSlots = viewSlots;
        this.setDefaults();
    }
    ContextMenu.prototype.setDefaults = function () {
        this.top = 0;
        this.left = 0;
        this.show = false;
        this.pinnedMenu = false;
        this.sortMenu = false;
        this.filterMainMenu = false;
        this.filterOptionsMenu = false;
    };
    ContextMenu.prototype.init = function (customMenuTemplates, overrideContext) {
        this.overrideContext = overrideContext;
        var viewFactory = this.viewCompiler.compile("<template>" + this.menuHtml(customMenuTemplates) + "</template>", this.viewResources);
        var view = viewFactory.create(this.container);
        var viewSlot = new aurelia_framework_1.ViewSlot(document.body, true);
        viewSlot.add(view);
        this.viewSlots.contextMenu = viewSlot;
        viewSlot.bind(this, { bindingContext: this, parentOverrideContext: this.overrideContext });
        viewSlot.attached();
    };
    ContextMenu.prototype.openMenu = function (options) {
        this.left = options.left;
        this.top = options.top;
        this.pinnedMenu = options.pinned ? true : false;
        this.sortMenu = options.sort ? true : false;
        this.groupbyMenu = options.groupby ? true : false;
        this.filterMainMenu = options.filter ? true : false;
        this.show = true;
        this.callback = options.callback;
    };
    ContextMenu.prototype.menuClick = function (type, option, event) {
        switch (true) {
            case type === 'filter' && option === 'options':
                this.showFilterOptions();
                break;
            case type === 'filterOption' && option === 'Back':
                this.hideFilterOptions();
                break;
            case type === 'close' && option === 'true':
                this.show = false;
                break;
            default:
                var result = this.callback(type, option, event);
                if (result) {
                    this.show = false;
                    this.pinnedMenu = false;
                    this.sortMenu = false;
                    this.filterMainMenu = false;
                    this.filterOptionsMenu = false;
                }
        }
    };
    ContextMenu.prototype.updateMenuStrings = function (key, text) {
        if (this.menuStrings[key]) {
            this.menuStrings[key] = text;
        }
    };
    ContextMenu.prototype.showFilterOptions = function () {
        this.filterOptionsMenu = true;
    };
    ContextMenu.prototype.hideFilterOptions = function () {
        this.filterOptionsMenu = false;
    };
    ContextMenu.prototype.menuHtml = function (customMenuTemplates) {
        var menuTop = "<div css=\"top:$au{top}px;left:$au{left}px\" if.bind=\"show\" class=\"avg-default avg-menu\">".replace(/\$(au{)/g, '${');
        var menuClose = customMenuTemplates.close ||
            "<ul if.bind=\"show\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('close','true')\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                      <path d=\"M3 4l4.3 4L3 12h1.4L8 8.7l3.5 3.3H13L8.6 8 13 4h-1.5L8 7.3 4.4 4H3z\"/>\n                      </svg> $au{menuStrings.close}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuPinned = customMenuTemplates.pinned ||
            "<ul if.bind=\"pinnedMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('pinned','left', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> $au{menuStrings.pinLeft}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('pinned','right', $event)\" class=\"avg-menu__link\">\n                    <i class=\"avg-fa avg-text\"></i> $au{menuStrings.pinRight}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuGroupby = customMenuTemplates.groupby ||
            "<ul if.bind=\"groupbyMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('groupby','groupby', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                     <path d=\"M3 4v1h10V4H3zm3.7 2.4v1H13v-1H6.8zm0 2.4v1H13v-1H6.8zm0 2.3v1H13v-1H6.8z\"/>\n                      </svg> $au{menuStrings.groupBy}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuSort = customMenuTemplates.sort ||
            "<ul if.bind=\"sortMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('sort','asc', $event)\" class=\"avg-menu__link\">\n                       <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.4 6L3 10h1.5L8 7l3.4 3H13L8.5 6h-1z\"/>\n                      </svg> $au{menuStrings.sortAscending}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('sort','desc', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.4 10L3 6h1.5L8 9.2 11.3 6H13l-4.5 4h-1z\"/>\n                    </svg> $au{menuStrings.sortDescending}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuFilter = customMenuTemplates.filter ||
            "<ul if.bind=\"filterMainMenu && !filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','showall', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.4 4.8v2.7H4.7v1h2.7v3h1v-3h2.8v-1H8.5V4.8h-1z\"/>\n                      </svg> $au{menuStrings.showAll}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','clear', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M4.8 7.5h6.5v1H4.8z\">\n                      </svg> $au{menuStrings.clearCurrent}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','clearall', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M4.8 7.5h6.5v1H4.8z\">\n                      </svg> $au{menuStrings.clearAll}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filter','options', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.3 4v1.2L11 7.5H3v1h8l-3.7 2.2V12L13 8.4v-.8L7.3 4z\"/>\n                      </svg> $au{menuStrings.chooseOperator}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuFilterOptions = customMenuTemplates.filterOptions ||
            "<ul if.bind=\"filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','Back', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                       <path d=\"M8.7 4v1.2L5 7.5h8v1H5l3.7 2.2V12L3 8.4v-1L8.7 4z\"/>\n                      </svg> $au{menuStrings.back}\n                </p>\n                </li>\n            </ul>\n            <ul if.bind=\"filterOptionsMenu\" class=\"avg-menu__items\">\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 7H3V6h10v1zm0 3H3V9h10v1z\"/>\n                      </svg> $au{menuStrings.equals}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','<=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 10.3L3 7.5v-.7L13 4v1L5.3 7 13 9.3v1zm0 1.7H3v-1h10v1z\"/>\n                      </svg> $au{menuStrings.lessThanOrEqual}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','>=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 7.4L3 10.2v-1l7.7-2L3 5V4l10 2.7v.7zm0 4.5H3v-1h10v1z\"/>\n                      </svg> $au{menuStrings.greaterThanOrEqual}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','<', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                       <path d=\"M3 8.5L13 12v-1.2L5 8l8-2.7V4L3 7.7v1z\"/>\n                      </svg> $au{menuStrings.lessThan}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','>', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                      <path d=\"M13 8L3 12v-1.4l8-3-8-3.2V3l10 4v1z\"/>\n                      </svg> $au{menuStrings.greaterThan}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','*', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 9.7l-.7 1L8.6 9v3H7.4V9l-3.6 1.7-.7-1L7 8 3 6.2l.7-1 3.7 2V4h1.3v3l3.6-1.7.7 1L9 8l4 1.7z\"/>\n                      </svg> $au{menuStrings.contains}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','!=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M13 9.8H7.7l-1 2.2H5.7l1-2.2H2.8v-1h4L7.5 7H3V6h5l1-2H10l-1 2H13v1H9L8 9H13v1z\"/>\n                      </svg> $au{menuStrings.notEqualTo}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','!*', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                       <path d=\"M5 4V10H4V4h1zm5.5 0v3l2-1.7.5 1L10.7 8 13 9.8l-.4 1-2-2V12h-1l.2-3-2.2 1.7-.3-1L9.5 8 7.3 6.3l.3-1L9.8 7V4h.7zM5 11v1H4v-1h1z\"/>\n                      </svg> $au{menuStrings.doesNotContain}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','*=', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                      <path d=\"M5.2 4v3l-2-1.7-.2 1L5 8 3 9.8l.3 1 2-2V12h.6l-.2-3 2 1.8.2-1L6 8l2-1.8-.3-1-2 2L6 4H5zm3 2v1.2H13v-1H8.3zm0 2.8v1H13v-1H8.3z\"/>\n                      </svg> $au{menuStrings.beginsWith}\n                </p>\n                </li>\n                <li class=\"avg-menu__item\">\n                <p click.delegate=\"menuClick('filterOption','=*', $event)\" class=\"avg-menu__link\">\n                    <svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M10.8 4v3l2-1.8.2 1L11 8l2 1.7-.3 1-2-2V12h-.6l.2-3.2-2 2-.3-1 2-2-2-1.6.3-1 2 2L10 4h.8zm-3 2v1H3V6h4.7zm0 2.7v1H3v-1h4.7z\"/>\n                      </svg> $au{menuStrings.endsWith}\n                </p>\n                </li>\n            </ul>".replace(/\$(au{)/g, '${');
        var menuBottom = "</div>";
        var menuAll = customMenuTemplates.all || [
            menuTop,
            menuClose,
            menuPinned,
            menuGroupby,
            menuSort,
            menuFilter,
            menuFilterOptions,
            menuBottom,
        ].join('');
        return menuAll;
    };
    return ContextMenu;
}());
exports.ContextMenu = ContextMenu;

});
___scope___.file("grid/v-grid.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var mainMarkup_1 = require("./mainMarkup");
var mainScrollEvents_1 = require("./mainScrollEvents");
var rowMarkup_1 = require("./rowMarkup");
var rowScrollEvents_1 = require("./rowScrollEvents");
var columnMarkup_1 = require("./columnMarkup");
var htmlCache_1 = require("./htmlCache");
var htmlHeightWidth_1 = require("./htmlHeightWidth");
var viewSlots_1 = require("./viewSlots");
var columnBindingContext_1 = require("./columnBindingContext");
var rowDataBinder_1 = require("./rowDataBinder");
var rowClickHandler_1 = require("./rowClickHandler");
var groupingElements_1 = require("./groupingElements");
var controller_1 = require("./controller");
var loadingScreen_1 = require("./loadingScreen");
var contextMenu_1 = require("./contextMenu");
var footer_1 = require("./footer");
var VGrid = (function () {
    function VGrid(element, viewCompiler, container, viewResources, taskQueue) {
        this.element = element;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.taskQueue = taskQueue;
        this.dragDropAttributeSharedContext = {};
        this.resizeAttributeSharedContext = {};
        this.colConfig = [];
        this.backupColConfig = [];
        this.colRepeater = false;
        this.colRepeatRowTemplate = null;
        this.colRepeatRowHeaderTemplate = null;
        this.colGroupRow = null;
        this.colGroupElement = null;
        this.customMenuTemplates = {};
        this.footerTemplate = null;
        this.loadingScreenTemplate = null;
        this.newGrid = true;
        this.controller = new controller_1.Controller(this);
        this.htmlCache = new htmlCache_1.HtmlCache(element);
        this.htmlHeightWidth = new htmlHeightWidth_1.HtmlHeightWidth(this.controller);
        this.viewSlots = new viewSlots_1.ViewSlots(this.htmlCache);
        this.columnBindingContext = new columnBindingContext_1.ColumnBindingContext(this.controller);
        this.rowDataBinder = new rowDataBinder_1.RowDataBinder(element, this.controller);
        this.mainMarkup = new mainMarkup_1.MainMarkup(element, viewCompiler, container, viewResources, this.htmlHeightWidth, this.viewSlots);
        this.mainScrollEvents = new mainScrollEvents_1.MainScrollEvents(element, this.htmlCache);
        this.rowMarkup = new rowMarkup_1.RowMarkup(element, this.htmlCache);
        this.rowScrollEvents = new rowScrollEvents_1.RowScrollEvents(element, this.htmlCache, this.controller);
        this.rowClickHandler = new rowClickHandler_1.RowClickHandler(element, this.htmlCache);
        this.columnMarkup = new columnMarkup_1.ColumnMarkup(element, viewCompiler, container, viewResources, this.htmlCache, this.viewSlots, this.columnBindingContext);
        this.groupingElements = new groupingElements_1.GroupingElements(element, viewCompiler, container, viewResources, this.htmlCache, this.viewSlots, this.columnBindingContext);
        this.loadingScreen = new loadingScreen_1.LoadingScreen(element, viewCompiler, container, viewResources, this.viewSlots);
        this.contextMenu = new contextMenu_1.ContextMenu(viewCompiler, container, viewResources, this.viewSlots);
        this.footer = new footer_1.Footer(this.htmlCache, viewCompiler, container, viewResources, this.viewSlots);
        this.filterOperatorNames = {
            '=': 'equals',
            '<=': 'less than or eq',
            '>=': 'greater than or eq',
            '<': 'less than',
            '>': 'greater than',
            '*': 'contains',
            '!=': 'not equal to',
            '!*': 'does not contain',
            '*=': 'begins with',
            '=*': 'ends with'
        };
        this.filterOperatorTranslationKeys = {
            equals: '=',
            lessThanOrEqual: '<=',
            greaterThanOrEqual: '>=',
            lessThan: '<',
            greaterThan: '>',
            contains: '*',
            notEqualTo: '!=',
            doesNotContain: '!*',
            beginsWith: '*=',
            endsWith: '=*'
        };
    }
    VGrid.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.attRowHeight = this.attRowHeight ? this.attRowHeight * 1 : 25;
        this.attHeaderHeight = this.attHeaderHeight ? this.attHeaderHeight * 1 : 25;
        this.attFooterHeight = this.attFooterHeight ? this.attFooterHeight * 1 : 25;
        this.attPanelHeight = this.attPanelHeight ? this.attPanelHeight * 1 : 25;
        this.attDataDelay = this.attDataDelay ? this.attDataDelay * 1 : 0;
        this.attMultiSelect = this.checkBool(this.attMultiSelect);
        this.attManualSelection = this.attManualSelection ? this.checkBool(this.attManualSelection) : null;
        this.attVariableRowHeight = this.attVariableRowHeight ? this.checkBool(this.attVariableRowHeight) : null;
        this.attTheme = this.attTheme || 'avg-default';
        this.element.classList.add(this.attTheme);
        this.attOnRowDraw = typeof this.attOnRowDraw === 'function' ? this.attOnRowDraw : null;
        this.attI18N = typeof this.attI18N === 'function' ? this.attI18N : null;
    };
    VGrid.prototype.unbind = function () {
        this.newGrid = false;
        this.viewSlots.unbindAndDetachColumns();
    };
    VGrid.prototype.attached = function () {
        var _this = this;
        this.attGridConnector.connect(this.controller, function () {
            if (_this.newGrid) {
                _this.backupColConfig = _this.colConfig.slice(0);
                if (_this.attColConfig) {
                    _this.colConfig = _this.attColConfig.length > 0 ? _this.attColConfig : _this.colConfig;
                }
                _this.controller.getContext();
                _this.controller.createGrid();
            }
            _this.viewSlots.bindAndAttachColumns(_this.overrideContext, _this.columnBindingContext, _this.attGridConnector.getSelection());
            setTimeout(function () {
                _this.controller.udateHorizontalScroller();
            }, 50);
            _this.attGridConnector.gridCreated();
        });
    };
    VGrid.prototype.checkBool = function (value) {
        if (typeof value === 'string') {
            value = value.toLowerCase();
        }
        switch (true) {
            case value === 'true':
            case value === true:
                value = true;
                break;
            case value === 'false':
            case value === false:
                value = false;
                break;
            default:
                value = false;
                break;
        }
        return value;
    };
    return VGrid;
}());
VGrid.inject = [Element, aurelia_framework_1.ViewCompiler, aurelia_framework_1.Container, aurelia_framework_1.ViewResources, aurelia_framework_1.TaskQueue];
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-row-height' }),
    __metadata("design:type", Number)
], VGrid.prototype, "attRowHeight", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-header-height' }),
    __metadata("design:type", Number)
], VGrid.prototype, "attHeaderHeight", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-footer-height' }),
    __metadata("design:type", Number)
], VGrid.prototype, "attFooterHeight", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-panel-height' }),
    __metadata("design:type", Number)
], VGrid.prototype, "attPanelHeight", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-grid-connector' }),
    __metadata("design:type", Object)
], VGrid.prototype, "attGridConnector", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-multi-select' }),
    __metadata("design:type", Boolean)
], VGrid.prototype, "attMultiSelect", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-manual-sel' }),
    __metadata("design:type", Boolean)
], VGrid.prototype, "attManualSelection", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-theme' }),
    __metadata("design:type", String)
], VGrid.prototype, "attTheme", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-row-on-draw' }),
    __metadata("design:type", Function)
], VGrid.prototype, "attOnRowDraw", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-columns' }),
    __metadata("design:type", Array)
], VGrid.prototype, "attColConfig", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-i18n' }),
    __metadata("design:type", Function)
], VGrid.prototype, "attI18N", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-data-delay' }),
    __metadata("design:type", Number)
], VGrid.prototype, "attDataDelay", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-variable-row-height' }),
    __metadata("design:type", Boolean)
], VGrid.prototype, "attVariableRowHeight", void 0);
exports.VGrid = VGrid;

});
___scope___.file("grid/footer.js", function(exports, require, module, __filename, __dirname){ 

var aurelia_framework_1 = require("aurelia-framework");
var Footer = (function () {
    function Footer(htmlCache, viewCompiler, container, viewResources, viewSlots) {
        this.htmlCache = htmlCache;
        this.viewSlots = viewSlots;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
    }
    Footer.prototype.init = function (overrideContext, footerStringTemplate) {
        this.overrideContext = overrideContext;
        var footerTemplate = footerStringTemplate || "".replace(/\$(au{)/g, '${');
        var viewFactory = this.viewCompiler.compile("<template>\n      " + footerTemplate + "\n      </template>", this.viewResources);
        var view = viewFactory.create(this.container);
        var footerViewSlot = new aurelia_framework_1.ViewSlot(this.htmlCache.avg_footer, true);
        footerViewSlot.add(view);
        footerViewSlot.bind(this, {
            bindingContext: this,
            parentOverrideContext: this.overrideContext
        });
        footerViewSlot.attached();
        this.viewSlots.footerViewSlot = footerViewSlot;
    };
    return Footer;
}());
exports.Footer = Footer;

});
___scope___.file("gridConnector.js", function(exports, require, module, __filename, __dirname){ 

var GridConnector = (function () {
    function GridConnector(datasource, selection, errorHandler) {
        this.initTop = 0;
        this.controller = null;
        this.datasource = datasource;
        this.key = datasource.getKey();
        this.selection = selection || datasource.getSelection();
        this.errorhandler = errorHandler || null;
    }
    GridConnector.prototype.setInitTop = function (top) {
        this.initTop = top;
    };
    GridConnector.prototype.getSelection = function () {
        return this.selection;
    };
    GridConnector.prototype.connect = function (controller, create) {
        this.controller = controller;
        this.eventID = this.datasource.addEventListener(this.eventHandler.bind(this));
        this.controller.element.style.visibility = 'hidden';
        create();
    };
    GridConnector.prototype.gridCreated = function () {
        var _this = this;
        this.raiseEvent('sortIconUpdate');
        this.controller.updateHeights();
        setTimeout(function () {
            _this.controller.updateHeaderGrouping(_this.datasource.getGrouping());
            _this.raiseEvent('sortIconUpdate');
            _this.raiseEvent('filterUpdateValues');
            _this.controller.triggerScroll(_this.initTop);
            setTimeout(function () {
                _this.controller.element.style.visibility = 'visible';
            }, 100);
        }, 0);
    };
    GridConnector.prototype.select = function (row) {
        this.datasource.select(row);
    };
    GridConnector.prototype.getRowHeightState = function () {
        return this.datasource.getRowHeightState();
    };
    GridConnector.prototype.getDatasourceLength = function () {
        return this.datasource.length();
    };
    GridConnector.prototype.getColConfig = function () {
        return this.controller.getColumnConfig();
    };
    GridConnector.prototype.setColConfig = function (colconfig) {
        this.controller.setColumnConfig(colconfig);
    };
    GridConnector.prototype.getGrouping = function () {
        return this.datasource.getGrouping();
    };
    GridConnector.prototype.group = function (grouping, keepExpanded) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.group(grouping, keepExpanded);
        });
    };
    GridConnector.prototype.getElement = function (options) {
        var rowData = this.datasource.getElement(options.row);
        var rowContext = {
            row: options.row,
            selection: this.selection,
            rowRef: rowData,
            tempRef: this.getRowProperties(rowData)
        };
        options.callback(rowContext);
    };
    GridConnector.prototype.query = function (a) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.query(a);
        });
    };
    GridConnector.prototype.orderBy = function (attribute, addToCurrentSort) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.orderBy(attribute, addToCurrentSort);
        });
    };
    GridConnector.prototype.destroy = function () {
        this.datasource.removeEventListener(this.eventID);
    };
    GridConnector.prototype.getCurrentOrderBy = function () {
        return this.datasource.getCurrentOrderBy();
    };
    GridConnector.prototype.getCurrentFilter = function () {
        return this.datasource.getCurrentFilter();
    };
    GridConnector.prototype.expandGroup = function (id) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.groupExpand(id);
        });
    };
    GridConnector.prototype.collapseGroup = function (id) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.groupCollapse(id);
        });
    };
    GridConnector.prototype.getTopRow = function () {
        return this.controller.getTopRow();
    };
    GridConnector.prototype.triggerI18n = function () {
        this.controller.triggerI18N();
    };
    GridConnector.prototype.raiseEvent = function (name, data) {
        if (data === void 0) { data = {}; }
        var event = new CustomEvent(name, {
            detail: data,
            bubbles: true
        });
        if (this.controller) {
            this.controller.element.dispatchEvent(event);
        }
    };
    GridConnector.prototype.eventHandler = function (event) {
        switch (event) {
            case 'collection_changed':
            case 'collection_grouped':
            case 'collection_collapsed_all':
            case 'collection_expanded_all':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.udateHorizontalScroller();
                this.controller.triggerScroll(0);
                this.controller.updateHeaderGrouping(this.datasource.getGrouping());
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_collapsed':
            case 'collection_expanded':
            case 'collection_updated':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.udateHorizontalScroller();
                this.controller.triggerScroll(null);
                this.controller.updateHeaderGrouping(this.datasource.getGrouping());
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_sorted':
                this.raiseEvent('sortIconUpdate');
                this.controller.rebindAllRows();
                this.controller.triggerScroll(null);
                this.controller.setLoadingScreen(false);
                break;
            case 'collection_filtered':
                this.raiseEvent('sortIconUpdate');
                this.controller.updateHeights();
                this.controller.triggerScroll(null);
                this.controller.setLoadingScreen(false);
                break;
            case 'selection_changed':
                break;
            default:
                console.warn('unknown event');
                console.warn(event);
        }
        return true;
    };
    GridConnector.prototype.getRowProperties = function (obj) {
        var x = {};
        if (obj) {
            var k = void 0;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    if (x[k] !== obj[k]) {
                        x[k] = obj[k];
                    }
                }
            }
        }
        return x;
    };
    return GridConnector;
}());
exports.GridConnector = GridConnector;

});
___scope___.file("dataSource.js", function(exports, require, module, __filename, __dirname){ 

var selection_1 = require("./selection");
var collection_1 = require("./collection");
var arrayUtils_1 = require("./utils/arrayUtils");
var DataSource = (function () {
    function DataSource(selection, config) {
        this.selection = selection || new selection_1.Selection('single');
        this.selectionEventID = this.selection.addEventListener(this.selectionEventCallback.bind(this));
        this.selection.overrideGetRowKey(this.getRowKey.bind(this));
        this.selection.overrideGetRowKeys(this.getRowKeys.bind(this));
        this.arrayUtils = new arrayUtils_1.ArrayUtils();
        this.key = null;
        this.mainArray = null;
        this.config = config;
        if (config) {
            this.key = config.key || '__avgKey';
            this.rowHeight = config.rowHeight || 25;
            this.groupHeight = config.groupHeight || 25;
        }
        else {
            this.key = '__avgKey';
        }
        this.eventIdCount = -1;
        this.eventCallBacks = [];
        this.entity = null;
        this.collection = new collection_1.Collection(this);
    }
    DataSource.prototype.getSelection = function () {
        return this.selection;
    };
    DataSource.prototype.getKey = function () {
        return this.key;
    };
    DataSource.prototype.length = function () {
        return this.collection.length;
    };
    DataSource.prototype.triggerEvent = function (event) {
        var _this = this;
        this.eventCallBacks.forEach(function (FN, i) {
            if (FN !== null) {
                var alive = FN(event);
                if (!alive) {
                    _this.eventCallBacks[i] = null;
                }
            }
        });
    };
    DataSource.prototype.addEventListener = function (callback) {
        this.eventIdCount++;
        this.eventCallBacks.push(callback);
        return this.eventIdCount;
    };
    DataSource.prototype.removeEventListener = function (id) {
        this.eventCallBacks.splice(id, 1);
    };
    DataSource.prototype.setArray = function (array) {
        this.collection = new collection_1.Collection(this);
        this.selection.reset();
        this.arrayUtils.resetGrouping();
        this.arrayUtils.resetSort(this.key);
        this.entity = null;
        this.collection.setData(array);
        this.mainArray = this.collection.getEntities();
        this.triggerEvent('collection_changed');
    };
    DataSource.prototype.push = function (array) {
        if (Array.isArray(array)) {
            var grouping = this.arrayUtils.getGrouping();
            var collection = this.collection.getEntities();
            collection = collection.concat(array);
            this.collection.setData(collection);
            this.mainArray = this.collection.getEntities();
            this.arrayUtils.runOrderbyOn(this.collection.getEntities());
            var untouchedgrouped = this.collection.getEntities();
            if (grouping.length > 0) {
                var groupedArray = this.arrayUtils.group(untouchedgrouped, grouping, true);
                this.collection.setData(groupedArray, untouchedgrouped);
            }
            this.triggerEvent('collection_updated');
        }
    };
    DataSource.prototype.refresh = function (data) {
        if (data) {
            this.collection = new collection_1.Collection(this);
            this.collection.setData(data);
            this.mainArray = this.collection.getEntities();
            this.entity = null;
        }
        var grouping = this.arrayUtils.getGrouping();
        this.arrayUtils.runOrderbyOn(this.collection.getEntities());
        if (grouping.length > 0) {
            var unGroupedArray = this.collection.getEntities();
            var groupedArray = this.arrayUtils.group(unGroupedArray, grouping, true);
            this.collection.setData(groupedArray, unGroupedArray);
        }
        this.triggerEvent('collection_updated');
    };
    DataSource.prototype.select = function (row) {
        this.entity = this.collection.getRow(row);
    };
    DataSource.prototype.query = function (options) {
        if (options) {
            var newArray = this.arrayUtils.query(this.mainArray, options);
            this.collection.setData(newArray);
        }
        else {
            this.collection.setData(this.mainArray);
        }
        this.orderBy(null, true);
        this.triggerEvent('collection_filtered');
    };
    DataSource.prototype.orderBy = function (attribute, addToCurrentSort) {
        var collection = this.collection.getEntities();
        var result = this.arrayUtils.orderBy(collection, attribute, addToCurrentSort);
        this.collection.setData(result.fixed, result.full);
        this.triggerEvent('collection_sorted');
    };
    DataSource.prototype.getCurrentOrderBy = function () {
        return this.arrayUtils.getOrderBy();
    };
    DataSource.prototype.getCurrentFilter = function () {
        return this.arrayUtils.getCurrentFilter();
    };
    DataSource.prototype.getElement = function (row) {
        if (row === undefined || row === null) {
            throw new Error('row missing');
        }
        else {
            return this.collection.getRow(row);
        }
    };
    DataSource.prototype.group = function (grouping, keepExpanded) {
        var _this = this;
        this.arrayUtils.resetSort();
        grouping.forEach(function (group) {
            _this.arrayUtils.setOrderBy(group.field, true);
        });
        this.arrayUtils.runOrderbyOn(this.collection.getEntities());
        var ungroupedArray = this.collection.getEntities();
        var groupedArray = this.arrayUtils.group(ungroupedArray, grouping, keepExpanded);
        this.collection.setData(groupedArray, ungroupedArray);
        this.triggerEvent('collection_grouped');
    };
    DataSource.prototype.groupCollapse = function (id) {
        var groupedArray = this.arrayUtils.groupCollapse(id);
        var ungroupedArray = this.collection.getEntities();
        this.collection.setData(groupedArray, ungroupedArray);
        if (id) {
            this.triggerEvent('collection_collapsed');
        }
        else {
            this.triggerEvent('collection_collapsed_all');
        }
    };
    DataSource.prototype.groupExpand = function (id) {
        var groupedArray = this.arrayUtils.groupExpand(id);
        var ungroupedArray = this.collection.getEntities();
        this.collection.setData(groupedArray, ungroupedArray);
        if (id) {
            this.triggerEvent('collection_expanded');
        }
        else {
            this.triggerEvent('collection_expanded_all');
        }
    };
    DataSource.prototype.getGrouping = function () {
        return this.arrayUtils.getGrouping();
    };
    DataSource.prototype.addBlankRow = function () {
        var newElement = {};
        this.mainArray.unshift(newElement);
        var collectionUngrouped = this.collection.getEntities();
        var displayedCollection = this.collection.getCurrentEntities();
        var index = collectionUngrouped.indexOf(newElement);
        if (index === -1) {
            collectionUngrouped.unshift(newElement);
        }
        displayedCollection.unshift(newElement);
        this.collection.setData(displayedCollection, collectionUngrouped);
        this.entity = newElement;
        this.triggerEvent('collection_filtered');
    };
    DataSource.prototype.unshift = function (data) {
        if (data) {
            this.mainArray.unshift(data);
            var displayedCollection = this.collection.getEntities();
            var ungroupedCollection = this.collection.getCurrentEntities();
            var index = displayedCollection.indexOf(data);
            if (index === -1) {
                displayedCollection.unshift(data);
            }
            ungroupedCollection.unshift(data);
            this.collection.setData(ungroupedCollection, displayedCollection);
            this.entity = data;
            this.triggerEvent('collection_filtered');
        }
    };
    DataSource.prototype.remove = function (rows) {
        var _this = this;
        var keysToDelete = new Set();
        var returnArray = [];
        if (Array.isArray(rows)) {
            rows.forEach(function (row) {
                keysToDelete.add(_this.getRowKey(row));
            });
        }
        else {
            if (this.entity && Number.isInteger(rows)) {
                keysToDelete.add(this.getRowKey(rows));
            }
        }
        if (keysToDelete.size > 0) {
            var oldArray = this.collection.getEntities();
            for (var i = 0; i < oldArray.length; i++) {
                if (keysToDelete.has(oldArray[i][this.key]) === true) {
                    returnArray.push(oldArray.splice(i, 1)[0]);
                    i--;
                }
            }
            this.collection.setData(oldArray);
            this.refresh();
        }
        return returnArray;
    };
    DataSource.prototype.getCollectionStatus = function () {
        var status = {};
        status.collectionLength = this.mainArray ? this.mainArray.length : 0;
        status.filteredCollectionLength = this.collection.getEntities().length;
        status.selectionLength = this.selection.getLength();
        return status;
    };
    DataSource.prototype.setLocaleCompare = function (code, options) {
        this.arrayUtils.setLocaleCompare(code, options);
    };
    DataSource.prototype.getRowHeightState = function () {
        return this.collection.getRowHeightState();
    };
    DataSource.prototype.getRowKey = function (row) {
        if (this.collection) {
            return this.collection.getRowKey(row);
        }
        else {
            return null;
        }
    };
    DataSource.prototype.getRowKeys = function () {
        if (this.collection) {
            return this.collection.getRowKeys();
        }
        else {
            return [];
        }
    };
    DataSource.prototype.selectionEventCallback = function (e) {
        this.triggerEvent(e);
        return true;
    };
    return DataSource;
}());
exports.DataSource = DataSource;

});
___scope___.file("selection.js", function(exports, require, module, __filename, __dirname){ 

var Selection = (function () {
    function Selection(mode) {
        this.mode = mode;
        this.selectedRows = 0;
        this.eventIdCount = -1;
        this.eventCallBacks = [];
        this.selection = new Set([]);
    }
    Selection.prototype.triggerEvent = function (event) {
        var _this = this;
        this.eventCallBacks.forEach(function (FN, i) {
            if (FN !== null) {
                var alive = FN(event);
                if (!alive) {
                    _this.eventCallBacks[i] = null;
                }
            }
        });
    };
    Selection.prototype.addEventListener = function (callback) {
        this.eventIdCount++;
        this.eventCallBacks.push(callback);
        return this.eventIdCount;
    };
    Selection.prototype.getLength = function () {
        return this.selection.size;
    };
    Selection.prototype.getMode = function () {
        return this.mode;
    };
    Selection.prototype.getRowKey = function (row) {
        return row;
    };
    Selection.prototype.getRowKeys = function () {
        return [];
    };
    Selection.prototype.overrideGetRowKey = function (fn) {
        this.getRowKey = fn;
    };
    Selection.prototype.overrideGetRowKeys = function (fn) {
        this.getRowKeys = fn;
    };
    Selection.prototype.isSelected = function (row) {
        var result = false;
        if (this.selectedRows > 0) {
            result = this.selection.has(this.getRowKey(row));
        }
        return result;
    };
    Selection.prototype.deSelectAll = function () {
        this.selection.clear();
        this.selectedRows = this.selection.size;
        this.triggerEvent('selection_changed');
    };
    Selection.prototype.deSelect = function (row) {
        this.selection.delete(this.getRowKey(row));
        this.selectedRows = this.selection.size;
        this.triggerEvent('selection_changed');
    };
    Selection.prototype.select = function (row, add) {
        switch (this.mode) {
            case 'none':
            case null:
            case undefined:
                break;
            case 'single':
                this.selection.clear();
                this.selection.add(this.getRowKey(row));
                this.selectedRows = this.selection.size;
                break;
            case 'multiple':
                if (!add) {
                    this.selection.clear();
                    this.selection.add(this.getRowKey(row));
                    this.selectedRows = this.selection.size;
                }
                else {
                    this.selection.add(this.getRowKey(row));
                    this.selectedRows = this.selection.size;
                }
                break;
            default:
        }
        this.triggerEvent('selection_changed');
    };
    Selection.prototype.selectRange = function (start, end) {
        if (this.mode === 'multiple') {
            this.selection.clear();
            for (var i = start; i < end + 1; i++) {
                this.selection.add(this.getRowKey(i));
            }
            this.selectedRows = this.selection.size;
            this.triggerEvent('selection_changed');
        }
    };
    Selection.prototype.getSelectedRows = function () {
        var _this = this;
        var array = [];
        var keys = this.getRowKeys();
        if (this.selectedRows > 0) {
            keys.forEach(function (key, index) {
                if (_this.selection.has(key) === true) {
                    array.push(index);
                }
            });
        }
        return array;
    };
    Selection.prototype.setSelectedRows = function (newRows) {
        if (this.selectedRows > 0) {
            this.selection.clear();
        }
        for (var i = 0; i < newRows.length; i++) {
            this.selection.add(this.getRowKey(newRows[i]));
        }
        this.selectedRows = this.selection.size;
        this.triggerEvent('selection_changed');
    };
    Selection.prototype.reset = function () {
        if (this.selectedRows > 0) {
            this.selection.clear();
        }
        this.selectedRows = this.selection.size;
        this.triggerEvent('selection_changed');
    };
    return Selection;
}());
exports.Selection = Selection;

});
___scope___.file("collection.js", function(exports, require, module, __filename, __dirname){ 

var Collection = (function () {
    function Collection(datasource) {
        this.datasource = datasource;
        this.key = datasource.getKey();
        this.rowHeight = datasource.rowHeight || 25;
        this.groupHeight = datasource.groupHeight || 25;
        this.displayedEntities = [];
        this.keys = [];
        this.count = 0;
        this.length = 0;
        this.ungroupedArray = [];
        this.rowHeightArray = [];
        this.rowTopArray = [];
        this.rowHeightTotal = 0;
    }
    Collection.prototype.setData = function (array, ungroupedArray) {
        var _this = this;
        this.displayedEntities = [];
        this.keys = [];
        this.rowHeightArray = [];
        this.rowHeightTotal = 0;
        this.rowTopArray = [];
        this.ungroupedArray = ungroupedArray || array;
        this.length = array.length;
        array.forEach(function (rowData) {
            if (!rowData[_this.key]) {
                _this.count++;
                rowData[_this.key] = _this.count;
            }
            if (!rowData.__group) {
                _this.rowHeightArray.push(_this.rowHeight);
                _this.rowTopArray.push(_this.rowHeightTotal);
                _this.rowHeightTotal = _this.rowHeightTotal + _this.rowHeight;
                _this.keys.push(rowData[_this.key]);
            }
            else {
                _this.rowHeightArray.push(_this.groupHeight);
                _this.rowTopArray.push(_this.rowHeightTotal);
                _this.rowHeightTotal = _this.rowHeightTotal + _this.groupHeight;
                _this.keys.push(null);
            }
            _this.displayedEntities.push(rowData);
        });
    };
    Collection.prototype.getRowHeightState = function () {
        return {
            total: this.rowHeightTotal,
            rows: this.rowHeightArray,
            top: this.rowTopArray
        };
    };
    Collection.prototype.getEntities = function () {
        return this.ungroupedArray;
    };
    Collection.prototype.getCurrentEntities = function () {
        return this.displayedEntities;
    };
    Collection.prototype.getRowKey = function (row) {
        return this.keys[row];
    };
    Collection.prototype.getRowKeys = function () {
        return this.keys;
    };
    Collection.prototype.getRow = function (row) {
        return this.displayedEntities[row];
    };
    Collection.prototype.getRowFromEntity = function (entity) {
        return this.displayedEntities.indexOf(entity);
    };
    return Collection;
}());
exports.Collection = Collection;

});
___scope___.file("utils/arrayUtils.js", function(exports, require, module, __filename, __dirname){ 

var arrayFilter_1 = require("./arrayFilter");
var arraySort_1 = require("./arraySort");
var arrayGrouping_1 = require("./arrayGrouping");
var ArrayUtils = (function () {
    function ArrayUtils() {
        this.arrayFilter = new arrayFilter_1.ArrayFilter();
        this.arraySort = new arraySort_1.ArraySort();
        this.arrayGrouping = new arrayGrouping_1.ArrayGrouping();
    }
    ArrayUtils.prototype.orderBy = function (collection, attribute, addToCurrentSort) {
        var groupingFields = this.getGrouping().map(function (data) { return data.field; });
        var grouping = this.getGrouping();
        var result = {
            fixed: null,
            full: null
        };
        if (groupingFields.length > 0) {
            var lastSort = this.getOrderBy();
            this.resetSort();
            var exist_1 = false;
            var newSort_1 = [];
            var count_1 = 0;
            lastSort.forEach(function (sort) {
                count_1++;
                if (groupingFields.indexOf(sort.attribute) !== -1 || addToCurrentSort) {
                    newSort_1.push(sort);
                    if (sort.attribute === attribute) {
                        sort.asc = sort.asc === true ? false : true;
                        sort.no = count_1;
                        exist_1 = true;
                    }
                }
                else {
                    if (sort.attribute === attribute) {
                        sort.asc = sort.asc === true ? false : true;
                        sort.no = count_1;
                        exist_1 = true;
                        newSort_1.push(sort);
                    }
                }
            });
            this.setLastSort(newSort_1);
            if (!exist_1 && attribute) {
                this.setOrderBy(attribute, true);
            }
            this.runOrderbyOn(collection);
            var groupedArray = this.group(collection, grouping, true);
            result = {
                fixed: groupedArray,
                full: collection
            };
        }
        else {
            if (!attribute) {
                var lastSort = this.getOrderBy();
                this.resetSort();
                this.setLastSort(lastSort);
                this.runOrderbyOn(collection);
                result = {
                    fixed: collection,
                    full: collection
                };
            }
            else {
                this.setOrderBy(attribute, addToCurrentSort);
                this.runOrderbyOn(collection);
                result = {
                    fixed: collection,
                    full: collection
                };
            }
        }
        return result;
    };
    ArrayUtils.prototype.group = function (array, grouping, keepExpanded) {
        return this.arrayGrouping.group(array, grouping, keepExpanded);
    };
    ArrayUtils.prototype.getGrouping = function () {
        return this.arrayGrouping.getGrouping();
    };
    ArrayUtils.prototype.groupCollapse = function (id) {
        return this.arrayGrouping.collapse(id);
    };
    ArrayUtils.prototype.groupExpand = function (id) {
        return this.arrayGrouping.expand(id);
    };
    ArrayUtils.prototype.getOrderBy = function () {
        return this.arraySort.getOrderBy();
    };
    ArrayUtils.prototype.setLastSort = function (array) {
        this.arraySort.setLastSort(array);
    };
    ArrayUtils.prototype.setOrderBy = function (attribute, addToCurrentSort) {
        this.arraySort.setOrderBy(attribute, addToCurrentSort);
    };
    ArrayUtils.prototype.runOrderbyOn = function (array) {
        this.arraySort.runOrderbyOn(array);
    };
    ArrayUtils.prototype.resetSort = function (defaultSortAttribute) {
        this.arraySort.reset(defaultSortAttribute);
    };
    ArrayUtils.prototype.resetGrouping = function () {
        this.arrayGrouping.reset();
    };
    ArrayUtils.prototype.getCurrentFilter = function () {
        return this.arrayFilter.getLastFilter();
    };
    ArrayUtils.prototype.query = function (array, params) {
        return this.arrayFilter.runQueryOn(array, params);
    };
    ArrayUtils.prototype.setLocaleCompare = function (code, options) {
        this.arraySort.setLocaleCompare(code, options);
    };
    return ArrayUtils;
}());
exports.ArrayUtils = ArrayUtils;

});
___scope___.file("utils/arrayFilter.js", function(exports, require, module, __filename, __dirname){ 

var ArrayFilter = (function () {
    function ArrayFilter() {
        this.filterOperators = {
            '=': 1,
            '<=': 2,
            '>=': 3,
            '<': 4,
            '>': 5,
            '*': 6,
            '!=': 7,
            '!*': 8,
            '*=': 9,
            '=*': 10
        };
        this.lastFilter = [];
    }
    ArrayFilter.prototype.getOperatorNo = function (val) {
        return this.filterOperators[val];
    };
    ArrayFilter.prototype.getLastFilter = function () {
        return this.lastFilter;
    };
    ArrayFilter.prototype.runQueryOn = function (objArray, ObjFilter) {
        var _this = this;
        this.lastFilter = ObjFilter;
        var resultArray = objArray.filter(function (data) {
            var result = true;
            ObjFilter.forEach(function (x) {
                var rowValue;
                var filterValue;
                var filterOperator = _this.getOperatorNo(x.operator);
                var newFilterOperator;
                var typeBool = {
                    true: true,
                    false: false
                };
                var type;
                try {
                    type = typeof (data[x.attribute]);
                }
                catch (e) {
                    type = 'string';
                }
                switch (type) {
                    case 'number':
                        rowValue = data[x.attribute];
                        filterValue = Number(x.value);
                        filterOperator = filterOperator || 1;
                        if (filterOperator === 6) {
                            filterOperator = 1;
                        }
                        break;
                    case 'string':
                        rowValue = data[x.attribute].toLowerCase();
                        filterValue = x.value.toLowerCase();
                        filterOperator = filterOperator || 9;
                        newFilterOperator = filterOperator;
                        if (x.value.charAt(0) === '*' && filterOperator === 9) {
                            newFilterOperator = 6;
                            filterValue = filterValue.substr(1, filterValue.length);
                        }
                        if (x.value.charAt(0) === '*' && filterOperator === 1) {
                            newFilterOperator = 10;
                            filterValue = filterValue.substr(1, filterValue.length);
                        }
                        if (x.value.charAt(x.value.length - 1) === '*' && filterOperator === 1 && newFilterOperator === 10) {
                            newFilterOperator = 6;
                            filterValue = filterValue.substr(0, filterValue.length - 1);
                        }
                        if (x.value.charAt(x.value.length - 1) === '*'
                            && filterOperator === 1
                            && newFilterOperator !== 10
                            && newFilterOperator !== 6) {
                            newFilterOperator = 9;
                            filterValue = filterValue.substr(0, filterValue.length - 1);
                        }
                        if (filterOperator !== newFilterOperator) {
                            filterOperator = newFilterOperator;
                        }
                        break;
                    case 'boolean':
                        rowValue = data[x.attribute];
                        filterValue = typeBool[x.value];
                        filterOperator = 1;
                        break;
                    case 'object':
                        rowValue = data[x.attribute].toISOString();
                        filterValue = new Date(x.value).toISOString();
                        filterOperator = filterOperator || 2;
                        break;
                    default:
                        try {
                            rowValue = data[x.attribute].toLowerCase();
                        }
                        catch (err) {
                            rowValue = data[x.attribute];
                        }
                        try {
                            filterValue = x.value.toLowerCase();
                        }
                        catch (err) {
                            filterValue = x.value;
                        }
                        filterOperator = filterOperator || 1;
                        break;
                }
                switch (filterOperator) {
                    case 1:
                        if (rowValue !== filterValue) {
                            result = false;
                        }
                        break;
                    case 2:
                        if (!(rowValue <= filterValue)) {
                            result = false;
                        }
                        break;
                    case 3:
                        if (!(rowValue >= filterValue)) {
                            result = false;
                        }
                        break;
                    case 4:
                        if (!(rowValue < filterValue)) {
                            result = false;
                        }
                        break;
                    case 5:
                        if (!(rowValue > filterValue)) {
                            result = false;
                        }
                        break;
                    case 6:
                        if (rowValue.indexOf(filterValue) === -1) {
                            result = false;
                        }
                        break;
                    case 7:
                        if (rowValue === filterValue) {
                            result = false;
                        }
                        break;
                    case 8:
                        if (rowValue.indexOf(filterValue) !== -1) {
                            result = false;
                        }
                        break;
                    case 9:
                        if (rowValue.substring(0, filterValue.length) !== filterValue) {
                            result = false;
                        }
                        break;
                    case 10:
                        if (rowValue.substring(rowValue.length - filterValue.length, rowValue.length) !== filterValue) {
                            result = false;
                        }
                        break;
                    default:
                        if (rowValue !== filterValue) {
                            result = false;
                        }
                }
                if (type === 'string') {
                    if (x.value.charAt(0) === '*' && x.value.length === 1) {
                        result = true;
                    }
                }
            });
            return result;
        });
        return resultArray;
    };
    return ArrayFilter;
}());
exports.ArrayFilter = ArrayFilter;

});
___scope___.file("utils/arraySort.js", function(exports, require, module, __filename, __dirname){ 

var ArraySort = (function () {
    function ArraySort() {
        this.lastSort = [];
        this.curSort = [];
        this.localeCompareCode = null;
        this.localeCompareOptions = { sensitivity: 'base' };
    }
    ArraySort.prototype.setLocaleCompare = function (code, options) {
        this.localeCompareCode = code ? code : null;
        this.localeCompareOptions = options ? options : { sensitivity: 'base' };
    };
    ArraySort.prototype.reset = function (defaultSortAttribute) {
        if (defaultSortAttribute) {
            this.lastSort = [{ attribute: defaultSortAttribute, asc: true, no: 0 }];
            this.curSort = [{ attribute: defaultSortAttribute, asc: true, no: 0 }];
        }
        else {
            this.lastSort = [];
            this.curSort = [];
        }
    };
    ArraySort.prototype.setLastSort = function (array) {
        this.lastSort = array;
        this.curSort = array;
    };
    ArraySort.prototype.setOrderBy = function (param, add) {
        var sort;
        var useSetValue = false;
        if (param.asc === undefined) {
            sort = {
                attribute: param,
                asc: true
            };
        }
        else {
            sort = {
                attribute: param.attribute,
                asc: param.asc
            };
            useSetValue = true;
        }
        if (add && this.lastSort.length > 0) {
            this.curSort = this.lastSort;
            var exist_1 = false;
            this.curSort.forEach(function (x) {
                if (!useSetValue) {
                    if (x.attribute === sort.attribute) {
                        exist_1 = true;
                        x.asc = x.asc === true ? false : true;
                    }
                }
            });
            if (!exist_1) {
                this.curSort.push(sort);
                this.curSort[this.curSort.length - 1].no = this.curSort.length;
            }
            this.lastSort = this.curSort;
        }
        else {
            this.curSort = [sort];
            this.curSort[0].no = 1;
            if (this.lastSort[0]) {
                if (this.lastSort[0].attribute === this.curSort[0].attribute) {
                    if (this.lastSort[0].asc === this.curSort[0].asc) {
                        if (!useSetValue) {
                            this.curSort[0].asc = this.curSort[0].asc === true ? false : true;
                        }
                    }
                }
            }
            this.lastSort = this.curSort;
        }
    };
    ArraySort.prototype.getOrderBy = function () {
        return this.curSort;
    };
    ArraySort.prototype.getValue = function (attribute, obj) {
        var arr = attribute.split('.');
        var tempValue = Infinity;
        if (arr.length > 1) {
            try {
                tempValue = obj[arr[0]][arr[1]];
            }
            catch (e) { }
        }
        if (arr.length === 1) {
            try {
                tempValue = obj[attribute];
            }
            catch (e) { }
        }
        return tempValue;
    };
    ArraySort.prototype.runOrderbyOn = function (array) {
        var _this = this;
        var thisSort = this.getOrderBy();
        array.sort(function (obj1, obj2) {
            var result = 0;
            for (var i = 0; i < thisSort.length && result === 0; ++i) {
                var currentObj = thisSort[i];
                var v1 = _this.getValue(currentObj.attribute, obj1);
                var v2 = _this.getValue(currentObj.attribute, obj2);
                var getLocaleCompareResult = function (x1, x2) {
                    var resultLocale = null;
                    if (_this.localeCompareCode) {
                        resultLocale = x1.localeCompare(x2, _this.localeCompareCode, _this.localeCompareOptions);
                    }
                    else {
                        resultLocale = x1.localeCompare(x2);
                    }
                    return resultLocale;
                };
                if (v1 !== v2) {
                    if (currentObj.asc) {
                        if (typeof v1 === 'string' && typeof v1 === 'string') {
                            if (getLocaleCompareResult(v1, v2) < 0 &&
                                getLocaleCompareResult(v1, v2) !== 0) {
                                result = -1;
                            }
                            else {
                                result = 1;
                            }
                        }
                        else {
                            if (v1 < v2) {
                                result = -1;
                            }
                            else {
                                result = 1;
                            }
                        }
                    }
                    else {
                        if (typeof v1 === 'string' && typeof v1 === 'string') {
                            if (getLocaleCompareResult(v1, v2) < 0 &&
                                getLocaleCompareResult(v1, v2) !== 0) {
                                result = 1;
                            }
                            else {
                                result = -1;
                            }
                        }
                        else {
                            if (v1 < v2) {
                                result = 1;
                            }
                            else {
                                result = -1;
                            }
                        }
                    }
                }
            }
            return result;
        });
        this.lastSort = this.getOrderBy().slice(0);
    };
    return ArraySort;
}());
exports.ArraySort = ArraySort;

});
___scope___.file("utils/arrayGrouping.js", function(exports, require, module, __filename, __dirname){ 

var ArrayGrouping = (function () {
    function ArrayGrouping() {
        this.grouping = [];
        this.expanded = new Set([]);
    }
    ArrayGrouping.prototype.reset = function () {
        this.groups = [];
        this.grouping = [];
        this.expanded = new Set([]);
    };
    ArrayGrouping.prototype.group = function (arrayToGroup, grouping, keepExpanded) {
        var _this = this;
        if (grouping.length > 0) {
            if (!keepExpanded) {
                this.expanded = new Set([]);
            }
            var groups_1 = [];
            grouping.forEach(function (groupBy, groupNo) {
                if (groupNo === 0) {
                    var mainGroup = _this.groupMain(arrayToGroup, groupBy.field, groupNo);
                    groups_1.push(mainGroup);
                }
                else {
                    var childGroupArray = groups_1[groups_1.length - 1];
                    var newSubGroup = _this.groupChildren(childGroupArray, groupBy.field, groupNo);
                    groups_1.push(newSubGroup);
                }
            });
            this.groups = groups_1;
            this.grouping = grouping;
            if (!keepExpanded) {
                return groups_1[0];
            }
            else {
                return this.expand(null, this.expanded);
            }
        }
        else {
            arrayToGroup.forEach(function (row) {
                row.__groupLvl = 0;
            });
            this.grouping = [];
            return arrayToGroup;
        }
    };
    ArrayGrouping.prototype.getGrouping = function () {
        return this.grouping;
    };
    ArrayGrouping.prototype.expand = function (id, array) {
        var _this = this;
        var all = id ? false : true;
        if (!id) {
            if (array) {
                all = false;
            }
        }
        if (!array) {
            array = new Set([]);
        }
        var subGroup;
        var collection = [];
        var mainGroups = this.groups[0];
        subGroup = function (g) {
            g.__groupChildren.forEach(function (sg) {
                collection.push(sg);
                switch (true) {
                    case all:
                    case sg.__groupID === id:
                    case array.has(sg.__groupID):
                    case sg.__groupID !== id && sg.__groupExpanded:
                        if (sg.__groupChildren) {
                            sg.__groupExpanded = true;
                            _this.expanded.add(sg.__groupID);
                            subGroup(sg);
                        }
                        break;
                    default:
                        break;
                }
            });
        };
        mainGroups.forEach(function (g) {
            collection.push(g);
            switch (true) {
                case all:
                case g.__groupID === id:
                case array.has(g.__groupID):
                case g.__groupID !== id && g.__groupExpanded:
                    g.__groupExpanded = true;
                    _this.expanded.add(g.__groupID);
                    if (g.__groupChildren) {
                        subGroup(g);
                    }
                    break;
                default:
                    break;
            }
        });
        return collection;
    };
    ArrayGrouping.prototype.collapse = function (id) {
        var _this = this;
        var all = id ? false : true;
        id = id === undefined ? null : id;
        var subGroup;
        var collection = [];
        var mainGroups = this.groups[0];
        subGroup = function (g) {
            g.__groupChildren.forEach(function (sg) {
                switch (true) {
                    case all:
                        if (sg.__groupChildren) {
                            sg.__groupExpanded = false;
                            _this.expanded.delete(sg.__groupID);
                            subGroup(sg);
                        }
                        break;
                    case sg.__groupID === id:
                        collection.push(sg);
                        _this.expanded.delete(sg.__groupID);
                        sg.__groupExpanded = false;
                        break;
                    default:
                        collection.push(sg);
                        if (sg.__groupChildren && sg.__groupExpanded) {
                            subGroup(sg);
                        }
                        break;
                }
            });
        };
        mainGroups.forEach(function (g) {
            collection.push(g);
            switch (true) {
                case all:
                    g.__groupExpanded = false;
                    _this.expanded.delete(g.__groupID);
                    if (g.__groupChildren) {
                        subGroup(g);
                    }
                    break;
                case g.__groupID === id:
                    g.__groupExpanded = false;
                    _this.expanded.delete(g.__groupID);
                    break;
                default:
                    if (g.__groupChildren && g.__groupExpanded) {
                        subGroup(g);
                    }
                    break;
            }
        });
        return collection;
    };
    ArrayGrouping.prototype.groupMain = function (array, groupBy, groupNo) {
        var tempGroupArray = [];
        var curGroup = {};
        var tempValue = null;
        array.forEach(function (element) {
            var gidm = element[groupBy];
            gidm = typeof gidm === 'boolean' ? gidm.toString() : gidm;
            gidm = gidm || 'blank';
            if (gidm !== tempValue) {
                curGroup = {
                    __groupName: gidm || 'blank',
                    __group: true,
                    __groupID: gidm,
                    __groupLvl: groupNo,
                    __groupChildren: [element],
                    __groupTotal: 1,
                    __groupExpanded: false
                };
                element.__groupLvl = groupNo + 1;
                tempValue = gidm;
                tempGroupArray.push(curGroup);
            }
            else {
                element.__groupLvl = groupNo + 1;
                curGroup.__groupChildren.push(element);
                curGroup.__groupTotal++;
            }
        });
        return tempGroupArray;
    };
    ArrayGrouping.prototype.groupChildren = function (childGroupArray, groupBy, groupNo) {
        var tempGroupArray = [];
        var curGroup = {};
        childGroupArray.forEach(function (element) {
            var tempValue = null;
            var rebuiltChildrenArray = [];
            element.__groupChildren.forEach(function (child) {
                if (child[groupBy] !== tempValue) {
                    var gidm = child[groupBy] || 'blank';
                    var gidc = element.__groupID || 'blank';
                    curGroup = {
                        __groupName: child[groupBy],
                        __groupID: gidm + '-' + gidc,
                        __group: true,
                        __groupLvl: groupNo,
                        __groupChildren: [child],
                        __groupTotal: 1,
                        __groupExpanded: false
                    };
                    child.__groupLvl = groupNo + 1;
                    tempValue = child[groupBy];
                    rebuiltChildrenArray.push(curGroup);
                    tempGroupArray.push(curGroup);
                }
                else {
                    child.__groupLvl = groupNo + 1;
                    curGroup.__groupChildren.push(child);
                    curGroup.__groupTotal++;
                }
            });
            element.__groupChildren = rebuiltChildrenArray;
        });
        return tempGroupArray;
    };
    return ArrayGrouping;
}());
exports.ArrayGrouping = ArrayGrouping;

});
___scope___.file("grid/v-grid.html", function(exports, require, module, __filename, __dirname){ 

module.exports.default =  "<template>\r\n  <!--\r\n    get the internal css, \r\n    todo: we might want to be able to replace this\r\n  -->\r\n  <require from=\"./styles/main-element-tags.css\"></require>\r\n  <require from=\"./styles/main-elements.css\"></require>\r\n  <require from=\"./styles/contextmenu.css\"></require>\r\n  <require from=\"./styles/dragAndResize.css\"></require>\r\n  <require from=\"./styles/loader.css\"></require>\r\n  <require from=\"./styles/icons.css\"></require>\r\n  <require from=\"./styles/grouping.css\"></require>\r\n  <require from=\"./styles/cellsAndLabels.css\"></require>\r\n  <content>\r\n  </content>\r\n</template>\r\n"
});
___scope___.file("grid/attributes/v-changed.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesOnChange = (function () {
    function VGridAttributesOnChange(element, vGrid) {
        this.element = element;
        this.vGrid = vGrid;
    }
    VGridAttributesOnChange.prototype.attached = function () {
        if (!this.element.onchange) {
            this.element.onchange = this.onChanged.bind(this);
        }
    };
    VGridAttributesOnChange.prototype.onChanged = function () {
        this.vGrid.controller.rowDataBinder.rebindRowNo(this.bindingContext.row);
    };
    VGridAttributesOnChange.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
    };
    return VGridAttributesOnChange;
}());
VGridAttributesOnChange = __decorate([
    aurelia_framework_1.customAttribute('v-onchange'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [HTMLElement, v_grid_1.VGrid])
], VGridAttributesOnChange);
exports.VGridAttributesOnChange = VGridAttributesOnChange;

});
___scope___.file("grid/attributes/v-data-handler.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesDataHandler = (function () {
    function VGridAttributesDataHandler(element, vGrid) {
        this.isSet = false;
        this.element = element;
        this.vGrid = vGrid;
    }
    VGridAttributesDataHandler.prototype.attached = function () {
        this.element.onchange = this.onChanged.bind(this);
        this.element.onfocus = this.onFocus.bind(this);
        this.element.onblur = this.onBlur.bind(this);
    };
    VGridAttributesDataHandler.prototype.valueChanged = function (newValue) {
        if (this.isSet) {
            var checkValue = this.editFormater.toView(newValue);
            if (checkValue !== this.tempValue) {
                this.element.value = this.displayFormater.toView(newValue);
            }
        }
        else {
            this.element.value = this.displayFormater.toView(newValue);
        }
    };
    VGridAttributesDataHandler.prototype.onFocus = function () {
        this.isSet = true;
        this.element.value = this.editFormater.toView(this.value);
        this.tempValue = this.element.value;
    };
    VGridAttributesDataHandler.prototype.onBlur = function () {
        if (this.tempValue === this.element.value) {
            this.onChanged();
        }
        this.isSet = false;
    };
    VGridAttributesDataHandler.prototype.onChanged = function () {
        this.value = this.editFormater.fromView(this.element.value);
        this.bindingContext.rowRef[this.field] = this.value;
        this.element.value = this.displayFormater.toView(this.value);
        this.vGrid.controller.rowDataBinder.rebindRowNo(this.bindingContext.row);
    };
    VGridAttributesDataHandler.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.displayFormater = this.valueConverters(this.display);
        this.editFormater = this.valueConverters(this.edit);
        this.element.value = this.displayFormater.toView(this.value);
    };
    VGridAttributesDataHandler.prototype.valueConverters = function (value) {
        var valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
        return valueConverter(value);
    };
    return VGridAttributesDataHandler;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesDataHandler.prototype, "field", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesDataHandler.prototype, "value", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesDataHandler.prototype, "display", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesDataHandler.prototype, "edit", void 0);
VGridAttributesDataHandler = __decorate([
    aurelia_framework_1.customAttribute('v-data-handler'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [HTMLElement, v_grid_1.VGrid])
], VGridAttributesDataHandler);
exports.VGridAttributesDataHandler = VGridAttributesDataHandler;

});
___scope___.file("grid/attributes/v-drag-drop-col.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridDragDropCol = (function () {
    function VGridDragDropCol(element, vGrid) {
        this.vGrid = vGrid;
        this.vGridElement = vGrid.element;
        this.controller = vGrid.controller;
        this.groupingElements = vGrid.groupingElements;
        this.sharedContext = vGrid.dragDropAttributeSharedContext;
        this.element = element;
        this.column = this.element;
        this.entered = null;
        this.curColNo = null;
    }
    VGridDragDropCol.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.onDragstartBinded = this.onDragstart.bind(this);
        this.onDragenterBinded = this.onDragenter.bind(this);
        this.onDragoverBinded = this.onDragover.bind(this);
        this.onDragendBinded = this.onDragend.bind(this);
        this.onDragOutSideBinded = this.onDragOutSide.bind(this);
    };
    VGridDragDropCol.prototype.unbind = function () {
    };
    VGridDragDropCol.prototype.detached = function () {
    };
    VGridDragDropCol.prototype.attached = function () {
        var _this = this;
        var result = this.getTargetData(this.column);
        if (result.ok && !result.panel) {
            this.column = result.target;
            this.colType = this.column.attributes.getNamedItem('avg-type').value;
            this.colNo = parseInt(this.column.attributes.getNamedItem('avg-config-col').value, 10);
            this.context = this.vGrid.columnBindingContext['setup' + this.colType][this.colNo];
            this.columnsArray = this.vGrid.columnBindingContext['setup' + this.colType];
            this.element.addEventListener('mousedown', this.onDragstartBinded);
            result.target.addEventListener('mouseenter', this.onDragenterBinded);
        }
        if (result.ok && result.target.nodeName === 'AVG-TOP-PANEL') {
            this.isPanel = true;
            this.sharedContext.panel = result.target;
            result.target.onmouseleave = function () {
                if (_this.sharedContext.dragging && _this.sharedContext.title && _this.sharedContext.field) {
                    _this.groupingElements.removeGroup('');
                }
            };
            result.target.onmouseenter = function () {
                if (_this.sharedContext.dragging && _this.sharedContext.title && _this.sharedContext.field) {
                    _this.groupingElements.addGroup(_this.sharedContext.title, _this.sharedContext.field);
                    _this.sharedContext.lastTarget = result.target;
                }
            };
            result.target.onmouseup = function () {
                if (_this.sharedContext.dragging && _this.sharedContext.title && _this.sharedContext.field) {
                    _this.groupingElements.addToGrouping();
                }
            };
        }
    };
    VGridDragDropCol.prototype.createDragElement = function () {
        this.dragColumnBlock = document.createElement('div');
        this.dragColumnBlock.classList.add(this.vGrid.attTheme);
        this.dragColumnBlock.classList.add('avg-drag');
        this.dragColumnBlock.style.top = -1200 + 'px';
        this.dragColumnBlock.style.left = -1200 + 'px';
        document.body.appendChild(this.dragColumnBlock);
        this.dragColumnBlock.innerHTML = this.title || this.vGrid.colConfig[this.colNo].colHeaderName;
    };
    VGridDragDropCol.prototype.onDragstart = function () {
        var _this = this;
        document.addEventListener('mouseup', this.onDragendBinded);
        this.vGridElement.addEventListener('mouseleave', this.onDragOutSideBinded);
        this.createDragElement();
        this.mouseMoveTimer = setTimeout(function () {
            document.addEventListener('mousemove', _this.onDragoverBinded, false);
        }, 300);
        this.sharedContext.dragging = true;
        this.sharedContext.colType = this.colType;
        this.sharedContext.context = this.context;
        this.sharedContext.colNo = this.colNo;
        this.sharedContext.curColNo = this.colNo;
        this.sharedContext.columnsArray = this.columnsArray;
        this.sharedContext.title = this.title;
        this.sharedContext.field = this.field;
        this.sharedContext.columnsArraySorted = [];
        this.sharedContext.columnsArray.forEach(function (x) {
            _this.sharedContext.columnsArraySorted.push(x);
        });
    };
    VGridDragDropCol.prototype.onDragOutSide = function (event) {
        if (this.sharedContext.dragging) {
            if (event.layerX < 0) {
                var left_1 = false;
                this.vGrid.columnBindingContext.setupleft.forEach(function (x) {
                    if (x.show) {
                        left_1 = true;
                    }
                });
                if (!left_1) {
                    this.switchColumns({
                        colType: 'left'
                    });
                }
            }
            if (event.layerX > this.vGridElement.clientWidth) {
                var right_1 = false;
                this.vGrid.columnBindingContext.setupright.forEach(function (x) {
                    if (x.show) {
                        right_1 = true;
                    }
                });
                if (!right_1) {
                    this.switchColumns({
                        colType: 'right'
                    });
                }
            }
        }
    };
    VGridDragDropCol.prototype.onDragenter = function (event) {
        if (this.sharedContext.dragging) {
            var result = this.getTargetData(event.target);
            if (result.target.nodeName === 'AVG-COL' && result.ok && this.sharedContext.lastTarget !== result.target) {
                this.sharedContext.lastTarget = result.target;
                if (result.colNo !== this.sharedContext.colNo && result.colType === this.sharedContext.colType) {
                    var newLeft = this.sharedContext.columnsArray[result.colNo].left;
                    var oldLeft = this.sharedContext.columnsArray[this.sharedContext.colNo].left;
                    if (newLeft < oldLeft) {
                        this.sharedContext.columnsArray[this.sharedContext.colNo].left = newLeft;
                        this.sharedContext.columnsArray[result.colNo].left = newLeft + 1;
                    }
                    else {
                        this.sharedContext.columnsArray[this.sharedContext.colNo].left = newLeft;
                        this.sharedContext.columnsArray[result.colNo].left = newLeft - 1;
                    }
                    this.sharedContext.columnsArraySorted.sort(function (a, b) {
                        return a.left - b.left;
                    });
                    var appendValue_1 = 0;
                    this.sharedContext.columnsArraySorted.forEach(function (x) {
                        if (x.show) {
                            x.left = appendValue_1;
                            appendValue_1 = appendValue_1 + x.width;
                        }
                    });
                }
                if (result.colNo !== this.sharedContext.colNo && result.colType !== this.sharedContext.colType) {
                    this.switchColumns(result);
                }
            }
        }
    };
    VGridDragDropCol.prototype.onDragover = function (event) {
        if (this.dragColumnBlock) {
            this.dragColumnBlock.style.top = event.clientY + 'px';
            this.dragColumnBlock.style.left = event.clientX + 'px';
        }
    };
    VGridDragDropCol.prototype.onDragend = function () {
        clearTimeout(this.mouseMoveTimer);
        this.sharedContext.dragging = false;
        document.removeEventListener('mouseup', this.onDragendBinded);
        document.removeEventListener('mousemove', this.onDragoverBinded);
        this.vGridElement.removeEventListener('mouseleave', this.onDragOutSideBinded);
        this.sharedContext.lastTarget = null;
        if (this.dragColumnBlock) {
            var parent_1 = this.dragColumnBlock.parentNode;
            if (parent_1) {
                parent_1.removeChild(this.dragColumnBlock);
                this.dragColumnBlock = null;
            }
        }
    };
    VGridDragDropCol.prototype.switchColumns = function (result) {
        var _this = this;
        var width;
        var newColType = result.colType;
        var oldColType = this.sharedContext.colType;
        var heightAndWidths = this.vGrid.htmlHeightWidth;
        switch (true) {
            case newColType === 'left' && oldColType === 'main':
            case newColType === 'main' && oldColType === 'left':
            case newColType === 'right' && oldColType === 'main':
            case newColType === 'main' && oldColType === 'right':
            case newColType === 'left' && oldColType === 'right':
            case newColType === 'right' && oldColType === 'left':
                this.sharedContext.columnsArray[this.sharedContext.colNo].show = false;
                width = this.sharedContext.columnsArray[this.sharedContext.colNo].width;
                this.sharedContext.columnsArraySorted.sort(function (a, b) {
                    return a.left - b.left;
                });
                var appendValue_2 = 0;
                this.sharedContext.columnsArraySorted.forEach(function (x) {
                    if (x.show) {
                        x.left = appendValue_2;
                        appendValue_2 = appendValue_2 + x.width;
                    }
                });
                this.sharedContext.colType = result.colType;
                this.sharedContext.columnsArray = this.vGrid.columnBindingContext['setup' + result.colType];
                this.sharedContext.columnsArray[this.sharedContext.colNo].show = true;
                this.sharedContext.columnsArray[this.sharedContext.colNo].width = width;
                this.sharedContext.columnsArraySorted = [];
                this.sharedContext.columnsArray.forEach(function (x) {
                    _this.sharedContext.columnsArraySorted.push(x);
                });
                this.sharedContext.columnsArraySorted.sort(function (a, b) {
                    return a.left - b.left;
                });
                appendValue_2 = 0;
                this.sharedContext.columnsArraySorted.forEach(function (x) {
                    if (x.show) {
                        x.left = appendValue_2;
                        appendValue_2 = appendValue_2 + x.width;
                    }
                });
                break;
            default:
                break;
        }
        if (newColType === 'left' && oldColType === 'main') {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width - width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width - width;
            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width + width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width + width;
            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left + width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left + width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left + width;
        }
        if (newColType === 'main' && oldColType === 'left') {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width + width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width + width;
            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width - width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width - width;
            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left - width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left - width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left - width;
        }
        if (newColType === 'right' && oldColType === 'main') {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width - width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width - width;
            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width + width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width + width;
            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right + width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right + width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right + width;
        }
        if (newColType === 'main' && oldColType === 'right') {
            heightAndWidths.avgContentMainScroll_Width = heightAndWidths.avgContentMainScroll_Width + width;
            heightAndWidths.avgContentHhandleScroll_Width = heightAndWidths.avgContentHhandleScroll_Width + width;
            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width - width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width - width;
            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right - width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right - width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right - width;
        }
        if (newColType === 'left' && oldColType === 'right') {
            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width - width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width - width;
            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width + width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width + width;
            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right - width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right - width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right - width;
            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left + width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left + width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left + width;
        }
        if (newColType === 'right' && oldColType === 'left') {
            heightAndWidths.avgContentRight_Width = heightAndWidths.avgContentRight_Width + width;
            heightAndWidths.avgHeaderRight_Width = heightAndWidths.avgHeaderRight_Width + width;
            heightAndWidths.avgContentLeft_Width = heightAndWidths.avgContentLeft_Width - width;
            heightAndWidths.avgHeaderLeft_Width = heightAndWidths.avgHeaderLeft_Width - width;
            heightAndWidths.avgContentMain_Right = heightAndWidths.avgContentMain_Right + width;
            heightAndWidths.avgHeaderMain_Right = heightAndWidths.avgHeaderMain_Right + width;
            heightAndWidths.avgContentHhandle_Right = heightAndWidths.avgContentHhandle_Right + width;
            heightAndWidths.avgContentMain_Left = heightAndWidths.avgContentMain_Left - width;
            heightAndWidths.avgHeaderMain_Left = heightAndWidths.avgHeaderMain_Left - width;
            heightAndWidths.avgContentHhandle_Left = heightAndWidths.avgContentHhandle_Left - width;
        }
    };
    VGridDragDropCol.prototype.getTargetData = function (curTarget) {
        var draggableTarget = null;
        var count = 0;
        var exit = true;
        var isOk = false;
        while (exit) {
            count++;
            if (!curTarget.parentNode) {
                exit = false;
            }
            else {
                if (curTarget.draggable === true && draggableTarget === null) {
                    draggableTarget = curTarget;
                }
                switch (true) {
                    case curTarget.nodeName === 'AVG-COL':
                    case curTarget.nodeName === 'AVG-TOP-PANEL':
                        isOk = true;
                        exit = false;
                        break;
                    default:
                        curTarget = curTarget.parentNode;
                        break;
                }
            }
            if (count > 10) {
                exit = false;
            }
        }
        var curColType = null;
        var curColNo = null;
        var curContext = null;
        var curColumnsArray = null;
        var isPanel = false;
        if (isOk && curTarget.nodeName === 'AVG-COL') {
            curColType = curTarget.attributes.getNamedItem('avg-type').value;
            curColNo = parseInt(curTarget.attributes.getNamedItem('avg-config-col').value, 10);
            curContext = this.vGrid.columnBindingContext['setup' + curColType][curColNo];
            curColumnsArray = this.vGrid.columnBindingContext['setup' + curColType];
        }
        if (isOk && curTarget.nodeName === 'AVG-TOP-PANEL') {
            isPanel = true;
        }
        return {
            draggable: draggableTarget,
            ok: isOk,
            target: curTarget,
            colType: curColType,
            colNo: curColNo,
            context: curContext,
            columnsArray: curColumnsArray,
            panel: isPanel
        };
    };
    return VGridDragDropCol;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridDragDropCol.prototype, "title", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridDragDropCol.prototype, "field", void 0);
VGridDragDropCol = __decorate([
    aurelia_framework_1.customAttribute('v-drag-drop-col'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [Element, v_grid_1.VGrid])
], VGridDragDropCol);
exports.VGridDragDropCol = VGridDragDropCol;

});
___scope___.file("grid/attributes/v-filter-observer.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesFilterObserver = (function () {
    function VGridAttributesFilterObserver(element, vGrid) {
        this.vGrid = vGrid;
        this.element = element;
    }
    VGridAttributesFilterObserver.prototype.valueChanged = function (newValue) {
        if (this.attribute && newValue) {
            this.updateFilter();
        }
    };
    VGridAttributesFilterObserver.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        var valueConverter = this.valueConverters(this.converter);
        this.filterOperator = this.operator || '=';
        this.attribute = this.field;
        this.valueFormater = valueConverter || null;
        this.state = 0;
    };
    VGridAttributesFilterObserver.prototype.getValue = function () {
        return this.valueFormater ? this.valueFormater.fromView(this.value) : this.value;
    };
    VGridAttributesFilterObserver.prototype.updateFilter = function () {
        var _this = this;
        var curFilter = this.vGrid.attGridConnector.getCurrentFilter();
        var filterIndex = -1;
        curFilter.forEach(function (filter, index) {
            if (filter.attribute === _this.attribute) {
                filterIndex = index;
            }
        });
        if (filterIndex !== -1) {
            if (this.getValue() === '') {
                curFilter.splice(filterIndex, 1);
            }
            else {
                curFilter[filterIndex].value = this.getValue();
                curFilter[filterIndex].operator = this.filterOperator;
            }
        }
        else {
            if (this.getValue() !== '') {
                curFilter.push({
                    attribute: this.attribute,
                    operator: this.filterOperator,
                    value: this.getValue()
                });
            }
        }
        this.vGrid.attGridConnector.query(this.vGrid.attGridConnector.getCurrentFilter());
    };
    VGridAttributesFilterObserver.prototype.valueConverters = function (value) {
        var valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
        return valueConverter(value);
    };
    return VGridAttributesFilterObserver;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilterObserver.prototype, "field", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilterObserver.prototype, "operator", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilterObserver.prototype, "converter", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilterObserver.prototype, "value", void 0);
VGridAttributesFilterObserver = __decorate([
    aurelia_framework_1.customAttribute('v-filter-observer'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [HTMLElement, v_grid_1.VGrid])
], VGridAttributesFilterObserver);
exports.VGridAttributesFilterObserver = VGridAttributesFilterObserver;

});
___scope___.file("grid/attributes/v-filter.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesFilter = (function () {
    function VGridAttributesFilter(element, vGrid) {
        this.vGrid = vGrid;
        this.element = element;
    }
    VGridAttributesFilter.prototype.getOperatorName = function (operator) {
        return this.vGrid.filterOperatorNames[operator];
    };
    VGridAttributesFilter.prototype.attached = function () {
        var _this = this;
        if (this.attribute) {
            this.vGrid.element.addEventListener('filterUpdate', function (e) {
                if (e.detail.attribute === _this.attribute && e.detail.key === _this.key) {
                    _this.filterOperator = e.detail.operator;
                    _this.element.placeholder =
                        _this.getOperatorName(_this.filterOperator);
                    _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                }
            });
            this.vGrid.element.addEventListener('filterUpdateValues', function () {
                var curFilter = _this.vGrid.attGridConnector.getCurrentFilter();
                curFilter.forEach(function (f) {
                    if (f.attribute === _this.attribute && f.key === _this.key) {
                        _this.element.value = f.value;
                        _this.filterOperator = f.operator;
                        _this.element.placeholder =
                            _this.getOperatorName(_this.filterOperator);
                    }
                });
            });
            this.vGrid.element.addEventListener('filterTranslation', function () {
                _this.element.placeholder =
                    _this.getOperatorName(_this.filterOperator);
                _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
            });
            this.vGrid.element.addEventListener('filterClearCell', function (e) {
                if (e.detail.attribute === _this.attribute && e.detail.key === _this.key) {
                    _this.resetValue();
                    _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                }
            });
            this.vGrid.element.addEventListener('filterClearAll', function () {
                _this.resetValue();
                _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
            });
            if (this.type !== 'checkbox') {
                this.element.placeholder =
                    this.getOperatorName(this.filterOperator);
                this.element.onkeyup = function (e) {
                    if (e.keyCode === 13) {
                        _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                        _this.vGrid.attGridConnector.query(_this.vGrid.attGridConnector.getCurrentFilter());
                    }
                    else {
                        if (_this.filterOn === 'onKeyDown') {
                            _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                            _this.vGrid.attGridConnector.query(_this.vGrid.attGridConnector.getCurrentFilter());
                        }
                    }
                };
            }
            else {
                this.element.indeterminate = true;
                this.element.style.opacity = '0.3';
                this.element.onclick = function () {
                    switch (_this.state) {
                        case 0:
                            _this.state = 2;
                            _this.element.style.opacity = '1';
                            _this.element.checked = true;
                            _this.element.indeterminate = false;
                            break;
                        case 2:
                            _this.state = 3;
                            _this.element.style.opacity = '1';
                            _this.element.indeterminate = false;
                            break;
                        default:
                            _this.element.checked = false;
                            _this.state = 0;
                            _this.element.style.opacity = '0.3';
                            _this.element.indeterminate = true;
                    }
                    _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                    _this.vGrid.attGridConnector.query(_this.vGrid.attGridConnector.getCurrentFilter());
                };
            }
        }
    };
    VGridAttributesFilter.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        var valueConverter = this.valueConverters(this.converter);
        this.filterOn = this.keydown === 'true' ? 'onKeyDown' : 'onEnterKey';
        this.filterOperator = this.operator || '=';
        this.attribute = this.field;
        this.valueFormater = valueConverter || null;
        this.type = this.element.type;
        this.state = 0;
    };
    VGridAttributesFilter.prototype.getValue = function () {
        if (this.type !== 'checkbox') {
            return this.valueFormater ? this.valueFormater.fromView(this.element.value) : this.element.value;
        }
        else {
            if (this.valueFormater && this.state) {
                return this.valueFormater.fromView(this.state ? this.state === 2 ? true : false : '');
            }
            else {
                return this.state ? this.state === 2 ? true : false : '';
            }
        }
    };
    VGridAttributesFilter.prototype.resetValue = function () {
        if (this.type !== 'checkbox') {
            this.element.value = '';
        }
        else {
            this.state = 0;
            this.element.checked = false;
        }
    };
    VGridAttributesFilter.prototype.updateFilter = function (curFilter) {
        var _this = this;
        var filterIndex = -1;
        curFilter.forEach(function (filter, index) {
            if (filter.attribute === _this.attribute && filter.key === _this.key) {
                filterIndex = index;
            }
        });
        if (filterIndex !== -1) {
            if (this.getValue() === '') {
                curFilter.splice(filterIndex, 1);
            }
            else {
                curFilter[filterIndex].value = this.getValue();
                curFilter[filterIndex].operator = this.filterOperator;
            }
        }
        else {
            if (this.getValue() !== '') {
                curFilter.push({
                    key: this.key,
                    attribute: this.attribute,
                    operator: this.filterOperator,
                    value: this.getValue()
                });
            }
        }
    };
    VGridAttributesFilter.prototype.valueConverters = function (value) {
        var valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
        return valueConverter(value);
    };
    return VGridAttributesFilter;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilter.prototype, "field", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilter.prototype, "operator", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilter.prototype, "converter", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilter.prototype, "keydown", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesFilter.prototype, "key", void 0);
VGridAttributesFilter = __decorate([
    aurelia_framework_1.customAttribute('v-filter'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [HTMLElement, v_grid_1.VGrid])
], VGridAttributesFilter);
exports.VGridAttributesFilter = VGridAttributesFilter;

});
___scope___.file("grid/attributes/v-image.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesImageFix = (function () {
    function VGridAttributesImageFix(element, vGrid) {
        this.vGrid = vGrid;
        this.element = element;
    }
    VGridAttributesImageFix.prototype.valueChanged = function (newValue) {
        newValue = newValue ? newValue : '';
        this.element.src = '';
        this.element.src = this.value || newValue;
    };
    VGridAttributesImageFix.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.element.src = '';
        this.element.src = this.value || '';
    };
    return VGridAttributesImageFix;
}());
VGridAttributesImageFix = __decorate([
    aurelia_framework_1.customAttribute('v-image-fix'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [HTMLImageElement, v_grid_1.VGrid])
], VGridAttributesImageFix);
exports.VGridAttributesImageFix = VGridAttributesImageFix;

});
___scope___.file("grid/attributes/v-menu.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributeMenu = (function () {
    function VGridAttributeMenu(element, vGrid) {
        this.element = element;
        this.controller = vGrid.controller;
        this.raiseEvent = vGrid.controller.raiseEvent;
        this.groupingElements = vGrid.groupingElements;
        this.openBinded = this.open.bind(this);
        this.checkBinded = this.check.bind(this);
        this.callbackBinded = this.callback.bind(this);
    }
    VGridAttributeMenu.prototype.attached = function () {
        this.element.addEventListener('contextmenu', this.openBinded);
    };
    VGridAttributeMenu.prototype.unbind = function () {
        document.removeEventListener('click', this.checkBinded);
    };
    VGridAttributeMenu.prototype.check = function (e) {
        var x = e.target.classList.contains('avg-menu__link');
        if (!x) {
            this.controller.contextMenu.setDefaults();
            document.removeEventListener('click', this.checkBinded);
        }
    };
    VGridAttributeMenu.prototype.callback = function (type, option, event) {
        if (type === 'filter') {
            if (option === 'clear') {
                this.raiseEvent('filterClearCell', { attribute: this.filter.replace('rowRef.', ''), key: this.filterkey });
                document.removeEventListener('click', this.checkBinded);
                return true;
            }
            if (option === 'clearall') {
                this.raiseEvent('filterClearAll', {});
                document.removeEventListener('click', this.checkBinded);
                return true;
            }
            if (option === 'showall') {
                this.controller.attGridConnector.query(null);
                document.removeEventListener('click', this.checkBinded);
                return true;
            }
        }
        if (type === 'sort') {
            var field_1 = this.sort;
            var arr = this.sort.split(';');
            arr.forEach(function (x) {
                if (x.indexOf('field') !== -1) {
                    field_1 = x.replace('field:', '');
                }
            });
            this.controller.attGridConnector.orderBy({
                attribute: field_1,
                asc: option === 'desc' ? false : true
            }, event.shiftKey);
            document.removeEventListener('click', this.checkBinded);
            return true;
        }
        if (type === 'groupby') {
            var groupTitle = this.groupbytitle ? this.groupbytitle : this.groupby;
            this.groupingElements.addGroup(groupTitle, this.groupby);
            this.groupingElements.addToGrouping();
            return true;
        }
        if (type === 'filterOption') {
            var field_2 = this.filter;
            var arr = this.filter.split(';');
            arr.forEach(function (x) {
                if (x.indexOf('field') !== -1) {
                    field_2 = x.replace('field:', '');
                }
            });
            this.raiseEvent('filterUpdate', {
                attribute: field_2,
                operator: option,
                key: this.filterkey
            });
            document.removeEventListener('click', this.checkBinded);
            return true;
        }
        return false;
    };
    VGridAttributeMenu.prototype.open = function (e) {
        this.check(e);
        document.addEventListener('click', this.checkBinded);
        e.preventDefault();
        if (!this.controller.contextMenu.show) {
            var clickCoords = this.getPosition(e);
            this.controller.contextMenu.openMenu({
                top: clickCoords.y,
                left: clickCoords.x,
                filter: this.filter,
                sort: this.sort,
                pinned: this.pinned,
                groupby: this.groupby,
                callback: this.callbackBinded
            });
        }
    };
    VGridAttributeMenu.prototype.getPosition = function (e) {
        var posx = 0;
        var posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return {
            x: posx,
            y: posy
        };
    };
    return VGridAttributeMenu;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributeMenu.prototype, "filter", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributeMenu.prototype, "filterkey", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributeMenu.prototype, "sort", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributeMenu.prototype, "pinned", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributeMenu.prototype, "groupby", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributeMenu.prototype, "groupbytitle", void 0);
VGridAttributeMenu = __decorate([
    aurelia_framework_1.customAttribute('v-menu'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [Element, v_grid_1.VGrid])
], VGridAttributeMenu);
exports.VGridAttributeMenu = VGridAttributeMenu;

});
___scope___.file("grid/attributes/v-resize-col.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesResizeCol = (function () {
    function VGridAttributesResizeCol(element, vGrid) {
        this.vGrid = vGrid;
        this.ctx = vGrid.resizeAttributeSharedContext;
        this.element = element;
        this.screenX = 0;
        this.originalWidth = 0;
        this.column = this.element;
        while (this.column.nodeName !== 'AVG-COL') {
            this.column = this.column.parentNode;
        }
        this.colType = this.column.attributes.getNamedItem('avg-type').value;
        this.colNo = parseInt(this.column.attributes.getNamedItem('avg-config-col').value, 10);
        this.context = vGrid.columnBindingContext['setup' + this.colType][this.colNo];
        this.columnsArray = vGrid.columnBindingContext['setup' + this.colType];
        this.columnBindingContext = vGrid.columnBindingContext;
    }
    VGridAttributesResizeCol.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
    };
    VGridAttributesResizeCol.prototype.attached = function () {
        var _this = this;
        var resizeHandle = document.createElement('DIV');
        resizeHandle.classList.add('avg-draggable-handler');
        this.onmousedownBinded = this.onmousedown.bind(this);
        this.onmousemoveBinded = this.onmousemove.bind(this);
        this.onmouseupBinded = this.onmouseup.bind(this);
        resizeHandle.onmousedown = function (e) {
            _this.ctx.resizing = true;
            _this.onmousedown(e);
        };
        this.column.appendChild(resizeHandle);
    };
    VGridAttributesResizeCol.prototype.onmouseup = function () {
        document.removeEventListener('mousemove', this.onmousemoveBinded);
        document.removeEventListener('mouseup', this.onmouseupBinded);
        this.ctx.resizing = false;
    };
    VGridAttributesResizeCol.prototype.onmousemove = function (e) {
        this.updateHeader(e);
    };
    VGridAttributesResizeCol.prototype.updateHeader = function (e) {
        var _this = this;
        var w = Math.abs(this.screenX - e.screenX);
        if (w % 2 === 0) {
            requestAnimationFrame(function () {
                var movementX = _this.originalWidth - (_this.screenX - e.screenX);
                var appendValue = _this.originalWidth - movementX;
                if (_this.colType === 'main' && movementX > 10) {
                    _this.columnsArray[_this.colNo].width = movementX;
                    _this.vGrid.colConfig[_this.colNo].colWidth = _this.columnsArray[_this.colNo].width;
                    for (var i = 0; i < _this.columnsArray.length; i++) {
                        if (_this.columnsArray[_this.colNo].left < _this.columnsArray[i].left) {
                            _this.columnsArray[i].left = _this.originals[i] - appendValue;
                        }
                    }
                    _this.vGrid.htmlHeightWidth.avgContentMainScroll_Width = _this.avgContentMainScroll_Width - appendValue;
                    _this.vGrid.htmlHeightWidth.avgContentHhandleScroll_Width = _this.avgContentHhandleScroll_Width - appendValue;
                }
                if (_this.colType === 'right' && movementX > 10) {
                    _this.columnsArray[_this.colNo].width = movementX;
                    _this.vGrid.colConfig[_this.colNo].colWidth = _this.columnsArray[_this.colNo].width;
                    for (var i = 0; i < _this.columnsArray.length; i++) {
                        if (_this.columnsArray[_this.colNo].left < _this.columnsArray[i].left) {
                            _this.columnsArray[i].left = _this.originals[i] - appendValue;
                        }
                    }
                    _this.vGrid.htmlHeightWidth.avgContentRight_Width = _this.avgContentRight_Width - appendValue;
                    _this.vGrid.htmlHeightWidth.avgHeaderRight_Width = _this.avgHeaderRight_Width - appendValue;
                    _this.vGrid.htmlHeightWidth.avgContentMain_Right = _this.avgContentMain_Right - appendValue;
                    _this.vGrid.htmlHeightWidth.avgHeaderMain_Right = _this.avgHeaderMain_Right - appendValue;
                    _this.vGrid.htmlHeightWidth.avgContentHhandle_Right = _this.avgContentHhandle_Right - appendValue;
                }
                if (_this.colType === 'left' && movementX > 10) {
                    _this.columnsArray[_this.colNo].width = movementX;
                    _this.vGrid.colConfig[_this.colNo].colWidth = _this.columnsArray[_this.colNo].width;
                    for (var i = 0; i < _this.columnsArray.length; i++) {
                        if (_this.columnsArray[_this.colNo].left < _this.columnsArray[i].left) {
                            _this.columnsArray[i].left = _this.originals[i] - appendValue;
                        }
                    }
                    _this.vGrid.htmlHeightWidth.avgContentLeft_Width = _this.avgContentLeft_Width - appendValue;
                    _this.vGrid.htmlHeightWidth.avgHeaderLeft_Width = _this.avgHeaderLeft_Width - appendValue;
                    _this.vGrid.htmlHeightWidth.avgContentMain_Left = _this.avgContentMain_Left - appendValue;
                    _this.vGrid.htmlHeightWidth.avgHeaderMain_Left = _this.avgHeaderMain_Left - appendValue;
                    _this.vGrid.htmlHeightWidth.avgContentHhandle_Left = _this.avgContentHhandle_Left - appendValue;
                }
                _this.vGrid.controller.udateHorizontalScroller();
            });
        }
    };
    VGridAttributesResizeCol.prototype.onmousedown = function (e) {
        var _this = this;
        this.screenX = e.screenX;
        this.originalWidth = this.context.width;
        this.originals = [];
        for (var i = 0; i < this.columnsArray.length; i++) {
            this.originals.push(this.columnsArray[i].left);
        }
        this.avgContentLeft_Width = this.vGrid.htmlHeightWidth.avgContentLeft_Width;
        this.avgHeaderLeft_Width = this.vGrid.htmlHeightWidth.avgHeaderLeft_Width;
        this.avgContentMainScroll_Width = this.vGrid.htmlHeightWidth.avgContentMainScroll_Width;
        this.avgHeaderMain_Left = this.vGrid.htmlHeightWidth.avgHeaderMain_Left;
        this.avgContentMain_Left = this.vGrid.htmlHeightWidth.avgContentMain_Left;
        this.avgContentMain_Right = this.vGrid.htmlHeightWidth.avgContentMain_Right;
        this.avgHeaderMain_Right = this.vGrid.htmlHeightWidth.avgHeaderMain_Right;
        this.avgContentRight_Width = this.vGrid.htmlHeightWidth.avgContentRight_Width;
        this.avgHeaderRight_Width = this.vGrid.htmlHeightWidth.avgHeaderRight_Width;
        this.avgContentHhandle_Right = this.vGrid.htmlHeightWidth.avgContentHhandle_Right;
        this.avgContentHhandle_Left = this.vGrid.htmlHeightWidth.avgContentHhandle_Left;
        this.avgContentHhandleScroll_Width = this.vGrid.htmlHeightWidth.avgContentHhandleScroll_Width;
        this.avgContentMainScrollLeft = this.vGrid.htmlCache.avg_content_main.scrollLeft;
        if (this.colType === 'main') {
            this.isLast = this.vGrid.htmlHeightWidth.avgContentMainScroll_Width === (this.context.left + this.context.width);
        }
        if (this.colType === 'left') {
            var sumContext = this.context.left + this.context.width + this.vGrid.htmlHeightWidth.avgScrollBarWidth;
            var sumGrouping = this.columnBindingContext.setupgrouping * 15;
            this.isLast = this.vGrid.htmlHeightWidth.avgContentLeft_Width === (sumContext + sumGrouping);
        }
        if (this.colType === 'right') {
            var sum = this.context.left + this.context.width + this.vGrid.htmlHeightWidth.avgScrollBarWidth;
            this.isLast = this.vGrid.htmlHeightWidth.avgContentRight_Width === sum;
        }
        var setupRight = this.vGrid.columnBindingContext.setupright;
        this.rightColNo = 0;
        this.rightColNoWidth = 0;
        setupRight.forEach(function (col, i) {
            if (col.left === 0) {
                _this.rightColNo = i;
                _this.rightColNoWidth = col.width;
            }
        });
        document.addEventListener('mousemove', this.onmousemoveBinded);
        document.addEventListener('mouseup', this.onmouseupBinded);
    };
    return VGridAttributesResizeCol;
}());
VGridAttributesResizeCol = __decorate([
    aurelia_framework_1.customAttribute('v-resize-col'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [Element, v_grid_1.VGrid])
], VGridAttributesResizeCol);
exports.VGridAttributesResizeCol = VGridAttributesResizeCol;

});
___scope___.file("grid/attributes/v-selection.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesSelection = (function () {
    function VGridAttributesSelection(element, vGrid) {
        this.vGrid = vGrid;
        this.controller = vGrid.controller;
        this.element = element;
    }
    VGridAttributesSelection.prototype.selectedChanged = function (newValue) {
        if (this.type === 'row') {
            this.element.checked = newValue;
        }
    };
    VGridAttributesSelection.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
    };
    VGridAttributesSelection.prototype.attached = function () {
        var _this = this;
        this.element.checked = this.selected;
        this.element.onclick = function () {
            var status = _this.element.checked === 'true' || _this.element.checked === true ? true : false;
            if (status) {
                if (_this.type === 'header') {
                    _this.bindingContext.selection.selectRange(0, _this.controller.collectionLength() - 1);
                    _this.controller.rowClickHandler.updateSelectionOnAllRows();
                }
                if (_this.type === 'row') {
                    _this.bindingContext.selection.select(_this.bindingContext.row, true);
                    _this.controller.rowClickHandler.updateSelectionOnAllRows();
                }
            }
            else {
                if (_this.type === 'header') {
                    _this.bindingContext.selection.deSelectAll();
                    _this.controller.rowClickHandler.updateSelectionOnAllRows();
                }
                if (_this.type === 'row') {
                    _this.bindingContext.selection.deSelect(_this.bindingContext.row);
                    _this.controller.rowClickHandler.updateSelectionOnAllRows();
                }
            }
        };
    };
    return VGridAttributesSelection;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", Boolean)
], VGridAttributesSelection.prototype, "selected", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesSelection.prototype, "type", void 0);
VGridAttributesSelection = __decorate([
    aurelia_framework_1.customAttribute('v-selection'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [HTMLInputElement, v_grid_1.VGrid])
], VGridAttributesSelection);
exports.VGridAttributesSelection = VGridAttributesSelection;

});
___scope___.file("grid/attributes/v-sort.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
var VGridAttributesSort = (function () {
    function VGridAttributesSort(element, vGrid) {
        this.firstTime = true;
        this.vGrid = vGrid;
        this.element = element;
    }
    VGridAttributesSort.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.attribute = this.field;
    };
    VGridAttributesSort.prototype.attached = function () {
        var _this = this;
        this.sortIcon = document.createElement('i');
        this.sortIcon.innerHTML = this.getSortIconMarkup();
        this.element.appendChild(this.sortIcon);
        this.element.onmousedown = function () {
            _this.element.onmouseup = function (e) {
                if (e.button === 0) {
                    if (_this.firstTime && _this.asc === 'false') {
                        _this.vGrid.attGridConnector.orderBy({ attribute: _this.attribute, asc: false }, e.shiftKey);
                    }
                    else {
                        _this.vGrid.attGridConnector.orderBy(_this.attribute, e.shiftKey);
                    }
                }
            };
            setTimeout(function () {
                _this.element.onmouseup = null;
            }, 300);
        };
        this.vGrid.element.addEventListener('sortIconUpdate', function () {
            _this.sortIcon.innerHTML = _this.getSortIconMarkup();
        });
    };
    VGridAttributesSort.prototype.detached = function () {
        this.element.removeChild(this.sortIcon);
    };
    VGridAttributesSort.prototype.getSortIconMarkup = function () {
        var _this = this;
        var markup = "";
        var isAscHtml = "<svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.4 6L3 10h1.5L8 7l3.4 3H13L8.5 6h-1z\"/>\n                      </svg>";
        var isDescHtml = "<svg class=\"icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\">\n                        <path d=\"M7.4 10L3 6h1.5L8 9.2 11.3 6H13l-4.5 4h-1z\"/>\n                      </svg>";
        var sortlength = this.vGrid.attGridConnector.getCurrentOrderBy().length;
        this.vGrid.attGridConnector.getCurrentOrderBy().forEach(function (x) {
            if (x.attribute === _this.attribute) {
                _this.firstTime = false;
                var block = x.asc === true ? isAscHtml : isDescHtml;
                var main = '';
                if (sortlength > 1) {
                    main = "<i class=\"" + 'avg-fa-sort-number' + "\" data-vgridsort=\"" + x.no + "\"></i>";
                }
                markup = block + main;
            }
        });
        return markup;
    };
    return VGridAttributesSort;
}());
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesSort.prototype, "field", void 0);
__decorate([
    aurelia_framework_1.bindable,
    __metadata("design:type", String)
], VGridAttributesSort.prototype, "asc", void 0);
VGridAttributesSort = __decorate([
    aurelia_framework_1.customAttribute('v-sort'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid),
    __metadata("design:paramtypes", [HTMLElement, v_grid_1.VGrid])
], VGridAttributesSort);
exports.VGridAttributesSort = VGridAttributesSort;

});
___scope___.file("grid/v-grid-col.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
var VGridElementColConfig = (function () {
    function VGridElementColConfig(element, vGrid, targetInstruction) {
        this.vGrid = vGrid;
        this.element = element;
        this.colRowTemplate = targetInstruction.elementInstruction.colRowTemplate;
        this.colHeaderTemplate = targetInstruction.elementInstruction.colHeaderTemplate;
        this.colCss = targetInstruction.elementInstruction.colCss;
    }
    VGridElementColConfig.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.vGrid.colConfig.push({
            colWidth: this.colWidth ? this.colWidth * 1 : 100,
            colRowTemplate: this.colRowTemplate,
            colHeaderTemplate: this.colHeaderTemplate,
            colField: this.colField,
            colPinLeft: this.checkBool(this.colPinLeft),
            colPinRight: this.checkBool(this.colPinRight),
            colHeaderName: this.colHeaderName,
            colFilterMenu: this.colFilterMenu,
            colLabelMenu: this.colLabelMenu,
            colRowMenu: this.colRowMenu,
            colHidden: this.checkBool(this.colHidden),
            colDragDrop: this.colDragDrop,
            colResizeable: this.colResizeable,
            colAddLabelAttributes: this.colAddLabelAttributes,
            colAddFilterAttributes: this.colAddFilterAttributes,
            colAddRowAttributes: this.colAddRowAttributes,
            colSort: this.colSort,
            colDisplayEdit: this.colDisplayEdit,
            colFilter: this.colFilter,
            colFilterTop: this.checkBool(this.colFilterTop),
            colCss: this.colCss,
            colType: this.colType || 'text'
        });
    };
    VGridElementColConfig.prototype.checkBool = function (value) {
        if (typeof value === 'string') {
            value = value.toLowerCase();
        }
        switch (true) {
            case value === 'true':
            case value === true:
                value = true;
                break;
            case value === 'false':
            case value === false:
                value = false;
                break;
            default:
                value = false;
                break;
        }
        return value;
    };
    return VGridElementColConfig;
}());
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-width' }),
    __metadata("design:type", Number)
], VGridElementColConfig.prototype, "colWidth", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-field' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colField", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-header-name' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colHeaderName", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-sort' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colSort", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-pin-left' }),
    __metadata("design:type", Boolean)
], VGridElementColConfig.prototype, "colPinLeft", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-pin-right' }),
    __metadata("design:type", Boolean)
], VGridElementColConfig.prototype, "colPinRight", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-filter' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colFilter", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-filter-top' }),
    __metadata("design:type", Boolean)
], VGridElementColConfig.prototype, "colFilterTop", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-add-label-attributes' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colAddLabelAttributes", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-add-filter-attributes' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colAddFilterAttributes", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-add-row-attributes' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colAddRowAttributes", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-type' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colType", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-filter-menu' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colFilterMenu", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-label-menu' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colLabelMenu", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-row-menu' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colRowMenu", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-hidden' }),
    __metadata("design:type", Boolean)
], VGridElementColConfig.prototype, "colHidden", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-drag-drop' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colDragDrop", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-resizeable' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colResizeable", void 0);
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-display-edit' }),
    __metadata("design:type", String)
], VGridElementColConfig.prototype, "colDisplayEdit", void 0);
VGridElementColConfig = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        compiler = null;
        resources = null;
        var headerTemplateElement = element.getElementsByTagName('V-HEADER-TEMPLATE')[0];
        var headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
        if (headerTemplateHtml !== '') {
            instruction.colHeaderTemplate = headerTemplateHtml;
        }
        var rowTemplateElement = element.getElementsByTagName('V-ROW-TEMPLATE')[0];
        var rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
        if (rowTemplateHtml !== '') {
            instruction.colRowTemplate = rowTemplateHtml;
        }
        element.innerHTML = '';
        var css = element.getAttribute('col-css');
        if (css) {
            instruction.colCss = css;
        }
    }),
    aurelia_framework_1.customElement('v-grid-col'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
    __metadata("design:paramtypes", [Element, v_grid_1.VGrid, Object])
], VGridElementColConfig);
exports.VGridElementColConfig = VGridElementColConfig;

});
___scope___.file("grid/v-grid-contextmenu.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
var VGridContextmenu = (function () {
    function VGridContextmenu(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.customMenuTemplates = targetInstruction.elementInstruction.menuTemplates;
    }
    VGridContextmenu.prototype.bind = function () {
        this.vGrid.customMenuTemplates = this.customMenuTemplates;
    };
    return VGridContextmenu;
}());
VGridContextmenu = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-contextmenu'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        compiler = null;
        resources = null;
        instruction.menuTemplates = {};
        var template;
        var templateHTML;
        template = element.getElementsByTagName('V-MENU-CLOSE')[0];
        templateHTML = template ? template.innerHTML : null;
        if (templateHTML !== '') {
            instruction.menuTemplates.close = templateHTML;
        }
        template = element.getElementsByTagName('V-MENU-PINNED')[0];
        templateHTML = template ? template.innerHTML : null;
        if (templateHTML !== '') {
            instruction.menuTemplates.pinned = templateHTML;
        }
        template = element.getElementsByTagName('V-MENU-GROUPBY')[0];
        templateHTML = template ? template.innerHTML : null;
        if (templateHTML !== '') {
            instruction.menuTemplates.groupby = templateHTML;
        }
        template = element.getElementsByTagName('V-MENU-SORT')[0];
        templateHTML = template ? template.innerHTML : null;
        if (templateHTML !== '') {
            instruction.menuTemplates.sort = templateHTML;
        }
        template = element.getElementsByTagName('V-MENU-FILTER')[0];
        templateHTML = template ? template.innerHTML : null;
        if (templateHTML !== '') {
            instruction.menuTemplates.filter = templateHTML;
        }
        template = element.getElementsByTagName('V-MENU-FILTER-OPTIONS')[0];
        templateHTML = template ? template.innerHTML : null;
        if (templateHTML !== '') {
            instruction.menuTemplates.filterOptions = templateHTML;
        }
        template = element.getElementsByTagName('V-MENU-ALL')[0];
        templateHTML = template ? template.innerHTML : null;
        if (templateHTML !== '') {
            instruction.menuTemplates.all = templateHTML;
        }
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
    __metadata("design:paramtypes", [Element, v_grid_1.VGrid, Object])
], VGridContextmenu);
exports.VGridContextmenu = VGridContextmenu;

});
___scope___.file("grid/v-grid-footer.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
var VGridFooter = (function () {
    function VGridFooter(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.template = targetInstruction.elementInstruction.template;
    }
    VGridFooter.prototype.bind = function () {
        this.vGrid.footerTemplate = this.template;
    };
    return VGridFooter;
}());
VGridFooter = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-footer'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        compiler = null;
        resources = null;
        instruction.template = element.innerHTML;
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
    __metadata("design:paramtypes", [Element, v_grid_1.VGrid, Object])
], VGridFooter);
exports.VGridFooter = VGridFooter;

});
___scope___.file("grid/v-grid-group-element.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
var VGridGroupElement = (function () {
    function VGridGroupElement(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
    }
    VGridGroupElement.prototype.bind = function () {
        this.vGrid.colGroupElement = this.rowTemplate;
    };
    return VGridGroupElement;
}());
VGridGroupElement = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-group-element'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        compiler = null;
        resources = null;
        instruction.rowTemplate = element.innerHTML;
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
    __metadata("design:paramtypes", [Element, v_grid_1.VGrid, Object])
], VGridGroupElement);
exports.VGridGroupElement = VGridGroupElement;

});
___scope___.file("grid/v-grid-group-row.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
var VGridGroupRow = (function () {
    function VGridGroupRow(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
    }
    VGridGroupRow.prototype.bind = function () {
        this.vGrid.colGroupRow = this.rowTemplate;
    };
    return VGridGroupRow;
}());
VGridGroupRow = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-group-row'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        compiler = null;
        resources = null;
        instruction.rowTemplate = element.innerHTML;
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
    __metadata("design:paramtypes", [Element, v_grid_1.VGrid, Object])
], VGridGroupRow);
exports.VGridGroupRow = VGridGroupRow;

});
___scope___.file("grid/v-grid-loadingscreen.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
var VGridLoadingScreen = (function () {
    function VGridLoadingScreen(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.template = targetInstruction.elementInstruction.template;
    }
    VGridLoadingScreen.prototype.bind = function () {
        this.vGrid.loadingScreenTemplate = this.template;
    };
    return VGridLoadingScreen;
}());
VGridLoadingScreen = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-loadingscreen'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        compiler = null;
        resources = null;
        instruction.template = element.innerHTML;
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
    __metadata("design:paramtypes", [Element, v_grid_1.VGrid, Object])
], VGridLoadingScreen);
exports.VGridLoadingScreen = VGridLoadingScreen;

});
___scope___.file("grid/v-grid-row-repeat.js", function(exports, require, module, __filename, __dirname){ 

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
var VGridElementRowRepeat = (function () {
    function VGridElementRowRepeat(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
        this.headerTemplate = targetInstruction.elementInstruction.headerTemplate;
    }
    VGridElementRowRepeat.prototype.bind = function () {
        this.vGrid.colRepeater = true;
        this.vGrid.colRepeatRowTemplate = this.rowTemplate;
        this.vGrid.colRepeatRowHeaderTemplate = this.headerTemplate;
    };
    return VGridElementRowRepeat;
}());
VGridElementRowRepeat = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-row-repeat'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        compiler = null;
        resources = null;
        var headerTemplateElement = element.getElementsByTagName('V-HEADER-TEMPLATE')[0];
        var headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
        if (headerTemplateHtml !== '') {
            instruction.headerTemplate = headerTemplateHtml;
        }
        var rowTemplateElement = element.getElementsByTagName('V-ROW-TEMPLATE')[0];
        var rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
        if (rowTemplateHtml !== '') {
            instruction.rowTemplate = rowTemplateHtml;
        }
        if (!rowTemplateHtml) {
            instruction.rowTemplate = element.innerHTML;
        }
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction),
    __metadata("design:paramtypes", [Element, v_grid_1.VGrid, Object])
], VGridElementRowRepeat);
exports.VGridElementRowRepeat = VGridElementRowRepeat;

});
___scope___.file("grid/styles/cellsAndLabels.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/cellsAndLabels.css", "/*here we can have utility classes the users can use to simply fy use, and that we can use with future markup generator*/\r\n\r\n.avg-default .avg-header-input-top {\r\n  box-sizing: border-box;\r\n  border: 0;\r\n  border-bottom: 1px solid rgb(230, 230, 230) !important;\r\n  border-radius: initial;\r\n  box-shadow: initial;\r\n  height: 50% !important;\r\n  width: 100%;\r\n  background-color: white !important;\r\n  padding: 5px 10px;\r\n  margin: initial !important;\r\n  transition: initial !important;\r\n}\r\n\r\n.avg-default .avg-header-input-bottom {\r\n  box-sizing: border-box;\r\n  border: 0;\r\n  border-radius: initial;\r\n  box-shadow: initial;\r\n  border-top: 1px solid rgb(230, 230, 230) !important;\r\n  height: 50% !important;\r\n  width: 100%;\r\n  background-color: white !important;\r\n  padding: 5px 10px;\r\n  margin: initial !important;\r\n  transition: initial !important;\r\n}\r\n\r\n.avg-default .avg-row-checkbox-100 {\r\n  height: 100% !important;\r\n  width: initial;\r\n  left: initial !important;\r\n  position: initial !important;\r\n  display: block;\r\n  opacity: initial !important;\r\n  margin: auto !important;\r\n}\r\n\r\n.avg-default .avg-row-checkbox-50 {\r\n  height: 50% !important;\r\n  width: initial;\r\n  opacity: initial;\r\n  left: initial !important;\r\n  position: initial !important;\r\n  display: block;\r\n  margin: auto !important;\r\n}\r\n\r\n.avg-default .avg-row-input {\r\n  box-sizing: border-box;\r\n  border: 0;\r\n  border-radius: initial;\r\n  box-shadow: initial;\r\n  height: 100% !important;\r\n  width: 100%;\r\n  background-color: transparent;\r\n  padding: 5px 10px !important;\r\n}\r\n\r\n.avg-default .avg-image-round {\r\n  border-radius: 50%;\r\n  height: 100%;\r\n  box-sizing: border-box;\r\n  position: relative;\r\n  left: 50%;\r\n  transform: translateX(-50%);\r\n  padding-top: 5px;\r\n}\r\n\r\n.avg-default .avg-label-bottom {\r\n  box-sizing: border-box;\r\n  border: 0;\r\n  border-radius: initial;\r\n  box-shadow: initial;\r\n  height: 50%;\r\n  width: 100%;\r\n  position: relative;\r\n  margin: 0 !important;\r\n  padding-top: 5px;\r\n  text-align: center;\r\n  overflow: hidden;\r\n}\r\n\r\n.avg-default .avg-label-top {\r\n  box-sizing: border-box;\r\n  border: 0;\r\n  border-radius: initial;\r\n  box-shadow: initial;\r\n  height: 50%;\r\n  width: 100%;\r\n  position: relative;\r\n  margin: 0 !important;\r\n  padding-top: 5px;\r\n  text-align: center;\r\n  overflow: hidden;\r\n}\r\n\r\n/*.avg-default .avg-label-top p {\r\n  margin: 0 !important;\r\n}\r\n\r\n.avg-default .avg-label-bottom p {\r\n  margin: 0 !important;\r\n}*/\r\n\r\n.avg-default .avg-label-full {\r\n  box-sizing: border-box;\r\n  border: 0;\r\n  border-radius: initial;\r\n  box-shadow: initial;\r\n  height: 100%;\r\n  width: 100%;\r\n  position: relative;\r\n  margin: 0 !important;\r\n  padding-top: 5px;\r\n  text-align: center;\r\n}\r\n");
});
___scope___.file("grid/styles/contextmenu.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/contextmenu.css", ".avg-default.avg-menu {\r\n  position: absolute;\r\n  z-index: 10;\r\n  background-color: rgb(240, 240, 240);\r\n  min-width: 170px;\r\n}\r\n\r\n.avg-default .avg-menu--active {\r\n  display: block;\r\n}\r\n\r\n.avg-default .avg-menu__items {\r\n  padding-left: 0;\r\n  padding-bottom: 3px;\r\n}\r\n\r\n.avg-default .avg-menu__item {\r\n  list-style: none;\r\n}\r\n\r\n.avg-default .avg-menu__item p {\r\n  margin: 0 0 0 10px;\r\n}\r\n\r\n.avg-default .avg-menu__item:hover {\r\n  border-left: 6px solid grey;\r\n  background-color: lightcyan\r\n}\r\n");
});
___scope___.file("grid/styles/dragAndResize.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/dragAndResize.css", ".avg-default .avg-draggable-handler {\r\n  position: absolute;\r\n  cursor: w-resize;\r\n  width: 15px;\r\n  right: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n  z-index: 900;\r\n}\r\n\r\n.avg-default .avg-vGridDragHandle {\r\n  cursor: move;\r\n}\r\n\r\n.avg-default.avg-drag {\r\n  border: 1px solid rgb(230, 230, 230);\r\n  box-sizing: border-box;\r\n  box-shadow: initial;\r\n  line-height: 50%;\r\n  pointer-events: none;\r\n  background-color: rgb(240, 240, 240);\r\n  height: 25px;\r\n  min-width: 100px;\r\n  position: absolute;\r\n  padding-top: 5px;\r\n  text-align: center;\r\n}\r\n");
});
___scope___.file("grid/styles/grouping.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/grouping.css", ".avg-default .avg-grouping {\r\n  background-color: rgb(240, 240, 240);\r\n  position: relative;\r\n  margin: 3px;\r\n  height: 80%;\r\n  box-sizing: border-box;\r\n  padding-left: 10px;\r\n  padding-right: 10px;\r\n  display: block;\r\n  float: left;\r\n  border: 1px solid rgb(230, 230, 230);\r\n}\r\n\r\n.avg-default .avg-colunHelper {\r\n  top: 0;\r\n  width: 2px;\r\n  left: 0;\r\n  height: 100%;\r\n  box-sizing: border-box;\r\n  position: absolute;\r\n}\r\n\r\n.avg-default .avg-group-full {\r\n  border: 1px solid rgb(230, 230, 230);\r\n  box-sizing: border-box;\r\n  box-shadow: initial;\r\n  line-height: 50%;\r\n  background-color: rgb(240, 240, 240);\r\n  margin: 3px;\r\n  height: 80%;\r\n  position: relative;\r\n  float: left;\r\n  padding-top: 5px;\r\n}\r\n\r\n.avg-default .avg-grouping-element {\r\n  box-sizing: border-box;\r\n  border: 0;\r\n  border-radius: initial;\r\n  box-shadow: initial;\r\n  height: 100%;\r\n  width: 100%;\r\n  position: relative;\r\n  margin: 0 !important;\r\n  display: flex;\r\n  text-align: center;\r\n}\r\n");
});
___scope___.file("grid/styles/icons.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/icons.css", "\r\n.avg-default .avg-fa-sort-number[data-vgridsort]:after {\r\n  font: x-small;\r\n  font-size: 8px;\r\n  content: attr(data-vgridsort);\r\n}\r\n\r\n\r\n.avg-default .icon {\r\n  /* Lets the icon inherit the text color. */\r\n  fill: currentColor;\r\n\r\n  /* Inherit the text’s size too. Also allows sizing\r\n     the icon by changing its font-size. */\r\n  width: 1em;\r\n  height: 1em;\r\n\r\n  /* Nice visual alignment for icons alongside text.\r\n     (I got a few questions about this and: with most\r\n     fonts and styles, this works better than just\r\n     vertical-align:middle. Try it and see what you\r\n     like best. */\r\n  vertical-align: -0.15em;\r\n\r\n  /* Paths and strokes that overflow the viewBox can\r\n     show in IE. If you use normalize.css, it already\r\n     sets this. */\r\n  overflow: hidden;\r\n}\r\n\r\n.avg-default .iconhidden{\r\n  display:none\r\n}\r\n\r\n.avg-grouping:hover .iconhidden { display:block; }\r\n    \r\n\r\n \r\n");
});
___scope___.file("grid/styles/loader.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/loader.css", ".avg-default .avg-overlay {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  min-width: 100%;\r\n  min-height: 100%;\r\n  height: 100%;\r\n  width: 100%;\r\n  z-index: 9999 !important;\r\n  background: rgba(0, 0, 0, 0.3);\r\n  color: black;\r\n}\r\n\r\n.avg-default .avg-progress-indicator {\r\n  position: absolute;\r\n  left: 50%;\r\n  top: 50%;\r\n  z-index: 10000;\r\n  transform: translate(-50%, -50%);\r\n  width: 150px;\r\n  background-color: gray;\r\n}\r\n\r\n.avg-default .avg-progress-bar {\r\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\r\n  -o-animation: progress-bar-stripes 2s linear infinite;\r\n  animation: progress-bar-stripes 2s linear infinite;\r\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\r\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\r\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\r\n  -webkit-background-size: 40px 40px;\r\n  background-size: 40px 40px;\r\n  color: black;\r\n  text-align: center;\r\n}\r\n");
});
___scope___.file("grid/styles/main-element-tags.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/main-element-tags.css", "/*here is the main tag css, keeping them here, so theming will be easier */\r\n\r\nv-grid {\r\n  display: block;\r\n  position: relative;\r\n}\r\n\r\navg-top-panel {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  width: 100%;\r\n  top: 0;\r\n}\r\n\r\navg-footer {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  width: 100%;\r\n  bottom: 0;\r\n}\r\n\r\navg-header {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  display: inline-block;\r\n  width: 100%;\r\n}\r\n\r\navg-content {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  width: 100%;\r\n}\r\n\r\navg-header-left {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  height: 100%;\r\n}\r\n\r\navg-header-main {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  height: 100%;\r\n  overflow: hidden;\r\n}\r\n\r\navg-header-main-scroll {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  height: 100%;\r\n}\r\n\r\n\r\navg-header-right {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  height: 100%;\r\n}\r\n\r\navg-content-left {\r\n  z-index:5;\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  height: 100%;\r\n  overflow: hidden;\r\n  overflow-y: hidden;\r\n}\r\n\r\n\r\navg-content-left-scroll {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n}\r\n\r\navg-content-main {\r\n  z-index:6;\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  height: 100%;\r\n  overflow: hidden;\r\n  overflow-x: hidden;\r\n  overflow-y: hidden;\r\n}\r\n\r\navg-content-main-scroll {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n}\r\n\r\navg-content-right {\r\n  z-index:7;\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  height: 100%;\r\n  overflow: hidden;\r\n  overflow-y: hidden;\r\n}\r\n\r\n\r\n\r\navg-content-right-scroll {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n}\r\n\r\navg-content-group {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  overflow-x: hidden;\r\n  overflow-y: hidden;\r\n}\r\n\r\navg-content-group-scroll {\r\n  z-index: 9;\r\n  pointer-events: none;\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n}\r\n\r\navg-content-vhandle {\r\n  z-index: 10;\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  overflow-x: hidden;\r\n  overflow-y: scroll;\r\n}\r\n\r\navg-content-vhandle-scroll {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n}\r\n\r\n\r\n\r\navg-content-hhandle {\r\n  z-index:10;\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n  overflow-x: scroll;\r\n  overflow-y: hidden;\r\n}\r\n\r\navg-content-hhandle-scroll {\r\n  position: absolute;\r\n  box-sizing: border-box;\r\n}\r\n\r\navg-row {\r\n  width: 100%;\r\n  min-width: 1px; /*without this left scrolltop will not be set when hidden*/\r\n  position: absolute;\r\n}\r\n\r\navg-col {\r\n  position: absolute;\r\n  height: 100%;\r\n}\r\n");
});
___scope___.file("grid/styles/main-elements.css", function(exports, require, module, __filename, __dirname){ 

__fsbx_css("grid/styles/main-elements.css", ".avg-default {\r\n  border: 1px solid rgb(230, 230, 230);\r\n  -webkit-touch-callout: none;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n}\r\n\r\n.avg-default .avg-top-panel {\r\n  border-bottom: 1px solid rgb(230, 230, 230);\r\n  background-color: rgb(240, 240, 240);\r\n}\r\n\r\n.avg-default .avg-header {\r\n  border-bottom: 1px solid rgb(230, 230, 230);\r\n}\r\n\r\n.avg-default .avg-footer {\r\n  border-top: 1px solid rgb(230, 230, 230);\r\n  background-color: rgb(240, 240, 240);\r\n}\r\n\r\n.avg-default .avg-content-right {\r\n  background-color: white;\r\n  border-top: 1px solid rgb(230, 230, 230);\r\n}\r\n\r\n.avg-default .avg-content-left {\r\n  background-color: white;\r\n  border-top: 1px solid rgb(230, 230, 230);\r\n}\r\n\r\n.avg-default .avg-header-main {\r\n  background-color: rgb(240, 240, 240);\r\n}\r\n\r\n.avg-default .avg-header-left {\r\n  background-color: rgb(240, 240, 240);\r\n}\r\n\r\n.avg-default .avg-header-right {\r\n  background-color: rgb(240, 240, 240);\r\n}\r\n\r\n.avg-default .avg-content-main {\r\n  background-color: white;\r\n  border-top: 1px solid rgb(230, 230, 230);\r\n}\r\n\r\n.avg-default .avg-row {\r\n  border-bottom: 1px solid rgb(230, 230, 230);\r\n}\r\n\r\n.avg-default .avg-header-left .avg-col {\r\n  /*white-space: nowrap;*/\r\n  box-sizing: border-box;\r\n  text-overflow: ellipsis;\r\n  border-right: 1px solid rgb(230, 230, 230);\r\n  overflow: hidden;\r\n}\r\n\r\n.avg-default .avg-header-main .avg-col {\r\n  /*white-space: nowrap;*/\r\n  box-sizing: border-box;\r\n  text-overflow: ellipsis;\r\n  border-right: 1px solid rgb(230, 230, 230);\r\n  overflow: hidden;\r\n}\r\n\r\n.avg-default .avg-header-right .avg-col {\r\n  box-sizing: border-box;\r\n  border-left: 1px solid rgb(230, 230, 230);\r\n}\r\n\r\n.avg-default .avg-content-left .avg-col {\r\n  white-space: nowrap;\r\n  box-sizing: border-box;\r\n  text-overflow: ellipsis;\r\n  border-right: 1px solid rgb(230, 230, 230);\r\n  overflow: hidden;\r\n}\r\n\r\n.avg-default .avg-content-main .avg-col {\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  border-right: 1px solid rgb(230, 230, 230);\r\n  overflow: hidden;\r\n}\r\n\r\n.avg-default .avg-content-right .avg-col {\r\n  border-left: 1px solid rgb(230, 230, 230);\r\n}\r\n\r\n.avg-default .avg-col-group {\r\n  pointer-events: all;\r\n  box-sizing: border-box;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  background-color: rgb(250, 250, 250);\r\n  border-top: 1px solid rgb(230, 230, 230);\r\n  padding: 5px 10px;\r\n}\r\n\r\n.avg-default .avg-col-grouping {\r\n  white-space: nowrap;\r\n  box-sizing: border-box;\r\n  text-overflow: ellipsis;\r\n  background-color: rgb(250, 250, 250);\r\n  border-right: 1px solid rgb(230, 230, 230);\r\n  overflow: hidden;\r\n}\r\n\r\n.avg-default .avg-col-grouping-header {\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  background-color: rgb(240, 240, 240);\r\n  border-right: 1px solid rgb(230, 230, 230);\r\n  overflow: hidden;\r\n}\r\n\r\n.avg-default .avg-selected-row {\r\n  box-shadow: none;\r\n  background-color: rgb(203, 195, 203);\r\n}\r\n");
});
});
FuseBox.pkg("aurelia-framework", {}, function(___scope___){
___scope___.file("dist/commonjs/aurelia-framework.js", function(exports, require, module, __filename, __dirname){ 

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogManager = exports.FrameworkConfiguration = exports.Aurelia = undefined;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

Object.keys(_aureliaDependencyInjection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaDependencyInjection[key];
    }
  });
});

var _aureliaBinding = require('aurelia-binding');

Object.keys(_aureliaBinding).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaBinding[key];
    }
  });
});

var _aureliaMetadata = require('aurelia-metadata');

Object.keys(_aureliaMetadata).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaMetadata[key];
    }
  });
});

var _aureliaTemplating = require('aurelia-templating');

Object.keys(_aureliaTemplating).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaTemplating[key];
    }
  });
});

var _aureliaLoader = require('aurelia-loader');

Object.keys(_aureliaLoader).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaLoader[key];
    }
  });
});

var _aureliaTaskQueue = require('aurelia-task-queue');

Object.keys(_aureliaTaskQueue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaTaskQueue[key];
    }
  });
});

var _aureliaPath = require('aurelia-path');

Object.keys(_aureliaPath).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaPath[key];
    }
  });
});

var _aureliaPal = require('aurelia-pal');

Object.keys(_aureliaPal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaPal[key];
    }
  });
});

var _aureliaLogging = require('aurelia-logging');

var TheLogManager = _interopRequireWildcard(_aureliaLogging);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }



function preventActionlessFormSubmit() {
  _aureliaPal.DOM.addEventListener('submit', function (evt) {
    var target = evt.target;
    var action = target.action;

    if (target.tagName.toLowerCase() === 'form' && !action) {
      evt.preventDefault();
    }
  });
}

var Aurelia = exports.Aurelia = function () {
  function Aurelia(loader, container, resources) {
    

    this.loader = loader || new _aureliaPal.PLATFORM.Loader();
    this.container = container || new _aureliaDependencyInjection.Container().makeGlobal();
    this.resources = resources || new _aureliaTemplating.ViewResources();
    this.use = new FrameworkConfiguration(this);
    this.logger = TheLogManager.getLogger('aurelia');
    this.hostConfigured = false;
    this.host = null;

    this.use.instance(Aurelia, this);
    this.use.instance(_aureliaLoader.Loader, this.loader);
    this.use.instance(_aureliaTemplating.ViewResources, this.resources);
  }

  Aurelia.prototype.start = function start() {
    var _this = this;

    if (this.started) {
      return Promise.resolve(this);
    }

    this.started = true;
    this.logger.info('Aurelia Starting');

    return this.use.apply().then(function () {
      preventActionlessFormSubmit();

      if (!_this.container.hasResolver(_aureliaTemplating.BindingLanguage)) {
        var message = 'You must configure Aurelia with a BindingLanguage implementation.';
        _this.logger.error(message);
        throw new Error(message);
      }

      _this.logger.info('Aurelia Started');
      var evt = _aureliaPal.DOM.createCustomEvent('aurelia-started', { bubbles: true, cancelable: true });
      _aureliaPal.DOM.dispatchEvent(evt);
      return _this;
    });
  };

  Aurelia.prototype.enhance = function enhance() {
    var _this2 = this;

    var bindingContext = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var applicationHost = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    this._configureHost(applicationHost || _aureliaPal.DOM.querySelectorAll('body')[0]);

    return new Promise(function (resolve) {
      var engine = _this2.container.get(_aureliaTemplating.TemplatingEngine);
      _this2.root = engine.enhance({ container: _this2.container, element: _this2.host, resources: _this2.resources, bindingContext: bindingContext });
      _this2.root.attached();
      _this2._onAureliaComposed();
      resolve(_this2);
    });
  };

  Aurelia.prototype.setRoot = function setRoot() {
    var _this3 = this;

    var root = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
    var applicationHost = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    var instruction = {};

    if (this.root && this.root.viewModel && this.root.viewModel.router) {
      this.root.viewModel.router.deactivate();
      this.root.viewModel.router.reset();
    }

    this._configureHost(applicationHost);

    var engine = this.container.get(_aureliaTemplating.TemplatingEngine);
    var transaction = this.container.get(_aureliaTemplating.CompositionTransaction);
    delete transaction.initialComposition;

    if (!root) {
      if (this.configModuleId) {
        root = (0, _aureliaPath.relativeToFile)('./app', this.configModuleId);
      } else {
        root = 'app';
      }
    }

    instruction.viewModel = root;
    instruction.container = instruction.childContainer = this.container;
    instruction.viewSlot = this.hostSlot;
    instruction.host = this.host;

    return engine.compose(instruction).then(function (r) {
      _this3.root = r;
      instruction.viewSlot.attached();
      _this3._onAureliaComposed();
      return _this3;
    });
  };

  Aurelia.prototype._configureHost = function _configureHost(applicationHost) {
    if (this.hostConfigured) {
      return;
    }
    applicationHost = applicationHost || this.host;

    if (!applicationHost || typeof applicationHost === 'string') {
      this.host = _aureliaPal.DOM.getElementById(applicationHost || 'applicationHost');
    } else {
      this.host = applicationHost;
    }

    if (!this.host) {
      throw new Error('No applicationHost was specified.');
    }

    this.hostConfigured = true;
    this.host.aurelia = this;
    this.hostSlot = new _aureliaTemplating.ViewSlot(this.host, true);
    this.hostSlot.transformChildNodesIntoView();
    this.container.registerInstance(_aureliaPal.DOM.boundary, this.host);
  };

  Aurelia.prototype._onAureliaComposed = function _onAureliaComposed() {
    var evt = _aureliaPal.DOM.createCustomEvent('aurelia-composed', { bubbles: true, cancelable: true });
    setTimeout(function () {
      return _aureliaPal.DOM.dispatchEvent(evt);
    }, 1);
  };

  return Aurelia;
}();

var logger = TheLogManager.getLogger('aurelia');
var extPattern = /\.[^/.]+$/;

function runTasks(config, tasks) {
  var current = void 0;
  var next = function next() {
    current = tasks.shift();
    if (current) {
      return Promise.resolve(current(config)).then(next);
    }

    return Promise.resolve();
  };

  return next();
}

function loadPlugin(config, loader, info) {
  logger.debug('Loading plugin ' + info.moduleId + '.');
  config.resourcesRelativeTo = info.resourcesRelativeTo;

  var id = info.moduleId;

  if (info.resourcesRelativeTo.length > 1) {
    return loader.normalize(info.moduleId, info.resourcesRelativeTo[1]).then(function (normalizedId) {
      return _loadPlugin(normalizedId);
    });
  }

  return _loadPlugin(id);

  function _loadPlugin(moduleId) {
    return loader.loadModule(moduleId).then(function (m) {
      if ('configure' in m) {
        return Promise.resolve(m.configure(config, info.config || {})).then(function () {
          config.resourcesRelativeTo = null;
          logger.debug('Configured plugin ' + info.moduleId + '.');
        });
      }

      config.resourcesRelativeTo = null;
      logger.debug('Loaded plugin ' + info.moduleId + '.');
    });
  }
}

function loadResources(aurelia, resourcesToLoad, appResources) {
  var viewEngine = aurelia.container.get(_aureliaTemplating.ViewEngine);

  return Promise.all(Object.keys(resourcesToLoad).map(function (n) {
    return _normalize(resourcesToLoad[n]);
  })).then(function (loads) {
    var names = [];
    var importIds = [];

    loads.forEach(function (l) {
      names.push(undefined);
      importIds.push(l.importId);
    });

    return viewEngine.importViewResources(importIds, names, appResources);
  });

  function _normalize(load) {
    var moduleId = load.moduleId;
    var ext = getExt(moduleId);

    if (isOtherResource(moduleId)) {
      moduleId = removeExt(moduleId);
    }

    return aurelia.loader.normalize(moduleId, load.relativeTo).then(function (normalized) {
      return {
        name: load.moduleId,
        importId: isOtherResource(load.moduleId) ? addOriginalExt(normalized, ext) : normalized
      };
    });
  }

  function isOtherResource(name) {
    var ext = getExt(name);
    if (!ext) return false;
    if (ext === '') return false;
    if (ext === '.js' || ext === '.ts') return false;
    return true;
  }

  function removeExt(name) {
    return name.replace(extPattern, '');
  }

  function addOriginalExt(normalized, ext) {
    return removeExt(normalized) + '.' + ext;
  }
}

function getExt(name) {
  var match = name.match(extPattern);
  if (match && match.length > 0) {
    return match[0].split('.')[1];
  }
}

function assertProcessed(plugins) {
  if (plugins.processed) {
    throw new Error('This config instance has already been applied. To load more plugins or global resources, create a new FrameworkConfiguration instance.');
  }
}

var FrameworkConfiguration = function () {
  function FrameworkConfiguration(aurelia) {
    var _this4 = this;

    

    this.aurelia = aurelia;
    this.container = aurelia.container;
    this.info = [];
    this.processed = false;
    this.preTasks = [];
    this.postTasks = [];
    this.resourcesToLoad = {};
    this.preTask(function () {
      return aurelia.loader.normalize('aurelia-bootstrapper').then(function (name) {
        return _this4.bootstrapperName = name;
      });
    });
    this.postTask(function () {
      return loadResources(aurelia, _this4.resourcesToLoad, aurelia.resources);
    });
  }

  FrameworkConfiguration.prototype.instance = function instance(type, _instance) {
    this.container.registerInstance(type, _instance);
    return this;
  };

  FrameworkConfiguration.prototype.singleton = function singleton(type, implementation) {
    this.container.registerSingleton(type, implementation);
    return this;
  };

  FrameworkConfiguration.prototype.transient = function transient(type, implementation) {
    this.container.registerTransient(type, implementation);
    return this;
  };

  FrameworkConfiguration.prototype.preTask = function preTask(task) {
    assertProcessed(this);
    this.preTasks.push(task);
    return this;
  };

  FrameworkConfiguration.prototype.postTask = function postTask(task) {
    assertProcessed(this);
    this.postTasks.push(task);
    return this;
  };

  FrameworkConfiguration.prototype.feature = function feature(plugin, config) {
    if (getExt(plugin)) {
      return this.plugin({ moduleId: plugin, resourcesRelativeTo: [plugin, ''], config: config || {} });
    }

    return this.plugin({ moduleId: plugin + '/index', resourcesRelativeTo: [plugin, ''], config: config || {} });
  };

  FrameworkConfiguration.prototype.globalResources = function globalResources(resources) {
    assertProcessed(this);

    var toAdd = Array.isArray(resources) ? resources : arguments;
    var resource = void 0;
    var resourcesRelativeTo = this.resourcesRelativeTo || ['', ''];

    for (var i = 0, ii = toAdd.length; i < ii; ++i) {
      resource = toAdd[i];
      if (typeof resource !== 'string') {
        throw new Error('Invalid resource path [' + resource + ']. Resources must be specified as relative module IDs.');
      }

      var parent = resourcesRelativeTo[0];
      var grandParent = resourcesRelativeTo[1];
      var name = resource;

      if ((resource.startsWith('./') || resource.startsWith('../')) && parent !== '') {
        name = (0, _aureliaPath.join)(parent, resource);
      }

      this.resourcesToLoad[name] = { moduleId: name, relativeTo: grandParent };
    }

    return this;
  };

  FrameworkConfiguration.prototype.globalName = function globalName(resourcePath, newName) {
    assertProcessed(this);
    this.resourcesToLoad[resourcePath] = { moduleId: newName, relativeTo: '' };
    return this;
  };

  FrameworkConfiguration.prototype.plugin = function plugin(_plugin, config) {
    assertProcessed(this);

    if (typeof _plugin === 'string') {
      return this.plugin({ moduleId: _plugin, resourcesRelativeTo: [_plugin, ''], config: config || {} });
    }

    this.info.push(_plugin);
    return this;
  };

  FrameworkConfiguration.prototype._addNormalizedPlugin = function _addNormalizedPlugin(name, config) {
    var _this5 = this;

    var plugin = { moduleId: name, resourcesRelativeTo: [name, ''], config: config || {} };
    this.plugin(plugin);

    this.preTask(function () {
      var relativeTo = [name, _this5.bootstrapperName];
      plugin.moduleId = name;
      plugin.resourcesRelativeTo = relativeTo;
      return Promise.resolve();
    });

    return this;
  };

  FrameworkConfiguration.prototype.defaultBindingLanguage = function defaultBindingLanguage() {
    return this._addNormalizedPlugin('aurelia-templating-binding');
  };

  FrameworkConfiguration.prototype.router = function router() {
    return this._addNormalizedPlugin('aurelia-templating-router');
  };

  FrameworkConfiguration.prototype.history = function history() {
    return this._addNormalizedPlugin('aurelia-history-browser');
  };

  FrameworkConfiguration.prototype.defaultResources = function defaultResources() {
    return this._addNormalizedPlugin('aurelia-templating-resources');
  };

  FrameworkConfiguration.prototype.eventAggregator = function eventAggregator() {
    return this._addNormalizedPlugin('aurelia-event-aggregator');
  };

  FrameworkConfiguration.prototype.basicConfiguration = function basicConfiguration() {
    return this.defaultBindingLanguage().defaultResources().eventAggregator();
  };

  FrameworkConfiguration.prototype.standardConfiguration = function standardConfiguration() {
    return this.basicConfiguration().history().router();
  };

  FrameworkConfiguration.prototype.developmentLogging = function developmentLogging() {
    var _this6 = this;

    this.preTask(function () {
      return _this6.aurelia.loader.normalize('aurelia-logging-console', _this6.bootstrapperName).then(function (name) {
        return _this6.aurelia.loader.loadModule(name).then(function (m) {
          TheLogManager.addAppender(new m.ConsoleAppender());
          TheLogManager.setLevel(TheLogManager.logLevel.debug);
        });
      });
    });

    return this;
  };

  FrameworkConfiguration.prototype.apply = function apply() {
    var _this7 = this;

    if (this.processed) {
      return Promise.resolve();
    }

    return runTasks(this, this.preTasks).then(function () {
      var loader = _this7.aurelia.loader;
      var info = _this7.info;
      var current = void 0;

      var next = function next() {
        current = info.shift();
        if (current) {
          return loadPlugin(_this7, loader, current).then(next);
        }

        _this7.processed = true;
        return Promise.resolve();
      };

      return next().then(function () {
        return runTasks(_this7, _this7.postTasks);
      });
    });
  };

  return FrameworkConfiguration;
}();

exports.FrameworkConfiguration = FrameworkConfiguration;
var LogManager = exports.LogManager = TheLogManager;
});
return ___scope___.entry = "dist/commonjs/aurelia-framework.js";
});
FuseBox.pkg("aurelia-dependency-injection", {}, function(___scope___){
___scope___.file("dist/commonjs/aurelia-dependency-injection.js", function(exports, require, module, __filename, __dirname){ 

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = exports.InvocationHandler = exports._emptyParameters = exports.SingletonRegistration = exports.TransientRegistration = exports.FactoryInvoker = exports.NewInstance = exports.Factory = exports.StrategyResolver = exports.Parent = exports.Optional = exports.All = exports.Lazy = exports.resolver = undefined;

var _dec, _class, _dec2, _class3, _dec3, _class5, _dec4, _class7, _dec5, _class9, _dec6, _class11, _dec7, _class13, _classInvokers;

exports.getDecoratorDependencies = getDecoratorDependencies;
exports.lazy = lazy;
exports.all = all;
exports.optional = optional;
exports.parent = parent;
exports.factory = factory;
exports.newInstance = newInstance;
exports.invoker = invoker;
exports.invokeAsFactory = invokeAsFactory;
exports.registration = registration;
exports.transient = transient;
exports.singleton = singleton;
exports.autoinject = autoinject;
exports.inject = inject;

var _aureliaMetadata = require('aurelia-metadata');

var _aureliaPal = require('aurelia-pal');



var resolver = exports.resolver = _aureliaMetadata.protocol.create('aurelia:resolver', function (target) {
  if (!(typeof target.get === 'function')) {
    return 'Resolvers must implement: get(container: Container, key: any): any';
  }

  return true;
});

var Lazy = exports.Lazy = (_dec = resolver(), _dec(_class = function () {
  function Lazy(key) {
    

    this._key = key;
  }

  Lazy.prototype.get = function get(container) {
    var _this = this;

    return function () {
      return container.get(_this._key);
    };
  };

  Lazy.of = function of(key) {
    return new Lazy(key);
  };

  return Lazy;
}()) || _class);
var All = exports.All = (_dec2 = resolver(), _dec2(_class3 = function () {
  function All(key) {
    

    this._key = key;
  }

  All.prototype.get = function get(container) {
    return container.getAll(this._key);
  };

  All.of = function of(key) {
    return new All(key);
  };

  return All;
}()) || _class3);
var Optional = exports.Optional = (_dec3 = resolver(), _dec3(_class5 = function () {
  function Optional(key) {
    var checkParent = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    

    this._key = key;
    this._checkParent = checkParent;
  }

  Optional.prototype.get = function get(container) {
    if (container.hasResolver(this._key, this._checkParent)) {
      return container.get(this._key);
    }

    return null;
  };

  Optional.of = function of(key) {
    var checkParent = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    return new Optional(key, checkParent);
  };

  return Optional;
}()) || _class5);
var Parent = exports.Parent = (_dec4 = resolver(), _dec4(_class7 = function () {
  function Parent(key) {
    

    this._key = key;
  }

  Parent.prototype.get = function get(container) {
    return container.parent ? container.parent.get(this._key) : null;
  };

  Parent.of = function of(key) {
    return new Parent(key);
  };

  return Parent;
}()) || _class7);
var StrategyResolver = exports.StrategyResolver = (_dec5 = resolver(), _dec5(_class9 = function () {
  function StrategyResolver(strategy, state) {
    

    this.strategy = strategy;
    this.state = state;
  }

  StrategyResolver.prototype.get = function get(container, key) {
    switch (this.strategy) {
      case 0:
        return this.state;
      case 1:
        var singleton = container.invoke(this.state);
        this.state = singleton;
        this.strategy = 0;
        return singleton;
      case 2:
        return container.invoke(this.state);
      case 3:
        return this.state(container, key, this);
      case 4:
        return this.state[0].get(container, key);
      case 5:
        return container.get(this.state);
      default:
        throw new Error('Invalid strategy: ' + this.strategy);
    }
  };

  return StrategyResolver;
}()) || _class9);
var Factory = exports.Factory = (_dec6 = resolver(), _dec6(_class11 = function () {
  function Factory(key) {
    

    this._key = key;
  }

  Factory.prototype.get = function get(container) {
    var _this2 = this;

    return function () {
      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      return container.invoke(_this2._key, rest);
    };
  };

  Factory.of = function of(key) {
    return new Factory(key);
  };

  return Factory;
}()) || _class11);
var NewInstance = exports.NewInstance = (_dec7 = resolver(), _dec7(_class13 = function () {
  function NewInstance(key) {
    

    this.key = key;
    this.asKey = key;

    for (var _len2 = arguments.length, dynamicDependencies = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      dynamicDependencies[_key2 - 1] = arguments[_key2];
    }

    this.dynamicDependencies = dynamicDependencies;
  }

  NewInstance.prototype.get = function get(container) {
    var dynamicDependencies = this.dynamicDependencies.length > 0 ? this.dynamicDependencies.map(function (dependency) {
      return dependency['protocol:aurelia:resolver'] ? dependency.get(container) : container.get(dependency);
    }) : undefined;
    var instance = container.invoke(this.key, dynamicDependencies);
    container.registerInstance(this.asKey, instance);
    return instance;
  };

  NewInstance.prototype.as = function as(key) {
    this.asKey = key;
    return this;
  };

  NewInstance.of = function of(key) {
    for (var _len3 = arguments.length, dynamicDependencies = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      dynamicDependencies[_key3 - 1] = arguments[_key3];
    }

    return new (Function.prototype.bind.apply(NewInstance, [null].concat([key], dynamicDependencies)))();
  };

  return NewInstance;
}()) || _class13);
function getDecoratorDependencies(target, name) {
  var dependencies = target.inject;
  if (typeof dependencies === 'function') {
    throw new Error('Decorator ' + name + ' cannot be used with "inject()".  Please use an array instead.');
  }
  if (!dependencies) {
    dependencies = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.paramTypes, target).slice();
    target.inject = dependencies;
  }

  return dependencies;
}

function lazy(keyValue) {
  return function (target, key, index) {
    var params = getDecoratorDependencies(target, 'lazy');
    params[index] = Lazy.of(keyValue);
  };
}

function all(keyValue) {
  return function (target, key, index) {
    var params = getDecoratorDependencies(target, 'all');
    params[index] = All.of(keyValue);
  };
}

function optional() {
  var checkParentOrTarget = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

  var deco = function deco(checkParent) {
    return function (target, key, index) {
      var params = getDecoratorDependencies(target, 'optional');
      params[index] = Optional.of(params[index], checkParent);
    };
  };
  if (typeof checkParentOrTarget === 'boolean') {
    return deco(checkParentOrTarget);
  }
  return deco(true);
}

function parent(target, key, index) {
  var params = getDecoratorDependencies(target, 'parent');
  params[index] = Parent.of(params[index]);
}

function factory(keyValue, asValue) {
  return function (target, key, index) {
    var params = getDecoratorDependencies(target, 'factory');
    var factory = Factory.of(keyValue);
    params[index] = asValue ? factory.as(asValue) : factory;
  };
}

function newInstance(asKeyOrTarget) {
  for (var _len4 = arguments.length, dynamicDependencies = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    dynamicDependencies[_key4 - 1] = arguments[_key4];
  }

  var deco = function deco(asKey) {
    return function (target, key, index) {
      var params = getDecoratorDependencies(target, 'newInstance');
      params[index] = NewInstance.of.apply(NewInstance, [params[index]].concat(dynamicDependencies));
      if (!!asKey) {
        params[index].as(asKey);
      }
    };
  };
  if (arguments.length >= 1) {
    return deco(asKeyOrTarget);
  }
  return deco();
}

function invoker(value) {
  return function (target) {
    _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.invoker, value, target);
  };
}

function invokeAsFactory(potentialTarget) {
  var deco = function deco(target) {
    _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.invoker, FactoryInvoker.instance, target);
  };

  return potentialTarget ? deco(potentialTarget) : deco;
}

var FactoryInvoker = exports.FactoryInvoker = function () {
  function FactoryInvoker() {
    
  }

  FactoryInvoker.prototype.invoke = function invoke(container, fn, dependencies) {
    var i = dependencies.length;
    var args = new Array(i);

    while (i--) {
      args[i] = container.get(dependencies[i]);
    }

    return fn.apply(undefined, args);
  };

  FactoryInvoker.prototype.invokeWithDynamicDependencies = function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
    var i = staticDependencies.length;
    var args = new Array(i);

    while (i--) {
      args[i] = container.get(staticDependencies[i]);
    }

    if (dynamicDependencies !== undefined) {
      args = args.concat(dynamicDependencies);
    }

    return fn.apply(undefined, args);
  };

  return FactoryInvoker;
}();

FactoryInvoker.instance = new FactoryInvoker();

function registration(value) {
  return function (target) {
    _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.registration, value, target);
  };
}

function transient(key) {
  return registration(new TransientRegistration(key));
}

function singleton(keyOrRegisterInChild) {
  var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  return registration(new SingletonRegistration(keyOrRegisterInChild, registerInChild));
}

var TransientRegistration = exports.TransientRegistration = function () {
  function TransientRegistration(key) {
    

    this._key = key;
  }

  TransientRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
    var existingResolver = container.getResolver(this._key || key);
    return existingResolver === undefined ? container.registerTransient(this._key || key, fn) : existingResolver;
  };

  return TransientRegistration;
}();

var SingletonRegistration = exports.SingletonRegistration = function () {
  function SingletonRegistration(keyOrRegisterInChild) {
    var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    

    if (typeof keyOrRegisterInChild === 'boolean') {
      this._registerInChild = keyOrRegisterInChild;
    } else {
      this._key = keyOrRegisterInChild;
      this._registerInChild = registerInChild;
    }
  }

  SingletonRegistration.prototype.registerResolver = function registerResolver(container, key, fn) {
    var targetContainer = this._registerInChild ? container : container.root;
    var existingResolver = targetContainer.getResolver(this._key || key);
    return existingResolver === undefined ? targetContainer.registerSingleton(this._key || key, fn) : existingResolver;
  };

  return SingletonRegistration;
}();

function validateKey(key) {
  if (key === null || key === undefined) {
    throw new Error('key/value cannot be null or undefined. Are you trying to inject/register something that doesn\'t exist with DI?');
  }
}
var _emptyParameters = exports._emptyParameters = Object.freeze([]);

_aureliaMetadata.metadata.registration = 'aurelia:registration';
_aureliaMetadata.metadata.invoker = 'aurelia:invoker';

var resolverDecorates = resolver.decorates;

var InvocationHandler = exports.InvocationHandler = function () {
  function InvocationHandler(fn, invoker, dependencies) {
    

    this.fn = fn;
    this.invoker = invoker;
    this.dependencies = dependencies;
  }

  InvocationHandler.prototype.invoke = function invoke(container, dynamicDependencies) {
    return dynamicDependencies !== undefined ? this.invoker.invokeWithDynamicDependencies(container, this.fn, this.dependencies, dynamicDependencies) : this.invoker.invoke(container, this.fn, this.dependencies);
  };

  return InvocationHandler;
}();

function invokeWithDynamicDependencies(container, fn, staticDependencies, dynamicDependencies) {
  var i = staticDependencies.length;
  var args = new Array(i);

  while (i--) {
    args[i] = container.get(staticDependencies[i]);
  }

  if (dynamicDependencies !== undefined) {
    args = args.concat(dynamicDependencies);
  }

  return Reflect.construct(fn, args);
}

var classInvokers = (_classInvokers = {}, _classInvokers[0] = {
  invoke: function invoke(container, Type) {
    return new Type();
  },

  invokeWithDynamicDependencies: invokeWithDynamicDependencies
}, _classInvokers[1] = {
  invoke: function invoke(container, Type, deps) {
    return new Type(container.get(deps[0]));
  },

  invokeWithDynamicDependencies: invokeWithDynamicDependencies
}, _classInvokers[2] = {
  invoke: function invoke(container, Type, deps) {
    return new Type(container.get(deps[0]), container.get(deps[1]));
  },

  invokeWithDynamicDependencies: invokeWithDynamicDependencies
}, _classInvokers[3] = {
  invoke: function invoke(container, Type, deps) {
    return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]));
  },

  invokeWithDynamicDependencies: invokeWithDynamicDependencies
}, _classInvokers[4] = {
  invoke: function invoke(container, Type, deps) {
    return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]), container.get(deps[3]));
  },

  invokeWithDynamicDependencies: invokeWithDynamicDependencies
}, _classInvokers[5] = {
  invoke: function invoke(container, Type, deps) {
    return new Type(container.get(deps[0]), container.get(deps[1]), container.get(deps[2]), container.get(deps[3]), container.get(deps[4]));
  },

  invokeWithDynamicDependencies: invokeWithDynamicDependencies
}, _classInvokers.fallback = {
  invoke: invokeWithDynamicDependencies,
  invokeWithDynamicDependencies: invokeWithDynamicDependencies
}, _classInvokers);

function getDependencies(f) {
  if (!f.hasOwnProperty('inject')) {
    return [];
  }

  if (typeof f.inject === 'function') {
    return f.inject();
  }

  return f.inject;
}

var Container = exports.Container = function () {
  function Container(configuration) {
    

    if (configuration === undefined) {
      configuration = {};
    }

    this._configuration = configuration;
    this._onHandlerCreated = configuration.onHandlerCreated;
    this._handlers = configuration.handlers || (configuration.handlers = new Map());
    this._resolvers = new Map();
    this.root = this;
    this.parent = null;
  }

  Container.prototype.makeGlobal = function makeGlobal() {
    Container.instance = this;
    return this;
  };

  Container.prototype.setHandlerCreatedCallback = function setHandlerCreatedCallback(onHandlerCreated) {
    this._onHandlerCreated = onHandlerCreated;
    this._configuration.onHandlerCreated = onHandlerCreated;
  };

  Container.prototype.registerInstance = function registerInstance(key, instance) {
    return this.registerResolver(key, new StrategyResolver(0, instance === undefined ? key : instance));
  };

  Container.prototype.registerSingleton = function registerSingleton(key, fn) {
    return this.registerResolver(key, new StrategyResolver(1, fn === undefined ? key : fn));
  };

  Container.prototype.registerTransient = function registerTransient(key, fn) {
    return this.registerResolver(key, new StrategyResolver(2, fn === undefined ? key : fn));
  };

  Container.prototype.registerHandler = function registerHandler(key, handler) {
    return this.registerResolver(key, new StrategyResolver(3, handler));
  };

  Container.prototype.registerAlias = function registerAlias(originalKey, aliasKey) {
    return this.registerResolver(aliasKey, new StrategyResolver(5, originalKey));
  };

  Container.prototype.registerResolver = function registerResolver(key, resolver) {
    validateKey(key);

    var allResolvers = this._resolvers;
    var result = allResolvers.get(key);

    if (result === undefined) {
      allResolvers.set(key, resolver);
    } else if (result.strategy === 4) {
      result.state.push(resolver);
    } else {
      allResolvers.set(key, new StrategyResolver(4, [result, resolver]));
    }

    return resolver;
  };

  Container.prototype.autoRegister = function autoRegister(key, fn) {
    fn = fn === undefined ? key : fn;

    if (typeof fn === 'function') {
      var _registration = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.registration, fn);

      if (_registration === undefined) {
        return this.registerResolver(key, new StrategyResolver(1, fn));
      }

      return _registration.registerResolver(this, key, fn);
    }

    return this.registerResolver(key, new StrategyResolver(0, fn));
  };

  Container.prototype.autoRegisterAll = function autoRegisterAll(fns) {
    var i = fns.length;
    while (i--) {
      this.autoRegister(fns[i]);
    }
  };

  Container.prototype.unregister = function unregister(key) {
    this._resolvers.delete(key);
  };

  Container.prototype.hasResolver = function hasResolver(key) {
    var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    validateKey(key);

    return this._resolvers.has(key) || checkParent && this.parent !== null && this.parent.hasResolver(key, checkParent);
  };

  Container.prototype.getResolver = function getResolver(key) {
    return this._resolvers.get(key);
  };

  Container.prototype.get = function get(key) {
    validateKey(key);

    if (key === Container) {
      return this;
    }

    if (resolverDecorates(key)) {
      return key.get(this, key);
    }

    var resolver = this._resolvers.get(key);

    if (resolver === undefined) {
      if (this.parent === null) {
        return this.autoRegister(key).get(this, key);
      }

      var _registration2 = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.registration, key);

      if (_registration2 === undefined) {
        return this.parent._get(key);
      }

      return _registration2.registerResolver(this, key, key).get(this, key);
    }

    return resolver.get(this, key);
  };

  Container.prototype._get = function _get(key) {
    var resolver = this._resolvers.get(key);

    if (resolver === undefined) {
      if (this.parent === null) {
        return this.autoRegister(key).get(this, key);
      }

      return this.parent._get(key);
    }

    return resolver.get(this, key);
  };

  Container.prototype.getAll = function getAll(key) {
    validateKey(key);

    var resolver = this._resolvers.get(key);

    if (resolver === undefined) {
      if (this.parent === null) {
        return _emptyParameters;
      }

      return this.parent.getAll(key);
    }

    if (resolver.strategy === 4) {
      var state = resolver.state;
      var i = state.length;
      var results = new Array(i);

      while (i--) {
        results[i] = state[i].get(this, key);
      }

      return results;
    }

    return [resolver.get(this, key)];
  };

  Container.prototype.createChild = function createChild() {
    var child = new Container(this._configuration);
    child.root = this.root;
    child.parent = this;
    return child;
  };

  Container.prototype.invoke = function invoke(fn, dynamicDependencies) {
    try {
      var _handler = this._handlers.get(fn);

      if (_handler === undefined) {
        _handler = this._createInvocationHandler(fn);
        this._handlers.set(fn, _handler);
      }

      return _handler.invoke(this, dynamicDependencies);
    } catch (e) {
      throw new _aureliaPal.AggregateError('Error invoking ' + fn.name + '. Check the inner error for details.', e, true);
    }
  };

  Container.prototype._createInvocationHandler = function _createInvocationHandler(fn) {
    var dependencies = void 0;

    if (fn.inject === undefined) {
      dependencies = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.paramTypes, fn) || _emptyParameters;
    } else {
      dependencies = [];
      var ctor = fn;
      while (typeof ctor === 'function') {
        var _dependencies;

        (_dependencies = dependencies).push.apply(_dependencies, getDependencies(ctor));
        ctor = Object.getPrototypeOf(ctor);
      }
    }

    var invoker = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.invoker, fn) || classInvokers[dependencies.length] || classInvokers.fallback;

    var handler = new InvocationHandler(fn, invoker, dependencies);
    return this._onHandlerCreated !== undefined ? this._onHandlerCreated(handler) : handler;
  };

  return Container;
}();

function autoinject(potentialTarget) {
  var deco = function deco(target) {
    var previousInject = target.inject ? target.inject.slice() : null;
    var autoInject = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.paramTypes, target) || _emptyParameters;
    if (!previousInject) {
      target.inject = autoInject;
    } else {
      for (var i = 0; i < autoInject.length; i++) {
        if (previousInject[i] && previousInject[i] !== autoInject[i]) {
          var prevIndex = previousInject.indexOf(autoInject[i]);
          if (prevIndex > -1) {
            previousInject.splice(prevIndex, 1);
          }
          previousInject.splice(prevIndex > -1 && prevIndex < i ? i - 1 : i, 0, autoInject[i]);
        } else if (!previousInject[i]) {
          previousInject[i] = autoInject[i];
        }
      }
      target.inject = previousInject;
    }
  };

  return potentialTarget ? deco(potentialTarget) : deco;
}

function inject() {
  for (var _len5 = arguments.length, rest = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    rest[_key5] = arguments[_key5];
  }

  return function (target, key, descriptor) {
    if (typeof descriptor === 'number' && rest.length === 1) {
      var params = target.inject;
      if (typeof params === 'function') {
        throw new Error('Decorator inject cannot be used with "inject()".  Please use an array instead.');
      }
      if (!params) {
        params = _aureliaMetadata.metadata.getOwn(_aureliaMetadata.metadata.paramTypes, target).slice();
        target.inject = params;
      }
      params[descriptor] = rest[0];
      return;
    }

    if (descriptor) {
      var _fn = descriptor.value;
      _fn.inject = rest;
    } else {
      target.inject = rest;
    }
  };
}
});
return ___scope___.entry = "dist/commonjs/aurelia-dependency-injection.js";
});
FuseBox.pkg("aurelia-metadata", {}, function(___scope___){
___scope___.file("dist/commonjs/aurelia-metadata.js", function(exports, require, module, __filename, __dirname){ 

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Origin = exports.metadata = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.decorators = decorators;
exports.deprecated = deprecated;
exports.mixin = mixin;
exports.protocol = protocol;

var _aureliaPal = require('aurelia-pal');



function isObject(val) {
  return val && (typeof val === 'function' || (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object');
}

var metadata = exports.metadata = {
  resource: 'aurelia:resource',
  paramTypes: 'design:paramtypes',
  propertyType: 'design:type',
  properties: 'design:properties',
  get: function get(metadataKey, target, targetKey) {
    if (!isObject(target)) {
      return undefined;
    }
    var result = metadata.getOwn(metadataKey, target, targetKey);
    return result === undefined ? metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
  },
  getOwn: function getOwn(metadataKey, target, targetKey) {
    if (!isObject(target)) {
      return undefined;
    }
    return Reflect.getOwnMetadata(metadataKey, target, targetKey);
  },
  define: function define(metadataKey, metadataValue, target, targetKey) {
    Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
  },
  getOrCreateOwn: function getOrCreateOwn(metadataKey, Type, target, targetKey) {
    var result = metadata.getOwn(metadataKey, target, targetKey);

    if (result === undefined) {
      result = new Type();
      Reflect.defineMetadata(metadataKey, result, target, targetKey);
    }

    return result;
  }
};

var originStorage = new Map();
var unknownOrigin = Object.freeze({ moduleId: undefined, moduleMember: undefined });

var Origin = exports.Origin = function () {
  function Origin(moduleId, moduleMember) {
    

    this.moduleId = moduleId;
    this.moduleMember = moduleMember;
  }

  Origin.get = function get(fn) {
    var origin = originStorage.get(fn);

    if (origin === undefined) {
      _aureliaPal.PLATFORM.eachModule(function (key, value) {
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          for (var name in value) {
            var exp = value[name];
            if (exp === fn) {
              originStorage.set(fn, origin = new Origin(key, name));
              return true;
            }
          }
        }

        if (value === fn) {
          originStorage.set(fn, origin = new Origin(key, 'default'));
          return true;
        }

        return false;
      });
    }

    return origin || unknownOrigin;
  };

  Origin.set = function set(fn, origin) {
    originStorage.set(fn, origin);
  };

  return Origin;
}();

function decorators() {
  for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }

  var applicator = function applicator(target, key, descriptor) {
    var i = rest.length;

    if (key) {
      descriptor = descriptor || {
        value: target[key],
        writable: true,
        configurable: true,
        enumerable: true
      };

      while (i--) {
        descriptor = rest[i](target, key, descriptor) || descriptor;
      }

      Object.defineProperty(target, key, descriptor);
    } else {
      while (i--) {
        target = rest[i](target) || target;
      }
    }

    return target;
  };

  applicator.on = applicator;
  return applicator;
}

function deprecated(optionsOrTarget, maybeKey, maybeDescriptor) {
  function decorator(target, key, descriptor) {
    var methodSignature = target.constructor.name + '#' + key;
    var options = maybeKey ? {} : optionsOrTarget || {};
    var message = 'DEPRECATION - ' + methodSignature;

    if (typeof descriptor.value !== 'function') {
      throw new SyntaxError('Only methods can be marked as deprecated.');
    }

    if (options.message) {
      message += ' - ' + options.message;
    }

    return _extends({}, descriptor, {
      value: function deprecationWrapper() {
        if (options.error) {
          throw new Error(message);
        } else {
          console.warn(message);
        }

        return descriptor.value.apply(this, arguments);
      }
    });
  }

  return maybeKey ? decorator(optionsOrTarget, maybeKey, maybeDescriptor) : decorator;
}

function mixin(behavior) {
  var instanceKeys = Object.keys(behavior);

  function _mixin(possible) {
    var decorator = function decorator(target) {
      var resolvedTarget = typeof target === 'function' ? target.prototype : target;

      var i = instanceKeys.length;
      while (i--) {
        var property = instanceKeys[i];
        Object.defineProperty(resolvedTarget, property, {
          value: behavior[property],
          writable: true
        });
      }
    };

    return possible ? decorator(possible) : decorator;
  }

  return _mixin;
}

function alwaysValid() {
  return true;
}
function noCompose() {}

function ensureProtocolOptions(options) {
  if (options === undefined) {
    options = {};
  } else if (typeof options === 'function') {
    options = {
      validate: options
    };
  }

  if (!options.validate) {
    options.validate = alwaysValid;
  }

  if (!options.compose) {
    options.compose = noCompose;
  }

  return options;
}

function createProtocolValidator(validate) {
  return function (target) {
    var result = validate(target);
    return result === true;
  };
}

function createProtocolAsserter(name, validate) {
  return function (target) {
    var result = validate(target);
    if (result !== true) {
      throw new Error(result || name + ' was not correctly implemented.');
    }
  };
}

function protocol(name, options) {
  options = ensureProtocolOptions(options);

  var result = function result(target) {
    var resolvedTarget = typeof target === 'function' ? target.prototype : target;

    options.compose(resolvedTarget);
    result.assert(resolvedTarget);

    Object.defineProperty(resolvedTarget, 'protocol:' + name, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: true
    });
  };

  result.validate = createProtocolValidator(options.validate);
  result.assert = createProtocolAsserter(name, options.validate);

  return result;
}

protocol.create = function (name, options) {
  options = ensureProtocolOptions(options);
  var hidden = 'protocol:' + name;
  var result = function result(target) {
    var decorator = protocol(name, options);
    return target ? decorator(target) : decorator;
  };

  result.decorates = function (obj) {
    return obj[hidden] === true;
  };
  result.validate = createProtocolValidator(options.validate);
  result.assert = createProtocolAsserter(name, options.validate);

  return result;
};
});
return ___scope___.entry = "dist/commonjs/aurelia-metadata.js";
});
FuseBox.pkg("aurelia-pal", {}, function(___scope___){
___scope___.file("dist/commonjs/aurelia-pal.js", function(exports, require, module, __filename, __dirname){ 

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggregateError = AggregateError;
exports.initializePAL = initializePAL;
exports.reset = reset;
function AggregateError(message, innerError, skipIfAlreadyAggregate) {
  if (innerError) {
    if (innerError.innerError && skipIfAlreadyAggregate) {
      return innerError;
    }

    var separator = '\n------------------------------------------------\n';

    message += separator + 'Inner Error:\n';

    if (typeof innerError === 'string') {
      message += 'Message: ' + innerError;
    } else {
      if (innerError.message) {
        message += 'Message: ' + innerError.message;
      } else {
        message += 'Unknown Inner Error Type. Displaying Inner Error as JSON:\n ' + JSON.stringify(innerError, null, '  ');
      }

      if (innerError.stack) {
        message += '\nInner Error Stack:\n' + innerError.stack;
        message += '\nEnd Inner Error Stack';
      }
    }

    message += separator;
  }

  var e = new Error(message);
  if (innerError) {
    e.innerError = innerError;
  }

  return e;
}

var FEATURE = exports.FEATURE = {};

var PLATFORM = exports.PLATFORM = {
  noop: function noop() {},
  eachModule: function eachModule() {},
  moduleName: function (_moduleName) {
    function moduleName(_x) {
      return _moduleName.apply(this, arguments);
    }

    moduleName.toString = function () {
      return _moduleName.toString();
    };

    return moduleName;
  }(function (moduleName) {
    return moduleName;
  })
};

PLATFORM.global = function () {
  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  return new Function('return this')();
}();

var DOM = exports.DOM = {};
var isInitialized = exports.isInitialized = false;
function initializePAL(callback) {
  if (isInitialized) {
    return;
  }
  exports.isInitialized = isInitialized = true;
  if (typeof Object.getPropertyDescriptor !== 'function') {
    Object.getPropertyDescriptor = function (subject, name) {
      var pd = Object.getOwnPropertyDescriptor(subject, name);
      var proto = Object.getPrototypeOf(subject);
      while (typeof pd === 'undefined' && proto !== null) {
        pd = Object.getOwnPropertyDescriptor(proto, name);
        proto = Object.getPrototypeOf(proto);
      }
      return pd;
    };
  }

  callback(PLATFORM, FEATURE, DOM);
}
function reset() {
  exports.isInitialized = isInitialized = false;
}
});
return ___scope___.entry = "dist/commonjs/aurelia-pal.js";
});
FuseBox.pkg("aurelia-binding", {}, function(___scope___){
___scope___.file("dist/commonjs/aurelia-binding.js", function(exports, require, module, __filename, __dirname){ 

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSetObserver = exports.BindingEngine = exports.NameExpression = exports.Listener = exports.ListenerExpression = exports.BindingBehaviorResource = exports.ValueConverterResource = exports.Call = exports.CallExpression = exports.Binding = exports.BindingExpression = exports.ObjectObservationAdapter = exports.ObserverLocator = exports.SVGAnalyzer = exports.presentationAttributes = exports.presentationElements = exports.elements = exports.ComputedExpression = exports.ClassObserver = exports.SelectValueObserver = exports.CheckedObserver = exports.ValueAttributeObserver = exports.StyleObserver = exports.DataAttributeObserver = exports.dataAttributeAccessor = exports.XLinkAttributeObserver = exports.SetterObserver = exports.PrimitiveObserver = exports.propertyAccessor = exports.DirtyCheckProperty = exports.DirtyChecker = exports.EventManager = exports.delegationStrategy = exports.getMapObserver = exports.ParserImplementation = exports.Parser = exports.Scanner = exports.Lexer = exports.Token = exports.bindingMode = exports.ExpressionCloner = exports.Unparser = exports.LiteralObject = exports.LiteralArray = exports.LiteralString = exports.LiteralPrimitive = exports.PrefixNot = exports.Binary = exports.CallFunction = exports.CallMember = exports.CallScope = exports.AccessKeyed = exports.AccessMember = exports.AccessScope = exports.AccessThis = exports.Conditional = exports.Assign = exports.ValueConverter = exports.BindingBehavior = exports.Chain = exports.Expression = exports.getArrayObserver = exports.CollectionLengthObserver = exports.ModifyCollectionObserver = exports.ExpressionObserver = exports.sourceContext = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _dec3, _class2, _dec4, _class3, _dec5, _class5, _dec6, _class7, _dec7, _class8, _dec8, _class9, _dec9, _class10, _class11, _temp, _dec10, _class12, _class13, _temp2;

exports.camelCase = camelCase;
exports.createOverrideContext = createOverrideContext;
exports.getContextFor = getContextFor;
exports.createScopeForTest = createScopeForTest;
exports.connectable = connectable;
exports.enqueueBindingConnect = enqueueBindingConnect;
exports.subscriberCollection = subscriberCollection;
exports.calcSplices = calcSplices;
exports.mergeSplice = mergeSplice;
exports.projectArraySplices = projectArraySplices;
exports.getChangeRecords = getChangeRecords;
exports.cloneExpression = cloneExpression;
exports.hasDeclaredDependencies = hasDeclaredDependencies;
exports.declarePropertyDependencies = declarePropertyDependencies;
exports.computedFrom = computedFrom;
exports.createComputedObserver = createComputedObserver;
exports.valueConverter = valueConverter;
exports.bindingBehavior = bindingBehavior;
exports.observable = observable;

var _aureliaLogging = require('aurelia-logging');

var LogManager = _interopRequireWildcard(_aureliaLogging);

var _aureliaPal = require('aurelia-pal');

var _aureliaTaskQueue = require('aurelia-task-queue');

var _aureliaMetadata = require('aurelia-metadata');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var map = Object.create(null);

function camelCase(name) {
  if (name in map) {
    return map[name];
  }
  var result = name.charAt(0).toLowerCase() + name.slice(1).replace(/[_.-](\w|$)/g, function (_, x) {
    return x.toUpperCase();
  });
  map[name] = result;
  return result;
}

function createOverrideContext(bindingContext, parentOverrideContext) {
  return {
    bindingContext: bindingContext,
    parentOverrideContext: parentOverrideContext || null
  };
}

function getContextFor(name, scope, ancestor) {
  var oc = scope.overrideContext;

  if (ancestor) {
    while (ancestor && oc) {
      ancestor--;
      oc = oc.parentOverrideContext;
    }
    if (ancestor || !oc) {
      return undefined;
    }
    return name in oc ? oc : oc.bindingContext;
  }

  while (oc && !(name in oc) && !(oc.bindingContext && name in oc.bindingContext)) {
    oc = oc.parentOverrideContext;
  }
  if (oc) {
    return name in oc ? oc : oc.bindingContext;
  }

  return scope.bindingContext || scope.overrideContext;
}

function createScopeForTest(bindingContext, parentBindingContext) {
  if (parentBindingContext) {
    return {
      bindingContext: bindingContext,
      overrideContext: createOverrideContext(bindingContext, createOverrideContext(parentBindingContext))
    };
  }
  return {
    bindingContext: bindingContext,
    overrideContext: createOverrideContext(bindingContext)
  };
}

var sourceContext = exports.sourceContext = 'Binding:source';
var slotNames = [];
var versionSlotNames = [];

for (var i = 0; i < 100; i++) {
  slotNames.push('_observer' + i);
  versionSlotNames.push('_observerVersion' + i);
}

function addObserver(observer) {
  var observerSlots = this._observerSlots === undefined ? 0 : this._observerSlots;
  var i = observerSlots;
  while (i-- && this[slotNames[i]] !== observer) {}

  if (i === -1) {
    i = 0;
    while (this[slotNames[i]]) {
      i++;
    }
    this[slotNames[i]] = observer;
    observer.subscribe(sourceContext, this);

    if (i === observerSlots) {
      this._observerSlots = i + 1;
    }
  }

  if (this._version === undefined) {
    this._version = 0;
  }
  this[versionSlotNames[i]] = this._version;
}

function observeProperty(obj, propertyName) {
  var observer = this.observerLocator.getObserver(obj, propertyName);
  addObserver.call(this, observer);
}

function observeArray(array) {
  var observer = this.observerLocator.getArrayObserver(array);
  addObserver.call(this, observer);
}

function unobserve(all) {
  var i = this._observerSlots;
  while (i--) {
    if (all || this[versionSlotNames[i]] !== this._version) {
      var observer = this[slotNames[i]];
      this[slotNames[i]] = null;
      if (observer) {
        observer.unsubscribe(sourceContext, this);
      }
    }
  }
}

function connectable() {
  return function (target) {
    target.prototype.observeProperty = observeProperty;
    target.prototype.observeArray = observeArray;
    target.prototype.unobserve = unobserve;
    target.prototype.addObserver = addObserver;
  };
}

var queue = [];
var queued = {};
var nextId = 0;
var minimumImmediate = 100;
var frameBudget = 15;

var isFlushRequested = false;
var immediate = 0;

function flush(animationFrameStart) {
  var length = queue.length;
  var i = 0;
  while (i < length) {
    var binding = queue[i];
    queued[binding.__connectQueueId] = false;
    binding.connect(true);
    i++;

    if (i % 100 === 0 && _aureliaPal.PLATFORM.performance.now() - animationFrameStart > frameBudget) {
      break;
    }
  }
  queue.splice(0, i);

  if (queue.length) {
    _aureliaPal.PLATFORM.requestAnimationFrame(flush);
  } else {
    isFlushRequested = false;
    immediate = 0;
  }
}

function enqueueBindingConnect(binding) {
  if (immediate < minimumImmediate) {
    immediate++;
    binding.connect(false);
  } else {
    var id = binding.__connectQueueId;
    if (id === undefined) {
      id = nextId;
      nextId++;
      binding.__connectQueueId = id;
    }

    if (!queued[id]) {
      queue.push(binding);
      queued[id] = true;
    }
  }
  if (!isFlushRequested) {
    isFlushRequested = true;
    _aureliaPal.PLATFORM.requestAnimationFrame(flush);
  }
}

function addSubscriber(context, callable) {
  if (this.hasSubscriber(context, callable)) {
    return false;
  }
  if (!this._context0) {
    this._context0 = context;
    this._callable0 = callable;
    return true;
  }
  if (!this._context1) {
    this._context1 = context;
    this._callable1 = callable;
    return true;
  }
  if (!this._context2) {
    this._context2 = context;
    this._callable2 = callable;
    return true;
  }
  if (!this._contextsRest) {
    this._contextsRest = [context];
    this._callablesRest = [callable];
    return true;
  }
  this._contextsRest.push(context);
  this._callablesRest.push(callable);
  return true;
}

function removeSubscriber(context, callable) {
  if (this._context0 === context && this._callable0 === callable) {
    this._context0 = null;
    this._callable0 = null;
    return true;
  }
  if (this._context1 === context && this._callable1 === callable) {
    this._context1 = null;
    this._callable1 = null;
    return true;
  }
  if (this._context2 === context && this._callable2 === callable) {
    this._context2 = null;
    this._callable2 = null;
    return true;
  }
  var rest = this._contextsRest;
  var index = void 0;
  if (!rest || !rest.length || (index = rest.indexOf(context)) === -1 || this._callablesRest[index] !== callable) {
    return false;
  }
  rest.splice(index, 1);
  this._callablesRest.splice(index, 1);
  return true;
}

var arrayPool1 = [];
var arrayPool2 = [];
var poolUtilization = [];

function callSubscribers(newValue, oldValue) {
  var context0 = this._context0;
  var callable0 = this._callable0;
  var context1 = this._context1;
  var callable1 = this._callable1;
  var context2 = this._context2;
  var callable2 = this._callable2;
  var length = this._contextsRest ? this._contextsRest.length : 0;
  var contextsRest = void 0;
  var callablesRest = void 0;
  var poolIndex = void 0;
  var i = void 0;
  if (length) {
    poolIndex = poolUtilization.length;
    while (poolIndex-- && poolUtilization[poolIndex]) {}
    if (poolIndex < 0) {
      poolIndex = poolUtilization.length;
      contextsRest = [];
      callablesRest = [];
      poolUtilization.push(true);
      arrayPool1.push(contextsRest);
      arrayPool2.push(callablesRest);
    } else {
      poolUtilization[poolIndex] = true;
      contextsRest = arrayPool1[poolIndex];
      callablesRest = arrayPool2[poolIndex];
    }

    i = length;
    while (i--) {
      contextsRest[i] = this._contextsRest[i];
      callablesRest[i] = this._callablesRest[i];
    }
  }

  if (context0) {
    if (callable0) {
      callable0.call(context0, newValue, oldValue);
    } else {
      context0(newValue, oldValue);
    }
  }
  if (context1) {
    if (callable1) {
      callable1.call(context1, newValue, oldValue);
    } else {
      context1(newValue, oldValue);
    }
  }
  if (context2) {
    if (callable2) {
      callable2.call(context2, newValue, oldValue);
    } else {
      context2(newValue, oldValue);
    }
  }
  if (length) {
    for (i = 0; i < length; i++) {
      var callable = callablesRest[i];
      var context = contextsRest[i];
      if (callable) {
        callable.call(context, newValue, oldValue);
      } else {
        context(newValue, oldValue);
      }
      contextsRest[i] = null;
      callablesRest[i] = null;
    }
    poolUtilization[poolIndex] = false;
  }
}

function hasSubscribers() {
  return !!(this._context0 || this._context1 || this._context2 || this._contextsRest && this._contextsRest.length);
}

function hasSubscriber(context, callable) {
  var has = this._context0 === context && this._callable0 === callable || this._context1 === context && this._callable1 === callable || this._context2 === context && this._callable2 === callable;
  if (has) {
    return true;
  }
  var index = void 0;
  var contexts = this._contextsRest;
  if (!contexts || (index = contexts.length) === 0) {
    return false;
  }
  var callables = this._callablesRest;
  while (index--) {
    if (contexts[index] === context && callables[index] === callable) {
      return true;
    }
  }
  return false;
}

function subscriberCollection() {
  return function (target) {
    target.prototype.addSubscriber = addSubscriber;
    target.prototype.removeSubscriber = removeSubscriber;
    target.prototype.callSubscribers = callSubscribers;
    target.prototype.hasSubscribers = hasSubscribers;
    target.prototype.hasSubscriber = hasSubscriber;
  };
}

var ExpressionObserver = exports.ExpressionObserver = (_dec = connectable(), _dec2 = subscriberCollection(), _dec(_class = _dec2(_class = function () {
  function ExpressionObserver(scope, expression, observerLocator, lookupFunctions) {
    

    this.scope = scope;
    this.expression = expression;
    this.observerLocator = observerLocator;
    this.lookupFunctions = lookupFunctions;
  }

  ExpressionObserver.prototype.getValue = function getValue() {
    return this.expression.evaluate(this.scope, this.lookupFunctions);
  };

  ExpressionObserver.prototype.setValue = function setValue(newValue) {
    this.expression.assign(this.scope, newValue);
  };

  ExpressionObserver.prototype.subscribe = function subscribe(context, callable) {
    var _this = this;

    if (!this.hasSubscribers()) {
      this.oldValue = this.expression.evaluate(this.scope, this.lookupFunctions);
      this.expression.connect(this, this.scope);
    }
    this.addSubscriber(context, callable);
    if (arguments.length === 1 && context instanceof Function) {
      return {
        dispose: function dispose() {
          _this.unsubscribe(context, callable);
        }
      };
    }
  };

  ExpressionObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
    if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
      this.unobserve(true);
      this.oldValue = undefined;
    }
  };

  ExpressionObserver.prototype.call = function call() {
    var newValue = this.expression.evaluate(this.scope, this.lookupFunctions);
    var oldValue = this.oldValue;
    if (newValue !== oldValue) {
      this.oldValue = newValue;
      this.callSubscribers(newValue, oldValue);
    }
    this._version++;
    this.expression.connect(this, this.scope);
    this.unobserve(false);
  };

  return ExpressionObserver;
}()) || _class) || _class);


function isIndex(s) {
  return +s === s >>> 0;
}

function toNumber(s) {
  return +s;
}

function newSplice(index, removed, addedCount) {
  return {
    index: index,
    removed: removed,
    addedCount: addedCount
  };
}

var EDIT_LEAVE = 0;
var EDIT_UPDATE = 1;
var EDIT_ADD = 2;
var EDIT_DELETE = 3;

function ArraySplice() {}

ArraySplice.prototype = {
  calcEditDistances: function calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd) {
    var rowCount = oldEnd - oldStart + 1;
    var columnCount = currentEnd - currentStart + 1;
    var distances = new Array(rowCount);
    var north = void 0;
    var west = void 0;

    for (var _i = 0; _i < rowCount; ++_i) {
      distances[_i] = new Array(columnCount);
      distances[_i][0] = _i;
    }

    for (var j = 0; j < columnCount; ++j) {
      distances[0][j] = j;
    }

    for (var _i2 = 1; _i2 < rowCount; ++_i2) {
      for (var _j = 1; _j < columnCount; ++_j) {
        if (this.equals(current[currentStart + _j - 1], old[oldStart + _i2 - 1])) {
          distances[_i2][_j] = distances[_i2 - 1][_j - 1];
        } else {
          north = distances[_i2 - 1][_j] + 1;
          west = distances[_i2][_j - 1] + 1;
          distances[_i2][_j] = north < west ? north : west;
        }
      }
    }

    return distances;
  },

  spliceOperationsFromEditDistances: function spliceOperationsFromEditDistances(distances) {
    var i = distances.length - 1;
    var j = distances[0].length - 1;
    var current = distances[i][j];
    var edits = [];
    while (i > 0 || j > 0) {
      if (i === 0) {
        edits.push(EDIT_ADD);
        j--;
        continue;
      }
      if (j === 0) {
        edits.push(EDIT_DELETE);
        i--;
        continue;
      }
      var northWest = distances[i - 1][j - 1];
      var west = distances[i - 1][j];
      var north = distances[i][j - 1];

      var min = void 0;
      if (west < north) {
        min = west < northWest ? west : northWest;
      } else {
        min = north < northWest ? north : northWest;
      }

      if (min === northWest) {
        if (northWest === current) {
          edits.push(EDIT_LEAVE);
        } else {
          edits.push(EDIT_UPDATE);
          current = northWest;
        }
        i--;
        j--;
      } else if (min === west) {
        edits.push(EDIT_DELETE);
        i--;
        current = west;
      } else {
        edits.push(EDIT_ADD);
        j--;
        current = north;
      }
    }

    edits.reverse();
    return edits;
  },

  calcSplices: function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
    var prefixCount = 0;
    var suffixCount = 0;

    var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
    if (currentStart === 0 && oldStart === 0) {
      prefixCount = this.sharedPrefix(current, old, minLength);
    }

    if (currentEnd === current.length && oldEnd === old.length) {
      suffixCount = this.sharedSuffix(current, old, minLength - prefixCount);
    }

    currentStart += prefixCount;
    oldStart += prefixCount;
    currentEnd -= suffixCount;
    oldEnd -= suffixCount;

    if (currentEnd - currentStart === 0 && oldEnd - oldStart === 0) {
      return [];
    }

    if (currentStart === currentEnd) {
      var _splice = newSplice(currentStart, [], 0);
      while (oldStart < oldEnd) {
        _splice.removed.push(old[oldStart++]);
      }

      return [_splice];
    } else if (oldStart === oldEnd) {
      return [newSplice(currentStart, [], currentEnd - currentStart)];
    }

    var ops = this.spliceOperationsFromEditDistances(this.calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));

    var splice = undefined;
    var splices = [];
    var index = currentStart;
    var oldIndex = oldStart;
    for (var _i3 = 0; _i3 < ops.length; ++_i3) {
      switch (ops[_i3]) {
        case EDIT_LEAVE:
          if (splice) {
            splices.push(splice);
            splice = undefined;
          }

          index++;
          oldIndex++;
          break;
        case EDIT_UPDATE:
          if (!splice) {
            splice = newSplice(index, [], 0);
          }

          splice.addedCount++;
          index++;

          splice.removed.push(old[oldIndex]);
          oldIndex++;
          break;
        case EDIT_ADD:
          if (!splice) {
            splice = newSplice(index, [], 0);
          }

          splice.addedCount++;
          index++;
          break;
        case EDIT_DELETE:
          if (!splice) {
            splice = newSplice(index, [], 0);
          }

          splice.removed.push(old[oldIndex]);
          oldIndex++;
          break;
      }
    }

    if (splice) {
      splices.push(splice);
    }
    return splices;
  },

  sharedPrefix: function sharedPrefix(current, old, searchLength) {
    for (var _i4 = 0; _i4 < searchLength; ++_i4) {
      if (!this.equals(current[_i4], old[_i4])) {
        return _i4;
      }
    }

    return searchLength;
  },

  sharedSuffix: function sharedSuffix(current, old, searchLength) {
    var index1 = current.length;
    var index2 = old.length;
    var count = 0;
    while (count < searchLength && this.equals(current[--index1], old[--index2])) {
      count++;
    }

    return count;
  },

  calculateSplices: function calculateSplices(current, previous) {
    return this.calcSplices(current, 0, current.length, previous, 0, previous.length);
  },

  equals: function equals(currentValue, previousValue) {
    return currentValue === previousValue;
  }
};

var arraySplice = new ArraySplice();

function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
  return arraySplice.calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd);
}

function intersect(start1, end1, start2, end2) {
  if (end1 < start2 || end2 < start1) {
    return -1;
  }

  if (end1 === start2 || end2 === start1) {
    return 0;
  }

  if (start1 < start2) {
    if (end1 < end2) {
      return end1 - start2;
    }

    return end2 - start2;
  }

  if (end2 < end1) {
    return end2 - start1;
  }

  return end1 - start1;
}

function mergeSplice(splices, index, removed, addedCount) {
  var splice = newSplice(index, removed, addedCount);

  var inserted = false;
  var insertionOffset = 0;

  for (var _i5 = 0; _i5 < splices.length; _i5++) {
    var current = splices[_i5];
    current.index += insertionOffset;

    if (inserted) {
      continue;
    }

    var intersectCount = intersect(splice.index, splice.index + splice.removed.length, current.index, current.index + current.addedCount);

    if (intersectCount >= 0) {

      splices.splice(_i5, 1);
      _i5--;

      insertionOffset -= current.addedCount - current.removed.length;

      splice.addedCount += current.addedCount - intersectCount;
      var deleteCount = splice.removed.length + current.removed.length - intersectCount;

      if (!splice.addedCount && !deleteCount) {
        inserted = true;
      } else {
        var currentRemoved = current.removed;

        if (splice.index < current.index) {
          var prepend = splice.removed.slice(0, current.index - splice.index);
          Array.prototype.push.apply(prepend, currentRemoved);
          currentRemoved = prepend;
        }

        if (splice.index + splice.removed.length > current.index + current.addedCount) {
          var append = splice.removed.slice(current.index + current.addedCount - splice.index);
          Array.prototype.push.apply(currentRemoved, append);
        }

        splice.removed = currentRemoved;
        if (current.index < splice.index) {
          splice.index = current.index;
        }
      }
    } else if (splice.index < current.index) {

      inserted = true;

      splices.splice(_i5, 0, splice);
      _i5++;

      var offset = splice.addedCount - splice.removed.length;
      current.index += offset;
      insertionOffset += offset;
    }
  }

  if (!inserted) {
    splices.push(splice);
  }
}

function createInitialSplices(array, changeRecords) {
  var splices = [];

  for (var _i6 = 0; _i6 < changeRecords.length; _i6++) {
    var record = changeRecords[_i6];
    switch (record.type) {
      case 'splice':
        mergeSplice(splices, record.index, record.removed.slice(), record.addedCount);
        break;
      case 'add':
      case 'update':
      case 'delete':
        if (!isIndex(record.name)) {
          continue;
        }

        var index = toNumber(record.name);
        if (index < 0) {
          continue;
        }

        mergeSplice(splices, index, [record.oldValue], record.type === 'delete' ? 0 : 1);
        break;
      default:
        console.error('Unexpected record type: ' + JSON.stringify(record));
        break;
    }
  }

  return splices;
}

function projectArraySplices(array, changeRecords) {
  var splices = [];

  createInitialSplices(array, changeRecords).forEach(function (splice) {
    if (splice.addedCount === 1 && splice.removed.length === 1) {
      if (splice.removed[0] !== array[splice.index]) {
        splices.push(splice);
      }

      return;
    }

    splices = splices.concat(calcSplices(array, splice.index, splice.index + splice.addedCount, splice.removed, 0, splice.removed.length));
  });

  return splices;
}

function newRecord(type, object, key, oldValue) {
  return {
    type: type,
    object: object,
    key: key,
    oldValue: oldValue
  };
}

function getChangeRecords(map) {
  var entries = new Array(map.size);
  var keys = map.keys();
  var i = 0;
  var item = void 0;

  while (item = keys.next()) {
    if (item.done) {
      break;
    }

    entries[i] = newRecord('added', map, item.value);
    i++;
  }

  return entries;
}

var ModifyCollectionObserver = exports.ModifyCollectionObserver = (_dec3 = subscriberCollection(), _dec3(_class2 = function () {
  function ModifyCollectionObserver(taskQueue, collection) {
    

    this.taskQueue = taskQueue;
    this.queued = false;
    this.changeRecords = null;
    this.oldCollection = null;
    this.collection = collection;
    this.lengthPropertyName = collection instanceof Map || collection instanceof Set ? 'size' : 'length';
  }

  ModifyCollectionObserver.prototype.subscribe = function subscribe(context, callable) {
    this.addSubscriber(context, callable);
  };

  ModifyCollectionObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
    this.removeSubscriber(context, callable);
  };

  ModifyCollectionObserver.prototype.addChangeRecord = function addChangeRecord(changeRecord) {
    if (!this.hasSubscribers() && !this.lengthObserver) {
      return;
    }

    if (changeRecord.type === 'splice') {
      var index = changeRecord.index;
      var arrayLength = changeRecord.object.length;
      if (index > arrayLength) {
        index = arrayLength - changeRecord.addedCount;
      } else if (index < 0) {
        index = arrayLength + changeRecord.removed.length + index - changeRecord.addedCount;
      }
      if (index < 0) {
        index = 0;
      }
      changeRecord.index = index;
    }

    if (this.changeRecords === null) {
      this.changeRecords = [changeRecord];
    } else {
      this.changeRecords.push(changeRecord);
    }

    if (!this.queued) {
      this.queued = true;
      this.taskQueue.queueMicroTask(this);
    }
  };

  ModifyCollectionObserver.prototype.flushChangeRecords = function flushChangeRecords() {
    if (this.changeRecords && this.changeRecords.length || this.oldCollection) {
      this.call();
    }
  };

  ModifyCollectionObserver.prototype.reset = function reset(oldCollection) {
    this.oldCollection = oldCollection;

    if (this.hasSubscribers() && !this.queued) {
      this.queued = true;
      this.taskQueue.queueMicroTask(this);
    }
  };

  ModifyCollectionObserver.prototype.getLengthObserver = function getLengthObserver() {
    return this.lengthObserver || (this.lengthObserver = new CollectionLengthObserver(this.collection));
  };

  ModifyCollectionObserver.prototype.call = function call() {
    var changeRecords = this.changeRecords;
    var oldCollection = this.oldCollection;
    var records = void 0;

    this.queued = false;
    this.changeRecords = [];
    this.oldCollection = null;

    if (this.hasSubscribers()) {
      if (oldCollection) {
        if (this.collection instanceof Map || this.collection instanceof Set) {
          records = getChangeRecords(oldCollection);
        } else {
          records = calcSplices(this.collection, 0, this.collection.length, oldCollection, 0, oldCollection.length);
        }
      } else {
        if (this.collection instanceof Map || this.collection instanceof Set) {
          records = changeRecords;
        } else {
          records = projectArraySplices(this.collection, changeRecords);
        }
      }

      this.callSubscribers(records);
    }

    if (this.lengthObserver) {
      this.lengthObserver.call(this.collection[this.lengthPropertyName]);
    }
  };

  return ModifyCollectionObserver;
}()) || _class2);
var CollectionLengthObserver = exports.CollectionLengthObserver = (_dec4 = subscriberCollection(), _dec4(_class3 = function () {
  function CollectionLengthObserver(collection) {
    

    this.collection = collection;
    this.lengthPropertyName = collection instanceof Map || collection instanceof Set ? 'size' : 'length';
    this.currentValue = collection[this.lengthPropertyName];
  }

  CollectionLengthObserver.prototype.getValue = function getValue() {
    return this.collection[this.lengthPropertyName];
  };

  CollectionLengthObserver.prototype.setValue = function setValue(newValue) {
    this.collection[this.lengthPropertyName] = newValue;
  };

  CollectionLengthObserver.prototype.subscribe = function subscribe(context, callable) {
    this.addSubscriber(context, callable);
  };

  CollectionLengthObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
    this.removeSubscriber(context, callable);
  };

  CollectionLengthObserver.prototype.call = function call(newValue) {
    var oldValue = this.currentValue;
    this.callSubscribers(newValue, oldValue);
    this.currentValue = newValue;
  };

  return CollectionLengthObserver;
}()) || _class3);

var pop = Array.prototype.pop;
var push = Array.prototype.push;
var reverse = Array.prototype.reverse;
var shift = Array.prototype.shift;
var sort = Array.prototype.sort;
var splice = Array.prototype.splice;
var unshift = Array.prototype.unshift;

Array.prototype.pop = function () {
  var notEmpty = this.length > 0;
  var methodCallResult = pop.apply(this, arguments);
  if (notEmpty && this.__array_observer__ !== undefined) {
    this.__array_observer__.addChangeRecord({
      type: 'delete',
      object: this,
      name: this.length,
      oldValue: methodCallResult
    });
  }
  return methodCallResult;
};

Array.prototype.push = function () {
  var methodCallResult = push.apply(this, arguments);
  if (this.__array_observer__ !== undefined) {
    this.__array_observer__.addChangeRecord({
      type: 'splice',
      object: this,
      index: this.length - arguments.length,
      removed: [],
      addedCount: arguments.length
    });
  }
  return methodCallResult;
};

Array.prototype.reverse = function () {
  var oldArray = void 0;
  if (this.__array_observer__ !== undefined) {
    this.__array_observer__.flushChangeRecords();
    oldArray = this.slice();
  }
  var methodCallResult = reverse.apply(this, arguments);
  if (this.__array_observer__ !== undefined) {
    this.__array_observer__.reset(oldArray);
  }
  return methodCallResult;
};

Array.prototype.shift = function () {
  var notEmpty = this.length > 0;
  var methodCallResult = shift.apply(this, arguments);
  if (notEmpty && this.__array_observer__ !== undefined) {
    this.__array_observer__.addChangeRecord({
      type: 'delete',
      object: this,
      name: 0,
      oldValue: methodCallResult
    });
  }
  return methodCallResult;
};

Array.prototype.sort = function () {
  var oldArray = void 0;
  if (this.__array_observer__ !== undefined) {
    this.__array_observer__.flushChangeRecords();
    oldArray = this.slice();
  }
  var methodCallResult = sort.apply(this, arguments);
  if (this.__array_observer__ !== undefined) {
    this.__array_observer__.reset(oldArray);
  }
  return methodCallResult;
};

Array.prototype.splice = function () {
  var methodCallResult = splice.apply(this, arguments);
  if (this.__array_observer__ !== undefined) {
    this.__array_observer__.addChangeRecord({
      type: 'splice',
      object: this,
      index: +arguments[0],
      removed: methodCallResult,
      addedCount: arguments.length > 2 ? arguments.length - 2 : 0
    });
  }
  return methodCallResult;
};

Array.prototype.unshift = function () {
  var methodCallResult = unshift.apply(this, arguments);
  if (this.__array_observer__ !== undefined) {
    this.__array_observer__.addChangeRecord({
      type: 'splice',
      object: this,
      index: 0,
      removed: [],
      addedCount: arguments.length
    });
  }
  return methodCallResult;
};

function _getArrayObserver(taskQueue, array) {
  return ModifyArrayObserver.for(taskQueue, array);
}

exports.getArrayObserver = _getArrayObserver;

var ModifyArrayObserver = function (_ModifyCollectionObse) {
  _inherits(ModifyArrayObserver, _ModifyCollectionObse);

  function ModifyArrayObserver(taskQueue, array) {
    

    return _possibleConstructorReturn(this, _ModifyCollectionObse.call(this, taskQueue, array));
  }

  ModifyArrayObserver.for = function _for(taskQueue, array) {
    if (!('__array_observer__' in array)) {
      Reflect.defineProperty(array, '__array_observer__', {
        value: ModifyArrayObserver.create(taskQueue, array),
        enumerable: false, configurable: false
      });
    }
    return array.__array_observer__;
  };

  ModifyArrayObserver.create = function create(taskQueue, array) {
    return new ModifyArrayObserver(taskQueue, array);
  };

  return ModifyArrayObserver;
}(ModifyCollectionObserver);

var Expression = exports.Expression = function () {
  function Expression() {
    

    this.isChain = false;
    this.isAssignable = false;
  }

  Expression.prototype.evaluate = function evaluate(scope, lookupFunctions, args) {
    throw new Error('Binding expression "' + this + '" cannot be evaluated.');
  };

  Expression.prototype.assign = function assign(scope, value, lookupFunctions) {
    throw new Error('Binding expression "' + this + '" cannot be assigned to.');
  };

  Expression.prototype.toString = function toString() {
    return Unparser.unparse(this);
  };

  return Expression;
}();

var Chain = exports.Chain = function (_Expression) {
  _inherits(Chain, _Expression);

  function Chain(expressions) {
    

    var _this3 = _possibleConstructorReturn(this, _Expression.call(this));

    _this3.expressions = expressions;
    _this3.isChain = true;
    return _this3;
  }

  Chain.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    var result = void 0;
    var expressions = this.expressions;
    var last = void 0;

    for (var _i7 = 0, length = expressions.length; _i7 < length; ++_i7) {
      last = expressions[_i7].evaluate(scope, lookupFunctions);

      if (last !== null) {
        result = last;
      }
    }

    return result;
  };

  Chain.prototype.accept = function accept(visitor) {
    return visitor.visitChain(this);
  };

  return Chain;
}(Expression);

var BindingBehavior = exports.BindingBehavior = function (_Expression2) {
  _inherits(BindingBehavior, _Expression2);

  function BindingBehavior(expression, name, args) {
    

    var _this4 = _possibleConstructorReturn(this, _Expression2.call(this));

    _this4.expression = expression;
    _this4.name = name;
    _this4.args = args;
    return _this4;
  }

  BindingBehavior.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    return this.expression.evaluate(scope, lookupFunctions);
  };

  BindingBehavior.prototype.assign = function assign(scope, value, lookupFunctions) {
    return this.expression.assign(scope, value, lookupFunctions);
  };

  BindingBehavior.prototype.accept = function accept(visitor) {
    return visitor.visitBindingBehavior(this);
  };

  BindingBehavior.prototype.connect = function connect(binding, scope) {
    this.expression.connect(binding, scope);
  };

  BindingBehavior.prototype.bind = function bind(binding, scope, lookupFunctions) {
    if (this.expression.expression && this.expression.bind) {
      this.expression.bind(binding, scope, lookupFunctions);
    }
    var behavior = lookupFunctions.bindingBehaviors(this.name);
    if (!behavior) {
      throw new Error('No BindingBehavior named "' + this.name + '" was found!');
    }
    var behaviorKey = 'behavior-' + this.name;
    if (binding[behaviorKey]) {
      throw new Error('A binding behavior named "' + this.name + '" has already been applied to "' + this.expression + '"');
    }
    binding[behaviorKey] = behavior;
    behavior.bind.apply(behavior, [binding, scope].concat(evalList(scope, this.args, binding.lookupFunctions)));
  };

  BindingBehavior.prototype.unbind = function unbind(binding, scope) {
    var behaviorKey = 'behavior-' + this.name;
    binding[behaviorKey].unbind(binding, scope);
    binding[behaviorKey] = null;
    if (this.expression.expression && this.expression.unbind) {
      this.expression.unbind(binding, scope);
    }
  };

  return BindingBehavior;
}(Expression);

var ValueConverter = exports.ValueConverter = function (_Expression3) {
  _inherits(ValueConverter, _Expression3);

  function ValueConverter(expression, name, args, allArgs) {
    

    var _this5 = _possibleConstructorReturn(this, _Expression3.call(this));

    _this5.expression = expression;
    _this5.name = name;
    _this5.args = args;
    _this5.allArgs = allArgs;
    return _this5;
  }

  ValueConverter.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    var converter = lookupFunctions.valueConverters(this.name);
    if (!converter) {
      throw new Error('No ValueConverter named "' + this.name + '" was found!');
    }

    if ('toView' in converter) {
      return converter.toView.apply(converter, evalList(scope, this.allArgs, lookupFunctions));
    }

    return this.allArgs[0].evaluate(scope, lookupFunctions);
  };

  ValueConverter.prototype.assign = function assign(scope, value, lookupFunctions) {
    var converter = lookupFunctions.valueConverters(this.name);
    if (!converter) {
      throw new Error('No ValueConverter named "' + this.name + '" was found!');
    }

    if ('fromView' in converter) {
      value = converter.fromView.apply(converter, [value].concat(evalList(scope, this.args, lookupFunctions)));
    }

    return this.allArgs[0].assign(scope, value, lookupFunctions);
  };

  ValueConverter.prototype.accept = function accept(visitor) {
    return visitor.visitValueConverter(this);
  };

  ValueConverter.prototype.connect = function connect(binding, scope) {
    var expressions = this.allArgs;
    var i = expressions.length;
    while (i--) {
      expressions[i].connect(binding, scope);
    }
  };

  return ValueConverter;
}(Expression);

var Assign = exports.Assign = function (_Expression4) {
  _inherits(Assign, _Expression4);

  function Assign(target, value) {
    

    var _this6 = _possibleConstructorReturn(this, _Expression4.call(this));

    _this6.target = target;
    _this6.value = value;
    return _this6;
  }

  Assign.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    return this.target.assign(scope, this.value.evaluate(scope, lookupFunctions));
  };

  Assign.prototype.accept = function accept(vistor) {
    vistor.visitAssign(this);
  };

  Assign.prototype.connect = function connect(binding, scope) {};

  return Assign;
}(Expression);

var Conditional = exports.Conditional = function (_Expression5) {
  _inherits(Conditional, _Expression5);

  function Conditional(condition, yes, no) {
    

    var _this7 = _possibleConstructorReturn(this, _Expression5.call(this));

    _this7.condition = condition;
    _this7.yes = yes;
    _this7.no = no;
    return _this7;
  }

  Conditional.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    return !!this.condition.evaluate(scope) ? this.yes.evaluate(scope) : this.no.evaluate(scope);
  };

  Conditional.prototype.accept = function accept(visitor) {
    return visitor.visitConditional(this);
  };

  Conditional.prototype.connect = function connect(binding, scope) {
    this.condition.connect(binding, scope);
    if (this.condition.evaluate(scope)) {
      this.yes.connect(binding, scope);
    } else {
      this.no.connect(binding, scope);
    }
  };

  return Conditional;
}(Expression);

var AccessThis = exports.AccessThis = function (_Expression6) {
  _inherits(AccessThis, _Expression6);

  function AccessThis(ancestor) {
    

    var _this8 = _possibleConstructorReturn(this, _Expression6.call(this));

    _this8.ancestor = ancestor;
    return _this8;
  }

  AccessThis.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    var oc = scope.overrideContext;
    var i = this.ancestor;
    while (i-- && oc) {
      oc = oc.parentOverrideContext;
    }
    return i < 1 && oc ? oc.bindingContext : undefined;
  };

  AccessThis.prototype.accept = function accept(visitor) {
    return visitor.visitAccessThis(this);
  };

  AccessThis.prototype.connect = function connect(binding, scope) {};

  return AccessThis;
}(Expression);

var AccessScope = exports.AccessScope = function (_Expression7) {
  _inherits(AccessScope, _Expression7);

  function AccessScope(name, ancestor) {
    

    var _this9 = _possibleConstructorReturn(this, _Expression7.call(this));

    _this9.name = name;
    _this9.ancestor = ancestor;
    _this9.isAssignable = true;
    return _this9;
  }

  AccessScope.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    var context = getContextFor(this.name, scope, this.ancestor);
    return context[this.name];
  };

  AccessScope.prototype.assign = function assign(scope, value) {
    var context = getContextFor(this.name, scope, this.ancestor);
    return context ? context[this.name] = value : undefined;
  };

  AccessScope.prototype.accept = function accept(visitor) {
    return visitor.visitAccessScope(this);
  };

  AccessScope.prototype.connect = function connect(binding, scope) {
    var context = getContextFor(this.name, scope, this.ancestor);
    binding.observeProperty(context, this.name);
  };

  return AccessScope;
}(Expression);

var AccessMember = exports.AccessMember = function (_Expression8) {
  _inherits(AccessMember, _Expression8);

  function AccessMember(object, name) {
    

    var _this10 = _possibleConstructorReturn(this, _Expression8.call(this));

    _this10.object = object;
    _this10.name = name;
    _this10.isAssignable = true;
    return _this10;
  }

  AccessMember.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    var instance = this.object.evaluate(scope, lookupFunctions);
    return instance === null || instance === undefined ? instance : instance[this.name];
  };

  AccessMember.prototype.assign = function assign(scope, value) {
    var instance = this.object.evaluate(scope);

    if (instance === null || instance === undefined) {
      instance = {};
      this.object.assign(scope, instance);
    }

    instance[this.name] = value;
    return value;
  };

  AccessMember.prototype.accept = function accept(visitor) {
    return visitor.visitAccessMember(this);
  };

  AccessMember.prototype.connect = function connect(binding, scope) {
    this.object.connect(binding, scope);
    var obj = this.object.evaluate(scope);
    if (obj) {
      binding.observeProperty(obj, this.name);
    }
  };

  return AccessMember;
}(Expression);

var AccessKeyed = exports.AccessKeyed = function (_Expression9) {
  _inherits(AccessKeyed, _Expression9);

  function AccessKeyed(object, key) {
    

    var _this11 = _possibleConstructorReturn(this, _Expression9.call(this));

    _this11.object = object;
    _this11.key = key;
    _this11.isAssignable = true;
    return _this11;
  }

  AccessKeyed.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    var instance = this.object.evaluate(scope, lookupFunctions);
    var lookup = this.key.evaluate(scope, lookupFunctions);
    return getKeyed(instance, lookup);
  };

  AccessKeyed.prototype.assign = function assign(scope, value) {
    var instance = this.object.evaluate(scope);
    var lookup = this.key.evaluate(scope);
    return setKeyed(instance, lookup, value);
  };

  AccessKeyed.prototype.accept = function accept(visitor) {
    return visitor.visitAccessKeyed(this);
  };

  AccessKeyed.prototype.connect = function connect(binding, scope) {
    this.object.connect(binding, scope);
    var obj = this.object.evaluate(scope);
    if (obj instanceof Object) {
      this.key.connect(binding, scope);
      var key = this.key.evaluate(scope);

      if (key !== null && key !== undefined && !(Array.isArray(obj) && typeof key === 'number')) {
        binding.observeProperty(obj, key);
      }
    }
  };

  return AccessKeyed;
}(Expression);

var CallScope = exports.CallScope = function (_Expression10) {
  _inherits(CallScope, _Expression10);

  function CallScope(name, args, ancestor) {
    

    var _this12 = _possibleConstructorReturn(this, _Expression10.call(this));

    _this12.name = name;
    _this12.args = args;
    _this12.ancestor = ancestor;
    return _this12;
  }

  CallScope.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
    var args = evalList(scope, this.args, lookupFunctions);
    var context = getContextFor(this.name, scope, this.ancestor);
    var func = getFunction(context, this.name, mustEvaluate);
    if (func) {
      return func.apply(context, args);
    }
    return undefined;
  };

  CallScope.prototype.accept = function accept(visitor) {
    return visitor.visitCallScope(this);
  };

  CallScope.prototype.connect = function connect(binding, scope) {
    var args = this.args;
    var i = args.length;
    while (i--) {
      args[i].connect(binding, scope);
    }
  };

  return CallScope;
}(Expression);

var CallMember = exports.CallMember = function (_Expression11) {
  _inherits(CallMember, _Expression11);

  function CallMember(object, name, args) {
    

    var _this13 = _possibleConstructorReturn(this, _Expression11.call(this));

    _this13.object = object;
    _this13.name = name;
    _this13.args = args;
    return _this13;
  }

  CallMember.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
    var instance = this.object.evaluate(scope, lookupFunctions);
    var args = evalList(scope, this.args, lookupFunctions);
    var func = getFunction(instance, this.name, mustEvaluate);
    if (func) {
      return func.apply(instance, args);
    }
    return undefined;
  };

  CallMember.prototype.accept = function accept(visitor) {
    return visitor.visitCallMember(this);
  };

  CallMember.prototype.connect = function connect(binding, scope) {
    this.object.connect(binding, scope);
    var obj = this.object.evaluate(scope);
    if (getFunction(obj, this.name, false)) {
      var args = this.args;
      var _i8 = args.length;
      while (_i8--) {
        args[_i8].connect(binding, scope);
      }
    }
  };

  return CallMember;
}(Expression);

var CallFunction = exports.CallFunction = function (_Expression12) {
  _inherits(CallFunction, _Expression12);

  function CallFunction(func, args) {
    

    var _this14 = _possibleConstructorReturn(this, _Expression12.call(this));

    _this14.func = func;
    _this14.args = args;
    return _this14;
  }

  CallFunction.prototype.evaluate = function evaluate(scope, lookupFunctions, mustEvaluate) {
    var func = this.func.evaluate(scope, lookupFunctions);
    if (typeof func === 'function') {
      return func.apply(null, evalList(scope, this.args, lookupFunctions));
    }
    if (!mustEvaluate && (func === null || func === undefined)) {
      return undefined;
    }
    throw new Error(this.func + ' is not a function');
  };

  CallFunction.prototype.accept = function accept(visitor) {
    return visitor.visitCallFunction(this);
  };

  CallFunction.prototype.connect = function connect(binding, scope) {
    this.func.connect(binding, scope);
    var func = this.func.evaluate(scope);
    if (typeof func === 'function') {
      var args = this.args;
      var _i9 = args.length;
      while (_i9--) {
        args[_i9].connect(binding, scope);
      }
    }
  };

  return CallFunction;
}(Expression);

var Binary = exports.Binary = function (_Expression13) {
  _inherits(Binary, _Expression13);

  function Binary(operation, left, right) {
    

    var _this15 = _possibleConstructorReturn(this, _Expression13.call(this));

    _this15.operation = operation;
    _this15.left = left;
    _this15.right = right;
    return _this15;
  }

  Binary.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    var left = this.left.evaluate(scope);

    switch (this.operation) {
      case '&&':
        return left && this.right.evaluate(scope);
      case '||':
        return left || this.right.evaluate(scope);
    }

    var right = this.right.evaluate(scope);

    switch (this.operation) {
      case '==':
        return left == right;
      case '===':
        return left === right;
      case '!=':
        return left != right;
      case '!==':
        return left !== right;
    }

    if (left === null || right === null || left === undefined || right === undefined) {
      switch (this.operation) {
        case '+':
          if (left !== null && left !== undefined) return left;
          if (right !== null && right !== undefined) return right;
          return 0;
        case '-':
          if (left !== null && left !== undefined) return left;
          if (right !== null && right !== undefined) return 0 - right;
          return 0;
      }

      return null;
    }

    switch (this.operation) {
      case '+':
        return autoConvertAdd(left, right);
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return left / right;
      case '%':
        return left % right;
      case '<':
        return left < right;
      case '>':
        return left > right;
      case '<=':
        return left <= right;
      case '>=':
        return left >= right;
      case '^':
        return left ^ right;
    }

    throw new Error('Internal error [' + this.operation + '] not handled');
  };

  Binary.prototype.accept = function accept(visitor) {
    return visitor.visitBinary(this);
  };

  Binary.prototype.connect = function connect(binding, scope) {
    this.left.connect(binding, scope);
    var left = this.left.evaluate(scope);
    if (this.operation === '&&' && !left || this.operation === '||' && left) {
      return;
    }
    this.right.connect(binding, scope);
  };

  return Binary;
}(Expression);

var PrefixNot = exports.PrefixNot = function (_Expression14) {
  _inherits(PrefixNot, _Expression14);

  function PrefixNot(operation, expression) {
    

    var _this16 = _possibleConstructorReturn(this, _Expression14.call(this));

    _this16.operation = operation;
    _this16.expression = expression;
    return _this16;
  }

  PrefixNot.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    return !this.expression.evaluate(scope);
  };

  PrefixNot.prototype.accept = function accept(visitor) {
    return visitor.visitPrefix(this);
  };

  PrefixNot.prototype.connect = function connect(binding, scope) {
    this.expression.connect(binding, scope);
  };

  return PrefixNot;
}(Expression);

var LiteralPrimitive = exports.LiteralPrimitive = function (_Expression15) {
  _inherits(LiteralPrimitive, _Expression15);

  function LiteralPrimitive(value) {
    

    var _this17 = _possibleConstructorReturn(this, _Expression15.call(this));

    _this17.value = value;
    return _this17;
  }

  LiteralPrimitive.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    return this.value;
  };

  LiteralPrimitive.prototype.accept = function accept(visitor) {
    return visitor.visitLiteralPrimitive(this);
  };

  LiteralPrimitive.prototype.connect = function connect(binding, scope) {};

  return LiteralPrimitive;
}(Expression);

var LiteralString = exports.LiteralString = function (_Expression16) {
  _inherits(LiteralString, _Expression16);

  function LiteralString(value) {
    

    var _this18 = _possibleConstructorReturn(this, _Expression16.call(this));

    _this18.value = value;
    return _this18;
  }

  LiteralString.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    return this.value;
  };

  LiteralString.prototype.accept = function accept(visitor) {
    return visitor.visitLiteralString(this);
  };

  LiteralString.prototype.connect = function connect(binding, scope) {};

  return LiteralString;
}(Expression);

var LiteralArray = exports.LiteralArray = function (_Expression17) {
  _inherits(LiteralArray, _Expression17);

  function LiteralArray(elements) {
    

    var _this19 = _possibleConstructorReturn(this, _Expression17.call(this));

    _this19.elements = elements;
    return _this19;
  }

  LiteralArray.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    var elements = this.elements;
    var result = [];

    for (var _i10 = 0, length = elements.length; _i10 < length; ++_i10) {
      result[_i10] = elements[_i10].evaluate(scope, lookupFunctions);
    }

    return result;
  };

  LiteralArray.prototype.accept = function accept(visitor) {
    return visitor.visitLiteralArray(this);
  };

  LiteralArray.prototype.connect = function connect(binding, scope) {
    var length = this.elements.length;
    for (var _i11 = 0; _i11 < length; _i11++) {
      this.elements[_i11].connect(binding, scope);
    }
  };

  return LiteralArray;
}(Expression);

var LiteralObject = exports.LiteralObject = function (_Expression18) {
  _inherits(LiteralObject, _Expression18);

  function LiteralObject(keys, values) {
    

    var _this20 = _possibleConstructorReturn(this, _Expression18.call(this));

    _this20.keys = keys;
    _this20.values = values;
    return _this20;
  }

  LiteralObject.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    var instance = {};
    var keys = this.keys;
    var values = this.values;

    for (var _i12 = 0, length = keys.length; _i12 < length; ++_i12) {
      instance[keys[_i12]] = values[_i12].evaluate(scope, lookupFunctions);
    }

    return instance;
  };

  LiteralObject.prototype.accept = function accept(visitor) {
    return visitor.visitLiteralObject(this);
  };

  LiteralObject.prototype.connect = function connect(binding, scope) {
    var length = this.keys.length;
    for (var _i13 = 0; _i13 < length; _i13++) {
      this.values[_i13].connect(binding, scope);
    }
  };

  return LiteralObject;
}(Expression);

function evalList(scope, list, lookupFunctions) {
  var length = list.length;
  var result = [];
  for (var _i14 = 0; _i14 < length; _i14++) {
    result[_i14] = list[_i14].evaluate(scope, lookupFunctions);
  }
  return result;
}

function autoConvertAdd(a, b) {
  if (a !== null && b !== null) {
    if (typeof a === 'string' && typeof b !== 'string') {
      return a + b.toString();
    }

    if (typeof a !== 'string' && typeof b === 'string') {
      return a.toString() + b;
    }

    return a + b;
  }

  if (a !== null) {
    return a;
  }

  if (b !== null) {
    return b;
  }

  return 0;
}

function getFunction(obj, name, mustExist) {
  var func = obj === null || obj === undefined ? null : obj[name];
  if (typeof func === 'function') {
    return func;
  }
  if (!mustExist && (func === null || func === undefined)) {
    return null;
  }
  throw new Error(name + ' is not a function');
}

function getKeyed(obj, key) {
  if (Array.isArray(obj)) {
    return obj[parseInt(key, 10)];
  } else if (obj) {
    return obj[key];
  } else if (obj === null || obj === undefined) {
    return undefined;
  }

  return obj[key];
}

function setKeyed(obj, key, value) {
  if (Array.isArray(obj)) {
    var index = parseInt(key, 10);

    if (obj.length <= index) {
      obj.length = index + 1;
    }

    obj[index] = value;
  } else {
    obj[key] = value;
  }

  return value;
}

var Unparser = exports.Unparser = function () {
  function Unparser(buffer) {
    

    this.buffer = buffer;
  }

  Unparser.unparse = function unparse(expression) {
    var buffer = [];
    var visitor = new Unparser(buffer);

    expression.accept(visitor);

    return buffer.join('');
  };

  Unparser.prototype.write = function write(text) {
    this.buffer.push(text);
  };

  Unparser.prototype.writeArgs = function writeArgs(args) {
    this.write('(');

    for (var _i15 = 0, length = args.length; _i15 < length; ++_i15) {
      if (_i15 !== 0) {
        this.write(',');
      }

      args[_i15].accept(this);
    }

    this.write(')');
  };

  Unparser.prototype.visitChain = function visitChain(chain) {
    var expressions = chain.expressions;

    for (var _i16 = 0, length = expression.length; _i16 < length; ++_i16) {
      if (_i16 !== 0) {
        this.write(';');
      }

      expressions[_i16].accept(this);
    }
  };

  Unparser.prototype.visitBindingBehavior = function visitBindingBehavior(behavior) {
    var args = behavior.args;

    behavior.expression.accept(this);
    this.write('&' + behavior.name);

    for (var _i17 = 0, length = args.length; _i17 < length; ++_i17) {
      this.write(':');
      args[_i17].accept(this);
    }
  };

  Unparser.prototype.visitValueConverter = function visitValueConverter(converter) {
    var args = converter.args;

    converter.expression.accept(this);
    this.write('|' + converter.name);

    for (var _i18 = 0, length = args.length; _i18 < length; ++_i18) {
      this.write(':');
      args[_i18].accept(this);
    }
  };

  Unparser.prototype.visitAssign = function visitAssign(assign) {
    assign.target.accept(this);
    this.write('=');
    assign.value.accept(this);
  };

  Unparser.prototype.visitConditional = function visitConditional(conditional) {
    conditional.condition.accept(this);
    this.write('?');
    conditional.yes.accept(this);
    this.write(':');
    conditional.no.accept(this);
  };

  Unparser.prototype.visitAccessThis = function visitAccessThis(access) {
    if (access.ancestor === 0) {
      this.write('$this');
      return;
    }
    this.write('$parent');
    var i = access.ancestor - 1;
    while (i--) {
      this.write('.$parent');
    }
  };

  Unparser.prototype.visitAccessScope = function visitAccessScope(access) {
    var i = access.ancestor;
    while (i--) {
      this.write('$parent.');
    }
    this.write(access.name);
  };

  Unparser.prototype.visitAccessMember = function visitAccessMember(access) {
    access.object.accept(this);
    this.write('.' + access.name);
  };

  Unparser.prototype.visitAccessKeyed = function visitAccessKeyed(access) {
    access.object.accept(this);
    this.write('[');
    access.key.accept(this);
    this.write(']');
  };

  Unparser.prototype.visitCallScope = function visitCallScope(call) {
    var i = call.ancestor;
    while (i--) {
      this.write('$parent.');
    }
    this.write(call.name);
    this.writeArgs(call.args);
  };

  Unparser.prototype.visitCallFunction = function visitCallFunction(call) {
    call.func.accept(this);
    this.writeArgs(call.args);
  };

  Unparser.prototype.visitCallMember = function visitCallMember(call) {
    call.object.accept(this);
    this.write('.' + call.name);
    this.writeArgs(call.args);
  };

  Unparser.prototype.visitPrefix = function visitPrefix(prefix) {
    this.write('(' + prefix.operation);
    prefix.expression.accept(this);
    this.write(')');
  };

  Unparser.prototype.visitBinary = function visitBinary(binary) {
    binary.left.accept(this);
    this.write(binary.operation);
    binary.right.accept(this);
  };

  Unparser.prototype.visitLiteralPrimitive = function visitLiteralPrimitive(literal) {
    this.write('' + literal.value);
  };

  Unparser.prototype.visitLiteralArray = function visitLiteralArray(literal) {
    var elements = literal.elements;

    this.write('[');

    for (var _i19 = 0, length = elements.length; _i19 < length; ++_i19) {
      if (_i19 !== 0) {
        this.write(',');
      }

      elements[_i19].accept(this);
    }

    this.write(']');
  };

  Unparser.prototype.visitLiteralObject = function visitLiteralObject(literal) {
    var keys = literal.keys;
    var values = literal.values;

    this.write('{');

    for (var _i20 = 0, length = keys.length; _i20 < length; ++_i20) {
      if (_i20 !== 0) {
        this.write(',');
      }

      this.write('\'' + keys[_i20] + '\':');
      values[_i20].accept(this);
    }

    this.write('}');
  };

  Unparser.prototype.visitLiteralString = function visitLiteralString(literal) {
    var escaped = literal.value.replace(/'/g, "\'");
    this.write('\'' + escaped + '\'');
  };

  return Unparser;
}();

var ExpressionCloner = exports.ExpressionCloner = function () {
  function ExpressionCloner() {
    
  }

  ExpressionCloner.prototype.cloneExpressionArray = function cloneExpressionArray(array) {
    var clonedArray = [];
    var i = array.length;
    while (i--) {
      clonedArray[i] = array[i].accept(this);
    }
    return clonedArray;
  };

  ExpressionCloner.prototype.visitChain = function visitChain(chain) {
    return new Chain(this.cloneExpressionArray(chain.expressions));
  };

  ExpressionCloner.prototype.visitBindingBehavior = function visitBindingBehavior(behavior) {
    return new BindingBehavior(behavior.expression.accept(this), behavior.name, this.cloneExpressionArray(behavior.args));
  };

  ExpressionCloner.prototype.visitValueConverter = function visitValueConverter(converter) {
    return new ValueConverter(converter.expression.accept(this), converter.name, this.cloneExpressionArray(converter.args));
  };

  ExpressionCloner.prototype.visitAssign = function visitAssign(assign) {
    return new Assign(assign.target.accept(this), assign.value.accept(this));
  };

  ExpressionCloner.prototype.visitConditional = function visitConditional(conditional) {
    return new Conditional(conditional.condition.accept(this), conditional.yes.accept(this), conditional.no.accept(this));
  };

  ExpressionCloner.prototype.visitAccessThis = function visitAccessThis(access) {
    return new AccessThis(access.ancestor);
  };

  ExpressionCloner.prototype.visitAccessScope = function visitAccessScope(access) {
    return new AccessScope(access.name, access.ancestor);
  };

  ExpressionCloner.prototype.visitAccessMember = function visitAccessMember(access) {
    return new AccessMember(access.object.accept(this), access.name);
  };

  ExpressionCloner.prototype.visitAccessKeyed = function visitAccessKeyed(access) {
    return new AccessKeyed(access.object.accept(this), access.key.accept(this));
  };

  ExpressionCloner.prototype.visitCallScope = function visitCallScope(call) {
    return new CallScope(call.name, this.cloneExpressionArray(call.args), call.ancestor);
  };

  ExpressionCloner.prototype.visitCallFunction = function visitCallFunction(call) {
    return new CallFunction(call.func.accept(this), this.cloneExpressionArray(call.args));
  };

  ExpressionCloner.prototype.visitCallMember = function visitCallMember(call) {
    return new CallMember(call.object.accept(this), call.name, this.cloneExpressionArray(call.args));
  };

  ExpressionCloner.prototype.visitPrefix = function visitPrefix(prefix) {
    return new PrefixNot(prefix.operation, prefix.expression.accept(this));
  };

  ExpressionCloner.prototype.visitBinary = function visitBinary(binary) {
    return new Binary(binary.operation, binary.left.accept(this), binary.right.accept(this));
  };

  ExpressionCloner.prototype.visitLiteralPrimitive = function visitLiteralPrimitive(literal) {
    return new LiteralPrimitive(literal);
  };

  ExpressionCloner.prototype.visitLiteralArray = function visitLiteralArray(literal) {
    return new LiteralArray(this.cloneExpressionArray(literal.elements));
  };

  ExpressionCloner.prototype.visitLiteralObject = function visitLiteralObject(literal) {
    return new LiteralObject(literal.keys, this.cloneExpressionArray(literal.values));
  };

  ExpressionCloner.prototype.visitLiteralString = function visitLiteralString(literal) {
    return new LiteralString(literal.value);
  };

  return ExpressionCloner;
}();

function cloneExpression(expression) {
  var visitor = new ExpressionCloner();
  return expression.accept(visitor);
}

var bindingMode = exports.bindingMode = {
  oneTime: 0,
  oneWay: 1,
  twoWay: 2
};

var Token = exports.Token = function () {
  function Token(index, text) {
    

    this.index = index;
    this.text = text;
  }

  Token.prototype.withOp = function withOp(op) {
    this.opKey = op;
    return this;
  };

  Token.prototype.withGetterSetter = function withGetterSetter(key) {
    this.key = key;
    return this;
  };

  Token.prototype.withValue = function withValue(value) {
    this.value = value;
    return this;
  };

  Token.prototype.toString = function toString() {
    return 'Token(' + this.text + ')';
  };

  return Token;
}();

var Lexer = exports.Lexer = function () {
  function Lexer() {
    
  }

  Lexer.prototype.lex = function lex(text) {
    var scanner = new Scanner(text);
    var tokens = [];
    var token = scanner.scanToken();

    while (token) {
      tokens.push(token);
      token = scanner.scanToken();
    }

    return tokens;
  };

  return Lexer;
}();

var Scanner = exports.Scanner = function () {
  function Scanner(input) {
    

    this.input = input;
    this.length = input.length;
    this.peek = 0;
    this.index = -1;

    this.advance();
  }

  Scanner.prototype.scanToken = function scanToken() {
    while (this.peek <= $SPACE) {
      if (++this.index >= this.length) {
        this.peek = $EOF;
        return null;
      }

      this.peek = this.input.charCodeAt(this.index);
    }

    if (isIdentifierStart(this.peek)) {
      return this.scanIdentifier();
    }

    if (isDigit(this.peek)) {
      return this.scanNumber(this.index);
    }

    var start = this.index;

    switch (this.peek) {
      case $PERIOD:
        this.advance();
        return isDigit(this.peek) ? this.scanNumber(start) : new Token(start, '.');
      case $LPAREN:
      case $RPAREN:
      case $LBRACE:
      case $RBRACE:
      case $LBRACKET:
      case $RBRACKET:
      case $COMMA:
      case $COLON:
      case $SEMICOLON:
        return this.scanCharacter(start, String.fromCharCode(this.peek));
      case $SQ:
      case $DQ:
        return this.scanString();
      case $PLUS:
      case $MINUS:
      case $STAR:
      case $SLASH:
      case $PERCENT:
      case $CARET:
      case $QUESTION:
        return this.scanOperator(start, String.fromCharCode(this.peek));
      case $LT:
      case $GT:
      case $BANG:
      case $EQ:
        return this.scanComplexOperator(start, $EQ, String.fromCharCode(this.peek), '=');
      case $AMPERSAND:
        return this.scanComplexOperator(start, $AMPERSAND, '&', '&');
      case $BAR:
        return this.scanComplexOperator(start, $BAR, '|', '|');
      case $NBSP:
        while (isWhitespace(this.peek)) {
          this.advance();
        }

        return this.scanToken();
    }

    var character = String.fromCharCode(this.peek);
    this.error('Unexpected character [' + character + ']');
    return null;
  };

  Scanner.prototype.scanCharacter = function scanCharacter(start, text) {
    assert(this.peek === text.charCodeAt(0));
    this.advance();
    return new Token(start, text);
  };

  Scanner.prototype.scanOperator = function scanOperator(start, text) {
    assert(this.peek === text.charCodeAt(0));
    assert(OPERATORS.indexOf(text) !== -1);
    this.advance();
    return new Token(start, text).withOp(text);
  };

  Scanner.prototype.scanComplexOperator = function scanComplexOperator(start, code, one, two) {
    assert(this.peek === one.charCodeAt(0));
    this.advance();

    var text = one;

    if (this.peek === code) {
      this.advance();
      text += two;
    }

    if (this.peek === code) {
      this.advance();
      text += two;
    }

    assert(OPERATORS.indexOf(text) !== -1);

    return new Token(start, text).withOp(text);
  };

  Scanner.prototype.scanIdentifier = function scanIdentifier() {
    assert(isIdentifierStart(this.peek));
    var start = this.index;

    this.advance();

    while (isIdentifierPart(this.peek)) {
      this.advance();
    }

    var text = this.input.substring(start, this.index);
    var result = new Token(start, text);

    if (OPERATORS.indexOf(text) !== -1) {
      result.withOp(text);
    } else {
      result.withGetterSetter(text);
    }

    return result;
  };

  Scanner.prototype.scanNumber = function scanNumber(start) {
    assert(isDigit(this.peek));
    var simple = this.index === start;
    this.advance();

    while (true) {
      if (!isDigit(this.peek)) {
        if (this.peek === $PERIOD) {
          simple = false;
        } else if (isExponentStart(this.peek)) {
          this.advance();

          if (isExponentSign(this.peek)) {
            this.advance();
          }

          if (!isDigit(this.peek)) {
            this.error('Invalid exponent', -1);
          }

          simple = false;
        } else {
          break;
        }
      }

      this.advance();
    }

    var text = this.input.substring(start, this.index);
    var value = simple ? parseInt(text, 10) : parseFloat(text);
    return new Token(start, text).withValue(value);
  };

  Scanner.prototype.scanString = function scanString() {
    assert(this.peek === $SQ || this.peek === $DQ);

    var start = this.index;
    var quote = this.peek;

    this.advance();

    var buffer = void 0;
    var marker = this.index;

    while (this.peek !== quote) {
      if (this.peek === $BACKSLASH) {
        if (!buffer) {
          buffer = [];
        }

        buffer.push(this.input.substring(marker, this.index));
        this.advance();

        var _unescaped = void 0;

        if (this.peek === $u) {
          var hex = this.input.substring(this.index + 1, this.index + 5);

          if (!/[A-Z0-9]{4}/.test(hex)) {
            this.error('Invalid unicode escape [\\u' + hex + ']');
          }

          _unescaped = parseInt(hex, 16);

          for (var _i21 = 0; _i21 < 5; ++_i21) {
            this.advance();
          }
        } else {
          _unescaped = unescape(this.peek);
          this.advance();
        }

        buffer.push(String.fromCharCode(_unescaped));
        marker = this.index;
      } else if (this.peek === $EOF) {
        this.error('Unterminated quote');
      } else {
        this.advance();
      }
    }

    var last = this.input.substring(marker, this.index);
    this.advance();
    var text = this.input.substring(start, this.index);

    var unescaped = last;

    if (buffer !== null && buffer !== undefined) {
      buffer.push(last);
      unescaped = buffer.join('');
    }

    return new Token(start, text).withValue(unescaped);
  };

  Scanner.prototype.advance = function advance() {
    if (++this.index >= this.length) {
      this.peek = $EOF;
    } else {
      this.peek = this.input.charCodeAt(this.index);
    }
  };

  Scanner.prototype.error = function error(message) {
    var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    var position = this.index + offset;
    throw new Error('Lexer Error: ' + message + ' at column ' + position + ' in expression [' + this.input + ']');
  };

  return Scanner;
}();

var OPERATORS = ['undefined', 'null', 'true', 'false', '+', '-', '*', '/', '%', '^', '=', '==', '===', '!=', '!==', '<', '>', '<=', '>=', '&&', '||', '&', '|', '!', '?'];

var $EOF = 0;
var $TAB = 9;
var $LF = 10;
var $VTAB = 11;
var $FF = 12;
var $CR = 13;
var $SPACE = 32;
var $BANG = 33;
var $DQ = 34;
var $$ = 36;
var $PERCENT = 37;
var $AMPERSAND = 38;
var $SQ = 39;
var $LPAREN = 40;
var $RPAREN = 41;
var $STAR = 42;
var $PLUS = 43;
var $COMMA = 44;
var $MINUS = 45;
var $PERIOD = 46;
var $SLASH = 47;
var $COLON = 58;
var $SEMICOLON = 59;
var $LT = 60;
var $EQ = 61;
var $GT = 62;
var $QUESTION = 63;

var $0 = 48;
var $9 = 57;

var $A = 65;
var $E = 69;
var $Z = 90;

var $LBRACKET = 91;
var $BACKSLASH = 92;
var $RBRACKET = 93;
var $CARET = 94;
var $_ = 95;

var $a = 97;
var $e = 101;
var $f = 102;
var $n = 110;
var $r = 114;
var $t = 116;
var $u = 117;
var $v = 118;
var $z = 122;

var $LBRACE = 123;
var $BAR = 124;
var $RBRACE = 125;
var $NBSP = 160;

function isWhitespace(code) {
  return code >= $TAB && code <= $SPACE || code === $NBSP;
}

function isIdentifierStart(code) {
  return $a <= code && code <= $z || $A <= code && code <= $Z || code === $_ || code === $$;
}

function isIdentifierPart(code) {
  return $a <= code && code <= $z || $A <= code && code <= $Z || $0 <= code && code <= $9 || code === $_ || code === $$;
}

function isDigit(code) {
  return $0 <= code && code <= $9;
}

function isExponentStart(code) {
  return code === $e || code === $E;
}

function isExponentSign(code) {
  return code === $MINUS || code === $PLUS;
}

function unescape(code) {
  switch (code) {
    case $n:
      return $LF;
    case $f:
      return $FF;
    case $r:
      return $CR;
    case $t:
      return $TAB;
    case $v:
      return $VTAB;
    default:
      return code;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw message || 'Assertion failed';
  }
}

var EOF = new Token(-1, null);

var Parser = exports.Parser = function () {
  function Parser() {
    

    this.cache = {};
    this.lexer = new Lexer();
  }

  Parser.prototype.parse = function parse(input) {
    input = input || '';

    return this.cache[input] || (this.cache[input] = new ParserImplementation(this.lexer, input).parseChain());
  };

  return Parser;
}();

var ParserImplementation = exports.ParserImplementation = function () {
  function ParserImplementation(lexer, input) {
    

    this.index = 0;
    this.input = input;
    this.tokens = lexer.lex(input);
  }

  ParserImplementation.prototype.parseChain = function parseChain() {
    var isChain = false;
    var expressions = [];

    while (this.optional(';')) {
      isChain = true;
    }

    while (this.index < this.tokens.length) {
      if (this.peek.text === ')' || this.peek.text === '}' || this.peek.text === ']') {
        this.error('Unconsumed token ' + this.peek.text);
      }

      var expr = this.parseBindingBehavior();
      expressions.push(expr);

      while (this.optional(';')) {
        isChain = true;
      }

      if (isChain) {
        this.error('Multiple expressions are not allowed.');
      }
    }

    return expressions.length === 1 ? expressions[0] : new Chain(expressions);
  };

  ParserImplementation.prototype.parseBindingBehavior = function parseBindingBehavior() {
    var result = this.parseValueConverter();

    while (this.optional('&')) {
      var name = this.peek.text;
      var args = [];

      this.advance();

      while (this.optional(':')) {
        args.push(this.parseExpression());
      }

      result = new BindingBehavior(result, name, args);
    }

    return result;
  };

  ParserImplementation.prototype.parseValueConverter = function parseValueConverter() {
    var result = this.parseExpression();

    while (this.optional('|')) {
      var name = this.peek.text;
      var args = [];

      this.advance();

      while (this.optional(':')) {
        args.push(this.parseExpression());
      }

      result = new ValueConverter(result, name, args, [result].concat(args));
    }

    return result;
  };

  ParserImplementation.prototype.parseExpression = function parseExpression() {
    var start = this.peek.index;
    var result = this.parseConditional();

    while (this.peek.text === '=') {
      if (!result.isAssignable) {
        var end = this.index < this.tokens.length ? this.peek.index : this.input.length;
        var _expression = this.input.substring(start, end);

        this.error('Expression ' + _expression + ' is not assignable');
      }

      this.expect('=');
      result = new Assign(result, this.parseConditional());
    }

    return result;
  };

  ParserImplementation.prototype.parseConditional = function parseConditional() {
    var start = this.peek.index;
    var result = this.parseLogicalOr();

    if (this.optional('?')) {
      var yes = this.parseExpression();

      if (!this.optional(':')) {
        var end = this.index < this.tokens.length ? this.peek.index : this.input.length;
        var _expression2 = this.input.substring(start, end);

        this.error('Conditional expression ' + _expression2 + ' requires all 3 expressions');
      }

      var no = this.parseExpression();
      result = new Conditional(result, yes, no);
    }

    return result;
  };

  ParserImplementation.prototype.parseLogicalOr = function parseLogicalOr() {
    var result = this.parseLogicalAnd();

    while (this.optional('||')) {
      result = new Binary('||', result, this.parseLogicalAnd());
    }

    return result;
  };

  ParserImplementation.prototype.parseLogicalAnd = function parseLogicalAnd() {
    var result = this.parseEquality();

    while (this.optional('&&')) {
      result = new Binary('&&', result, this.parseEquality());
    }

    return result;
  };

  ParserImplementation.prototype.parseEquality = function parseEquality() {
    var result = this.parseRelational();

    while (true) {
      if (this.optional('==')) {
        result = new Binary('==', result, this.parseRelational());
      } else if (this.optional('!=')) {
        result = new Binary('!=', result, this.parseRelational());
      } else if (this.optional('===')) {
        result = new Binary('===', result, this.parseRelational());
      } else if (this.optional('!==')) {
        result = new Binary('!==', result, this.parseRelational());
      } else {
        return result;
      }
    }
  };

  ParserImplementation.prototype.parseRelational = function parseRelational() {
    var result = this.parseAdditive();

    while (true) {
      if (this.optional('<')) {
        result = new Binary('<', result, this.parseAdditive());
      } else if (this.optional('>')) {
        result = new Binary('>', result, this.parseAdditive());
      } else if (this.optional('<=')) {
        result = new Binary('<=', result, this.parseAdditive());
      } else if (this.optional('>=')) {
        result = new Binary('>=', result, this.parseAdditive());
      } else {
        return result;
      }
    }
  };

  ParserImplementation.prototype.parseAdditive = function parseAdditive() {
    var result = this.parseMultiplicative();

    while (true) {
      if (this.optional('+')) {
        result = new Binary('+', result, this.parseMultiplicative());
      } else if (this.optional('-')) {
        result = new Binary('-', result, this.parseMultiplicative());
      } else {
        return result;
      }
    }
  };

  ParserImplementation.prototype.parseMultiplicative = function parseMultiplicative() {
    var result = this.parsePrefix();

    while (true) {
      if (this.optional('*')) {
        result = new Binary('*', result, this.parsePrefix());
      } else if (this.optional('%')) {
        result = new Binary('%', result, this.parsePrefix());
      } else if (this.optional('/')) {
        result = new Binary('/', result, this.parsePrefix());
      } else {
        return result;
      }
    }
  };

  ParserImplementation.prototype.parsePrefix = function parsePrefix() {
    if (this.optional('+')) {
      return this.parsePrefix();
    } else if (this.optional('-')) {
      return new Binary('-', new LiteralPrimitive(0), this.parsePrefix());
    } else if (this.optional('!')) {
      return new PrefixNot('!', this.parsePrefix());
    }

    return this.parseAccessOrCallMember();
  };

  ParserImplementation.prototype.parseAccessOrCallMember = function parseAccessOrCallMember() {
    var result = this.parsePrimary();

    while (true) {
      if (this.optional('.')) {
        var name = this.peek.text;

        this.advance();

        if (this.optional('(')) {
          var args = this.parseExpressionList(')');
          this.expect(')');
          if (result instanceof AccessThis) {
            result = new CallScope(name, args, result.ancestor);
          } else {
            result = new CallMember(result, name, args);
          }
        } else {
          if (result instanceof AccessThis) {
            result = new AccessScope(name, result.ancestor);
          } else {
            result = new AccessMember(result, name);
          }
        }
      } else if (this.optional('[')) {
        var key = this.parseExpression();
        this.expect(']');
        result = new AccessKeyed(result, key);
      } else if (this.optional('(')) {
        var _args = this.parseExpressionList(')');
        this.expect(')');
        result = new CallFunction(result, _args);
      } else {
        return result;
      }
    }
  };

  ParserImplementation.prototype.parsePrimary = function parsePrimary() {
    if (this.optional('(')) {
      var result = this.parseExpression();
      this.expect(')');
      return result;
    } else if (this.optional('null')) {
      return new LiteralPrimitive(null);
    } else if (this.optional('undefined')) {
      return new LiteralPrimitive(undefined);
    } else if (this.optional('true')) {
      return new LiteralPrimitive(true);
    } else if (this.optional('false')) {
      return new LiteralPrimitive(false);
    } else if (this.optional('[')) {
      var elements = this.parseExpressionList(']');
      this.expect(']');
      return new LiteralArray(elements);
    } else if (this.peek.text === '{') {
      return this.parseObject();
    } else if (this.peek.key !== null && this.peek.key !== undefined) {
      return this.parseAccessOrCallScope();
    } else if (this.peek.value !== null && this.peek.value !== undefined) {
      var value = this.peek.value;
      this.advance();
      return value instanceof String || typeof value === 'string' ? new LiteralString(value) : new LiteralPrimitive(value);
    } else if (this.index >= this.tokens.length) {
      throw new Error('Unexpected end of expression: ' + this.input);
    } else {
      this.error('Unexpected token ' + this.peek.text);
    }
  };

  ParserImplementation.prototype.parseAccessOrCallScope = function parseAccessOrCallScope() {
    var name = this.peek.key;

    this.advance();

    if (name === '$this') {
      return new AccessThis(0);
    }

    var ancestor = 0;
    while (name === '$parent') {
      ancestor++;
      if (this.optional('.')) {
        name = this.peek.key;
        this.advance();
      } else if (this.peek === EOF || this.peek.text === '(' || this.peek.text === ')' || this.peek.text === '[' || this.peek.text === '}' || this.peek.text === ',') {
        return new AccessThis(ancestor);
      } else {
        this.error('Unexpected token ' + this.peek.text);
      }
    }

    if (this.optional('(')) {
      var args = this.parseExpressionList(')');
      this.expect(')');
      return new CallScope(name, args, ancestor);
    }

    return new AccessScope(name, ancestor);
  };

  ParserImplementation.prototype.parseObject = function parseObject() {
    var keys = [];
    var values = [];

    this.expect('{');

    if (this.peek.text !== '}') {
      do {
        var peek = this.peek;
        var value = peek.value;
        keys.push(typeof value === 'string' ? value : peek.text);

        this.advance();
        if (peek.key && (this.peek.text === ',' || this.peek.text === '}')) {
          --this.index;
          values.push(this.parseAccessOrCallScope());
        } else {
          this.expect(':');
          values.push(this.parseExpression());
        }
      } while (this.optional(','));
    }

    this.expect('}');

    return new LiteralObject(keys, values);
  };

  ParserImplementation.prototype.parseExpressionList = function parseExpressionList(terminator) {
    var result = [];

    if (this.peek.text !== terminator) {
      do {
        result.push(this.parseExpression());
      } while (this.optional(','));
    }

    return result;
  };

  ParserImplementation.prototype.optional = function optional(text) {
    if (this.peek.text === text) {
      this.advance();
      return true;
    }

    return false;
  };

  ParserImplementation.prototype.expect = function expect(text) {
    if (this.peek.text === text) {
      this.advance();
    } else {
      this.error('Missing expected ' + text);
    }
  };

  ParserImplementation.prototype.advance = function advance() {
    this.index++;
  };

  ParserImplementation.prototype.error = function error(message) {
    var location = this.index < this.tokens.length ? 'at column ' + (this.tokens[this.index].index + 1) + ' in' : 'at the end of the expression';

    throw new Error('Parser Error: ' + message + ' ' + location + ' [' + this.input + ']');
  };

  _createClass(ParserImplementation, [{
    key: 'peek',
    get: function get() {
      return this.index < this.tokens.length ? this.tokens[this.index] : EOF;
    }
  }]);

  return ParserImplementation;
}();

var mapProto = Map.prototype;

function _getMapObserver(taskQueue, map) {
  return ModifyMapObserver.for(taskQueue, map);
}

exports.getMapObserver = _getMapObserver;

var ModifyMapObserver = function (_ModifyCollectionObse2) {
  _inherits(ModifyMapObserver, _ModifyCollectionObse2);

  function ModifyMapObserver(taskQueue, map) {
    

    return _possibleConstructorReturn(this, _ModifyCollectionObse2.call(this, taskQueue, map));
  }

  ModifyMapObserver.for = function _for(taskQueue, map) {
    if (!('__map_observer__' in map)) {
      Reflect.defineProperty(map, '__map_observer__', {
        value: ModifyMapObserver.create(taskQueue, map),
        enumerable: false, configurable: false
      });
    }
    return map.__map_observer__;
  };

  ModifyMapObserver.create = function create(taskQueue, map) {
    var observer = new ModifyMapObserver(taskQueue, map);

    var proto = mapProto;
    if (proto.set !== map.set || proto.delete !== map.delete || proto.clear !== map.clear) {
      proto = {
        set: map.set,
        delete: map.delete,
        clear: map.clear
      };
    }

    map.set = function () {
      var hasValue = map.has(arguments[0]);
      var type = hasValue ? 'update' : 'add';
      var oldValue = map.get(arguments[0]);
      var methodCallResult = proto.set.apply(map, arguments);
      if (!hasValue || oldValue !== map.get(arguments[0])) {
        observer.addChangeRecord({
          type: type,
          object: map,
          key: arguments[0],
          oldValue: oldValue
        });
      }
      return methodCallResult;
    };

    map.delete = function () {
      var hasValue = map.has(arguments[0]);
      var oldValue = map.get(arguments[0]);
      var methodCallResult = proto.delete.apply(map, arguments);
      if (hasValue) {
        observer.addChangeRecord({
          type: 'delete',
          object: map,
          key: arguments[0],
          oldValue: oldValue
        });
      }
      return methodCallResult;
    };

    map.clear = function () {
      var methodCallResult = proto.clear.apply(map, arguments);
      observer.addChangeRecord({
        type: 'clear',
        object: map
      });
      return methodCallResult;
    };

    return observer;
  };

  return ModifyMapObserver;
}(ModifyCollectionObserver);

function findOriginalEventTarget(event) {
  return event.path && event.path[0] || event.deepPath && event.deepPath[0] || event.target;
}

function stopPropagation() {
  this.standardStopPropagation();
  this.propagationStopped = true;
}

function interceptStopPropagation(event) {
  event.standardStopPropagation = event.stopPropagation;
  event.stopPropagation = stopPropagation;
}

function handleCapturedEvent(event) {
  var interceptInstalled = false;
  event.propagationStopped = false;
  var target = findOriginalEventTarget(event);

  var orderedCallbacks = [];

  while (target) {
    if (target.capturedCallbacks) {
      var callback = target.capturedCallbacks[event.type];
      if (callback) {
        if (!interceptInstalled) {
          interceptStopPropagation(event);
          interceptInstalled = true;
        }
        orderedCallbacks.push(callback);
      }
    }
    target = target.parentNode;
  }
  for (var _i22 = orderedCallbacks.length - 1; _i22 >= 0; _i22--) {
    var orderedCallback = orderedCallbacks[_i22];
    orderedCallback(event);
    if (event.propagationStopped) {
      break;
    }
  }
}

var CapturedHandlerEntry = function () {
  function CapturedHandlerEntry(eventName) {
    

    this.eventName = eventName;
    this.count = 0;
  }

  CapturedHandlerEntry.prototype.increment = function increment() {
    this.count++;

    if (this.count === 1) {
      _aureliaPal.DOM.addEventListener(this.eventName, handleCapturedEvent, true);
    }
  };

  CapturedHandlerEntry.prototype.decrement = function decrement() {
    this.count--;

    if (this.count === 0) {
      _aureliaPal.DOM.removeEventListener(this.eventName, handleCapturedEvent, true);
    }
  };

  return CapturedHandlerEntry;
}();

function handleDelegatedEvent(event) {
  var interceptInstalled = false;
  event.propagationStopped = false;
  var target = findOriginalEventTarget(event);

  while (target && !event.propagationStopped) {
    if (target.delegatedCallbacks) {
      var callback = target.delegatedCallbacks[event.type];
      if (callback) {
        if (!interceptInstalled) {
          interceptStopPropagation(event);
          interceptInstalled = true;
        }
        callback(event);
      }
    }

    target = target.parentNode;
  }
}

var DelegateHandlerEntry = function () {
  function DelegateHandlerEntry(eventName) {
    

    this.eventName = eventName;
    this.count = 0;
  }

  DelegateHandlerEntry.prototype.increment = function increment() {
    this.count++;

    if (this.count === 1) {
      _aureliaPal.DOM.addEventListener(this.eventName, handleDelegatedEvent, false);
    }
  };

  DelegateHandlerEntry.prototype.decrement = function decrement() {
    this.count--;

    if (this.count === 0) {
      _aureliaPal.DOM.removeEventListener(this.eventName, handleDelegatedEvent);
    }
  };

  return DelegateHandlerEntry;
}();

var DefaultEventStrategy = function () {
  function DefaultEventStrategy() {
    

    this.delegatedHandlers = {};
    this.capturedHandlers = {};
  }

  DefaultEventStrategy.prototype.subscribe = function subscribe(target, targetEvent, callback, strategy) {
    var _this22 = this;

    var delegatedHandlers = void 0;
    var capturedHandlers = void 0;
    var handlerEntry = void 0;

    if (strategy === delegationStrategy.bubbling) {
      var _ret = function () {
        delegatedHandlers = _this22.delegatedHandlers;
        handlerEntry = delegatedHandlers[targetEvent] || (delegatedHandlers[targetEvent] = new DelegateHandlerEntry(targetEvent));
        var delegatedCallbacks = target.delegatedCallbacks || (target.delegatedCallbacks = {});

        handlerEntry.increment();
        delegatedCallbacks[targetEvent] = callback;

        return {
          v: function v() {
            handlerEntry.decrement();
            delegatedCallbacks[targetEvent] = null;
          }
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
    if (strategy === delegationStrategy.capturing) {
      var _ret2 = function () {
        capturedHandlers = _this22.capturedHandlers;
        handlerEntry = capturedHandlers[targetEvent] || (capturedHandlers[targetEvent] = new CapturedHandlerEntry(targetEvent));
        var capturedCallbacks = target.capturedCallbacks || (target.capturedCallbacks = {});

        handlerEntry.increment();
        capturedCallbacks[targetEvent] = callback;

        return {
          v: function v() {
            handlerEntry.decrement();
            capturedCallbacks[targetEvent] = null;
          }
        };
      }();

      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
    }

    target.addEventListener(targetEvent, callback, false);

    return function () {
      target.removeEventListener(targetEvent, callback);
    };
  };

  return DefaultEventStrategy;
}();

var delegationStrategy = exports.delegationStrategy = {
  none: 0,
  capturing: 1,
  bubbling: 2
};

var EventManager = exports.EventManager = function () {
  function EventManager() {
    

    this.elementHandlerLookup = {};
    this.eventStrategyLookup = {};

    this.registerElementConfig({
      tagName: 'input',
      properties: {
        value: ['change', 'input'],
        checked: ['change', 'input'],
        files: ['change', 'input']
      }
    });

    this.registerElementConfig({
      tagName: 'textarea',
      properties: {
        value: ['change', 'input']
      }
    });

    this.registerElementConfig({
      tagName: 'select',
      properties: {
        value: ['change']
      }
    });

    this.registerElementConfig({
      tagName: 'content editable',
      properties: {
        value: ['change', 'input', 'blur', 'keyup', 'paste']
      }
    });

    this.registerElementConfig({
      tagName: 'scrollable element',
      properties: {
        scrollTop: ['scroll'],
        scrollLeft: ['scroll']
      }
    });

    this.defaultEventStrategy = new DefaultEventStrategy();
  }

  EventManager.prototype.registerElementConfig = function registerElementConfig(config) {
    var tagName = config.tagName.toLowerCase();
    var properties = config.properties;
    var propertyName = void 0;

    this.elementHandlerLookup[tagName] = {};

    for (propertyName in properties) {
      if (properties.hasOwnProperty(propertyName)) {
        this.registerElementPropertyConfig(tagName, propertyName, properties[propertyName]);
      }
    }
  };

  EventManager.prototype.registerElementPropertyConfig = function registerElementPropertyConfig(tagName, propertyName, events) {
    this.elementHandlerLookup[tagName][propertyName] = this.createElementHandler(events);
  };

  EventManager.prototype.createElementHandler = function createElementHandler(events) {
    return {
      subscribe: function subscribe(target, callback) {
        events.forEach(function (changeEvent) {
          target.addEventListener(changeEvent, callback, false);
        });

        return function () {
          events.forEach(function (changeEvent) {
            target.removeEventListener(changeEvent, callback);
          });
        };
      }
    };
  };

  EventManager.prototype.registerElementHandler = function registerElementHandler(tagName, handler) {
    this.elementHandlerLookup[tagName.toLowerCase()] = handler;
  };

  EventManager.prototype.registerEventStrategy = function registerEventStrategy(eventName, strategy) {
    this.eventStrategyLookup[eventName] = strategy;
  };

  EventManager.prototype.getElementHandler = function getElementHandler(target, propertyName) {
    var tagName = void 0;
    var lookup = this.elementHandlerLookup;

    if (target.tagName) {
      tagName = target.tagName.toLowerCase();

      if (lookup[tagName] && lookup[tagName][propertyName]) {
        return lookup[tagName][propertyName];
      }

      if (propertyName === 'textContent' || propertyName === 'innerHTML') {
        return lookup['content editable'].value;
      }

      if (propertyName === 'scrollTop' || propertyName === 'scrollLeft') {
        return lookup['scrollable element'][propertyName];
      }
    }

    return null;
  };

  EventManager.prototype.addEventListener = function addEventListener(target, targetEvent, callback, delegate) {
    return (this.eventStrategyLookup[targetEvent] || this.defaultEventStrategy).subscribe(target, targetEvent, callback, delegate);
  };

  return EventManager;
}();

var DirtyChecker = exports.DirtyChecker = function () {
  function DirtyChecker() {
    

    this.tracked = [];
    this.checkDelay = 120;
  }

  DirtyChecker.prototype.addProperty = function addProperty(property) {
    var tracked = this.tracked;

    tracked.push(property);

    if (tracked.length === 1) {
      this.scheduleDirtyCheck();
    }
  };

  DirtyChecker.prototype.removeProperty = function removeProperty(property) {
    var tracked = this.tracked;
    tracked.splice(tracked.indexOf(property), 1);
  };

  DirtyChecker.prototype.scheduleDirtyCheck = function scheduleDirtyCheck() {
    var _this23 = this;

    setTimeout(function () {
      return _this23.check();
    }, this.checkDelay);
  };

  DirtyChecker.prototype.check = function check() {
    var tracked = this.tracked;
    var i = tracked.length;

    while (i--) {
      var current = tracked[i];

      if (current.isDirty()) {
        current.call();
      }
    }

    if (tracked.length) {
      this.scheduleDirtyCheck();
    }
  };

  return DirtyChecker;
}();

var DirtyCheckProperty = exports.DirtyCheckProperty = (_dec5 = subscriberCollection(), _dec5(_class5 = function () {
  function DirtyCheckProperty(dirtyChecker, obj, propertyName) {
    

    this.dirtyChecker = dirtyChecker;
    this.obj = obj;
    this.propertyName = propertyName;
  }

  DirtyCheckProperty.prototype.getValue = function getValue() {
    return this.obj[this.propertyName];
  };

  DirtyCheckProperty.prototype.setValue = function setValue(newValue) {
    this.obj[this.propertyName] = newValue;
  };

  DirtyCheckProperty.prototype.call = function call() {
    var oldValue = this.oldValue;
    var newValue = this.getValue();

    this.callSubscribers(newValue, oldValue);

    this.oldValue = newValue;
  };

  DirtyCheckProperty.prototype.isDirty = function isDirty() {
    return this.oldValue !== this.obj[this.propertyName];
  };

  DirtyCheckProperty.prototype.subscribe = function subscribe(context, callable) {
    if (!this.hasSubscribers()) {
      this.oldValue = this.getValue();
      this.dirtyChecker.addProperty(this);
    }
    this.addSubscriber(context, callable);
  };

  DirtyCheckProperty.prototype.unsubscribe = function unsubscribe(context, callable) {
    if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
      this.dirtyChecker.removeProperty(this);
    }
  };

  return DirtyCheckProperty;
}()) || _class5);


var logger = LogManager.getLogger('property-observation');

var propertyAccessor = exports.propertyAccessor = {
  getValue: function getValue(obj, propertyName) {
    return obj[propertyName];
  },
  setValue: function setValue(value, obj, propertyName) {
    obj[propertyName] = value;
  }
};

var PrimitiveObserver = exports.PrimitiveObserver = function () {
  function PrimitiveObserver(primitive, propertyName) {
    

    this.doNotCache = true;

    this.primitive = primitive;
    this.propertyName = propertyName;
  }

  PrimitiveObserver.prototype.getValue = function getValue() {
    return this.primitive[this.propertyName];
  };

  PrimitiveObserver.prototype.setValue = function setValue() {
    var type = _typeof(this.primitive);
    throw new Error('The ' + this.propertyName + ' property of a ' + type + ' (' + this.primitive + ') cannot be assigned.');
  };

  PrimitiveObserver.prototype.subscribe = function subscribe() {};

  PrimitiveObserver.prototype.unsubscribe = function unsubscribe() {};

  return PrimitiveObserver;
}();

var SetterObserver = exports.SetterObserver = (_dec6 = subscriberCollection(), _dec6(_class7 = function () {
  function SetterObserver(taskQueue, obj, propertyName) {
    

    this.taskQueue = taskQueue;
    this.obj = obj;
    this.propertyName = propertyName;
    this.queued = false;
    this.observing = false;
  }

  SetterObserver.prototype.getValue = function getValue() {
    return this.obj[this.propertyName];
  };

  SetterObserver.prototype.setValue = function setValue(newValue) {
    this.obj[this.propertyName] = newValue;
  };

  SetterObserver.prototype.getterValue = function getterValue() {
    return this.currentValue;
  };

  SetterObserver.prototype.setterValue = function setterValue(newValue) {
    var oldValue = this.currentValue;

    if (oldValue !== newValue) {
      if (!this.queued) {
        this.oldValue = oldValue;
        this.queued = true;
        this.taskQueue.queueMicroTask(this);
      }

      this.currentValue = newValue;
    }
  };

  SetterObserver.prototype.call = function call() {
    var oldValue = this.oldValue;
    var newValue = this.currentValue;

    this.queued = false;

    this.callSubscribers(newValue, oldValue);
  };

  SetterObserver.prototype.subscribe = function subscribe(context, callable) {
    if (!this.observing) {
      this.convertProperty();
    }
    this.addSubscriber(context, callable);
  };

  SetterObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
    this.removeSubscriber(context, callable);
  };

  SetterObserver.prototype.convertProperty = function convertProperty() {
    this.observing = true;
    this.currentValue = this.obj[this.propertyName];
    this.setValue = this.setterValue;
    this.getValue = this.getterValue;

    if (!Reflect.defineProperty(this.obj, this.propertyName, {
      configurable: true,
      enumerable: this.propertyName in this.obj ? this.obj.propertyIsEnumerable(this.propertyName) : true,
      get: this.getValue.bind(this),
      set: this.setValue.bind(this)
    })) {
      logger.warn('Cannot observe property \'' + this.propertyName + '\' of object', this.obj);
    }
  };

  return SetterObserver;
}()) || _class7);

var XLinkAttributeObserver = exports.XLinkAttributeObserver = function () {
  function XLinkAttributeObserver(element, propertyName, attributeName) {
    

    this.element = element;
    this.propertyName = propertyName;
    this.attributeName = attributeName;
  }

  XLinkAttributeObserver.prototype.getValue = function getValue() {
    return this.element.getAttributeNS('http://www.w3.org/1999/xlink', this.attributeName);
  };

  XLinkAttributeObserver.prototype.setValue = function setValue(newValue) {
    return this.element.setAttributeNS('http://www.w3.org/1999/xlink', this.attributeName, newValue);
  };

  XLinkAttributeObserver.prototype.subscribe = function subscribe() {
    throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
  };

  return XLinkAttributeObserver;
}();

var dataAttributeAccessor = exports.dataAttributeAccessor = {
  getValue: function getValue(obj, propertyName) {
    return obj.getAttribute(propertyName);
  },
  setValue: function setValue(value, obj, propertyName) {
    return obj.setAttribute(propertyName, value);
  }
};

var DataAttributeObserver = exports.DataAttributeObserver = function () {
  function DataAttributeObserver(element, propertyName) {
    

    this.element = element;
    this.propertyName = propertyName;
  }

  DataAttributeObserver.prototype.getValue = function getValue() {
    return this.element.getAttribute(this.propertyName);
  };

  DataAttributeObserver.prototype.setValue = function setValue(newValue) {
    return this.element.setAttribute(this.propertyName, newValue);
  };

  DataAttributeObserver.prototype.subscribe = function subscribe() {
    throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
  };

  return DataAttributeObserver;
}();

var StyleObserver = exports.StyleObserver = function () {
  function StyleObserver(element, propertyName) {
    

    this.element = element;
    this.propertyName = propertyName;

    this.styles = null;
    this.version = 0;
  }

  StyleObserver.prototype.getValue = function getValue() {
    return this.element.style.cssText;
  };

  StyleObserver.prototype._setProperty = function _setProperty(style, value) {
    var priority = '';

    if (value !== null && value !== undefined && typeof value.indexOf === 'function' && value.indexOf('!important') !== -1) {
      priority = 'important';
      value = value.replace('!important', '');
    }
    this.element.style.setProperty(style, value, priority);
  };

  StyleObserver.prototype.setValue = function setValue(newValue) {
    var styles = this.styles || {};
    var style = void 0;
    var version = this.version;

    if (newValue !== null && newValue !== undefined) {
      if (newValue instanceof Object) {
        var value = void 0;
        for (style in newValue) {
          if (newValue.hasOwnProperty(style)) {
            value = newValue[style];
            style = style.replace(/([A-Z])/g, function (m) {
              return '-' + m.toLowerCase();
            });
            styles[style] = version;
            this._setProperty(style, value);
          }
        }
      } else if (newValue.length) {
        var rx = /\s*([\w\-]+)\s*:\s*((?:(?:[\w\-]+\(\s*(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[\w\-]+\(\s*(?:^"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^\)]*)\),?|[^\)]*)\),?|"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^;]*),?\s*)+);?/g;
        var pair = void 0;
        while ((pair = rx.exec(newValue)) !== null) {
          style = pair[1];
          if (!style) {
            continue;
          }

          styles[style] = version;
          this._setProperty(style, pair[2]);
        }
      }
    }

    this.styles = styles;
    this.version += 1;

    if (version === 0) {
      return;
    }

    version -= 1;
    for (style in styles) {
      if (!styles.hasOwnProperty(style) || styles[style] !== version) {
        continue;
      }

      this.element.style.removeProperty(style);
    }
  };

  StyleObserver.prototype.subscribe = function subscribe() {
    throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "' + this.propertyName + '" property is not supported.');
  };

  return StyleObserver;
}();

var ValueAttributeObserver = exports.ValueAttributeObserver = (_dec7 = subscriberCollection(), _dec7(_class8 = function () {
  function ValueAttributeObserver(element, propertyName, handler) {
    

    this.element = element;
    this.propertyName = propertyName;
    this.handler = handler;
    if (propertyName === 'files') {
      this.setValue = function () {};
    }
  }

  ValueAttributeObserver.prototype.getValue = function getValue() {
    return this.element[this.propertyName];
  };

  ValueAttributeObserver.prototype.setValue = function setValue(newValue) {
    newValue = newValue === undefined || newValue === null ? '' : newValue;
    if (this.element[this.propertyName] !== newValue) {
      this.element[this.propertyName] = newValue;
      this.notify();
    }
  };

  ValueAttributeObserver.prototype.notify = function notify() {
    var oldValue = this.oldValue;
    var newValue = this.getValue();

    this.callSubscribers(newValue, oldValue);

    this.oldValue = newValue;
  };

  ValueAttributeObserver.prototype.subscribe = function subscribe(context, callable) {
    if (!this.hasSubscribers()) {
      this.oldValue = this.getValue();
      this.disposeHandler = this.handler.subscribe(this.element, this.notify.bind(this));
    }

    this.addSubscriber(context, callable);
  };

  ValueAttributeObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
    if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
      this.disposeHandler();
      this.disposeHandler = null;
    }
  };

  return ValueAttributeObserver;
}()) || _class8);


var checkedArrayContext = 'CheckedObserver:array';
var checkedValueContext = 'CheckedObserver:value';

var CheckedObserver = exports.CheckedObserver = (_dec8 = subscriberCollection(), _dec8(_class9 = function () {
  function CheckedObserver(element, handler, observerLocator) {
    

    this.element = element;
    this.handler = handler;
    this.observerLocator = observerLocator;
  }

  CheckedObserver.prototype.getValue = function getValue() {
    return this.value;
  };

  CheckedObserver.prototype.setValue = function setValue(newValue) {
    if (this.value === newValue) {
      return;
    }

    if (this.arrayObserver) {
      this.arrayObserver.unsubscribe(checkedArrayContext, this);
      this.arrayObserver = null;
    }

    if (this.element.type === 'checkbox' && Array.isArray(newValue)) {
      this.arrayObserver = this.observerLocator.getArrayObserver(newValue);
      this.arrayObserver.subscribe(checkedArrayContext, this);
    }

    this.oldValue = this.value;
    this.value = newValue;
    this.synchronizeElement();
    this.notify();

    if (!this.initialSync) {
      this.initialSync = true;
      this.observerLocator.taskQueue.queueMicroTask(this);
    }
  };

  CheckedObserver.prototype.call = function call(context, splices) {
    this.synchronizeElement();

    if (!this.valueObserver) {
      this.valueObserver = this.element.__observers__.model || this.element.__observers__.value;
      if (this.valueObserver) {
        this.valueObserver.subscribe(checkedValueContext, this);
      }
    }
  };

  CheckedObserver.prototype.synchronizeElement = function synchronizeElement() {
    var value = this.value;
    var element = this.element;
    var elementValue = element.hasOwnProperty('model') ? element.model : element.value;
    var isRadio = element.type === 'radio';
    var matcher = element.matcher || function (a, b) {
      return a === b;
    };

    element.checked = isRadio && !!matcher(value, elementValue) || !isRadio && value === true || !isRadio && Array.isArray(value) && value.findIndex(function (item) {
      return !!matcher(item, elementValue);
    }) !== -1;
  };

  CheckedObserver.prototype.synchronizeValue = function synchronizeValue() {
    var value = this.value;
    var element = this.element;
    var elementValue = element.hasOwnProperty('model') ? element.model : element.value;
    var index = void 0;
    var matcher = element.matcher || function (a, b) {
      return a === b;
    };

    if (element.type === 'checkbox') {
      if (Array.isArray(value)) {
        index = value.findIndex(function (item) {
          return !!matcher(item, elementValue);
        });
        if (element.checked && index === -1) {
          value.push(elementValue);
        } else if (!element.checked && index !== -1) {
          value.splice(index, 1);
        }

        return;
      }

      value = element.checked;
    } else if (element.checked) {
      value = elementValue;
    } else {
      return;
    }

    this.oldValue = this.value;
    this.value = value;
    this.notify();
  };

  CheckedObserver.prototype.notify = function notify() {
    var oldValue = this.oldValue;
    var newValue = this.value;

    this.callSubscribers(newValue, oldValue);
  };

  CheckedObserver.prototype.subscribe = function subscribe(context, callable) {
    if (!this.hasSubscribers()) {
      this.disposeHandler = this.handler.subscribe(this.element, this.synchronizeValue.bind(this, false));
    }
    this.addSubscriber(context, callable);
  };

  CheckedObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
    if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
      this.disposeHandler();
      this.disposeHandler = null;
    }
  };

  CheckedObserver.prototype.unbind = function unbind() {
    if (this.arrayObserver) {
      this.arrayObserver.unsubscribe(checkedArrayContext, this);
      this.arrayObserver = null;
    }
    if (this.valueObserver) {
      this.valueObserver.unsubscribe(checkedValueContext, this);
    }
  };

  return CheckedObserver;
}()) || _class9);


var selectArrayContext = 'SelectValueObserver:array';

var SelectValueObserver = exports.SelectValueObserver = (_dec9 = subscriberCollection(), _dec9(_class10 = function () {
  function SelectValueObserver(element, handler, observerLocator) {
    

    this.element = element;
    this.handler = handler;
    this.observerLocator = observerLocator;
  }

  SelectValueObserver.prototype.getValue = function getValue() {
    return this.value;
  };

  SelectValueObserver.prototype.setValue = function setValue(newValue) {
    if (newValue !== null && newValue !== undefined && this.element.multiple && !Array.isArray(newValue)) {
      throw new Error('Only null or Array instances can be bound to a multi-select.');
    }
    if (this.value === newValue) {
      return;
    }

    if (this.arrayObserver) {
      this.arrayObserver.unsubscribe(selectArrayContext, this);
      this.arrayObserver = null;
    }

    if (Array.isArray(newValue)) {
      this.arrayObserver = this.observerLocator.getArrayObserver(newValue);
      this.arrayObserver.subscribe(selectArrayContext, this);
    }

    this.oldValue = this.value;
    this.value = newValue;
    this.synchronizeOptions();
    this.notify();

    if (!this.initialSync) {
      this.initialSync = true;
      this.observerLocator.taskQueue.queueMicroTask(this);
    }
  };

  SelectValueObserver.prototype.call = function call(context, splices) {
    this.synchronizeOptions();
  };

  SelectValueObserver.prototype.synchronizeOptions = function synchronizeOptions() {
    var value = this.value;
    var clear = void 0;
    var isArray = void 0;

    if (value === null || value === undefined) {
      clear = true;
    } else if (Array.isArray(value)) {
      isArray = true;
    }

    var options = this.element.options;
    var i = options.length;
    var matcher = this.element.matcher || function (a, b) {
      return a === b;
    };

    var _loop = function _loop() {
      var option = options.item(i);
      if (clear) {
        option.selected = false;
        return 'continue';
      }
      var optionValue = option.hasOwnProperty('model') ? option.model : option.value;
      if (isArray) {
        option.selected = value.findIndex(function (item) {
          return !!matcher(optionValue, item);
        }) !== -1;
        return 'continue';
      }
      option.selected = !!matcher(optionValue, value);
    };

    while (i--) {
      var _ret3 = _loop();

      if (_ret3 === 'continue') continue;
    }
  };

  SelectValueObserver.prototype.synchronizeValue = function synchronizeValue() {
    var _this24 = this;

    var options = this.element.options;
    var count = 0;
    var value = [];

    for (var _i23 = 0, ii = options.length; _i23 < ii; _i23++) {
      var _option = options.item(_i23);
      if (!_option.selected) {
        continue;
      }
      value.push(_option.hasOwnProperty('model') ? _option.model : _option.value);
      count++;
    }

    if (this.element.multiple) {
      if (Array.isArray(this.value)) {
        var _ret4 = function () {
          var matcher = _this24.element.matcher || function (a, b) {
            return a === b;
          };

          var i = 0;

          var _loop2 = function _loop2() {
            var a = _this24.value[i];
            if (value.findIndex(function (b) {
              return matcher(a, b);
            }) === -1) {
              _this24.value.splice(i, 1);
            } else {
              i++;
            }
          };

          while (i < _this24.value.length) {
            _loop2();
          }

          i = 0;

          var _loop3 = function _loop3() {
            var a = value[i];
            if (_this24.value.findIndex(function (b) {
              return matcher(a, b);
            }) === -1) {
              _this24.value.push(a);
            }
            i++;
          };

          while (i < value.length) {
            _loop3();
          }
          return {
            v: void 0
          };
        }();

        if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
      }
    } else {
      if (count === 0) {
        value = null;
      } else {
        value = value[0];
      }
    }

    if (value !== this.value) {
      this.oldValue = this.value;
      this.value = value;
      this.notify();
    }
  };

  SelectValueObserver.prototype.notify = function notify() {
    var oldValue = this.oldValue;
    var newValue = this.value;

    this.callSubscribers(newValue, oldValue);
  };

  SelectValueObserver.prototype.subscribe = function subscribe(context, callable) {
    if (!this.hasSubscribers()) {
      this.disposeHandler = this.handler.subscribe(this.element, this.synchronizeValue.bind(this, false));
    }
    this.addSubscriber(context, callable);
  };

  SelectValueObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
    if (this.removeSubscriber(context, callable) && !this.hasSubscribers()) {
      this.disposeHandler();
      this.disposeHandler = null;
    }
  };

  SelectValueObserver.prototype.bind = function bind() {
    var _this25 = this;

    this.domObserver = _aureliaPal.DOM.createMutationObserver(function () {
      _this25.synchronizeOptions();
      _this25.synchronizeValue();
    });
    this.domObserver.observe(this.element, { childList: true, subtree: true });
  };

  SelectValueObserver.prototype.unbind = function unbind() {
    this.domObserver.disconnect();
    this.domObserver = null;

    if (this.arrayObserver) {
      this.arrayObserver.unsubscribe(selectArrayContext, this);
      this.arrayObserver = null;
    }
  };

  return SelectValueObserver;
}()) || _class10);

var ClassObserver = exports.ClassObserver = function () {
  function ClassObserver(element) {
    

    this.element = element;
    this.doNotCache = true;
    this.value = '';
    this.version = 0;
  }

  ClassObserver.prototype.getValue = function getValue() {
    return this.value;
  };

  ClassObserver.prototype.setValue = function setValue(newValue) {
    var nameIndex = this.nameIndex || {};
    var version = this.version;
    var names = void 0;
    var name = void 0;

    if (newValue !== null && newValue !== undefined && newValue.length) {
      names = newValue.split(/\s+/);
      for (var _i24 = 0, length = names.length; _i24 < length; _i24++) {
        name = names[_i24];
        if (name === '') {
          continue;
        }
        nameIndex[name] = version;
        this.element.classList.add(name);
      }
    }

    this.value = newValue;
    this.nameIndex = nameIndex;
    this.version += 1;

    if (version === 0) {
      return;
    }

    version -= 1;
    for (name in nameIndex) {
      if (!nameIndex.hasOwnProperty(name) || nameIndex[name] !== version) {
        continue;
      }
      this.element.classList.remove(name);
    }
  };

  ClassObserver.prototype.subscribe = function subscribe() {
    throw new Error('Observation of a "' + this.element.nodeName + '" element\'s "class" property is not supported.');
  };

  return ClassObserver;
}();

function hasDeclaredDependencies(descriptor) {
  return !!(descriptor && descriptor.get && descriptor.get.dependencies);
}

function declarePropertyDependencies(ctor, propertyName, dependencies) {
  var descriptor = Object.getOwnPropertyDescriptor(ctor.prototype, propertyName);
  descriptor.get.dependencies = dependencies;
}

function computedFrom() {
  for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }

  return function (target, key, descriptor) {
    descriptor.get.dependencies = rest;
    return descriptor;
  };
}

var ComputedExpression = exports.ComputedExpression = function (_Expression19) {
  _inherits(ComputedExpression, _Expression19);

  function ComputedExpression(name, dependencies) {
    

    var _this26 = _possibleConstructorReturn(this, _Expression19.call(this));

    _this26.name = name;
    _this26.dependencies = dependencies;
    _this26.isAssignable = true;
    return _this26;
  }

  ComputedExpression.prototype.evaluate = function evaluate(scope, lookupFunctions) {
    return scope.bindingContext[this.name];
  };

  ComputedExpression.prototype.assign = function assign(scope, value) {
    scope.bindingContext[this.name] = value;
  };

  ComputedExpression.prototype.accept = function accept(visitor) {
    throw new Error('not implemented');
  };

  ComputedExpression.prototype.connect = function connect(binding, scope) {
    var dependencies = this.dependencies;
    var i = dependencies.length;
    while (i--) {
      dependencies[i].connect(binding, scope);
    }
  };

  return ComputedExpression;
}(Expression);

function createComputedObserver(obj, propertyName, descriptor, observerLocator) {
  var dependencies = descriptor.get.dependencies;
  if (!(dependencies instanceof ComputedExpression)) {
    var _i25 = dependencies.length;
    while (_i25--) {
      dependencies[_i25] = observerLocator.parser.parse(dependencies[_i25]);
    }
    dependencies = descriptor.get.dependencies = new ComputedExpression(propertyName, dependencies);
  }

  var scope = { bindingContext: obj, overrideContext: createOverrideContext(obj) };
  return new ExpressionObserver(scope, dependencies, observerLocator);
}

var elements = exports.elements = {
  a: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'target', 'transform', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
  altGlyph: ['class', 'dx', 'dy', 'externalResourcesRequired', 'format', 'glyphRef', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  altGlyphDef: ['id', 'xml:base', 'xml:lang', 'xml:space'],
  altGlyphItem: ['id', 'xml:base', 'xml:lang', 'xml:space'],
  animate: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
  animateColor: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
  animateMotion: ['accumulate', 'additive', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keyPoints', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'origin', 'path', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'rotate', 'systemLanguage', 'to', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
  animateTransform: ['accumulate', 'additive', 'attributeName', 'attributeType', 'begin', 'by', 'calcMode', 'dur', 'end', 'externalResourcesRequired', 'fill', 'from', 'id', 'keySplines', 'keyTimes', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'type', 'values', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
  circle: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'r', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
  clipPath: ['class', 'clipPathUnits', 'externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
  'color-profile': ['id', 'local', 'name', 'rendering-intent', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
  cursor: ['externalResourcesRequired', 'id', 'requiredExtensions', 'requiredFeatures', 'systemLanguage', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  defs: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
  desc: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
  ellipse: ['class', 'cx', 'cy', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
  feBlend: ['class', 'height', 'id', 'in', 'in2', 'mode', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  feColorMatrix: ['class', 'height', 'id', 'in', 'result', 'style', 'type', 'values', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  feComponentTransfer: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  feComposite: ['class', 'height', 'id', 'in', 'in2', 'k1', 'k2', 'k3', 'k4', 'operator', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  feConvolveMatrix: ['bias', 'class', 'divisor', 'edgeMode', 'height', 'id', 'in', 'kernelMatrix', 'kernelUnitLength', 'order', 'preserveAlpha', 'result', 'style', 'targetX', 'targetY', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  feDiffuseLighting: ['class', 'diffuseConstant', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  feDisplacementMap: ['class', 'height', 'id', 'in', 'in2', 'result', 'scale', 'style', 'width', 'x', 'xChannelSelector', 'xml:base', 'xml:lang', 'xml:space', 'y', 'yChannelSelector'],
  feDistantLight: ['azimuth', 'elevation', 'id', 'xml:base', 'xml:lang', 'xml:space'],
  feFlood: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  feFuncA: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
  feFuncB: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
  feFuncG: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
  feFuncR: ['amplitude', 'exponent', 'id', 'intercept', 'offset', 'slope', 'tableValues', 'type', 'xml:base', 'xml:lang', 'xml:space'],
  feGaussianBlur: ['class', 'height', 'id', 'in', 'result', 'stdDeviation', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  feImage: ['class', 'externalResourcesRequired', 'height', 'id', 'preserveAspectRatio', 'result', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  feMerge: ['class', 'height', 'id', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  feMergeNode: ['id', 'xml:base', 'xml:lang', 'xml:space'],
  feMorphology: ['class', 'height', 'id', 'in', 'operator', 'radius', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  feOffset: ['class', 'dx', 'dy', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  fePointLight: ['id', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
  feSpecularLighting: ['class', 'height', 'id', 'in', 'kernelUnitLength', 'result', 'specularConstant', 'specularExponent', 'style', 'surfaceScale', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  feSpotLight: ['id', 'limitingConeAngle', 'pointsAtX', 'pointsAtY', 'pointsAtZ', 'specularExponent', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'z'],
  feTile: ['class', 'height', 'id', 'in', 'result', 'style', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  feTurbulence: ['baseFrequency', 'class', 'height', 'id', 'numOctaves', 'result', 'seed', 'stitchTiles', 'style', 'type', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  filter: ['class', 'externalResourcesRequired', 'filterRes', 'filterUnits', 'height', 'id', 'primitiveUnits', 'style', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  font: ['class', 'externalResourcesRequired', 'horiz-adv-x', 'horiz-origin-x', 'horiz-origin-y', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
  'font-face': ['accent-height', 'alphabetic', 'ascent', 'bbox', 'cap-height', 'descent', 'font-family', 'font-size', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'hanging', 'id', 'ideographic', 'mathematical', 'overline-position', 'overline-thickness', 'panose-1', 'slope', 'stemh', 'stemv', 'strikethrough-position', 'strikethrough-thickness', 'underline-position', 'underline-thickness', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'widths', 'x-height', 'xml:base', 'xml:lang', 'xml:space'],
  'font-face-format': ['id', 'string', 'xml:base', 'xml:lang', 'xml:space'],
  'font-face-name': ['id', 'name', 'xml:base', 'xml:lang', 'xml:space'],
  'font-face-src': ['id', 'xml:base', 'xml:lang', 'xml:space'],
  'font-face-uri': ['id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
  foreignObject: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  g: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
  glyph: ['arabic-form', 'class', 'd', 'glyph-name', 'horiz-adv-x', 'id', 'lang', 'orientation', 'style', 'unicode', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
  glyphRef: ['class', 'dx', 'dy', 'format', 'glyphRef', 'id', 'style', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  hkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space'],
  image: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  line: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'x1', 'x2', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
  linearGradient: ['class', 'externalResourcesRequired', 'gradientTransform', 'gradientUnits', 'id', 'spreadMethod', 'style', 'x1', 'x2', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y1', 'y2'],
  marker: ['class', 'externalResourcesRequired', 'id', 'markerHeight', 'markerUnits', 'markerWidth', 'orient', 'preserveAspectRatio', 'refX', 'refY', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
  mask: ['class', 'externalResourcesRequired', 'height', 'id', 'maskContentUnits', 'maskUnits', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  metadata: ['id', 'xml:base', 'xml:lang', 'xml:space'],
  'missing-glyph': ['class', 'd', 'horiz-adv-x', 'id', 'style', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'xml:base', 'xml:lang', 'xml:space'],
  mpath: ['externalResourcesRequired', 'id', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
  path: ['class', 'd', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'pathLength', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
  pattern: ['class', 'externalResourcesRequired', 'height', 'id', 'patternContentUnits', 'patternTransform', 'patternUnits', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'viewBox', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  polygon: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
  polyline: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'points', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
  radialGradient: ['class', 'cx', 'cy', 'externalResourcesRequired', 'fx', 'fy', 'gradientTransform', 'gradientUnits', 'id', 'r', 'spreadMethod', 'style', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
  rect: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rx', 'ry', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  script: ['externalResourcesRequired', 'id', 'type', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
  set: ['attributeName', 'attributeType', 'begin', 'dur', 'end', 'externalResourcesRequired', 'fill', 'id', 'max', 'min', 'onbegin', 'onend', 'onload', 'onrepeat', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'restart', 'systemLanguage', 'to', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
  stop: ['class', 'id', 'offset', 'style', 'xml:base', 'xml:lang', 'xml:space'],
  style: ['id', 'media', 'title', 'type', 'xml:base', 'xml:lang', 'xml:space'],
  svg: ['baseProfile', 'class', 'contentScriptType', 'contentStyleType', 'externalResourcesRequired', 'height', 'id', 'onabort', 'onactivate', 'onclick', 'onerror', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onresize', 'onscroll', 'onunload', 'onzoom', 'preserveAspectRatio', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'version', 'viewBox', 'width', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y', 'zoomAndPan'],
  switch: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'xml:base', 'xml:lang', 'xml:space'],
  symbol: ['class', 'externalResourcesRequired', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'preserveAspectRatio', 'style', 'viewBox', 'xml:base', 'xml:lang', 'xml:space'],
  text: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'transform', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  textPath: ['class', 'externalResourcesRequired', 'id', 'lengthAdjust', 'method', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'spacing', 'startOffset', 'style', 'systemLanguage', 'textLength', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space'],
  title: ['class', 'id', 'style', 'xml:base', 'xml:lang', 'xml:space'],
  tref: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  tspan: ['class', 'dx', 'dy', 'externalResourcesRequired', 'id', 'lengthAdjust', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'rotate', 'style', 'systemLanguage', 'textLength', 'x', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  use: ['class', 'externalResourcesRequired', 'height', 'id', 'onactivate', 'onclick', 'onfocusin', 'onfocusout', 'onload', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'requiredExtensions', 'requiredFeatures', 'style', 'systemLanguage', 'transform', 'width', 'x', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xml:lang', 'xml:space', 'y'],
  view: ['externalResourcesRequired', 'id', 'preserveAspectRatio', 'viewBox', 'viewTarget', 'xml:base', 'xml:lang', 'xml:space', 'zoomAndPan'],
  vkern: ['g1', 'g2', 'id', 'k', 'u1', 'u2', 'xml:base', 'xml:lang', 'xml:space']
};
var presentationElements = exports.presentationElements = {
  'a': true,
  'altGlyph': true,
  'animate': true,
  'animateColor': true,
  'circle': true,
  'clipPath': true,
  'defs': true,
  'ellipse': true,
  'feBlend': true,
  'feColorMatrix': true,
  'feComponentTransfer': true,
  'feComposite': true,
  'feConvolveMatrix': true,
  'feDiffuseLighting': true,
  'feDisplacementMap': true,
  'feFlood': true,
  'feGaussianBlur': true,
  'feImage': true,
  'feMerge': true,
  'feMorphology': true,
  'feOffset': true,
  'feSpecularLighting': true,
  'feTile': true,
  'feTurbulence': true,
  'filter': true,
  'font': true,
  'foreignObject': true,
  'g': true,
  'glyph': true,
  'glyphRef': true,
  'image': true,
  'line': true,
  'linearGradient': true,
  'marker': true,
  'mask': true,
  'missing-glyph': true,
  'path': true,
  'pattern': true,
  'polygon': true,
  'polyline': true,
  'radialGradient': true,
  'rect': true,
  'stop': true,
  'svg': true,
  'switch': true,
  'symbol': true,
  'text': true,
  'textPath': true,
  'tref': true,
  'tspan': true,
  'use': true
};

var presentationAttributes = exports.presentationAttributes = {
  'alignment-baseline': true,
  'baseline-shift': true,
  'clip-path': true,
  'clip-rule': true,
  'clip': true,
  'color-interpolation-filters': true,
  'color-interpolation': true,
  'color-profile': true,
  'color-rendering': true,
  'color': true,
  'cursor': true,
  'direction': true,
  'display': true,
  'dominant-baseline': true,
  'enable-background': true,
  'fill-opacity': true,
  'fill-rule': true,
  'fill': true,
  'filter': true,
  'flood-color': true,
  'flood-opacity': true,
  'font-family': true,
  'font-size-adjust': true,
  'font-size': true,
  'font-stretch': true,
  'font-style': true,
  'font-variant': true,
  'font-weight': true,
  'glyph-orientation-horizontal': true,
  'glyph-orientation-vertical': true,
  'image-rendering': true,
  'kerning': true,
  'letter-spacing': true,
  'lighting-color': true,
  'marker-end': true,
  'marker-mid': true,
  'marker-start': true,
  'mask': true,
  'opacity': true,
  'overflow': true,
  'pointer-events': true,
  'shape-rendering': true,
  'stop-color': true,
  'stop-opacity': true,
  'stroke-dasharray': true,
  'stroke-dashoffset': true,
  'stroke-linecap': true,
  'stroke-linejoin': true,
  'stroke-miterlimit': true,
  'stroke-opacity': true,
  'stroke-width': true,
  'stroke': true,
  'text-anchor': true,
  'text-decoration': true,
  'text-rendering': true,
  'unicode-bidi': true,
  'visibility': true,
  'word-spacing': true,
  'writing-mode': true
};

function createElement(html) {
  var div = _aureliaPal.DOM.createElement('div');
  div.innerHTML = html;
  return div.firstChild;
}

var SVGAnalyzer = exports.SVGAnalyzer = function () {
  function SVGAnalyzer() {
    

    if (createElement('<svg><altGlyph /></svg>').firstElementChild.nodeName === 'altglyph' && elements.altGlyph) {
      elements.altglyph = elements.altGlyph;
      delete elements.altGlyph;
      elements.altglyphdef = elements.altGlyphDef;
      delete elements.altGlyphDef;
      elements.altglyphitem = elements.altGlyphItem;
      delete elements.altGlyphItem;
      elements.glyphref = elements.glyphRef;
      delete elements.glyphRef;
    }
  }

  SVGAnalyzer.prototype.isStandardSvgAttribute = function isStandardSvgAttribute(nodeName, attributeName) {
    return presentationElements[nodeName] && presentationAttributes[attributeName] || elements[nodeName] && elements[nodeName].indexOf(attributeName) !== -1;
  };

  return SVGAnalyzer;
}();

var ObserverLocator = exports.ObserverLocator = (_temp = _class11 = function () {
  function ObserverLocator(taskQueue, eventManager, dirtyChecker, svgAnalyzer, parser) {
    

    this.taskQueue = taskQueue;
    this.eventManager = eventManager;
    this.dirtyChecker = dirtyChecker;
    this.svgAnalyzer = svgAnalyzer;
    this.parser = parser;
    this.adapters = [];
    this.logger = LogManager.getLogger('observer-locator');
  }

  ObserverLocator.prototype.getObserver = function getObserver(obj, propertyName) {
    var observersLookup = obj.__observers__;
    var observer = void 0;

    if (observersLookup && propertyName in observersLookup) {
      return observersLookup[propertyName];
    }

    observer = this.createPropertyObserver(obj, propertyName);

    if (!observer.doNotCache) {
      if (observersLookup === undefined) {
        observersLookup = this.getOrCreateObserversLookup(obj);
      }

      observersLookup[propertyName] = observer;
    }

    return observer;
  };

  ObserverLocator.prototype.getOrCreateObserversLookup = function getOrCreateObserversLookup(obj) {
    return obj.__observers__ || this.createObserversLookup(obj);
  };

  ObserverLocator.prototype.createObserversLookup = function createObserversLookup(obj) {
    var value = {};

    if (!Reflect.defineProperty(obj, '__observers__', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: value
    })) {
      this.logger.warn('Cannot add observers to object', obj);
    }

    return value;
  };

  ObserverLocator.prototype.addAdapter = function addAdapter(adapter) {
    this.adapters.push(adapter);
  };

  ObserverLocator.prototype.getAdapterObserver = function getAdapterObserver(obj, propertyName, descriptor) {
    for (var _i26 = 0, ii = this.adapters.length; _i26 < ii; _i26++) {
      var adapter = this.adapters[_i26];
      var observer = adapter.getObserver(obj, propertyName, descriptor);
      if (observer) {
        return observer;
      }
    }
    return null;
  };

  ObserverLocator.prototype.createPropertyObserver = function createPropertyObserver(obj, propertyName) {
    var descriptor = void 0;
    var handler = void 0;
    var xlinkResult = void 0;

    if (!(obj instanceof Object)) {
      return new PrimitiveObserver(obj, propertyName);
    }

    if (obj instanceof _aureliaPal.DOM.Element) {
      if (propertyName === 'class') {
        return new ClassObserver(obj);
      }
      if (propertyName === 'style' || propertyName === 'css') {
        return new StyleObserver(obj, propertyName);
      }
      handler = this.eventManager.getElementHandler(obj, propertyName);
      if (propertyName === 'value' && obj.tagName.toLowerCase() === 'select') {
        return new SelectValueObserver(obj, handler, this);
      }
      if (propertyName === 'checked' && obj.tagName.toLowerCase() === 'input') {
        return new CheckedObserver(obj, handler, this);
      }
      if (handler) {
        return new ValueAttributeObserver(obj, propertyName, handler);
      }
      xlinkResult = /^xlink:(.+)$/.exec(propertyName);
      if (xlinkResult) {
        return new XLinkAttributeObserver(obj, propertyName, xlinkResult[1]);
      }
      if (propertyName === 'role' && (obj instanceof _aureliaPal.DOM.Element || obj instanceof _aureliaPal.DOM.SVGElement) || /^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof _aureliaPal.DOM.SVGElement && this.svgAnalyzer.isStandardSvgAttribute(obj.nodeName, propertyName)) {
        return new DataAttributeObserver(obj, propertyName);
      }
    }

    descriptor = Object.getPropertyDescriptor(obj, propertyName);

    if (hasDeclaredDependencies(descriptor)) {
      return createComputedObserver(obj, propertyName, descriptor, this);
    }

    if (descriptor) {
      var existingGetterOrSetter = descriptor.get || descriptor.set;
      if (existingGetterOrSetter) {
        if (existingGetterOrSetter.getObserver) {
          return existingGetterOrSetter.getObserver(obj);
        }

        var adapterObserver = this.getAdapterObserver(obj, propertyName, descriptor);
        if (adapterObserver) {
          return adapterObserver;
        }
        return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
      }
    }

    if (obj instanceof Array) {
      if (propertyName === 'length') {
        return this.getArrayObserver(obj).getLengthObserver();
      }

      return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
    } else if (obj instanceof Map) {
      if (propertyName === 'size') {
        return this.getMapObserver(obj).getLengthObserver();
      }

      return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
    } else if (obj instanceof Set) {
      if (propertyName === 'size') {
        return this.getSetObserver(obj).getLengthObserver();
      }

      return new DirtyCheckProperty(this.dirtyChecker, obj, propertyName);
    }

    return new SetterObserver(this.taskQueue, obj, propertyName);
  };

  ObserverLocator.prototype.getAccessor = function getAccessor(obj, propertyName) {
    if (obj instanceof _aureliaPal.DOM.Element) {
      if (propertyName === 'class' || propertyName === 'style' || propertyName === 'css' || propertyName === 'value' && (obj.tagName.toLowerCase() === 'input' || obj.tagName.toLowerCase() === 'select') || propertyName === 'checked' && obj.tagName.toLowerCase() === 'input' || propertyName === 'model' && obj.tagName.toLowerCase() === 'input' || /^xlink:.+$/.exec(propertyName)) {
        return this.getObserver(obj, propertyName);
      }
      if (/^\w+:|^data-|^aria-/.test(propertyName) || obj instanceof _aureliaPal.DOM.SVGElement && this.svgAnalyzer.isStandardSvgAttribute(obj.nodeName, propertyName)) {
        return dataAttributeAccessor;
      }
    }
    return propertyAccessor;
  };

  ObserverLocator.prototype.getArrayObserver = function getArrayObserver(array) {
    return _getArrayObserver(this.taskQueue, array);
  };

  ObserverLocator.prototype.getMapObserver = function getMapObserver(map) {
    return _getMapObserver(this.taskQueue, map);
  };

  ObserverLocator.prototype.getSetObserver = function getSetObserver(set) {
    return _getSetObserver(this.taskQueue, set);
  };

  return ObserverLocator;
}(), _class11.inject = [_aureliaTaskQueue.TaskQueue, EventManager, DirtyChecker, SVGAnalyzer, Parser], _temp);

var ObjectObservationAdapter = exports.ObjectObservationAdapter = function () {
  function ObjectObservationAdapter() {
    
  }

  ObjectObservationAdapter.prototype.getObserver = function getObserver(object, propertyName, descriptor) {
    throw new Error('BindingAdapters must implement getObserver(object, propertyName).');
  };

  return ObjectObservationAdapter;
}();

var BindingExpression = exports.BindingExpression = function () {
  function BindingExpression(observerLocator, targetProperty, sourceExpression, mode, lookupFunctions, attribute) {
    

    this.observerLocator = observerLocator;
    this.targetProperty = targetProperty;
    this.sourceExpression = sourceExpression;
    this.mode = mode;
    this.lookupFunctions = lookupFunctions;
    this.attribute = attribute;
    this.discrete = false;
  }

  BindingExpression.prototype.createBinding = function createBinding(target) {
    return new Binding(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.mode, this.lookupFunctions);
  };

  return BindingExpression;
}();

var targetContext = 'Binding:target';

var Binding = exports.Binding = (_dec10 = connectable(), _dec10(_class12 = function () {
  function Binding(observerLocator, sourceExpression, target, targetProperty, mode, lookupFunctions) {
    

    this.observerLocator = observerLocator;
    this.sourceExpression = sourceExpression;
    this.target = target;
    this.targetProperty = targetProperty;
    this.mode = mode;
    this.lookupFunctions = lookupFunctions;
  }

  Binding.prototype.updateTarget = function updateTarget(value) {
    this.targetObserver.setValue(value, this.target, this.targetProperty);
  };

  Binding.prototype.updateSource = function updateSource(value) {
    this.sourceExpression.assign(this.source, value, this.lookupFunctions);
  };

  Binding.prototype.call = function call(context, newValue, oldValue) {
    if (!this.isBound) {
      return;
    }
    if (context === sourceContext) {
      oldValue = this.targetObserver.getValue(this.target, this.targetProperty);
      newValue = this.sourceExpression.evaluate(this.source, this.lookupFunctions);
      if (newValue !== oldValue) {
        this.updateTarget(newValue);
      }
      if (this.mode !== bindingMode.oneTime) {
        this._version++;
        this.sourceExpression.connect(this, this.source);
        this.unobserve(false);
      }
      return;
    }
    if (context === targetContext) {
      if (newValue !== this.sourceExpression.evaluate(this.source, this.lookupFunctions)) {
        this.updateSource(newValue);
      }
      return;
    }
    throw new Error('Unexpected call context ' + context);
  };

  Binding.prototype.bind = function bind(source) {
    if (this.isBound) {
      if (this.source === source) {
        return;
      }
      this.unbind();
    }
    this.isBound = true;
    this.source = source;

    if (this.sourceExpression.bind) {
      this.sourceExpression.bind(this, source, this.lookupFunctions);
    }

    var mode = this.mode;
    if (!this.targetObserver) {
      var method = mode === bindingMode.twoWay ? 'getObserver' : 'getAccessor';
      this.targetObserver = this.observerLocator[method](this.target, this.targetProperty);
    }

    if ('bind' in this.targetObserver) {
      this.targetObserver.bind();
    }
    var value = this.sourceExpression.evaluate(source, this.lookupFunctions);
    this.updateTarget(value);

    if (mode === bindingMode.oneWay) {
      enqueueBindingConnect(this);
    } else if (mode === bindingMode.twoWay) {
      this.sourceExpression.connect(this, source);
      this.targetObserver.subscribe(targetContext, this);
    }
  };

  Binding.prototype.unbind = function unbind() {
    if (!this.isBound) {
      return;
    }
    this.isBound = false;
    if (this.sourceExpression.unbind) {
      this.sourceExpression.unbind(this, this.source);
    }
    this.source = null;
    if ('unbind' in this.targetObserver) {
      this.targetObserver.unbind();
    }
    if (this.targetObserver.unsubscribe) {
      this.targetObserver.unsubscribe(targetContext, this);
    }
    this.unobserve(true);
  };

  Binding.prototype.connect = function connect(evaluate) {
    if (!this.isBound) {
      return;
    }
    if (evaluate) {
      var value = this.sourceExpression.evaluate(this.source, this.lookupFunctions);
      this.updateTarget(value);
    }
    this.sourceExpression.connect(this, this.source);
  };

  return Binding;
}()) || _class12);

var CallExpression = exports.CallExpression = function () {
  function CallExpression(observerLocator, targetProperty, sourceExpression, lookupFunctions) {
    

    this.observerLocator = observerLocator;
    this.targetProperty = targetProperty;
    this.sourceExpression = sourceExpression;
    this.lookupFunctions = lookupFunctions;
  }

  CallExpression.prototype.createBinding = function createBinding(target) {
    return new Call(this.observerLocator, this.sourceExpression, target, this.targetProperty, this.lookupFunctions);
  };

  return CallExpression;
}();

var Call = exports.Call = function () {
  function Call(observerLocator, sourceExpression, target, targetProperty, lookupFunctions) {
    

    this.sourceExpression = sourceExpression;
    this.target = target;
    this.targetProperty = observerLocator.getObserver(target, targetProperty);
    this.lookupFunctions = lookupFunctions;
  }

  Call.prototype.callSource = function callSource($event) {
    var overrideContext = this.source.overrideContext;
    Object.assign(overrideContext, $event);
    overrideContext.$event = $event;
    var mustEvaluate = true;
    var result = this.sourceExpression.evaluate(this.source, this.lookupFunctions, mustEvaluate);
    delete overrideContext.$event;
    for (var prop in $event) {
      delete overrideContext[prop];
    }
    return result;
  };

  Call.prototype.bind = function bind(source) {
    var _this27 = this;

    if (this.isBound) {
      if (this.source === source) {
        return;
      }
      this.unbind();
    }
    this.isBound = true;
    this.source = source;

    if (this.sourceExpression.bind) {
      this.sourceExpression.bind(this, source, this.lookupFunctions);
    }
    this.targetProperty.setValue(function ($event) {
      return _this27.callSource($event);
    });
  };

  Call.prototype.unbind = function unbind() {
    if (!this.isBound) {
      return;
    }
    this.isBound = false;
    if (this.sourceExpression.unbind) {
      this.sourceExpression.unbind(this, this.source);
    }
    this.source = null;
    this.targetProperty.setValue(null);
  };

  return Call;
}();

var ValueConverterResource = exports.ValueConverterResource = function () {
  function ValueConverterResource(name) {
    

    this.name = name;
  }

  ValueConverterResource.convention = function convention(name) {
    if (name.endsWith('ValueConverter')) {
      return new ValueConverterResource(camelCase(name.substring(0, name.length - 14)));
    }
  };

  ValueConverterResource.prototype.initialize = function initialize(container, target) {
    this.instance = container.get(target);
  };

  ValueConverterResource.prototype.register = function register(registry, name) {
    registry.registerValueConverter(name || this.name, this.instance);
  };

  ValueConverterResource.prototype.load = function load(container, target) {};

  return ValueConverterResource;
}();

function valueConverter(nameOrTarget) {
  if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
    return function (target) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ValueConverterResource(nameOrTarget), target);
    };
  }

  _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ValueConverterResource(), nameOrTarget);
}

var BindingBehaviorResource = exports.BindingBehaviorResource = function () {
  function BindingBehaviorResource(name) {
    

    this.name = name;
  }

  BindingBehaviorResource.convention = function convention(name) {
    if (name.endsWith('BindingBehavior')) {
      return new BindingBehaviorResource(camelCase(name.substring(0, name.length - 15)));
    }
  };

  BindingBehaviorResource.prototype.initialize = function initialize(container, target) {
    this.instance = container.get(target);
  };

  BindingBehaviorResource.prototype.register = function register(registry, name) {
    registry.registerBindingBehavior(name || this.name, this.instance);
  };

  BindingBehaviorResource.prototype.load = function load(container, target) {};

  return BindingBehaviorResource;
}();

function bindingBehavior(nameOrTarget) {
  if (nameOrTarget === undefined || typeof nameOrTarget === 'string') {
    return function (target) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new BindingBehaviorResource(nameOrTarget), target);
    };
  }

  _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new BindingBehaviorResource(), nameOrTarget);
}

var ListenerExpression = exports.ListenerExpression = function () {
  function ListenerExpression(eventManager, targetEvent, sourceExpression, delegationStrategy, preventDefault, lookupFunctions) {
    

    this.eventManager = eventManager;
    this.targetEvent = targetEvent;
    this.sourceExpression = sourceExpression;
    this.delegationStrategy = delegationStrategy;
    this.discrete = true;
    this.preventDefault = preventDefault;
    this.lookupFunctions = lookupFunctions;
  }

  ListenerExpression.prototype.createBinding = function createBinding(target) {
    return new Listener(this.eventManager, this.targetEvent, this.delegationStrategy, this.sourceExpression, target, this.preventDefault, this.lookupFunctions);
  };

  return ListenerExpression;
}();

var Listener = exports.Listener = function () {
  function Listener(eventManager, targetEvent, delegationStrategy, sourceExpression, target, preventDefault, lookupFunctions) {
    

    this.eventManager = eventManager;
    this.targetEvent = targetEvent;
    this.delegationStrategy = delegationStrategy;
    this.sourceExpression = sourceExpression;
    this.target = target;
    this.preventDefault = preventDefault;
    this.lookupFunctions = lookupFunctions;
  }

  Listener.prototype.callSource = function callSource(event) {
    var overrideContext = this.source.overrideContext;
    overrideContext.$event = event;
    var mustEvaluate = true;
    var result = this.sourceExpression.evaluate(this.source, this.lookupFunctions, mustEvaluate);
    delete overrideContext.$event;
    if (result !== true && this.preventDefault) {
      event.preventDefault();
    }
    return result;
  };

  Listener.prototype.bind = function bind(source) {
    var _this28 = this;

    if (this.isBound) {
      if (this.source === source) {
        return;
      }
      this.unbind();
    }
    this.isBound = true;
    this.source = source;

    if (this.sourceExpression.bind) {
      this.sourceExpression.bind(this, source, this.lookupFunctions);
    }
    this._disposeListener = this.eventManager.addEventListener(this.target, this.targetEvent, function (event) {
      return _this28.callSource(event);
    }, this.delegationStrategy);
  };

  Listener.prototype.unbind = function unbind() {
    if (!this.isBound) {
      return;
    }
    this.isBound = false;
    if (this.sourceExpression.unbind) {
      this.sourceExpression.unbind(this, this.source);
    }
    this.source = null;
    this._disposeListener();
    this._disposeListener = null;
  };

  return Listener;
}();

function getAU(element) {
  var au = element.au;

  if (au === undefined) {
    throw new Error('No Aurelia APIs are defined for the element: "' + element.tagName + '".');
  }

  return au;
}

var NameExpression = exports.NameExpression = function () {
  function NameExpression(sourceExpression, apiName, lookupFunctions) {
    

    this.sourceExpression = sourceExpression;
    this.apiName = apiName;
    this.lookupFunctions = lookupFunctions;
    this.discrete = true;
  }

  NameExpression.prototype.createBinding = function createBinding(target) {
    return new NameBinder(this.sourceExpression, NameExpression.locateAPI(target, this.apiName), this.lookupFunctions);
  };

  NameExpression.locateAPI = function locateAPI(element, apiName) {
    switch (apiName) {
      case 'element':
        return element;
      case 'controller':
        return getAU(element).controller;
      case 'view-model':
        return getAU(element).controller.viewModel;
      case 'view':
        return getAU(element).controller.view;
      default:
        var target = getAU(element)[apiName];

        if (target === undefined) {
          throw new Error('Attempted to reference "' + apiName + '", but it was not found amongst the target\'s API.');
        }

        return target.viewModel;
    }
  };

  return NameExpression;
}();

var NameBinder = function () {
  function NameBinder(sourceExpression, target, lookupFunctions) {
    

    this.sourceExpression = sourceExpression;
    this.target = target;
    this.lookupFunctions = lookupFunctions;
  }

  NameBinder.prototype.bind = function bind(source) {
    if (this.isBound) {
      if (this.source === source) {
        return;
      }
      this.unbind();
    }
    this.isBound = true;
    this.source = source;
    if (this.sourceExpression.bind) {
      this.sourceExpression.bind(this, source, this.lookupFunctions);
    }
    this.sourceExpression.assign(this.source, this.target, this.lookupFunctions);
  };

  NameBinder.prototype.unbind = function unbind() {
    if (!this.isBound) {
      return;
    }
    this.isBound = false;
    if (this.sourceExpression.evaluate(this.source, this.lookupFunctions) === this.target) {
      this.sourceExpression.assign(this.source, null, this.lookupFunctions);
    }
    if (this.sourceExpression.unbind) {
      this.sourceExpression.unbind(this, this.source);
    }
    this.source = null;
  };

  return NameBinder;
}();

var LookupFunctions = {
  bindingBehaviors: function bindingBehaviors(name) {
    return null;
  },
  valueConverters: function valueConverters(name) {
    return null;
  }
};

var BindingEngine = exports.BindingEngine = (_temp2 = _class13 = function () {
  function BindingEngine(observerLocator, parser) {
    

    this.observerLocator = observerLocator;
    this.parser = parser;
  }

  BindingEngine.prototype.createBindingExpression = function createBindingExpression(targetProperty, sourceExpression) {
    var mode = arguments.length <= 2 || arguments[2] === undefined ? bindingMode.oneWay : arguments[2];
    var lookupFunctions = arguments.length <= 3 || arguments[3] === undefined ? LookupFunctions : arguments[3];

    return new BindingExpression(this.observerLocator, targetProperty, this.parser.parse(sourceExpression), mode, lookupFunctions);
  };

  BindingEngine.prototype.propertyObserver = function propertyObserver(obj, propertyName) {
    var _this29 = this;

    return {
      subscribe: function subscribe(callback) {
        var observer = _this29.observerLocator.getObserver(obj, propertyName);
        observer.subscribe(callback);
        return {
          dispose: function dispose() {
            return observer.unsubscribe(callback);
          }
        };
      }
    };
  };

  BindingEngine.prototype.collectionObserver = function collectionObserver(collection) {
    var _this30 = this;

    return {
      subscribe: function subscribe(callback) {
        var observer = void 0;
        if (collection instanceof Array) {
          observer = _this30.observerLocator.getArrayObserver(collection);
        } else if (collection instanceof Map) {
          observer = _this30.observerLocator.getMapObserver(collection);
        } else if (collection instanceof Set) {
          observer = _this30.observerLocator.getSetObserver(collection);
        } else {
          throw new Error('collection must be an instance of Array, Map or Set.');
        }
        observer.subscribe(callback);
        return {
          dispose: function dispose() {
            return observer.unsubscribe(callback);
          }
        };
      }
    };
  };

  BindingEngine.prototype.expressionObserver = function expressionObserver(bindingContext, expression) {
    var scope = { bindingContext: bindingContext, overrideContext: createOverrideContext(bindingContext) };
    return new ExpressionObserver(scope, this.parser.parse(expression), this.observerLocator, LookupFunctions);
  };

  BindingEngine.prototype.parseExpression = function parseExpression(expression) {
    return this.parser.parse(expression);
  };

  BindingEngine.prototype.registerAdapter = function registerAdapter(adapter) {
    this.observerLocator.addAdapter(adapter);
  };

  return BindingEngine;
}(), _class13.inject = [ObserverLocator, Parser], _temp2);


var setProto = Set.prototype;

function _getSetObserver(taskQueue, set) {
  return ModifySetObserver.for(taskQueue, set);
}

exports.getSetObserver = _getSetObserver;

var ModifySetObserver = function (_ModifyCollectionObse3) {
  _inherits(ModifySetObserver, _ModifyCollectionObse3);

  function ModifySetObserver(taskQueue, set) {
    

    return _possibleConstructorReturn(this, _ModifyCollectionObse3.call(this, taskQueue, set));
  }

  ModifySetObserver.for = function _for(taskQueue, set) {
    if (!('__set_observer__' in set)) {
      Reflect.defineProperty(set, '__set_observer__', {
        value: ModifySetObserver.create(taskQueue, set),
        enumerable: false, configurable: false
      });
    }
    return set.__set_observer__;
  };

  ModifySetObserver.create = function create(taskQueue, set) {
    var observer = new ModifySetObserver(taskQueue, set);

    var proto = setProto;
    if (proto.add !== set.add || proto.delete !== set.delete || proto.clear !== set.clear) {
      proto = {
        add: set.add,
        delete: set.delete,
        clear: set.clear
      };
    }

    set.add = function () {
      var type = 'add';
      var oldSize = set.size;
      var methodCallResult = proto.add.apply(set, arguments);
      var hasValue = set.size === oldSize;
      if (!hasValue) {
        observer.addChangeRecord({
          type: type,
          object: set,
          value: Array.from(set).pop()
        });
      }
      return methodCallResult;
    };

    set.delete = function () {
      var hasValue = set.has(arguments[0]);
      var methodCallResult = proto.delete.apply(set, arguments);
      if (hasValue) {
        observer.addChangeRecord({
          type: 'delete',
          object: set,
          value: arguments[0]
        });
      }
      return methodCallResult;
    };

    set.clear = function () {
      var methodCallResult = proto.clear.apply(set, arguments);
      observer.addChangeRecord({
        type: 'clear',
        object: set
      });
      return methodCallResult;
    };

    return observer;
  };

  return ModifySetObserver;
}(ModifyCollectionObserver);

function observable(targetOrConfig, key, descriptor) {
  function deco(target, key, descriptor, config) {
    var isClassDecorator = key === undefined;
    if (isClassDecorator) {
      target = target.prototype;
      key = typeof config === 'string' ? config : config.name;
    }

    var innerPropertyName = '_' + key;
    var innerPropertyDescriptor = {
      configurable: true,
      enumerable: false,
      writable: true
    };

    var callbackName = config && config.changeHandler || key + 'Changed';

    if (descriptor) {
      if (typeof descriptor.initializer === 'function') {
        innerPropertyDescriptor.value = descriptor.initializer();
      }
    } else {
      descriptor = {};
    }

    if (!('enumerable' in descriptor)) {
      descriptor.enumerable = true;
    }

    delete descriptor.value;
    delete descriptor.writable;
    delete descriptor.initializer;

    Reflect.defineProperty(target, innerPropertyName, innerPropertyDescriptor);

    descriptor.get = function () {
      return this[innerPropertyName];
    };
    descriptor.set = function (newValue) {
      var oldValue = this[innerPropertyName];
      if (newValue === oldValue) {
        return;
      }

      this[innerPropertyName] = newValue;
      Reflect.defineProperty(this, innerPropertyName, { enumerable: false });

      if (this[callbackName]) {
        this[callbackName](newValue, oldValue, key);
      }
    };

    descriptor.get.dependencies = [innerPropertyName];

    if (isClassDecorator) {
      Reflect.defineProperty(target, key, descriptor);
    } else {
      return descriptor;
    }
  }

  if (key === undefined) {
    return function (t, k, d) {
      return deco(t, k, d, targetOrConfig);
    };
  }
  return deco(targetOrConfig, key, descriptor);
}
});
return ___scope___.entry = "dist/commonjs/aurelia-binding.js";
});
FuseBox.pkg("aurelia-logging", {}, function(___scope___){
___scope___.file("dist/commonjs/aurelia-logging.js", function(exports, require, module, __filename, __dirname){ 

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogger = getLogger;
exports.addAppender = addAppender;
exports.setLevel = setLevel;
exports.getLevel = getLevel;



var logLevel = exports.logLevel = {
  none: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4
};

var loggers = {};
var appenders = [];
var slice = Array.prototype.slice;
var loggerConstructionKey = {};
var globalDefaultLevel = logLevel.none;

function log(logger, level, args) {
  var i = appenders.length;
  var current = void 0;

  args = slice.call(args);
  args.unshift(logger);

  while (i--) {
    current = appenders[i];
    current[level].apply(current, args);
  }
}

function debug() {
  if (this.level < 4) {
    return;
  }

  log(this, 'debug', arguments);
}

function info() {
  if (this.level < 3) {
    return;
  }

  log(this, 'info', arguments);
}

function warn() {
  if (this.level < 2) {
    return;
  }

  log(this, 'warn', arguments);
}

function error() {
  if (this.level < 1) {
    return;
  }

  log(this, 'error', arguments);
}

function connectLogger(logger) {
  logger.debug = debug;
  logger.info = info;
  logger.warn = warn;
  logger.error = error;
}

function createLogger(id) {
  var logger = new Logger(id, loggerConstructionKey);
  logger.setLevel(globalDefaultLevel);

  if (appenders.length) {
    connectLogger(logger);
  }

  return logger;
}

function getLogger(id) {
  return loggers[id] || (loggers[id] = createLogger(id));
}

function addAppender(appender) {
  appenders.push(appender);

  if (appenders.length === 1) {
    for (var key in loggers) {
      connectLogger(loggers[key]);
    }
  }
}

function setLevel(level) {
  globalDefaultLevel = level;
  for (var key in loggers) {
    loggers[key].setLevel(level);
  }
}

function getLevel() {
  return globalDefaultLevel;
}

var Logger = exports.Logger = function () {
  function Logger(id, key) {
    

    this.level = logLevel.none;

    if (key !== loggerConstructionKey) {
      throw new Error('Cannot instantiate "Logger". Use "getLogger" instead.');
    }

    this.id = id;
  }

  Logger.prototype.debug = function debug(message) {};

  Logger.prototype.info = function info(message) {};

  Logger.prototype.warn = function warn(message) {};

  Logger.prototype.error = function error(message) {};

  Logger.prototype.setLevel = function setLevel(level) {
    this.level = level;
  };

  return Logger;
}();
});
return ___scope___.entry = "dist/commonjs/aurelia-logging.js";
});
FuseBox.pkg("aurelia-task-queue", {}, function(___scope___){
___scope___.file("dist/commonjs/aurelia-task-queue.js", function(exports, require, module, __filename, __dirname){ 

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskQueue = undefined;

var _aureliaPal = require('aurelia-pal');



var hasSetImmediate = typeof setImmediate === 'function';

function makeRequestFlushFromMutationObserver(flush) {
  var toggle = 1;
  var observer = _aureliaPal.DOM.createMutationObserver(flush);
  var node = _aureliaPal.DOM.createTextNode('');
  observer.observe(node, { characterData: true });
  return function requestFlush() {
    toggle = -toggle;
    node.data = toggle;
  };
}

function makeRequestFlushFromTimer(flush) {
  return function requestFlush() {
    var timeoutHandle = setTimeout(handleFlushTimer, 0);

    var intervalHandle = setInterval(handleFlushTimer, 50);
    function handleFlushTimer() {
      clearTimeout(timeoutHandle);
      clearInterval(intervalHandle);
      flush();
    }
  };
}

function onError(error, task) {
  if ('onError' in task) {
    task.onError(error);
  } else if (hasSetImmediate) {
    setImmediate(function () {
      throw error;
    });
  } else {
    setTimeout(function () {
      throw error;
    }, 0);
  }
}

var TaskQueue = exports.TaskQueue = function () {
  function TaskQueue() {
    var _this = this;

    

    this.flushing = false;

    this.microTaskQueue = [];
    this.microTaskQueueCapacity = 1024;
    this.taskQueue = [];

    if (_aureliaPal.FEATURE.mutationObserver) {
      this.requestFlushMicroTaskQueue = makeRequestFlushFromMutationObserver(function () {
        return _this.flushMicroTaskQueue();
      });
    } else {
      this.requestFlushMicroTaskQueue = makeRequestFlushFromTimer(function () {
        return _this.flushMicroTaskQueue();
      });
    }

    this.requestFlushTaskQueue = makeRequestFlushFromTimer(function () {
      return _this.flushTaskQueue();
    });
  }

  TaskQueue.prototype.queueMicroTask = function queueMicroTask(task) {
    if (this.microTaskQueue.length < 1) {
      this.requestFlushMicroTaskQueue();
    }

    this.microTaskQueue.push(task);
  };

  TaskQueue.prototype.queueTask = function queueTask(task) {
    if (this.taskQueue.length < 1) {
      this.requestFlushTaskQueue();
    }

    this.taskQueue.push(task);
  };

  TaskQueue.prototype.flushTaskQueue = function flushTaskQueue() {
    var queue = this.taskQueue;
    var index = 0;
    var task = void 0;

    this.taskQueue = [];

    try {
      this.flushing = true;
      while (index < queue.length) {
        task = queue[index];
        task.call();
        index++;
      }
    } catch (error) {
      onError(error, task);
    } finally {
      this.flushing = false;
    }
  };

  TaskQueue.prototype.flushMicroTaskQueue = function flushMicroTaskQueue() {
    var queue = this.microTaskQueue;
    var capacity = this.microTaskQueueCapacity;
    var index = 0;
    var task = void 0;

    try {
      this.flushing = true;
      while (index < queue.length) {
        task = queue[index];
        task.call();
        index++;

        if (index > capacity) {
          for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
            queue[scan] = queue[scan + index];
          }

          queue.length -= index;
          index = 0;
        }
      }
    } catch (error) {
      onError(error, task);
    } finally {
      this.flushing = false;
    }

    queue.length = 0;
  };

  return TaskQueue;
}();
});
return ___scope___.entry = "dist/commonjs/aurelia-task-queue.js";
});
FuseBox.pkg("aurelia-templating", {}, function(___scope___){
___scope___.file("dist/commonjs/aurelia-templating.js", function(exports, require, module, __filename, __dirname){ 

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplatingEngine = exports.ElementConfigResource = exports.CompositionEngine = exports.HtmlBehaviorResource = exports.BindableProperty = exports.BehaviorPropertyObserver = exports.Controller = exports.ViewEngine = exports.ModuleAnalyzer = exports.ResourceDescription = exports.ResourceModule = exports.ViewCompiler = exports.ViewFactory = exports.BoundViewFactory = exports.ViewSlot = exports.View = exports.ViewResources = exports.ShadowDOM = exports.ShadowSlot = exports.PassThroughSlot = exports.SlotCustomAttribute = exports.BindingLanguage = exports.ViewLocator = exports.InlineViewStrategy = exports.TemplateRegistryViewStrategy = exports.NoViewStrategy = exports.ConventionalViewStrategy = exports.RelativeViewStrategy = exports.viewStrategy = exports.TargetInstruction = exports.BehaviorInstruction = exports.ViewCompileInstruction = exports.ResourceLoadContext = exports.ElementEvents = exports.ViewEngineHooksResource = exports.CompositionTransaction = exports.CompositionTransactionOwnershipToken = exports.CompositionTransactionNotifier = exports.Animator = exports.animationEvent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _dec, _class2, _dec2, _class3, _dec3, _class4, _dec4, _class5, _dec5, _class6, _class7, _temp2, _dec6, _class8, _class9, _temp3, _class11, _dec7, _class13, _dec8, _class14, _class15, _temp4, _dec9, _class16, _dec10, _class17, _dec11, _class18;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports._hyphenate = _hyphenate;
exports._isAllWhitespace = _isAllWhitespace;
exports.viewEngineHooks = viewEngineHooks;
exports.children = children;
exports.child = child;
exports.resource = resource;
exports.behavior = behavior;
exports.customElement = customElement;
exports.customAttribute = customAttribute;
exports.templateController = templateController;
exports.bindable = bindable;
exports.dynamicOptions = dynamicOptions;
exports.useShadowDOM = useShadowDOM;
exports.processAttributes = processAttributes;
exports.processContent = processContent;
exports.containerless = containerless;
exports.useViewStrategy = useViewStrategy;
exports.useView = useView;
exports.inlineView = inlineView;
exports.noView = noView;
exports.elementConfig = elementConfig;
exports.viewResources = viewResources;

var _aureliaLogging = require('aurelia-logging');

var LogManager = _interopRequireWildcard(_aureliaLogging);

var _aureliaMetadata = require('aurelia-metadata');

var _aureliaPal = require('aurelia-pal');

var _aureliaPath = require('aurelia-path');

var _aureliaLoader = require('aurelia-loader');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaBinding = require('aurelia-binding');

var _aureliaTaskQueue = require('aurelia-task-queue');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }



var animationEvent = exports.animationEvent = {
  enterBegin: 'animation:enter:begin',
  enterActive: 'animation:enter:active',
  enterDone: 'animation:enter:done',
  enterTimeout: 'animation:enter:timeout',

  leaveBegin: 'animation:leave:begin',
  leaveActive: 'animation:leave:active',
  leaveDone: 'animation:leave:done',
  leaveTimeout: 'animation:leave:timeout',

  staggerNext: 'animation:stagger:next',

  removeClassBegin: 'animation:remove-class:begin',
  removeClassActive: 'animation:remove-class:active',
  removeClassDone: 'animation:remove-class:done',
  removeClassTimeout: 'animation:remove-class:timeout',

  addClassBegin: 'animation:add-class:begin',
  addClassActive: 'animation:add-class:active',
  addClassDone: 'animation:add-class:done',
  addClassTimeout: 'animation:add-class:timeout',

  animateBegin: 'animation:animate:begin',
  animateActive: 'animation:animate:active',
  animateDone: 'animation:animate:done',
  animateTimeout: 'animation:animate:timeout',

  sequenceBegin: 'animation:sequence:begin',
  sequenceDone: 'animation:sequence:done'
};

var Animator = exports.Animator = function () {
  function Animator() {
    
  }

  Animator.prototype.enter = function enter(element) {
    return Promise.resolve(false);
  };

  Animator.prototype.leave = function leave(element) {
    return Promise.resolve(false);
  };

  Animator.prototype.removeClass = function removeClass(element, className) {
    element.classList.remove(className);
    return Promise.resolve(false);
  };

  Animator.prototype.addClass = function addClass(element, className) {
    element.classList.add(className);
    return Promise.resolve(false);
  };

  Animator.prototype.animate = function animate(element, className) {
    return Promise.resolve(false);
  };

  Animator.prototype.runSequence = function runSequence(animations) {};

  Animator.prototype.registerEffect = function registerEffect(effectName, properties) {};

  Animator.prototype.unregisterEffect = function unregisterEffect(effectName) {};

  return Animator;
}();

var CompositionTransactionNotifier = exports.CompositionTransactionNotifier = function () {
  function CompositionTransactionNotifier(owner) {
    

    this.owner = owner;
    this.owner._compositionCount++;
  }

  CompositionTransactionNotifier.prototype.done = function done() {
    this.owner._compositionCount--;
    this.owner._tryCompleteTransaction();
  };

  return CompositionTransactionNotifier;
}();

var CompositionTransactionOwnershipToken = exports.CompositionTransactionOwnershipToken = function () {
  function CompositionTransactionOwnershipToken(owner) {
    

    this.owner = owner;
    this.owner._ownershipToken = this;
    this.thenable = this._createThenable();
  }

  CompositionTransactionOwnershipToken.prototype.waitForCompositionComplete = function waitForCompositionComplete() {
    this.owner._tryCompleteTransaction();
    return this.thenable;
  };

  CompositionTransactionOwnershipToken.prototype.resolve = function resolve() {
    this._resolveCallback();
  };

  CompositionTransactionOwnershipToken.prototype._createThenable = function _createThenable() {
    var _this = this;

    return new Promise(function (resolve, reject) {
      _this._resolveCallback = resolve;
    });
  };

  return CompositionTransactionOwnershipToken;
}();

var CompositionTransaction = exports.CompositionTransaction = function () {
  function CompositionTransaction() {
    

    this._ownershipToken = null;
    this._compositionCount = 0;
  }

  CompositionTransaction.prototype.tryCapture = function tryCapture() {
    return this._ownershipToken === null ? new CompositionTransactionOwnershipToken(this) : null;
  };

  CompositionTransaction.prototype.enlist = function enlist() {
    return new CompositionTransactionNotifier(this);
  };

  CompositionTransaction.prototype._tryCompleteTransaction = function _tryCompleteTransaction() {
    if (this._compositionCount <= 0) {
      this._compositionCount = 0;

      if (this._ownershipToken !== null) {
        var token = this._ownershipToken;
        this._ownershipToken = null;
        token.resolve();
      }
    }
  };

  return CompositionTransaction;
}();

var capitalMatcher = /([A-Z])/g;

function addHyphenAndLower(char) {
  return '-' + char.toLowerCase();
}

function _hyphenate(name) {
  return (name.charAt(0).toLowerCase() + name.slice(1)).replace(capitalMatcher, addHyphenAndLower);
}

function _isAllWhitespace(node) {
  return !(node.auInterpolationTarget || /[^\t\n\r ]/.test(node.textContent));
}

var ViewEngineHooksResource = exports.ViewEngineHooksResource = function () {
  function ViewEngineHooksResource() {
    
  }

  ViewEngineHooksResource.prototype.initialize = function initialize(container, target) {
    this.instance = container.get(target);
  };

  ViewEngineHooksResource.prototype.register = function register(registry, name) {
    registry.registerViewEngineHooks(this.instance);
  };

  ViewEngineHooksResource.prototype.load = function load(container, target) {};

  ViewEngineHooksResource.convention = function convention(name) {
    if (name.endsWith('ViewEngineHooks')) {
      return new ViewEngineHooksResource();
    }
  };

  return ViewEngineHooksResource;
}();

function viewEngineHooks(target) {
  var deco = function deco(t) {
    _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ViewEngineHooksResource(), t);
  };

  return target ? deco(target) : deco;
}

var ElementEvents = exports.ElementEvents = function () {
  function ElementEvents(element) {
    

    this.element = element;
    this.subscriptions = {};
  }

  ElementEvents.prototype._enqueueHandler = function _enqueueHandler(handler) {
    this.subscriptions[handler.eventName] = this.subscriptions[handler.eventName] || [];
    this.subscriptions[handler.eventName].push(handler);
  };

  ElementEvents.prototype._dequeueHandler = function _dequeueHandler(handler) {
    var index = void 0;
    var subscriptions = this.subscriptions[handler.eventName];
    if (subscriptions) {
      index = subscriptions.indexOf(handler);
      if (index > -1) {
        subscriptions.splice(index, 1);
      }
    }
    return handler;
  };

  ElementEvents.prototype.publish = function publish(eventName) {
    var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var cancelable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    var event = _aureliaPal.DOM.createCustomEvent(eventName, { cancelable: cancelable, bubbles: bubbles, detail: detail });
    this.element.dispatchEvent(event);
  };

  ElementEvents.prototype.subscribe = function subscribe(eventName, handler) {
    var _this2 = this;

    var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (handler && typeof handler === 'function') {
      handler.eventName = eventName;
      handler.handler = handler;
      handler.bubbles = bubbles;
      handler.dispose = function () {
        _this2.element.removeEventListener(eventName, handler, bubbles);
        _this2._dequeueHandler(handler);
      };
      this.element.addEventListener(eventName, handler, bubbles);
      this._enqueueHandler(handler);
      return handler;
    }

    return undefined;
  };

  ElementEvents.prototype.subscribeOnce = function subscribeOnce(eventName, handler) {
    var _this3 = this;

    var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (handler && typeof handler === 'function') {
      var _ret = function () {
        var _handler = function _handler(event) {
          handler(event);
          _handler.dispose();
        };
        return {
          v: _this3.subscribe(eventName, _handler, bubbles)
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }

    return undefined;
  };

  ElementEvents.prototype.dispose = function dispose(eventName) {
    if (eventName && typeof eventName === 'string') {
      var subscriptions = this.subscriptions[eventName];
      if (subscriptions) {
        while (subscriptions.length) {
          var subscription = subscriptions.pop();
          if (subscription) {
            subscription.dispose();
          }
        }
      }
    } else {
      this.disposeAll();
    }
  };

  ElementEvents.prototype.disposeAll = function disposeAll() {
    for (var key in this.subscriptions) {
      this.dispose(key);
    }
  };

  return ElementEvents;
}();

var ResourceLoadContext = exports.ResourceLoadContext = function () {
  function ResourceLoadContext() {
    

    this.dependencies = {};
  }

  ResourceLoadContext.prototype.addDependency = function addDependency(url) {
    this.dependencies[url] = true;
  };

  ResourceLoadContext.prototype.hasDependency = function hasDependency(url) {
    return url in this.dependencies;
  };

  return ResourceLoadContext;
}();

var ViewCompileInstruction = exports.ViewCompileInstruction = function ViewCompileInstruction() {
  var targetShadowDOM = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var compileSurrogate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  

  this.targetShadowDOM = targetShadowDOM;
  this.compileSurrogate = compileSurrogate;
  this.associatedModuleId = null;
};

ViewCompileInstruction.normal = new ViewCompileInstruction();

var BehaviorInstruction = exports.BehaviorInstruction = function () {
  BehaviorInstruction.enhance = function enhance() {
    var instruction = new BehaviorInstruction();
    instruction.enhance = true;
    return instruction;
  };

  BehaviorInstruction.unitTest = function unitTest(type, attributes) {
    var instruction = new BehaviorInstruction();
    instruction.type = type;
    instruction.attributes = attributes || {};
    return instruction;
  };

  BehaviorInstruction.element = function element(node, type) {
    var instruction = new BehaviorInstruction();
    instruction.type = type;
    instruction.attributes = {};
    instruction.anchorIsContainer = !(node.hasAttribute('containerless') || type.containerless);
    instruction.initiatedByBehavior = true;
    return instruction;
  };

  BehaviorInstruction.attribute = function attribute(attrName, type) {
    var instruction = new BehaviorInstruction();
    instruction.attrName = attrName;
    instruction.type = type || null;
    instruction.attributes = {};
    return instruction;
  };

  BehaviorInstruction.dynamic = function dynamic(host, viewModel, viewFactory) {
    var instruction = new BehaviorInstruction();
    instruction.host = host;
    instruction.viewModel = viewModel;
    instruction.viewFactory = viewFactory;
    instruction.inheritBindingContext = true;
    return instruction;
  };

  function BehaviorInstruction() {
    

    this.initiatedByBehavior = false;
    this.enhance = false;
    this.partReplacements = null;
    this.viewFactory = null;
    this.originalAttrName = null;
    this.skipContentProcessing = false;
    this.contentFactory = null;
    this.viewModel = null;
    this.anchorIsContainer = false;
    this.host = null;
    this.attributes = null;
    this.type = null;
    this.attrName = null;
    this.inheritBindingContext = false;
  }

  return BehaviorInstruction;
}();

BehaviorInstruction.normal = new BehaviorInstruction();

var TargetInstruction = exports.TargetInstruction = (_temp = _class = function () {
  TargetInstruction.shadowSlot = function shadowSlot(parentInjectorId) {
    var instruction = new TargetInstruction();
    instruction.parentInjectorId = parentInjectorId;
    instruction.shadowSlot = true;
    return instruction;
  };

  TargetInstruction.contentExpression = function contentExpression(expression) {
    var instruction = new TargetInstruction();
    instruction.contentExpression = expression;
    return instruction;
  };

  TargetInstruction.lifting = function lifting(parentInjectorId, liftingInstruction) {
    var instruction = new TargetInstruction();
    instruction.parentInjectorId = parentInjectorId;
    instruction.expressions = TargetInstruction.noExpressions;
    instruction.behaviorInstructions = [liftingInstruction];
    instruction.viewFactory = liftingInstruction.viewFactory;
    instruction.providers = [liftingInstruction.type.target];
    instruction.lifting = true;
    return instruction;
  };

  TargetInstruction.normal = function normal(injectorId, parentInjectorId, providers, behaviorInstructions, expressions, elementInstruction) {
    var instruction = new TargetInstruction();
    instruction.injectorId = injectorId;
    instruction.parentInjectorId = parentInjectorId;
    instruction.providers = providers;
    instruction.behaviorInstructions = behaviorInstructions;
    instruction.expressions = expressions;
    instruction.anchorIsContainer = elementInstruction ? elementInstruction.anchorIsContainer : true;
    instruction.elementInstruction = elementInstruction;
    return instruction;
  };

  TargetInstruction.surrogate = function surrogate(providers, behaviorInstructions, expressions, values) {
    var instruction = new TargetInstruction();
    instruction.expressions = expressions;
    instruction.behaviorInstructions = behaviorInstructions;
    instruction.providers = providers;
    instruction.values = values;
    return instruction;
  };

  function TargetInstruction() {
    

    this.injectorId = null;
    this.parentInjectorId = null;

    this.shadowSlot = false;
    this.slotName = null;
    this.slotFallbackFactory = null;

    this.contentExpression = null;

    this.expressions = null;
    this.behaviorInstructions = null;
    this.providers = null;

    this.viewFactory = null;

    this.anchorIsContainer = false;
    this.elementInstruction = null;
    this.lifting = false;

    this.values = null;
  }

  return TargetInstruction;
}(), _class.noExpressions = Object.freeze([]), _temp);
var viewStrategy = exports.viewStrategy = _aureliaMetadata.protocol.create('aurelia:view-strategy', {
  validate: function validate(target) {
    if (!(typeof target.loadViewFactory === 'function')) {
      return 'View strategies must implement: loadViewFactory(viewEngine: ViewEngine, compileInstruction: ViewCompileInstruction, loadContext?: ResourceLoadContext): Promise<ViewFactory>';
    }

    return true;
  },
  compose: function compose(target) {
    if (!(typeof target.makeRelativeTo === 'function')) {
      target.makeRelativeTo = _aureliaPal.PLATFORM.noop;
    }
  }
});

var RelativeViewStrategy = exports.RelativeViewStrategy = (_dec = viewStrategy(), _dec(_class2 = function () {
  function RelativeViewStrategy(path) {
    

    this.path = path;
    this.absolutePath = null;
  }

  RelativeViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
    if (this.absolutePath === null && this.moduleId) {
      this.absolutePath = (0, _aureliaPath.relativeToFile)(this.path, this.moduleId);
    }

    compileInstruction.associatedModuleId = this.moduleId;
    return viewEngine.loadViewFactory(this.absolutePath || this.path, compileInstruction, loadContext, target);
  };

  RelativeViewStrategy.prototype.makeRelativeTo = function makeRelativeTo(file) {
    if (this.absolutePath === null) {
      this.absolutePath = (0, _aureliaPath.relativeToFile)(this.path, file);
    }
  };

  return RelativeViewStrategy;
}()) || _class2);
var ConventionalViewStrategy = exports.ConventionalViewStrategy = (_dec2 = viewStrategy(), _dec2(_class3 = function () {
  function ConventionalViewStrategy(viewLocator, origin) {
    

    this.moduleId = origin.moduleId;
    this.viewUrl = viewLocator.convertOriginToViewUrl(origin);
  }

  ConventionalViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
    compileInstruction.associatedModuleId = this.moduleId;
    return viewEngine.loadViewFactory(this.viewUrl, compileInstruction, loadContext, target);
  };

  return ConventionalViewStrategy;
}()) || _class3);
var NoViewStrategy = exports.NoViewStrategy = (_dec3 = viewStrategy(), _dec3(_class4 = function () {
  function NoViewStrategy(dependencies, dependencyBaseUrl) {
    

    this.dependencies = dependencies || null;
    this.dependencyBaseUrl = dependencyBaseUrl || '';
  }

  NoViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
    var entry = this.entry;
    var dependencies = this.dependencies;

    if (entry && entry.factoryIsReady) {
      return Promise.resolve(null);
    }

    this.entry = entry = new _aureliaLoader.TemplateRegistryEntry(this.moduleId || this.dependencyBaseUrl);

    entry.dependencies = [];
    entry.templateIsLoaded = true;

    if (dependencies !== null) {
      for (var i = 0, ii = dependencies.length; i < ii; ++i) {
        var current = dependencies[i];

        if (typeof current === 'string' || typeof current === 'function') {
          entry.addDependency(current);
        } else {
          entry.addDependency(current.from, current.as);
        }
      }
    }

    compileInstruction.associatedModuleId = this.moduleId;

    return viewEngine.loadViewFactory(entry, compileInstruction, loadContext, target);
  };

  return NoViewStrategy;
}()) || _class4);
var TemplateRegistryViewStrategy = exports.TemplateRegistryViewStrategy = (_dec4 = viewStrategy(), _dec4(_class5 = function () {
  function TemplateRegistryViewStrategy(moduleId, entry) {
    

    this.moduleId = moduleId;
    this.entry = entry;
  }

  TemplateRegistryViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
    var entry = this.entry;

    if (entry.factoryIsReady) {
      return Promise.resolve(entry.factory);
    }

    compileInstruction.associatedModuleId = this.moduleId;
    return viewEngine.loadViewFactory(entry, compileInstruction, loadContext, target);
  };

  return TemplateRegistryViewStrategy;
}()) || _class5);
var InlineViewStrategy = exports.InlineViewStrategy = (_dec5 = viewStrategy(), _dec5(_class6 = function () {
  function InlineViewStrategy(markup, dependencies, dependencyBaseUrl) {
    

    this.markup = markup;
    this.dependencies = dependencies || null;
    this.dependencyBaseUrl = dependencyBaseUrl || '';
  }

  InlineViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext, target) {
    var entry = this.entry;
    var dependencies = this.dependencies;

    if (entry && entry.factoryIsReady) {
      return Promise.resolve(entry.factory);
    }

    this.entry = entry = new _aureliaLoader.TemplateRegistryEntry(this.moduleId || this.dependencyBaseUrl);
    entry.template = _aureliaPal.DOM.createTemplateFromMarkup(this.markup);

    if (dependencies !== null) {
      for (var i = 0, ii = dependencies.length; i < ii; ++i) {
        var current = dependencies[i];

        if (typeof current === 'string' || typeof current === 'function') {
          entry.addDependency(current);
        } else {
          entry.addDependency(current.from, current.as);
        }
      }
    }

    compileInstruction.associatedModuleId = this.moduleId;
    return viewEngine.loadViewFactory(entry, compileInstruction, loadContext, target);
  };

  return InlineViewStrategy;
}()) || _class6);
var ViewLocator = exports.ViewLocator = (_temp2 = _class7 = function () {
  function ViewLocator() {
    
  }

  ViewLocator.prototype.getViewStrategy = function getViewStrategy(value) {
    if (!value) {
      return null;
    }

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && 'getViewStrategy' in value) {
      var _origin = _aureliaMetadata.Origin.get(value.constructor);

      value = value.getViewStrategy();

      if (typeof value === 'string') {
        value = new RelativeViewStrategy(value);
      }

      viewStrategy.assert(value);

      if (_origin.moduleId) {
        value.makeRelativeTo(_origin.moduleId);
      }

      return value;
    }

    if (typeof value === 'string') {
      value = new RelativeViewStrategy(value);
    }

    if (viewStrategy.validate(value)) {
      return value;
    }

    if (typeof value !== 'function') {
      value = value.constructor;
    }

    var origin = _aureliaMetadata.Origin.get(value);
    var strategy = _aureliaMetadata.metadata.get(ViewLocator.viewStrategyMetadataKey, value);

    if (!strategy) {
      if (!origin.moduleId) {
        throw new Error('Cannot determine default view strategy for object.', value);
      }

      strategy = this.createFallbackViewStrategy(origin);
    } else if (origin.moduleId) {
      strategy.moduleId = origin.moduleId;
    }

    return strategy;
  };

  ViewLocator.prototype.createFallbackViewStrategy = function createFallbackViewStrategy(origin) {
    return new ConventionalViewStrategy(this, origin);
  };

  ViewLocator.prototype.convertOriginToViewUrl = function convertOriginToViewUrl(origin) {
    var moduleId = origin.moduleId;
    var id = moduleId.endsWith('.js') || moduleId.endsWith('.ts') ? moduleId.substring(0, moduleId.length - 3) : moduleId;
    return id + '.html';
  };

  return ViewLocator;
}(), _class7.viewStrategyMetadataKey = 'aurelia:view-strategy', _temp2);


function mi(name) {
  throw new Error('BindingLanguage must implement ' + name + '().');
}

var BindingLanguage = exports.BindingLanguage = function () {
  function BindingLanguage() {
    
  }

  BindingLanguage.prototype.inspectAttribute = function inspectAttribute(resources, elementName, attrName, attrValue) {
    mi('inspectAttribute');
  };

  BindingLanguage.prototype.createAttributeInstruction = function createAttributeInstruction(resources, element, info, existingInstruction) {
    mi('createAttributeInstruction');
  };

  BindingLanguage.prototype.inspectTextContent = function inspectTextContent(resources, value) {
    mi('inspectTextContent');
  };

  return BindingLanguage;
}();

var noNodes = Object.freeze([]);

var SlotCustomAttribute = exports.SlotCustomAttribute = (_dec6 = (0, _aureliaDependencyInjection.inject)(_aureliaPal.DOM.Element), _dec6(_class8 = function () {
  function SlotCustomAttribute(element) {
    

    this.element = element;
    this.element.auSlotAttribute = this;
  }

  SlotCustomAttribute.prototype.valueChanged = function valueChanged(newValue, oldValue) {};

  return SlotCustomAttribute;
}()) || _class8);

var PassThroughSlot = exports.PassThroughSlot = function () {
  function PassThroughSlot(anchor, name, destinationName, fallbackFactory) {
    

    this.anchor = anchor;
    this.anchor.viewSlot = this;
    this.name = name;
    this.destinationName = destinationName;
    this.fallbackFactory = fallbackFactory;
    this.destinationSlot = null;
    this.projections = 0;
    this.contentView = null;

    var attr = new SlotCustomAttribute(this.anchor);
    attr.value = this.destinationName;
  }

  PassThroughSlot.prototype.renderFallbackContent = function renderFallbackContent(view, nodes, projectionSource, index) {
    if (this.contentView === null) {
      this.contentView = this.fallbackFactory.create(this.ownerView.container);
      this.contentView.bind(this.ownerView.bindingContext, this.ownerView.overrideContext);

      var slots = Object.create(null);
      slots[this.destinationSlot.name] = this.destinationSlot;

      ShadowDOM.distributeView(this.contentView, slots, projectionSource, index, this.destinationSlot.name);
    }
  };

  PassThroughSlot.prototype.passThroughTo = function passThroughTo(destinationSlot) {
    this.destinationSlot = destinationSlot;
  };

  PassThroughSlot.prototype.addNode = function addNode(view, node, projectionSource, index) {
    if (this.contentView !== null) {
      this.contentView.removeNodes();
      this.contentView.detached();
      this.contentView.unbind();
      this.contentView = null;
    }

    if (node.viewSlot instanceof PassThroughSlot) {
      node.viewSlot.passThroughTo(this);
      return;
    }

    this.projections++;
    this.destinationSlot.addNode(view, node, projectionSource, index);
  };

  PassThroughSlot.prototype.removeView = function removeView(view, projectionSource) {
    this.projections--;
    this.destinationSlot.removeView(view, projectionSource);

    if (this.needsFallbackRendering) {
      this.renderFallbackContent(null, noNodes, projectionSource);
    }
  };

  PassThroughSlot.prototype.removeAll = function removeAll(projectionSource) {
    this.projections = 0;
    this.destinationSlot.removeAll(projectionSource);

    if (this.needsFallbackRendering) {
      this.renderFallbackContent(null, noNodes, projectionSource);
    }
  };

  PassThroughSlot.prototype.projectFrom = function projectFrom(view, projectionSource) {
    this.destinationSlot.projectFrom(view, projectionSource);
  };

  PassThroughSlot.prototype.created = function created(ownerView) {
    this.ownerView = ownerView;
  };

  PassThroughSlot.prototype.bind = function bind(view) {
    if (this.contentView) {
      this.contentView.bind(view.bindingContext, view.overrideContext);
    }
  };

  PassThroughSlot.prototype.attached = function attached() {
    if (this.contentView) {
      this.contentView.attached();
    }
  };

  PassThroughSlot.prototype.detached = function detached() {
    if (this.contentView) {
      this.contentView.detached();
    }
  };

  PassThroughSlot.prototype.unbind = function unbind() {
    if (this.contentView) {
      this.contentView.unbind();
    }
  };

  _createClass(PassThroughSlot, [{
    key: 'needsFallbackRendering',
    get: function get() {
      return this.fallbackFactory && this.projections === 0;
    }
  }]);

  return PassThroughSlot;
}();

var ShadowSlot = exports.ShadowSlot = function () {
  function ShadowSlot(anchor, name, fallbackFactory) {
    

    this.anchor = anchor;
    this.anchor.isContentProjectionSource = true;
    this.anchor.viewSlot = this;
    this.name = name;
    this.fallbackFactory = fallbackFactory;
    this.contentView = null;
    this.projections = 0;
    this.children = [];
    this.projectFromAnchors = null;
    this.destinationSlots = null;
  }

  ShadowSlot.prototype.addNode = function addNode(view, node, projectionSource, index, destination) {
    if (this.contentView !== null) {
      this.contentView.removeNodes();
      this.contentView.detached();
      this.contentView.unbind();
      this.contentView = null;
    }

    if (node.viewSlot instanceof PassThroughSlot) {
      node.viewSlot.passThroughTo(this);
      return;
    }

    if (this.destinationSlots !== null) {
      ShadowDOM.distributeNodes(view, [node], this.destinationSlots, this, index);
    } else {
      node.auOwnerView = view;
      node.auProjectionSource = projectionSource;
      node.auAssignedSlot = this;

      var anchor = this._findAnchor(view, node, projectionSource, index);
      var parent = anchor.parentNode;

      parent.insertBefore(node, anchor);
      this.children.push(node);
      this.projections++;
    }
  };

  ShadowSlot.prototype.removeView = function removeView(view, projectionSource) {
    if (this.destinationSlots !== null) {
      ShadowDOM.undistributeView(view, this.destinationSlots, this);
    } else if (this.contentView && this.contentView.hasSlots) {
      ShadowDOM.undistributeView(view, this.contentView.slots, projectionSource);
    } else {
      var found = this.children.find(function (x) {
        return x.auSlotProjectFrom === projectionSource;
      });
      if (found) {
        var _children = found.auProjectionChildren;

        for (var i = 0, ii = _children.length; i < ii; ++i) {
          var _child = _children[i];

          if (_child.auOwnerView === view) {
            _children.splice(i, 1);
            view.fragment.appendChild(_child);
            i--;ii--;
            this.projections--;
          }
        }

        if (this.needsFallbackRendering) {
          this.renderFallbackContent(view, noNodes, projectionSource);
        }
      }
    }
  };

  ShadowSlot.prototype.removeAll = function removeAll(projectionSource) {
    if (this.destinationSlots !== null) {
      ShadowDOM.undistributeAll(this.destinationSlots, this);
    } else if (this.contentView && this.contentView.hasSlots) {
      ShadowDOM.undistributeAll(this.contentView.slots, projectionSource);
    } else {
      var found = this.children.find(function (x) {
        return x.auSlotProjectFrom === projectionSource;
      });

      if (found) {
        var _children2 = found.auProjectionChildren;
        for (var i = 0, ii = _children2.length; i < ii; ++i) {
          var _child2 = _children2[i];
          _child2.auOwnerView.fragment.appendChild(_child2);
          this.projections--;
        }

        found.auProjectionChildren = [];

        if (this.needsFallbackRendering) {
          this.renderFallbackContent(null, noNodes, projectionSource);
        }
      }
    }
  };

  ShadowSlot.prototype._findAnchor = function _findAnchor(view, node, projectionSource, index) {
    if (projectionSource) {
      var found = this.children.find(function (x) {
        return x.auSlotProjectFrom === projectionSource;
      });
      if (found) {
        if (index !== undefined) {
          var _children3 = found.auProjectionChildren;
          var viewIndex = -1;
          var lastView = void 0;

          for (var i = 0, ii = _children3.length; i < ii; ++i) {
            var current = _children3[i];

            if (current.auOwnerView !== lastView) {
              viewIndex++;
              lastView = current.auOwnerView;

              if (viewIndex >= index && lastView !== view) {
                _children3.splice(i, 0, node);
                return current;
              }
            }
          }
        }

        found.auProjectionChildren.push(node);
        return found;
      }
    }

    return this.anchor;
  };

  ShadowSlot.prototype.projectTo = function projectTo(slots) {
    this.destinationSlots = slots;
  };

  ShadowSlot.prototype.projectFrom = function projectFrom(view, projectionSource) {
    var anchor = _aureliaPal.DOM.createComment('anchor');
    var parent = this.anchor.parentNode;
    anchor.auSlotProjectFrom = projectionSource;
    anchor.auOwnerView = view;
    anchor.auProjectionChildren = [];
    parent.insertBefore(anchor, this.anchor);
    this.children.push(anchor);

    if (this.projectFromAnchors === null) {
      this.projectFromAnchors = [];
    }

    this.projectFromAnchors.push(anchor);
  };

  ShadowSlot.prototype.renderFallbackContent = function renderFallbackContent(view, nodes, projectionSource, index) {
    if (this.contentView === null) {
      this.contentView = this.fallbackFactory.create(this.ownerView.container);
      this.contentView.bind(this.ownerView.bindingContext, this.ownerView.overrideContext);
      this.contentView.insertNodesBefore(this.anchor);
    }

    if (this.contentView.hasSlots) {
      var slots = this.contentView.slots;
      var projectFromAnchors = this.projectFromAnchors;

      if (projectFromAnchors !== null) {
        for (var slotName in slots) {
          var slot = slots[slotName];

          for (var i = 0, ii = projectFromAnchors.length; i < ii; ++i) {
            var anchor = projectFromAnchors[i];
            slot.projectFrom(anchor.auOwnerView, anchor.auSlotProjectFrom);
          }
        }
      }

      this.fallbackSlots = slots;
      ShadowDOM.distributeNodes(view, nodes, slots, projectionSource, index);
    }
  };

  ShadowSlot.prototype.created = function created(ownerView) {
    this.ownerView = ownerView;
  };

  ShadowSlot.prototype.bind = function bind(view) {
    if (this.contentView) {
      this.contentView.bind(view.bindingContext, view.overrideContext);
    }
  };

  ShadowSlot.prototype.attached = function attached() {
    if (this.contentView) {
      this.contentView.attached();
    }
  };

  ShadowSlot.prototype.detached = function detached() {
    if (this.contentView) {
      this.contentView.detached();
    }
  };

  ShadowSlot.prototype.unbind = function unbind() {
    if (this.contentView) {
      this.contentView.unbind();
    }
  };

  _createClass(ShadowSlot, [{
    key: 'needsFallbackRendering',
    get: function get() {
      return this.fallbackFactory && this.projections === 0;
    }
  }]);

  return ShadowSlot;
}();

var ShadowDOM = exports.ShadowDOM = (_temp3 = _class9 = function () {
  function ShadowDOM() {
    
  }

  ShadowDOM.getSlotName = function getSlotName(node) {
    if (node.auSlotAttribute === undefined) {
      return ShadowDOM.defaultSlotKey;
    }

    return node.auSlotAttribute.value;
  };

  ShadowDOM.distributeView = function distributeView(view, slots, projectionSource, index, destinationOverride) {
    var nodes = void 0;

    if (view === null) {
      nodes = noNodes;
    } else {
      var childNodes = view.fragment.childNodes;
      var ii = childNodes.length;
      nodes = new Array(ii);

      for (var i = 0; i < ii; ++i) {
        nodes[i] = childNodes[i];
      }
    }

    ShadowDOM.distributeNodes(view, nodes, slots, projectionSource, index, destinationOverride);
  };

  ShadowDOM.undistributeView = function undistributeView(view, slots, projectionSource) {
    for (var slotName in slots) {
      slots[slotName].removeView(view, projectionSource);
    }
  };

  ShadowDOM.undistributeAll = function undistributeAll(slots, projectionSource) {
    for (var slotName in slots) {
      slots[slotName].removeAll(projectionSource);
    }
  };

  ShadowDOM.distributeNodes = function distributeNodes(view, nodes, slots, projectionSource, index, destinationOverride) {
    for (var i = 0, ii = nodes.length; i < ii; ++i) {
      var currentNode = nodes[i];
      var nodeType = currentNode.nodeType;

      if (currentNode.isContentProjectionSource) {
        currentNode.viewSlot.projectTo(slots);

        for (var slotName in slots) {
          slots[slotName].projectFrom(view, currentNode.viewSlot);
        }

        nodes.splice(i, 1);
        ii--;i--;
      } else if (nodeType === 1 || nodeType === 3 || currentNode.viewSlot instanceof PassThroughSlot) {
        if (nodeType === 3 && _isAllWhitespace(currentNode)) {
          nodes.splice(i, 1);
          ii--;i--;
        } else {
          var found = slots[destinationOverride || ShadowDOM.getSlotName(currentNode)];

          if (found) {
            found.addNode(view, currentNode, projectionSource, index);
            nodes.splice(i, 1);
            ii--;i--;
          }
        }
      } else {
        nodes.splice(i, 1);
        ii--;i--;
      }
    }

    for (var _slotName in slots) {
      var slot = slots[_slotName];

      if (slot.needsFallbackRendering) {
        slot.renderFallbackContent(view, nodes, projectionSource, index);
      }
    }
  };

  return ShadowDOM;
}(), _class9.defaultSlotKey = '__au-default-slot-key__', _temp3);


function register(lookup, name, resource, type) {
  if (!name) {
    return;
  }

  var existing = lookup[name];
  if (existing) {
    if (existing !== resource) {
      throw new Error('Attempted to register ' + type + ' when one with the same name already exists. Name: ' + name + '.');
    }

    return;
  }

  lookup[name] = resource;
}

var ViewResources = exports.ViewResources = function () {
  function ViewResources(parent, viewUrl) {
    

    this.bindingLanguage = null;

    this.parent = parent || null;
    this.hasParent = this.parent !== null;
    this.viewUrl = viewUrl || '';
    this.lookupFunctions = {
      valueConverters: this.getValueConverter.bind(this),
      bindingBehaviors: this.getBindingBehavior.bind(this)
    };
    this.attributes = Object.create(null);
    this.elements = Object.create(null);
    this.valueConverters = Object.create(null);
    this.bindingBehaviors = Object.create(null);
    this.attributeMap = Object.create(null);
    this.values = Object.create(null);
    this.beforeCompile = this.afterCompile = this.beforeCreate = this.afterCreate = this.beforeBind = this.beforeUnbind = false;
  }

  ViewResources.prototype._tryAddHook = function _tryAddHook(obj, name) {
    if (typeof obj[name] === 'function') {
      var func = obj[name].bind(obj);
      var counter = 1;
      var callbackName = void 0;

      while (this[callbackName = name + counter.toString()] !== undefined) {
        counter++;
      }

      this[name] = true;
      this[callbackName] = func;
    }
  };

  ViewResources.prototype._invokeHook = function _invokeHook(name, one, two, three, four) {
    if (this.hasParent) {
      this.parent._invokeHook(name, one, two, three, four);
    }

    if (this[name]) {
      this[name + '1'](one, two, three, four);

      var callbackName = name + '2';
      if (this[callbackName]) {
        this[callbackName](one, two, three, four);

        callbackName = name + '3';
        if (this[callbackName]) {
          this[callbackName](one, two, three, four);

          var counter = 4;

          while (this[callbackName = name + counter.toString()] !== undefined) {
            this[callbackName](one, two, three, four);
            counter++;
          }
        }
      }
    }
  };

  ViewResources.prototype.registerViewEngineHooks = function registerViewEngineHooks(hooks) {
    this._tryAddHook(hooks, 'beforeCompile');
    this._tryAddHook(hooks, 'afterCompile');
    this._tryAddHook(hooks, 'beforeCreate');
    this._tryAddHook(hooks, 'afterCreate');
    this._tryAddHook(hooks, 'beforeBind');
    this._tryAddHook(hooks, 'beforeUnbind');
  };

  ViewResources.prototype.getBindingLanguage = function getBindingLanguage(bindingLanguageFallback) {
    return this.bindingLanguage || (this.bindingLanguage = bindingLanguageFallback);
  };

  ViewResources.prototype.patchInParent = function patchInParent(newParent) {
    var originalParent = this.parent;

    this.parent = newParent || null;
    this.hasParent = this.parent !== null;

    if (newParent.parent === null) {
      newParent.parent = originalParent;
      newParent.hasParent = originalParent !== null;
    }
  };

  ViewResources.prototype.relativeToView = function relativeToView(path) {
    return (0, _aureliaPath.relativeToFile)(path, this.viewUrl);
  };

  ViewResources.prototype.registerElement = function registerElement(tagName, behavior) {
    register(this.elements, tagName, behavior, 'an Element');
  };

  ViewResources.prototype.getElement = function getElement(tagName) {
    return this.elements[tagName] || (this.hasParent ? this.parent.getElement(tagName) : null);
  };

  ViewResources.prototype.mapAttribute = function mapAttribute(attribute) {
    return this.attributeMap[attribute] || (this.hasParent ? this.parent.mapAttribute(attribute) : null);
  };

  ViewResources.prototype.registerAttribute = function registerAttribute(attribute, behavior, knownAttribute) {
    this.attributeMap[attribute] = knownAttribute;
    register(this.attributes, attribute, behavior, 'an Attribute');
  };

  ViewResources.prototype.getAttribute = function getAttribute(attribute) {
    return this.attributes[attribute] || (this.hasParent ? this.parent.getAttribute(attribute) : null);
  };

  ViewResources.prototype.registerValueConverter = function registerValueConverter(name, valueConverter) {
    register(this.valueConverters, name, valueConverter, 'a ValueConverter');
  };

  ViewResources.prototype.getValueConverter = function getValueConverter(name) {
    return this.valueConverters[name] || (this.hasParent ? this.parent.getValueConverter(name) : null);
  };

  ViewResources.prototype.registerBindingBehavior = function registerBindingBehavior(name, bindingBehavior) {
    register(this.bindingBehaviors, name, bindingBehavior, 'a BindingBehavior');
  };

  ViewResources.prototype.getBindingBehavior = function getBindingBehavior(name) {
    return this.bindingBehaviors[name] || (this.hasParent ? this.parent.getBindingBehavior(name) : null);
  };

  ViewResources.prototype.registerValue = function registerValue(name, value) {
    register(this.values, name, value, 'a value');
  };

  ViewResources.prototype.getValue = function getValue(name) {
    return this.values[name] || (this.hasParent ? this.parent.getValue(name) : null);
  };

  return ViewResources;
}();

var View = exports.View = function () {
  function View(container, viewFactory, fragment, controllers, bindings, children, slots) {
    

    this.container = container;
    this.viewFactory = viewFactory;
    this.resources = viewFactory.resources;
    this.fragment = fragment;
    this.firstChild = fragment.firstChild;
    this.lastChild = fragment.lastChild;
    this.controllers = controllers;
    this.bindings = bindings;
    this.children = children;
    this.slots = slots;
    this.hasSlots = false;
    this.fromCache = false;
    this.isBound = false;
    this.isAttached = false;
    this.bindingContext = null;
    this.overrideContext = null;
    this.controller = null;
    this.viewModelScope = null;
    this.animatableElement = undefined;
    this._isUserControlled = false;
    this.contentView = null;

    for (var key in slots) {
      this.hasSlots = true;
      break;
    }
  }

  View.prototype.returnToCache = function returnToCache() {
    this.viewFactory.returnViewToCache(this);
  };

  View.prototype.created = function created() {
    var i = void 0;
    var ii = void 0;
    var controllers = this.controllers;

    for (i = 0, ii = controllers.length; i < ii; ++i) {
      controllers[i].created(this);
    }
  };

  View.prototype.bind = function bind(bindingContext, overrideContext, _systemUpdate) {
    var controllers = void 0;
    var bindings = void 0;
    var children = void 0;
    var i = void 0;
    var ii = void 0;

    if (_systemUpdate && this._isUserControlled) {
      return;
    }

    if (this.isBound) {
      if (this.bindingContext === bindingContext) {
        return;
      }

      this.unbind();
    }

    this.isBound = true;
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext || (0, _aureliaBinding.createOverrideContext)(bindingContext);

    this.resources._invokeHook('beforeBind', this);

    bindings = this.bindings;
    for (i = 0, ii = bindings.length; i < ii; ++i) {
      bindings[i].bind(this);
    }

    if (this.viewModelScope !== null) {
      bindingContext.bind(this.viewModelScope.bindingContext, this.viewModelScope.overrideContext);
      this.viewModelScope = null;
    }

    controllers = this.controllers;
    for (i = 0, ii = controllers.length; i < ii; ++i) {
      controllers[i].bind(this);
    }

    children = this.children;
    for (i = 0, ii = children.length; i < ii; ++i) {
      children[i].bind(bindingContext, overrideContext, true);
    }

    if (this.hasSlots) {
      ShadowDOM.distributeView(this.contentView, this.slots);
    }
  };

  View.prototype.addBinding = function addBinding(binding) {
    this.bindings.push(binding);

    if (this.isBound) {
      binding.bind(this);
    }
  };

  View.prototype.unbind = function unbind() {
    var controllers = void 0;
    var bindings = void 0;
    var children = void 0;
    var i = void 0;
    var ii = void 0;

    if (this.isBound) {
      this.isBound = false;
      this.resources._invokeHook('beforeUnbind', this);

      if (this.controller !== null) {
        this.controller.unbind();
      }

      bindings = this.bindings;
      for (i = 0, ii = bindings.length; i < ii; ++i) {
        bindings[i].unbind();
      }

      controllers = this.controllers;
      for (i = 0, ii = controllers.length; i < ii; ++i) {
        controllers[i].unbind();
      }

      children = this.children;
      for (i = 0, ii = children.length; i < ii; ++i) {
        children[i].unbind();
      }

      this.bindingContext = null;
      this.overrideContext = null;
    }
  };

  View.prototype.insertNodesBefore = function insertNodesBefore(refNode) {
    refNode.parentNode.insertBefore(this.fragment, refNode);
  };

  View.prototype.appendNodesTo = function appendNodesTo(parent) {
    parent.appendChild(this.fragment);
  };

  View.prototype.removeNodes = function removeNodes() {
    var fragment = this.fragment;
    var current = this.firstChild;
    var end = this.lastChild;
    var next = void 0;

    while (current) {
      next = current.nextSibling;
      fragment.appendChild(current);

      if (current === end) {
        break;
      }

      current = next;
    }
  };

  View.prototype.attached = function attached() {
    var controllers = void 0;
    var children = void 0;
    var i = void 0;
    var ii = void 0;

    if (this.isAttached) {
      return;
    }

    this.isAttached = true;

    if (this.controller !== null) {
      this.controller.attached();
    }

    controllers = this.controllers;
    for (i = 0, ii = controllers.length; i < ii; ++i) {
      controllers[i].attached();
    }

    children = this.children;
    for (i = 0, ii = children.length; i < ii; ++i) {
      children[i].attached();
    }
  };

  View.prototype.detached = function detached() {
    var controllers = void 0;
    var children = void 0;
    var i = void 0;
    var ii = void 0;

    if (this.isAttached) {
      this.isAttached = false;

      if (this.controller !== null) {
        this.controller.detached();
      }

      controllers = this.controllers;
      for (i = 0, ii = controllers.length; i < ii; ++i) {
        controllers[i].detached();
      }

      children = this.children;
      for (i = 0, ii = children.length; i < ii; ++i) {
        children[i].detached();
      }
    }
  };

  return View;
}();

function getAnimatableElement(view) {
  if (view.animatableElement !== undefined) {
    return view.animatableElement;
  }

  var current = view.firstChild;

  while (current && current.nodeType !== 1) {
    current = current.nextSibling;
  }

  if (current && current.nodeType === 1) {
    return view.animatableElement = current.classList.contains('au-animate') ? current : null;
  }

  return view.animatableElement = null;
}

var ViewSlot = exports.ViewSlot = function () {
  function ViewSlot(anchor, anchorIsContainer) {
    var animator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Animator.instance;

    

    this.anchor = anchor;
    this.anchorIsContainer = anchorIsContainer;
    this.bindingContext = null;
    this.overrideContext = null;
    this.animator = animator;
    this.children = [];
    this.isBound = false;
    this.isAttached = false;
    this.contentSelectors = null;
    anchor.viewSlot = this;
    anchor.isContentProjectionSource = false;
  }

  ViewSlot.prototype.animateView = function animateView(view) {
    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'enter';

    var animatableElement = getAnimatableElement(view);

    if (animatableElement !== null) {
      switch (direction) {
        case 'enter':
          return this.animator.enter(animatableElement);
        case 'leave':
          return this.animator.leave(animatableElement);
        default:
          throw new Error('Invalid animation direction: ' + direction);
      }
    }
  };

  ViewSlot.prototype.transformChildNodesIntoView = function transformChildNodesIntoView() {
    var parent = this.anchor;

    this.children.push({
      fragment: parent,
      firstChild: parent.firstChild,
      lastChild: parent.lastChild,
      returnToCache: function returnToCache() {},
      removeNodes: function removeNodes() {
        var last = void 0;

        while (last = parent.lastChild) {
          parent.removeChild(last);
        }
      },
      created: function created() {},
      bind: function bind() {},
      unbind: function unbind() {},
      attached: function attached() {},
      detached: function detached() {}
    });
  };

  ViewSlot.prototype.bind = function bind(bindingContext, overrideContext) {
    var i = void 0;
    var ii = void 0;
    var children = void 0;

    if (this.isBound) {
      if (this.bindingContext === bindingContext) {
        return;
      }

      this.unbind();
    }

    this.isBound = true;
    this.bindingContext = bindingContext = bindingContext || this.bindingContext;
    this.overrideContext = overrideContext = overrideContext || this.overrideContext;

    children = this.children;
    for (i = 0, ii = children.length; i < ii; ++i) {
      children[i].bind(bindingContext, overrideContext, true);
    }
  };

  ViewSlot.prototype.unbind = function unbind() {
    if (this.isBound) {
      var i = void 0;
      var ii = void 0;
      var _children4 = this.children;

      this.isBound = false;
      this.bindingContext = null;
      this.overrideContext = null;

      for (i = 0, ii = _children4.length; i < ii; ++i) {
        _children4[i].unbind();
      }
    }
  };

  ViewSlot.prototype.add = function add(view) {
    if (this.anchorIsContainer) {
      view.appendNodesTo(this.anchor);
    } else {
      view.insertNodesBefore(this.anchor);
    }

    this.children.push(view);

    if (this.isAttached) {
      view.attached();
      return this.animateView(view, 'enter');
    }
  };

  ViewSlot.prototype.insert = function insert(index, view) {
    var children = this.children;
    var length = children.length;

    if (index === 0 && length === 0 || index >= length) {
      return this.add(view);
    }

    view.insertNodesBefore(children[index].firstChild);
    children.splice(index, 0, view);

    if (this.isAttached) {
      view.attached();
      return this.animateView(view, 'enter');
    }
  };

  ViewSlot.prototype.move = function move(sourceIndex, targetIndex) {
    if (sourceIndex === targetIndex) {
      return;
    }

    var children = this.children;
    var view = children[sourceIndex];

    view.removeNodes();
    view.insertNodesBefore(children[targetIndex].firstChild);
    children.splice(sourceIndex, 1);
    children.splice(targetIndex, 0, view);
  };

  ViewSlot.prototype.remove = function remove(view, returnToCache, skipAnimation) {
    return this.removeAt(this.children.indexOf(view), returnToCache, skipAnimation);
  };

  ViewSlot.prototype.removeMany = function removeMany(viewsToRemove, returnToCache, skipAnimation) {
    var _this4 = this;

    var children = this.children;
    var ii = viewsToRemove.length;
    var i = void 0;
    var rmPromises = [];

    viewsToRemove.forEach(function (child) {
      if (skipAnimation) {
        child.removeNodes();
        return;
      }

      var animation = _this4.animateView(child, 'leave');
      if (animation) {
        rmPromises.push(animation.then(function () {
          return child.removeNodes();
        }));
      } else {
        child.removeNodes();
      }
    });

    var removeAction = function removeAction() {
      if (_this4.isAttached) {
        for (i = 0; i < ii; ++i) {
          viewsToRemove[i].detached();
        }
      }

      if (returnToCache) {
        for (i = 0; i < ii; ++i) {
          viewsToRemove[i].returnToCache();
        }
      }

      for (i = 0; i < ii; ++i) {
        var index = children.indexOf(viewsToRemove[i]);
        if (index >= 0) {
          children.splice(index, 1);
        }
      }
    };

    if (rmPromises.length > 0) {
      return Promise.all(rmPromises).then(function () {
        return removeAction();
      });
    }

    return removeAction();
  };

  ViewSlot.prototype.removeAt = function removeAt(index, returnToCache, skipAnimation) {
    var _this5 = this;

    var view = this.children[index];

    var removeAction = function removeAction() {
      index = _this5.children.indexOf(view);
      view.removeNodes();
      _this5.children.splice(index, 1);

      if (_this5.isAttached) {
        view.detached();
      }

      if (returnToCache) {
        view.returnToCache();
      }

      return view;
    };

    if (!skipAnimation) {
      var animation = this.animateView(view, 'leave');
      if (animation) {
        return animation.then(function () {
          return removeAction();
        });
      }
    }

    return removeAction();
  };

  ViewSlot.prototype.removeAll = function removeAll(returnToCache, skipAnimation) {
    var _this6 = this;

    var children = this.children;
    var ii = children.length;
    var i = void 0;
    var rmPromises = [];

    children.forEach(function (child) {
      if (skipAnimation) {
        child.removeNodes();
        return;
      }

      var animation = _this6.animateView(child, 'leave');
      if (animation) {
        rmPromises.push(animation.then(function () {
          return child.removeNodes();
        }));
      } else {
        child.removeNodes();
      }
    });

    var removeAction = function removeAction() {
      if (_this6.isAttached) {
        for (i = 0; i < ii; ++i) {
          children[i].detached();
        }
      }

      if (returnToCache) {
        for (i = 0; i < ii; ++i) {
          children[i].returnToCache();
        }
      }

      _this6.children = [];
    };

    if (rmPromises.length > 0) {
      return Promise.all(rmPromises).then(function () {
        return removeAction();
      });
    }

    return removeAction();
  };

  ViewSlot.prototype.attached = function attached() {
    var i = void 0;
    var ii = void 0;
    var children = void 0;
    var child = void 0;

    if (this.isAttached) {
      return;
    }

    this.isAttached = true;

    children = this.children;
    for (i = 0, ii = children.length; i < ii; ++i) {
      child = children[i];
      child.attached();
      this.animateView(child, 'enter');
    }
  };

  ViewSlot.prototype.detached = function detached() {
    var i = void 0;
    var ii = void 0;
    var children = void 0;

    if (this.isAttached) {
      this.isAttached = false;
      children = this.children;
      for (i = 0, ii = children.length; i < ii; ++i) {
        children[i].detached();
      }
    }
  };

  ViewSlot.prototype.projectTo = function projectTo(slots) {
    var _this7 = this;

    this.projectToSlots = slots;
    this.add = this._projectionAdd;
    this.insert = this._projectionInsert;
    this.move = this._projectionMove;
    this.remove = this._projectionRemove;
    this.removeAt = this._projectionRemoveAt;
    this.removeMany = this._projectionRemoveMany;
    this.removeAll = this._projectionRemoveAll;
    this.children.forEach(function (view) {
      return ShadowDOM.distributeView(view, slots, _this7);
    });
  };

  ViewSlot.prototype._projectionAdd = function _projectionAdd(view) {
    ShadowDOM.distributeView(view, this.projectToSlots, this);

    this.children.push(view);

    if (this.isAttached) {
      view.attached();
    }
  };

  ViewSlot.prototype._projectionInsert = function _projectionInsert(index, view) {
    if (index === 0 && !this.children.length || index >= this.children.length) {
      this.add(view);
    } else {
      ShadowDOM.distributeView(view, this.projectToSlots, this, index);

      this.children.splice(index, 0, view);

      if (this.isAttached) {
        view.attached();
      }
    }
  };

  ViewSlot.prototype._projectionMove = function _projectionMove(sourceIndex, targetIndex) {
    if (sourceIndex === targetIndex) {
      return;
    }

    var children = this.children;
    var view = children[sourceIndex];

    ShadowDOM.undistributeView(view, this.projectToSlots, this);
    ShadowDOM.distributeView(view, this.projectToSlots, this, targetIndex);

    children.splice(sourceIndex, 1);
    children.splice(targetIndex, 0, view);
  };

  ViewSlot.prototype._projectionRemove = function _projectionRemove(view, returnToCache) {
    ShadowDOM.undistributeView(view, this.projectToSlots, this);
    this.children.splice(this.children.indexOf(view), 1);

    if (this.isAttached) {
      view.detached();
    }
  };

  ViewSlot.prototype._projectionRemoveAt = function _projectionRemoveAt(index, returnToCache) {
    var view = this.children[index];

    ShadowDOM.undistributeView(view, this.projectToSlots, this);
    this.children.splice(index, 1);

    if (this.isAttached) {
      view.detached();
    }
  };

  ViewSlot.prototype._projectionRemoveMany = function _projectionRemoveMany(viewsToRemove, returnToCache) {
    var _this8 = this;

    viewsToRemove.forEach(function (view) {
      return _this8.remove(view, returnToCache);
    });
  };

  ViewSlot.prototype._projectionRemoveAll = function _projectionRemoveAll(returnToCache) {
    ShadowDOM.undistributeAll(this.projectToSlots, this);

    var children = this.children;

    if (this.isAttached) {
      for (var i = 0, ii = children.length; i < ii; ++i) {
        children[i].detached();
      }
    }

    this.children = [];
  };

  return ViewSlot;
}();

var ProviderResolver = (0, _aureliaDependencyInjection.resolver)(_class11 = function () {
  function ProviderResolver() {
    
  }

  ProviderResolver.prototype.get = function get(container, key) {
    var id = key.__providerId__;
    return id in container ? container[id] : container[id] = container.invoke(key);
  };

  return ProviderResolver;
}()) || _class11;

var providerResolverInstance = new ProviderResolver();

function elementContainerGet(key) {
  if (key === _aureliaPal.DOM.Element) {
    return this.element;
  }

  if (key === BoundViewFactory) {
    if (this.boundViewFactory) {
      return this.boundViewFactory;
    }

    var factory = this.instruction.viewFactory;
    var _partReplacements = this.partReplacements;

    if (_partReplacements) {
      factory = _partReplacements[factory.part] || factory;
    }

    this.boundViewFactory = new BoundViewFactory(this, factory, _partReplacements);
    return this.boundViewFactory;
  }

  if (key === ViewSlot) {
    if (this.viewSlot === undefined) {
      this.viewSlot = new ViewSlot(this.element, this.instruction.anchorIsContainer);
      this.element.isContentProjectionSource = this.instruction.lifting;
      this.children.push(this.viewSlot);
    }

    return this.viewSlot;
  }

  if (key === ElementEvents) {
    return this.elementEvents || (this.elementEvents = new ElementEvents(this.element));
  }

  if (key === CompositionTransaction) {
    return this.compositionTransaction || (this.compositionTransaction = this.parent.get(key));
  }

  if (key === ViewResources) {
    return this.viewResources;
  }

  if (key === TargetInstruction) {
    return this.instruction;
  }

  return this.superGet(key);
}

function createElementContainer(parent, element, instruction, children, partReplacements, resources) {
  var container = parent.createChild();
  var providers = void 0;
  var i = void 0;

  container.element = element;
  container.instruction = instruction;
  container.children = children;
  container.viewResources = resources;
  container.partReplacements = partReplacements;

  providers = instruction.providers;
  i = providers.length;

  while (i--) {
    container._resolvers.set(providers[i], providerResolverInstance);
  }

  container.superGet = container.get;
  container.get = elementContainerGet;

  return container;
}

function hasAttribute(name) {
  return this._element.hasAttribute(name);
}

function getAttribute(name) {
  return this._element.getAttribute(name);
}

function setAttribute(name, value) {
  this._element.setAttribute(name, value);
}

function makeElementIntoAnchor(element, elementInstruction) {
  var anchor = _aureliaPal.DOM.createComment('anchor');

  if (elementInstruction) {
    var firstChild = element.firstChild;

    if (firstChild && firstChild.tagName === 'AU-CONTENT') {
      anchor.contentElement = firstChild;
    }

    anchor._element = element;

    anchor.hasAttribute = hasAttribute;
    anchor.getAttribute = getAttribute;
    anchor.setAttribute = setAttribute;
  }

  _aureliaPal.DOM.replaceNode(anchor, element);

  return anchor;
}

function applyInstructions(containers, element, instruction, controllers, bindings, children, shadowSlots, partReplacements, resources) {
  var behaviorInstructions = instruction.behaviorInstructions;
  var expressions = instruction.expressions;
  var elementContainer = void 0;
  var i = void 0;
  var ii = void 0;
  var current = void 0;
  var instance = void 0;

  if (instruction.contentExpression) {
    bindings.push(instruction.contentExpression.createBinding(element.nextSibling));
    element.nextSibling.auInterpolationTarget = true;
    element.parentNode.removeChild(element);
    return;
  }

  if (instruction.shadowSlot) {
    var commentAnchor = _aureliaPal.DOM.createComment('slot');
    var slot = void 0;

    if (instruction.slotDestination) {
      slot = new PassThroughSlot(commentAnchor, instruction.slotName, instruction.slotDestination, instruction.slotFallbackFactory);
    } else {
      slot = new ShadowSlot(commentAnchor, instruction.slotName, instruction.slotFallbackFactory);
    }

    _aureliaPal.DOM.replaceNode(commentAnchor, element);
    shadowSlots[instruction.slotName] = slot;
    controllers.push(slot);
    return;
  }

  if (behaviorInstructions.length) {
    if (!instruction.anchorIsContainer) {
      element = makeElementIntoAnchor(element, instruction.elementInstruction);
    }

    containers[instruction.injectorId] = elementContainer = createElementContainer(containers[instruction.parentInjectorId], element, instruction, children, partReplacements, resources);

    for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
      current = behaviorInstructions[i];
      instance = current.type.create(elementContainer, current, element, bindings);
      controllers.push(instance);
    }
  }

  for (i = 0, ii = expressions.length; i < ii; ++i) {
    bindings.push(expressions[i].createBinding(element));
  }
}

function styleStringToObject(style, target) {
  var attributes = style.split(';');
  var firstIndexOfColon = void 0;
  var i = void 0;
  var current = void 0;
  var key = void 0;
  var value = void 0;

  target = target || {};

  for (i = 0; i < attributes.length; i++) {
    current = attributes[i];
    firstIndexOfColon = current.indexOf(':');
    key = current.substring(0, firstIndexOfColon).trim();
    value = current.substring(firstIndexOfColon + 1).trim();
    target[key] = value;
  }

  return target;
}

function styleObjectToString(obj) {
  var result = '';

  for (var key in obj) {
    result += key + ':' + obj[key] + ';';
  }

  return result;
}

function applySurrogateInstruction(container, element, instruction, controllers, bindings, children) {
  var behaviorInstructions = instruction.behaviorInstructions;
  var expressions = instruction.expressions;
  var providers = instruction.providers;
  var values = instruction.values;
  var i = void 0;
  var ii = void 0;
  var current = void 0;
  var instance = void 0;
  var currentAttributeValue = void 0;

  i = providers.length;
  while (i--) {
    container._resolvers.set(providers[i], providerResolverInstance);
  }

  for (var key in values) {
    currentAttributeValue = element.getAttribute(key);

    if (currentAttributeValue) {
      if (key === 'class') {
        element.setAttribute('class', currentAttributeValue + ' ' + values[key]);
      } else if (key === 'style') {
        var styleObject = styleStringToObject(values[key]);
        styleStringToObject(currentAttributeValue, styleObject);
        element.setAttribute('style', styleObjectToString(styleObject));
      }
    } else {
      element.setAttribute(key, values[key]);
    }
  }

  if (behaviorInstructions.length) {
    for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
      current = behaviorInstructions[i];
      instance = current.type.create(container, current, element, bindings);

      if (instance.contentView) {
        children.push(instance.contentView);
      }

      controllers.push(instance);
    }
  }

  for (i = 0, ii = expressions.length; i < ii; ++i) {
    bindings.push(expressions[i].createBinding(element));
  }
}

var BoundViewFactory = exports.BoundViewFactory = function () {
  function BoundViewFactory(parentContainer, viewFactory, partReplacements) {
    

    this.parentContainer = parentContainer;
    this.viewFactory = viewFactory;
    this.factoryCreateInstruction = { partReplacements: partReplacements };
  }

  BoundViewFactory.prototype.create = function create() {
    var view = this.viewFactory.create(this.parentContainer.createChild(), this.factoryCreateInstruction);
    view._isUserControlled = true;
    return view;
  };

  BoundViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
    this.viewFactory.setCacheSize(size, doNotOverrideIfAlreadySet);
  };

  BoundViewFactory.prototype.getCachedView = function getCachedView() {
    return this.viewFactory.getCachedView();
  };

  BoundViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
    this.viewFactory.returnViewToCache(view);
  };

  _createClass(BoundViewFactory, [{
    key: 'isCaching',
    get: function get() {
      return this.viewFactory.isCaching;
    }
  }]);

  return BoundViewFactory;
}();

var ViewFactory = exports.ViewFactory = function () {
  function ViewFactory(template, instructions, resources) {
    

    this.isCaching = false;

    this.template = template;
    this.instructions = instructions;
    this.resources = resources;
    this.cacheSize = -1;
    this.cache = null;
  }

  ViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
    if (size) {
      if (size === '*') {
        size = Number.MAX_VALUE;
      } else if (typeof size === 'string') {
        size = parseInt(size, 10);
      }
    }

    if (this.cacheSize === -1 || !doNotOverrideIfAlreadySet) {
      this.cacheSize = size;
    }

    if (this.cacheSize > 0) {
      this.cache = [];
    } else {
      this.cache = null;
    }

    this.isCaching = this.cacheSize > 0;
  };

  ViewFactory.prototype.getCachedView = function getCachedView() {
    return this.cache !== null ? this.cache.pop() || null : null;
  };

  ViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
    if (view.isAttached) {
      view.detached();
    }

    if (view.isBound) {
      view.unbind();
    }

    if (this.cache !== null && this.cache.length < this.cacheSize) {
      view.fromCache = true;
      this.cache.push(view);
    }
  };

  ViewFactory.prototype.create = function create(container, createInstruction, element) {
    createInstruction = createInstruction || BehaviorInstruction.normal;

    var cachedView = this.getCachedView();
    if (cachedView !== null) {
      return cachedView;
    }

    var fragment = createInstruction.enhance ? this.template : this.template.cloneNode(true);
    var instructables = fragment.querySelectorAll('.au-target');
    var instructions = this.instructions;
    var resources = this.resources;
    var controllers = [];
    var bindings = [];
    var children = [];
    var shadowSlots = Object.create(null);
    var containers = { root: container };
    var partReplacements = createInstruction.partReplacements;
    var i = void 0;
    var ii = void 0;
    var view = void 0;
    var instructable = void 0;
    var instruction = void 0;

    this.resources._invokeHook('beforeCreate', this, container, fragment, createInstruction);

    if (element && this.surrogateInstruction !== null) {
      applySurrogateInstruction(container, element, this.surrogateInstruction, controllers, bindings, children);
    }

    if (createInstruction.enhance && fragment.hasAttribute('au-target-id')) {
      instructable = fragment;
      instruction = instructions[instructable.getAttribute('au-target-id')];
      applyInstructions(containers, instructable, instruction, controllers, bindings, children, shadowSlots, partReplacements, resources);
    }

    for (i = 0, ii = instructables.length; i < ii; ++i) {
      instructable = instructables[i];
      instruction = instructions[instructable.getAttribute('au-target-id')];
      applyInstructions(containers, instructable, instruction, controllers, bindings, children, shadowSlots, partReplacements, resources);
    }

    view = new View(container, this, fragment, controllers, bindings, children, shadowSlots);

    if (!createInstruction.initiatedByBehavior) {
      view.created();
    }

    this.resources._invokeHook('afterCreate', view);

    return view;
  };

  return ViewFactory;
}();

var nextInjectorId = 0;
function getNextInjectorId() {
  return ++nextInjectorId;
}

var lastAUTargetID = 0;
function getNextAUTargetID() {
  return (++lastAUTargetID).toString();
}

function makeIntoInstructionTarget(element) {
  var value = element.getAttribute('class');
  var auTargetID = getNextAUTargetID();

  element.setAttribute('class', value ? value + ' au-target' : 'au-target');
  element.setAttribute('au-target-id', auTargetID);

  return auTargetID;
}

function makeShadowSlot(compiler, resources, node, instructions, parentInjectorId) {
  var auShadowSlot = _aureliaPal.DOM.createElement('au-shadow-slot');
  _aureliaPal.DOM.replaceNode(auShadowSlot, node);

  var auTargetID = makeIntoInstructionTarget(auShadowSlot);
  var instruction = TargetInstruction.shadowSlot(parentInjectorId);

  instruction.slotName = node.getAttribute('name') || ShadowDOM.defaultSlotKey;
  instruction.slotDestination = node.getAttribute('slot');

  if (node.innerHTML.trim()) {
    var fragment = _aureliaPal.DOM.createDocumentFragment();
    var _child3 = void 0;

    while (_child3 = node.firstChild) {
      fragment.appendChild(_child3);
    }

    instruction.slotFallbackFactory = compiler.compile(fragment, resources);
  }

  instructions[auTargetID] = instruction;

  return auShadowSlot;
}

var ViewCompiler = exports.ViewCompiler = (_dec7 = (0, _aureliaDependencyInjection.inject)(BindingLanguage, ViewResources), _dec7(_class13 = function () {
  function ViewCompiler(bindingLanguage, resources) {
    

    this.bindingLanguage = bindingLanguage;
    this.resources = resources;
  }

  ViewCompiler.prototype.compile = function compile(source, resources, compileInstruction) {
    resources = resources || this.resources;
    compileInstruction = compileInstruction || ViewCompileInstruction.normal;
    source = typeof source === 'string' ? _aureliaPal.DOM.createTemplateFromMarkup(source) : source;

    var content = void 0;
    var part = void 0;
    var cacheSize = void 0;

    if (source.content) {
      part = source.getAttribute('part');
      cacheSize = source.getAttribute('view-cache');
      content = _aureliaPal.DOM.adoptNode(source.content);
    } else {
      content = source;
    }

    compileInstruction.targetShadowDOM = compileInstruction.targetShadowDOM && _aureliaPal.FEATURE.shadowDOM;
    resources._invokeHook('beforeCompile', content, resources, compileInstruction);

    var instructions = {};
    this._compileNode(content, resources, instructions, source, 'root', !compileInstruction.targetShadowDOM);

    var firstChild = content.firstChild;
    if (firstChild && firstChild.nodeType === 1) {
      var targetId = firstChild.getAttribute('au-target-id');
      if (targetId) {
        var ins = instructions[targetId];

        if (ins.shadowSlot || ins.lifting || ins.elementInstruction && !ins.elementInstruction.anchorIsContainer) {
          content.insertBefore(_aureliaPal.DOM.createComment('view'), firstChild);
        }
      }
    }

    var factory = new ViewFactory(content, instructions, resources);

    factory.surrogateInstruction = compileInstruction.compileSurrogate ? this._compileSurrogate(source, resources) : null;
    factory.part = part;

    if (cacheSize) {
      factory.setCacheSize(cacheSize);
    }

    resources._invokeHook('afterCompile', factory);

    return factory;
  };

  ViewCompiler.prototype._compileNode = function _compileNode(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
    switch (node.nodeType) {
      case 1:
        return this._compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM);
      case 3:
        var expression = resources.getBindingLanguage(this.bindingLanguage).inspectTextContent(resources, node.wholeText);
        if (expression) {
          var marker = _aureliaPal.DOM.createElement('au-marker');
          var auTargetID = makeIntoInstructionTarget(marker);
          (node.parentNode || parentNode).insertBefore(marker, node);
          node.textContent = ' ';
          instructions[auTargetID] = TargetInstruction.contentExpression(expression);

          while (node.nextSibling && node.nextSibling.nodeType === 3) {
            (node.parentNode || parentNode).removeChild(node.nextSibling);
          }
        } else {
          while (node.nextSibling && node.nextSibling.nodeType === 3) {
            node = node.nextSibling;
          }
        }
        return node.nextSibling;
      case 11:
        var currentChild = node.firstChild;
        while (currentChild) {
          currentChild = this._compileNode(currentChild, resources, instructions, node, parentInjectorId, targetLightDOM);
        }
        break;
      default:
        break;
    }

    return node.nextSibling;
  };

  ViewCompiler.prototype._compileSurrogate = function _compileSurrogate(node, resources) {
    var tagName = node.tagName.toLowerCase();
    var attributes = node.attributes;
    var bindingLanguage = resources.getBindingLanguage(this.bindingLanguage);
    var knownAttribute = void 0;
    var property = void 0;
    var instruction = void 0;
    var i = void 0;
    var ii = void 0;
    var attr = void 0;
    var attrName = void 0;
    var attrValue = void 0;
    var info = void 0;
    var type = void 0;
    var expressions = [];
    var expression = void 0;
    var behaviorInstructions = [];
    var values = {};
    var hasValues = false;
    var providers = [];

    for (i = 0, ii = attributes.length; i < ii; ++i) {
      attr = attributes[i];
      attrName = attr.name;
      attrValue = attr.value;

      info = bindingLanguage.inspectAttribute(resources, tagName, attrName, attrValue);
      type = resources.getAttribute(info.attrName);

      if (type) {
        knownAttribute = resources.mapAttribute(info.attrName);
        if (knownAttribute) {
          property = type.attributes[knownAttribute];

          if (property) {
            info.defaultBindingMode = property.defaultBindingMode;

            if (!info.command && !info.expression) {
              info.command = property.hasOptions ? 'options' : null;
            }

            if (info.command && info.command !== 'options' && type.primaryProperty) {
              attrName = info.attrName = type.primaryProperty.name;
            }
          }
        }
      }

      instruction = bindingLanguage.createAttributeInstruction(resources, node, info, undefined, type);

      if (instruction) {
        if (instruction.alteredAttr) {
          type = resources.getAttribute(instruction.attrName);
        }

        if (instruction.discrete) {
          expressions.push(instruction);
        } else {
          if (type) {
            instruction.type = type;
            this._configureProperties(instruction, resources);

            if (type.liftsContent) {
              throw new Error('You cannot place a template controller on a surrogate element.');
            } else {
              behaviorInstructions.push(instruction);
            }
          } else {
            expressions.push(instruction.attributes[instruction.attrName]);
          }
        }
      } else {
        if (type) {
          instruction = BehaviorInstruction.attribute(attrName, type);
          instruction.attributes[resources.mapAttribute(attrName)] = attrValue;

          if (type.liftsContent) {
            throw new Error('You cannot place a template controller on a surrogate element.');
          } else {
            behaviorInstructions.push(instruction);
          }
        } else if (attrName !== 'id' && attrName !== 'part' && attrName !== 'replace-part') {
          hasValues = true;
          values[attrName] = attrValue;
        }
      }
    }

    if (expressions.length || behaviorInstructions.length || hasValues) {
      for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
        instruction = behaviorInstructions[i];
        instruction.type.compile(this, resources, node, instruction);
        providers.push(instruction.type.target);
      }

      for (i = 0, ii = expressions.length; i < ii; ++i) {
        expression = expressions[i];
        if (expression.attrToRemove !== undefined) {
          node.removeAttribute(expression.attrToRemove);
        }
      }

      return TargetInstruction.surrogate(providers, behaviorInstructions, expressions, values);
    }

    return null;
  };

  ViewCompiler.prototype._compileElement = function _compileElement(node, resources, instructions, parentNode, parentInjectorId, targetLightDOM) {
    var tagName = node.tagName.toLowerCase();
    var attributes = node.attributes;
    var expressions = [];
    var expression = void 0;
    var behaviorInstructions = [];
    var providers = [];
    var bindingLanguage = resources.getBindingLanguage(this.bindingLanguage);
    var liftingInstruction = void 0;
    var viewFactory = void 0;
    var type = void 0;
    var elementInstruction = void 0;
    var elementProperty = void 0;
    var i = void 0;
    var ii = void 0;
    var attr = void 0;
    var attrName = void 0;
    var attrValue = void 0;
    var instruction = void 0;
    var info = void 0;
    var property = void 0;
    var knownAttribute = void 0;
    var auTargetID = void 0;
    var injectorId = void 0;

    if (tagName === 'slot') {
      if (targetLightDOM) {
        node = makeShadowSlot(this, resources, node, instructions, parentInjectorId);
      }
      return node.nextSibling;
    } else if (tagName === 'template') {
      viewFactory = this.compile(node, resources);
      viewFactory.part = node.getAttribute('part');
    } else {
      type = resources.getElement(node.getAttribute('as-element') || tagName);
      if (type) {
        elementInstruction = BehaviorInstruction.element(node, type);
        type.processAttributes(this, resources, node, attributes, elementInstruction);
        behaviorInstructions.push(elementInstruction);
      }
    }

    for (i = 0, ii = attributes.length; i < ii; ++i) {
      attr = attributes[i];
      attrName = attr.name;
      attrValue = attr.value;
      info = bindingLanguage.inspectAttribute(resources, tagName, attrName, attrValue);

      if (targetLightDOM && info.attrName === 'slot') {
        info.attrName = attrName = 'au-slot';
      }

      type = resources.getAttribute(info.attrName);
      elementProperty = null;

      if (type) {
        knownAttribute = resources.mapAttribute(info.attrName);
        if (knownAttribute) {
          property = type.attributes[knownAttribute];

          if (property) {
            info.defaultBindingMode = property.defaultBindingMode;

            if (!info.command && !info.expression) {
              info.command = property.hasOptions ? 'options' : null;
            }

            if (info.command && info.command !== 'options' && type.primaryProperty) {
              attrName = info.attrName = type.primaryProperty.name;
            }
          }
        }
      } else if (elementInstruction) {
        elementProperty = elementInstruction.type.attributes[info.attrName];
        if (elementProperty) {
          info.defaultBindingMode = elementProperty.defaultBindingMode;
        }
      }

      if (elementProperty) {
        instruction = bindingLanguage.createAttributeInstruction(resources, node, info, elementInstruction);
      } else {
        instruction = bindingLanguage.createAttributeInstruction(resources, node, info, undefined, type);
      }

      if (instruction) {
        if (instruction.alteredAttr) {
          type = resources.getAttribute(instruction.attrName);
        }

        if (instruction.discrete) {
          expressions.push(instruction);
        } else {
          if (type) {
            instruction.type = type;
            this._configureProperties(instruction, resources);

            if (type.liftsContent) {
              instruction.originalAttrName = attrName;
              liftingInstruction = instruction;
              break;
            } else {
              behaviorInstructions.push(instruction);
            }
          } else if (elementProperty) {
            elementInstruction.attributes[info.attrName].targetProperty = elementProperty.name;
          } else {
            expressions.push(instruction.attributes[instruction.attrName]);
          }
        }
      } else {
        if (type) {
          instruction = BehaviorInstruction.attribute(attrName, type);
          instruction.attributes[resources.mapAttribute(attrName)] = attrValue;

          if (type.liftsContent) {
            instruction.originalAttrName = attrName;
            liftingInstruction = instruction;
            break;
          } else {
            behaviorInstructions.push(instruction);
          }
        } else if (elementProperty) {
          elementInstruction.attributes[attrName] = attrValue;
        }
      }
    }

    if (liftingInstruction) {
      liftingInstruction.viewFactory = viewFactory;
      node = liftingInstruction.type.compile(this, resources, node, liftingInstruction, parentNode);
      auTargetID = makeIntoInstructionTarget(node);
      instructions[auTargetID] = TargetInstruction.lifting(parentInjectorId, liftingInstruction);
    } else {
      if (expressions.length || behaviorInstructions.length) {
        injectorId = behaviorInstructions.length ? getNextInjectorId() : false;

        for (i = 0, ii = behaviorInstructions.length; i < ii; ++i) {
          instruction = behaviorInstructions[i];
          instruction.type.compile(this, resources, node, instruction, parentNode);
          providers.push(instruction.type.target);
        }

        for (i = 0, ii = expressions.length; i < ii; ++i) {
          expression = expressions[i];
          if (expression.attrToRemove !== undefined) {
            node.removeAttribute(expression.attrToRemove);
          }
        }

        auTargetID = makeIntoInstructionTarget(node);
        instructions[auTargetID] = TargetInstruction.normal(injectorId, parentInjectorId, providers, behaviorInstructions, expressions, elementInstruction);
      }

      if (elementInstruction && elementInstruction.skipContentProcessing) {
        return node.nextSibling;
      }

      var currentChild = node.firstChild;
      while (currentChild) {
        currentChild = this._compileNode(currentChild, resources, instructions, node, injectorId || parentInjectorId, targetLightDOM);
      }
    }

    return node.nextSibling;
  };

  ViewCompiler.prototype._configureProperties = function _configureProperties(instruction, resources) {
    var type = instruction.type;
    var attrName = instruction.attrName;
    var attributes = instruction.attributes;
    var property = void 0;
    var key = void 0;
    var value = void 0;

    var knownAttribute = resources.mapAttribute(attrName);
    if (knownAttribute && attrName in attributes && knownAttribute !== attrName) {
      attributes[knownAttribute] = attributes[attrName];
      delete attributes[attrName];
    }

    for (key in attributes) {
      value = attributes[key];

      if (value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        property = type.attributes[key];

        if (property !== undefined) {
          value.targetProperty = property.name;
        } else {
          value.targetProperty = key;
        }
      }
    }
  };

  return ViewCompiler;
}()) || _class13);

var ResourceModule = exports.ResourceModule = function () {
  function ResourceModule(moduleId) {
    

    this.id = moduleId;
    this.moduleInstance = null;
    this.mainResource = null;
    this.resources = null;
    this.viewStrategy = null;
    this.isInitialized = false;
    this.onLoaded = null;
    this.loadContext = null;
  }

  ResourceModule.prototype.initialize = function initialize(container) {
    var current = this.mainResource;
    var resources = this.resources;
    var vs = this.viewStrategy;

    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;

    if (current !== undefined) {
      current.metadata.viewStrategy = vs;
      current.initialize(container);
    }

    for (var i = 0, ii = resources.length; i < ii; ++i) {
      current = resources[i];
      current.metadata.viewStrategy = vs;
      current.initialize(container);
    }
  };

  ResourceModule.prototype.register = function register(registry, name) {
    var main = this.mainResource;
    var resources = this.resources;

    if (main !== undefined) {
      main.register(registry, name);
      name = null;
    }

    for (var i = 0, ii = resources.length; i < ii; ++i) {
      resources[i].register(registry, name);
      name = null;
    }
  };

  ResourceModule.prototype.load = function load(container, loadContext) {
    if (this.onLoaded !== null) {
      return this.loadContext === loadContext ? Promise.resolve() : this.onLoaded;
    }

    var main = this.mainResource;
    var resources = this.resources;
    var loads = void 0;

    if (main !== undefined) {
      loads = new Array(resources.length + 1);
      loads[0] = main.load(container, loadContext);
      for (var i = 0, ii = resources.length; i < ii; ++i) {
        loads[i + 1] = resources[i].load(container, loadContext);
      }
    } else {
      loads = new Array(resources.length);
      for (var _i = 0, _ii = resources.length; _i < _ii; ++_i) {
        loads[_i] = resources[_i].load(container, loadContext);
      }
    }

    this.loadContext = loadContext;
    this.onLoaded = Promise.all(loads);
    return this.onLoaded;
  };

  return ResourceModule;
}();

var ResourceDescription = exports.ResourceDescription = function () {
  function ResourceDescription(key, exportedValue, resourceTypeMeta) {
    

    if (!resourceTypeMeta) {
      resourceTypeMeta = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.resource, exportedValue);

      if (!resourceTypeMeta) {
        resourceTypeMeta = new HtmlBehaviorResource();
        resourceTypeMeta.elementName = _hyphenate(key);
        _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, resourceTypeMeta, exportedValue);
      }
    }

    if (resourceTypeMeta instanceof HtmlBehaviorResource) {
      if (resourceTypeMeta.elementName === undefined) {
        resourceTypeMeta.elementName = _hyphenate(key);
      } else if (resourceTypeMeta.attributeName === undefined) {
        resourceTypeMeta.attributeName = _hyphenate(key);
      } else if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
        HtmlBehaviorResource.convention(key, resourceTypeMeta);
      }
    } else if (!resourceTypeMeta.name) {
      resourceTypeMeta.name = _hyphenate(key);
    }

    this.metadata = resourceTypeMeta;
    this.value = exportedValue;
  }

  ResourceDescription.prototype.initialize = function initialize(container) {
    this.metadata.initialize(container, this.value);
  };

  ResourceDescription.prototype.register = function register(registry, name) {
    this.metadata.register(registry, name);
  };

  ResourceDescription.prototype.load = function load(container, loadContext) {
    return this.metadata.load(container, this.value, loadContext);
  };

  return ResourceDescription;
}();

var ModuleAnalyzer = exports.ModuleAnalyzer = function () {
  function ModuleAnalyzer() {
    

    this.cache = Object.create(null);
  }

  ModuleAnalyzer.prototype.getAnalysis = function getAnalysis(moduleId) {
    return this.cache[moduleId];
  };

  ModuleAnalyzer.prototype.analyze = function analyze(moduleId, moduleInstance, mainResourceKey) {
    var mainResource = void 0;
    var fallbackValue = void 0;
    var fallbackKey = void 0;
    var resourceTypeMeta = void 0;
    var key = void 0;
    var exportedValue = void 0;
    var resources = [];
    var conventional = void 0;
    var vs = void 0;
    var resourceModule = void 0;

    resourceModule = this.cache[moduleId];
    if (resourceModule) {
      return resourceModule;
    }

    resourceModule = new ResourceModule(moduleId);
    this.cache[moduleId] = resourceModule;

    if (typeof moduleInstance === 'function') {
      moduleInstance = { 'default': moduleInstance };
    }

    if (mainResourceKey) {
      mainResource = new ResourceDescription(mainResourceKey, moduleInstance[mainResourceKey]);
    }

    for (key in moduleInstance) {
      exportedValue = moduleInstance[key];

      if (key === mainResourceKey || typeof exportedValue !== 'function') {
        continue;
      }

      resourceTypeMeta = _aureliaMetadata.metadata.get(_aureliaMetadata.metadata.resource, exportedValue);

      if (resourceTypeMeta) {
        if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
          HtmlBehaviorResource.convention(key, resourceTypeMeta);
        }

        if (resourceTypeMeta.attributeName === null && resourceTypeMeta.elementName === null) {
          resourceTypeMeta.elementName = _hyphenate(key);
        }

        if (!mainResource && resourceTypeMeta instanceof HtmlBehaviorResource && resourceTypeMeta.elementName !== null) {
          mainResource = new ResourceDescription(key, exportedValue, resourceTypeMeta);
        } else {
          resources.push(new ResourceDescription(key, exportedValue, resourceTypeMeta));
        }
      } else if (viewStrategy.decorates(exportedValue)) {
        vs = exportedValue;
      } else if (exportedValue instanceof _aureliaLoader.TemplateRegistryEntry) {
        vs = new TemplateRegistryViewStrategy(moduleId, exportedValue);
      } else {
        if (conventional = HtmlBehaviorResource.convention(key)) {
          if (conventional.elementName !== null && !mainResource) {
            mainResource = new ResourceDescription(key, exportedValue, conventional);
          } else {
            resources.push(new ResourceDescription(key, exportedValue, conventional));
          }

          _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, conventional, exportedValue);
        } else if (conventional = _aureliaBinding.ValueConverterResource.convention(key) || _aureliaBinding.BindingBehaviorResource.convention(key) || ViewEngineHooksResource.convention(key)) {
          resources.push(new ResourceDescription(key, exportedValue, conventional));
          _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, conventional, exportedValue);
        } else if (!fallbackValue) {
          fallbackValue = exportedValue;
          fallbackKey = key;
        }
      }
    }

    if (!mainResource && fallbackValue) {
      mainResource = new ResourceDescription(fallbackKey, fallbackValue);
    }

    resourceModule.moduleInstance = moduleInstance;
    resourceModule.mainResource = mainResource;
    resourceModule.resources = resources;
    resourceModule.viewStrategy = vs;

    return resourceModule;
  };

  return ModuleAnalyzer;
}();

var logger = LogManager.getLogger('templating');

function ensureRegistryEntry(loader, urlOrRegistryEntry) {
  if (urlOrRegistryEntry instanceof _aureliaLoader.TemplateRegistryEntry) {
    return Promise.resolve(urlOrRegistryEntry);
  }

  return loader.loadTemplate(urlOrRegistryEntry);
}

var ProxyViewFactory = function () {
  function ProxyViewFactory(promise) {
    var _this9 = this;

    

    promise.then(function (x) {
      return _this9.viewFactory = x;
    });
  }

  ProxyViewFactory.prototype.create = function create(container, bindingContext, createInstruction, element) {
    return this.viewFactory.create(container, bindingContext, createInstruction, element);
  };

  ProxyViewFactory.prototype.setCacheSize = function setCacheSize(size, doNotOverrideIfAlreadySet) {
    this.viewFactory.setCacheSize(size, doNotOverrideIfAlreadySet);
  };

  ProxyViewFactory.prototype.getCachedView = function getCachedView() {
    return this.viewFactory.getCachedView();
  };

  ProxyViewFactory.prototype.returnViewToCache = function returnViewToCache(view) {
    this.viewFactory.returnViewToCache(view);
  };

  _createClass(ProxyViewFactory, [{
    key: 'isCaching',
    get: function get() {
      return this.viewFactory.isCaching;
    }
  }]);

  return ProxyViewFactory;
}();

var ViewEngine = exports.ViewEngine = (_dec8 = (0, _aureliaDependencyInjection.inject)(_aureliaLoader.Loader, _aureliaDependencyInjection.Container, ViewCompiler, ModuleAnalyzer, ViewResources), _dec8(_class14 = (_temp4 = _class15 = function () {
  function ViewEngine(loader, container, viewCompiler, moduleAnalyzer, appResources) {
    

    this.loader = loader;
    this.container = container;
    this.viewCompiler = viewCompiler;
    this.moduleAnalyzer = moduleAnalyzer;
    this.appResources = appResources;
    this._pluginMap = {};

    var auSlotBehavior = new HtmlBehaviorResource();
    auSlotBehavior.attributeName = 'au-slot';
    auSlotBehavior.initialize(container, SlotCustomAttribute);
    auSlotBehavior.register(appResources);
  }

  ViewEngine.prototype.addResourcePlugin = function addResourcePlugin(extension, implementation) {
    var name = extension.replace('.', '') + '-resource-plugin';
    this._pluginMap[extension] = name;
    this.loader.addPlugin(name, implementation);
  };

  ViewEngine.prototype.loadViewFactory = function loadViewFactory(urlOrRegistryEntry, compileInstruction, loadContext, target) {
    var _this10 = this;

    loadContext = loadContext || new ResourceLoadContext();

    return ensureRegistryEntry(this.loader, urlOrRegistryEntry).then(function (registryEntry) {
      if (registryEntry.onReady) {
        if (!loadContext.hasDependency(urlOrRegistryEntry)) {
          loadContext.addDependency(urlOrRegistryEntry);
          return registryEntry.onReady;
        }

        if (registryEntry.template === null) {
          return registryEntry.onReady;
        }

        return Promise.resolve(new ProxyViewFactory(registryEntry.onReady));
      }

      loadContext.addDependency(urlOrRegistryEntry);

      registryEntry.onReady = _this10.loadTemplateResources(registryEntry, compileInstruction, loadContext, target).then(function (resources) {
        registryEntry.resources = resources;

        if (registryEntry.template === null) {
          return registryEntry.factory = null;
        }

        var viewFactory = _this10.viewCompiler.compile(registryEntry.template, resources, compileInstruction);
        return registryEntry.factory = viewFactory;
      });

      return registryEntry.onReady;
    });
  };

  ViewEngine.prototype.loadTemplateResources = function loadTemplateResources(registryEntry, compileInstruction, loadContext, target) {
    var resources = new ViewResources(this.appResources, registryEntry.address);
    var dependencies = registryEntry.dependencies;
    var importIds = void 0;
    var names = void 0;

    compileInstruction = compileInstruction || ViewCompileInstruction.normal;

    if (dependencies.length === 0 && !compileInstruction.associatedModuleId) {
      return Promise.resolve(resources);
    }

    importIds = dependencies.map(function (x) {
      return x.src;
    });
    names = dependencies.map(function (x) {
      return x.name;
    });
    logger.debug('importing resources for ' + registryEntry.address, importIds);

    if (target) {
      var viewModelRequires = _aureliaMetadata.metadata.get(ViewEngine.viewModelRequireMetadataKey, target);
      if (viewModelRequires) {
        var templateImportCount = importIds.length;
        for (var i = 0, ii = viewModelRequires.length; i < ii; ++i) {
          var req = viewModelRequires[i];
          var importId = typeof req === 'function' ? _aureliaMetadata.Origin.get(req).moduleId : (0, _aureliaPath.relativeToFile)(req.src || req, registryEntry.address);

          if (importIds.indexOf(importId) === -1) {
            importIds.push(importId);
            names.push(req.as);
          }
        }
        logger.debug('importing ViewModel resources for ' + compileInstruction.associatedModuleId, importIds.slice(templateImportCount));
      }
    }

    return this.importViewResources(importIds, names, resources, compileInstruction, loadContext);
  };

  ViewEngine.prototype.importViewModelResource = function importViewModelResource(moduleImport, moduleMember) {
    var _this11 = this;

    return this.loader.loadModule(moduleImport).then(function (viewModelModule) {
      var normalizedId = _aureliaMetadata.Origin.get(viewModelModule).moduleId;
      var resourceModule = _this11.moduleAnalyzer.analyze(normalizedId, viewModelModule, moduleMember);

      if (!resourceModule.mainResource) {
        throw new Error('No view model found in module "' + moduleImport + '".');
      }

      resourceModule.initialize(_this11.container);

      return resourceModule.mainResource;
    });
  };

  ViewEngine.prototype.importViewResources = function importViewResources(moduleIds, names, resources, compileInstruction, loadContext) {
    var _this12 = this;

    loadContext = loadContext || new ResourceLoadContext();
    compileInstruction = compileInstruction || ViewCompileInstruction.normal;

    moduleIds = moduleIds.map(function (x) {
      return _this12._applyLoaderPlugin(x);
    });

    return this.loader.loadAllModules(moduleIds).then(function (imports) {
      var i = void 0;
      var ii = void 0;
      var analysis = void 0;
      var normalizedId = void 0;
      var current = void 0;
      var associatedModule = void 0;
      var container = _this12.container;
      var moduleAnalyzer = _this12.moduleAnalyzer;
      var allAnalysis = new Array(imports.length);

      for (i = 0, ii = imports.length; i < ii; ++i) {
        current = imports[i];
        normalizedId = _aureliaMetadata.Origin.get(current).moduleId;

        analysis = moduleAnalyzer.analyze(normalizedId, current);
        analysis.initialize(container);
        analysis.register(resources, names[i]);

        allAnalysis[i] = analysis;
      }

      if (compileInstruction.associatedModuleId) {
        associatedModule = moduleAnalyzer.getAnalysis(compileInstruction.associatedModuleId);

        if (associatedModule) {
          associatedModule.register(resources);
        }
      }

      for (i = 0, ii = allAnalysis.length; i < ii; ++i) {
        allAnalysis[i] = allAnalysis[i].load(container, loadContext);
      }

      return Promise.all(allAnalysis).then(function () {
        return resources;
      });
    });
  };

  ViewEngine.prototype._applyLoaderPlugin = function _applyLoaderPlugin(id) {
    var index = id.lastIndexOf('.');
    if (index !== -1) {
      var ext = id.substring(index);
      var pluginName = this._pluginMap[ext];

      if (pluginName === undefined) {
        return id;
      }

      return this.loader.applyPluginToUrl(id, pluginName);
    }

    return id;
  };

  return ViewEngine;
}(), _class15.viewModelRequireMetadataKey = 'aurelia:view-model-require', _temp4)) || _class14);

var Controller = exports.Controller = function () {
  function Controller(behavior, instruction, viewModel, container) {
    

    this.behavior = behavior;
    this.instruction = instruction;
    this.viewModel = viewModel;
    this.isAttached = false;
    this.view = null;
    this.isBound = false;
    this.scope = null;
    this.container = container;
    this.elementEvents = container.elementEvents || null;

    var observerLookup = behavior.observerLocator.getOrCreateObserversLookup(viewModel);
    var handlesBind = behavior.handlesBind;
    var attributes = instruction.attributes;
    var boundProperties = this.boundProperties = [];
    var properties = behavior.properties;
    var i = void 0;
    var ii = void 0;

    behavior._ensurePropertiesDefined(viewModel, observerLookup);

    for (i = 0, ii = properties.length; i < ii; ++i) {
      properties[i]._initialize(viewModel, observerLookup, attributes, handlesBind, boundProperties);
    }
  }

  Controller.prototype.created = function created(owningView) {
    if (this.behavior.handlesCreated) {
      this.viewModel.created(owningView, this.view);
    }
  };

  Controller.prototype.automate = function automate(overrideContext, owningView) {
    this.view.bindingContext = this.viewModel;
    this.view.overrideContext = overrideContext || (0, _aureliaBinding.createOverrideContext)(this.viewModel);
    this.view._isUserControlled = true;

    if (this.behavior.handlesCreated) {
      this.viewModel.created(owningView || null, this.view);
    }

    this.bind(this.view);
  };

  Controller.prototype.bind = function bind(scope) {
    var skipSelfSubscriber = this.behavior.handlesBind;
    var boundProperties = this.boundProperties;
    var i = void 0;
    var ii = void 0;
    var x = void 0;
    var observer = void 0;
    var selfSubscriber = void 0;

    if (this.isBound) {
      if (this.scope === scope) {
        return;
      }

      this.unbind();
    }

    this.isBound = true;
    this.scope = scope;

    for (i = 0, ii = boundProperties.length; i < ii; ++i) {
      x = boundProperties[i];
      observer = x.observer;
      selfSubscriber = observer.selfSubscriber;
      observer.publishing = false;

      if (skipSelfSubscriber) {
        observer.selfSubscriber = null;
      }

      x.binding.bind(scope);
      observer.call();

      observer.publishing = true;
      observer.selfSubscriber = selfSubscriber;
    }

    var overrideContext = void 0;
    if (this.view !== null) {
      if (skipSelfSubscriber) {
        this.view.viewModelScope = scope;
      }

      if (this.viewModel === scope.overrideContext.bindingContext) {
        overrideContext = scope.overrideContext;
      } else if (this.instruction.inheritBindingContext) {
        overrideContext = (0, _aureliaBinding.createOverrideContext)(this.viewModel, scope.overrideContext);
      } else {
        overrideContext = (0, _aureliaBinding.createOverrideContext)(this.viewModel);
        overrideContext.__parentOverrideContext = scope.overrideContext;
      }

      this.view.bind(this.viewModel, overrideContext);
    } else if (skipSelfSubscriber) {
      overrideContext = scope.overrideContext;

      if (scope.overrideContext.__parentOverrideContext !== undefined && this.viewModel.viewFactory && this.viewModel.viewFactory.factoryCreateInstruction.partReplacements) {
        overrideContext = Object.assign({}, scope.overrideContext);
        overrideContext.parentOverrideContext = scope.overrideContext.__parentOverrideContext;
      }
      this.viewModel.bind(scope.bindingContext, overrideContext);
    }
  };

  Controller.prototype.unbind = function unbind() {
    if (this.isBound) {
      var _boundProperties = this.boundProperties;
      var _i2 = void 0;
      var _ii2 = void 0;

      this.isBound = false;
      this.scope = null;

      if (this.view !== null) {
        this.view.unbind();
      }

      if (this.behavior.handlesUnbind) {
        this.viewModel.unbind();
      }

      if (this.elementEvents !== null) {
        this.elementEvents.disposeAll();
      }

      for (_i2 = 0, _ii2 = _boundProperties.length; _i2 < _ii2; ++_i2) {
        _boundProperties[_i2].binding.unbind();
      }
    }
  };

  Controller.prototype.attached = function attached() {
    if (this.isAttached) {
      return;
    }

    this.isAttached = true;

    if (this.behavior.handlesAttached) {
      this.viewModel.attached();
    }

    if (this.view !== null) {
      this.view.attached();
    }
  };

  Controller.prototype.detached = function detached() {
    if (this.isAttached) {
      this.isAttached = false;

      if (this.view !== null) {
        this.view.detached();
      }

      if (this.behavior.handlesDetached) {
        this.viewModel.detached();
      }
    }
  };

  return Controller;
}();

var BehaviorPropertyObserver = exports.BehaviorPropertyObserver = (_dec9 = (0, _aureliaBinding.subscriberCollection)(), _dec9(_class16 = function () {
  function BehaviorPropertyObserver(taskQueue, obj, propertyName, selfSubscriber, initialValue) {
    

    this.taskQueue = taskQueue;
    this.obj = obj;
    this.propertyName = propertyName;
    this.notqueued = true;
    this.publishing = false;
    this.selfSubscriber = selfSubscriber;
    this.currentValue = this.oldValue = initialValue;
  }

  BehaviorPropertyObserver.prototype.getValue = function getValue() {
    return this.currentValue;
  };

  BehaviorPropertyObserver.prototype.setValue = function setValue(newValue) {
    var oldValue = this.currentValue;

    if (oldValue !== newValue) {
      this.oldValue = oldValue;
      this.currentValue = newValue;

      if (this.publishing && this.notqueued) {
        if (this.taskQueue.flushing) {
          this.call();
        } else {
          this.notqueued = false;
          this.taskQueue.queueMicroTask(this);
        }
      }
    }
  };

  BehaviorPropertyObserver.prototype.call = function call() {
    var oldValue = this.oldValue;
    var newValue = this.currentValue;

    this.notqueued = true;

    if (newValue === oldValue) {
      return;
    }

    if (this.selfSubscriber) {
      this.selfSubscriber(newValue, oldValue);
    }

    this.callSubscribers(newValue, oldValue);
    this.oldValue = newValue;
  };

  BehaviorPropertyObserver.prototype.subscribe = function subscribe(context, callable) {
    this.addSubscriber(context, callable);
  };

  BehaviorPropertyObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
    this.removeSubscriber(context, callable);
  };

  return BehaviorPropertyObserver;
}()) || _class16);


function getObserver(behavior, instance, name) {
  var lookup = instance.__observers__;

  if (lookup === undefined) {
    if (!behavior.isInitialized) {
      behavior.initialize(_aureliaDependencyInjection.Container.instance || new _aureliaDependencyInjection.Container(), instance.constructor);
    }

    lookup = behavior.observerLocator.getOrCreateObserversLookup(instance);
    behavior._ensurePropertiesDefined(instance, lookup);
  }

  return lookup[name];
}

var BindableProperty = exports.BindableProperty = function () {
  function BindableProperty(nameOrConfig) {
    

    if (typeof nameOrConfig === 'string') {
      this.name = nameOrConfig;
    } else {
      Object.assign(this, nameOrConfig);
    }

    this.attribute = this.attribute || _hyphenate(this.name);
    if (this.defaultBindingMode === null || this.defaultBindingMode === undefined) {
      this.defaultBindingMode = _aureliaBinding.bindingMode.oneWay;
    }
    this.changeHandler = this.changeHandler || null;
    this.owner = null;
    this.descriptor = null;
  }

  BindableProperty.prototype.registerWith = function registerWith(target, behavior, descriptor) {
    behavior.properties.push(this);
    behavior.attributes[this.attribute] = this;
    this.owner = behavior;

    if (descriptor) {
      this.descriptor = descriptor;
      return this._configureDescriptor(behavior, descriptor);
    }

    return undefined;
  };

  BindableProperty.prototype._configureDescriptor = function _configureDescriptor(behavior, descriptor) {
    var name = this.name;

    descriptor.configurable = true;
    descriptor.enumerable = true;

    if ('initializer' in descriptor) {
      this.defaultValue = descriptor.initializer;
      delete descriptor.initializer;
      delete descriptor.writable;
    }

    if ('value' in descriptor) {
      this.defaultValue = descriptor.value;
      delete descriptor.value;
      delete descriptor.writable;
    }

    descriptor.get = function () {
      return getObserver(behavior, this, name).getValue();
    };

    descriptor.set = function (value) {
      getObserver(behavior, this, name).setValue(value);
    };

    descriptor.get.getObserver = function (obj) {
      return getObserver(behavior, obj, name);
    };

    return descriptor;
  };

  BindableProperty.prototype.defineOn = function defineOn(target, behavior) {
    var name = this.name;
    var handlerName = void 0;

    if (this.changeHandler === null) {
      handlerName = name + 'Changed';
      if (handlerName in target.prototype) {
        this.changeHandler = handlerName;
      }
    }

    if (this.descriptor === null) {
      Object.defineProperty(target.prototype, name, this._configureDescriptor(behavior, {}));
    }
  };

  BindableProperty.prototype.createObserver = function createObserver(viewModel) {
    var selfSubscriber = null;
    var defaultValue = this.defaultValue;
    var changeHandlerName = this.changeHandler;
    var name = this.name;
    var initialValue = void 0;

    if (this.hasOptions) {
      return undefined;
    }

    if (changeHandlerName in viewModel) {
      if ('propertyChanged' in viewModel) {
        selfSubscriber = function selfSubscriber(newValue, oldValue) {
          viewModel[changeHandlerName](newValue, oldValue);
          viewModel.propertyChanged(name, newValue, oldValue);
        };
      } else {
        selfSubscriber = function selfSubscriber(newValue, oldValue) {
          return viewModel[changeHandlerName](newValue, oldValue);
        };
      }
    } else if ('propertyChanged' in viewModel) {
      selfSubscriber = function selfSubscriber(newValue, oldValue) {
        return viewModel.propertyChanged(name, newValue, oldValue);
      };
    } else if (changeHandlerName !== null) {
      throw new Error('Change handler ' + changeHandlerName + ' was specified but not declared on the class.');
    }

    if (defaultValue !== undefined) {
      initialValue = typeof defaultValue === 'function' ? defaultValue.call(viewModel) : defaultValue;
    }

    return new BehaviorPropertyObserver(this.owner.taskQueue, viewModel, this.name, selfSubscriber, initialValue);
  };

  BindableProperty.prototype._initialize = function _initialize(viewModel, observerLookup, attributes, behaviorHandlesBind, boundProperties) {
    var selfSubscriber = void 0;
    var observer = void 0;
    var attribute = void 0;
    var defaultValue = this.defaultValue;

    if (this.isDynamic) {
      for (var key in attributes) {
        this._createDynamicProperty(viewModel, observerLookup, behaviorHandlesBind, key, attributes[key], boundProperties);
      }
    } else if (!this.hasOptions) {
      observer = observerLookup[this.name];

      if (attributes !== null) {
        selfSubscriber = observer.selfSubscriber;
        attribute = attributes[this.attribute];

        if (behaviorHandlesBind) {
          observer.selfSubscriber = null;
        }

        if (typeof attribute === 'string') {
          viewModel[this.name] = attribute;
          observer.call();
        } else if (attribute) {
          boundProperties.push({ observer: observer, binding: attribute.createBinding(viewModel) });
        } else if (defaultValue !== undefined) {
          observer.call();
        }

        observer.selfSubscriber = selfSubscriber;
      }

      observer.publishing = true;
    }
  };

  BindableProperty.prototype._createDynamicProperty = function _createDynamicProperty(viewModel, observerLookup, behaviorHandlesBind, name, attribute, boundProperties) {
    var changeHandlerName = name + 'Changed';
    var selfSubscriber = null;
    var observer = void 0;
    var info = void 0;

    if (changeHandlerName in viewModel) {
      if ('propertyChanged' in viewModel) {
        selfSubscriber = function selfSubscriber(newValue, oldValue) {
          viewModel[changeHandlerName](newValue, oldValue);
          viewModel.propertyChanged(name, newValue, oldValue);
        };
      } else {
        selfSubscriber = function selfSubscriber(newValue, oldValue) {
          return viewModel[changeHandlerName](newValue, oldValue);
        };
      }
    } else if ('propertyChanged' in viewModel) {
      selfSubscriber = function selfSubscriber(newValue, oldValue) {
        return viewModel.propertyChanged(name, newValue, oldValue);
      };
    }

    observer = observerLookup[name] = new BehaviorPropertyObserver(this.owner.taskQueue, viewModel, name, selfSubscriber);

    Object.defineProperty(viewModel, name, {
      configurable: true,
      enumerable: true,
      get: observer.getValue.bind(observer),
      set: observer.setValue.bind(observer)
    });

    if (behaviorHandlesBind) {
      observer.selfSubscriber = null;
    }

    if (typeof attribute === 'string') {
      viewModel[name] = attribute;
      observer.call();
    } else if (attribute) {
      info = { observer: observer, binding: attribute.createBinding(viewModel) };
      boundProperties.push(info);
    }

    observer.publishing = true;
    observer.selfSubscriber = selfSubscriber;
  };

  return BindableProperty;
}();

var lastProviderId = 0;

function nextProviderId() {
  return ++lastProviderId;
}

function doProcessContent() {
  return true;
}
function doProcessAttributes() {}

var HtmlBehaviorResource = exports.HtmlBehaviorResource = function () {
  function HtmlBehaviorResource() {
    

    this.elementName = null;
    this.attributeName = null;
    this.attributeDefaultBindingMode = undefined;
    this.liftsContent = false;
    this.targetShadowDOM = false;
    this.shadowDOMOptions = null;
    this.processAttributes = doProcessAttributes;
    this.processContent = doProcessContent;
    this.usesShadowDOM = false;
    this.childBindings = null;
    this.hasDynamicOptions = false;
    this.containerless = false;
    this.properties = [];
    this.attributes = {};
    this.isInitialized = false;
    this.primaryProperty = null;
  }

  HtmlBehaviorResource.convention = function convention(name, existing) {
    var behavior = void 0;

    if (name.endsWith('CustomAttribute')) {
      behavior = existing || new HtmlBehaviorResource();
      behavior.attributeName = _hyphenate(name.substring(0, name.length - 15));
    }

    if (name.endsWith('CustomElement')) {
      behavior = existing || new HtmlBehaviorResource();
      behavior.elementName = _hyphenate(name.substring(0, name.length - 13));
    }

    return behavior;
  };

  HtmlBehaviorResource.prototype.addChildBinding = function addChildBinding(behavior) {
    if (this.childBindings === null) {
      this.childBindings = [];
    }

    this.childBindings.push(behavior);
  };

  HtmlBehaviorResource.prototype.initialize = function initialize(container, target) {
    var proto = target.prototype;
    var properties = this.properties;
    var attributeName = this.attributeName;
    var attributeDefaultBindingMode = this.attributeDefaultBindingMode;
    var i = void 0;
    var ii = void 0;
    var current = void 0;

    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;
    target.__providerId__ = nextProviderId();

    this.observerLocator = container.get(_aureliaBinding.ObserverLocator);
    this.taskQueue = container.get(_aureliaTaskQueue.TaskQueue);

    this.target = target;
    this.usesShadowDOM = this.targetShadowDOM && _aureliaPal.FEATURE.shadowDOM;
    this.handlesCreated = 'created' in proto;
    this.handlesBind = 'bind' in proto;
    this.handlesUnbind = 'unbind' in proto;
    this.handlesAttached = 'attached' in proto;
    this.handlesDetached = 'detached' in proto;
    this.htmlName = this.elementName || this.attributeName;

    if (attributeName !== null) {
      if (properties.length === 0) {
        new BindableProperty({
          name: 'value',
          changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
          attribute: attributeName,
          defaultBindingMode: attributeDefaultBindingMode
        }).registerWith(target, this);
      }

      current = properties[0];

      if (properties.length === 1 && current.name === 'value') {
        current.isDynamic = current.hasOptions = this.hasDynamicOptions;
        current.defineOn(target, this);
      } else {
        for (i = 0, ii = properties.length; i < ii; ++i) {
          properties[i].defineOn(target, this);
          if (properties[i].primaryProperty) {
            if (this.primaryProperty) {
              throw new Error('Only one bindable property on a custom element can be defined as the default');
            }
            this.primaryProperty = properties[i];
          }
        }

        current = new BindableProperty({
          name: 'value',
          changeHandler: 'valueChanged' in proto ? 'valueChanged' : null,
          attribute: attributeName,
          defaultBindingMode: attributeDefaultBindingMode
        });

        current.hasOptions = true;
        current.registerWith(target, this);
      }
    } else {
      for (i = 0, ii = properties.length; i < ii; ++i) {
        properties[i].defineOn(target, this);
      }
    }
  };

  HtmlBehaviorResource.prototype.register = function register(registry, name) {
    if (this.attributeName !== null) {
      registry.registerAttribute(name || this.attributeName, this, this.attributeName);
    }

    if (this.elementName !== null) {
      registry.registerElement(name || this.elementName, this);
    }
  };

  HtmlBehaviorResource.prototype.load = function load(container, target, loadContext, viewStrategy, transientView) {
    var _this13 = this;

    var options = void 0;

    if (this.elementName !== null) {
      viewStrategy = container.get(ViewLocator).getViewStrategy(viewStrategy || this.viewStrategy || target);
      options = new ViewCompileInstruction(this.targetShadowDOM, true);

      if (!viewStrategy.moduleId) {
        viewStrategy.moduleId = _aureliaMetadata.Origin.get(target).moduleId;
      }

      return viewStrategy.loadViewFactory(container.get(ViewEngine), options, loadContext, target).then(function (viewFactory) {
        if (!transientView || !_this13.viewFactory) {
          _this13.viewFactory = viewFactory;
        }

        return viewFactory;
      });
    }

    return Promise.resolve(this);
  };

  HtmlBehaviorResource.prototype.compile = function compile(compiler, resources, node, instruction, parentNode) {
    if (this.liftsContent) {
      if (!instruction.viewFactory) {
        var template = _aureliaPal.DOM.createElement('template');
        var fragment = _aureliaPal.DOM.createDocumentFragment();
        var cacheSize = node.getAttribute('view-cache');
        var part = node.getAttribute('part');

        node.removeAttribute(instruction.originalAttrName);
        _aureliaPal.DOM.replaceNode(template, node, parentNode);
        fragment.appendChild(node);
        instruction.viewFactory = compiler.compile(fragment, resources);

        if (part) {
          instruction.viewFactory.part = part;
          node.removeAttribute('part');
        }

        if (cacheSize) {
          instruction.viewFactory.setCacheSize(cacheSize);
          node.removeAttribute('view-cache');
        }

        node = template;
      }
    } else if (this.elementName !== null) {
      var _partReplacements2 = {};

      if (this.processContent(compiler, resources, node, instruction) && node.hasChildNodes()) {
        var currentChild = node.firstChild;
        var contentElement = this.usesShadowDOM ? null : _aureliaPal.DOM.createElement('au-content');
        var nextSibling = void 0;
        var toReplace = void 0;

        while (currentChild) {
          nextSibling = currentChild.nextSibling;

          if (currentChild.tagName === 'TEMPLATE' && (toReplace = currentChild.getAttribute('replace-part'))) {
            _partReplacements2[toReplace] = compiler.compile(currentChild, resources);
            _aureliaPal.DOM.removeNode(currentChild, parentNode);
            instruction.partReplacements = _partReplacements2;
          } else if (contentElement !== null) {
            if (currentChild.nodeType === 3 && _isAllWhitespace(currentChild)) {
              _aureliaPal.DOM.removeNode(currentChild, parentNode);
            } else {
              contentElement.appendChild(currentChild);
            }
          }

          currentChild = nextSibling;
        }

        if (contentElement !== null && contentElement.hasChildNodes()) {
          node.appendChild(contentElement);
        }

        instruction.skipContentProcessing = false;
      } else {
        instruction.skipContentProcessing = true;
      }
    }

    return node;
  };

  HtmlBehaviorResource.prototype.create = function create(container, instruction, element, bindings) {
    var viewHost = void 0;
    var au = null;

    instruction = instruction || BehaviorInstruction.normal;
    element = element || null;
    bindings = bindings || null;

    if (this.elementName !== null && element) {
      if (this.usesShadowDOM) {
        viewHost = element.attachShadow(this.shadowDOMOptions);
        container.registerInstance(_aureliaPal.DOM.boundary, viewHost);
      } else {
        viewHost = element;
        if (this.targetShadowDOM) {
          container.registerInstance(_aureliaPal.DOM.boundary, viewHost);
        }
      }
    }

    if (element !== null) {
      element.au = au = element.au || {};
    }

    var viewModel = instruction.viewModel || container.get(this.target);
    var controller = new Controller(this, instruction, viewModel, container);
    var childBindings = this.childBindings;
    var viewFactory = void 0;

    if (this.liftsContent) {
      au.controller = controller;
    } else if (this.elementName !== null) {
      viewFactory = instruction.viewFactory || this.viewFactory;
      container.viewModel = viewModel;

      if (viewFactory) {
        controller.view = viewFactory.create(container, instruction, element);
      }

      if (element !== null) {
        au.controller = controller;

        if (controller.view) {
          if (!this.usesShadowDOM && (element.childNodes.length === 1 || element.contentElement)) {
            var contentElement = element.childNodes[0] || element.contentElement;
            controller.view.contentView = { fragment: contentElement };
            contentElement.parentNode && _aureliaPal.DOM.removeNode(contentElement);
          }

          if (instruction.anchorIsContainer) {
            if (childBindings !== null) {
              for (var _i3 = 0, _ii3 = childBindings.length; _i3 < _ii3; ++_i3) {
                controller.view.addBinding(childBindings[_i3].create(element, viewModel, controller));
              }
            }

            controller.view.appendNodesTo(viewHost);
          } else {
            controller.view.insertNodesBefore(viewHost);
          }
        } else if (childBindings !== null) {
          for (var _i4 = 0, _ii4 = childBindings.length; _i4 < _ii4; ++_i4) {
            bindings.push(childBindings[_i4].create(element, viewModel, controller));
          }
        }
      } else if (controller.view) {
        controller.view.controller = controller;

        if (childBindings !== null) {
          for (var _i5 = 0, _ii5 = childBindings.length; _i5 < _ii5; ++_i5) {
            controller.view.addBinding(childBindings[_i5].create(instruction.host, viewModel, controller));
          }
        }
      } else if (childBindings !== null) {
        for (var _i6 = 0, _ii6 = childBindings.length; _i6 < _ii6; ++_i6) {
          bindings.push(childBindings[_i6].create(instruction.host, viewModel, controller));
        }
      }
    } else if (childBindings !== null) {
      for (var _i7 = 0, _ii7 = childBindings.length; _i7 < _ii7; ++_i7) {
        bindings.push(childBindings[_i7].create(element, viewModel, controller));
      }
    }

    if (au !== null) {
      au[this.htmlName] = controller;
    }

    if (instruction.initiatedByBehavior && viewFactory) {
      controller.view.created();
    }

    return controller;
  };

  HtmlBehaviorResource.prototype._ensurePropertiesDefined = function _ensurePropertiesDefined(instance, lookup) {
    var properties = void 0;
    var i = void 0;
    var ii = void 0;
    var observer = void 0;

    if ('__propertiesDefined__' in lookup) {
      return;
    }

    lookup.__propertiesDefined__ = true;
    properties = this.properties;

    for (i = 0, ii = properties.length; i < ii; ++i) {
      observer = properties[i].createObserver(instance);

      if (observer !== undefined) {
        lookup[observer.propertyName] = observer;
      }
    }
  };

  return HtmlBehaviorResource;
}();

function createChildObserverDecorator(selectorOrConfig, all) {
  return function (target, key, descriptor) {
    var actualTarget = typeof key === 'string' ? target.constructor : target;
    var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, actualTarget);

    if (typeof selectorOrConfig === 'string') {
      selectorOrConfig = {
        selector: selectorOrConfig,
        name: key
      };
    }

    if (descriptor) {
      descriptor.writable = true;
    }

    selectorOrConfig.all = all;
    r.addChildBinding(new ChildObserver(selectorOrConfig));
  };
}

function children(selectorOrConfig) {
  return createChildObserverDecorator(selectorOrConfig, true);
}

function child(selectorOrConfig) {
  return createChildObserverDecorator(selectorOrConfig, false);
}

var ChildObserver = function () {
  function ChildObserver(config) {
    

    this.name = config.name;
    this.changeHandler = config.changeHandler || this.name + 'Changed';
    this.selector = config.selector;
    this.all = config.all;
  }

  ChildObserver.prototype.create = function create(viewHost, viewModel, controller) {
    return new ChildObserverBinder(this.selector, viewHost, this.name, viewModel, controller, this.changeHandler, this.all);
  };

  return ChildObserver;
}();

var noMutations = [];

function trackMutation(groupedMutations, binder, record) {
  var mutations = groupedMutations.get(binder);

  if (!mutations) {
    mutations = [];
    groupedMutations.set(binder, mutations);
  }

  mutations.push(record);
}

function onChildChange(mutations, observer) {
  var binders = observer.binders;
  var bindersLength = binders.length;
  var groupedMutations = new Map();

  for (var _i8 = 0, _ii8 = mutations.length; _i8 < _ii8; ++_i8) {
    var record = mutations[_i8];
    var added = record.addedNodes;
    var removed = record.removedNodes;

    for (var j = 0, jj = removed.length; j < jj; ++j) {
      var node = removed[j];
      if (node.nodeType === 1) {
        for (var k = 0; k < bindersLength; ++k) {
          var binder = binders[k];
          if (binder.onRemove(node)) {
            trackMutation(groupedMutations, binder, record);
          }
        }
      }
    }

    for (var _j = 0, _jj = added.length; _j < _jj; ++_j) {
      var _node = added[_j];
      if (_node.nodeType === 1) {
        for (var _k = 0; _k < bindersLength; ++_k) {
          var _binder = binders[_k];
          if (_binder.onAdd(_node)) {
            trackMutation(groupedMutations, _binder, record);
          }
        }
      }
    }
  }

  groupedMutations.forEach(function (value, key) {
    if (key.changeHandler !== null) {
      key.viewModel[key.changeHandler](value);
    }
  });
}

var ChildObserverBinder = function () {
  function ChildObserverBinder(selector, viewHost, property, viewModel, controller, changeHandler, all) {
    

    this.selector = selector;
    this.viewHost = viewHost;
    this.property = property;
    this.viewModel = viewModel;
    this.controller = controller;
    this.changeHandler = changeHandler in viewModel ? changeHandler : null;
    this.usesShadowDOM = controller.behavior.usesShadowDOM;
    this.all = all;

    if (!this.usesShadowDOM && controller.view && controller.view.contentView) {
      this.contentView = controller.view.contentView;
    } else {
      this.contentView = null;
    }
  }

  ChildObserverBinder.prototype.matches = function matches(element) {
    if (element.matches(this.selector)) {
      if (this.contentView === null) {
        return true;
      }

      var contentView = this.contentView;
      var assignedSlot = element.auAssignedSlot;

      if (assignedSlot && assignedSlot.projectFromAnchors) {
        var anchors = assignedSlot.projectFromAnchors;

        for (var _i9 = 0, _ii9 = anchors.length; _i9 < _ii9; ++_i9) {
          if (anchors[_i9].auOwnerView === contentView) {
            return true;
          }
        }

        return false;
      }

      return element.auOwnerView === contentView;
    }

    return false;
  };

  ChildObserverBinder.prototype.bind = function bind(source) {
    var viewHost = this.viewHost;
    var viewModel = this.viewModel;
    var observer = viewHost.__childObserver__;

    if (!observer) {
      observer = viewHost.__childObserver__ = _aureliaPal.DOM.createMutationObserver(onChildChange);

      var options = {
        childList: true,
        subtree: !this.usesShadowDOM
      };

      observer.observe(viewHost, options);
      observer.binders = [];
    }

    observer.binders.push(this);

    if (this.usesShadowDOM) {
      var current = viewHost.firstElementChild;

      if (this.all) {
        var items = viewModel[this.property];
        if (!items) {
          items = viewModel[this.property] = [];
        } else {
          items.length = 0;
        }

        while (current) {
          if (this.matches(current)) {
            items.push(current.au && current.au.controller ? current.au.controller.viewModel : current);
          }

          current = current.nextElementSibling;
        }

        if (this.changeHandler !== null) {
          this.viewModel[this.changeHandler](noMutations);
        }
      } else {
        while (current) {
          if (this.matches(current)) {
            var value = current.au && current.au.controller ? current.au.controller.viewModel : current;
            this.viewModel[this.property] = value;

            if (this.changeHandler !== null) {
              this.viewModel[this.changeHandler](value);
            }

            break;
          }

          current = current.nextElementSibling;
        }
      }
    }
  };

  ChildObserverBinder.prototype.onRemove = function onRemove(element) {
    if (this.matches(element)) {
      var value = element.au && element.au.controller ? element.au.controller.viewModel : element;

      if (this.all) {
        var items = this.viewModel[this.property] || (this.viewModel[this.property] = []);
        var index = items.indexOf(value);

        if (index !== -1) {
          items.splice(index, 1);
        }

        return true;
      }

      return false;
    }

    return false;
  };

  ChildObserverBinder.prototype.onAdd = function onAdd(element) {
    if (this.matches(element)) {
      var value = element.au && element.au.controller ? element.au.controller.viewModel : element;

      if (this.all) {
        var items = this.viewModel[this.property] || (this.viewModel[this.property] = []);
        var index = 0;
        var prev = element.previousElementSibling;

        while (prev) {
          if (this.matches(prev)) {
            index++;
          }

          prev = prev.previousElementSibling;
        }

        items.splice(index, 0, value);
        return true;
      }

      this.viewModel[this.property] = value;

      if (this.changeHandler !== null) {
        this.viewModel[this.changeHandler](value);
      }
    }

    return false;
  };

  ChildObserverBinder.prototype.unbind = function unbind() {
    if (this.viewHost.__childObserver__) {
      this.viewHost.__childObserver__.disconnect();
      this.viewHost.__childObserver__ = null;
    }
  };

  return ChildObserverBinder;
}();

function tryActivateViewModel(context) {
  if (context.skipActivation || typeof context.viewModel.activate !== 'function') {
    return Promise.resolve();
  }

  return context.viewModel.activate(context.model) || Promise.resolve();
}

var CompositionEngine = exports.CompositionEngine = (_dec10 = (0, _aureliaDependencyInjection.inject)(ViewEngine, ViewLocator), _dec10(_class17 = function () {
  function CompositionEngine(viewEngine, viewLocator) {
    

    this.viewEngine = viewEngine;
    this.viewLocator = viewLocator;
  }

  CompositionEngine.prototype._createControllerAndSwap = function _createControllerAndSwap(context) {
    function swap(controller) {
      return Promise.resolve(context.viewSlot.removeAll(true)).then(function () {
        if (context.currentController) {
          context.currentController.unbind();
        }

        context.viewSlot.add(controller.view);

        if (context.compositionTransactionNotifier) {
          context.compositionTransactionNotifier.done();
        }

        return controller;
      });
    }

    return this.createController(context).then(function (controller) {
      controller.automate(context.overrideContext, context.owningView);

      if (context.compositionTransactionOwnershipToken) {
        return context.compositionTransactionOwnershipToken.waitForCompositionComplete().then(function () {
          return swap(controller);
        });
      }

      return swap(controller);
    });
  };

  CompositionEngine.prototype.createController = function createController(context) {
    var _this14 = this;

    var childContainer = void 0;
    var viewModel = void 0;
    var viewModelResource = void 0;
    var m = void 0;

    return this.ensureViewModel(context).then(tryActivateViewModel).then(function () {
      childContainer = context.childContainer;
      viewModel = context.viewModel;
      viewModelResource = context.viewModelResource;
      m = viewModelResource.metadata;

      var viewStrategy = _this14.viewLocator.getViewStrategy(context.view || viewModel);

      if (context.viewResources) {
        viewStrategy.makeRelativeTo(context.viewResources.viewUrl);
      }

      return m.load(childContainer, viewModelResource.value, null, viewStrategy, true);
    }).then(function (viewFactory) {
      return m.create(childContainer, BehaviorInstruction.dynamic(context.host, viewModel, viewFactory));
    });
  };

  CompositionEngine.prototype.ensureViewModel = function ensureViewModel(context) {
    var childContainer = context.childContainer = context.childContainer || context.container.createChild();

    if (typeof context.viewModel === 'string') {
      context.viewModel = context.viewResources ? context.viewResources.relativeToView(context.viewModel) : context.viewModel;

      return this.viewEngine.importViewModelResource(context.viewModel).then(function (viewModelResource) {
        childContainer.autoRegister(viewModelResource.value);

        if (context.host) {
          childContainer.registerInstance(_aureliaPal.DOM.Element, context.host);
        }

        context.viewModel = childContainer.viewModel = childContainer.get(viewModelResource.value);
        context.viewModelResource = viewModelResource;
        return context;
      });
    }

    var m = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, context.viewModel.constructor);
    m.elementName = m.elementName || 'dynamic-element';
    m.initialize(context.container || childContainer, context.viewModel.constructor);
    context.viewModelResource = { metadata: m, value: context.viewModel.constructor };
    childContainer.viewModel = context.viewModel;
    return Promise.resolve(context);
  };

  CompositionEngine.prototype.compose = function compose(context) {
    context.childContainer = context.childContainer || context.container.createChild();
    context.view = this.viewLocator.getViewStrategy(context.view);

    var transaction = context.childContainer.get(CompositionTransaction);
    var compositionTransactionOwnershipToken = transaction.tryCapture();

    if (compositionTransactionOwnershipToken) {
      context.compositionTransactionOwnershipToken = compositionTransactionOwnershipToken;
    } else {
      context.compositionTransactionNotifier = transaction.enlist();
    }

    if (context.viewModel) {
      return this._createControllerAndSwap(context);
    } else if (context.view) {
      if (context.viewResources) {
        context.view.makeRelativeTo(context.viewResources.viewUrl);
      }

      return context.view.loadViewFactory(this.viewEngine, new ViewCompileInstruction()).then(function (viewFactory) {
        var result = viewFactory.create(context.childContainer);
        result.bind(context.bindingContext, context.overrideContext);

        var work = function work() {
          return Promise.resolve(context.viewSlot.removeAll(true)).then(function () {
            context.viewSlot.add(result);

            if (context.compositionTransactionNotifier) {
              context.compositionTransactionNotifier.done();
            }

            return result;
          });
        };

        if (context.compositionTransactionOwnershipToken) {
          return context.compositionTransactionOwnershipToken.waitForCompositionComplete().then(work);
        }

        return work();
      });
    } else if (context.viewSlot) {
      context.viewSlot.removeAll();

      if (context.compositionTransactionNotifier) {
        context.compositionTransactionNotifier.done();
      }

      return Promise.resolve(null);
    }

    return Promise.resolve(null);
  };

  return CompositionEngine;
}()) || _class17);

var ElementConfigResource = exports.ElementConfigResource = function () {
  function ElementConfigResource() {
    
  }

  ElementConfigResource.prototype.initialize = function initialize(container, target) {};

  ElementConfigResource.prototype.register = function register(registry, name) {};

  ElementConfigResource.prototype.load = function load(container, target) {
    var config = new target();
    var eventManager = container.get(_aureliaBinding.EventManager);
    eventManager.registerElementConfig(config);
  };

  return ElementConfigResource;
}();

function validateBehaviorName(name, type) {
  if (/[A-Z]/.test(name)) {
    var newName = _hyphenate(name);
    LogManager.getLogger('templating').warn('\'' + name + '\' is not a valid ' + type + ' name and has been converted to \'' + newName + '\'. Upper-case letters are not allowed because the DOM is not case-sensitive.');
    return newName;
  }
  return name;
}

function resource(instance) {
  return function (target) {
    _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, instance, target);
  };
}

function behavior(override) {
  return function (target) {
    if (override instanceof HtmlBehaviorResource) {
      _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, override, target);
    } else {
      var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
      Object.assign(r, override);
    }
  };
}

function customElement(name) {
  return function (target) {
    var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
    r.elementName = validateBehaviorName(name, 'custom element');
  };
}

function customAttribute(name, defaultBindingMode) {
  return function (target) {
    var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, target);
    r.attributeName = validateBehaviorName(name, 'custom attribute');
    r.attributeDefaultBindingMode = defaultBindingMode;
  };
}

function templateController(target) {
  var deco = function deco(t) {
    var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
    r.liftsContent = true;
  };

  return target ? deco(target) : deco;
}

function bindable(nameOrConfigOrTarget, key, descriptor) {
  var deco = function deco(target, key2, descriptor2) {
    var actualTarget = key2 ? target.constructor : target;
    var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, actualTarget);
    var prop = void 0;

    if (key2) {
      nameOrConfigOrTarget = nameOrConfigOrTarget || {};
      nameOrConfigOrTarget.name = key2;
    }

    prop = new BindableProperty(nameOrConfigOrTarget);
    return prop.registerWith(actualTarget, r, descriptor2);
  };

  if (!nameOrConfigOrTarget) {
    return deco;
  }

  if (key) {
    var _target = nameOrConfigOrTarget;
    nameOrConfigOrTarget = null;
    return deco(_target, key, descriptor);
  }

  return deco;
}

function dynamicOptions(target) {
  var deco = function deco(t) {
    var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
    r.hasDynamicOptions = true;
  };

  return target ? deco(target) : deco;
}

var defaultShadowDOMOptions = { mode: 'open' };
function useShadowDOM(targetOrOptions) {
  var options = typeof targetOrOptions === 'function' || !targetOrOptions ? defaultShadowDOMOptions : targetOrOptions;

  var deco = function deco(t) {
    var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
    r.targetShadowDOM = true;
    r.shadowDOMOptions = options;
  };

  return typeof targetOrOptions === 'function' ? deco(targetOrOptions) : deco;
}

function processAttributes(processor) {
  return function (t) {
    var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
    r.processAttributes = function (compiler, resources, node, attributes, elementInstruction) {
      try {
        processor(compiler, resources, node, attributes, elementInstruction);
      } catch (error) {
        LogManager.getLogger('templating').error(error);
      }
    };
  };
}

function doNotProcessContent() {
  return false;
}

function processContent(processor) {
  return function (t) {
    var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
    r.processContent = processor ? function (compiler, resources, node, instruction) {
      try {
        return processor(compiler, resources, node, instruction);
      } catch (error) {
        LogManager.getLogger('templating').error(error);
        return false;
      }
    } : doNotProcessContent;
  };
}

function containerless(target) {
  var deco = function deco(t) {
    var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, HtmlBehaviorResource, t);
    r.containerless = true;
  };

  return target ? deco(target) : deco;
}

function useViewStrategy(strategy) {
  return function (target) {
    _aureliaMetadata.metadata.define(ViewLocator.viewStrategyMetadataKey, strategy, target);
  };
}

function useView(path) {
  return useViewStrategy(new RelativeViewStrategy(path));
}

function inlineView(markup, dependencies, dependencyBaseUrl) {
  return useViewStrategy(new InlineViewStrategy(markup, dependencies, dependencyBaseUrl));
}

function noView(targetOrDependencies, dependencyBaseUrl) {
  var target = void 0;
  var dependencies = void 0;
  if (typeof targetOrDependencies === 'function') {
    target = targetOrDependencies;
  } else {
    dependencies = targetOrDependencies;
    target = undefined;
  }

  var deco = function deco(t) {
    _aureliaMetadata.metadata.define(ViewLocator.viewStrategyMetadataKey, new NoViewStrategy(dependencies, dependencyBaseUrl), t);
  };

  return target ? deco(target) : deco;
}

function elementConfig(target) {
  var deco = function deco(t) {
    _aureliaMetadata.metadata.define(_aureliaMetadata.metadata.resource, new ElementConfigResource(), t);
  };

  return target ? deco(target) : deco;
}

function viewResources() {
  for (var _len = arguments.length, resources = Array(_len), _key = 0; _key < _len; _key++) {
    resources[_key] = arguments[_key];
  }

  return function (target) {
    _aureliaMetadata.metadata.define(ViewEngine.viewModelRequireMetadataKey, resources, target);
  };
}

var TemplatingEngine = exports.TemplatingEngine = (_dec11 = (0, _aureliaDependencyInjection.inject)(_aureliaDependencyInjection.Container, ModuleAnalyzer, ViewCompiler, CompositionEngine), _dec11(_class18 = function () {
  function TemplatingEngine(container, moduleAnalyzer, viewCompiler, compositionEngine) {
    

    this._container = container;
    this._moduleAnalyzer = moduleAnalyzer;
    this._viewCompiler = viewCompiler;
    this._compositionEngine = compositionEngine;
    container.registerInstance(Animator, Animator.instance = new Animator());
  }

  TemplatingEngine.prototype.configureAnimator = function configureAnimator(animator) {
    this._container.unregister(Animator);
    this._container.registerInstance(Animator, Animator.instance = animator);
  };

  TemplatingEngine.prototype.compose = function compose(context) {
    return this._compositionEngine.compose(context);
  };

  TemplatingEngine.prototype.enhance = function enhance(instruction) {
    if (instruction instanceof _aureliaPal.DOM.Element) {
      instruction = { element: instruction };
    }

    var compilerInstructions = {};
    var resources = instruction.resources || this._container.get(ViewResources);

    this._viewCompiler._compileNode(instruction.element, resources, compilerInstructions, instruction.element.parentNode, 'root', true);

    var factory = new ViewFactory(instruction.element, compilerInstructions, resources);
    var container = instruction.container || this._container.createChild();
    var view = factory.create(container, BehaviorInstruction.enhance());

    view.bind(instruction.bindingContext || {}, instruction.overrideContext);

    return view;
  };

  return TemplatingEngine;
}()) || _class18);
});
return ___scope___.entry = "dist/commonjs/aurelia-templating.js";
});
FuseBox.pkg("aurelia-path", {}, function(___scope___){
___scope___.file("dist/commonjs/aurelia-path.js", function(exports, require, module, __filename, __dirname){ 

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.relativeToFile = relativeToFile;
exports.join = join;
exports.buildQueryString = buildQueryString;
exports.parseQueryString = parseQueryString;

function trimDots(ary) {
  for (var i = 0; i < ary.length; ++i) {
    var part = ary[i];
    if (part === '.') {
      ary.splice(i, 1);
      i -= 1;
    } else if (part === '..') {
      if (i === 0 || i === 1 && ary[2] === '..' || ary[i - 1] === '..') {
        continue;
      } else if (i > 0) {
        ary.splice(i - 1, 2);
        i -= 2;
      }
    }
  }
}

function relativeToFile(name, file) {
  var fileParts = file && file.split('/');
  var nameParts = name.trim().split('/');

  if (nameParts[0].charAt(0) === '.' && fileParts) {
    var normalizedBaseParts = fileParts.slice(0, fileParts.length - 1);
    nameParts.unshift.apply(nameParts, normalizedBaseParts);
  }

  trimDots(nameParts);

  return nameParts.join('/');
}

function join(path1, path2) {
  if (!path1) {
    return path2;
  }

  if (!path2) {
    return path1;
  }

  var schemeMatch = path1.match(/^([^/]*?:)\//);
  var scheme = schemeMatch && schemeMatch.length > 0 ? schemeMatch[1] : '';
  path1 = path1.substr(scheme.length);

  var urlPrefix = void 0;
  if (path1.indexOf('///') === 0 && scheme === 'file:') {
    urlPrefix = '///';
  } else if (path1.indexOf('//') === 0) {
    urlPrefix = '//';
  } else if (path1.indexOf('/') === 0) {
    urlPrefix = '/';
  } else {
    urlPrefix = '';
  }

  var trailingSlash = path2.slice(-1) === '/' ? '/' : '';

  var url1 = path1.split('/');
  var url2 = path2.split('/');
  var url3 = [];

  for (var i = 0, ii = url1.length; i < ii; ++i) {
    if (url1[i] === '..') {
      url3.pop();
    } else if (url1[i] === '.' || url1[i] === '') {
      continue;
    } else {
      url3.push(url1[i]);
    }
  }

  for (var _i = 0, _ii = url2.length; _i < _ii; ++_i) {
    if (url2[_i] === '..') {
      url3.pop();
    } else if (url2[_i] === '.' || url2[_i] === '') {
      continue;
    } else {
      url3.push(url2[_i]);
    }
  }

  return scheme + urlPrefix + url3.join('/') + trailingSlash;
}

var encode = encodeURIComponent;
var encodeKey = function encodeKey(k) {
  return encode(k).replace('%24', '$');
};

function buildParam(key, value, traditional) {
  var result = [];
  if (value === null || value === undefined) {
    return result;
  }
  if (Array.isArray(value)) {
    for (var i = 0, l = value.length; i < l; i++) {
      if (traditional) {
        result.push(encodeKey(key) + '=' + encode(value[i]));
      } else {
        var arrayKey = key + '[' + (_typeof(value[i]) === 'object' && value[i] !== null ? i : '') + ']';
        result = result.concat(buildParam(arrayKey, value[i]));
      }
    }
  } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !traditional) {
    for (var propertyName in value) {
      result = result.concat(buildParam(key + '[' + propertyName + ']', value[propertyName]));
    }
  } else {
    result.push(encodeKey(key) + '=' + encode(value));
  }
  return result;
}

function buildQueryString(params, traditional) {
  var pairs = [];
  var keys = Object.keys(params || {}).sort();
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];
    pairs = pairs.concat(buildParam(key, params[key], traditional));
  }

  if (pairs.length === 0) {
    return '';
  }

  return pairs.join('&');
}

function processScalarParam(existedParam, value) {
  if (Array.isArray(existedParam)) {
    existedParam.push(value);
    return existedParam;
  }
  if (existedParam !== undefined) {
    return [existedParam, value];
  }

  return value;
}

function parseComplexParam(queryParams, keys, value) {
  var currentParams = queryParams;
  var keysLastIndex = keys.length - 1;
  for (var j = 0; j <= keysLastIndex; j++) {
    var key = keys[j] === '' ? currentParams.length : keys[j];
    if (j < keysLastIndex) {
      var prevValue = !currentParams[key] || _typeof(currentParams[key]) === 'object' ? currentParams[key] : [currentParams[key]];
      currentParams = currentParams[key] = prevValue || (isNaN(keys[j + 1]) ? {} : []);
    } else {
      currentParams = currentParams[key] = value;
    }
  }
}

function parseQueryString(queryString) {
  var queryParams = {};
  if (!queryString || typeof queryString !== 'string') {
    return queryParams;
  }

  var query = queryString;
  if (query.charAt(0) === '?') {
    query = query.substr(1);
  }

  var pairs = query.replace(/\+/g, ' ').split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    var key = decodeURIComponent(pair[0]);
    if (!key) {
      continue;
    }

    var keys = key.split('][');
    var keysLastIndex = keys.length - 1;

    if (/\[/.test(keys[0]) && /\]$/.test(keys[keysLastIndex])) {
      keys[keysLastIndex] = keys[keysLastIndex].replace(/\]$/, '');
      keys = keys.shift().split('[').concat(keys);
      keysLastIndex = keys.length - 1;
    } else {
      keysLastIndex = 0;
    }

    if (pair.length >= 2) {
      var value = pair[1] ? decodeURIComponent(pair[1]) : '';
      if (keysLastIndex) {
        parseComplexParam(queryParams, keys, value);
      } else {
        queryParams[key] = processScalarParam(queryParams[key], value);
      }
    } else {
      queryParams[key] = true;
    }
  }
  return queryParams;
}
});
return ___scope___.entry = "dist/commonjs/aurelia-path.js";
});
FuseBox.pkg("aurelia-loader", {}, function(___scope___){
___scope___.file("dist/commonjs/aurelia-loader.js", function(exports, require, module, __filename, __dirname){ 

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = exports.TemplateRegistryEntry = exports.TemplateDependency = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _aureliaPath = require('aurelia-path');

var _aureliaMetadata = require('aurelia-metadata');



var TemplateDependency = exports.TemplateDependency = function TemplateDependency(src, name) {
  

  this.src = src;
  this.name = name;
};

var TemplateRegistryEntry = exports.TemplateRegistryEntry = function () {
  function TemplateRegistryEntry(address) {
    

    this.templateIsLoaded = false;
    this.factoryIsReady = false;
    this.resources = null;
    this.dependencies = null;

    this.address = address;
    this.onReady = null;
    this._template = null;
    this._factory = null;
  }

  TemplateRegistryEntry.prototype.addDependency = function addDependency(src, name) {
    var finalSrc = typeof src === 'string' ? (0, _aureliaPath.relativeToFile)(src, this.address) : _aureliaMetadata.Origin.get(src).moduleId;

    this.dependencies.push(new TemplateDependency(finalSrc, name));
  };

  _createClass(TemplateRegistryEntry, [{
    key: 'template',
    get: function get() {
      return this._template;
    },
    set: function set(value) {
      var address = this.address;
      var requires = void 0;
      var current = void 0;
      var src = void 0;
      var dependencies = void 0;

      this._template = value;
      this.templateIsLoaded = true;

      requires = value.content.querySelectorAll('require');
      dependencies = this.dependencies = new Array(requires.length);

      for (var i = 0, ii = requires.length; i < ii; ++i) {
        current = requires[i];
        src = current.getAttribute('from');

        if (!src) {
          throw new Error('<require> element in ' + address + ' has no "from" attribute.');
        }

        dependencies[i] = new TemplateDependency((0, _aureliaPath.relativeToFile)(src, address), current.getAttribute('as'));

        if (current.parentNode) {
          current.parentNode.removeChild(current);
        }
      }
    }
  }, {
    key: 'factory',
    get: function get() {
      return this._factory;
    },
    set: function set(value) {
      this._factory = value;
      this.factoryIsReady = true;
    }
  }]);

  return TemplateRegistryEntry;
}();

var Loader = exports.Loader = function () {
  function Loader() {
    

    this.templateRegistry = {};
  }

  Loader.prototype.map = function map(id, source) {
    throw new Error('Loaders must implement map(id, source).');
  };

  Loader.prototype.normalizeSync = function normalizeSync(moduleId, relativeTo) {
    throw new Error('Loaders must implement normalizeSync(moduleId, relativeTo).');
  };

  Loader.prototype.normalize = function normalize(moduleId, relativeTo) {
    throw new Error('Loaders must implement normalize(moduleId: string, relativeTo: string): Promise<string>.');
  };

  Loader.prototype.loadModule = function loadModule(id) {
    throw new Error('Loaders must implement loadModule(id).');
  };

  Loader.prototype.loadAllModules = function loadAllModules(ids) {
    throw new Error('Loader must implement loadAllModules(ids).');
  };

  Loader.prototype.loadTemplate = function loadTemplate(url) {
    throw new Error('Loader must implement loadTemplate(url).');
  };

  Loader.prototype.loadText = function loadText(url) {
    throw new Error('Loader must implement loadText(url).');
  };

  Loader.prototype.applyPluginToUrl = function applyPluginToUrl(url, pluginName) {
    throw new Error('Loader must implement applyPluginToUrl(url, pluginName).');
  };

  Loader.prototype.addPlugin = function addPlugin(pluginName, implementation) {
    throw new Error('Loader must implement addPlugin(pluginName, implementation).');
  };

  Loader.prototype.getOrCreateTemplateRegistryEntry = function getOrCreateTemplateRegistryEntry(address) {
    return this.templateRegistry[address] || (this.templateRegistry[address] = new TemplateRegistryEntry(address));
  };

  return Loader;
}();
});
return ___scope___.entry = "dist/commonjs/aurelia-loader.js";
});

FuseBox.import("aurelia-v-grid/index.js");
FuseBox.main("aurelia-v-grid/index.js");
})
(function(e){var r="undefined"!=typeof window&&window.navigator;r&&(window.global=window),e=r&&"undefined"==typeof __fbx__dnm__?e:module.exports;var n=r?window.__fsbx__=window.__fsbx__||{}:global.$fsbx=global.$fsbx||{};r||(global.require=require);var t=n.p=n.p||{},i=n.e=n.e||{},a=function(e){var r=e.charCodeAt(0);if(r>=97&&r<=122||64===r){if(64===r){var n=e.split("/"),t=n.splice(2,n.length).join("/");return[n[0]+"/"+n[1],t||void 0]}var i=e.indexOf("/");if(i===-1)return[e];var a=e.substring(0,i),o=e.substring(i+1);return[a,o]}},o=function(e){return e.substring(0,e.lastIndexOf("/"))||"./"},f=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var a=[],t=0,i=n.length;t<i;t++){var o=n[t];o&&"."!==o&&(".."===o?a.pop():a.push(o))}return""===n[0]&&a.unshift(""),a.join("/")||(a.length?"/":".")},s=function(e){var r=e.match(/\.(\w{1,})$/);if(r){var n=r[1];return n?e:e+".js"}return e+".js"},u=function(e){if(r){var n,t=document,i=t.getElementsByTagName("head")[0];/\.css$/.test(e)?(n=t.createElement("link"),n.rel="stylesheet",n.type="text/css",n.href=e):(n=t.createElement("script"),n.type="text/javascript",n.src=e,n.async=!0),i.insertBefore(n,i.firstChild)}},l=function(e,n){var i=n.path||"./",o=n.pkg||"default",u=a(e);u&&(i="./",o=u[0],n.v&&n.v[o]&&(o=o+"@"+n.v[o]),e=u[1]),e&&126===e.charCodeAt(0)&&(e=e.slice(2,e.length),i="./");var l=t[o];if(!l){if(r)throw'Package was not found "'+o+'"';return{serverReference:require(o)}}e||(e="./"+l.s.entry);var v,c=f(i,e),d=s(c),p=l.f[d];return!p&&d.indexOf("*")>-1&&(v=d),p||v||(d=f(c,"/","index.js"),p=l.f[d],p||(d=c+".js",p=l.f[d]),p||(p=l.f[c+".jsx"])),{file:p,wildcard:v,pkgName:o,versions:l.v,filePath:c,validPath:d}},v=function(e,n){if(!r)return n(/\.(js|json)$/.test(e)?global.require(e):"");var t;t=new XMLHttpRequest,t.onreadystatechange=function(){if(4==t.readyState)if(200==t.status){var r=t.getResponseHeader("Content-Type"),i=t.responseText;/json/.test(r)?i="module.exports = "+i:/javascript/.test(r)||(i="module.exports = "+JSON.stringify(i));var a=f("./",e);p.dynamic(a,i),n(p.import(e,{}))}else console.error(e+" was not found upon request"),n(void 0)},t.open("GET",e,!0),t.send()},c=function(e,r){var n=i[e];if(n)for(var t in n){var a=n[t].apply(null,r);if(a===!1)return!1}},d=function(e,n){if(void 0===n&&(n={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return u(e);var i=l(e,n);if(i.serverReference)return i.serverReference;var a=i.file;if(i.wildcard){var f=new RegExp(i.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@/g,"[a-z0-9$_-]+"),"i"),s=t[i.pkgName];if(s){var p={};for(var g in s.f)f.test(g)&&(p[g]=d(i.pkgName+"/"+g));return p}}if(!a){var m="function"==typeof n,h=c("async",[e,n]);if(h===!1)return;return v(e,function(e){if(m)return n(e)})}var _=i.validPath,x=i.pkgName;if(a.locals&&a.locals.module)return a.locals.module.exports;var w=a.locals={},b=o(_);w.exports={},w.module={exports:w.exports},w.require=function(e,r){return d(e,{pkg:x,path:b,v:i.versions})},w.require.main={filename:r?"./":global.require.main.filename,paths:r?[]:global.require.main.paths};var y=[w.module.exports,w.require,w.module,_,b,x];c("before-import",y);var k=a.fn;return k.apply(0,y),c("after-import",y),w.module.exports},p=function(){function n(){}return n.global=function(e,n){var t=r?window:global;return void 0===n?t[e]:void(t[e]=n)},n.import=function(e,r){return d(e,r)},n.on=function(e,r){i[e]=i[e]||[],i[e].push(r)},n.exists=function(e){var r=l(e,{});return void 0!==r.file},n.remove=function(e){var r=l(e,{}),n=t[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},n.main=function(e){return this.mainFile=e,n.import(e,{})},n.expose=function(r){for(var n in r){var t=r[n],i=d(t.pkg);e[t.alias]=i}},n.dynamic=function(r,n,t){var i=t&&t.pkg||"default";this.pkg(i,{},function(t){t.file(r,function(r,t,i,a,o){var f=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);f(!0,r,t,i,a,o,e)})})},n.flush=function(e){var r=t.default;if(e)return void(r.f[e]&&delete r.f[e].locals);for(var n in r.f){var i=r.f[n];delete i.locals}},n.pkg=function(e,r,n){if(t[e])return n(t[e].s);var i=t[e]={},a=i.f={};i.v=r;var o=i.s={file:function(e,r){a[e]={fn:r}}};return n(o)},n}();return p.packages=t,p.isBrowser=void 0!==r,p.isServer=!r,e.FuseBox=p}(this))