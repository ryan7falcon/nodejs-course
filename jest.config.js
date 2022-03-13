export default {
  moduleNameMapper: {
    '#(.*)': '<rootDir>/node_modules/$1',
  },
  projects: ['<rootDir>/notes-app', '<rootDir>/playground'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
