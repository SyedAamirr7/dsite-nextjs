const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, '..', 'src', 'generated');
const dest = path.join(__dirname, '..', 'dist', 'generated');
if (fs.existsSync(src)) {
  try {
    fs.cpSync(src, dest, { recursive: true });
    console.log('Copied src/generated to dist/generated');
  } catch (err) {
    if (err.code === 'EPERM' || err.code === 'EPIPE' || err.errno === 32) {
      console.warn('Warning: could not copy generated (file in use). Stop "npm run dev" then run build again.');
    } else {
      throw err;
    }
  }
}
