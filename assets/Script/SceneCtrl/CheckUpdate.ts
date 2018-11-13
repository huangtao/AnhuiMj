import { ActionNet } from "../CustomType/Action";
import ConfigData from "../Global/ConfigData";
import { AppInfo } from "../CustomType/AppInfo";
import Global from "../Global/Global";
import { NativeCtrl } from "../Native/NativeCtrl";
import { WebRequest } from "../Net/Open8hb";
import { versionCompareCb, checkMd5Cb } from "./CheckUpdateToolsFunction";
import { InitKeyListener, EndWiths } from "../Tools/Function";
import { IEventHandler } from "../Interface/IEventHandler";
import UiManager from "../Manager/UiManager";
import { LocalStorage } from "../CustomType/LocalStorage";
import { SafeWebRequest } from "../Net/SafeWebRequest";

const { ccclass, property } = cc._decorator;


/**
 * 
 *  热更新使用的控制脚本
 * 
 * 热更新实际上是在用户的数据缓存区域存储下载的执行脚本，然后使用资源更新搜索路径完成更新脚本的加载逻辑
 * 为了考虑后期游戏的单独加载和热更新我们需要预先设计资源搜索路径的组织结构，其思路是使用模块的加载方式。其目录结构类似如下
 * 
 * remote-asset 
 *   |--- hall  
 *   |--- m_biji
 *   |--- m_hzmj
 *   |--- m_hzmj
 * 
 * 按照游戏的模块来分开管理和加载，表示大厅和游戏是分开的逻辑，大厅模块实际上也是可以想象成是一个游戏模块的
 * 
 * 注意每次大厅的热更新版本发布会需要携带一个标志参数标识是否需要重新下载个更新游戏，如果需要那么所有的游戏热更新都会全部失效，导致所有游戏的重新下载
 * 虽然游戏属于大厅的附加品，但是在模块的管理上他是和大厅是平级的，不存在子属关系，游戏资源和大厅使用的资源一定程度上是不通用，或者是完全独立的两个部分
 * 
 * 
 * 
 * 
 * 
 * 
 */

@ccclass
export default class HotUpdateCtrl extends cc.Component {

    //进度条，报告更新进度
    @property(cc.ProgressBar)
    progress: cc.ProgressBar = null;

    //更新提示
    @property(cc.Label)
    label: cc.Label = null;

    /**
     * 更新状态显示
     */
    @property(cc.Label)
    lab_status: cc.Label = null;


    /****** 标记状态信息，指示在更新的过程中的状态信息 */
    private _updating: boolean = false;
    private _needRetry: boolean = false;
    private _storagePath = '';
    private _storagePath_temp = '';
    private _showRetryBox: boolean = false
    private _showBoxCancleCall = () => { cc.game.end(); }


    //更新回调
    private _updateListener: any;
    // private path_Manifest_Cache: string;
    private appinfo: AppInfo = null;



    //jsb的资源管理器实体
    private _am: any;


    private loginfo(msg: string) {
        cc.log(msg);

    }
    public onLoad() {

        //隐藏loading
        NativeCtrl.HideSplash();
        if (!ConfigData.SystemInited) {
            //添加注册监听
            InitKeyListener();
            ConfigData.SystemInited = true;
        }
        if (!cc.sys.isNative || !ConfigData.NeedHotupdate) {
            this.enterLoginScene();
            return;
        }
        
        ConfigData.NeedHotupdate = false;
        cc._initDebugSetting(cc.DebugMode.INFO);
        cc.sys.localStorage.getItem('appRunMark', "0");

        ConfigData.InitConfigFromNative();

        this.lab_status.string = '正在检查更新';
        this.progress.progress = 0;


        //开始启动热更新
        this.startGetHotupdateConf();

    }
    private startGetHotupdateConf() {

        let action = new ActionNet(this, this.onloadUpdateSuccess, this.onloadUpdateError);
        let region = ConfigData.RegionName;
        let device_type = 2;
        if (cc.sys.platform == cc.sys.ANDROID) {
            device_type = 1;
        }

        let data = WebRequest.DefaultData(false);
        data.AddOrUpdate("region", region);
        data.AddOrUpdate("device_type", device_type);
        data.AddOrUpdate("_t", new Date().valueOf().toString());

        SafeWebRequest.GameHall.getUpdateInfo(action, data);
        

    }
    private onloadUpdateSuccess(json) {
        this.appinfo = json;
        if (this.appinfo.status != "success") {

            this.loginfo(`获取热更新配置失败，需要重试`);

            Global.Instance.UiManager.ShowMsgBox("获取更新配置失败，是否重试？", this, () => {
                this.startGetHotupdateConf();
            }, this._showBoxCancleCall, this._showBoxCancleCall);
            return;
        }
        if (this.appinfo.debug_model != 0) {
            //设置日志输出模式
            cc._initDebugSetting(cc.DebugMode.INFO);
        }
        else {
            cc._initDebugSetting(cc.DebugMode.WARN);
        }


        this.loginfo(JSON.stringify(json));


        if (this.appinfo.pkg_version > ConfigData.AppVersion) {
            cc.log(`需要更新app版本 ${ConfigData.AppVersion}  -->>   ${this.appinfo.pkg_version}`);
            Global.Instance.UiManager.ShowMsgBox("发现新版本，点击确定去更新！", this, () => {
                cc.sys.openURL(this.appinfo.downloadurl);
            }, this._showBoxCancleCall, this._showBoxCancleCall);
            return;
        }
        if (this.appinfo.pkg_version < ConfigData.AppVersion) {
            cc.log("审核版本");
            if (ConfigData.RegionName !== "ceshi" && ConfigData.RegionName !== "review") {
                ConfigData.RegionName = "review";
            }
        } else {
            cc.log("正式版本");
        }





        try {
            this.createAm();
            this.loadCustomManifest();
        }
        catch (e) {
            let s = <Error>e;
            this.loginfo(s.message);
            NativeCtrl.ReportError(s);

            Global.Instance.UiManager.ShowMsgBox("检查热更新配置失败，是否重试？", this, () => {
                this.startGetHotupdateConf();
            }, this._showBoxCancleCall, this._showBoxCancleCall);

        }
    }
    private onloadUpdateError(e) {

        this.loginfo(`获取热更新配置失败，需要重试`);

        Global.Instance.UiManager.ShowMsgBox("获取热更新配置失败，是否重试？", this, () => {
            this.startGetHotupdateConf();
        }, this._showBoxCancleCall, this._showBoxCancleCall);
        return;
    }

    /************************************************** 热更新初始化 ************************************/


    private createAm(): any {

        //设置热更新管理文件夹，为文件夹结构提供后期游戏独立热更新做准备
        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'remote-asset/hall');
        this._storagePath_temp = this._storagePath + "_temp";
        this.loginfo(`设置热更新管理文件夹${this._storagePath}`);
        //如果目录不存在则创建热更新管理目录
        if (!jsb.fileUtils.isDirectoryExist(this._storagePath)) {
            this.loginfo("创建目录" + this._storagePath);
            jsb.fileUtils.createDirectory(this._storagePath);
        }


        //==========================================修复部分手机上热更新之后搜索路径错乱的问题=====================================
        var searchPaths: Array<string> = jsb.fileUtils.getSearchPaths();
        let needswap = false;
        let i = 0;
        for (i = 0; i < searchPaths.length; i++) {
            if (searchPaths[i] == this._storagePath && i != 0) {
                needswap = true;
                break;
            }
        }

        if (needswap) {
            searchPaths = this.buildSearchPath(this._storagePath);
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);

            cc.audioEngine.stopAll();
            cc.game.restart();
            return;
        }
        //==========================================修复部分手机上热更新之后搜索路径错乱的问题=====================================

        // 创建资源管理器，提供热更新服务
        this._am = new jsb.AssetsManager('', this._storagePath);

        //设置资源版本比较器
        this._am.setVersionCompareHandle(versionCompareCb);
        this.loginfo(`设置资源版本比较器`);

        //设置文件下载后的校验算法，提供文件的正确性校验，如果验证成功为 true 否则为 false
        this._am.setVerifyCallback(checkMd5Cb);
        this.loginfo(`设置文件下载后的校验算法`);

        // this._am.rt

        if (cc.sys.platform === cc.sys.ANDROID) {
            //一些Android设备可能会在并发任务太多时减慢下载过程。值可能不准确，请做更多的测试，找出最适合你的游戏。
            this._am.setMaxConcurrentTask(2);
            // this.lab_status.string = "Max concurrent tasks count have been limited to 2";
        }

        this.lab_status.string = "正在比对更新文件";
    }

    /**
     *  加载Manifest文件，提供远程文件下载和比对使用
     */
    private loadCustomManifest() {

        let path_Manifest_Cache = this._storagePath + "/project.manifest";
        //如果有缓存的cache，则动态修改cache的文件内容
        if (jsb.fileUtils.isFileExist(path_Manifest_Cache)) {
            this.loginfo("project.manifest存在，直接从文件读取");
            let jsonstr = jsb.fileUtils.getStringFromFile(path_Manifest_Cache);

            const json = JSON.parse(jsonstr);
            //动态覆写客户端本地的热更新用 manifest 文件
            this.InitJson(json);
            jsb.fileUtils.writeStringToFile(JSON.stringify(json), path_Manifest_Cache);
        }

        this.loginfo(`加载Manifest文件，提供远程文件下载和比对使用`);
        cc.loader.loadRes("project", this.onManifest.bind(this));
        return true;

    }
    private onManifest(error, jsonString) {
        if (error) {
            this.loginfo(error.message);
            //加载本地 Manifest 文件失败，初始化更新失败
            this.loginfo("加载本地 Manifest 文件失败，初始化更新失败");
            this.enterLoginScene();
            return;
        }
        if (jsonString.length > 0) {
            //获取上次热更新以后的记录
            const json = JSON.parse(jsonString);
            this.InitJson(json);
            jsonString = JSON.stringify(json);
            const manifest = new jsb.Manifest(jsonString, this._storagePath);
            this._am.loadLocalManifest(manifest, this._storagePath);
            this.checkUpdate();
            return;
        }
        //更新失败，跳过更新 
        this.loginfo(`更新失败，跳过更新`);
        this.enterLoginScene();

    }
    private InitJson(json) {
        //由于更换了版本号，热更新的远程地址动态更改来完成客户端的热更新
        this.loginfo("原始packageUrl=" + json.packageUrl);
        this.loginfo("原始remoteManifestUrl=" + json.remoteManifestUrl);
        this.loginfo("原始remoteVersionUrl=" + json.remoteVersionUrl);
        this.loginfo("原始version=" + json.version);


        //修改热更新的地址
        this.loginfo("修改packageUrl=" + this.appinfo.packageUrl);
        json.packageUrl = this.appinfo.packageUrl;

        this.loginfo("修改remoteManifestUrl=" + this.appinfo.remoteManifestUrl);
        json.remoteManifestUrl = this.appinfo.remoteManifestUrl;

        this.loginfo("修改remoteVersionUrl=" + this.appinfo.remoteVersionUrl);
        json.remoteVersionUrl = this.appinfo.remoteVersionUrl;

        this.loginfo("远程的version=" + this.appinfo.js_version);
    }

    /************************************************** 检查更新 ************************************/

    //检查更新
    private checkUpdate() {
        //如果读取配置出现了异常，写error
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {

            cc.warn("读取热更新文件失败，当前的包是不支持热更新的，严重级别发布错误。");
            //读取热更新文件失败，当前的包是不支持热更新的，严重级别发布错误。
            this.enterLoginScene();
            return;
        }
        if (this._updateListener) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
        }
        this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
        cc.eventManager.addListener(this._updateListener, 1);
        //执行热更新检查，查看是否需要执行热更新逻辑
        this._am.checkUpdate();
        this.lab_status.string = "正在比对更新文件";
        this._updating = true;
    }
    public checkCb(event) {
        let canStart: boolean = true;
        let reTryStatus = false;

        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                this.loginfo('没有配置本地的 Manifest 文件' + event.getEventCode());
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.loginfo('下载 Manifest 文件失败！将跳过热更新');
                reTryStatus = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.loginfo('当前的版本已经是最新的版本了，可以跳过更新');
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                this.loginfo(' 检查热更新成功，发现新的热更版本，开始下载......');
                this._updating = false;
                canStart = false;
                //启动更新
                setTimeout(() => {
                    this.hotUpdate();
                }, 2);
                break;
            default:
                return;
        }

        if (reTryStatus) {

            Global.Instance.UiManager.ShowMsgBox("比对热更新文件失败，是否重试？", this, () => {
                this.startGetHotupdateConf();
            }, this._showBoxCancleCall, this._showBoxCancleCall);
            return;
        }

        this._updating = false;

        if (canStart) {
            this.enterLoginScene();
        }
    }



    /************************************************** 开始执行更新 ************************************/

    public hotUpdate() {

        if (this._am && !this._updating) {
            this.lab_status.string = '正在下载更新文件';

            if (this._updateListener) {
                cc.eventManager.removeListener(this._updateListener);
                this._updateListener = null;
            }

            this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
            cc.eventManager.addListener(this._updateListener, 1);

            // if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            //     // Resolve md5 url
            //     this.lab_status.string = 'getState UNINITED...';
            //     var url = "./project.manifest";
            //     // if (cc.loader.md5Pipe) {
            //     //     url = cc.loader.md5Pipe.transformURL(url);
            //     // }
            //     this._am.loadLocalManifest(url);
            // }

            this.lab_status.string = '开始更新';
            this._am.update();

            // this.panel.updateBtn.active = false;
            this._updating = true;
        }
    }
    public updateCb(event) {
        let failed = false;
        let needRestart = false;


        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                this.loginfo('下载 Manifest 文件失败. ' + event.getMessage());
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:     //热更新的进度通知
                let progressVal = event.getPercent();
                if (!isNaN(progressVal)) {
                    //获取的更新进度是有效的
                    if (progressVal > 1) {
                        progressVal = 1;
                    }
                    this.progress.progress = progressVal;
                    //显示下载进度
                    // this.label.string = `正在下载......${Math.floor(100 * progressVal)}%`;
                    this.label.string = `正在下载......${(100 * progressVal).toFixed(2)}%`;
                }
                return;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                this.loginfo(`当前的版本已经更新到最新的版本`);
                failed = false;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                //下载更新文件完成，如果没有错误则可以重启引擎运行游戏了
                this.loginfo('下载更新完成');
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                this.loginfo(`执行热更新失败:UPDATE_FAILED  AssetId = ` + event.getAssetId());
                this._needRetry = true;
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
            case jsb.EventAssetsManager.ERROR_UPDATING:
                let fullPath = `${this._storagePath_temp}/${event.getAssetId()}`;
                if (jsb.fileUtils.isFileExist(fullPath)) {
                    jsb.fileUtils.removeFile(fullPath);
                    this.loginfo(`删除文件:${fullPath}`);
                }
                // this.loginfo(`执行热更新失败: AssetId = ` + event.getAssetId());
                this._needRetry = true;
                return;
            default:
                return;
        }

        if (this._needRetry) {
            this.loginfo("询问玩家是否需要重新尝试失败的下载");
            this.retry();
            return;
        }
        if (needRestart) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;

            var newPaths = this.buildSearchPath(this._storagePath);//this._am.getLocalManifest().getSearchPaths();

            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(newPaths));

            //搜索路径去重
            cc.log(` [CheckUpdate.ts] 打印新的搜索路径:${newPaths}`);
            jsb.fileUtils.setSearchPaths(newPaths);

            cc.audioEngine.stopAll();
            cc.game.restart();
            return;
        }
        if (failed) {
            if (this._showRetryBox) return;

            Global.Instance.UiManager.ShowMsgBox("获取更新文件清单失败，是否重试？", this, () => {
                this._showRetryBox = false;
                this.startGetHotupdateConf();
            }, this._showBoxCancleCall, this._showBoxCancleCall);
        }
        else {
            this._updating = false;
            this.enterLoginScene();
            return;
        }
    }

    public retry() {
        if (this._needRetry && !this._showRetryBox) {
            this._showRetryBox = true;

            Global.Instance.UiManager.ShowMsgBox("部分文件下载失败，是否重试？", this, () => {
                this._showRetryBox = false;
                this._needRetry = false;
                this.loginfo('正在尝试重新下载');
                this._am.downloadFailedAssets();
            }, this._showBoxCancleCall, this._showBoxCancleCall);
        }
    }



    /************************************************** 完成行更新 ************************************/




    //更新完成，进入登录场景
    public enterLoginScene() {
        if (this._updateListener) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
        }
        if (cc.isValid(this.appinfo)) {
            LocalStorage.LocalHotVersion = this.appinfo.js_version + '';
        }
        Global.ChangeScene("Login");
    }

    public onDestroy() {
        if (this._updateListener) {
            cc.eventManager.removeListener(this._updateListener);
            this._updateListener = null;
        }
    }

    public RemoveHotUpdateFiles() {

        Global.Instance.UiManager.ShowMsgBox("修复功能会导致应用重启，是否继续？", this, () => {
            cc.log("清理热更新");
            //设置热更新管理文件夹，为文件夹结构提供后期游戏独立热更新做准备
            let remote_asset = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'remote-asset');
            if (jsb.fileUtils.isDirectoryExist(remote_asset)) {
                jsb.fileUtils.removeDirectory(remote_asset);
            }
            cc.game.restart();
        }, this._showBoxCancleCall, this._showBoxCancleCall);
    }
    
    private buildSearchPath(checkStoragePath: string) {
        if (!EndWiths(checkStoragePath, "/")) {
            checkStoragePath = checkStoragePath + "/";
        }
        //==========================================修复部分手机上热更新之后搜索路径错乱的问题=====================================
        var searchPaths: Array<string> = jsb.fileUtils.getSearchPaths();
        let needswap = false;
        let i = 0;
        for (i = 0; i < searchPaths.length; i++) {
            if (searchPaths[i] == checkStoragePath) {
                searchPaths.splice(i, 1);
                i = 0;
            }
        }
        searchPaths = [this._storagePath].concat(searchPaths);
        return searchPaths;
        //==========================================修复部分手机上热更新之后搜索路径错乱的问题=====================================

    }
}