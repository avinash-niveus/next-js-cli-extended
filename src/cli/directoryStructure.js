const path = require('path');
const fs = require('fs-extra');

async function createBaseDirectoryStructure(projectPath, isTypeScript) {
  console.log('Creating base directory structure...');

  const srcDir = path.join(projectPath, 'src');
  const constantsDir = path.join(srcDir, 'constants');
  const servicesDir = path.join(srcDir, 'services');
  const assetsDir = path.join(srcDir, 'assets');
  const fontsDir = path.join(srcDir, 'fonts');
  const utilsDir = path.join(srcDir, 'utils');
  const hooksDir = path.join(srcDir, 'hooks');
  const componentsDir = path.join(srcDir, 'components');
  const atomsDir = path.join(componentsDir, 'atoms');
  const moleculesDir = path.join(componentsDir, 'molecules');
  const organismsDir = path.join(componentsDir, 'organisms');
  const templatesDir = path.join(componentsDir, 'templates');

  fs.ensureDirSync(constantsDir);
  fs.ensureDirSync(servicesDir);
  fs.ensureDirSync(assetsDir);
  fs.ensureDirSync(fontsDir);
  fs.ensureDirSync(utilsDir);
  fs.ensureDirSync(hooksDir);
  fs.ensureDirSync(atomsDir);
  fs.ensureDirSync(moleculesDir);
  fs.ensureDirSync(organismsDir);
  fs.ensureDirSync(templatesDir);

  if (isTypeScript) {
    const interfacesDir = path.join(srcDir, 'interfaces');
    fs.ensureDirSync(interfacesDir);
  }
}

module.exports = { createBaseDirectoryStructure };
