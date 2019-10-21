const utils = require('../utils');

test('markdownMe', () => {
  expect(
    utils.markdownMe([
      './test/files/1.json',
      './test/files/2.json',
      './test/files/3.json',
      './test/files/4.json'
    ])
  ).toEqual(`# Lighthouse audit

## Failing pages

### https://staticmapmaker.com/one/

Category | Score
---|---
Performance | 75%
Accessibility | 🚨74%
Best practices | 100%
SEO | 🚨0%

### https://staticmapmaker.com/two/

Category | Score
---|---
Performance | 100%
Accessibility | 100%
Best practices | 100%
SEO | 🚨0%

## Passing pages

* https://staticmapmaker.com/three/
  Performance (100%), Accessibility (100%), Best practices (100%), SEO (100%)
* https://staticmapmaker.com/four/
  Performance (75%), Accessibility (75%), Best practices (75%), SEO (75%)`);

  expect(utils.markdownMe(['./test/files/1.json', './test/files/2.json']))
    .toEqual(`# Lighthouse audit

## Failing pages

### https://staticmapmaker.com/one/

Category | Score
---|---
Performance | 75%
Accessibility | 🚨74%
Best practices | 100%
SEO | 🚨0%

### https://staticmapmaker.com/two/

Category | Score
---|---
Performance | 100%
Accessibility | 100%
Best practices | 100%
SEO | 🚨0%

## Passing pages

No passing pages.`);

  expect(utils.markdownMe(['./test/files/3.json', './test/files/4.json']))
    .toEqual(`# Lighthouse audit

## Failing pages

No failing pages.

## Passing pages

* https://staticmapmaker.com/three/
  Performance (100%), Accessibility (100%), Best practices (100%), SEO (100%)
* https://staticmapmaker.com/four/
  Performance (75%), Accessibility (75%), Best practices (75%), SEO (75%)`);
});
