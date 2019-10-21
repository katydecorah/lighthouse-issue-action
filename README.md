# lighthouse-issue-action


Upon receiving a Lighthouse audit(s) from [treosh/lighthouse-ci-action](https://github.com/treosh/lighthouse-ci-action), lighthouse-issue-action parses the scores and generates markdown that can be posted to a GitHub issue to notify you of pages that have low scores.

This action is ideal for auditing pages on a entire website, especially in combination with:

1. [katydecorah/lighthouse-sitemap-action](https://github.com/katydecorah/lighthouse-sitemap-action) - Given a sitemap, returns all the URLs.
2. [treosh/lighthouse-ci-action](https://github.com/treosh/lighthouse-ci-action) - pass the URLs from sitemap to the lightouse-ci-action to perform batch audits.
3. katydecorah/lighthouse-issue-action - Parses scores (this repo).
4. [peter-evans/create-issue-from-file](https://github.com/peter-evans/create-issue-from-file) - Create GitHub issue from a file.

See [lh.yml](.github/workflows/lh.yml) for a live demo.
