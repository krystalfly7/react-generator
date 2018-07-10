var path = require('path');
var fs = require('fs');
// 判断是否DDL开启
function fsExistsSync(path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}
function execDll(callback) {
  const relativePath = './dist/static/';
  const files = ['libs-manifest.json', 'libs.js', 'vendor-manifest.json', 'vendor.js', 'vendor.css'];
  for (let i = 0; i < files.length; i++) {
    const exist = fsExistsSync(path.join(__dirname, '.' + relativePath + files[i]));
    if (!exist) {
      var execSync = require('child_process').execSync;
      var cmdStr = 'npm run dll';
      execSync(cmdStr);
    }
  }
  const manifests = [relativePath + 'libs-manifest.json', relativePath + 'vendor-manifest.json'];
  callback && callback(manifests);
}

module.exports = {
  execDll: execDll
};
