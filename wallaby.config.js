module.exports = () => {
  return {
    testFramework: 'jest',
    files: ['package.json', 'src/**/*.js', '!src/**/*.test.js'],
    tests: ['src/**/*.test.js'],
    env: {
      type: 'node',
      runner: 'node'
    },
    setup(wallaby) {
      wallaby.testFramework.configure(require('./package.json').jest);
    }
  };
};
