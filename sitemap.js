const core = require('@actions/core');
const github = require('@actions/github');
const { writeFile } = require('fs').promises;
const fs = require('fs');
const path = require('path');
const { join } = require('path');



try {
      core.setOutput('urls', `https://katydecorah.com/
https://katydecorah.com/playlists/2019-summer/
https://katydecorah.com/epicurean/cowboy-cookie-ice-cream/
https://katydecorah.com/code/google-sheets-to-gmail-template/`);
      process.exit(1);


} catch (error) {
  core.setFailed(error.message);
}
