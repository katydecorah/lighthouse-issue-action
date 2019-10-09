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
  let files = fs.readdirSync(filePath).reduce((arr, file) => {
    if (path.extname(file) === '.json') arr.push(`${filePath}${file}`);
    return arr;
  }, []);

  const md = files.reduce((str, file) => {
    const json = JSON.parse(fs.readFileSync(file));

    const scores = json.categories;
    const perf = scores.performance.score;
    const accessibility = scores.accessibility.score;
    const bestPractices = scores['best-practices'].score;
    const seo = scores.seo.score;
    const url = json.finalUrl;

    if (
      perf < 0.75 ||
      accessibility < 0.75 ||
      bestPractices < 0.75 ||
      seo < 0.75
    ) {
      str += `### Page: ${url}\n\nCategory | Score
  ---|---
  Performance | ${evalScore(perf)}
  Accessibility | ${evalScore(accessibility)}
  Best practices | ${evalScore(bestPractices)}
  SEO | ${evalScore(seo)}\n\n`;
    }

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
