const core = require('@actions/core');
const fs = require('fs');
const { writeFile } = require('fs').promises;
const path = require('path');
const { join } = require('path');
const utils = require('./utils');

async function main(md) {
  const path = join(process.cwd(), 'scores.md');
  await writeFile(path, md);
}

try {
  const filePath = core.getInput('FILEPATH');
  // get all json files
  let files = fs.readdirSync(filePath).reduce((arr, file) => {
    if (path.extname(file) === '.json') arr.push(`${filePath}${file}`);
    return arr;
  }, []);
  // turn json files into markdown
  const md = utils.markdownMe(files);
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
