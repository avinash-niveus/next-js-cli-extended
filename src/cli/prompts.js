const prompts = require('prompts');

async function askAppName(existingAppName) {
  if (!existingAppName) {
    const { appName } = await prompts({
      type: 'text',
      name: 'appName',
      message: 'What is the name of your application?',
      validate: (value) => value.trim() !== '' || 'App name cannot be empty.',
    });
    return appName;
  }
  return existingAppName;
}

async function askIncludeMUI() {
  const { includeMUI } = await prompts({
    type: 'confirm',
    name: 'includeMUI',
    message: 'Would you like to include MUI?',
    initial: false,
  });
  return includeMUI;
}

async function askIncludeMUIAtoms() {
  const { includeMUIAtoms } = await prompts({
    type: 'confirm',
    name: 'includeMUIAtoms',
    message: 'Would you like to include some basic MUI atom components?',
    initial: true,
  });
  return includeMUIAtoms;
}

async function askIncludeTests() {
  const { includeTests } = await prompts({
    type: 'confirm',
    name: 'includeTests',
    message: 'Would you like to implement tests?',
    initial: false,
  });
  return includeTests;
}

async function askIncludeRedux() {
  const { includeRedux } = await prompts({
    type: 'confirm',
    name: 'includeRedux',
    message: 'Would you like to include Redux Toolkit for state management?',
    initial: false,
  });
  return includeRedux;
}

module.exports = {
  askAppName,
  askIncludeMUI,
  askIncludeMUIAtoms,
  askIncludeTests,
  askIncludeRedux,
};
