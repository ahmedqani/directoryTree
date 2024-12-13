class Directory {
  constructor(name, parent = null) {
    this.name = name;
    this.parent = parent;
    this.children = new Map();
  }

  addChild(name) {
    const child = new Directory(name, this);
    this.children.set(name, child);
    return child;
  }

  removeChild(name) {
    return this.children.delete(name);
  }

  getChild(name) {
    return this.children.get(name);
  }

  hasChild(name) {
    return this.children.has(name);
  }

  getPath() {
    const path = [];
    let current = this;
    while (current) {
      path.unshift(current.name);
      current = current.parent;
    }
    return path.join("/");
  }
}

module.exports = Directory;
