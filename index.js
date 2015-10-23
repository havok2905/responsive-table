(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./screen_calculator":2,"./table_component_controller":3,"./table_component_views":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./screen_calculator":2,"./table_component_views":4}],4:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvc3J2L2JldHRlci10YWJsZXMvc3JjL2luZGV4LmpzIiwiL3Nydi9iZXR0ZXItdGFibGVzL3NyYy9zY3JlZW5fY2FsY3VsYXRvci5qcyIsIi9zcnYvYmV0dGVyLXRhYmxlcy9zcmMvdGFibGVfY29tcG9uZW50X2NvbnRyb2xsZXIuanMiLCIvc3J2L2JldHRlci10YWJsZXMvc3JjL3RhYmxlX2NvbXBvbmVudF92aWV3cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OzBDQ0FxQyw4QkFBOEI7Ozs7cUNBQ25DLHlCQUF5Qjs7OztpQ0FDN0IscUJBQXFCOzs7O3FCQUVsQztBQUNiLDBCQUF3Qix5Q0FBMEI7QUFDbEQscUJBQW1CLG9DQUEwQjtBQUM3QyxpQkFBZSxnQ0FBMEI7Q0FDMUM7Ozs7Ozs7OztBQ1JELElBQUksR0FBRyxHQUFXLE1BQU0sQ0FBQztBQUN6QixJQUFJLEdBQUcsR0FBVyxRQUFRLENBQUM7QUFDM0IsSUFBSSxVQUFVLEdBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQztBQUMzQyxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRTNELElBQUksZUFBZSxHQUFHO0FBQ3BCLE9BQUssRUFBRSxpQkFBSztBQUNWLFdBQU8sR0FBRyxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUM7R0FDNUU7QUFDRCxRQUFNLEVBQUUsa0JBQUs7QUFDWCxXQUFPLEdBQUcsQ0FBQyxXQUFXLElBQUksVUFBVSxDQUFDLFlBQVksSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDO0dBQy9FO0NBQ0YsQ0FBQzs7cUJBRWEsZUFBZTs7Ozs7Ozs7Ozs7Ozs7OztpQ0NkRixxQkFBcUI7Ozs7cUNBQ2pCLHlCQUF5Qjs7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RUFBSTtBQUNqQixRQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzNCLEtBQUssR0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQzNCLElBQUksR0FBUSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3hCLENBQUMsWUFBQSxDQUFDOztBQUVGLFdBQU8sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDOztBQUV2QixTQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDM0IsYUFBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUM7R0FDRjtDQUNGLENBQUE7O3FCQUVjLG1CQUFtQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVGFibGVDb21wb25lbnRDb250cm9sbGVyIGZyb20gJy4vdGFibGVfY29tcG9uZW50X2NvbnRyb2xsZXInO1xuaW1wb3J0IFRhYmxlQ29tcG9uZW50Vmlld3MgZnJvbSAnLi90YWJsZV9jb21wb25lbnRfdmlld3MnO1xuaW1wb3J0IFNjcmVlbkNhbHVsYXRvciBmcm9tICcuL3NjcmVlbl9jYWxjdWxhdG9yJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBUYWJsZUNvbXBvbmVudENvbnRyb2xsZXI6IFRhYmxlQ29tcG9uZW50Q29udHJvbGxlcixcbiAgVGFibGVDb21wb25lbnRWaWV3czogICAgICBUYWJsZUNvbXBvbmVudFZpZXdzLFxuICBTY3JlZW5DYWx1bGF0b3I6ICAgICAgICAgIFNjcmVlbkNhbHVsYXRvclxufTtcbiIsImxldCB3aW4gICAgICAgICA9IHdpbmRvdztcbmxldCBkb2MgICAgICAgICA9IGRvY3VtZW50O1xubGV0IGRvY0VsZW1lbnQgID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xubGV0IGJvZHlFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcblxubGV0IFNjcmVlbkNhbHVsYXRvciA9IHtcbiAgd2lkdGg6ICgpPT4ge1xuICAgIHJldHVybiB3aW4uaW5uZXJXaWR0aCB8fCBkb2NFbGVtZW50LmNsaWVudFdpZHRoIHx8IGJvZHlFbGVtZW50LmNsaWVudFdpZHRoO1xuICB9LFxuICBoZWlnaHQ6ICgpPT4ge1xuICAgIHJldHVybiB3aW4uaW5uZXJIZWlnaHQgfHwgZG9jRWxlbWVudC5jbGllbnRIZWlnaHQgfHwgYm9keUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTY3JlZW5DYWx1bGF0b3I7XG4iLCJpbXBvcnQgU2NyZWVuQ2FsdWxhdG9yIGZyb20gJy4vc2NyZWVuX2NhbGN1bGF0b3InO1xuaW1wb3J0IFRhYmxlQ29tcG9uZW50Vmlld3MgZnJvbSAnLi90YWJsZV9jb21wb25lbnRfdmlld3MnO1xuXG5jbGFzcyBUYWJsZUNvbXBvbmVudENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5jdXN0b21Nb2JpbGVSZXR1cm4gID0gb3B0aW9ucy5tb2JpbGVDYWxsYmFjayB8fCBmYWxzZTtcbiAgICB0aGlzLmN1c3RvbURlc2t0b3BSZXR1cm4gPSBvcHRpb25zLmRlc2t0b3BDYWxsYmFjayB8fCBmYWxzZTtcbiAgICB0aGlzLmVsZW1lbnQgICAgICAgICAgICAgPSBvcHRpb25zLmVsZW1lbnQ7XG4gICAgdGhpcy50YWJsZUNhY2hlICAgICAgICAgID0gb3B0aW9ucy5lbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICB0aGlzLmJyZWFrUG9pbnQgICAgICAgICAgPSBvcHRpb25zLmJyZWFrUG9pbnQ7XG4gICAgdGhpcy5kZXNrdG9wVmlldyAgICAgICAgID0gdHJ1ZTtcblxuICAgIHRoaXMuYWRqdXN0VmlldygpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmFkanVzdFZpZXcuYmluZCh0aGlzKSk7XG4gIH1cblxuICBhZGp1c3RWaWV3KCkge1xuICAgIGlmKFNjcmVlbkNhbHVsYXRvci53aWR0aCgpIDw9IHRoaXMuYnJlYWtQb2ludCkge1xuICAgICAgdGhpcy5zd2l0Y2hUb01vYmlsZSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuc3dpdGNoVG9EZXNrdG9wKCk7XG4gICAgfVxuICB9XG5cbiAgc3dpdGNoVG9Nb2JpbGUoKSB7XG4gICAgaWYodGhpcy5kZXNrdG9wVmlldykge1xuICAgICAgdGhpcy5kZXNrdG9wVmlldyA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlTW9iaWxlVmlldygpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU1vYmlsZVZpZXcoKSB7XG4gICAgaWYoIXRoaXMubW9iaWxlQ2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBUYWJsZUNvbXBvbmVudFZpZXdzLmNhcmRzKHRoaXMuZWxlbWVudCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubW9iaWxlQ2FsbGJhY2sodGhpcy5lbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBzd2l0Y2hUb0Rlc2t0b3AoKSB7XG4gICAgaWYoIXRoaXMuZGVza3RvcFZpZXcpIHtcbiAgICAgIHRoaXMuZGVza3RvcFZpZXcgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlRGVza3RvcFZpZXcoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVEZXNrdG9wVmlldygpIHtcbiAgICBpZighdGhpcy5kZXNrdG9wQ2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBUYWJsZUNvbXBvbmVudFZpZXdzLmNhY2hlZCh0aGlzLmVsZW1lbnQsIHRoaXMudGFibGVDYWNoZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZGVza3RvcENhbGxiYWNrKHRoaXMuZWxlbWVudCwgdGhpcy50YWJsZUNhY2hlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVDb21wb25lbnRDb250cm9sbGVyO1xuIiwiZnVuY3Rpb24gX3RoZWFkKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RoZWFkJylbMF07XG59XG5cbmZ1bmN0aW9uIF90Ym9keShlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0Ym9keScpWzBdO1xufVxuXG5mdW5jdGlvbiBfdGZvb3QoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGZvb3QnKVswXTtcbn1cblxuZnVuY3Rpb24gX3Jvd3ModGJvZHkpIHtcbiAgcmV0dXJuIHRib2R5LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0cicpO1xufVxuXG5mdW5jdGlvbiBfY2FyZCh0aGVhZCwgcm93KSB7XG4gIGxldCBjYXJkICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyksXG4gICAgICB0Ym9keSAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JyksXG4gICAgICBoZWFkZXJzICA9IHRoZWFkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0aCcpLFxuICAgICAgZGF0YSAgICAgPSByb3cuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RkJyksXG4gICAgICB4ICAgICAgICA9IDA7XG5cbiAgZm9yKHg7IHg8ZGF0YS5sZW5ndGg7IHgrKykge1xuICAgIGxldCBuZXdSb3cgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKSxcbiAgICAgICAgbmV3RGF0YSA9IGRhdGFbeF0uY2xvbmVOb2RlKHRydWUpLFxuICAgICAgICBoZWFkZXIgID0gaGVhZGVyc1t4XS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICBoZWFkZXIuc2V0QXR0cmlidXRlKCdzY29wZScsICdyb3cnKTtcbiAgICBuZXdSb3cuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBuZXdSb3cuYXBwZW5kQ2hpbGQobmV3RGF0YSk7XG4gICAgdGJvZHkuYXBwZW5kQ2hpbGQobmV3Um93KTtcbiAgfVxuXG4gIGNhcmQuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0YWJsZScpO1xuICBjYXJkLmFwcGVuZENoaWxkKHRib2R5KTtcblxuICByZXR1cm4gY2FyZDtcbn1cblxubGV0IFRhYmxlQ29tcG9uZW50Vmlld3MgPSAge1xuICBjYWNoZWQ6IChlbGVtZW50LCBjYWNoZWQpPT4ge1xuICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY2FjaGVkLmlubmVySFRNTDtcbiAgfSxcblxuICBjYXJkczogKGVsZW1lbnQpPT4ge1xuICAgIGxldCB0aGVhZCA9IF90aGVhZChlbGVtZW50KSxcbiAgICB0Ym9keSAgICAgPSBfdGJvZHkoZWxlbWVudCksXG4gICAgcm93cyAgICAgID0gX3Jvd3ModGJvZHkpLFxuICAgIHg7XG5cbiAgICBlbGVtZW50LmlubmVySFRNTCA9ICcnO1xuXG4gICAgZm9yKHg9MDsgeDxyb3dzLmxlbmd0aDsgeCsrKSB7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKF9jYXJkKHRoZWFkLCByb3dzW3hdKSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlQ29tcG9uZW50Vmlld3M7XG4iXX0=
