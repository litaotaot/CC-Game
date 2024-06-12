import { _decorator, Component, instantiate, Node, Prefab, Vec3, UITransform, view } from 'cc';
const { ccclass, property } = _decorator;

import { blockLongCom } from './components/blockLongCom';
import { messageCom } from './components/messageCom';
import { dialogCom } from './components/dialogCom';
import { MostStores } from './data';

@ccclass('trainingSchool')
export class trainingSchool extends Component {

    @property(Prefab)
    private blockLongPrefab: Prefab = null;
    @property(Prefab)
    private dialogPrefab: Prefab = null;
    @property(Prefab)
    private messagePrefab: Prefab = null;

    @property(Node)
    private bg: Node = null;
    @property(Node)
    private trainBodyNode: Node = null;

    private blockNodeHeight = 210;
    private space = 20;
    private trainKey = 'cultivate';
    private personalData: any = {};
    private dialogNode: Node = null;
    private messageNode: Node = null;
    private price: number = 3000;
    private selectKey: string = null;


    start() {
        this.personalData = window['personalData'] || JSON.parse(localStorage.getItem('personalData'));

        this.initSchool();
        this.initEvent();
    }

    initEvent() {
        this.dialogNode.on('dialogEvent', (event) => {
            this.dialogNodeEvent(event)
        });
    }

    initSchool() {
        let body = this.trainBodyNode.getComponent(UITransform).getBoundingBoxToWorld();
        let width = body.width;
        let height = body.height;
        let x = 0;
        let y = height / 2 - this.blockNodeHeight / 2 - this.space;
        let list  = MostStores[this.trainKey].list || [];

        this.dialogNode = instantiate(this.dialogPrefab);
        this.dialogNode.active = false;
        this.bg.addChild(this.dialogNode);

        this.messageNode = instantiate(this.messagePrefab);
        this.messageNode.active = false;
        this.bg.addChild(this.messageNode);

        list.forEach(item => {
            let blockNode = instantiate(this.blockLongPrefab);
            let process = `已完成进度: ${this.personalData[item.key] || 0}/20`
            blockNode.setPosition(new Vec3(x, y));
            blockNode.getComponent(blockLongCom).setValue({ label1: item.title, label3: item.price, label5: process });
            this.trainBodyNode.addChild(blockNode);

            blockNode.on(Node.EventType.TOUCH_END, () => {
                this.blockNode(item);
            }, this);

            y -= this.blockNodeHeight + this.space;
        })
    }

    blockNode(params: any) {
        const { key } = params;
        this.selectKey = key;
        if (this.personalData[key] === null) {
            this.dialogNode.active = true;
            // let dialogNodeCom = this.dialogNode.getComponent(dialogCom)
            this.dialogNode.getComponent(dialogCom).initDialog('', '价格: 3000')
        } else {
            this.personalData[key] += 1;
        }
    }

    dialogNodeEvent(event: { type: string, value: string }) {
        if (event.type === 'sure') {
            if (this.personalData.liabilities.money < this.price) {
                this.messageNode.active = true;
                this.messageNode.getComponent(messageCom).setMessage('金钱数量不够!');
            } else {
                this.personalData[this.selectKey] = 0;
                this.personalData.liabilities.money -= this.price;
            }
        }   
        this.dialogNode.active = false;
        this.selectKey = null;
    }

    update(deltaTime: number) {
        
    }
}

