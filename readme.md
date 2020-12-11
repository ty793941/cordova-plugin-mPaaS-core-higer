## mPaaS 

移动开发平台（Mobile PaaS，简称 mPaaS）是源于支付宝 App 的移动开发平台，为移动开发、测试、运营及运维提供云到端的一站式解决方案，能有效降低技术门槛、减少研发成本、提升开发效率，协助企业快速搭建稳定高质量的移动 App。

## 本插件
本插件集合了[阿里的移动开发平台mPaas](https://help.aliyun.com/document_detail/49549.html)中的配置部分，后续相关的插件（如扫码、热更新）之类的都要同时安装本插件。

内置基线 10.1.68

## 使用

### 1.安装：
> cordova plugins add cordova-plugin-mpaas-core-higer

### 2. 复制config文件
通过[阿里云官方](https://help.aliyun.com/document_detail/164968.html?spm=a2c4g.11186623.6.569.3e6434b61nIh5E)的步骤下载配置文件，类似(Ant-mpaas-XXXXX-default-android.config)，复制整个文件到cordova根目录的mPaas文件夹（需新建），并别名为mPaas.config，不然会报找不到该文件的错误。

## 阶段
本插件尚处于内部测试阶段，若有兴趣的可以直接使用，但暂不可直接用于生产环境。
