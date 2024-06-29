const fs = require('fs-extra');
const path = require('path');

const outputFile = path.join(process.cwd(), 'README.md');
const excludeDirs = ['.next', 'analyze', 'node_modules', '.git'];

// Function to generate the directory structure
function generateStructure(dir, prefix = '', buffer = []) {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    if (excludeDirs.includes(item)) {
      return;
    }
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
      buffer.push(`${prefix}├── ${item}/`);
      generateStructure(itemPath, `${prefix}│   `, buffer);
    } else {
      buffer.push(`${prefix}├── ${item}`);
    }
  });
  return buffer;
}

// Start from the current directory
const structure = ['my-blog/'];
generateStructure(process.cwd(), '', structure);

// Write the structure to the README.md file
fs.writeFileSync(outputFile, structure.join('\n'), 'utf-8');
console.log('Project structure written to README.md');
