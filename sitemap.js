const core = require('@actions/core');




try {
  core.exportVariable('url', 'https://katydecorah.com');
} catch (error) {
  core.setFailed(error.message);
}
