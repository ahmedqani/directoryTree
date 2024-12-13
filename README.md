# Directory Tree Implementation

A Node.js implementation of a hierarchical directory management system.

## Requirements

- Node.js 14.x or higher

## Installation

```bash
git clone <repository-url>
cd directoryTree
npm install
```

## Usage

You can run the program in two ways:

1. With default input:

```bash
node src/index.js
```

2. With a custom input file:

```bash
node src/index.js input.txt
```

The input file should contain commands in the following format:

- CREATE path/to/directory
- MOVE source/path target/path
- DELETE path/to/directory
- LIST
