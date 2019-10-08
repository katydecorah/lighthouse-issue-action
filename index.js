const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
  const file = core.getInput('CONTENT_FILEPATH');
  const json = JSON.parse(fs.readFileSync(file));

  const scores = {
    performance: json.categories.performance.score,
    accessibility: json.categories.accessibility.score,
    'best-practices': json.categories['best-practices'].score,
    seo: json.categories[seo].score
  };

  core.setOutput("json", scores);

} catch (error) {
  core.setFailed(error.message);
}
