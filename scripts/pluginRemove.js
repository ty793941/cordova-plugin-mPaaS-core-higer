var podfile = require('./ios/podfileOperate')
var gradle=require('./android/gradleOperate')
var androidConfig=require('./android/configOperate')
var iosConfig=require('./ios/configOperate')

androidConfig.removeAndroidConfig();
iosConfig.removeIOSConfig();
gradle.removeAndroidGradle();
podfile.removePodfile();
