module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  coverageDirectory: 'reports/coverage'
};
