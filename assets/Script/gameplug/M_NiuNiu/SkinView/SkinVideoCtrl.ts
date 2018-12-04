import M_NiuNiuVideoClass from "../M_NiuNiuVideoClass";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SkinVideoCtrl extends cc.Component {

    @property(cc.Button)
    private btn_exit: cc.Button=null;
    @property(cc.Button)
    private btn_play: cc.Button=null;
    @property(cc.Button)
    private btn_pause: cc.Button=null;
    @property(cc.Button)
    private btn_fastSpeed: cc.Button=null;
    @property(cc.Button)
    private btn_normalSpeed: cc.Button=null;
    @property(cc.Label)
    private label_rate: cc.Label=null;
    private rate: number;

    onLoad() {
        this.OnUiComplete();
        this.InitShow();
    }
    /**
     * ui创建完成
     * */
    protected OnUiComplete(): void {
        this.node.x = 0;
        this.node.y = -310;
        this.btn_exit.node.on("click", () => {
            M_NiuNiuVideoClass.Instance.ExitGame();
        }, this);

        this.btn_play.node.on("click", () => {
            M_NiuNiuVideoClass.Instance.Resume();
            M_NiuNiuVideoClass.Instance.OnResume();
            this.btn_play.node.active = false;
            this.btn_pause.node.active = true;

            this.btn_fastSpeed.enabled = true;
            this.btn_normalSpeed.enabled = true;
        }, this);
        this.btn_pause.node.on("click", () => {
            M_NiuNiuVideoClass.Instance.Pause();
            M_NiuNiuVideoClass.Instance.OnPause();
            this.btn_play.node.active = true;
            this.btn_pause.node.active = false;

            this.btn_fastSpeed.enabled = false;
            this.btn_normalSpeed.enabled = false;
        }, this);

        this.btn_fastSpeed.node.on("click", () => {
            M_NiuNiuVideoClass.Instance.Fastforward();
            this.rate++;
            this.SetRate();
            if (M_NiuNiuVideoClass.Instance.VideoSpeed < 400) {
                this.btn_fastSpeed.node.active = false;
                this.btn_normalSpeed.node.active = true;
            }
        }, this);
        this.btn_normalSpeed.node.on("click", () => {
            M_NiuNiuVideoClass.Instance.ResumeNormalSpeed();
            this.rate = 1;
            this.SetRate();
            this.btn_fastSpeed.node.active = true;
            this.btn_normalSpeed.node.active = false;
        }, this);
        this.rate = 1;
        this.SetRate();
    }
    private SetRate() {
        this.label_rate.string = "X" + this.rate;
    }
    protected InitShow() {
        this.btn_pause.node.active = true;
        this.btn_play.node.active = false;
        this.btn_fastSpeed.node.active = true;
        this.btn_normalSpeed.node.active = false;
        this.node.active = true;
    }
    public Destroy(): void {
        this.btn_play.enabled = false;
        this.btn_pause.enabled = false;
        this.btn_fastSpeed.enabled = false;
        this.btn_normalSpeed.enabled = false;
    }
}
