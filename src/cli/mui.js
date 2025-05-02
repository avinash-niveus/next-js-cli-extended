const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

async function addMUI(projectPath, includeAtoms, fileExtension, isTypeScript) {
  console.log('Adding MUI...');
  execSync(
    'npm install @mui/material @emotion/styled @emotion/react @mui/icons-material',
    { stdio: 'inherit' },
  );
  execSync('npm install @fontsource/roboto', { stdio: 'inherit' });

  if (includeAtoms) {
    await addMUIAtoms(projectPath, fileExtension, isTypeScript);
  }

  await updateAppFileWithMUI(projectPath, fileExtension);
}

async function addMUIAtoms(projectPath, fileExtension, isTypeScript) {
  console.log('Adding basic MUI atom components...');

  const srcDir = path.join(projectPath, 'src');
  const componentsDir = path.join(srcDir, 'components');
  const atomsDir = path.join(componentsDir, 'atoms');
  const interfacesDir = isTypeScript ? path.join(srcDir, 'interfaces') : null;

  if (interfacesDir) {
    fs.ensureDirSync(interfacesDir);
  }

  const atoms = [
    { name: 'AtomButton', hasInterface: true },
    { name: 'AtomInput', hasInterface: true },
    { name: 'AtomLink', hasInterface: true },
    { name: 'AtomImage', hasInterface: true },
    { name: 'AtomDialog', hasInterface: true },
    { name: 'AtomLoader', hasInterface: true },
    { name: 'AtomRadio', hasInterface: true },
    { name: 'AtomTooltip', hasInterface: true },
  ];

  for (const atom of atoms) {
    const interfaceName = atom.hasInterface ? atom.name + 'Props' : null;
    const interfaceImport = interfaceName
      ? `import type { ${interfaceName} } from '../../interfaces/${atom.name}';\n`
      : '';
    const typeDefinition =
      isTypeScript && interfaceName ? `: React.FC<${interfaceName}>` : '';

    const content = isTypeScript
      ? `${interfaceImport}import { ${atom.name.replace(
          'Atom',
          '',
        )} } from '@mui/material';

const ${atom.name}${typeDefinition} = ({ children, ...props }) => {
  return <${atom.name.replace(
    'Atom',
    '',
  )} {...props}>{children}</${atom.name.replace('Atom', '')}>;
};

export default ${atom.name};
`
      : `import { ${atom.name.replace('Atom', '')} } from '@mui/material';

const ${atom.name} = ({ children, ...props }) => {
  return <${atom.name.replace(
    'Atom',
    '',
  )} {...props}>{children}</${atom.name.replace('Atom', '')}>;
};

export default ${atom.name};
`;
    fs.writeFileSync(
      path.join(atomsDir, `${atom.name}.${fileExtension}`),
      content,
    );

    if (isTypeScript && atom.hasInterface) {
      let interfaceContent = `import { ${atom.name.replace(
        'Atom',
        '',
      )}Props } from '@mui/material';\n`;
      interfaceContent += `export interface ${interfaceName} extends ${atom.name.replace(
        'Atom',
        '',
      )}Props {\n`;
      interfaceContent += `  // Add any custom props here\n`;
      interfaceContent += `}\n`;
      fs.writeFileSync(
        path.join(interfacesDir, `${atom.name}.ts`),
        interfaceContent,
      );
    }
  }
}

async function addMUI(projectPath, includeAtoms, fileExtension, isTypeScript) {
  console.log('Adding MUI...');
  execSync(
    'npm install @mui/material @emotion/styled @emotion/react @mui/icons-material',
    { stdio: 'inherit' },
  );
  execSync('npm install @fontsource/roboto', { stdio: 'inherit' });

  if (includeAtoms) {
    await addMUIAtoms(projectPath, fileExtension, isTypeScript);
  }

  const srcDirExists = fs.existsSync(path.join(projectPath, 'src'));
  const appFile = path.join(
    projectPath,
    srcDirExists ? 'src/pages' : 'pages',
    `_app.${fileExtension}`,
  );

  if (fs.existsSync(appFile)) {
    const { imports, content } = generateMUIAppContent(fileExtension);
    fs.writeFileSync(appFile, `${imports}\n${content.trim()}\n`);
  } else {
    console.warn(`Could not find _app.${fileExtension} to apply MUI.`);
  }
}

module.exports = { addMUI, generateMUIAppContent };
