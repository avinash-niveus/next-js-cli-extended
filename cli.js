#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs-extra');
const { checkPackageJsonDependencies } = require('./src/cli/utils');
const {
  askAppName,
  askIncludeMUI,
  askIncludeMUIAtoms,
  askIncludeTests,
  askIncludeRedux,
} = require('./src/cli/prompts');
const { createNextApp, getFileExtension } = require('./src/cli/nextApp');
const { addMUI } = require('./src/cli/mui');
const { setupTests } = require('./src/cli/tests');
const { setupPrettier } = require('./src/cli/prettier');
const {
  createBaseDirectoryStructure,
} = require('./src/cli/directoryStructure');
const { setupRedux } = require('./src/cli/redux');
program
  .version('1.0.0')
  .description(
    'A CLI tool to create web apps with custom options (based on create-next-app).',
  )
  .argument('[appName]', 'The name of your application (optional)')
  .action(async (appName) => {
    const appNameFinal = await askAppName(appName);
    if (!appNameFinal) {
      console.error(
        'App name is required. Please provide it as an argument or through the prompt.',
      );
      process.exit(1);
    }

    const projectPath = await createNextApp(appNameFinal);
    const fileExtension = getFileExtension(projectPath);
    const isTypeScript = fileExtension === 'tsx';

    await createBaseDirectoryStructure(projectPath, isTypeScript);

    const tailwindConfigExists = fs.existsSync(
      path.join(projectPath, 'tailwind.config.js'),
    );
    const postcssConfigExists = fs.existsSync(
      path.join(projectPath, 'postcss.config.js'),
    );
    const hasTailwindInstalled = checkPackageJsonDependencies(
      projectPath,
      'tailwindcss',
    );

    const usesTailwind =
      tailwindConfigExists && postcssConfigExists && hasTailwindInstalled;

    let includeMUI = false;
    if (!usesTailwind) {
      includeMUI = await askIncludeMUI();
    }

    let includeMUIAtoms = false;
    if (includeMUI) {
      includeMUIAtoms = await askIncludeMUIAtoms();
    }

    const includeTests = await askIncludeTests();
    const includeRedux = await askIncludeRedux();

    console.log('\nApplying selected options...');

    if (includeMUI) {
      await addMUI(projectPath, includeMUIAtoms, fileExtension, isTypeScript);
    }

    if (includeRedux) {
      await setupRedux(projectPath, fileExtension);
    }

    // Handle _app.js content based on selections
    const srcDirExists = fs.existsSync(path.join(projectPath, 'src'));
    const appFile = path.join(
      projectPath,
      srcDirExists ? 'src/pages' : 'pages',
      `_app.${fileExtension}`,
    );

    if (fs.existsSync(appFile)) {
      let finalImports = '';
      let finalContent = '<Component {...pageProps} />';
      const appPropsImport = isTypeScript
        ? `import type { AppProps } from 'next/app';\n`
        : '';
      const propsType = isTypeScript
        ? `{ Component, pageProps }: AppProps`
        : `{ Component, pageProps }`;

      if (includeMUI && includeRedux) {
        finalImports = `${appPropsImport}import { ThemeProvider, createTheme } from '@mui/material/styles';\nimport CssBaseline from '@mui/material/CssBaseline';\nimport { Provider } from 'react-redux';\nimport { store } from '../../src/store/store';\n`;
        finalContent = `
const theme = createTheme();

export default function MyApp(${propsType}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}
        `;
      } else if (includeMUI) {
        finalImports = `${appPropsImport}import { ThemeProvider, createTheme } from '@mui/material/styles';\nimport CssBaseline from '@mui/material/CssBaseline';\n`;
        finalContent = `
const theme = createTheme();

export default function MyApp(${propsType}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
        `;
      } else if (includeRedux) {
        finalImports = `${appPropsImport}import { Provider } from 'react-redux';\nimport { store } from '../../src/store/store';\n`;
        finalContent = `
export default function MyApp(${propsType}) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
        `;
      }

      if (includeMUI || includeRedux) {
        fs.writeFileSync(
          appFile,
          `${finalImports.trim()}\n\n${finalContent.trim()}\n`,
        );
      }
    } else {
      console.warn(`Could not find _app.${fileExtension} to update.`);
    }

    if (includeTests) {
      await setupTests(projectPath, fileExtension, isTypeScript);
    }

    await setupPrettier(projectPath);

    console.log('\nYour app has been created with the selected options!');
    console.log(`Navigate to the project directory: cd ${appNameFinal}`);
    console.log('Run `npm install` if you skipped it during setup.');
    console.log('Then run `npm run dev` to start the development server.');
  });

program.parse(process.argv);
