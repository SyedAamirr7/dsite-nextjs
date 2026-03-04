const { execSync } = require('child_process');
const path = require('path');

const root = path.join(__dirname, '..');
execSync('nest build', { cwd: root, stdio: 'inherit' });
require('./copy-prisma.js');
