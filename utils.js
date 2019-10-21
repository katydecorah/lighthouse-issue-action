const fs = require('fs');
const core = require('@actions/core');

function evalScore(score) {
  return `${score < 0.75 ? '🚨' : ''}${score * 100.0}%`;
}

function markdownMe(files) {
  const buildMd = files.reduce(
    (obj, file) => {
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
        obj.failing.push(`### ${url}\n\nCategory | Score
---|---
Performance | ${evalScore(perf)}
Accessibility | ${evalScore(accessibility)}
Best practices | ${evalScore(bestPractices)}
SEO | ${evalScore(seo)}`);
      } else {
        obj.passing.push(
          `* ${url}\n  Performance (${evalScore(
            perf
          )}), Accessibility (${evalScore(
            accessibility
          )}), Best practices (${evalScore(bestPractices)}), SEO (${evalScore(
            seo
          )})`
        );
      }
      return obj;
    },
    { failing: [], passing: [] }
  );

  if (buildMd.failing.length) {
    core.exportVariable('create_issue', true);
  }

  return `# Lighthouse audit

## Failing pages

${
    buildMd.failing.length
      ? buildMd.failing.join('\n\n')
      : 'No failing pages.'
  }

## Passing pages

${buildMd.passing.length ? buildMd.passing.join('\n') : 'No passing pages.'}`;
}

module.exports = {
  evalScore,
  markdownMe
};
