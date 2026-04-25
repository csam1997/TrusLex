const path = require('path');

module.exports = {
  testDir: path.join(__dirname, 'tests'),
  timeout: 120000,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    browserName: 'chromium',
    headless: true,
  },
  webServer: {
    command: 'python -m http.server 4173',
    cwd: __dirname,
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    timeout: 120000,
  },
};
