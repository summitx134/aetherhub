const { spawn } = require('child_process');
const path = require('path');

const vitePath = path.resolve(__dirname, 'node_modules/vite/bin/vite.js');
const p = spawn(process.execPath, [vitePath, '--port', '9876'], {
  stdio: 'inherit'
});

p.on('exit', (code) => {
  process.exit(code || 0);
});
