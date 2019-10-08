const core = require('@actions/core');
const github = require('@actions/github');
const { writeFile } = require('fs').promises
const fs = require('fs');
const { join } = require('path')

async function main(score) {
  const path = join(process.cwd(), 'scores.md')
  await writeFile(path, `## Scores\n\n${scores}`)
}

function evalScore(score) {
  return `(${score < .75 ? '🚨 ' : ''}) ${score}`;
}

try {
  const file = core.getInput('CONTENT_FILEPATH');
  const json = JSON.parse(fs.readFileSync(file));

  const OUTPUT_FOLDER="report";
  const OUTPUT_PATH=`${process.env.GITHUB_WORKSPACE}/${OUTPUT_FOLDER}/scores.json`;
  const scores = json.categories;

  const score = `Category | Score
---|---
Performance | ${evalScore(scores.performance.score)}
Accessibility | ${evalScore(scores.accessibility.score)}
Best practices | ${evalScore(scores['best-practices'].score)}
SEO | ${evalScore(scores.seo.score)}`

  main(score).catch(err => {
      core.setFailed(err.message);
      process.exit(1);
    }).then(() => {
    console.log(`done in ${process.uptime()}s`);
    process.exit();
  })


} catch (error) {
  core.setFailed(error.message);
}
