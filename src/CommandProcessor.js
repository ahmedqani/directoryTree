const FileSystem = require("./FileSystem");

class CommandProcessor {
  constructor() {
    this.fileSystem = new FileSystem();
  }

  processCommand(command) {
    const [action, ...args] = command.trim().split(" ");

    console.log(command);

    switch (action) {
      case "CREATE":
        this.fileSystem.create(args[0]);
        break;
      case "MOVE":
        this.fileSystem.move(args[0], args[1]);
        break;
      case "DELETE":
        this.fileSystem.delete(args[0]);
        break;
      case "LIST":
        this.fileSystem.list();
        break;
      default:
        console.log(`Unknown command: ${action}`);
    }
  }

  processInput(input) {
    const commands = input.trim().split("\n");
    for (const command of commands) {
      this.processCommand(command);
    }
  }
}

module.exports = CommandProcessor;
