var fs = require('fs-extra');
var path = require('path');
var ConfigParser = require('cordova-common').ConfigParser;

//platforms 平台下的android文件夹，一般为"CordovaRoot/platforms/ios"
let iosPlatformDir = path.resolve(__dirname, '../../../../platforms/ios');
//插件所在的位置,一般为"CordovaRoot/plugins/mPaaSCore"
let iosPluginDir = path.resolve(__dirname, '../../src/ios');
let root = iosPlatformDir;

let xcodeProjDir_array = fs.readdirSync(root).filter(function (e) { return e.match(/\.xcodeproj$/i); });
let xcodeProjDir = xcodeProjDir_array[0];
let cordovaProjName = xcodeProjDir.substring(xcodeProjDir.lastIndexOf(path.sep) + 1, xcodeProjDir.indexOf('.xcodeproj'));
let xcodeCordovaProj = path.join(root, cordovaProjName);
let platform = 'ios';

let locations = {
    root: root,
    www: path.join(root, 'www'),
    platformWww: path.join(root, 'platform_www'),
    configXml: path.join(xcodeCordovaProj, 'config.xml'),
    defaultConfigXml: path.join(root, 'cordova/defaults.xml'),
    pbxproj: path.join(root, xcodeProjDir, 'project.pbxproj'),
    xcodeProjDir: path.join(root, xcodeProjDir),
    xcodeCordovaProj: xcodeCordovaProj
};

var check_reqs = require(iosPlatformDir +'/cordova/lib/check_reqs');


//base method
let getPlatformInfo = function () {
    var result = {};
    result.locations = locations;
    result.root = iosPlatformDir;
    result.name = platform;
    result.version = require(iosPlatformDir + '/cordova/lib/versions');
    result.projectConfig = new ConfigParser(locations.configXml);

    return result;
};

exports.setPodfile = function () {
    var project_dir = locations.root;
    var project_name = locations.xcodeCordovaProj.split('/').pop();
    // var minDeploymentTarget = getPlatformInfo(iosPlatformDir).projectConfig.getPreference('deployment-target', 'ios');


    var Podfile = require(path.join(iosPlatformDir + '/cordova/lib/Podfile')).Podfile;
    let podfileFilePath = path.join(project_dir, 'Podfile');
    let podfilePlatformStr = fs.readFileSync(podfileFilePath, 'utf-8');
    Podfile.FILENAME="podfile";

    let podfileBeginStr = "# MPAAS CORE PODFILE BEGIN";
    let podfileEndStr = "# MPAAS CORE PODFILE END";
    if (!podfilePlatformStr.includes(podfileBeginStr)) {
        podfilePlatformStr = ("\n" + podfileBeginStr + " \n" + podfileEndStr) + "\n\n" + podfilePlatformStr;
    }
    let corePodfile = path.join(iosPluginDir, Podfile.FILENAME);
    let corePodfileStr = fs.readFileSync(corePodfile, 'utf-8');

    // podfilePlatformStr = podfilePlatformStr.replace(/(MPAAS CORE PODFILE BEGIN)[\s\S]*(# MPAAS CORE PODFILE END)/, '');
    podfilePlatformStr = podfilePlatformStr.replace(/(MPAAS CORE PODFILE BEGIN)[\s\S]*(# MPAAS CORE PODFILE END)/, '$1\n' + corePodfileStr + '   \n$2');

    fs.writeFileSync(podfileFilePath, podfilePlatformStr);

    var podfileFile = new Podfile(path.join(project_dir, Podfile.FILENAME), project_name);
    podfileFile.install(check_reqs.check_cocoapods);
}
