const core = require('@actions/core');
const github = require('@actions/github');
const { writeFile } = require('fs').promises
const fs = require('fs');

async function main(scores) {
  await writeFile('./report/scores.json', scores)
}

try {
  const file = core.getInput('CONTENT_FILEPATH');
  const json = JSON.parse(fs.readFileSync(file));

  const OUTPUT_FOLDER="report";
  const OUTPUT_PATH=`${process.env.GITHUB_WORKSPACE}/${OUTPUT_FOLDER}/scores.json`;

  const scores = {
    performance: json.categories.performance.score,
    accessibility: json.categories.accessibility.score,
    'best-practices': json.categories['best-practices'].score,
    seo: json.categories.seo.score
  };

  core.setOutput("json", JSON.stringify(scores));

  main();


} catch (error) {
  core.setFailed(error.message);
}
