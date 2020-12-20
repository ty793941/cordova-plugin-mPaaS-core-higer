var podfile = require('./ios/podfileOperate')
var gradle=require('./android/gradleOperate')
var androidConfig=require('./android/configOperate')
var iosConfig=require('./ios/configOperate')

// 复制config文件
androidConfig.checkAndCopyAndroidConfig();
iosConfig.checkAndCopyIOSConfig();

//android 安装build.gradle
gradle.setAndroidGradle();
//ios 安装podfile
podfile.setPodfile();



