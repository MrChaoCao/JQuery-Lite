const DOMNodeCollection = require('./dom_node_collection');

Window.prototype.$l = function (arg) {


  if (arg instanceof NodeList) {

    const arrayOfNodes = Array.from(arg);
    return new DOMNodeCollection(arrayOfNodes);
  } else {
    const arrayOfNodes = Array.from(document.querySelectorAll(arg));
    return new DOMNodeCollection(arrayOfNodes);
  }
  //in case of css selectors do nothing!

};


//
// const $l = function (arg) {
//   // return Array.from(document.querySelectorAll(arg));
// };
