export default {
  moduleNameMapper: {
    '#(.*)': '<rootDir>/node_modules/$1',
    '^(\\.{1,2}/.*)\\.jsx?$': '$1',
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
};
