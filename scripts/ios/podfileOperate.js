/*
    cordova 自身在config.xml或plugin.xml中是支持pod的，但是格式比较死，无法满足mpaas到需求，所有需要自己写代码到podfile中，
    但是自己写到代码有可能会被冲掉。鉴于这个可能，我们就需要在安装前与build中，重新检查是否已经存在，没有的话，需要再次补充代码。
    by zhanghai793941@outlook.com at 2020-12-20
*/
var fs = require('fs-extra');
var path = require('path');
var config = require('../config');

//platforms 平台下的android文件夹，一般为"CordovaRoot/platforms/ios"
let iosPlatformDir = config.iosPlatformDir;
//插件所在的位置,一般为"CordovaRoot/plugins/mPaaSCore"
let iosPluginDir = config.iosPluginSourceDir;

let xcodeProjDir_array = fs.readdirSync(iosPlatformDir).filter(function (e) { return e.match(/\.xcodeproj$/i); });
let xcodeProjDir = xcodeProjDir_array[0];
let cordovaProjName = xcodeProjDir.substring(xcodeProjDir.lastIndexOf(path.sep) + 1, xcodeProjDir.indexOf('.xcodeproj'));
let xcodeCordovaProj = path.join(iosPlatformDir, cordovaProjName);

var check_reqs = require(iosPlatformDir + '/cordova/lib/check_reqs');

exports.setPodfile = function () {
    console.log('\r\n----------begin mpaas ios core podfile install----------')
    if (!fs.existsSync(iosPlatformDir)) {
        console.error("********************plugin not found the ios platform,and the mPaaS core podfile will not be installed,until you added the ios platform,this plugin will install mPaaS core podfile automatically");
        return;
    }
    //ios平台根目录
    var project_dir = iosPlatformDir;

    //找到项目名称
    var project_name = xcodeCordovaProj.split('/').pop();

    //找到ios平台下到podfile.
    let podfileFilePath = path.join(project_dir, 'Podfile');
    //原podfile文件内容
    let podfilePlatformStr = fs.readFileSync(podfileFilePath, 'utf-8');
    let podfileName = "Podfile"

    let podfileBeginStr = "# MPAAS CORE PODFILE BEGIN";
    let podfileEndStr = "# MPAAS CORE PODFILE END";
    if (!podfilePlatformStr.includes(podfileBeginStr)) {
        //插入固定字符
        podfilePlatformStr = ("\n" + podfileBeginStr + " \n" + podfileEndStr) + "\n\n" + podfilePlatformStr;
    }
    // 插件内需要插入podfile的文件路径
    let corePodfile = path.join(iosPluginDir, podfileName);
    // 插件内podfile的文件内容
    let corePodfileStr = fs.readFileSync(corePodfile, 'utf-8');
    // 替换内容
    podfilePlatformStr = podfilePlatformStr.replace(/(MPAAS CORE PODFILE BEGIN)[\s\S]*(# MPAAS CORE PODFILE END)/, '$1\n' + corePodfileStr + '   \n$2');

    fs.writeFileSync(podfileFilePath, podfilePlatformStr);

    var Podfile = require(path.join(iosPlatformDir + '/cordova/lib/Podfile')).Podfile;
    var podfileFile = new Podfile(path.join(project_dir, podfileName), project_name);
    // 写完后再执行下install
    podfileFile.install(check_reqs.check_cocoapods);

    console.log('----------Congratulations,the mpaas ios core podfile install done!----------')
}


// 移除ios podfile core部分代码
exports.removePodfile = function()
{
    console.log('----------begin mpaas ios core podfile remove----------')

    //ios平台根目录
    var project_dir = iosPlatformDir;
    //找到项目名称
    var project_name = xcodeCordovaProj.split('/').pop();
    let podfileName = "Podfile"

    //找到ios平台下到podfile.
    let podfileFilePath = path.join(project_dir, 'Podfile');
    if(!fs.pathExistsSync(podfileFilePath))
    {
        console.error("not found the podfile,please remove the code manually");
        return -1;
    }
    //原podfile文件内容
    let podfilePlatformStr = fs.readFileSync(podfileFilePath, 'utf-8');
    // 替换内容
    podfilePlatformStr = podfilePlatformStr.replace(/(MPAAS CORE PODFILE BEGIN)[\s\S]*(# MPAAS CORE PODFILE END)/, '$1\n'  + '   \n$2');

    fs.writeFileSync(podfileFilePath, podfilePlatformStr);
    
    var Podfile = require(path.join(iosPlatformDir + '/cordova/lib/Podfile')).Podfile;
    var podfileFile = new Podfile(path.join(project_dir, podfileName), project_name);
    // 写完后再执行下install
    podfileFile.install(check_reqs.check_cocoapods);

    console.log('----------the mpaas ios core podfile remove done----------')
}
