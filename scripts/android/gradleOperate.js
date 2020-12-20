var fs = require('fs-extra');
var path = require('path');
var config = require('../config');

//起始目录
// console.log("__dirname"+__dirname);
//platforms 平台下的android文件夹，一般为"CordovaRoot/platforms/android"
let androidPlatformDir = config.androidPlatformDir;
//插件所在的位置,一般为"CordovaRoot/plugins/mPaaSCore"
let androidPluginDir = config.androidPluginSourceDir;

exports.setAndroidGradle = function () {
    console.log('\r\n----------begin mpaas android core gradle install----------')


    //android平台根目录gradle位置
    let platformGradle = path.join(androidPlatformDir, 'build.gradle');
    //如果当前项目不存在android平台，则提示错误信息，且不操作。
    if (!fs.pathExistsSync(androidPlatformDir)) {
        console.error("********************plugin not found the android platform,and the mPaaS core gradle will not be installed,until you added the android platform,this plugin will install mPaaS core gradle automatically");
        return;
    }

    var buildGradle = fs.readFileSync(platformGradle, 'utf8');
    var coreGradle = fs.readFileSync(path.join(androidPluginDir, 'core.gradle'), 'utf8');

    let coreBeginStr = "// MPAAS CORE CONFIG BEGIN";
    let coreEndStr = "// MPAAS CORE CONFIG END";
    //根目录build.gradle插入区别字符
    if (!buildGradle.includes(coreBeginStr)) {
        buildGradle += ("\n" + coreBeginStr + " \n" + coreEndStr);
    }

    buildGradle = buildGradle.replace(/(MPAAS CORE CONFIG BEGIN)[\s\S]*(\/\/ MPAAS CORE CONFIG END)/, '$1\n' + coreGradle + '    $2');

    fs.writeFileSync(platformGradle, buildGradle);

    console.log('----------Congratulations,mpaas android core gradle install done----------')
}

// 移除android gradle部分代码
exports.removeAndroidGradle = function()
{
    console.log('----------begin mpaas android core gradle remove----------')

    let platformGradle=path.join(androidPlatformDir,  'build.gradle');
    
    if(!fs.pathExistsSync(platformGradle))
    {
        console.error("not found the build.gradle,please remove the code manually");
        return -1;
    }

    var buildGradle = fs.readFileSync(platformGradle, 'utf8');

    buildGradle = buildGradle.replace(/(MPAAS CORE CONFIG BEGIN)[\s\S]*(\/\/ MPAAS CORE CONFIG END)/,'$1\n' + '$2');
    
    fs.writeFileSync(platformGradle, buildGradle);
    
    console.log('----------mpaas android core gradle remove done----------')
}

