module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  globals: {
    NODE_ENV: 'test'
  },
  moduleFileExtensions: [
    'js'
  ],
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules/']
};
