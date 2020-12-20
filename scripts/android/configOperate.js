var fs = require('fs-extra');
var path = require('path');
var CordovaError = require('cordova-common').CordovaError;
var config = require('../config')

//cordova项目根目录，一般为"CordovaRoot/"
let cordovaRoot = config.cordovaRoot;
//platforms 平台下的android文件夹，一般为"CordovaRoot/platforms/android"
let androidPlatformDir = config.androidPlatformDir;


exports.checkAndCopyAndroidConfig = function () {
    console.log('\r\n----------begin check and copy mpaas android config----------')

    let configDir = path.join(cordovaRoot, 'mPaaS/android');
    //查找config目录下的config文件，
    let configFileNameArray = fs.readdirSync(configDir).filter(x => x.toLowerCase().endsWith("-default-android.config"));

    if (!configFileNameArray || configFileNameArray.length <= 0) {
        console.error("ERROR begin.............................................")
        console.error("You can visit the below link to get the config file(like Ant-mpaas-XXXXX-default-android.config).After downloaded,please copy it to the CordovaRoot/mPaaS/android folder.")
        console.error("https://help.aliyun.com/document_detail/164968.html?spm=a2c4g.11186623.6.569.519a428eV6pGiY")
        console.error("ERROR end.............................................")
        console.error("No configuration file(endsWith('-default-android.config')) was found under the  " + configDir + ",please check.")
        return;
    }

    let configName = configFileNameArray[0];
    //只找第一个cofnig文件
    let configPath = path.join(configDir, configName);


    if (!fs.pathExistsSync(androidPlatformDir)) {
        console.error("NOTICE: not found the path:" + androidPlatformDir);
        console.error("NOTICE:the mpaas.config will not be copied");
        return -1;
    }

    let configPlatformPath = path.join(androidPlatformDir, 'app', configName);

    fs.copyFileSync(configPath, configPlatformPath, fs.constants.COPYFILE_FICLONE);

    console.log('----------Congratulations,check and copy mpaas core android config done----------')
}

exports.removeAndroidConfig = function () {
    console.log('\r\n----------begin remove mpaas android config----------')

    let configDir = path.join(androidPlatformDir, 'app');
    if(!fs.existsSync(configDir))
    {
        console.error("***** no found the "+configDir);
        console.error("***** the remove operation is skipped.");
        return;
    }

    //查找config目录下的config文件，
    let configFileNameArray = fs.readdirSync(configDir).filter(x => x.toLowerCase().endsWith("-default-android.config"));

    if (!configFileNameArray || configFileNameArray.length <= 0) {
        console.error("***** No configuration file was found under the "+configDir);
        console.error("***** the remove operation is skipped.");
        return;
    }

    let configName = configFileNameArray[0];
    //只找第一个cofnig文件
    let configPath = path.join(configDir, configName);

    fs.removeSync(configPath);

    console.log('----------Congratulations,check and copy mpaas core android config done----------')
}