const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
  const file = core.getInput('CONTENT_FILEPATH');
  const json = fs.readFileSync(file);

  core.setOutput("json", JSON.stringify(JSON.parse(json), null, 2));
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
