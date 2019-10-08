const core = require('@actions/core');
const github = require('@actions/github');
const { writeFile } = require('fs').promises
const fs = require('fs');
const { join } = require('path')

async function main(scores) {
  const path = join(process.cwd(), 'scores.md')
  await writeFile(path, `## Scores\n\n${scores}`)
}

try {
  const file = core.getInput('CONTENT_FILEPATH');
  const json = JSON.parse(fs.readFileSync(file));

  const OUTPUT_FOLDER="report";
  const OUTPUT_PATH=`${process.env.GITHUB_WORKSPACE}/${OUTPUT_FOLDER}/scores.json`;

  const scores = `Category | Score
---|---
Performance | ${json.categories.performance.score}
Accessibility | ${json.categories.accessibility.score}
Best practices | ${json.categories['best-practices'].score}
SEO | ${json.categories.seo.score}`

  main(scores).catch(err => {
      core.setFailed(err.message);
      process.exit(1);
    }).then(() => {
    console.log(`done in ${process.uptime()}s`);
    process.exit();
  })


} catch (error) {
  core.setFailed(error.message);
}
