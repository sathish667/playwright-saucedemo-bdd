module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['step_definitions/**/*.js'],
    format: [
      'progress',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: {
      allure: {
        outputFolder: 'allure-results'
      }
    }
  }
};