const fs = require("fs");
const CommandProcessor = require("./CommandProcessor");

function main() {
  const processor = new CommandProcessor();

  // Read input from stdin or file
  const input = process.argv[2]
    ? fs.readFileSync(process.argv[2], "utf8")
    : `CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
DELETE fruits/apples
DELETE foods/fruits/apples
LIST`;

  processor.processInput(input);
}

if (require.main === module) {
  main();
}

module.exports = {
  Directory: require("./models/Directory"),
  FileSystem: require("./FileSystem"),
  CommandProcessor,
};
