module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  bail: true,
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: false,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: -10,
    },
  },
};
