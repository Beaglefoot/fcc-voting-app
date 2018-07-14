module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json',
      useBabelrc: true
    }
  },
  setupTestFrameworkScriptFile: '<rootDir>/test/setup.js',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '\\.[tj]sx?$': 'ts-jest'
  },
  testRegex: '\\.test\\.[tj]sx?$'
};
