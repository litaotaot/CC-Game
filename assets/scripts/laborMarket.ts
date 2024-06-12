import { _decorator, Component, Node, instantiate, Prefab, Vec3, view, UITransform, Label, SpriteFrame, director } from 'cc';
const { ccclass, property } = _decorator;

import { workCom } from './components/workCom';
import { dialogCom } from './components/dialogCom';
import { loadingCom } from './components/loadingCom';
import { messageCom } from './components/messageCom';
import { Labor } from './data';
import { setLevel } from './tools';


@ccclass('laborMarket')
export class laborMarket extends Component {

    @property(Node)
    private bg: Node = null;
    @property(Node)
    private workWrapNode: Node = null;
    @property(Node)
    private prevButtonNode: Node = null;
    @property(Node)
    private nextButtonNode: Node = null;
    @property(Node)
    private backButtonNode: Node = null;

    @property(SpriteFrame)
    private coolySpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private ensureSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private networkSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private takeawaySpriteFrame: SpriteFrame = null;

    @property(Prefab)
    private workPrefab: Prefab = null;
    @property(Prefab)
    private dialogPrefab: Prefab = null;
    @property(Prefab)
    private loadingPrefab: Prefab = null;
    @property(Prefab)
    private messagePrefab: Prefab = null;

    @property(Label)
    private TypeLabel: Label = null;

    private typeLabelKey: string = 'junior';
    private workNodeList: any[] = [];
    private offsetTop: number = 200; // 编辑器中设置的偏移量
    private blockHeight: number = 210; // 默认值
    private blockWidth: number = 700; // 默认值
    private dialogNode: Node = null;
    private loadingNode: Node = null;
    private messageNode: Node = null;
    private selectWorkNode: any = null;
    private personalData: any = {};
    private middle: number = 5;
    private senior: number = 8;


    start() {
        this.personalData = window['personalData'] || JSON.parse(localStorage.getItem('personalData'));

        this.initEvent();
        this.initWorkWrap();
    }

    initEvent() {
        this.prevButtonNode.on(Node.EventType.TOUCH_END, this.prevButtonEvent, this)
        this.nextButtonNode.on(Node.EventType.TOUCH_END, this.nextButtonEvent, this)
        this.backButtonNode.on(Node.EventType.TOUCH_END, this.backButtonEvent, this)
    }

    initWorkWrap() {
        let height = view.getVisibleSize().height;
        let width = view.getVisibleSize().width;
        let y = (height - this.offsetTop) / 2 - this.blockHeight / 2 - 20;

        this.messageNode = instantiate(this.messagePrefab);
        this.messageNode.active = false;
        this.bg.addChild(this.messageNode);
        
        this.blockWidth = width - 40;
        Labor.workObj[this.typeLabelKey].forEach((work, index) => {
            let workNode = instantiate(this.workPrefab);
            let label = { ...work, salary: work.salary.value + work.salary.unit, settle: work.time.value + work.time.unit }
            workNode.getComponent(UITransform).setContentSize(this.blockWidth, this.blockHeight);
            workNode.getComponent(workCom).setValue({...label, img: this[work.key + 'SpriteFrame']});
            workNode.setPosition(new Vec3(0, y))
            this.workWrapNode.addChild(workNode);
            this.workNodeList.push({key: work.key, node: workNode}) // TODO设计的异常奇葩(不需要这么做)
            y -= this.blockHeight;

            let item = this.workNodeList[index]
            item.node.on(Node.EventType.TOUCH_END, () => {
                this.workNodeEvent(work)
            }, this)
        })
    }

    changeWorkType() {
        let list = Labor.workObj[this.typeLabelKey]
        this.workNodeList.forEach((item, index) => {
            let work = list[index] || {};
            let node = item.node
            let label = { ...work, salary: work.salary.value + work.salary.unit, settle: work.time.value + work.time.unit }
            this.workNodeList[index].key = work.key
            node.getComponent(workCom).setValue({...label, img: this[work.key + 'SpriteFrame']});
        })
    }

    prevButtonEvent() {
        let length = Labor.type.length;
        let index = Labor.type.findIndex(item => item.title === this.TypeLabel.string)
        index = (index - 1 < 0 ? (length - 1) : index -1) % length;
        this.TypeLabel.string = Labor.type[index].title;
        this.typeLabelKey = Labor.type[index].type;
        this.changeWorkType();
    }

    nextButtonEvent() {
        let length = Labor.type.length;
        let index = Labor.type.findIndex(item => item.title === this.TypeLabel.string)
        index = (index + 1) % length;
        this.TypeLabel.string = Labor.type[index].title;
        this.typeLabelKey = Labor.type[index].type;
        this.changeWorkType();
    }

    backButtonEvent() {
        director.preloadScene('personal', () => {
            director.loadScene('personal');
        })
    }

    workNodeEvent(item: any) {
        let level = this.personalData.level;
        let key = this.typeLabelKey;
        let term = (level < this.middle && (key === 'middle' || key === 'senior')) || (level < this.senior && key === 'senior');
        if (term) {
            this.messageNode.active = true;
            this.messageNode.setSiblingIndex(this.messageNode.parent.children.length - 1);
            this.messageNode.getComponent(messageCom).setMessage(`等级不够, 无法进行该工作`);
            return;
        }
        this.selectWorkNode = item;
        if (!this.dialogNode) {
            this.dialogNode = instantiate(this.dialogPrefab);
            this.dialogNode.getComponent(dialogCom).initDialog('', item.title);
            this.bg.addChild(this.dialogNode);
            this.dialogNode.on('dialogEvent', this.dialogNodeEvent, this)
        } else {
            this.dialogNode.active = true;
        }

    }

    dialogNodeEvent(event: { type: string, value: string }) {
        if (event.type === 'sure') {
            if (!this.loadingNode) {
                this.loadingNode = instantiate(this.loadingPrefab);
                this.loadingNode.getComponent(loadingCom).increaseProgress({
                    cb: () => {
                        this.loadingNodeEvent();
                    },
                });
                this.bg.addChild(this.loadingNode);
            } else {
                this.loadingNode.active = true;
                this.loadingNode.getComponent(loadingCom).increaseProgress({
                    cb: () => {
                        this.loadingNodeEvent();
                    },
                });
            }
        } else {
            this.dialogNode.active = false;
            this.selectWorkNode = null;
        }
    }

    loadingNodeEvent() {
        let value = this.selectWorkNode.salary.value;
        let mood = Math.abs(this.selectWorkNode.effect.mood);
        let satiation = Math.abs(this.selectWorkNode.effect.satiation);
        let levelData = setLevel(this.personalData.level, this.personalData.experience, value);

        this.personalData.liabilities.money += value;
        this.personalData.level = levelData.level;
        this.personalData.experience = levelData.experience;

        this.messageNode.active = true;
        this.messageNode.setSiblingIndex(this.messageNode.parent.children.length - 1);
        this.messageNode.getComponent(messageCom).setMessage(`获得${value}元, 饱食度下降${satiation}, 心情下降${mood}`);

        this.dialogNode.active = false;
        this.loadingNode.active = false;
        this.selectWorkNode = null;
    }

    update(deltaTime: number) {
        
    }

    onDestroy() {
        window['personalData'] = this.personalData;
        localStorage.setItem('personalData', JSON.stringify(this.personalData))
    }
    

}

