module.exports = {
  require: ['@babel/register'],
  timeout: '5000',
  spec: 'tests/**/*.js',
  ignore: 'test/example.spec.js',
  file: 'global-hooks/config.js',
}
