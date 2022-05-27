module.exports = {
  preset: "ts-jest",
  verbose: true,
  testEnvironment: "jsdom",
  // workaround from https://github.com/vuejs/test-utils/issues/1525#issuecomment-1134620421
  testEnvironmentOptions: {
    customExportConditions: [
      'node',
      'node-addons'
    ]
  },
  moduleFileExtensions: ["js", "ts", "vue"],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\js$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
