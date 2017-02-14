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

"use strict";
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

"use strict";
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

"use strict";
/**
 * Holds all the html elements, so we have 1 place to get em all
 * All classes that creates html adds it to this one, some the parst the class get
 *
 */
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
    /**
     * just gets the row html elements for easy access later
     *
     */
    HtmlCache.prototype.updateRowsMarkup = function () {
        this.avg_left_rows = this.avg_content_left_scroll.getElementsByTagName('avg-row');
        this.avg_main_rows = this.avg_content_main_scroll.getElementsByTagName('avg-row');
        this.avg_right_rows = this.avg_content_right_scroll.getElementsByTagName('avg-row');
        this.avg_group_rows = this.avg_content_group_scroll.getElementsByTagName('avg-row');
    };
    /**
     * gets the mark markup parts after its created for easy access later
     *
     */
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

"use strict";
/**
 * Class controller is the class the grid connector use to call grid code
 * It pretty much have function to most GridConnector should not call functions not inside the controller
 * That will break things fast
 * TODO: fix some bad parts
 *
 */
var Controller = (function () {
    function Controller(vGrid) {
        // main context
        this.vGrid = vGrid;
        // main element
        this.element = vGrid.element;
    }
    /**
     * gets the grid conext, so we have access to it in this class
     *
     */
    Controller.prototype.getContext = function () {
        var c = this.vGrid;
        // column configuration
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
        // aurelia classes
        this.viewCompiler = c.viewCompiler;
        this.container = c.container;
        this.viewResources = c.viewResources;
        this.taskQueue = c.taskQueue;
        // classes
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
        // attributes
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
    /**
     * triggers event to call for all translation keys
     *
     */
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
    /**
     * get the row state from gridconnector, used for variable row height
     *
     */
    Controller.prototype.getRowHeightState = function () {
        return this.attGridConnector.getRowHeightState();
    };
    /**
     * creates the grid
     *
     */
    Controller.prototype.createGrid = function () {
        // translate ?
        if (this.attI18N) {
            this.triggerI18N();
        }
        // sets default height and widths of the grid
        this.htmlHeightWidth.addDefaultsAttributes(this.attHeaderHeight, this.attRowHeight, this.attFooterHeight, this.attPanelHeight);
        // more updates to main markup
        this.htmlHeightWidth.setWidthFromColumnConfig(this.colConfig);
        // generate main markup and updates our cache
        this.mainMarkup.generateMainMarkup();
        this.htmlCache.updateMainMarkup();
        this.rowDataBinder.init();
        // starts the scroll events on main html markup (left/main/right)
        this.mainScrollEvents.init();
        // creates main row markup and attaches them, then we chache this html also
        this.rowMarkup.init(this.attRowHeight);
        this.htmlCache.updateRowsMarkup();
        // add scroll events (the one that moves the actual rows when scroling)
        this.rowScrollEvents.init(this.attRowHeight, this.attDataDelay, this.attVariableRowHeight);
        // creates the views/viewports we need
        this.columnMarkup.init(this.colConfig, this.overrideContext, this.colRepeater, this.colRepeatRowTemplate, this.colRepeatRowHeaderTemplate, this.colGroupRow);
        // register the rowClick handler (when clicking on rows)
        this.rowClickHandler.init(this.attMultiSelect, this.attManualSelection, this);
        // create grouping elements helper... pretty much just creates view when dragging to group box
        this.groupingElements.init(this, this.colGroupElement);
        // loading screen view
        this.loadingScreen.init(this.overrideContext, this.loadingScreenTemplate);
        // footer view
        this.footer.init(this.overrideContext, this.footerTemplate);
        // add context menu
        this.contextMenu.init(this.customMenuTemplates, this.overrideContext);
    };
    /**
     * gets element from datasource
     *
     */
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
    /**
     * expand group/groups
     *
     */
    Controller.prototype.expandGroup = function (id) {
        this.attGridConnector.expandGroup(id);
    };
    /**
     * collapses group/groups
     *
     */
    Controller.prototype.collapseGroup = function (id) {
        this.attGridConnector.collapseGroup(id);
    };
    /**
     * select row passed in
     *
     */
    Controller.prototype.select = function (row) {
        this.attGridConnector.select(row);
    };
    /**
     * adds to grouping
     *
     */
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
    /**
     * removes field from grouping
     *
     */
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
    /**
     * returns selection context, so you have the current one used/set in gridconnector/datasource
     *
     */
    Controller.prototype.getSelectionContext = function () {
        var sel = this.attGridConnector.getSelection();
        return sel;
    };
    /**
     * triggers event on grids element, nice for attributes etc
     *
     */
    Controller.prototype.raiseEvent = function (name, data) {
        if (data === void 0) { data = {}; }
        var event = new CustomEvent(name, {
            detail: data,
            bubbles: true
        });
        this.element.dispatchEvent(event);
    };
    /**
     * sets the loading screen to show or hide
     *
     */
    Controller.prototype.setLoadingScreen = function (value, msg, collectionLength) {
        if (value) {
            return this.loadingScreen.enable(msg, collectionLength);
        }
        else {
            return this.loadingScreen.disable();
        }
    };
    /**
     * updates and call classes that needs height updated if its changed
     *
     */
    Controller.prototype.updateHeights = function () {
        var totalRowHeight = this.htmlHeightWidth.getNewHeight(this.attGridConnector.getDatasourceLength());
        var bodyHeight = this.htmlCache.avg_content_main.clientHeight;
        if (bodyHeight < totalRowHeight) {
            // hide it
            this.htmlCache.avg_content_vhandle.style.display = 'block';
        }
        else {
            // display
            this.htmlCache.avg_content_vhandle.style.display = 'none';
        }
        this.rowScrollEvents.setCollectionLength(this.attGridConnector.getDatasourceLength());
        this.htmlHeightWidth.setCollectionLength(this.attGridConnector.getDatasourceLength(), bodyHeight < totalRowHeight);
    };
    /**
     * checks main column with, and hides scrollbar if not needed
     *
     */
    Controller.prototype.udateHorizontalScroller = function () {
        var bodyWidth = this.htmlCache.avg_content_main.clientWidth;
        var scrollWidth = this.htmlHeightWidth.avgContentMainScroll_Width;
        // todo : I also need to adjust scrollheight here, but its a start
        if (bodyWidth < scrollWidth) {
            // hide it
            this.htmlCache.avg_content_hhandle.style.display = 'block';
            this.htmlHeightWidth.setCollectionLength(this.collectionLength(), true);
        }
        else {
            // display
            this.htmlCache.avg_content_hhandle.style.display = 'none';
            this.htmlHeightWidth.setCollectionLength(this.collectionLength(), false);
        }
    };
    /**
     * checks and updates the grouping in panel, also fixes it if not corrent
     *
     */
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
                // check failed
                var groupings = this.groupingElements.getGroups();
                // remove groups
                groupings.forEach(function (group) {
                    _this.groupingElements.removeGroup(group);
                });
                // add groups
                groups.forEach(function (group) {
                    // really dont know what they want to call it.. lets just use attribute name
                    // todo, I should have something better here...
                    _this.groupingElements.addGroup(group.title, group.field);
                });
            }
        }
        this.htmlHeightWidth.adjustWidthsColumns(this.columnBindingContext, length);
    };
    /**
     * returns the collection length
     *
     */
    Controller.prototype.collectionLength = function () {
        return this.attGridConnector.getDatasourceLength();
    };
    /**
     * triggers scroll event with new position, to top if no params
     *
     */
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
    /**
     * returns to row in current view/scrolltop
     *
     */
    Controller.prototype.getTopRow = function () {
        var position = this.htmlCache.avg_content_vhandle.scrollTop;
        return Math.floor(position / this.attRowHeight);
    };
    /**
     * rebinds all rows
     *
     */
    Controller.prototype.rebindAllRows = function () {
        this.raiseEvent('avg-rebind-all-rows', {
            rowCache: this.htmlCache.rowCache,
            downScroll: true
        });
    };
    /**
     * returns the column config, and can be used to save current user settings
     *
     */
    Controller.prototype.getColumnConfig = function () {
        // get current colcontext
        var colContext = this.columnBindingContext;
        // temp array to hold data
        var tempArray = [];
        // loop and find out whats what..
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
        // temp colconf to return
        var newColConfig = [];
        // loop and set correct params
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
                __colSortHelper: tempArray[i].left
            };
            newColConfig.push(temp);
        });
        // sort array
        newColConfig.sort(function (a, b) {
            return a.__colSortHelper - b.__colSortHelper;
        });
        // return current config   
        return newColConfig;
    };
    /**
     * sets the new column config and updates the grid
     *
     */
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

"use strict";
var aurelia_framework_1 = require("aurelia-framework");
var mainMarkupHtmlString_1 = require("./mainMarkupHtmlString");
/**
 * Loads the main markup and creates a viewport and binds it to our HtmlHeightWidth class
 * Viewport is added to the viewPorts class
 *
 */
var MainMarkup = (function () {
    function MainMarkup(element, viewCompiler, container, viewResources, htmlHeightWidth, viewSlots) {
        this.element = element;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.htmlHeightWidth = htmlHeightWidth;
        this.viewSlots = viewSlots;
    }
    /**
     * Generates the main markup/skeleton of the grid
     *
     */
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

// tslint:disable:max-line-length
// disabled, since it really wont be easier to read if I change it
"use strict";
/**
 * This holds all the main markup for the grid except the columns and rows
 * In the $au the "au" is removed when we get it
 */
exports.MainMarkupHtmlString = "\n        <avg-top-panel v-drag-drop-col class=\"avg-top-panel\" css=\"height:$au{avgPanel_Height}px\">\n\n        </avg-top-panel>\n\n        <avg-header class=\"avg-header\" css=\"height:$au{avgHeader_Height}px;top:$au{avgHeader_Top}px\">\n\n          <avg-header-left class=\"avg-header-left\" css=\"width:$au{avgHeaderLeft_Width}px\">\n           </avg-header-left>  \n\n           <avg-header-main class=\"avg-header-main\" css=\"left:$au{avgHeaderMain_Left}px;right:$au{avgHeaderMain_Right}px\">\n             <avg-header-main-scroll css=\"width:$au{avgHeaderMainScroll_Width}px;height:$au{avgHeaderMainScroll_Height}px\"> \n             </avg-header-main-scroll> \n           </avg-header-main> \n\n           <avg-header-right class=\"avg-header-right\" css=\"right:$au{avgHeaderRight_Right}px;width:$au{avgHeaderRight_Width}px\">\n           </avg-header-right> \n\n        </avg-header>\n\n        <avg-content class=\"avg-content\" css=\"top:$au{avgContent_Top}px;bottom:$au{avgContent_Bottom}px\">\n           \n            <avg-content-left  class=\"avg-content-left\" css=\"width:$au{avgContentLeft_Width}px\">\n              <avg-content-left-scroll css=\"width:$au{avgContentLeftScroll_Width};height:$au{avgContentLeftScroll_Height}px\">  \n              </avg-content-left-scroll> \n            </avg-content-left>  \n\n            <avg-content-main  class=\"avg-content-main\" css=\"left:$au{avgContentMain_Left}px;right:$au{avgContentMain_Right}px\">\n              <avg-content-main-scroll css=\"min-width: 100%;width:$au{avgContentMainScroll_Width}px;height:$au{avgContentMainScroll_Height}px\"> \n              </avg-content-main-scroll> \n            </avg-content-main> \n\n            <avg-content-right  class=\"avg-content-right\" css=\"right:$au{avgContentRight_Right}px;width:$au{avgContentRight_Width}px\">\n              <avg-content-right-scroll css=\"width:$au{avgContentRightScroll_Width};height:$au{avgContentRightScroll_Height}px\">  \n              </avg-content-right-scroll> \n            </avg-content-right>  \n            \n        </avg-content>\n\n       <avg-footer class=\"avg-footer\" css=\"height:$au{avgFooter_Height}px\">\n       </avg-footer> \n\n       <avg-content-group css=\"left:0;right:0;top:$au{avgContentGroup_Top}px;bottom:$au{avgContentGroup_Bottom}px\">\n          <avg-content-group-scroll css=\"left:0;right:0;height:$au{avgContentGroup_Height}px\">  \n          </avg-content-group-scroll> \n        </avg-content-group> \n\n        <avg-content-vhandle css=\"right:0;bottom:$au{avgContentVhandle_Bottom}px;right:$au{avgContentVhandle_Right}px;left:$au{avgContentVhandle_Left}px;top:$au{avgContentVhandle_Top}px\">\n          <avg-content-vhandle-scroll css=\"width:5px;height:$au{avgContentVhandleScroll_Height}px\"> \n          </avg-content-vhandle-scroll> \n        </avg-content-vhandle> \n\n        <avg-content-hhandle css=\"bottom:$au{avgContentHhandle_Bottom}px;right:$au{avgContentHhandle_Right}px;left:$au{avgContentHhandle_Left}px;height:$au{avgContentHhandle_Height}px\">\n          <avg-content-hhandle-scroll css=\"height:7px;width:$au{avgContentHhandleScroll_Width}px\"> \n          </avg-content-hhandle-scroll> \n        </avg-content-hhandle> \n\n        ".replace(/\$(au{)/g, '${');

});
___scope___.file("grid/mainScrollEvents.js", function(exports, require, module, __filename, __dirname){ 

"use strict";
/**
 * This takes care of the scrolling part
 * It listen for mouse wheel, touch scroll and the extra scrollbars we attach to the grid
 * Is also makes sure the left/right and main is same scrollTop, so we dont get that laggy effect on slow browsers
 * It triggers event to update/bind data after its done
 *
 */
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
        // check if IE, need to act on another mousewheel event if so
        this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
        if (this.isIE11) {
            this.wheelEvent = 'onmousewheel';
            console.warn('IE11, why!?!?!');
        }
    }
    /**
     * Called when grid is created to set defaults, add event listners
     *
     */
    MainScrollEvents.prototype.init = function () {
        this.updateInternalHtmlCache();
        this.addScrollEvents('all');
    };
    /**
     * just adds the html elements to class
     *
     */
    MainScrollEvents.prototype.updateInternalHtmlCache = function () {
        this.left = this.htmlCache.avg_content_left;
        this.main = this.htmlCache.avg_content_main;
        this.right = this.htmlCache.avg_content_right;
        this.mainHead = this.htmlCache.avg_header_main_scroll;
        this.vhandle = this.htmlCache.avg_content_vhandle;
        this.hhandle = this.htmlCache.avg_content_hhandle;
        this.group = this.htmlCache.avg_content_group;
    };
    /**
     * called by mouse wheel event listener
     *
     */
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
    /**
     * Adds scroll events touch, mousewheel and scrolling on vertical scrollbar and horisontal scrollbar
     * we dont use automatic scrollstate browsers can have a overflow y wtc, since it will look horrible on slow browsers
     *
     */
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
    /**
     * removed the scroll event
     * was more before, main reason this was here, but didnt work well on old browsers
     *
     */
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
    /**
     * called by touchStart event listener
     *
     */
    MainScrollEvents.prototype.touchStart = function (e) {
        var touchobj = e.changedTouches[0];
        this.touchY = parseInt(touchobj.clientY, 10);
        this.touchX = parseInt(touchobj.clientX, 10);
    };
    /**
     * called by touchMove event listener
     *
     */
    MainScrollEvents.prototype.touchMove = function (e) {
        var touchobj = e.changedTouches[0];
        var dist = this.touchY - parseInt(touchobj.clientY, 10);
        var distX = parseInt(touchobj.clientX, 10) - this.touchX;
        this.touchY = parseInt(touchobj.clientY, 10);
        this.touchX = parseInt(touchobj.clientX, 10);
        this.handleEventWheelScroll(dist, -distX);
        e.preventDefault();
    };
    /**
     * called by scrollwheel event listener function, the does the actual updating of scrolltop
     *
     */
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
    /**
     * called when vertical scrollabrs is dragged
     *
     */
    MainScrollEvents.prototype.handleEventVhandle = function () {
        var _this = this;
        requestAnimationFrame(function () {
            if (_this.timerVhandle) {
                clearTimeout(_this.timerVhandle);
                _this.removeScrollEvents('Vhandle');
            }
            // needed this else chrome had weird effect when dragging fast past bottom of a scrollbars
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
    /**
     * called when horisontal scrollabrs is dragged
     *
     */
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
                // this.checkScroll(newTopPosition);
                _this.timerHhandle = setTimeout(function () {
                    _this.addScrollEvents('Hhandle');
                    _this.timerHhandle = null;
                }, 30);
            });
        });
    };
    /**
     * check the scrolling and triggers updating of row top values
     *
     */
    MainScrollEvents.prototype.checkScroll = function (newTopPosition) {
        if (this.lastTopPosition !== newTopPosition) {
            // check is up or down
            var isDown = true;
            if (this.lastTopPosition > newTopPosition) {
                isDown = false;
            }
            // set last position
            this.lastTopPosition = newTopPosition;
            // trigger scroll
            this.triggerGridScrollEvent(this.isScrollbar, isDown, newTopPosition);
        }
    };
    /**
     * trigger event called after checking type of scroll
     *
     */
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

"use strict";
/**
 * This creates the markup for the rows for:
 * - pinned left and right
 * - main
 * - group
 *
 */
var RowMarkup = (function () {
    function RowMarkup(element, htmlCache) {
        this.element = element;
        this.htmlCache = htmlCache;
    }
    /**
     * Called when grid is created to set defaults, add event listners
     *
     */
    RowMarkup.prototype.init = function (rowHeight) {
        this.rowHeight = rowHeight;
        this.updateInternalHtmlCache();
        this.generateRows();
    };
    /**
     * Generate the row markup
     * called when grid is created and not used again
     *
     */
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
    /**
     * just adds the main html elements to class
     *
     */
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

"use strict";
/**
 * This takes care of the row scrolling
 * It sets the correct top values to all columns and groups
 * Columns are pinned left and right, main
 * It does not listen for scroll event on main elements, just internal event "avg-scroll"
 * After it sets correct top value, it triggers event to rebind row/ update data
 *
 */
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
    /**
     * Called when grid is created to set defaults, add event listners
     *
     */
    RowScrollEvents.prototype.init = function (rowHeight, attDataDelay, attVariableRowHeight) {
        this.rowCache = this.htmlCache.rowCache;
        this.largeScrollUpdateDelay = attDataDelay;
        this.rowHeight = rowHeight;
        this.updateInternalHtmlCache();
        this.createRowCache();
        if (attVariableRowHeight) {
            // @override what scroll functions to use
            this.scrollNormal = this.scrollNormalVariableRowHeight.bind(this);
            this.scrollScrollBar = this.scrollScrollBarVariableRowHeight.bind(this);
        }
        this.addEventListener();
    };
    /**
     * Gets called when selection changes, this way it knows the limit of scrolling
     *
     */
    RowScrollEvents.prototype.setCollectionLength = function (length) {
        this.collectionLength = length;
    };
    /**
     * Creates a rowcache so its easy to get the bindingcontexts of all columns
     *
     */
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
    /**
     * Updates internal html cache so its easy to access
     *
     */
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
        /**
         * returns the context height of main column (middle one)
         *
         */
        get: function () {
            return this.htmlCache.avg_content_main.offsetHeight;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Figues out what type of scrolling is done and calls correct method
     *
     */
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
    /**
     * Sets new top calues to all needed columns (left, main, right, group)
     *
     */
    RowScrollEvents.prototype.setRowTopValue = function (cache, top) {
        cache.left.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.main.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.right.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.group.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.top = top;
        cache.row = Math.floor(top / this.rowHeight);
    };
    /**
     * Sets new top calues to all needed columns (left, main, right, group)
     * This one is used for the vaiable row height
     *
     */
    RowScrollEvents.prototype.setRowTopValueVariableRowHeight = function (cache, top) {
        cache.left.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.main.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.right.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.group.style.transform = "translate3d(0px," + top + "px, 0px)";
        cache.top = top;
        var rowHeightState = this.controller.getRowHeightState();
        cache.row = rowHeightState.top.indexOf(top);
    };
    /**
     * Handles normal scrolling
     *
     */
    RowScrollEvents.prototype.scrollNormal = function (newTopPosition, downScroll) {
        var rowHeight = this.rowHeight;
        var currentRow = Math.floor(newTopPosition / rowHeight);
        var cacheHeight = rowHeight * this.cacheLength;
        for (var i = 0; i < this.cacheLength; i++) {
            var cache = this.rowCache[i];
            var top = this.rowCache[i].top;
            var update = false;
            var newTop = void 0;
            if (!downScroll) {
                if (top > (newTopPosition + this.contentHeight)) {
                    update = true;
                    newTop = top - cacheHeight;
                    currentRow = (top - cacheHeight) / rowHeight;
                }
            }
            else {
                if (top < (newTopPosition - rowHeight)) {
                    update = true;
                    newTop = top + cacheHeight;
                    currentRow = (top + cacheHeight) / rowHeight;
                }
            }
            if (update === true && currentRow >= 0 && currentRow <= this.collectionLength - 1) {
                this.setRowTopValue(cache, newTop);
                this.triggerRebindRowEvent(currentRow, cache, downScroll);
            }
        }
        // sort array
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
    };
    /**
     * Handles scrollbars scrolling, or when setting top value by code
     *
     */
    RowScrollEvents.prototype.scrollScrollBar = function (newTopPosition, downScroll) {
        var _this = this;
        if (this.collectionLength <= this.cacheLength) {
            newTopPosition = 0;
        }
        // vars
        var rowHeight = this.rowHeight;
        var bodyHeight = this.contentHeight;
        var currentRow = Math.floor(newTopPosition / rowHeight);
        var firstRow = Math.floor(newTopPosition / rowHeight);
        var currentRowTop = rowHeight * currentRow;
        var firstRowTop = rowHeight * firstRow;
        var collectionLength = this.collectionLength;
        // for setting after
        var setAfter = function (no) {
            var row = _this.rowCache[no];
            _this.setRowTopValue(row, currentRowTop);
            currentRowTop = currentRowTop + rowHeight;
        };
        // for setting before (when hitting bottom)
        var setBefore = function (no) {
            var row = _this.rowCache[no];
            firstRowTop = firstRowTop - rowHeight;
            _this.setRowTopValue(row, firstRowTop);
        };
        // for setting before (when hitting bottom)
        var setHiddenFromView = function (no) {
            var row = _this.rowCache[no];
            _this.setRowTopValue(row, -(currentRowTop + (rowHeight * 50)));
        };
        // loop row html cache
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
                    // if this triggers the collection have been removed, so really just need to place out the rows
                    if (currentRow >= collectionLength) {
                        //setAfter(i);
                        setHiddenFromView(i);
                    }
                }
            }
            currentRow++;
        }
        // I now sort the array again.
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
        // update row data
        this.triggerRebindAllRowsEvent(downScroll, this.rowCache);
    };
    /**
     * sets row height (used when using variable row height)
     *
     */
    RowScrollEvents.prototype.setRowHeight = function (rowElement, rowNo) {
        var rowHeightState = this.controller.getRowHeightState();
        rowElement.left.style.height = rowHeightState.rows[rowNo] + 'px';
        rowElement.main.style.height = rowHeightState.rows[rowNo] + 'px';
        rowElement.right.style.height = rowHeightState.rows[rowNo] + 'px';
        rowElement.group.style.height = rowHeightState.rows[rowNo] + 'px';
    };
    /**
     * Handles normal scrolling (used when using variable row height)
     * if varibale row state is set the override the "scrollNormal" method
     *
     */
    RowScrollEvents.prototype.scrollNormalVariableRowHeight = function (newTopPosition, downScroll) {
        var rowHeightState = this.controller.getRowHeightState();
        for (var i = 0; i < this.cacheLength; i++) {
            var cache = this.rowCache[i];
            var top = this.rowCache[i].top;
            var currentRow = rowHeightState.top.indexOf(top);
            this.setRowHeight(this.rowCache[i], currentRow);
            var update = false;
            var newTop = void 0;
            if (!downScroll) {
                if (top > (newTopPosition + this.contentHeight)) {
                    currentRow = currentRow - this.cacheLength;
                    if (currentRow > -1) {
                        update = true;
                        newTop = rowHeightState.top[currentRow];
                    }
                }
            }
            else {
                if (top < (newTopPosition - rowHeightState.rows[currentRow])) {
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
        // sort array
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
    };
    /**
     * Handles scrollbars scrolling, or when setting top value by code (used when using variable row height)
     * if varibale row state is set the override the "scrollScrollBar" method
     *
     */
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
            // need to do some looping here, need to figure out where we are..
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
        // vars
        var bodyHeight = this.contentHeight;
        currentRowTop = rowHeightState.top[currentRow];
        var firstRowTop = currentRowTop * 1;
        var collectionLength = this.collectionLength;
        // for setting after
        var setAfter = function (no) {
            var row = _this.rowCache[no];
            _this.setRowHeight(row, currentRow);
            _this.setRowTopValueVariableRowHeight(row, currentRowTop);
            row.row = currentRow;
            currentRowTop = currentRowTop + rowHeightState.rows[currentRow];
        };
        // for setting before (when hitting bottom)
        var setBefore = function (no) {
            var row = _this.rowCache[no];
            _this.setRowHeight(row, currentRow);
            firstRowTop = firstRowTop - rowHeightState.rows[currentRow];
            _this.setRowTopValueVariableRowHeight(row, firstRowTop);
        };
        // for setting before (when hitting bottom)
        var setHiddenFromView = function (no) {
            var row = _this.rowCache[no];
            _this.setRowTopValueVariableRowHeight(row, -(currentRowTop + (rowHeightState.rows[currentRow] * 50)));
        };
        // loop row html cache
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
                    // if this triggers the collection have been removed, so really just need to place out the rows
                    if (currentRow >= collectionLength) {
                        setHiddenFromView(i_1);
                    }
                }
            }
            currentRow++;
        }
        // I now sort the array again.
        this.rowCache.sort(function (a, b) {
            return a.row - b.row;
        });
        // update row data
        this.triggerRebindAllRowsEvent(downScroll, this.rowCache);
    };
    /**
     * Adds event listener from "avg-scroll"
     * This is usually called by the mainScrollEvents class
     *
     */
    RowScrollEvents.prototype.addEventListener = function () {
        this.onScrollBinded = this.onScroll.bind(this);
        this.element.addEventListener('avg-scroll', this.onScrollBinded);
    };
    /**
     * Triggers event to rebind row
     *
     */
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
    /**
     * Triggers event to rebind all rows
     *
     */
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

"use strict";
var aurelia_framework_1 = require("aurelia-framework");
var columnMarkupHelper_1 = require("./columnMarkupHelper");
/**
 *  Creates all the columns markup/viewports when grid is created
 *
 */
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
    /**
     *  sets needed context/data and generates the columns needed
     *
     */
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
    /**
     *  returns the row view using the viewCompiler and markup needed
     *
     */
    ColumnMarkup.prototype.getRowViews = function (type) {
        var viewMarkup = '';
        var markupArray = [];
        // group column
        if (type === 'group') {
            // default markup
            var defaultMarkup = [
                '<i click.delegate="changeGrouping(rowRef)">',
                '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">',
                '<path show.bind="rowRef.__groupExpanded" d="M4.8 7.5h6.5v1H4.8z"/>',
                '<path show.bind="!rowRef.__groupExpanded" d="M7.4 4.8v2.7H4.7v1h2.7v3h1v-3h2.8v-1H8.5V4.8h-1z"/>',
                '</svg>',
                '</i>&nbsp;${rowRef.__groupName} (${rowRef.__groupTotal})',
            ];
            // if user supplied markup we use that, else default 
            var gTemplate = this.colGroup || defaultMarkup.join('');
            // all markup 
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
        // this is the block that puches the column from left for grouping
        var groupingBlock = '';
        if (type === 'left') {
            groupingBlock = '<avg-col \
      class="avg-col-grouping" \
      css="left:0px;width:${rowRef.__groupLvl ? rowRef.__groupLvl *15:0}px"></avg-col>';
        }
        return this.viewCompiler.compile("<template>" + (groupingBlock + viewMarkup) + "</template>", this.viewResources);
    };
    /**
     *  create coluumn context that will be used to control the width & left style of them
     *  It will also control if they are visible or hidden
     *
     */
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
    /**
     *  returns the header view using the viewCompiler and markup needed
     *
     */
    ColumnMarkup.prototype.getHeaderViews = function (type) {
        var viewMarkup = '';
        if (this.colRepeater && type === 'main' && this.colRepeatHeaderTemplate) {
            // if repeater and main, we add to the 
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
        // this is the block that puches the column from left for grouping
        var groupingBlock = '';
        if (type === 'left') {
            groupingBlock = '<avg-col \
                          class="avg-col-grouping-header" \
                          css="left:0px;width:${setupgrouping ? (setupgrouping * 15):0}px"> \
                       </avg-col>';
        }
        return this.viewCompiler.compile("<template>" + (groupingBlock + viewMarkup) + "</template>", this.viewResources);
    };
    /**
     *  starts to generate the needed columns
     *
     */
    ColumnMarkup.prototype.generateColumns = function () {
        if (this.columnBindingContext.setupmain.length === 0) {
            // grid hidden by if.bind...lets keep what ever is in here
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
    /**
     *  creates a viewslot and adds the view using the viewFactory
     *
     */
    ColumnMarkup.prototype.createViewSlot = function (element, viewFactory) {
        var view = viewFactory.create(this.container); // <<< time consumer, I should rebuild ?
        var viewSlot = new aurelia_framework_1.ViewSlot(element, true);
        viewSlot.add(view);
        return viewSlot;
    };
    /**
     *  gets the html markup from the htmlCache and sets it to this class instance
     *
     */
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

"use strict";
/**
 * Generate the simple html columns markup from settings fetched from the attrubites
 *
 */
var ColumnMarkupHelper = (function () {
    function ColumnMarkupHelper() {
    }
    /**
     * todo description
     *
     */
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
    /**
     * todo description
     *
     */
    ColumnMarkupHelper.prototype.processColumns = function (array) {
        var _this = this;
        array.forEach(function (col, index) {
            // we need attribute or rowtemplate, else throm error
            if (!col.colField && !col.colRowTemplate) {
                if (col.colType !== 'selection') {
                    throw new Error('colField is not set on column' + index);
                }
            }
            // set default, some can be missing
            col.colType = col.colType || 'text';
            col.colFilterTop = col.colFilterTop || false;
            col.colHeaderName = col.colHeaderName || _this.getAttribute(col.colField, true);
            col.colWidth = col.colWidth || 100;
            col.colCss = col.colCss || '';
            col.colField = _this.checkAttribute(col.colField);
            // create row and header templates
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
    /**
     * todo description
     *
     */
    ColumnMarkupHelper.prototype.createHeaderTemplate = function (col) {
        // if header template does not exist then lets create it
        if (!col.colHeaderTemplate) {
            var inputHeader = void 0;
            var labelHeader = void 0;
            switch (col.colType) {
                case 'selection':
                    // set template
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
            // set correctly to where is is suppoed to be
            if (col.colFilterTop) {
                col.__colHeaderTemplateGenerated = inputHeader + labelHeader;
            }
            else {
                col.__colHeaderTemplateGenerated = labelHeader + inputHeader;
            }
        }
    };
    /**
     * todo description
     *
     */
    ColumnMarkupHelper.prototype.createRowTemplate = function (col) {
        // if row template does not exist, then lets create it
        if (!col.colRowTemplate) {
            switch (col.colType) {
                case 'selection':
                    // set template
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
    /**
     * todo description
     *
     */
    ColumnMarkupHelper.prototype.getAttribute = function (value, capitalize) {
        var returnValue = value || 'missing!';
        if (value) {
            // remove rowRef/tempRef
            value = value.replace('rowRef.', '');
            value = value.replace('tempRef.', '');
            // loop it until we have the attribute
            var newValue = '';
            var done = false;
            for (var x = 0; x < value.length; x++) {
                var letter = value.charAt(x);
                // if we hit & or | or space we are at the end
                if (!done && letter !== ' ' && letter !== '&' && letter !== '|' && letter !== ':') {
                    newValue = newValue + letter;
                }
                else {
                    done = true;
                }
            }
            // capilize first letter
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
    /**
     * todo description
     *
     */
    ColumnMarkupHelper.prototype.checkAttribute = function (attribute) {
        var value = attribute;
        if (attribute) {
            if (attribute.indexOf('rowRef') === -1 && attribute.indexOf('tempRef') === -1) {
                value = 'rowRef.' + attribute;
            }
        }
        return value;
    };
    /**
     * todo description
     *
     */
    ColumnMarkupHelper.prototype.createImageRowMarkup = function (col) {
        // get the values/settings
        var classNames = 'class="avg-image-round"';
        var attributeRow = col.colAddRowAttributes ? col.colAddRowAttributes : '';
        var css = col.colCss ? "css=\"" + col.colCss + "\"" : '';
        var imageFix = "v-image-fix.bind=\"" + col.colField + "\"";
        // insert the markup
        col.__colRowTemplateGenerated = "<image " + css + " " + classNames + " " + imageFix + " " + attributeRow + ">";
    };
    /**
     * todo description
     *
     */
    ColumnMarkupHelper.prototype.createInputRowMarkup = function (col) {
        // get the values/settings
        var colClass = "class=\"" + (col.colType === 'checkbox' ? 'avg-row-checkbox-100' : 'avg-row-input') + "\"";
        // type
        var colType = "type=\"" + col.colType + "\"";
        // get attributes row
        var colAddRowAttributes = col.colAddRowAttributes ? col.colAddRowAttributes : '';
        // menu ?
        var colRowMenu = col.colRowMenu ? "v-menu=\"" + col.colRowMenu + "\"" : '';
        // get css
        var colCss = col.colCss ? "css=\"" + col.colCss + "\"" : '';
        // is it a checkbox?
        // todo: adding the observer part without choice, maybe param for that?
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
    /**
     * todo description
     *
     */
    ColumnMarkupHelper.prototype.createInputHeaderMarkup = function (col) {
        // is it filter ?
        var markup;
        if (col.colFilter) {
            // type
            var type = "type=\"" + col.colType + "\"";
            // filter
            var filter = col.colFilter ? "v-filter=\"" + col.colFilter + "\"" : '';
            // get attributes label
            var colAddFilterAttributes = col.colAddFilterAttributes ? col.colAddFilterAttributes : '';
            // is it a checkbox ?
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
        // return the markup
        return markup;
    };
    /**
     * todo description
     *
     */
    ColumnMarkupHelper.prototype.createLabelMarkup = function (col) {
        // get the values/settings
        var filterClass = col.colFilter ? "" + (col.colFilterTop ? 'avg-label-bottom' : 'avg-label-top') : 'avg-label-full';
        var dragDropClass = col.colDragDrop ? 'avg-vGridDragHandle' : '';
        var classname = "class=\"" + dragDropClass + " " + filterClass + "\"";
        var colAddLabelAttributes = col.colAddLabelAttributes ? col.colAddLabelAttributes : '';
        var sort = col.colSort ? "v-sort=\"" + col.colSort + "\"" : '';
        var colLabelMenu = col.colLabelMenu ? "v-menu=\"" + col.colLabelMenu + "\"" : '';
        var colDragDrop = col.colDragDrop !== 'false' ? "v-drag-drop-col=\"" + col.colDragDrop + "\"" : '';
        var colResizeable = col.colResizeable !== 'false' ? "v-resize-col" : '';
        var extraAttributes = colDragDrop + " " + colResizeable + " " + colLabelMenu;
        // apply magic
        // todo, atm Im adding resize columns and dragdrop columns, should this be a choice?
        return "<p \n      " + extraAttributes + " \n      " + classname + " \n      " + sort + " \n      " + colAddLabelAttributes + ">\n      " + col.colHeaderName + "\n      </p>";
    };
    return ColumnMarkupHelper;
}());
exports.ColumnMarkupHelper = ColumnMarkupHelper;

});
___scope___.file("grid/htmlHeightWidth.js", function(exports, require, module, __filename, __dirname){ 

"use strict";
/**
 * Holds all the height and width of main markup
 * This is binded to the main markup, so changes here will reflect in the grid height/width
 *
 */
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
    /**
     * returns the height the scroll area need to be
     * TODO: need to make something else here if -Im going for wariable row height
     *
     */
    HtmlHeightWidth.prototype.getNewHeight = function (length) {
        var lengthTotal = 0;
        if (this.controller.attVariableRowHeight) {
            // If variable row height we need to use the 
            lengthTotal = this.controller.getRowHeightState().total;
        }
        else {
            // if not varibale row height, we use default
            lengthTotal = this.controller.attRowHeight * length;
        }
        return lengthTotal;
    };
    /**
     * corrects the scroll area to the correct high af all scroll divs
     *
     */
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
    /**
     * sets the correct wisth of main markup/skeleton of the grid
     *
     */
    HtmlHeightWidth.prototype.addDefaultsAttributes = function (attHeaderHeight, attRowHeight, attFooterHeight, attPanelHeight) {
        this.attHeaderHeight = attHeaderHeight;
        this.attRowHeight = attRowHeight;
        this.attFooterHeight = attFooterHeight;
        this.attPanelHeight = attPanelHeight;
        // set main body parts
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
    /**
     * corrects the left style and with of columns
     *
     */
    HtmlHeightWidth.prototype.adjustWidthsColumns = function (columnBindingContext, groupsLength) {
        var left = groupsLength ? groupsLength * 15 : 0;
        var main = 0;
        var right = 0;
        // tslint:disable-next-line:prefer-for-of
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
    /**
     * sets the correct with of columns based of the v-column or v-grid-col attributes
     *
     */
    HtmlHeightWidth.prototype.setWidthFromColumnConfig = function (colConfig, groupsLength) {
        var left = groupsLength ? groupsLength * 15 : 0;
        var main = 0;
        var right = 0;
        // tslint:disable-next-line:prefer-for-of
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
    /**
     * returns the scrollbar with used in browser
     *
     */
    HtmlHeightWidth.prototype.getScrollbarWidth = function () {
        var outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        document.body.appendChild(outer);
        var widthNoScroll = outer.offsetWidth;
        // force scrollbars
        outer.style.overflow = 'scroll';
        // add innerdiv
        var inner = document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);
        var widthWithScroll = inner.offsetWidth;
        // remove divs
        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    };
    return HtmlHeightWidth;
}());
exports.HtmlHeightWidth = HtmlHeightWidth;

});
___scope___.file("grid/viewSlots.js", function(exports, require, module, __filename, __dirname){ 

"use strict";
/**
 * This holds all the grids viewslots, so its easy to bind and attach and unbind/detach when removed
 *
 */
var ViewSlots = (function () {
    function ViewSlots(htmlCache) {
        this.rowCache = htmlCache.rowCache;
        this.headerCache = htmlCache.headerCache;
        this.leftRowViewSlots = [];
        this.mainRowViewSlots = [];
        this.rightRowViewSlots = [];
        this.groupRowViewSlots = [];
        // header view slots
        this.leftHeaderViewSlot = null;
        this.mainHeaderViewSlot = null;
        this.rightHeaderViewSlot = null;
        // entire grid markup / skeleton
        this.mainViewSlot = null;
        // misc other viewslots
        this.loadingScreenViewSlot = null;
        this.groupingViewSlots = [];
        this.contextMenu = null;
        // grouping elements viewslots is not here... see GroupingElements class
    }
    /**
     * Bind and attaches the viewslots
     * Called when created, and reattached after if.bind is used
     *
     */
    ViewSlots.prototype.bindAndAttachColumns = function (overrideContext, columnBindingContext, curSelection) {
        var context;
        // create a extra parent override context so we can add
        // overrideContext from model holding grid and columnbinding
        var newParentOverrideContext = {
            bindingContext: columnBindingContext,
            parentOverrideContext: overrideContext
        };
        for (var i = 0; i < this.rowCache.length; i++) {
            // one for each row.
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
        // add selection to the context, so we can control selection (delselect/select all)
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
        // todo loading screen and footer?
    };
    /**
     * Unbinds and detach all the viewslots
     * usually called during grids unbind event
     *
     */
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
        // todo loading screen and footer, or grouping elements?
    };
    /**
     * removes all viewslots
     * Todo, is this even in use?
     *
     */
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
        // todo loading screen and footer, or grouping elements?
    };
    return ViewSlots;
}());
exports.ViewSlots = ViewSlots;

});
___scope___.file("grid/columnBindingContext.js", function(exports, require, module, __filename, __dirname){ 

"use strict";
/**
 * Columns context object
 * Helps control the columns/rows get groups etc
 *
 */
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
    /**
     * todo description
     *
     */
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

"use strict";
/**
 * Updates the data rows and sets correct row highlight
 *
 */
var RowDataBinder = (function () {
    function RowDataBinder(element, controller) {
        this.element = element;
        this.controller = controller;
    }
    /**
     * Called when grid is created to set defaults, add event listners
     *
     */
    RowDataBinder.prototype.init = function () {
        this.addEventListener();
    };
    /**
     * rebinds row passed in
     *
     */
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
    /**
     * adds needed event listners to know when to rebind on scrolling
     *
     */
    RowDataBinder.prototype.addEventListener = function () {
        this.rebindRowBinded = this.rebindRow.bind(this);
        this.rebindAllRowsBinded = this.rebindAllRows.bind(this);
        this.element.addEventListener('avg-rebind-row', this.rebindRowBinded);
        this.element.addEventListener('avg-rebind-all-rows', this.rebindAllRowsBinded);
    };
    /*  unused for now
        private removeEventListener(): void {
        this.element.removeEventListener('avg-rebind-row', this.rebindRowBinded);
        this.element.removeEventListener('avg-rebind-all-rows', this.rebindAllRowsBinded);
      }*/
    /**
     * rebinds row, called from event listener
     *
     */
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
            // todo clean up...
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
            // row ref & temp
            bindingContext.rowRef = data.rowRef;
            bindingContext.tempRef = data.tempRef;
            // selection
            bindingContext.selection = data.selection;
            // is selected
            bindingContext.selected = isSelected;
            // row number
            bindingContext.row = currentRow;
        });
    };
    /**
     * rebinds all rows, called from event listener
     *
     */
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
                // todo clean up...
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
                // row ref & tempRef
                bindingContext.rowRef = data.rowRef;
                bindingContext.tempRef = data.tempRef;
                // selection
                bindingContext.selection = data.selection;
                // is selected
                bindingContext.selected = isSelected;
                // row number
                bindingContext.row = rowCache[i].row;
            });
        };
        var this_1 = this;
        // tslint:disable-next-line:prefer-for-of
        for (var i = 0; i < rowCache.length; i++) {
            _loop_1(i);
        }
    };
    return RowDataBinder;
}());
exports.RowDataBinder = RowDataBinder;

});
___scope___.file("grid/rowClickHandler.js", function(exports, require, module, __filename, __dirname){ 

"use strict";
/**
 * Listen for click on rows
 * Fixes/calls selection to set correct highlighs when using shift/contrl button for multiselect
 * Calls grids single/dbl click events
 *
 */
var RowClickHandler = (function () {
    function RowClickHandler(element, htmlCache) {
        this.element = element;
        this.htmlCache = htmlCache;
        this.selectionMode = 'none';
        this.lastRowSelected = -1; // this need to be reset when filtering
        this.lastKeyKodeUsed = 'none'; // this ned to be reset when filtering
        this.selectedRows = 0;
    }
    /**
     * Called when grid is created to set defaults, add event listners
     *
     */
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
    /**
     * updates selection, usually after row click values is checked and selection set
     *
     */
    RowClickHandler.prototype.updateSelectionOnAllRows = function () {
        var rowCache = this.htmlCache.rowCache;
        // tslint:disable-next-line:prefer-for-of
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
    /**
     * returns mode of selection used
     *
     */
    RowClickHandler.prototype.getSelectionMode = function () {
        var selection = this.getSelection();
        return selection.getMode();
    };
    /**
     * remove event listeners set, not is use really atm
     *
     */
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
    /**
     * add click events to rows
     *
     */
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
    /**
     * Called when single click event triggers
     *
     */
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
    /**
     * Called when dbl click event triggers
     *
     */
    RowClickHandler.prototype.doubleClick = function (event) {
        var cache = this.getCache(event.currentTarget) || {};
        this.controller.raiseEvent('v-row-ondblclick', {
            evt: event,
            data: cache.bindingContext.rowRef,
            bindingContext: cache.bindingContext,
            row: cache.row
        });
    };
    /**
     * calls selection added to grid
     *
     */
    RowClickHandler.prototype.isSelected = function (row) {
        var selection = this.getSelection();
        return selection.isSelected(row);
    };
    /**
     * calls selection added to grid
     *
     */
    RowClickHandler.prototype.deSelect = function (row) {
        var selection = this.getSelection();
        selection.deSelect(row);
    };
    /**
     * calls selection added to grid
     *
     */
    RowClickHandler.prototype.select = function (row, addToSelection) {
        var selection = this.getSelection();
        selection.select(row, addToSelection);
    };
    /**
     * calls selection added to grid
     *
     */
    RowClickHandler.prototype.selectRange = function (start, end) {
        var selection = this.getSelection();
        selection.selectRange(start, end);
    };
    /**
     * calls selection added to grid
     *
     */
    RowClickHandler.prototype.getSelectedRows = function () {
        var selection = this.getSelection();
        return selection.getSelectedRows();
    };
    /**
     * calls selection added to grid
     *
     */
    RowClickHandler.prototype.setSelectedRows = function (newRows) {
        var selection = this.getSelection();
        selection.setSelectedRows(newRows);
    };
    /**
     * logic behind multiselect of rows with shoft and contrl button
     *
     */
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
                    // update selection on rows
                    this.updateSelectionOnAllRows();
                }
            }
            else {
                // same row clicked again
                if (e.ctrlKey) {
                    currentKeyKode = 'ctrl';
                }
                // if ctrl button we want to remove selection
                if (currentKeyKode === 'ctrl') {
                    this.lastKeyKodeUsed = currentKeyKode;
                    isSel = this.isSelected(currentRow);
                    if (isSel === true) {
                        this.deSelect(currentRow);
                    }
                    this.lastRowSelected = currentRow;
                }
                else {
                    // else we just want to make it current..
                    // isSel = this.isSelected(currentRow);
                    this.select(currentRow, false);
                }
                // update selection on rows
                this.updateSelectionOnAllRows();
            }
        }
    };
    return RowClickHandler;
}());
exports.RowClickHandler = RowClickHandler;

});
___scope___.file("grid/groupingElements.js", function(exports, require, module, __filename, __dirname){ 

"use strict";
var aurelia_framework_1 = require("aurelia-framework");
// Two classes here!   GroupContext & GroupingElements
/**
 * Private class used by grouping elements
 * This is the context of the box in the top panel
 *
 */
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
/**
 * Creates the grouping elements viewports and logic
 * This take care of the top panel, when called it adds the html element with its context
 * It also fixes/sets corrcet panel when grid is created/ grouping runs by code
 *
 */
// tslint:disable-next-line:max-classes-per-file
var GroupingElements = (function () {
    function GroupingElements(element, viewCompiler, container, viewResources, htmlCache, viewSlots, columnBindingContext) {
        // basic stuff
        this.element = element;
        this.htmlCache = htmlCache;
        this.viewSlots = viewSlots;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.columnBindingContext = columnBindingContext;
        // group context
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
    /**
     * Called when grid is created to set defaults, add event listners
     *
     */
    GroupingElements.prototype.init = function (controller, colGroupElement) {
        this.controller = controller;
        this.avgTopPanel = this.htmlCache.avg_top_panel;
        this.colGroupElement = colGroupElement;
    };
    /**
     * todo description
     *
     */
    GroupingElements.prototype.addGroup = function (name, field) {
        if (!this.groupContext[field]) {
            this.lastAdded = field;
            this.groupContext[field] = new GroupContext(name, field, this);
            // view-viewslot
            // tslint:disable:max-line-length
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
    /**
     * todo description
     *
     */
    GroupingElements.prototype.removeGroup = function (field) {
        if (field) {
            if (this.groupContext[field] !== null) {
                this.groupContext[field].viewSlot.unbind();
                this.groupContext[field].viewSlot.detached();
                this.groupContext[field].viewSlot.removeAll();
                this.groupContext[field] = null; // <-- I could prb reuse them...
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
    /**
     * todo description
     *
     */
    GroupingElements.prototype.addToGrouping = function () {
        if (this.lastAdded) {
            var toAddField = this.groupContext[this.lastAdded].field;
            var toAddTitle = this.groupContext[this.lastAdded].name;
            this.controller.addToGrouping({ field: toAddField, title: toAddTitle });
            this.lastAdded = null;
        }
    };
    /**
     * todo description
     *
     */
    GroupingElements.prototype.removeFromGrouping = function (field) {
        this.controller.removeFromGrouping(field);
    };
    return GroupingElements;
}());
exports.GroupingElements = GroupingElements;

});
___scope___.file("grid/loadingScreen.js", function(exports, require, module, __filename, __dirname){ 

"use strict";
var aurelia_framework_1 = require("aurelia-framework");
/**
 * Creates the loading screen viewport and binds it
 * Controller calls this to enable/disable (show/hide) it
 *
 */
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
    /**
     * update default loading test, used by the translation
     *
     */
    LoadingScreen.prototype.updateLoadingDefaultLoadingMessage = function (msg) {
        this.loadingMessage = msg;
    };
    /**
     * call when creating the grid so we have custom html if any and overridecontext to use
     *
     */
    LoadingScreen.prototype.init = function (overrideContext, loadingScreenTemplate) {
        this.overrideContext = overrideContext;
        var loadingScreentHtml = loadingScreenTemplate || "[\n      <div class=\"avg-overlay\" if.bind=\"loading\">\n      </div>\n      <div if.two-way=\"loading\" class=\"avg-progress-indicator\">\n      <div class=\"avg-progress-bar\" role=\"progressbar\" style=\"width:100%\">\n      <span>$au{ loadingMessage }</span>\n      </div>\n      </div>".replace(/\$(au{)/g, '${');
        var viewFactory = this.viewCompiler.compile("<template>\n      " + loadingScreentHtml + "\n      </template>", this.viewResources);
        var view = viewFactory.create(this.container);
        var loadingScreenViewSlot = new aurelia_framework_1.ViewSlot(this.element, true);
        loadingScreenViewSlot.add(view);
        // bind
        loadingScreenViewSlot.bind(this, {
            bindingContext: this,
            parentOverrideContext: this.overrideContext
        });
        loadingScreenViewSlot.attached();
        this.viewSlots.loadingScreenViewSlot = loadingScreenViewSlot;
    };
    /**
     * shows the loadingscreen overlay until removed
     *
     */
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
    /**
     * removes the loadingscreen overlay
     *
     */
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

"use strict";
// tslint:disable:max-line-length
var aurelia_framework_1 = require("aurelia-framework");
/**
 * Creates the context menus used in the grid
 *
 */
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
    /**
     * todo description
     *
     */
    ContextMenu.prototype.setDefaults = function () {
        this.top = 0;
        this.left = 0;
        this.show = false;
        this.pinnedMenu = false;
        this.sortMenu = false;
        this.filterMainMenu = false;
        this.filterOptionsMenu = false;
    };
    /**
     * add the custom templates if any and overridecontext to use
     *
     */
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
    /**
     * opens the menu
     *
     */
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
    /**
     * menu click event
     *
     */
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
    /**
     * update/translate menu strings
     *
     */
    ContextMenu.prototype.updateMenuStrings = function (key, text) {
        if (this.menuStrings[key]) {
            this.menuStrings[key] = text;
        }
    };
    /**
     * active the filter menu
     *
     */
    ContextMenu.prototype.showFilterOptions = function () {
        this.filterOptionsMenu = true;
    };
    /**
     * hide the filter menu
     *
     */
    ContextMenu.prototype.hideFilterOptions = function () {
        this.filterOptionsMenu = false;
    };
    /*  positionMenu(x, y) {
        //not in use atm
        let clickCoordsX = this.left;
        let clickCoordsY = this.top;
    
        this.menuWidth = this.menu.offsetWidth + 4;
        this.menuHeight = this.menu.offsetHeight + 4;
    
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
    
        if ((this.windowWidth - this.clickCoordsX) < this.menuWidth) {
          this.left = this.windowWidth - this.menuWidth + "px";
        } else {
          this.left = this.clickCoordsX + "px";
        }
    
        if ((this.windowHeight - this.clickCoordsY) < this.menuHeight) {
          this.top = this.windowHeight - this.menuHeight + "px";
        } else {
          this.top = this.clickCoordsY + "px";
        }
      }*/
    /**
     * get the markup (custom if any, or else the markup)
     *
     */
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
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
/**
 * Custom Element <v-grid>
 *
 */
var VGrid = (function () {
    function VGrid(element, viewCompiler, container, viewResources, taskQueue) {
        // injected variables
        this.element = element;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
        this.taskQueue = taskQueue;
        // used by attributes for holding data
        this.dragDropAttributeSharedContext = {};
        this.resizeAttributeSharedContext = {};
        // use by v-grid-col element, that takes the data it gets and puts it in here
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
        // to know if new or hidden by "if"
        this.newGrid = true;
        // create our classes
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
            '=*': 'ends with' // 10
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
        // binding contexts, will need some for the views we create
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        // convert main attributes
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
        // if unbined we want to know if its new time ( I prb should have more code in created event... to late...)
        this.newGrid = false;
        // unbind all the columns
        this.viewSlots.unbindAndDetachColumns();
        // todo: should I bind the main, grouping and loading screen here?
    };
    VGrid.prototype.attached = function () {
        var _this = this;
        // connect grid, and let gridConnector tell us if we can generate the grid or now
        // this way we give the gridconnetor/datasource a chance to get ready before we start asking for stuff
        this.attGridConnector.connect(this.controller, function () {
            // if not new, and just hidden by if.bind, 
            // then lets just skip creating the grid and just bind the columns    
            if (_this.newGrid) {
                _this.backupColConfig = _this.colConfig.slice(0);
                // override colconfig if binded
                if (_this.attColConfig) {
                    _this.colConfig = _this.attColConfig.length > 0 ? _this.attColConfig : _this.colConfig;
                }
                _this.controller.getContext();
                _this.controller.createGrid();
            }
            // bind columns
            _this.viewSlots.bindAndAttachColumns(_this.overrideContext, _this.columnBindingContext, _this.attGridConnector.getSelection());
            // update horizontal scroller
            // todo, use TaskQueue
            setTimeout(function () {
                _this.controller.udateHorizontalScroller();
            }, 50);
            // todo: should I bind the main, grouping and loading screen here?
            // connect gridConnector to this controler
            _this.attGridConnector.gridCreated();
        });
    };
    /**
     * Checkes bool values if they are strings or or and return real boolean
     *
     */
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
    aurelia_framework_1.bindable({ attribute: 'v-row-height' })
], VGrid.prototype, "attRowHeight");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-header-height' })
], VGrid.prototype, "attHeaderHeight");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-footer-height' })
], VGrid.prototype, "attFooterHeight");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-panel-height' })
], VGrid.prototype, "attPanelHeight");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-grid-connector' })
], VGrid.prototype, "attGridConnector");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-multi-select' })
], VGrid.prototype, "attMultiSelect");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-manual-sel' })
], VGrid.prototype, "attManualSelection");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-theme' })
], VGrid.prototype, "attTheme");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-row-on-draw' })
], VGrid.prototype, "attOnRowDraw");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-columns' })
], VGrid.prototype, "attColConfig");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-i18n' })
], VGrid.prototype, "attI18N");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-data-delay' })
], VGrid.prototype, "attDataDelay");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'v-variable-row-height' })
], VGrid.prototype, "attVariableRowHeight");
exports.VGrid = VGrid;

});
___scope___.file("grid/footer.js", function(exports, require, module, __filename, __dirname){ 

"use strict";
var aurelia_framework_1 = require("aurelia-framework");
/**
 * Creates the footer viewport
 *
 */
var Footer = (function () {
    function Footer(htmlCache, viewCompiler, container, viewResources, viewSlots) {
        this.htmlCache = htmlCache;
        this.viewSlots = viewSlots;
        this.viewCompiler = viewCompiler;
        this.container = container;
        this.viewResources = viewResources;
    }
    /**
     * set the custm html if any and and overridecontext to use, then creates the viewport and binds it
     *
     */
    Footer.prototype.init = function (overrideContext, footerStringTemplate) {
        this.overrideContext = overrideContext;
        var footerTemplate = footerStringTemplate || "".replace(/\$(au{)/g, '${');
        var viewFactory = this.viewCompiler.compile("<template>\n      " + footerTemplate + "\n      </template>", this.viewResources);
        var view = viewFactory.create(this.container);
        var footerViewSlot = new aurelia_framework_1.ViewSlot(this.htmlCache.avg_footer, true);
        footerViewSlot.add(view);
        // bind
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

"use strict";
var GridConnector = (function () {
    /**
     * Creates an instance of GridConnector.
     *
     */
    function GridConnector(datasource, selection, errorHandler) {
        this.initTop = 0;
        this.controller = null;
        this.datasource = datasource;
        this.key = datasource.getKey();
        this.selection = selection || datasource.getSelection();
        this.errorhandler = errorHandler || null;
    }
    /**
     * Set scroll value grid will use when it loads
     * Useful for when going back from a detail view
     * Used by default datasource
     *
     */
    GridConnector.prototype.setInitTop = function (top) {
        this.initTop = top;
    };
    /**
     * Grid will call for this when a row is clicked
     * Need be in custom gridConnector
     *
     */
    GridConnector.prototype.getSelection = function () {
        return this.selection;
    };
    /**
     * Grid calls this to connect, we then haveto call the create function to grid to generate
     * Some might need to get a datasource ready first/call server so its usefull to know if should be created
     * Need be in custom gridConnector
     *
     */
    GridConnector.prototype.connect = function (controller, create) {
        this.controller = controller;
        this.eventID = this.datasource.addEventListener(this.eventHandler.bind(this));
        // keep it hidden while we create
        this.controller.element.style.visibility = 'hidden';
        create();
    };
    /**
     * Grid calls this when its created, you can now tell it to display data etc
     * Need be in custom gridConnector
     *
     */
    GridConnector.prototype.gridCreated = function () {
        var _this = this;
        // I want to be able to override this, so you could add/do more with datasource before displaying results
        this.raiseEvent('sortIconUpdate');
        this.controller.updateHeights();
        setTimeout(function () {
            _this.controller.updateHeaderGrouping(_this.datasource.getGrouping());
            _this.raiseEvent('sortIconUpdate');
            _this.raiseEvent('filterUpdateValues');
            _this.controller.triggerScroll(_this.initTop);
            setTimeout(function () {
                // display it so we dont haveto see lags if grouping etc is set
                _this.controller.element.style.visibility = 'visible';
            }, 100);
        }, 0);
    };
    /**
     * Grid will use this to select in datasource
     * Need be in custom gridConnector
     *
     */
    GridConnector.prototype.select = function (row) {
        this.datasource.select(row);
    };
    /**
     * Used by rowScroll events class and htmlheights class to get data needed for variable row height
     * Need be in custom gridConnector //Todo, check if it exsist in gridcode, so its not mandatory
     *
     */
    GridConnector.prototype.getRowHeightState = function () {
        return this.datasource.getRowHeightState();
    };
    /**
     * Grid will use this to know what size the body needs to be
     * Is called a lot, so never call a remote for this data when grid needs it
     * Need be in custom gridConnector
     *
     */
    GridConnector.prototype.getDatasourceLength = function () {
        return this.datasource.length();
    };
    /**
     * Can be used for getting column config inside grid
     *
     */
    GridConnector.prototype.getColConfig = function () {
        return this.controller.getColumnConfig();
    };
    /**
     * Can be used for setting column config inside grid
     *
     */
    GridConnector.prototype.setColConfig = function (colconfig) {
        this.controller.setColumnConfig(colconfig);
    };
    /**
     * Grid will call this to know if there is any grouping/what grouping is
     * Need be in custom gridConnector //Todo, check if it exsist in gridcode, so its not mandatory
     *
     */
    GridConnector.prototype.getGrouping = function () {
        return this.datasource.getGrouping();
    };
    /**
     * Grid calls to tell it want to group
     * Need be in custom gridConnector //Todo, check if it exsist in gridcode, so its not mandatory
     *
     */
    GridConnector.prototype.group = function (grouping, keepExpanded) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.group(grouping, keepExpanded);
        });
    };
    /**
     * Grid calls to get entity for a row
     * Need be in custom gridConnector
     *
     */
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
    /**
     * Grid calls to tell it want to query
     * Need be in custom gridConnector
     *
     */
    GridConnector.prototype.query = function (a) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.query(a);
        });
    };
    /**
     * Grid calls to tell it want to sort
     * Need be in custom gridConnector
     *
     */
    GridConnector.prototype.orderBy = function (attribute, addToCurrentSort) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.orderBy(attribute, addToCurrentSort);
        });
    };
    /**
     * used to cut connection between gridConnector and datasource
     * TODO: do I even use this/need this?
     *
     */
    GridConnector.prototype.destroy = function () {
        this.datasource.removeEventListener(this.eventID);
    };
    /**
     * Grid calls to tell it want to know the current sort order
     * Need be in custom gridConnector
     *
     */
    GridConnector.prototype.getCurrentOrderBy = function () {
        return this.datasource.getCurrentOrderBy();
    };
    /**
     * Grid calls to tell it want to know the current filter
     * Need be in custom gridConnector
     *
     */
    GridConnector.prototype.getCurrentFilter = function () {
        return this.datasource.getCurrentFilter();
    };
    /**
     * Grid calls to tell it want to expand a group/all
     * Need be in custom gridConnector //Todo, check if it exsist in gridcode, so its not mandatory
     *
     */
    GridConnector.prototype.expandGroup = function (id) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.groupExpand(id);
        });
    };
    /**
     * Grid calls to tell it want to collapse a group/all
     * Need be in custom gridConnector //Todo, check if it exsist in gridcode, so its not mandatory
     *
     */
    GridConnector.prototype.collapseGroup = function (id) {
        var _this = this;
        this.controller.setLoadingScreen(true, null, this.getDatasourceLength()).then(function () {
            _this.datasource.groupCollapse(id);
        });
    };
    /**
     * Can be used to get current scrolltop
     * Use this with setInitTop if you want to go between master/detail and have same rows displayed
     *
     */
    GridConnector.prototype.getTopRow = function () {
        return this.controller.getTopRow();
    };
    /**
     * Forces grid to try and update language
     *
     */
    GridConnector.prototype.triggerI18n = function () {
        this.controller.triggerI18N();
    };
    /**
     * Raise event on the grid element, usefull for overriding default behavior
     * TODO: I really dont want much of this, at own expense
     *
     */
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
    /**
     * Listen for the events from datasource, and calls needed functions
     * TODO: look over all event names and rename a few
     *
     */
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
                // nothing atm
                break;
            default:
                console.warn('unknown event');
                console.warn(event);
        }
        return true;
    };
    /**
     * Just used to get data for tempRef, cant use javascript refrense here
     *
     */
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

"use strict";
var selection_1 = require("./selection");
var collection_1 = require("./collection");
var arrayUtils_1 = require("./utils/arrayUtils");
var DataSource = (function () {
    /**
     * Creates an instance of DataSource.
     *
     */
    function DataSource(selection, config) {
        // Set selection or create new if none is passed in
        this.selection = selection || new selection_1.Selection('single');
        this.selectionEventID = this.selection.addEventListener(this.selectionEventCallback.bind(this));
        // overide selection get row/key from row
        // why not in selection ? because I might need rowbased selection only
        this.selection.overrideGetRowKey(this.getRowKey.bind(this));
        this.selection.overrideGetRowKeys(this.getRowKeys.bind(this));
        // array helper helps with grouping/sorting and filtering
        this.arrayUtils = new arrayUtils_1.ArrayUtils();
        // key if you dont want grid to add
        this.key = null;
        // main array fill contain all the data set to grid
        this.mainArray = null;
        // configuration
        this.config = config;
        if (config) {
            this.key = config.key || '__avgKey';
            this.rowHeight = config.rowHeight || 25;
            this.groupHeight = config.groupHeight || 25;
        }
        else {
            this.key = '__avgKey';
        }
        // todo, give option to override ArrayUtils, 
        // or and option to set params you pass into array helper to override some of its functionality
        // events, gridConnector will add event lister to datasource set to it
        this.eventIdCount = -1;
        this.eventCallBacks = [];
        // current entity, this is what users need to link inputs etc too
        this.entity = null;
        // create a collection
        this.collection = new collection_1.Collection(this);
    }
    /**
     * Returns the current selection class
     *
     */
    DataSource.prototype.getSelection = function () {
        return this.selection;
    };
    /**
     * Returns keys name used for selection/added to each entity
     *
     */
    DataSource.prototype.getKey = function () {
        return this.key;
    };
    /**
     * returns the numbers of rows in displayed view (inludes groupings etc)
     *
     */
    DataSource.prototype.length = function () {
        return this.collection.length;
    };
    /**
     * Sends event string to all listeners
     *
     */
    DataSource.prototype.triggerEvent = function (event) {
        var _this = this;
        // call all event listeners
        this.eventCallBacks.forEach(function (FN, i) {
            if (FN !== null) {
                var alive = FN(event);
                if (!alive) {
                    // todo: remove these after
                    _this.eventCallBacks[i] = null;
                }
            }
        });
    };
    /**
     * Adds functions to callback array, this will be called when collection/selection event happens
     *
     */
    DataSource.prototype.addEventListener = function (callback) {
        // add key
        this.eventIdCount++;
        // add to callback queue
        this.eventCallBacks.push(callback);
        // return ID, so they can remove listnener
        return this.eventIdCount;
    };
    /**
     * removes event listener
     *
     */
    DataSource.prototype.removeEventListener = function (id) {
        // remove listtener from id
        this.eventCallBacks.splice(id, 1);
    };
    /**
     * Replaces internal collection and clear internal selection/sorting and grouping
     *
     */
    DataSource.prototype.setArray = function (array) {
        // new collection
        this.collection = new collection_1.Collection(this);
        // clear stuff set in ArrayUtils
        this.selection.reset();
        this.arrayUtils.resetGrouping();
        // use the default key as sort
        // this way first query returns result in same order as put into the datasource
        this.arrayUtils.resetSort(this.key);
        // reset current entity
        this.entity = null;
        // set data to collection
        this.collection.setData(array);
        // set our main collection, we will use this for later
        this.mainArray = this.collection.getEntities();
        this.triggerEvent('collection_changed');
    };
    /**
     * Adds to internal/displayed collection and reruns sort and grouping
     *
     */
    DataSource.prototype.push = function (array) {
        if (Array.isArray(array)) {
            // get current grouping and collection
            var grouping = this.arrayUtils.getGrouping();
            var collection = this.collection.getEntities();
            // add to the collection, set that data back so keys get added
            collection = collection.concat(array);
            this.collection.setData(collection);
            //  get main data for later (when filtering etc)
            this.mainArray = this.collection.getEntities();
            // run orderby, and regroup if there is any
            this.arrayUtils.runOrderbyOn(this.collection.getEntities());
            var untouchedgrouped = this.collection.getEntities();
            if (grouping.length > 0) {
                var groupedArray = this.arrayUtils.group(untouchedgrouped, grouping, true);
                this.collection.setData(groupedArray, untouchedgrouped);
            }
            // trigger grid so it updated view
            this.triggerEvent('collection_updated');
        }
    };
    /**
     * Replace collection if array is passed in and rerun sort and groupings
     * If no data is added it just reruns sorting and grouping
     * TODO: do we want to also rerun filter if any?
     *
     */
    DataSource.prototype.refresh = function (data) {
        if (data) {
            // if data create new collection and set data to it
            this.collection = new collection_1.Collection(this);
            this.collection.setData(data);
            //  get main data for later (when filtering etc), then clear current entity
            this.mainArray = this.collection.getEntities();
            this.entity = null;
        }
        // get current grouping, run orderby, if grouping we also run that
        var grouping = this.arrayUtils.getGrouping();
        this.arrayUtils.runOrderbyOn(this.collection.getEntities());
        if (grouping.length > 0) {
            var unGroupedArray = this.collection.getEntities();
            var groupedArray = this.arrayUtils.group(unGroupedArray, grouping, true);
            this.collection.setData(groupedArray, unGroupedArray);
        }
        // trigger grid so it updates view
        this.triggerEvent('collection_updated');
    };
    /**
     * Sets row passed in as current entity
     *
     */
    DataSource.prototype.select = function (row) {
        // get row and set as current entity "entity" of datasource
        this.entity = this.collection.getRow(row);
    };
    /**
     * Queries all entities with paramas passed in
     *
     */
    DataSource.prototype.query = function (options) {
        if (options) {
            // query data (using main here, so we query all data set)
            var newArray = this.arrayUtils.query(this.mainArray, options);
            // set data to our collection
            this.collection.setData(newArray);
        }
        else {
            // no query passed in we display all
            this.collection.setData(this.mainArray);
        }
        // run orderby (that will fix grouping if set)
        this.orderBy(null, true);
        // trigger event so grid updates
        this.triggerEvent('collection_filtered');
    };
    /**
     * Sorts the array with params passed in
     *
     */
    DataSource.prototype.orderBy = function (attribute, addToCurrentSort) {
        // get collection (cant use main,,, might be filtered)
        var collection = this.collection.getEntities();
        // use array helper to sort (takes care of the grouping if set)
        var result = this.arrayUtils.orderBy(collection, attribute, addToCurrentSort);
        // set data, need both incase we have grouping
        this.collection.setData(result.fixed, result.full);
        // trigger event to update grid
        this.triggerEvent('collection_sorted');
    };
    /**
     * returns current orderBy used
     *
     */
    DataSource.prototype.getCurrentOrderBy = function () {
        return this.arrayUtils.getOrderBy();
    };
    /**
     * Returns current filter used
     *
     */
    DataSource.prototype.getCurrentFilter = function () {
        return this.arrayUtils.getCurrentFilter();
    };
    /**
     * Returns current element of row passed in
     *
     */
    DataSource.prototype.getElement = function (row) {
        if (row === undefined || row === null) {
            throw new Error('row missing');
        }
        else {
            return this.collection.getRow(row);
        }
    };
    /**
     * Groups the collection with params passed in
     *
     */
    DataSource.prototype.group = function (grouping, keepExpanded) {
        var _this = this;
        // resets current sortclass
        this.arrayUtils.resetSort();
        // set new sort by grouping
        grouping.forEach(function (group) {
            _this.arrayUtils.setOrderBy(group.field, true);
        });
        // run sort on displayedCollection
        this.arrayUtils.runOrderbyOn(this.collection.getEntities());
        // get ungrouped collection
        var ungroupedArray = this.collection.getEntities();
        // group array
        var groupedArray = this.arrayUtils.group(ungroupedArray, grouping, keepExpanded);
        // set grouped array to collection
        this.collection.setData(groupedArray, ungroupedArray);
        // trigger grid to updated view
        this.triggerEvent('collection_grouped');
    };
    /**
     * Collapses all groups or just ID passes in
     *
     */
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
    /**
     * Expands all groups or just ID passed in
     *
     */
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
    /**
     * Returns grouping used
     *
     */
    DataSource.prototype.getGrouping = function () {
        return this.arrayUtils.getGrouping();
    };
    /**
     * Adds blank row to top of diaplayed colelction and updates grid
     * Todo: custom key will prb break this... need more testing
     *
     */
    DataSource.prototype.addBlankRow = function () {
        // create empty object
        var newElement = {};
        // add to our main array
        this.mainArray.unshift(newElement);
        // get the ungrouped array in collection
        var collectionUngrouped = this.collection.getEntities();
        // get displayed collection
        var displayedCollection = this.collection.getCurrentEntities();
        // if it does not exsist in old array we skip, else we add
        var index = collectionUngrouped.indexOf(newElement);
        if (index === -1) {
            collectionUngrouped.unshift(newElement);
        }
        // add to displayed collection
        displayedCollection.unshift(newElement);
        // set back data to collection
        this.collection.setData(displayedCollection, collectionUngrouped);
        // set blank as current entity
        this.entity = newElement;
        // trigger grid to update
        this.triggerEvent('collection_filtered');
    };
    /**
     * Added new enity to top of grid, no sorting or grouping after
     *
     */
    DataSource.prototype.unshift = function (data) {
        if (data) {
            // add to main array
            this.mainArray.unshift(data);
            // get the ungrouped array in collection
            var displayedCollection = this.collection.getEntities();
            // get displayed collection
            var ungroupedCollection = this.collection.getCurrentEntities();
            // if it does not exsist in old array we skip, else we add
            var index = displayedCollection.indexOf(data);
            if (index === -1) {
                displayedCollection.unshift(data);
            }
            // add to displayed collection
            ungroupedCollection.unshift(data);
            // set back data to collection
            this.collection.setData(ungroupedCollection, displayedCollection);
            // set as current entity
            this.entity = data;
            // trigger grid update
            this.triggerEvent('collection_filtered');
        }
    };
    /**
     * Removed rows from displayed collection and returns removed
     *
     */
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
    /**
     * Returns status(lengths) of collection/selection
     *
     */
    DataSource.prototype.getCollectionStatus = function () {
        var status = {};
        status.collectionLength = this.mainArray ? this.mainArray.length : 0;
        status.filteredCollectionLength = this.collection.getEntities().length;
        status.selectionLength = this.selection.getLength();
        return status;
    };
    /**
     * Sets local compare options to use with sorting
     * http://stackoverflow.com/questions/3191664/list-of-all-locales-and-their-short-codes
     *
     */
    DataSource.prototype.setLocaleCompare = function (code, options) {
        this.arrayUtils.setLocaleCompare(code, options);
    };
    /**
     * Returns row heigth state for vaiable row height, will be called by gridConnector
     *
     */
    DataSource.prototype.getRowHeightState = function () {
        return this.collection.getRowHeightState();
    };
    /**
     * Returns key of row passed in from displayedCollection
     *
     */
    DataSource.prototype.getRowKey = function (row) {
        // if collection, then get row key
        if (this.collection) {
            return this.collection.getRowKey(row);
        }
        else {
            return null;
        }
    };
    /**
     * Returns all keys of collection
     *
     */
    DataSource.prototype.getRowKeys = function () {
        // if collection then get the keys
        if (this.collection) {
            return this.collection.getRowKeys();
        }
        else {
            return [];
        }
    };
    /**
     * Calls the triggere event with event from selection
     *
     */
    DataSource.prototype.selectionEventCallback = function (e) {
        this.triggerEvent(e);
        return true;
    };
    return DataSource;
}());
exports.DataSource = DataSource;

});
___scope___.file("selection.js", function(exports, require, module, __filename, __dirname){ 

"use strict";
var Selection = (function () {
    function Selection(mode) {
        this.mode = mode;
        this.selectedRows = 0;
        this.eventIdCount = -1;
        this.eventCallBacks = [];
        this.selection = new Set([]);
    }
    /**
     * Triggers event and calls listeners
     *
     */
    Selection.prototype.triggerEvent = function (event) {
        var _this = this;
        // call all event listeners
        this.eventCallBacks.forEach(function (FN, i) {
            if (FN !== null) {
                var alive = FN(event);
                if (!alive) {
                    // todo: remove these after
                    _this.eventCallBacks[i] = null;
                }
            }
        });
    };
    /**
     * add event to the selection changes
     *
     */
    Selection.prototype.addEventListener = function (callback) {
        // add key
        this.eventIdCount++;
        // add to callback queue
        this.eventCallBacks.push(callback);
        // return ID, so they can remove listnener
        return this.eventIdCount;
    };
    /**
     * returns selection size/length
     *
     */
    Selection.prototype.getLength = function () {
        return this.selection.size;
    };
    /**
     * returns selection ode
     *
     */
    Selection.prototype.getMode = function () {
        return this.mode;
    };
    /**
     * returns key of row
     * overridden by default dataosurce to return keys from collection
     * make private?
     *
     */
    Selection.prototype.getRowKey = function (row) {
        return row;
    };
    /**
     * retunrs all keys in selection
     * overridden by default datasource to return its collection keys
     * make private?
     *
     */
    Selection.prototype.getRowKeys = function () {
        return [];
    };
    /**
     * function to override
     *
     */
    Selection.prototype.overrideGetRowKey = function (fn) {
        this.getRowKey = fn;
    };
    /**
     * function to override getRowKeys
     *
     */
    Selection.prototype.overrideGetRowKeys = function (fn) {
        this.getRowKeys = fn;
    };
    /**
     * tells if row is selected true/false
     *
     */
    Selection.prototype.isSelected = function (row) {
        var result = false;
        if (this.selectedRows > 0) {
            result = this.selection.has(this.getRowKey(row));
        }
        return result;
    };
    /**
     * deselcts all rows
     *
     */
    Selection.prototype.deSelectAll = function () {
        this.selection.clear();
        this.selectedRows = this.selection.size;
        this.triggerEvent('selection_changed');
    };
    /**
     * deselct row passed in
     *
     */
    Selection.prototype.deSelect = function (row) {
        this.selection["delete"](this.getRowKey(row));
        this.selectedRows = this.selection.size;
        this.triggerEvent('selection_changed');
    };
    /**
     * select 1 or adds to selection
     *
     */
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
    /**
     * selects range of rows
     *
     */
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
    /**
     * retuns selected rows
     *
     */
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
    /**
     * sets new selection/selected rows
     * do we want to have a add params here
     *
     */
    Selection.prototype.setSelectedRows = function (newRows) {
        if (this.selectedRows > 0) {
            this.selection.clear();
        }
        // tslint:disable-next-line:prefer-for-of
        for (var i = 0; i < newRows.length; i++) {
            this.selection.add(this.getRowKey(newRows[i]));
        }
        this.selectedRows = this.selection.size;
        this.triggerEvent('selection_changed');
    };
    /**
     * resets selection to 0
     * its pretty much same as deselect all, remove one ?
     *
     */
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

"use strict";
var Collection = (function () {
    /**
     * Creates an instance of Collection.
     *
     */
    function Collection(datasource) {
        this.datasource = datasource;
        this.key = datasource.getKey();
        // get rowHeight if any
        this.rowHeight = datasource.rowHeight || 25;
        // get groupHeight if any 
        this.groupHeight = datasource.groupHeight || 25;
        // some defaults
        // this contains the displayed including groups
        this.displayedEntities = [];
        // all keys in displayed
        this.keys = [];
        // count for setting unique keys, using numbers since I use it do keep entities sorted in inserted order
        this.count = 0;
        // total length of displayed
        this.length = 0;
        // this is the ungrouped array (all entities of displayed except the groups)
        // this is used when grouping the displayed
        this.ungroupedArray = [];
        // next 3 is variable for setting the correct top etc when using variable row height
        this.rowHeightArray = [];
        this.rowTopArray = [];
        this.rowHeightTotal = 0;
    }
    /**
     * Sets data to the collection
     *
     */
    Collection.prototype.setData = function (array, ungroupedArray) {
        var _this = this;
        // clear defaults so they can be set correctly again
        this.displayedEntities = [];
        this.keys = [];
        this.rowHeightArray = [];
        this.rowHeightTotal = 0;
        this.rowTopArray = [];
        // need a ungrouped collection, so we can use that forward when needing to sort, regroup etc
        this.ungroupedArray = ungroupedArray || array;
        // get length;
        this.length = array.length;
        // create entities
        array.forEach(function (rowData) {
            // if entity does not have key we add one, need this for selection
            if (!rowData[_this.key]) {
                _this.count++;
                rowData[_this.key] = _this.count;
            }
            // if entity is not group we set the keys to our internal key array, if not we set null
            if (!rowData.__group) {
                // for vairble row height we need to set some defaults the grid can use when scrolling
                _this.rowHeightArray.push(_this.rowHeight);
                _this.rowTopArray.push(_this.rowHeightTotal);
                _this.rowHeightTotal = _this.rowHeightTotal + _this.rowHeight;
                // push the key we need for selection
                _this.keys.push(rowData[_this.key]);
            }
            else {
                // for vairble row height we need to set some defaults the grid can use when scrolling
                _this.rowHeightArray.push(_this.groupHeight);
                _this.rowTopArray.push(_this.rowHeightTotal);
                _this.rowHeightTotal = _this.rowHeightTotal + _this.groupHeight;
                // set null on groups, we dont want that in selection
                _this.keys.push(null);
            }
            // we now set the entity data into our displayed entities
            _this.displayedEntities.push(rowData);
        });
    };
    /**
     * Returns rowheigth state, will be needed by the grid code when using varaible row height
     *
     */
    Collection.prototype.getRowHeightState = function () {
        return {
            total: this.rowHeightTotal,
            rows: this.rowHeightArray,
            top: this.rowTopArray
        };
    };
    /**
     * Returns the ungrouped array of displayed collection
     *
     */
    Collection.prototype.getEntities = function () {
        return this.ungroupedArray;
    };
    /**
     * Returns array displayed in collection, including groups
     *
     */
    Collection.prototype.getCurrentEntities = function () {
        return this.displayedEntities;
    };
    /**
     * Returns key of row number passed in
     *
     */
    Collection.prototype.getRowKey = function (row) {
        return this.keys[row];
    };
    /**
     * Returns all keys in displayed collection
     *
     */
    Collection.prototype.getRowKeys = function () {
        return this.keys;
    };
    /**
     * Returns entity of rows in displayed collection
     *
     */
    Collection.prototype.getRow = function (row) {
        return this.displayedEntities[row];
    };
    /**
     * Return row number of entity passed in as param
     *
     */
    Collection.prototype.getRowFromEntity = function (entity) {
        return this.displayedEntities.indexOf(entity);
    };
    return Collection;
}());
exports.Collection = Collection;

});
___scope___.file("utils/arrayUtils.js", function(exports, require, module, __filename, __dirname){ 

"use strict";
var arrayFilter_1 = require("./arrayFilter");
var arraySort_1 = require("./arraySort");
var arrayGrouping_1 = require("./arrayGrouping");
/**
 * Helper class for calling internal sort, filter and grouping classes
 *
 */
var ArrayUtils = (function () {
    function ArrayUtils() {
        this.arrayFilter = new arrayFilter_1.ArrayFilter();
        this.arraySort = new arraySort_1.ArraySort();
        this.arrayGrouping = new arrayGrouping_1.ArrayGrouping();
    }
    /**
     * orderby that also fixes grouping if set before
     *
     */
    ArrayUtils.prototype.orderBy = function (collection, attribute, addToCurrentSort) {
        var groupingFields = this.getGrouping().map(function (data) { return data.field; });
        var grouping = this.getGrouping();
        var result = {
            fixed: null,
            full: null
        };
        if (groupingFields.length > 0) {
            // get last sort
            var lastSort = this.getOrderBy();
            // reset sort
            this.resetSort();
            // loop
            var exist_1 = false;
            // if not adding, create new sort array
            var newSort_1 = [];
            var count_1 = 0;
            // loop existing
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
            // set last sort
            this.setLastSort(newSort_1);
            // if it does not exist, then add
            if (!exist_1 && attribute) {
                this.setOrderBy(attribute, true);
            }
            // run orderby
            this.runOrderbyOn(collection);
            // regroup
            var groupedArray = this.group(collection, grouping, true);
            // set result
            result = {
                fixed: groupedArray,
                full: collection
            };
        }
        else {
            if (!attribute) {
                // no attribute, just reset last sort...
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
    /**
     * calls the group class group function
     *
     */
    ArrayUtils.prototype.group = function (array, grouping, keepExpanded) {
        return this.arrayGrouping.group(array, grouping, keepExpanded);
    };
    /**
     * returns current grouping
     *
     */
    ArrayUtils.prototype.getGrouping = function () {
        return this.arrayGrouping.getGrouping();
    };
    /**
     * collapses 1 or all
     *
     */
    ArrayUtils.prototype.groupCollapse = function (id) {
        return this.arrayGrouping.collapse(id);
    };
    /**
     * expands 1 or all
     *
     */
    ArrayUtils.prototype.groupExpand = function (id) {
        return this.arrayGrouping.expand(id);
    };
    /**
     * return current orderby used/set
     *
     */
    ArrayUtils.prototype.getOrderBy = function () {
        return this.arraySort.getOrderBy();
    };
    /**
     * sets last sort used
     *
     */
    ArrayUtils.prototype.setLastSort = function (array) {
        this.arraySort.setLastSort(array);
    };
    /**
     * sets new orderby that will be next time
     *
     */
    ArrayUtils.prototype.setOrderBy = function (attribute, addToCurrentSort) {
        this.arraySort.setOrderBy(attribute, addToCurrentSort);
    };
    /**
     * reuns orderby on array passed in
     *
     */
    ArrayUtils.prototype.runOrderbyOn = function (array) {
        this.arraySort.runOrderbyOn(array);
    };
    /**
     * sesets sorting to nothing
     *
     */
    ArrayUtils.prototype.resetSort = function (defaultSortAttribute) {
        this.arraySort.reset(defaultSortAttribute);
    };
    /**
     * resets grouping
     *
     */
    ArrayUtils.prototype.resetGrouping = function () {
        this.arrayGrouping.reset();
    };
    /**
     * returns current filter
     *
     */
    ArrayUtils.prototype.getCurrentFilter = function () {
        return this.arrayFilter.getLastFilter();
    };
    /**
     * queries and returns new array
     *
     */
    ArrayUtils.prototype.query = function (array, params) {
        return this.arrayFilter.runQueryOn(array, params);
    };
    /**
     * sets local compare needed to sort language like german and norwegian
     * Needed since you might need local sorting on browser/os set to english local
     *
     */
    ArrayUtils.prototype.setLocaleCompare = function (code, options) {
        this.arraySort.setLocaleCompare(code, options);
    };
    return ArrayUtils;
}());
exports.ArrayUtils = ArrayUtils;

});
___scope___.file("utils/arrayFilter.js", function(exports, require, module, __filename, __dirname){ 

"use strict";
/**
 * filters the array
 *
 */
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
            '=*': 10 // end with
        };
        this.lastFilter = [];
    }
    /**
     * gets operator number from class
     *
     */
    ArrayFilter.prototype.getOperatorNo = function (val) {
        return this.filterOperators[val];
    };
    /**
     * returns last filter set
     *
     */
    ArrayFilter.prototype.getLastFilter = function () {
        return this.lastFilter;
    };
    /**
     * runs query on the array
     *
     */
    ArrayFilter.prototype.runQueryOn = function (objArray, ObjFilter) {
        var _this = this;
        this.lastFilter = ObjFilter;
        var resultArray = objArray.filter(function (data) {
            // lets have true as default, so all that should not be there we set false..
            var result = true;
            ObjFilter.forEach(function (x) {
                // vars
                var rowValue;
                var filterValue;
                var filterOperator = _this.getOperatorNo(x.operator);
                var newFilterOperator;
                // helper for boolean
                var typeBool = {
                    "true": true,
                    "false": false
                };
                // set defult type
                var type;
                try {
                    type = typeof (data[x.attribute]);
                }
                catch (e) {
                    type = 'string';
                }
                // lets set som defaults
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
                        // todo: add more options here and replace with a switch.., also
                        // if filter operator is BEGIN WITH
                        if (x.value.charAt(0) === '*' && filterOperator === 9) {
                            newFilterOperator = 6;
                            filterValue = filterValue.substr(1, filterValue.length);
                        }
                        // if filter operator is EQUAL TO
                        // wildcard first = end with
                        if (x.value.charAt(0) === '*' && filterOperator === 1) {
                            newFilterOperator = 10;
                            filterValue = filterValue.substr(1, filterValue.length);
                        }
                        // wildcard end and first = contains
                        if (x.value.charAt(x.value.length - 1) === '*' && filterOperator === 1 && newFilterOperator === 10) {
                            newFilterOperator = 6;
                            filterValue = filterValue.substr(0, filterValue.length - 1);
                        }
                        // begin with since wildcard is in the end
                        if (x.value.charAt(x.value.length - 1) === '*'
                            && filterOperator === 1
                            && newFilterOperator !== 10
                            && newFilterOperator !== 6) {
                            newFilterOperator = 9;
                            filterValue = filterValue.substr(0, filterValue.length - 1);
                        }
                        // set the filteroperator from new if changed
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
                        filterValue = new Date(x.value).toISOString(); // todo, this needs to be better...
                        filterOperator = filterOperator || 2;
                        break;
                    default:
                        // todo: take the stuff under equal to and put in a function 
                        // and also call i from here.. or just make it fail?
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
                // filter from what operator used
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
            }); // end foreach obj
            return result;
        });
        return resultArray;
    };
    return ArrayFilter;
}());
exports.ArrayFilter = ArrayFilter;

});
___scope___.file("utils/arraySort.js", function(exports, require, module, __filename, __dirname){ 

"use strict";
/**
 * This does all the sorting on the array passed in
 * Used by default datasource
 *
 */
var ArraySort = (function () {
    function ArraySort() {
        this.lastSort = [];
        this.curSort = [];
        this.localeCompareCode = null;
        this.localeCompareOptions = { sensitivity: 'base' };
    }
    /**
     * Sets localCompare
     *
     */
    ArraySort.prototype.setLocaleCompare = function (code, options) {
        this.localeCompareCode = code ? code : null;
        this.localeCompareOptions = options ? options : { sensitivity: 'base' };
    };
    /**
     * Resets sort
     * if attribute is passed it sets that as default, this way first filter wont be messed up
     *
     */
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
    /**
     * Sets last sort
     * todo: why do I have this?
     *
     */
    ArraySort.prototype.setLastSort = function (array) {
        this.lastSort = array;
        this.curSort = array;
    };
    /**
     * Sets the sort order to be used next sort Runs
     * any = string
     *
     */
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
        // do we add or is it the first one
        if (add && this.lastSort.length > 0) {
            // its adding, so lets get last one
            this.curSort = this.lastSort;
            var exist_1 = false;
            // loop to se if it exist from before
            this.curSort.forEach(function (x) {
                if (!useSetValue) {
                    if (x.attribute === sort.attribute) {
                        exist_1 = true;
                        x.asc = x.asc === true ? false : true;
                    }
                }
            });
            // if it dont exist we add it, else there isnt anythin else to do for now
            if (!exist_1) {
                this.curSort.push(sort);
                this.curSort[this.curSort.length - 1].no = this.curSort.length;
            }
            this.lastSort = this.curSort;
        }
        else {
            // if not adding, just set it
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
    /**
     * Returns current sort by
     *
     */
    ArraySort.prototype.getOrderBy = function () {
        return this.curSort;
    };
    /**
     * Get value from deeper inside the object, this will need a lot more work, and filter does not support it
     *
     */
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
    /**
     *  Runs sort on array passed in with params set earlier
     *
     */
    ArraySort.prototype.runOrderbyOn = function (array) {
        var _this = this;
        // super simple for now.. atleast I have som form for sort
        var thisSort = this.getOrderBy();
        // this is mix from different sources... from what I can tell it works now
        array.sort(function (obj1, obj2) {
            var result = 0;
            for (var i = 0; i < thisSort.length && result === 0; ++i) {
                // loop until all are sorted
                var currentObj = thisSort[i];
                var v1 = _this.getValue(currentObj.attribute, obj1);
                var v2 = _this.getValue(currentObj.attribute, obj2);
                // compares with locale
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
                        // ASC
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
        // set current sort as last sort that was used
        this.lastSort = this.getOrderBy().slice(0);
    };
    return ArraySort;
}());
exports.ArraySort = ArraySort;

});
___scope___.file("utils/arrayGrouping.js", function(exports, require, module, __filename, __dirname){ 

"use strict";
/**
 * This takes care the generating the flat array the grid can use for grouping
 *
 */
var ArrayGrouping = (function () {
    function ArrayGrouping() {
        this.grouping = [];
        this.expanded = new Set([]);
    }
    /**
     * todo description
     *
     */
    ArrayGrouping.prototype.reset = function () {
        this.groups = [];
        this.grouping = [];
        this.expanded = new Set([]);
    };
    /**
     * todo description
     *
     */
    ArrayGrouping.prototype.group = function (arrayToGroup, grouping, keepExpanded) {
        var _this = this;
        // if grouping
        if (grouping.length > 0) {
            // temp holder for groups as we create them
            if (!keepExpanded) {
                this.expanded = new Set([]);
            }
            // variable to hold our groups
            var groups_1 = [];
            grouping.forEach(function (groupBy, groupNo) {
                if (groupNo === 0) {
                    // create main group and add to groups array
                    var mainGroup = _this.groupMain(arrayToGroup, groupBy.field, groupNo);
                    groups_1.push(mainGroup);
                }
                else {
                    // get last group created, and group children
                    var childGroupArray = groups_1[groups_1.length - 1];
                    var newSubGroup = _this.groupChildren(childGroupArray, groupBy.field, groupNo);
                    groups_1.push(newSubGroup);
                }
            });
            // set to our class wo we have it for later
            this.groups = groups_1;
            // set to clas so we can get it later
            this.grouping = grouping;
            // do we want what was expanded still to be expanded, if so just return firts grouping
            if (!keepExpanded) {
                return groups_1[0];
            }
            else {
                return this.expand(null, this.expanded);
            }
        }
        else {
            // set all rows to 0 grouping
            arrayToGroup.forEach(function (row) {
                row.__groupLvl = 0;
            });
            // clear prev grouping
            this.grouping = [];
            return arrayToGroup;
        }
    };
    /**
     * returns current grouping
     *
     */
    ArrayGrouping.prototype.getGrouping = function () {
        return this.grouping;
    };
    /**
     * expands 1 group by id passed or all groups if no params
     *
     */
    ArrayGrouping.prototype.expand = function (id, array) {
        var _this = this;
        var all = id ? false : true; // if no id, then all
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
        // lopp children
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
                        // need anything here ?
                        break;
                }
            });
        };
        // loop main groups
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
                    // need anything here ?
                    break;
            }
        });
        return collection;
    };
    /**
     * collapses 1 by id or all if no params is passed
     *
     */
    ArrayGrouping.prototype.collapse = function (id) {
        var _this = this;
        var all = id ? false : true; // if no id, then all
        id = id === undefined ? null : id;
        var subGroup;
        var collection = [];
        var mainGroups = this.groups[0];
        // lopp children
        subGroup = function (g) {
            g.__groupChildren.forEach(function (sg) {
                switch (true) {
                    case all:
                        if (sg.__groupChildren) {
                            sg.__groupExpanded = false;
                            _this.expanded["delete"](sg.__groupID);
                            subGroup(sg);
                        }
                        break;
                    case sg.__groupID === id:
                        collection.push(sg);
                        _this.expanded["delete"](sg.__groupID);
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
        // loop main groups
        mainGroups.forEach(function (g) {
            collection.push(g);
            switch (true) {
                case all:
                    g.__groupExpanded = false;
                    _this.expanded["delete"](g.__groupID);
                    if (g.__groupChildren) {
                        subGroup(g);
                    }
                    break;
                case g.__groupID === id:
                    g.__groupExpanded = false;
                    _this.expanded["delete"](g.__groupID);
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
    /**
     * creates main grouping
     *
     */
    ArrayGrouping.prototype.groupMain = function (array, groupBy, groupNo) {
        var tempGroupArray = [];
        var curGroup = {};
        var tempValue = null;
        // first level, here we use array
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
    /**
     * loops the children of parant and creates grouping, then loops the cridren of that etc
     *
     */
    ArrayGrouping.prototype.groupChildren = function (childGroupArray, groupBy, groupNo) {
        var tempGroupArray = [];
        var curGroup = {};
        // loop groups
        childGroupArray.forEach(function (element) {
            var tempValue = null;
            // loop children
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
            // replace children with new groups
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
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
// todo: look at adding option to disable this ?
/**
 * Custom attribute "v-onchange"
 * Only triggers new data update on row when change event happen
 * Used by default by the simple html setup
 * Can be used with custom html
 *
 */
var VGridAttributesOnChange = (function () {
    function VGridAttributesOnChange(element, vGrid) {
        this.element = element;
        this.vGrid = vGrid;
    }
    /**
     * todo description
     *
     */
    VGridAttributesOnChange.prototype.attached = function () {
        if (!this.element.onchange) {
            this.element.onchange = this.onChanged.bind(this);
        }
    };
    /**
     * todo description
     *
     */
    VGridAttributesOnChange.prototype.onChanged = function () {
        this.vGrid.controller.rowDataBinder.rebindRowNo(this.bindingContext.row);
    };
    /**
     * todo description
     *
     */
    VGridAttributesOnChange.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
    };
    return VGridAttributesOnChange;
}());
VGridAttributesOnChange = __decorate([
    aurelia_framework_1.customAttribute('v-onchange'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid)
], VGridAttributesOnChange);
exports.VGridAttributesOnChange = VGridAttributesOnChange;

});
___scope___.file("grid/attributes/v-data-handler.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
// todo: look at adding option to disable this ?
/**
 * Custom attribute "v-onchange"
 * Only triggers new data update on row when change event happen
 * Used by default by the simple html setup
 * Can be used with custom html
 *
 */
var VGridAttributesDataHandler = (function () {
    function VGridAttributesDataHandler(element, vGrid) {
        this.isSet = false;
        this.element = element;
        this.vGrid = vGrid;
    }
    /**
     * todo description
     *
     */
    VGridAttributesDataHandler.prototype.attached = function () {
        this.element.onchange = this.onChanged.bind(this);
        this.element.onfocus = this.onFocus.bind(this);
        this.element.onblur = this.onBlur.bind(this);
    };
    /**
     * value changed handler
     *
     */
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
    /**
     * onfocus event handler
     *
     */
    VGridAttributesDataHandler.prototype.onFocus = function () {
        this.isSet = true;
        this.element.value = this.editFormater.toView(this.value);
        this.tempValue = this.element.value;
    };
    /**
     * onblur event handler
     *
     */
    VGridAttributesDataHandler.prototype.onBlur = function () {
        if (this.tempValue === this.element.value) {
            this.onChanged();
        }
        this.isSet = false;
    };
    /**
     * onchange event handler
     *
     */
    VGridAttributesDataHandler.prototype.onChanged = function () {
        this.value = this.editFormater.fromView(this.element.value);
        this.bindingContext.rowRef[this.field] = this.value;
        this.element.value = this.displayFormater.toView(this.value);
        this.vGrid.controller.rowDataBinder.rebindRowNo(this.bindingContext.row);
    };
    /**
     * when attributes binds, get valueconverters and set value
     *
     */
    VGridAttributesDataHandler.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.displayFormater = this.valueConverters(this.display);
        this.editFormater = this.valueConverters(this.edit);
        this.element.value = this.displayFormater.toView(this.value);
    };
    /**
     * get valueConverters and bind to grid resources
     *
     */
    VGridAttributesDataHandler.prototype.valueConverters = function (value) {
        var valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
        return valueConverter(value);
    };
    return VGridAttributesDataHandler;
}());
__decorate([
    aurelia_framework_1.bindable
], VGridAttributesDataHandler.prototype, "field");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributesDataHandler.prototype, "value");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributesDataHandler.prototype, "display");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributesDataHandler.prototype, "edit");
VGridAttributesDataHandler = __decorate([
    aurelia_framework_1.customAttribute('v-data-handler'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid)
], VGridAttributesDataHandler);
exports.VGridAttributesDataHandler = VGridAttributesDataHandler;

});
___scope___.file("grid/attributes/v-drag-drop-col.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
/**
 * Custom attribute "v-drag-drop-col"
 * Logic behind dragdrop, & enables grouping
 * Used by default by the simple html setup
 * Can be used with custom html
 *
 */
var VGridDragDropCol = (function () {
    function VGridDragDropCol(element, vGrid) {
        // get contexts
        this.vGrid = vGrid;
        this.vGridElement = vGrid.element;
        this.controller = vGrid.controller;
        this.groupingElements = vGrid.groupingElements;
        // get our shared context between our dragdrop attributes, holds data of the dragged one
        this.sharedContext = vGrid.dragDropAttributeSharedContext;
        this.element = element;
        this.column = this.element;
        this.entered = null;
        this.curColNo = null;
    }
    /**
     * todo description
     *
     */
    VGridDragDropCol.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        // set binded context to our functions, wont be able to remove if binded during setting event
        this.onDragstartBinded = this.onDragstart.bind(this);
        this.onDragenterBinded = this.onDragenter.bind(this);
        this.onDragoverBinded = this.onDragover.bind(this);
        this.onDragendBinded = this.onDragend.bind(this);
        this.onDragOutSideBinded = this.onDragOutSide.bind(this);
    };
    /**
     * todo description
     *
     */
    VGridDragDropCol.prototype.unbind = function () {
        // todo remove event listeners
    };
    /**
     * todo description
     *
     */
    VGridDragDropCol.prototype.detached = function () {
        //  console.log("detached")
    };
    /**
     * todo description
     *
     */
    VGridDragDropCol.prototype.attached = function () {
        var _this = this;
        // get our target data (this case: this actual column..)
        var result = this.getTargetData(this.column);
        if (result.ok && !result.panel) {
            // get column data
            this.column = result.target;
            this.colType = this.column.attributes.getNamedItem('avg-type').value;
            this.colNo = parseInt(this.column.attributes.getNamedItem('avg-config-col').value, 10);
            this.context = this.vGrid.columnBindingContext['setup' + this.colType][this.colNo];
            this.columnsArray = this.vGrid.columnBindingContext['setup' + this.colType];
            // when user starts to drag
            this.element.addEventListener('mousedown', this.onDragstartBinded);
            // why target ? bacuse thats the entire column object no mather what user have inside
            result.target.addEventListener('mouseenter', this.onDragenterBinded);
        }
        if (result.ok && result.target.nodeName === 'AVG-TOP-PANEL') {
            // if panel we need to listen and do some stuff differently
            this.isPanel = true;
            this.sharedContext.panel = result.target;
            // if we leave, remve group
            result.target.onmouseleave = function () {
                if (_this.sharedContext.dragging && _this.sharedContext.title && _this.sharedContext.field) {
                    _this.groupingElements.removeGroup('');
                }
            };
            // if enter and dragging, add grouping
            result.target.onmouseenter = function () {
                if (_this.sharedContext.dragging && _this.sharedContext.title && _this.sharedContext.field) {
                    _this.groupingElements.addGroup(_this.sharedContext.title, _this.sharedContext.field);
                    _this.sharedContext.lastTarget = result.target;
                }
            };
            // if mouse up during dragging we grop, if group ios added
            result.target.onmouseup = function () {
                if (_this.sharedContext.dragging && _this.sharedContext.title && _this.sharedContext.field) {
                    _this.groupingElements.addToGrouping();
                }
            };
        }
    };
    /**
     * todo description
     *
     */
    VGridDragDropCol.prototype.createDragElement = function () {
        // just creates the element we drag
        this.dragColumnBlock = document.createElement('div');
        this.dragColumnBlock.classList.add(this.vGrid.attTheme);
        this.dragColumnBlock.classList.add('avg-drag');
        this.dragColumnBlock.style.top = -1200 + 'px'; // hide it
        this.dragColumnBlock.style.left = -1200 + 'px';
        document.body.appendChild(this.dragColumnBlock);
        // <- maybe do something here, use value for custom html?
        this.dragColumnBlock.innerHTML = this.title || this.vGrid.colConfig[this.colNo].colHeaderName;
    };
    /**
     * todo description
     *
     */
    VGridDragDropCol.prototype.onDragstart = function () {
        var _this = this;
        // register mouseup, so we can exit
        document.addEventListener('mouseup', this.onDragendBinded);
        this.vGridElement.addEventListener('mouseleave', this.onDragOutSideBinded);
        this.createDragElement();
        // want to delay this a little
        this.mouseMoveTimer = setTimeout(function () {
            // create our element we drag with upo
            document.addEventListener('mousemove', _this.onDragoverBinded, false);
        }, 300);
        // set our shared resources for all the drag drop so we know them when we enter another
        this.sharedContext.dragging = true;
        this.sharedContext.colType = this.colType;
        this.sharedContext.context = this.context;
        this.sharedContext.colNo = this.colNo;
        this.sharedContext.curColNo = this.colNo;
        this.sharedContext.columnsArray = this.columnsArray;
        this.sharedContext.title = this.title;
        this.sharedContext.field = this.field;
        // build up new array we will use for setting new left
        this.sharedContext.columnsArraySorted = [];
        this.sharedContext.columnsArray.forEach(function (x) {
            _this.sharedContext.columnsArraySorted.push(x);
        });
    };
    /**
     * todo description
     *
     */
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
    /**
     * todo description
     *
     */
    VGridDragDropCol.prototype.onDragenter = function (event) {
        // event.preventDefault();
        if (this.sharedContext.dragging) {
            // get results
            var result = this.getTargetData(event.target);
            // if ok, and AVG-COL
            if (result.target.nodeName === 'AVG-COL' && result.ok && this.sharedContext.lastTarget !== result.target) {
                // set last target
                this.sharedContext.lastTarget = result.target;
                // if fifferent column, and same type (main/left/right) 
                if (result.colNo !== this.sharedContext.colNo && result.colType === this.sharedContext.colType) {
                    // get the left
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
                    // sort columns
                    this.sharedContext.columnsArraySorted.sort(function (a, b) {
                        return a.left - b.left;
                    });
                    // loop and set left/right  
                    var appendValue_1 = 0;
                    this.sharedContext.columnsArraySorted.forEach(function (x) {
                        if (x.show) {
                            x.left = appendValue_1;
                            appendValue_1 = appendValue_1 + x.width;
                        }
                    });
                }
                // if coltype and colno is diffent
                if (result.colNo !== this.sharedContext.colNo && result.colType !== this.sharedContext.colType) {
                    this.switchColumns(result);
                }
            }
        }
    };
    /**
     * todo description
     *
     */
    VGridDragDropCol.prototype.onDragover = function (event) {
        // setting position of out dragBlock
        if (this.dragColumnBlock) {
            this.dragColumnBlock.style.top = event.clientY + 'px';
            this.dragColumnBlock.style.left = event.clientX + 'px';
        }
    };
    /**
     * todo description
     *
     */
    VGridDragDropCol.prototype.onDragend = function () {
        // clear mosuemove timer
        clearTimeout(this.mouseMoveTimer);
        // set dragging to false
        this.sharedContext.dragging = false;
        // remove out listneres
        document.removeEventListener('mouseup', this.onDragendBinded);
        document.removeEventListener('mousemove', this.onDragoverBinded);
        this.vGridElement.removeEventListener('mouseleave', this.onDragOutSideBinded);
        // reset blocks
        this.sharedContext.lastTarget = null;
        // this.sharedContext.group = null;
        // if drag column then remove
        if (this.dragColumnBlock) {
            var parent = this.dragColumnBlock.parentNode;
            if (parent) {
                parent.removeChild(this.dragColumnBlock);
                this.dragColumnBlock = null;
            }
        }
    };
    /**
     * todo description
     *
     */
    VGridDragDropCol.prototype.switchColumns = function (result) {
        var _this = this;
        // get vars 
        var width;
        var newColType = result.colType;
        var oldColType = this.sharedContext.colType;
        var heightAndWidths = this.vGrid.htmlHeightWidth;
        // chack type is one of the ones we handle
        switch (true) {
            case newColType === 'left' && oldColType === 'main':
            case newColType === 'main' && oldColType === 'left':
            case newColType === 'right' && oldColType === 'main':
            case newColType === 'main' && oldColType === 'right':
            case newColType === 'left' && oldColType === 'right':
            case newColType === 'right' && oldColType === 'left':
                // hide column
                this.sharedContext.columnsArray[this.sharedContext.colNo].show = false;
                // get to width of the column we have
                width = this.sharedContext.columnsArray[this.sharedContext.colNo].width;
                // sort array (I prb can remove?)
                this.sharedContext.columnsArraySorted.sort(function (a, b) {
                    return a.left - b.left;
                });
                // loop and set left/right  
                var appendValue_2 = 0;
                this.sharedContext.columnsArraySorted.forEach(function (x) {
                    if (x.show) {
                        x.left = appendValue_2;
                        appendValue_2 = appendValue_2 + x.width;
                    }
                });
                // set new col type
                this.sharedContext.colType = result.colType;
                this.sharedContext.columnsArray = this.vGrid.columnBindingContext['setup' + result.colType];
                // show column
                this.sharedContext.columnsArray[this.sharedContext.colNo].show = true;
                // set correct width
                this.sharedContext.columnsArray[this.sharedContext.colNo].width = width;
                // set new shared column context
                this.sharedContext.columnsArraySorted = [];
                this.sharedContext.columnsArray.forEach(function (x) {
                    _this.sharedContext.columnsArraySorted.push(x);
                });
                // sort array (I prb can remove?)
                this.sharedContext.columnsArraySorted.sort(function (a, b) {
                    return a.left - b.left;
                });
                // loop and set left/right  
                appendValue_2 = 0;
                this.sharedContext.columnsArraySorted.forEach(function (x) {
                    if (x.show) {
                        x.left = appendValue_2;
                        appendValue_2 = appendValue_2 + x.width;
                    }
                });
                break;
            default:
                // console.log("Todo: Move to :" + newColType + ", from:" + oldColType);
                break;
        }
        // a lot of repeated code... throw this in htmlHeightWidths class, so I can call it from somewhere else too?
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
    /**
     * todo description
     *
     */
    VGridDragDropCol.prototype.getTargetData = function (curTarget) {
        // set variables
        var draggableTarget = null;
        var count = 0;
        var exit = true;
        var isOk = false;
        while (exit) {
            // have count, so we dont end up locking browser if anything goes really bad
            count++;
            // if we dont have target, fail!
            if (!curTarget.parentNode) {
                exit = false;
            }
            else {
                // if draggable, and not set, then we set it
                if (curTarget.draggable === true && draggableTarget === null) {
                    draggableTarget = curTarget;
                }
                // check if it contains our elements, or continue to next parentNode
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
            // 20 times, we failed!
            if (count > 10) {
                exit = false;
            }
        }
        var curColType = null;
        var curColNo = null;
        var curContext = null;
        var curColumnsArray = null;
        var isPanel = false;
        // if ok, get variables we need
        if (isOk && curTarget.nodeName === 'AVG-COL') {
            curColType = curTarget.attributes.getNamedItem('avg-type').value;
            curColNo = parseInt(curTarget.attributes.getNamedItem('avg-config-col').value, 10);
            curContext = this.vGrid.columnBindingContext['setup' + curColType][curColNo];
            curColumnsArray = this.vGrid.columnBindingContext['setup' + curColType];
        }
        if (isOk && curTarget.nodeName === 'AVG-TOP-PANEL') {
            isPanel = true;
        }
        // return super object :-)
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
    aurelia_framework_1.bindable
], VGridDragDropCol.prototype, "title");
__decorate([
    aurelia_framework_1.bindable
], VGridDragDropCol.prototype, "field");
VGridDragDropCol = __decorate([
    aurelia_framework_1.customAttribute('v-drag-drop-col'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid)
], VGridDragDropCol);
exports.VGridDragDropCol = VGridDragDropCol;

});
___scope___.file("grid/attributes/v-filter-observer.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
/**
 * Custom attribute "v-filter-observer"
 * Alternative filter that listen for value changed
 * Can be used with custom html
 *
 */
var VGridAttributesFilterObserver = (function () {
    function VGridAttributesFilterObserver(element, vGrid) {
        this.vGrid = vGrid;
        this.element = element;
    }
    /**
     * todo description
     *
     */
    VGridAttributesFilterObserver.prototype.valueChanged = function (newValue) {
        if (this.attribute && newValue) {
            this.updateFilter();
        }
    };
    /**
     * todo description
     *
     */
    VGridAttributesFilterObserver.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        var valueConverter = this.valueConverters(this.converter);
        this.filterOperator = this.operator || '=';
        this.attribute = this.field;
        this.valueFormater = valueConverter || null;
        this.state = 0;
    };
    /**
     * todo description
     *
     */
    VGridAttributesFilterObserver.prototype.getValue = function () {
        return this.valueFormater ? this.valueFormater.fromView(this.value) : this.value;
    };
    /**
     * todo description
     *
     */
    VGridAttributesFilterObserver.prototype.updateFilter = function () {
        var _this = this;
        var curFilter = this.vGrid.attGridConnector.getCurrentFilter();
        var filterIndex = -1;
        // get index of filter
        curFilter.forEach(function (filter, index) {
            if (filter.attribute === _this.attribute) {
                filterIndex = index;
            }
        });
        if (filterIndex !== -1) {
            // we found a filter, lets update
            if (this.getValue() === '') {
                curFilter.splice(filterIndex, 1);
            }
            else {
                curFilter[filterIndex].value = this.getValue();
                curFilter[filterIndex].operator = this.filterOperator;
            }
        }
        else {
            // we didnt find filter, lets add one
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
    /**
     * todo description
     *
     */
    VGridAttributesFilterObserver.prototype.valueConverters = function (value) {
        var valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
        return valueConverter(value);
    };
    return VGridAttributesFilterObserver;
}());
__decorate([
    aurelia_framework_1.bindable
], VGridAttributesFilterObserver.prototype, "field");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributesFilterObserver.prototype, "operator");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributesFilterObserver.prototype, "converter");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributesFilterObserver.prototype, "value");
VGridAttributesFilterObserver = __decorate([
    aurelia_framework_1.customAttribute('v-filter-observer'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid)
], VGridAttributesFilterObserver);
exports.VGridAttributesFilterObserver = VGridAttributesFilterObserver;

});
___scope___.file("grid/attributes/v-filter.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
/**
 * Custom attribute "v-filter"
 * Logic behind filter in headers
 * Used by default by the simple html setup
 * Can be used with custom html
 *
 */
var VGridAttributesFilter = (function () {
    function VGridAttributesFilter(element, vGrid) {
        this.vGrid = vGrid;
        this.element = element;
    }
    /**
     * todo description
     *
     */
    VGridAttributesFilter.prototype.getOperatorName = function (operator) {
        return this.vGrid.filterOperatorNames[operator];
    };
    /**
     * todo description
     *
     */
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
                // add event listner
                this.element.onkeyup = function (e) {
                    if (e.keyCode === 13) {
                        // if they hit enter we need to get filter, update and run query
                        _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                        _this.vGrid.attGridConnector.query(_this.vGrid.attGridConnector.getCurrentFilter());
                    }
                    else {
                        // if they did nop hit enter we need to check if keydown is the trigger
                        if (_this.filterOn === 'onKeyDown') {
                            _this.updateFilter(_this.vGrid.attGridConnector.getCurrentFilter());
                            _this.vGrid.attGridConnector.query(_this.vGrid.attGridConnector.getCurrentFilter());
                        }
                    }
                };
            }
            else {
                // set default!
                this.element.indeterminate = true;
                this.element.style.opacity = '0.3';
                // is checkbox
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
    /**
     * todo description
     *
     */
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
    /**
     * todo description
     *
     */
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
    /**
     * todo description
     *
     */
    VGridAttributesFilter.prototype.resetValue = function () {
        if (this.type !== 'checkbox') {
            this.element.value = '';
        }
        else {
            this.state = 0;
            this.element.checked = false;
        }
    };
    /**
     * todo description
     *
     */
    VGridAttributesFilter.prototype.updateFilter = function (curFilter) {
        var _this = this;
        var filterIndex = -1;
        // get index of filter
        curFilter.forEach(function (filter, index) {
            if (filter.attribute === _this.attribute && filter.key === _this.key) {
                filterIndex = index;
            }
        });
        if (filterIndex !== -1) {
            // we found a filter, lets update
            if (this.getValue() === '') {
                curFilter.splice(filterIndex, 1);
            }
            else {
                curFilter[filterIndex].value = this.getValue();
                curFilter[filterIndex].operator = this.filterOperator;
            }
        }
        else {
            // we didnt find filter, lets add one
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
    /**
     * todo description
     *
     */
    VGridAttributesFilter.prototype.valueConverters = function (value) {
        var valueConverter = this.vGrid.viewResources.getValueConverter.bind(this.vGrid.viewResources);
        return valueConverter(value);
    };
    return VGridAttributesFilter;
}());
__decorate([
    aurelia_framework_1.bindable
], VGridAttributesFilter.prototype, "field");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributesFilter.prototype, "operator");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributesFilter.prototype, "converter");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributesFilter.prototype, "keydown");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributesFilter.prototype, "key");
VGridAttributesFilter = __decorate([
    aurelia_framework_1.customAttribute('v-filter'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid)
], VGridAttributesFilter);
exports.VGridAttributesFilter = VGridAttributesFilter;

});
___scope___.file("grid/attributes/v-image.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
/**
 * Custom attribute "v-image-fix"
 * Clears src of image so it does not lag
 * Used by default by the simple html setup
 * Can be used with custom html
 *
 */
var VGridAttributesImageFix = (function () {
    function VGridAttributesImageFix(element, vGrid) {
        this.vGrid = vGrid;
        this.element = element;
    }
    /**
     * todo description
     *
     */
    VGridAttributesImageFix.prototype.valueChanged = function (newValue) {
        newValue = newValue ? newValue : '';
        this.element.src = '';
        this.element.src = this.value || newValue;
    };
    /**
     * todo description
     *
     */
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
    aurelia_framework_1.inject(Element, v_grid_1.VGrid)
], VGridAttributesImageFix);
exports.VGridAttributesImageFix = VGridAttributesImageFix;

});
___scope___.file("grid/attributes/v-menu.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
/**
 * Custom attribute "v-image-fix"
 * logic behind menu/ adds contextmenu to grid
 * Used by default by the simple html setup
 * Can be used with custom html
 *
 */
var VGridAttributeMenu = (function () {
    // @bindable private copypaste: string; //todo
    function VGridAttributeMenu(element, vGrid) {
        this.element = element;
        this.controller = vGrid.controller;
        this.raiseEvent = vGrid.controller.raiseEvent;
        this.groupingElements = vGrid.groupingElements;
        this.openBinded = this.open.bind(this);
        this.checkBinded = this.check.bind(this);
        this.callbackBinded = this.callback.bind(this);
    }
    /**
     * todo description
     *
     */
    VGridAttributeMenu.prototype.attached = function () {
        this.element.addEventListener('contextmenu', this.openBinded);
    };
    /**
     * todo description
     *
     */
    VGridAttributeMenu.prototype.unbind = function () {
        document.removeEventListener('click', this.checkBinded);
    };
    /**
     * todo description
     *
     */
    VGridAttributeMenu.prototype.check = function (e) {
        var x = e.target.classList.contains('avg-menu__link');
        if (!x) {
            this.controller.contextMenu.setDefaults();
            document.removeEventListener('click', this.checkBinded);
        }
    };
    /**
     * todo description
     *
     */
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
    /**
     * todo description
     *
     */
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
    /**
     * todo description
     *
     */
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
    aurelia_framework_1.bindable
], VGridAttributeMenu.prototype, "filter");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributeMenu.prototype, "filterkey");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributeMenu.prototype, "sort");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributeMenu.prototype, "pinned");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributeMenu.prototype, "groupby");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributeMenu.prototype, "groupbytitle");
VGridAttributeMenu = __decorate([
    aurelia_framework_1.customAttribute('v-menu'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid)
], VGridAttributeMenu);
exports.VGridAttributeMenu = VGridAttributeMenu;

});
___scope___.file("grid/attributes/v-resize-col.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
/**
 * Custom attribute "v-resize-col"
 * logic behind resizing of columns
 * Used by default by the simple html setup
 * Can be used with custom html
 *
 */
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
    /**
     * todo description
     *
     */
    VGridAttributesResizeCol.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
    };
    /**
     * todo description
     *
     */
    VGridAttributesResizeCol.prototype.attached = function () {
        var _this = this;
        // add resize handle
        var resizeHandle = document.createElement('DIV');
        resizeHandle.classList.add('avg-draggable-handler');
        this.onmousedownBinded = this.onmousedown.bind(this);
        this.onmousemoveBinded = this.onmousemove.bind(this);
        this.onmouseupBinded = this.onmouseup.bind(this);
        // register onmouse down event
        resizeHandle.onmousedown = function (e) {
            _this.ctx.resizing = true;
            _this.onmousedown(e);
        };
        // add
        this.column.appendChild(resizeHandle);
    };
    /**
     * todo description
     *
     */
    VGridAttributesResizeCol.prototype.onmouseup = function () {
        // remove events
        document.removeEventListener('mousemove', this.onmousemoveBinded);
        document.removeEventListener('mouseup', this.onmouseupBinded);
        this.ctx.resizing = false;
    };
    /**
     * todo description
     *
     */
    VGridAttributesResizeCol.prototype.onmousemove = function (e) {
        this.updateHeader(e);
    };
    /**
     * todo description
     *
     */
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
                    // tslint:disable-next-line:prefer-for-of
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
                    // tslint:disable-next-line:prefer-for-of
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
                    // tslint:disable-next-line:prefer-for-of
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
    /**
     * todo description
     *
     */
    VGridAttributesResizeCol.prototype.onmousedown = function (e) {
        var _this = this;
        // get some vars
        this.screenX = e.screenX;
        this.originalWidth = this.context.width;
        this.originals = [];
        // tslint:disable-next-line:prefer-for-of
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
        // register mosemove and mouse up event
        document.addEventListener('mousemove', this.onmousemoveBinded);
        document.addEventListener('mouseup', this.onmouseupBinded);
    };
    return VGridAttributesResizeCol;
}());
VGridAttributesResizeCol = __decorate([
    aurelia_framework_1.customAttribute('v-resize-col'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid)
], VGridAttributesResizeCol);
exports.VGridAttributesResizeCol = VGridAttributesResizeCol;

});
___scope___.file("grid/attributes/v-selection.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
/**
 * Custom attribute "v-resize-col"
 * enablkes checkbox selection
 * Used by default by the simple html setup
 * Can be used with custom html
 *
 */
var VGridAttributesSelection = (function () {
    function VGridAttributesSelection(element, vGrid) {
        this.vGrid = vGrid;
        this.controller = vGrid.controller;
        this.element = element;
    }
    /**
     * todo description
     *
     */
    VGridAttributesSelection.prototype.selectedChanged = function (newValue) {
        if (this.type === 'row') {
            this.element.checked = newValue;
        }
    };
    /**
     * todo description
     *
     */
    VGridAttributesSelection.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
    };
    /**
     * todo description
     *
     */
    VGridAttributesSelection.prototype.attached = function () {
        var _this = this;
        this.element.checked = this.selected;
        this.element.onclick = function () {
            // todo, check... think ff had something weird here
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
    aurelia_framework_1.bindable
], VGridAttributesSelection.prototype, "selected");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributesSelection.prototype, "type");
VGridAttributesSelection = __decorate([
    aurelia_framework_1.customAttribute('v-selection'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid)
], VGridAttributesSelection);
exports.VGridAttributesSelection = VGridAttributesSelection;

});
___scope___.file("grid/attributes/v-sort.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("../v-grid");
/**
 * Custom attribute "v-resize-col"
 * logic behind sorting in grid/sort icons
 * Used by default by the simple html setup
 * Can be used with custom html
 *
 */
var VGridAttributesSort = (function () {
    function VGridAttributesSort(element, vGrid) {
        this.firstTime = true;
        this.vGrid = vGrid;
        this.element = element;
    }
    /**
     * todo description
     *
     */
    VGridAttributesSort.prototype.bind = function (bindingContext, overrideContext) {
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.attribute = this.field;
    };
    /**
     * todo description
     *
     */
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
    /**
     * todo description
     *
     */
    VGridAttributesSort.prototype.detached = function () {
        this.element.removeChild(this.sortIcon);
    };
    /**
     * todo description
     *
     */
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
    aurelia_framework_1.bindable
], VGridAttributesSort.prototype, "field");
__decorate([
    aurelia_framework_1.bindable
], VGridAttributesSort.prototype, "asc");
VGridAttributesSort = __decorate([
    aurelia_framework_1.customAttribute('v-sort'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid)
], VGridAttributesSort);
exports.VGridAttributesSort = VGridAttributesSort;

});
___scope___.file("grid/v-grid-col.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
/**
 * Custom element <v-grid-col>
 * This is used for creating the simple html columns
 *
 */
var VGridElementColConfig = (function () {
    function VGridElementColConfig(element, vGrid, targetInstruction) {
        this.vGrid = vGrid;
        this.element = element;
        this.colRowTemplate = targetInstruction.elementInstruction.colRowTemplate;
        this.colHeaderTemplate = targetInstruction.elementInstruction.colHeaderTemplate;
        this.colCss = targetInstruction.elementInstruction.colCss;
    }
    /**
     * When bind runs we get the bindable attributes & template markup if any from <v-grid-col>
     * We add this to the vGrid class colConfig to use later when grid is generated
     *
     */
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
    /**
     * Checks bool value and return real boolean
     *
     */
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
    aurelia_framework_1.bindable({ attribute: 'col-width' })
], VGridElementColConfig.prototype, "colWidth");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-field' })
], VGridElementColConfig.prototype, "colField");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-header-name' })
], VGridElementColConfig.prototype, "colHeaderName");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-sort' })
], VGridElementColConfig.prototype, "colSort");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-pin-left' })
], VGridElementColConfig.prototype, "colPinLeft");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-pin-right' })
], VGridElementColConfig.prototype, "colPinRight");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-filter' })
], VGridElementColConfig.prototype, "colFilter");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-filter-top' })
], VGridElementColConfig.prototype, "colFilterTop");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-add-label-attributes' })
], VGridElementColConfig.prototype, "colAddLabelAttributes");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-add-filter-attributes' })
], VGridElementColConfig.prototype, "colAddFilterAttributes");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-add-row-attributes' })
], VGridElementColConfig.prototype, "colAddRowAttributes");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-type' })
], VGridElementColConfig.prototype, "colType");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-filter-menu' })
], VGridElementColConfig.prototype, "colFilterMenu");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-label-menu' })
], VGridElementColConfig.prototype, "colLabelMenu");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-row-menu' })
], VGridElementColConfig.prototype, "colRowMenu");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-hidden' })
], VGridElementColConfig.prototype, "colHidden");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-drag-drop' })
], VGridElementColConfig.prototype, "colDragDrop");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-resizeable' })
], VGridElementColConfig.prototype, "colResizeable");
__decorate([
    aurelia_framework_1.bindable({ attribute: 'col-display-edit' })
], VGridElementColConfig.prototype, "colDisplayEdit");
VGridElementColConfig = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        // dont use  
        compiler = null;
        resources = null;
        // check if any header template is added, if so add to instruction for use
        var headerTemplateElement = element.getElementsByTagName('V-HEADER-TEMPLATE')[0];
        var headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
        if (headerTemplateHtml !== '') {
            instruction.colHeaderTemplate = headerTemplateHtml;
        }
        // check if any row template is added, if so add to instruction for use
        var rowTemplateElement = element.getElementsByTagName('V-ROW-TEMPLATE')[0];
        var rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
        if (rowTemplateHtml !== '') {
            instruction.colRowTemplate = rowTemplateHtml;
        }
        // clear the innerhtml, not needed, and we dont want it there messing up stuff
        element.innerHTML = '';
        // we want to get this css attribute and use if later
        var css = element.getAttribute('col-css');
        if (css) {
            instruction.colCss = css;
        }
    }),
    aurelia_framework_1.customElement('v-grid-col'),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction)
], VGridElementColConfig);
exports.VGridElementColConfig = VGridElementColConfig;

});
___scope___.file("grid/v-grid-contextmenu.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
/**
 * Custom element <v-grid-contextmenu>
 * This is used for creating custom menus markup
 *
 */
var VGridContextmenu = (function () {
    function VGridContextmenu(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.customMenuTemplates = targetInstruction.elementInstruction.menuTemplates;
    }
    /**
     * Add the templates to vGrid class for use later when we generate the grid
     *
     */
    VGridContextmenu.prototype.bind = function () {
        this.vGrid.customMenuTemplates = this.customMenuTemplates;
    };
    return VGridContextmenu;
}());
VGridContextmenu = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-contextmenu'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        // dont use  
        compiler = null;
        resources = null;
        instruction.menuTemplates = {};
        var template;
        var templateHTML;
        // Check if any templates are added, if so add to instruction for use
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
        // clear the innerhtml, not needed, and we dont want it there messing up stuff
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction)
], VGridContextmenu);
exports.VGridContextmenu = VGridContextmenu;

});
___scope___.file("grid/v-grid-footer.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
/**
 * Custom element <v-grid-footer>
 * This is used for creating custom footer markup
 *
 */
var VGridFooter = (function () {
    function VGridFooter(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.template = targetInstruction.elementInstruction.template;
    }
    /**
     * add the markup to vgrid class for use later when generating the grid
     *
     */
    VGridFooter.prototype.bind = function () {
        this.vGrid.footerTemplate = this.template;
    };
    return VGridFooter;
}());
VGridFooter = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-footer'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        // dont use  
        compiler = null;
        resources = null;
        // get html markup, this will be added to our viewport when we create it
        instruction.template = element.innerHTML;
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction)
], VGridFooter);
exports.VGridFooter = VGridFooter;

});
___scope___.file("grid/v-grid-group-element.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
/**
 * Custom element <v-grid-group-element>
 * This is used for creating custom grouping element
 * The ones in the top panel
 *
 */
var VGridGroupElement = (function () {
    function VGridGroupElement(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
    }
    /**
     * add the markup to vgrid class for use later when generating the grid
     *
     */
    VGridGroupElement.prototype.bind = function () {
        this.vGrid.colGroupElement = this.rowTemplate;
    };
    return VGridGroupElement;
}());
VGridGroupElement = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-group-element'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        // dont use  
        compiler = null;
        resources = null;
        // get html markup, this will be added to our viewport when we create it
        instruction.rowTemplate = element.innerHTML;
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction)
], VGridGroupElement);
exports.VGridGroupElement = VGridGroupElement;

});
___scope___.file("grid/v-grid-group-row.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
/**
 * Custom element <v-grid-group-row>
 * This is used for creating custom rows in grouping
 * The one holding the group value / full width rows
 *
 */
var VGridGroupRow = (function () {
    function VGridGroupRow(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
    }
    /**
     * add the markup to vgrid class for use later when generating the grid
     *
     */
    VGridGroupRow.prototype.bind = function () {
        this.vGrid.colGroupRow = this.rowTemplate;
    };
    return VGridGroupRow;
}());
VGridGroupRow = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-group-row'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        // dont use  
        compiler = null;
        resources = null;
        // get html markup, this will be added to our viewport when we create it
        instruction.rowTemplate = element.innerHTML;
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction)
], VGridGroupRow);
exports.VGridGroupRow = VGridGroupRow;

});
___scope___.file("grid/v-grid-loadingscreen.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
/**
 * Custom element <v-grid-loadingscreen>
 * This is used for creating custom loading screen
 *
 */
var VGridLoadingScreen = (function () {
    function VGridLoadingScreen(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.template = targetInstruction.elementInstruction.template;
    }
    /**
     * add the markup to vgrid class for use later when generating the grid
     *
     */
    VGridLoadingScreen.prototype.bind = function () {
        this.vGrid.loadingScreenTemplate = this.template;
    };
    return VGridLoadingScreen;
}());
VGridLoadingScreen = __decorate([
    aurelia_framework_1.noView(),
    aurelia_framework_1.customElement('v-grid-loadingscreen'),
    aurelia_framework_1.processContent(function (compiler, resources, element, instruction) {
        // dont use  
        compiler = null;
        resources = null;
        // get html markup, this will be added to our viewport when we create it
        instruction.template = element.innerHTML;
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction)
], VGridLoadingScreen);
exports.VGridLoadingScreen = VGridLoadingScreen;

});
___scope___.file("grid/v-grid-row-repeat.js", function(exports, require, module, __filename, __dirname){ 
var __decorate = __fsbx_decorate(arguments)
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var aurelia_framework_1 = require("aurelia-framework");
var v_grid_1 = require("./v-grid");
/**
 * Custom element <v-grid-row-repeat>
 * This is used for creating custom row repeat
 * Row repeat is just a full grid with row without no column
 * Thisone is useful for when you need to for repeated
 *
 */
var VGridElementRowRepeat = (function () {
    function VGridElementRowRepeat(element, vGrid, targetInstruction) {
        this.element = element;
        this.vGrid = vGrid;
        this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
        this.headerTemplate = targetInstruction.elementInstruction.headerTemplate;
    }
    /**
     * add the markup to vgrid class for use later when generating the grid
     *
     */
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
        // dont use  
        compiler = null;
        resources = null;
        // check if any header template is added, if so add to instruction for use
        var headerTemplateElement = element.getElementsByTagName('V-HEADER-TEMPLATE')[0];
        var headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
        if (headerTemplateHtml !== '') {
            instruction.headerTemplate = headerTemplateHtml;
        }
        // check if any row template is added, if so add to instruction for use
        var rowTemplateElement = element.getElementsByTagName('V-ROW-TEMPLATE')[0];
        var rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
        if (rowTemplateHtml !== '') {
            instruction.rowTemplate = rowTemplateHtml;
        }
        // if we didnt get anything we use it all
        if (!rowTemplateHtml) {
            instruction.rowTemplate = element.innerHTML;
        }
        element.innerHTML = '';
    }),
    aurelia_framework_1.inject(Element, v_grid_1.VGrid, aurelia_framework_1.TargetInstruction)
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

__fsbx_css("grid/styles/main-elements.css", "﻿.avg-default {\r\n  border: 1px solid rgb(230, 230, 230);\r\n  -webkit-touch-callout: none;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\r\n}\r\n\r\n.avg-default .avg-top-panel {\r\n  border-bottom: 1px solid rgb(230, 230, 230);\r\n  background-color: rgb(240, 240, 240);\r\n}\r\n\r\n.avg-default .avg-header {\r\n  border-bottom: 1px solid rgb(230, 230, 230);\r\n}\r\n\r\n.avg-default .avg-footer {\r\n  border-top: 1px solid rgb(230, 230, 230);\r\n  background-color: rgb(240, 240, 240);\r\n}\r\n\r\n.avg-default .avg-content-right {\r\n  background-color: white;\r\n  border-top: 1px solid rgb(230, 230, 230);\r\n}\r\n\r\n.avg-default .avg-content-left {\r\n  background-color: white;\r\n  border-top: 1px solid rgb(230, 230, 230);\r\n}\r\n\r\n.avg-default .avg-header-main {\r\n  background-color: rgb(240, 240, 240);\r\n}\r\n\r\n.avg-default .avg-header-left {\r\n  background-color: rgb(240, 240, 240);\r\n}\r\n\r\n.avg-default .avg-header-right {\r\n  background-color: rgb(240, 240, 240);\r\n}\r\n\r\n.avg-default .avg-content-main {\r\n  background-color: white;\r\n  border-top: 1px solid rgb(230, 230, 230);\r\n}\r\n\r\n.avg-default .avg-row {\r\n  border-bottom: 1px solid rgb(230, 230, 230);\r\n}\r\n\r\n.avg-default .avg-header-left .avg-col {\r\n  /*white-space: nowrap;*/\r\n  box-sizing: border-box;\r\n  text-overflow: ellipsis;\r\n  border-right: 1px solid rgb(230, 230, 230);\r\n  overflow: hidden;\r\n}\r\n\r\n.avg-default .avg-header-main .avg-col {\r\n  /*white-space: nowrap;*/\r\n  box-sizing: border-box;\r\n  text-overflow: ellipsis;\r\n  border-right: 1px solid rgb(230, 230, 230);\r\n  overflow: hidden;\r\n}\r\n\r\n.avg-default .avg-header-right .avg-col {\r\n  box-sizing: border-box;\r\n  border-left: 1px solid rgb(230, 230, 230);\r\n}\r\n\r\n.avg-default .avg-content-left .avg-col {\r\n  white-space: nowrap;\r\n  box-sizing: border-box;\r\n  text-overflow: ellipsis;\r\n  border-right: 1px solid rgb(230, 230, 230);\r\n  overflow: hidden;\r\n}\r\n\r\n.avg-default .avg-content-main .avg-col {\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  border-right: 1px solid rgb(230, 230, 230);\r\n  overflow: hidden;\r\n}\r\n\r\n.avg-default .avg-content-right .avg-col {\r\n  border-left: 1px solid rgb(230, 230, 230);\r\n}\r\n\r\n.avg-default .avg-col-group {\r\n  pointer-events: all;\r\n  box-sizing: border-box;\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  background-color: rgb(250, 250, 250);\r\n  border-top: 1px solid rgb(230, 230, 230);\r\n  padding: 5px 10px;\r\n}\r\n\r\n.avg-default .avg-col-grouping {\r\n  white-space: nowrap;\r\n  box-sizing: border-box;\r\n  text-overflow: ellipsis;\r\n  background-color: rgb(250, 250, 250);\r\n  border-right: 1px solid rgb(230, 230, 230);\r\n  overflow: hidden;\r\n}\r\n\r\n.avg-default .avg-col-grouping-header {\r\n  white-space: nowrap;\r\n  text-overflow: ellipsis;\r\n  background-color: rgb(240, 240, 240);\r\n  border-right: 1px solid rgb(230, 230, 230);\r\n  overflow: hidden;\r\n}\r\n\r\n.avg-default .avg-selected-row {\r\n  box-shadow: none;\r\n  background-color: rgb(203, 195, 203);\r\n}\r\n");
});
});
FuseBox.global("__fsbx_decorate", function(localArguments) {
    return function(decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;

        if (!decorators) {
            return;
        }
        if (decorators && decorators.push) {
            decorators.push(
                __metadata("fusebox:exports", localArguments[0]),
                __metadata("fusebox:require", localArguments[1]),
                __metadata("fusebox:module", localArguments[2]),
                __metadata("fusebox:__filename", localArguments[3]),
                __metadata("fusebox:__dirname", localArguments[4])
            )
        }
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
});

FuseBox.global("__metadata", function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
});

FuseBox.import("aurelia-v-grid/index.js");
FuseBox.main("aurelia-v-grid/index.js");
})
(function(e){var r="undefined"!=typeof window&&window.navigator;r&&(window.global=window),e=r&&"undefined"==typeof __fbx__dnm__?e:module.exports;var n=r?window.__fsbx__=window.__fsbx__||{}:global.$fsbx=global.$fsbx||{};r||(global.require=require);var t=n.p=n.p||{},i=n.e=n.e||{},a=function(e){var r=e.charCodeAt(0);if(r>=97&&r<=122||64===r){if(64===r){var n=e.split("/"),t=n.splice(2,n.length).join("/");return[n[0]+"/"+n[1],t||void 0]}var i=e.indexOf("/");if(i===-1)return[e];var a=e.substring(0,i),o=e.substring(i+1);return[a,o]}},o=function(e){return e.substring(0,e.lastIndexOf("/"))||"./"},f=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];for(var n=[],t=0,i=arguments.length;t<i;t++)n=n.concat(arguments[t].split("/"));for(var a=[],t=0,i=n.length;t<i;t++){var o=n[t];o&&"."!==o&&(".."===o?a.pop():a.push(o))}return""===n[0]&&a.unshift(""),a.join("/")||(a.length?"/":".")},s=function(e){var r=e.match(/\.(\w{1,})$/);if(r){var n=r[1];return n?e:e+".js"}return e+".js"},u=function(e){if(r){var n,t=document,i=t.getElementsByTagName("head")[0];/\.css$/.test(e)?(n=t.createElement("link"),n.rel="stylesheet",n.type="text/css",n.href=e):(n=t.createElement("script"),n.type="text/javascript",n.src=e,n.async=!0),i.insertBefore(n,i.firstChild)}},l=function(e,n){var i=n.path||"./",o=n.pkg||"default",u=a(e);u&&(i="./",o=u[0],n.v&&n.v[o]&&(o=o+"@"+n.v[o]),e=u[1]),e&&126===e.charCodeAt(0)&&(e=e.slice(2,e.length),i="./");var l=t[o];if(!l){if(r)throw'Package was not found "'+o+'"';return{serverReference:require(o)}}e||(e="./"+l.s.entry);var v,c=f(i,e),d=s(c),p=l.f[d];return!p&&d.indexOf("*")>-1&&(v=d),p||v||(d=f(c,"/","index.js"),p=l.f[d],p||(d=c+".js",p=l.f[d]),p||(p=l.f[c+".jsx"])),{file:p,wildcard:v,pkgName:o,versions:l.v,filePath:c,validPath:d}},v=function(e,n){if(!r)return n(/\.(js|json)$/.test(e)?global.require(e):"");var t;t=new XMLHttpRequest,t.onreadystatechange=function(){if(4==t.readyState)if(200==t.status){var r=t.getResponseHeader("Content-Type"),i=t.responseText;/json/.test(r)?i="module.exports = "+i:/javascript/.test(r)||(i="module.exports = "+JSON.stringify(i));var a=f("./",e);p.dynamic(a,i),n(p.import(e,{}))}else console.error(e+" was not found upon request"),n(void 0)},t.open("GET",e,!0),t.send()},c=function(e,r){var n=i[e];if(n)for(var t in n){var a=n[t].apply(null,r);if(a===!1)return!1}},d=function(e,n){if(void 0===n&&(n={}),58===e.charCodeAt(4)||58===e.charCodeAt(5))return u(e);var i=l(e,n);if(i.serverReference)return i.serverReference;var a=i.file;if(i.wildcard){var f=new RegExp(i.wildcard.replace(/\*/g,"@").replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&").replace(/@/g,"[a-z0-9$_-]+"),"i"),s=t[i.pkgName];if(s){var p={};for(var g in s.f)f.test(g)&&(p[g]=d(i.pkgName+"/"+g));return p}}if(!a){var m="function"==typeof n,h=c("async",[e,n]);if(h===!1)return;return v(e,function(e){if(m)return n(e)})}var _=i.validPath,x=i.pkgName;if(a.locals&&a.locals.module)return a.locals.module.exports;var w=a.locals={},b=o(_);w.exports={},w.module={exports:w.exports},w.require=function(e,r){return d(e,{pkg:x,path:b,v:i.versions})},w.require.main={filename:r?"./":global.require.main.filename,paths:r?[]:global.require.main.paths};var y=[w.module.exports,w.require,w.module,_,b,x];c("before-import",y);var k=a.fn;return k.apply(0,y),c("after-import",y),w.module.exports},p=function(){function n(){}return n.global=function(e,n){var t=r?window:global;return void 0===n?t[e]:void(t[e]=n)},n.import=function(e,r){return d(e,r)},n.on=function(e,r){i[e]=i[e]||[],i[e].push(r)},n.exists=function(e){var r=l(e,{});return void 0!==r.file},n.remove=function(e){var r=l(e,{}),n=t[r.pkgName];n&&n.f[r.validPath]&&delete n.f[r.validPath]},n.main=function(e){return this.mainFile=e,n.import(e,{})},n.expose=function(r){for(var n in r){var t=r[n],i=d(t.pkg);e[t.alias]=i}},n.dynamic=function(r,n,t){var i=t&&t.pkg||"default";this.pkg(i,{},function(t){t.file(r,function(r,t,i,a,o){var f=new Function("__fbx__dnm__","exports","require","module","__filename","__dirname","__root__",n);f(!0,r,t,i,a,o,e)})})},n.flush=function(e){var r=t.default;if(e)return void(r.f[e]&&delete r.f[e].locals);for(var n in r.f){var i=r.f[n];delete i.locals}},n.pkg=function(e,r,n){if(t[e])return n(t[e].s);var i=t[e]={},a=i.f={};i.v=r;var o=i.s={file:function(e,r){a[e]={fn:r}}};return n(o)},n}();return p.packages=t,p.isBrowser=void 0!==r,p.isServer=!r,e.FuseBox=p}(this))