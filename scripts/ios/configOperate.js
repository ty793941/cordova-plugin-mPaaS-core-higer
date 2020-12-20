var fs = require('fs-extra');
var path = require('path');
var config = require('../config')

let iosPlatformDir = config.iosPlatformDir;
let cordovaRoot = config.cordovaRoot;
//cordova 根目录下的配置文件目录，需要从阿里云mpaas上下载
let configDir = path.join(cordovaRoot, "mPaaS/ios");

exports.checkAndCopyIOSConfig = function () {
    console.log("\r\n----------begin copy the mpaas ios config file----------");

    //查找config目录下的config文件，
    let configFileNameArray = fs.readdirSync(configDir).filter(x => x.toLowerCase().endsWith("-default-ios.config"));

    if (!configFileNameArray || configFileNameArray.length <= 0) {
        console.error("ERROR begin.............................................")
        console.error("You can visit the below link to get the config file(like Ant-mpaas-XXXXX-default-ios.config).After downloaded,please copy it to the CordovaRoot/mPaaS/ios folder,And rename the file as 'meta.config'")
        console.error("https://help.aliyun.com/document_detail/164968.html?spm=a2c4g.11186623.6.569.519a428eV6pGiY")
        console.error("ERROR end.............................................")
        console.error("No configuration file(endsWith('-default-ios.config')) was found under the " + configDir + ",please check.");
        return;
    }
    let configName = configFileNameArray[0];
    //只找第一个cofnig文件
    let configPath = path.join(configDir, configName);

    //如果不存在ios配置文件，则提示错误且不进行操作
    if (!fs.pathExistsSync(iosPlatformDir)) {
        console.error("**********NOTICE: not found the path:" + iosPlatformDir);
        console.error("**********NOTICE: the ios config.config(like Ant-mpaas-XXXXX-default-ios.config) will not be copied");
        return;
    }
    //platforms 平台下的ios文件夹，一般为"CordovaRoot/platforms/ios"
    let configPlatformPath = path.join(iosPlatformDir, configName);

    fs.copyFileSync(configPath, configPlatformPath, fs.constants.COPYFILE_FICLONE);

    console.log("\r\n----------Congratulations,copy the mpaas ios config file done----------");
}

exports.removeIOSConfig = function () {
    console.log('\r\n----------begin remove mpaas core ios config----------')

    let configDir = path.join(iosPlatformDir);
    if(!fs.existsSync(configDir))
    {
        console.error("***** no found the "+configDir);
        console.error("***** the remove operation is skipped.");
        return;
    }
    //查找config目录下的config文件，
    let configFileNameArray = fs.readdirSync(configDir).filter(x => x.toLowerCase().endsWith("-default-ios.config"));

    if (!configFileNameArray || configFileNameArray.length <= 0) {
        console.error("***** No configuration file was found under the "+configDir);
        console.error("***** the remove operation is skipped.");
        return;
    }

    let configName = configFileNameArray[0];
    //只找第一个cofnig文件
    let configPath = path.join(configDir, configName);

    fs.removeSync(configPath);

    console.log('----------Congratulations,check and copy mpaas core ios config done----------')
}