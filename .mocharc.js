module.exports = {
  require: ['@babel/register'],
  timeout: '5000',
  spec: 'tests/**/*.js',
  ignore: 'tests/exampleTest.spec.js',
  file: 'global-hooks/config.js',
}
/*reporter: 'mochawesome',
    reporterOptions: [
    'reportDir=MyReports',
    'reportFilename=updatedReport',
    'json=false',
  ],*/

// 'reportFilename=[status]_[datetime]-updatedReport'
