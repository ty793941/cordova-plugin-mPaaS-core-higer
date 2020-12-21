## mPaaS 

移动开发平台（Mobile PaaS，简称 mPaaS）是源于支付宝 App 的移动开发平台，为移动开发、测试、运营及运维提供云到端的一站式解决方案，能有效降低技术门槛、减少研发成本、提升开发效率，协助企业快速搭建稳定高质量的移动 App。

## 本插件
本插件集合了[阿里的移动开发平台mPaas](https://help.aliyun.com/document_detail/49549.html)中的配置部分，后续相关的插件（如扫码、热更新）之类的都要同时安装本插件。

内置基线 10.1.68

## 使用

### 前置条件
#### ios:
1.安装cocoapods
>sudo gem install cocoapods

2.允许root 账号执行pod 命令。方法为mac /etc/bashrc添加环境变量
>export COCOAPODS_ALLOW_ROOT=true

注意此处环境变量还会被覆盖掉，所以需要在/etc/sudoers 添加
>Defaults env_keep=COCOAPODS_ALLOW_ROOT

以此来保留这个环境变量

### 1.安装：
> cordova plugins add cordova-plugin-mpaas-core-higer

### 2. 复制config文件
通过[阿里云官方](https://help.aliyun.com/document_detail/164968.html?spm=a2c4g.11186623.6.569.3e6434b61nIh5E)的步骤下载配置文件，类似(Ant-mpaas-XXXXX-default-android.config)，复制整个文件到cordova根目录的mpaas文件夹（需新建），并别名为mPaas.config，不然会报找不到该文件的错误。

## 热点问题
#### 1.plugin 安装时 pod install 时出错，只有返回错误代码1提示
    可以在控制台切换到ios目录，然后手工执行sudo pod install可以看到详细错误信息。

#### 2.ios add plugin时 提示找不到配置文件，但是明明已经复制到ios根目录了。
    文件名称大小写问题，把文件名中到ios改为iOS,如Ant-mpaas-xxxxxxxxx-default-ios.config 改为 Ant-mpaas-xxxxxxxxx-default-iOS.config。
    
    为什么不系统处理了？原因是在官网download的时候文件名就是ios，但是在阿里源码读取的时候又要求iOS，我觉得这可能是阿里的一个bug，届时可能会进行修复。我们这边如果做了处理，把ios转成iOS，那么阿里那边的修复方式，我们是未知的，都有再次动代码的风险。但是他们最终肯定是要下载与读取的大小写一致的，也就是我们目前的代码是与他们最终目标是一致的，所以此处系统不做处理。

#### 3.在打开摄像头/相册的时候，系统闪退。
    请检查是否填写了摄像头/相册的权限说明。  
    ><config-file target="*-Info.plist" parent="NSCameraUsageDescription">
             <string>请填写自己的摄像头权限说明</string>
         </config-file>

         <config-file target="*-Info.plist" parent="NSPhotoLibraryUsageDescription">
             <string>请填写自己的相册权限说明</string>
         </config-file>
    >

#### 4.在build的时候，长时间没有反应
    正常现象：
    1.第一次cordova build android时，需要下载gradle，一般需要10来分钟，也可以手工下载，放置C盘。
    2.第一次cordova build ios 或者plugin add 时都会下载mpaas包，也大概需要10来分钟。
## 阶段
本插件尚处于内部测试阶段，若有兴趣的可以直接使用，但暂不可直接用于生产环境。
