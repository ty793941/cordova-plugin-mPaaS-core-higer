var fs = require('fs-extra');
var path = require('path');
var ios = require('./ios/iosAfterPluginInstall')

//起始目录
// console.log("__dirname"+__dirname);

let buildAndroidGradle = function () {
    //platforms 平台下的android文件夹，一般为"CordovaRoot/platforms/android"
    let androidPlatformDir = path.resolve(__dirname, '../../../platforms/android');
    //插件所在的位置,一般为"CordovaRoot/plugins/mPaaSCore"
    let androidPluginDir = path.resolve(__dirname, '../src/android');

    let platformGradle = path.join(androidPlatformDir, 'build.gradle');

    if (!fs.pathExistsSync(androidPlatformDir)) {
        console.error("plugin not found the android platform,and the mPaaS core gradle will not be installed,until you added the android platform,this plugin will install mPaaS core gradle automatically");
        return -1;
    }
    // console.log("android root gradle:"+platformGradle);

    var buildGradle = fs.readFileSync(platformGradle, 'utf8');
    var coreGradle = fs.readFileSync(path.join(androidPluginDir, 'core.gradle'), 'utf8');

    let coreBeginStr = "// MPAAS CORE CONFIG BEGIN";
    let coreEndStr = "// MPAAS CORE CONFIG END";
    if (!buildGradle.includes(coreBeginStr)) {
        buildGradle += ("\n" + coreBeginStr + " \n" + coreEndStr);
    }

    buildGradle = buildGradle.replace(/(MPAAS CORE CONFIG BEGIN)[\s\S]*(\/\/ MPAAS CORE CONFIG END)/, '$1\n' + coreGradle + '    $2');

    fs.writeFileSync(platformGradle, buildGradle);

    return 0;
}



console.log('----------begin android mPaaS Core install----------')
let result1 = buildAndroidGradle();
if (result1 >= 0) {
    console.log('----------mPaaS android Core install done----------')
}

ios.setPodfile();


