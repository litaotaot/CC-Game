import { _decorator, Component, Node, SpriteFrame, ProgressBar, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('loadingCom')
export class loadingCom extends Component {

    @property(Node)
    private loadingNode: Node = null;
    @property(ProgressBar)
    private progressNode: ProgressBar = null;

    // @property(SpriteFrame)
    // private imageSpriteFrame: SpriteFrame = null;

    start() {
        this.increaseProgress({totalTime: 3})
    }

    updateCircle() {
        tween(this.loadingNode)
        .by(10, { angle: 720 }) // 在5秒内绕z轴旋转360度
        .start()  
    }


     // 初始化进度条
     initProgressBar() {
        this.progressNode.progress = 0;
    }

    // 在3秒内递增进度到100%
    increaseProgress(params: {totalTime?: number, steps?: number, cb?: Function}) {
        let { totalTime = 3, steps = 180, cb } = params;
        // 清除之前的定时器
        this.updateCircle();
        this.unschedule(this.updateProgress);

        // 重置进度条
        this.initProgressBar();

        let increment = 1 / steps;
        let interval = totalTime / steps;

        // 使用定时器递增进度
        this.schedule(() => {
            this.updateProgress(increment, cb)
        }, interval, steps - 1, interval);
    }

    // 更新进度
    updateProgress(increment: number, cb?: Function) {
        // 增加进度
        this.progressNode.progress += increment;
        if (this.progressNode.progress >= 1) {
            cb && cb();
            this.node.emit('progressOver');
        }
    }

    update(deltaTime: number) {
        
    }
}

