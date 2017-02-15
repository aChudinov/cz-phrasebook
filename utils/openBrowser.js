import { execSync } from 'child_process';
import opn from 'opn';

module.exports = function openBrowser(url) {
  if (process.platform === 'darwin') {
    try {
      // Try our best to reuse existing tab
      // on OS X Google Chrome with AppleScript
      execSync('ps cax | grep "Google Chrome"');
      execSync(
        `osascript openChrome.applescript ${url}`,
        { cwd: __dirname, stdio: 'ignore' }
      );
    } catch (err) {
      // Ignore errors.
    }
  }

  // Fallback to opn
  // (It will always open new tab)
  try {
    opn(url).catch(() => {}); // Prevent `unhandledRejection` error.
  } catch (err) {
    return;
  }
};
