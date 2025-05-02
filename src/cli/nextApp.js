const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

async function createNextApp(appName) {
  console.log(`\nCreating app: ${appName}`);
  execSync(`npx create-next-app ${appName}`, { stdio: 'inherit' });
  const projectPath = path.join(process.cwd(), appName);
  process.chdir(projectPath);
  return projectPath;
}

function getFileExtension(projectPath) {
  const isTypeScript = fs.existsSync(path.join(projectPath, 'tsconfig.json'));
  return isTypeScript ? 'tsx' : 'js';
}

module.exports = { createNextApp, getFileExtension };
