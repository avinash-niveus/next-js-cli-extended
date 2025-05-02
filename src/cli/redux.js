// redux.js
const { execSync } = require('child_process'); // Import execSync
const path = require('path');
const fs = require('fs-extra');

async function setupRedux(projectPath, fileExtension) {
  console.log('Setting up Redux Toolkit...');
  execSync('npm install @reduxjs/toolkit react-redux', { stdio: 'inherit' });

  const storeDir = path.join(projectPath, 'src', 'store');
  const slicesDir = path.join(storeDir, 'slices');
  fs.ensureDirSync(storeDir);
  fs.ensureDirSync(slicesDir);

  const storeContent = `import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});

// Infer the \`RootState\` and \`AppDispatch\` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
`;
  fs.writeFileSync(path.join(storeDir, `store.${fileExtension}`), storeContent);

  console.log('Updating _app.js to include Redux Provider...');
  const srcDirExists = fs.existsSync(path.join(projectPath, 'src'));
  const appFile = path.join(
    projectPath,
    srcDirExists ? 'src/pages' : 'pages',
    `_app.${fileExtension}`,
  );

  if (fs.existsSync(appFile)) {
    const { imports, content } = generateReduxAppContent(fileExtension);
    fs.writeFileSync(appFile, `${imports}\n${content.trim()}\n`);
  } else {
    console.warn(`Could not find _app.${fileExtension} to apply Redux.`);
  }
}

module.exports = { setupRedux, generateReduxAppContent };
