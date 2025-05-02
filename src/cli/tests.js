const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

async function setupTests(projectPath, fileExtension, isTypeScript) {
  console.log('Setting up testing environment...');
  if (isTypeScript) {
    execSync(
      'npm install --save-dev jest @testing-library/react @testing-library/jest-dom ts-jest @types/jest',
      { stdio: 'inherit' },
    );
  } else {
    execSync(
      'npm install --save-dev jest @testing-library/react @testing-library/jest-dom',
      { stdio: 'inherit' },
    );
  }

  // Create jest.config.js or jest.config.ts
  const jestConfigPath = path.join(
    projectPath,
    isTypeScript ? 'jest.config.ts' : 'jest.config.js',
  );
  const jestConfigContent = isTypeScript
    ? `import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.${fileExtension}'],
  transform: {
    '^.+\\\\.${fileExtension}$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
`
    : `module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.${fileExtension}'],
  transform: {
    '^.+\\\\.${fileExtension}$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};
`;
  fs.writeFileSync(jestConfigPath, jestConfigContent);

  // Create setupTests.js or setupTests.ts
  const setupTestsPath = path.join(projectPath, `setupTests.${fileExtension}`);
  const setupTestsContent = isTypeScript
    ? `import '@testing-library/jest-dom';\n`
    : `import '@testing-library/jest-dom';\n`;
  fs.writeFileSync(setupTestsPath, setupTestsContent);
}

module.exports = { setupTests };
