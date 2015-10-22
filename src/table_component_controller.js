import ScreenCalulator from './screen_calculator';
import TableComponentViews from './table_component_views';

class TableComponentController {
  constructor(options) {
    this.customMobileReturn  = options.mobileCallback || false;
    this.customDesktopReturn = options.desktopCallback || false;
    this.element             = options.element;
    this.tableCache          = options.element.cloneNode(true);
    this.breakPoint          = options.breakPoint;
    this.desktopView         = true;

    this.adjustView();
    window.addEventListener('resize', this.adjustView.bind(this));
  }

  adjustView() {
    if(ScreenCalulator.width() <= this.breakPoint) {
      this.switchToMobile();
    }
    else {
      this.switchToDesktop();
    }
  }

  switchToMobile() {
    if(this.desktopView) {
      this.desktopView = false;
      return this.handleMobileView();
    }
  }

  handleMobileView() {
    if(!this.mobileCallback) {
      return TableComponentViews.cards(this.element);
    }
    else {
      return this.mobileCallback(this.element);
    }
  }

  switchToDesktop() {
    if(!this.desktopView) {
      this.desktopView = true;
      return this.handleDesktopView();
    }
  }

  handleDesktopView() {
    if(!this.desktopCallback) {
      return TableComponentViews.cached(this.element, this.tableCache);
    }
    else {
      return this.desktopCallback(this.element, this.tableCache);
    }
  }
}

export default TableComponentController;
