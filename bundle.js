(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcResponsive_table = require('../src/responsive_table');

var _srcResponsive_table2 = _interopRequireDefault(_srcResponsive_table);

var breakPoint = 800,
    element = document.getElementById('better-table'),
    table = new _srcResponsive_table2['default'].TableComponentController({
  breakPoint: breakPoint,
  element: element
});

},{"../src/responsive_table":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _table_component_controller = require('./table_component_controller');

var _table_component_controller2 = _interopRequireDefault(_table_component_controller);

var _table_component_views = require('./table_component_views');

var _table_component_views2 = _interopRequireDefault(_table_component_views);

var _screen_calculator = require('./screen_calculator');

var _screen_calculator2 = _interopRequireDefault(_screen_calculator);

exports['default'] = {
  TableComponentController: _table_component_controller2['default'],
  TableComponentViews: _table_component_views2['default'],
  ScreenCalulator: _screen_calculator2['default']
};
module.exports = exports['default'];

},{"./screen_calculator":3,"./table_component_controller":4,"./table_component_views":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var win = window;
var doc = document;
var docElement = document.documentElement;
var bodyElement = document.getElementsByTagName('body')[0];

var ScreenCalulator = {
  width: function width() {
    return win.innerWidth || docElement.clientWidth || bodyElement.clientWidth;
  },
  height: function height() {
    return win.innerHeight || docElement.clientHeight || bodyElement.clientHeight;
  }
};

exports['default'] = ScreenCalulator;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _screen_calculator = require('./screen_calculator');

var _screen_calculator2 = _interopRequireDefault(_screen_calculator);

var _table_component_views = require('./table_component_views');

var _table_component_views2 = _interopRequireDefault(_table_component_views);

var TableComponentController = (function () {
  function TableComponentController(options) {
    _classCallCheck(this, TableComponentController);

    this.customMobileReturn = options.mobileCallback || false;
    this.customDesktopReturn = options.desktopCallback || false;
    this.element = options.element;
    this.tableCache = options.element.cloneNode(true);
    this.breakPoint = options.breakPoint;
    this.desktopView = true;

    this.adjustView();
    window.addEventListener('resize', this.adjustView.bind(this));
  }

  _createClass(TableComponentController, [{
    key: 'adjustView',
    value: function adjustView() {
      if (_screen_calculator2['default'].width() <= this.breakPoint) {
        this.switchToMobile();
      } else {
        this.switchToDesktop();
      }
    }
  }, {
    key: 'switchToMobile',
    value: function switchToMobile() {
      if (this.desktopView) {
        this.desktopView = false;
        return this.handleMobileView();
      }
    }
  }, {
    key: 'handleMobileView',
    value: function handleMobileView() {
      if (!this.mobileCallback) {
        return _table_component_views2['default'].cards(this.element);
      } else {
        return this.mobileCallback(this.element);
      }
    }
  }, {
    key: 'switchToDesktop',
    value: function switchToDesktop() {
      if (!this.desktopView) {
        this.desktopView = true;
        return this.handleDesktopView();
      }
    }
  }, {
    key: 'handleDesktopView',
    value: function handleDesktopView() {
      if (!this.desktopCallback) {
        return _table_component_views2['default'].cached(this.element, this.tableCache);
      } else {
        return this.desktopCallback(this.element, this.tableCache);
      }
    }
  }]);

  return TableComponentController;
})();

exports['default'] = TableComponentController;
module.exports = exports['default'];

},{"./screen_calculator":3,"./table_component_views":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function _thead(element) {
  return element.getElementsByTagName('thead')[0];
}

function _tbody(element) {
  return element.getElementsByTagName('tbody')[0];
}

function _tfoot(element) {
  return element.getElementsByTagName('tfoot')[0];
}

function _rows(tbody) {
  return tbody.getElementsByTagName('tr');
}

function _card(thead, row) {
  var card = document.createElement('table'),
      tbody = document.createElement('tbody'),
      headers = thead.getElementsByTagName('th'),
      data = row.getElementsByTagName('td'),
      x = 0;

  for (x; x < data.length; x++) {
    var newRow = document.createElement('tr'),
        newData = data[x].cloneNode(true),
        header = headers[x].cloneNode(true);

    header.setAttribute('scope', 'row');
    newRow.appendChild(header);
    newRow.appendChild(newData);
    tbody.appendChild(newRow);
  }

  card.setAttribute('class', 'table');
  card.appendChild(tbody);

  return card;
}

var TableComponentViews = {
  cached: function cached(element, _cached) {
    element.innerHTML = _cached.innerHTML;
  },

  cards: function cards(element) {
    var thead = _thead(element),
        tbody = _tbody(element),
        rows = _rows(tbody),
        x = undefined;

    element.innerHTML = '';

    for (x = 0; x < rows.length; x++) {
      element.appendChild(_card(thead, rows[x]));
    }
  }
};

exports['default'] = TableComponentViews;
module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvc3J2L2JldHRlci10YWJsZXMvYXBwL21haW4uanMiLCIvc3J2L2JldHRlci10YWJsZXMvc3JjL3Jlc3BvbnNpdmVfdGFibGUuanMiLCIvc3J2L2JldHRlci10YWJsZXMvc3JjL3NjcmVlbl9jYWxjdWxhdG9yLmpzIiwiL3Nydi9iZXR0ZXItdGFibGVzL3NyYy90YWJsZV9jb21wb25lbnRfY29udHJvbGxlci5qcyIsIi9zcnYvYmV0dGVyLXRhYmxlcy9zcmMvdGFibGVfY29tcG9uZW50X3ZpZXdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OzttQ0NBNEIseUJBQXlCOzs7O0FBRXJELElBQUksVUFBVSxHQUFJLEdBQUc7SUFDakIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDO0lBQ2pELEtBQUssR0FBRyxJQUFJLGlDQUFnQix3QkFBd0IsQ0FBQztBQUNuRCxZQUFVLEVBQUUsVUFBVTtBQUN0QixTQUFPLEVBQUUsT0FBTztDQUNqQixDQUFDLENBQUM7Ozs7Ozs7Ozs7OzBDQ1A4Qiw4QkFBOEI7Ozs7cUNBQ25DLHlCQUF5Qjs7OztpQ0FDN0IscUJBQXFCOzs7O3FCQUVsQztBQUNiLDBCQUF3Qix5Q0FBMEI7QUFDbEQscUJBQW1CLG9DQUEwQjtBQUM3QyxpQkFBZSxnQ0FBMEI7Q0FDMUM7Ozs7Ozs7OztBQ1JELElBQUksR0FBRyxHQUFXLE1BQU0sQ0FBQztBQUN6QixJQUFJLEdBQUcsR0FBVyxRQUFRLENBQUM7QUFDM0IsSUFBSSxVQUFVLEdBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQztBQUMzQyxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRTNELElBQUksZUFBZSxHQUFHO0FBQ3BCLE9BQUssRUFBRSxpQkFBSztBQUNW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LE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNwQyxNQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUV4QixTQUFPLElBQUksQ0FBQztDQUNiOztBQUVELElBQUksbUJBQW1CLEdBQUk7QUFDekIsUUFBTSxFQUFFLGdCQUFDLE9BQU8sRUFBRSxPQUFNLEVBQUk7QUFDMUIsV0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFNLENBQUMsU0FBUyxDQUFDO0dBQ3RDOztBQUVELE9BQUssRUFBRSxlQUFDLE9BQU8sRUFBSTtBQUNqQixRQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzNCLEtBQUssR0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzNCLElBQUksR0FBUSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3hCLENBQUMsWUFBQSxDQUFDOztBQUVGLFdBQU8sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDOztBQUV2QixTQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDM0IsYUFBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUM7R0FDRjtDQUNGLENBQUE7O3FCQUVjLG1CQUFtQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVzcG9uc2l2ZVRhYmxlIGZyb20gJy4uL3NyYy9yZXNwb25zaXZlX3RhYmxlJztcblxubGV0IGJyZWFrUG9pbnQgID0gODAwLFxuICAgIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmV0dGVyLXRhYmxlJyksXG4gICAgdGFibGUgPSBuZXcgUmVzcG9uc2l2ZVRhYmxlLlRhYmxlQ29tcG9uZW50Q29udHJvbGxlcih7XG4gICAgICBicmVha1BvaW50OiBicmVha1BvaW50LFxuICAgICAgZWxlbWVudDogZWxlbWVudFxuICAgIH0pO1xuIiwiaW1wb3J0IFRhYmxlQ29tcG9uZW50Q29udHJvbGxlciBmcm9tICcuL3RhYmxlX2NvbXBvbmVudF9jb250cm9sbGVyJztcbmltcG9ydCBUYWJsZUNvbXBvbmVudFZpZXdzIGZyb20gJy4vdGFibGVfY29tcG9uZW50X3ZpZXdzJztcbmltcG9ydCBTY3JlZW5DYWx1bGF0b3IgZnJvbSAnLi9zY3JlZW5fY2FsY3VsYXRvcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgVGFibGVDb21wb25lbnRDb250cm9sbGVyOiBUYWJsZUNvbXBvbmVudENvbnRyb2xsZXIsXG4gIFRhYmxlQ29tcG9uZW50Vmlld3M6ICAgICAgVGFibGVDb21wb25lbnRWaWV3cyxcbiAgU2NyZWVuQ2FsdWxhdG9yOiAgICAgICAgICBTY3JlZW5DYWx1bGF0b3Jcbn07XG4iLCJsZXQgd2luICAgICAgICAgPSB3aW5kb3c7XG5sZXQgZG9jICAgICAgICAgPSBkb2N1bWVudDtcbmxldCBkb2NFbGVtZW50ICA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbmxldCBib2R5RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG5cbmxldCBTY3JlZW5DYWx1bGF0b3IgPSB7XG4gIHdpZHRoOiAoKT0+IHtcbiAgICByZXR1cm4gd2luLmlubmVyV2lkdGggfHwgZG9jRWxlbWVudC5jbGllbnRXaWR0aCB8fCBib2R5RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgfSxcbiAgaGVpZ2h0OiAoKT0+IHtcbiAgICByZXR1cm4gd2luLmlubmVySGVpZ2h0IHx8IGRvY0VsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGJvZHlFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgU2NyZWVuQ2FsdWxhdG9yO1xuIiwiaW1wb3J0IFNjcmVlbkNhbHVsYXRvciBmcm9tICcuL3NjcmVlbl9jYWxjdWxhdG9yJztcbmltcG9ydCBUYWJsZUNvbXBvbmVudFZpZXdzIGZyb20gJy4vdGFibGVfY29tcG9uZW50X3ZpZXdzJztcblxuY2xhc3MgVGFibGVDb21wb25lbnRDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuY3VzdG9tTW9iaWxlUmV0dXJuICA9IG9wdGlvbnMubW9iaWxlQ2FsbGJhY2sgfHwgZmFsc2U7XG4gICAgdGhpcy5jdXN0b21EZXNrdG9wUmV0dXJuID0gb3B0aW9ucy5kZXNrdG9wQ2FsbGJhY2sgfHwgZmFsc2U7XG4gICAgdGhpcy5lbGVtZW50ICAgICAgICAgICAgID0gb3B0aW9ucy5lbGVtZW50O1xuICAgIHRoaXMudGFibGVDYWNoZSAgICAgICAgICA9IG9wdGlvbnMuZWxlbWVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgdGhpcy5icmVha1BvaW50ICAgICAgICAgID0gb3B0aW9ucy5icmVha1BvaW50O1xuICAgIHRoaXMuZGVza3RvcFZpZXcgICAgICAgICA9IHRydWU7XG5cbiAgICB0aGlzLmFkanVzdFZpZXcoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5hZGp1c3RWaWV3LmJpbmQodGhpcykpO1xuICB9XG5cbiAgYWRqdXN0VmlldygpIHtcbiAgICBpZihTY3JlZW5DYWx1bGF0b3Iud2lkdGgoKSA8PSB0aGlzLmJyZWFrUG9pbnQpIHtcbiAgICAgIHRoaXMuc3dpdGNoVG9Nb2JpbGUoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnN3aXRjaFRvRGVza3RvcCgpO1xuICAgIH1cbiAgfVxuXG4gIHN3aXRjaFRvTW9iaWxlKCkge1xuICAgIGlmKHRoaXMuZGVza3RvcFZpZXcpIHtcbiAgICAgIHRoaXMuZGVza3RvcFZpZXcgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZU1vYmlsZVZpZXcoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVNb2JpbGVWaWV3KCkge1xuICAgIGlmKCF0aGlzLm1vYmlsZUNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gVGFibGVDb21wb25lbnRWaWV3cy5jYXJkcyh0aGlzLmVsZW1lbnQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLm1vYmlsZUNhbGxiYWNrKHRoaXMuZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgc3dpdGNoVG9EZXNrdG9wKCkge1xuICAgIGlmKCF0aGlzLmRlc2t0b3BWaWV3KSB7XG4gICAgICB0aGlzLmRlc2t0b3BWaWV3ID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZURlc2t0b3BWaWV3KCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRGVza3RvcFZpZXcoKSB7XG4gICAgaWYoIXRoaXMuZGVza3RvcENhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gVGFibGVDb21wb25lbnRWaWV3cy5jYWNoZWQodGhpcy5lbGVtZW50LCB0aGlzLnRhYmxlQ2FjaGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmRlc2t0b3BDYWxsYmFjayh0aGlzLmVsZW1lbnQsIHRoaXMudGFibGVDYWNoZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlQ29tcG9uZW50Q29udHJvbGxlcjtcbiIsImZ1bmN0aW9uIF90aGVhZChlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0aGVhZCcpWzBdO1xufVxuXG5mdW5jdGlvbiBfdGJvZHkoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGJvZHknKVswXTtcbn1cblxuZnVuY3Rpb24gX3Rmb290KGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3Rmb290JylbMF07XG59XG5cbmZ1bmN0aW9uIF9yb3dzKHRib2R5KSB7XG4gIHJldHVybiB0Ym9keS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndHInKTtcbn1cblxuZnVuY3Rpb24gX2NhcmQodGhlYWQsIHJvdykge1xuICBsZXQgY2FyZCAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpLFxuICAgICAgdGJvZHkgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpLFxuICAgICAgaGVhZGVycyAgPSB0aGVhZC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGgnKSxcbiAgICAgIGRhdGEgICAgID0gcm93LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0ZCcpLFxuICAgICAgeCAgICAgICAgPSAwO1xuXG4gIGZvcih4OyB4PGRhdGEubGVuZ3RoOyB4KyspIHtcbiAgICBsZXQgbmV3Um93ICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyksXG4gICAgICAgIG5ld0RhdGEgPSBkYXRhW3hdLmNsb25lTm9kZSh0cnVlKSxcbiAgICAgICAgaGVhZGVyICA9IGhlYWRlcnNbeF0uY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgaGVhZGVyLnNldEF0dHJpYnV0ZSgnc2NvcGUnLCAncm93Jyk7XG4gICAgbmV3Um93LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgbmV3Um93LmFwcGVuZENoaWxkKG5ld0RhdGEpO1xuICAgIHRib2R5LmFwcGVuZENoaWxkKG5ld1Jvdyk7XG4gIH1cblxuICBjYXJkLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndGFibGUnKTtcbiAgY2FyZC5hcHBlbmRDaGlsZCh0Ym9keSk7XG5cbiAgcmV0dXJuIGNhcmQ7XG59XG5cbmxldCBUYWJsZUNvbXBvbmVudFZpZXdzID0gIHtcbiAgY2FjaGVkOiAoZWxlbWVudCwgY2FjaGVkKT0+IHtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGNhY2hlZC5pbm5lckhUTUw7XG4gIH0sXG5cbiAgY2FyZHM6IChlbGVtZW50KT0+IHtcbiAgICBsZXQgdGhlYWQgPSBfdGhlYWQoZWxlbWVudCksXG4gICAgdGJvZHkgICAgID0gX3Rib2R5KGVsZW1lbnQpLFxuICAgIHJvd3MgICAgICA9IF9yb3dzKHRib2R5KSxcbiAgICB4O1xuXG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSAnJztcblxuICAgIGZvcih4PTA7IHg8cm93cy5sZW5ndGg7IHgrKykge1xuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChfY2FyZCh0aGVhZCwgcm93c1t4XSkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYWJsZUNvbXBvbmVudFZpZXdzO1xuIl19
