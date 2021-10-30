module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svelte$': 'svelte-jester',
  },
  moduleFileExtensions: ['js', 'svelte'],
  testMatch: ['<rootDir>/src/**/*.spec.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/?!(svelte-routing)'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jsdom',
};
