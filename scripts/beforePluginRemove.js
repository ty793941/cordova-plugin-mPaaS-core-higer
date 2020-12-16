var fs = require('fs-extra');
var path = require('path');


let removeAndroidGradle = function()
{
    //platforms 平台下的android文件夹，一般为"CordovaRoot/platforms/android"
    let androidPlatformDir=path.resolve(__dirname, '../../../platforms/android');

    let platformGradle=path.join(androidPlatformDir,  'build.gradle');
    
    if(!fs.pathExistsSync(androidPlatformDir))
    {
        console.error("not found the build.gradle,please remove the code manually");
        return -1;
    }

    var buildGradle = fs.readFileSync(platformGradle, 'utf8');

    buildGradle = buildGradle.replace(/(MPAAS CORE CONFIG BEGIN)[\s\S]*(\/\/ MPAAS CORE CONFIG END)/,'$1\n' + '$2');
    
    fs.writeFileSync(platformGradle, buildGradle);

    return 0;
}


let removeIOSFramework = function()
{
    //platforms 平台下的android文件夹，一般为"CordovaRoot/platforms/ios"
    let iosPlatformDir=path.resolve(__dirname, '../../../platforms/ios');

    if(!fs.pathExistsSync(iosPlatformDir))
    {
        console.error("not found the mpaas folder,please remove the folder manually");
        return -1;
    }

    try {
        fs.removeSync(path.join(iosPlatformDir,"MPaaS"));
        console.log('mpaas framework remove success!')
      } catch (err) {
        console.error("mpaas framework remove fail.error:"+err)
        return -1;
      }
    return 0;
}

console.log('----------begin android mPaaS Core remove----------')
let result1=removeAndroidGradle();
if(result1>=0)
{
    console.log('----------mPaaS android Core remove done----------')
}

console.log('----------begin ios mPaaS Core remove----------')
let result2=removeIOSFramework();
if(result2>=0)
{
    console.log('----------begin ios mPaaS Core remove----------')
}