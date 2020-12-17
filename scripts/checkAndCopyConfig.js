var fs = require('fs-extra');
var path = require('path');
var CordovaError = require('cordova-common').CordovaError;

console.log('----------begin mPaaS Core config checkAndCopy----------')
//cordova项目根目录，一般为"CordovaRoot/"
let cordovaRoot = path.resolve(__dirname, '../../..');

let CheckAndCopyAndroidConfig = function () {
    console.log("begin copy the android config file...");
    let configPath = path.join(cordovaRoot, 'mPaaS/android/mpaas.config');
    if (!fs.pathExistsSync(configPath)) {
        console.error("ERROR begin.............................................")
        console.error("You can visit the below link to get the config file(like Ant-mpaas-XXXXX-default-android.config).After downloaded,please copy it to the CordovaRoot/mPaaS/android folder,And rename the file as 'mpaas.config'")
        console.error("https://help.aliyun.com/document_detail/164968.html?spm=a2c4g.11186623.6.569.519a428eV6pGiY")
        console.error("ERROR end.............................................")
        throw new CordovaError("not found " + configPath + ",please check.")
    }

    //platforms 平台下的android文件夹，一般为"CordovaRoot/platforms/android"
    let androidPlatformDir = path.resolve(__dirname, '../../../platforms/android');
    if (!fs.pathExistsSync(androidPlatformDir)) {
        console.error("NOTICE: not found the path:" + androidPlatformDir);
        console.error("NOTICE:the mpaas.config will not be copied");
        return -1;
    }

    let configDir = path.join(androidPlatformDir, 'app', 'mPaaS.config');

    fs.copyFileSync(configPath, configDir, fs.constants.COPYFILE_FICLONE);

    console.log("end copy the android config file...");
}



let CheckAndCopyIOSConfig = function () {
    console.log("begin copy the ios config file...");

    //cordova 根目录下的配置文件目录，需要从阿里云mpaas上下载
    let configDir = path.join(cordovaRoot, "mPaaS/ios");
    //查找config目录下的config文件，
    let configFileNameArray = fs.readdirSync(configDir).filter(x => x.toLowerCase().endsWith("-default-ios.config"));

    if (!configFileNameArray || configFileNameArray.length <= 0) {
        console.error("ERROR begin.............................................")
        console.error("You can visit the below link to get the config file(like Ant-mpaas-XXXXX-default-ios.config).After downloaded,please copy it to the CordovaRoot/mPaaS/ios folder,And rename the file as 'meta.config'")
        console.error("https://help.aliyun.com/document_detail/164968.html?spm=a2c4g.11186623.6.569.519a428eV6pGiY")
        console.error("ERROR end.............................................")
        throw new CordovaError("not found " + configPath + ",please check.")
    }
    let configName = configFileNameArray[0];
    //只找第一个cofnig文件
    let configPath = path.join(configDir, configName);

    let iosPlatformDir = path.resolve(__dirname, '../../../platforms/ios');
    if (!fs.pathExistsSync(iosPlatformDir)) {
        console.error("NOTICE: not found the path:" + iosPlatformDir);
        console.error("NOTICE:the meta.config will not be copied");
        return -1;
    }
    //platforms 平台下的ios文件夹，一般为"CordovaRoot/platforms/ios"
    let iosPlatformMetaDir = path.join(iosPlatformDir, '');



    let configPlatformPath = path.join(iosPlatformMetaDir, configName);

    fs.copyFileSync(configPath, configPlatformPath, fs.constants.COPYFILE_FICLONE);

    console.log("end copy the ios config file...");
}


CheckAndCopyAndroidConfig();
CheckAndCopyIOSConfig();


console.log('----------mPaaS Core config checkAndCopy done----------')