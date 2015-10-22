let win         = window;
let doc         = document;
let docElement  = document.documentElement;
let bodyElement = document.getElementsByTagName('body')[0];

let ScreenCalulator = {
  width: ()=> {
    return win.innerWidth || docElement.clientWidth || bodyElement.clientWidth;
  },
  height: ()=> {
    return win.innerHeight || docElement.clientHeight || bodyElement.clientHeight;
  }
};

export default ScreenCalulator;
