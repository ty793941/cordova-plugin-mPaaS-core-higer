var fs = require('fs-extra');
var path = require('path');

// console.log("__dirname"+__dirname);

// cordova项目根目录，一般为"CordovaRoot/"
exports.cordovaRoot = path.resolve(__dirname, '../../../');
console.log("cordovaRoot:"+this.cordovaRoot);

// platforms 平台下的android文件夹，一般为"CordovaRoot/platforms/android"
exports.androidPlatformDir = path.resolve(__dirname, '../../../platforms/android');
console.log("androidPlatformDir:"+this.androidPlatformDir);

// platforms 平台下的ios文件夹，一般为"CordovaRoot/platforms/ios"
exports.iosPlatformDir = path.resolve(__dirname, '../../../platforms/ios');
console.log("iosPlatformDir:"+this.iosPlatformDir);

// 安卓源码路径
exports.androidPluginSourceDir = path.resolve(__dirname, '../src/android');
console.log("androidPluginSourceDir:"+this.androidPluginSourceDir);

// ios源码路径
exports.iosPluginSourceDir = path.resolve(__dirname, '../src/ios');
console.log("iosPluginSourceDir:"+this.iosPluginSourceDir);