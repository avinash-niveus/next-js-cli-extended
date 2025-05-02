const path = require('path');
const fs = require('fs-extra');

function checkPackageJsonDependencies(projectPath, dependencyName) {
  try {
    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);
    return (
      (packageJson.dependencies && packageJson.dependencies[dependencyName]) ||
      (packageJson.devDependencies &&
        packageJson.devDependencies[dependencyName])
    );
  } catch (error) {
    return false;
  }
}

module.exports = { checkPackageJsonDependencies };
