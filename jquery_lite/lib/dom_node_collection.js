class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(sInput) {
    if (sInput === undefined) {
      return this.nodes[0].innerHTML;
    } else {
       this.nodes.forEach((node) => {
        node.innerHTML = sInput;
      });
    }
  }

  empty() {
    this.html("");
  }

  append(input) {
    if (typeof input === 'string') {
      this.nodes.forEach((node) => {
       node.innerHTML = node.innerHTML + input;
     });
   } else if(input instanceof HTMLElement){
     this.nodes.forEach((node) => {
       node.innerHTML = node.innerHTML + input.outerHTML;
     });
   } else if(input instanceof DOMNodeCollection) {
     this.nodes.forEach((node) => {
       node.innerHTML = node.innerHTML + input.nodes[0].outerHTML;
     });
   }
  }

  attr(name, val) {
    if (val === undefined) {
      // console.log(this.nodes[0].attributes);
      return this.nodes[0].getAttribute(name);

    } else {
      this.nodes[0].setAttribute(name, val);
      return this.nodes;
    }
  }

  children(){
    let children = [];
    this.nodes.forEach((node) => {
      children = children.concat(Array.from(node.children));
    });

    const domChildren = new DOMNodeCollection(children);
    return domChildren;
  }
}

module.exports = DOMNodeCollection;


//So: our core function can receive either a single HTMLElement or a
//string with a CSS selector and in either case the return value will be a DOMNodeCollection.

// All the methods we implement will be applied to every node in the internal array.
