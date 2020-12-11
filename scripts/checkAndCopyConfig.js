var fs = require('fs-extra');
var path = require('path');
var CordovaError = require('cordova-common').CordovaError;

console.log('----------begin mPaaS Core config checkAndCopy----------')

let CheckAndCopyConfig = function () {
    //cordova项目根目录，一般为"CordovaRoot/"
    let cordovaRoot = path.resolve(__dirname, '../../..');
    let configPath = path.join(cordovaRoot, 'mPaaS/mpaas.config');
    if (!fs.pathExistsSync(configPath)) {
        console.error("ERROR begin.............................................")
        console.error("You can visit the below link to get the config file(like Ant-mpaas-XXXXX-default-android.config).After downloaded,please copy it to the CordovaRoot/mPaaS folder,And rename the file as 'mPaas.config'")
        console.error("https://help.aliyun.com/document_detail/164968.html?spm=a2c4g.11186623.6.569.519a428eV6pGiY")
        console.error("ERROR end.............................................")
        throw new CordovaError("not found "+configPath+",please check.")
    }
 
    //platforms 平台下的android文件夹，一般为"CordovaRoot/platforms/android"
    let androidPlatformDir=path.resolve(__dirname, '../../../platforms/android');
    let configDir=path.join(androidPlatformDir,'app','mPaaS.config');

    fs.copyFileSync(configPath,configDir,fs.constants.COPYFILE_FICLONE);

}

CheckAndCopyConfig();


console.log('----------mPaaS Core config checkAndCopy done----------')