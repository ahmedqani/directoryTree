const Directory = require("./models/Directory");

class FileSystem {
  constructor() {
    this.root = new Directory("root");
  }

  parsePath(path) {
    return path.split("/").filter(Boolean);
  }

  findDirectory(path) {
    const parts = this.parsePath(path);
    let current = this.root;

    for (const part of parts) {
      current = current.getChild(part);
      if (!current) return null;
    }
    return current;
  }

  create(path) {
    const parts = this.parsePath(path);
    let current = this.root;

    for (const part of parts) {
      if (!current.hasChild(part)) {
        current = current.addChild(part);
      } else {
        current = current.getChild(part);
      }
    }
  }

  move(sourcePath, targetPath) {
    const sourceDir = this.findDirectory(sourcePath);
    if (!sourceDir) return false;

    const sourceParent = sourceDir.parent;
    const sourceName = sourceDir.name;

    const targetParentPath = this.parsePath(targetPath);
    const targetParent = this.findDirectory(targetParentPath.join("/"));

    if (!targetParent) return false;

    sourceParent.removeChild(sourceName);
    sourceDir.parent = targetParent;
    targetParent.children.set(sourceName, sourceDir);

    return true;
  }

  delete(path) {
    const parts = this.parsePath(path);
    const dirName = parts.pop();
    const parentPath = parts.join("/");
    const parent = parentPath ? this.findDirectory(parentPath) : this.root;

    if (!parent || !parent.hasChild(dirName)) {
      console.log(`Cannot delete ${path} - ${parts[0]} does not exist`);
      return false;
    }

    return parent.removeChild(dirName);
  }

  list(dir = this.root, depth = 0) {
    if (depth === 0 && dir === this.root) {
      // Skip printing 'root' directory
      for (const child of dir.children.values()) {
        this.list(child, depth);
      }
      return;
    }

    console.log("  ".repeat(depth) + dir.name);
    for (const child of dir.children.values()) {
      this.list(child, depth + 1);
    }
  }
}

module.exports = FileSystem;
