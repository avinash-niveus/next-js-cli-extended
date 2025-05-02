const path = require('path');
const fs = require('fs-extra');

async function setupPrettier(projectPath) {
  console.log('Adding Prettier configuration...');
  const prettierConfig = `{
  "trailingComma": "es5",
  "printWidth": 100,
  "semi": true,
  "singleQuote": true,
  "endOfLine": "auto"
}
`;
  fs.writeFileSync(path.join(projectPath, '.prettierrc'), prettierConfig);
}

module.exports = { setupPrettier };
