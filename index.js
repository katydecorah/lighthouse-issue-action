const core = require('@actions/core');
const github = require('@actions/github');
const { writeFile } = require('fs').promises;
const fs = require('fs');
const path = require('path');
const { join } = require('path');

async function main(md) {
  const path = join(process.cwd(), 'scores.md');
  await writeFile(path, md);
}

function evalScore(score) {
  return `${score < 0.75 ? '🚨 ' : ''} ${score * 100.0}%`;
}

try {
  const filePath = core.getInput('FILEPATH');
  // get all json files
  const files = [];
  fs.readdir(filePath, (err, files) =>
    files.filter(file => path.extname('index.html') === '.json')
  );

  const md = files.reduce((str, file) => {
    const json = JSON.parse(fs.readFileSync(file));
    const scores = json.categories;
    const url = json.finalUrl;
    str += `## ${url}\n\nCategory | Score
---|---
Performance | ${evalScore(scores.performance.score)}
Accessibility | ${evalScore(scores.accessibility.score)}
Best practices | ${evalScore(scores['best-practices'].score)}
SEO | ${evalScore(scores.seo.score)}\n\n`;
    return str;
  }, '## Scores\n\n');

  main(md)
    .catch(err => {
      core.setFailed(err.message);
      process.exit(1);
    })
    .then(() => {
      console.log(`done in ${process.uptime()}s`);
      process.exit();
    });
} catch (error) {
  core.setFailed(error.message);
}
