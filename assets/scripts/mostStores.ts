import { _decorator, Component, instantiate, Node, Prefab, Label, SpriteFrame, UITransform, Vec3, view, director, Graphics, Color, Mask, v3, Quat, tween } from 'cc';
const { ccclass, property } = _decorator;

import { blockTxtCom } from './components/blockTxtCom';
import { blockCom } from './components/blockCom';
import { blockLongCom } from './components/blockLongCom';
import { squareCom } from './components/squareCom';
import { dialogCom } from './components/dialogCom';
import { messageCom } from './components/messageCom';
import { loadingCom } from './components/loadingCom';
import { MostStores } from './data';
import { getTime, enoughMoney } from './tools'

@ccclass('mostStores')
export class mostStores extends Component {

    @property(Prefab)
    private blockTxtPrefab: Prefab = null;
    @property(Prefab)
    private blockPrefab: Prefab = null;
    @property(Prefab)
    private blockLongPrefab: Prefab = null;
    @property(Prefab)
    private squarePrefab: Prefab = null;
    @property(Prefab)
    private dialogPrefab: Prefab = null;
    @property(Prefab)
    private messagePrefab: Prefab = null;
    @property(Prefab)
    private loadingPrefab: Prefab = null;

    @property(Node)
    private bg: Node = null;
    @property(Node)
    private mostBodyNode: Node = null;
    @property(Node)
    private backButtonNode: Node = null;
    @property(Node)
    private toggleButtonNode: Node = null;

    @property(Label)
    private headerLabel: Label = null;

    @property(SpriteFrame)
    private sscloth1SpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private sscloth2SpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private sscloth3SpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private sscloth4SpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private sscloth5SpriteFrame: SpriteFrame = null;

    @property(SpriteFrame)
    private aPotatoSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private aCabbageSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private aLiverSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private aBeefSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private aPepperSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private aCurdSpriteFrame: SpriteFrame = null;

    @property(SpriteFrame)
    private congeeSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private bakerySpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private beefSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private hamsSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private appleSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private bananaSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private noodleSpriteFrame: SpriteFrame = null;

    private mostSpace: number = 20;
    private blockHeight: number = 140;
    private dialogNode: Node = null;
    private messageNode: Node = null;
    private loadingNode: Node = null;
    private personalData: any = {};
    private selectNode: any = {};

    start() {
        this.personalData = window['personalData'] || JSON.parse(localStorage.getItem('personalData'));

        // this.initMostStores('wash');
        this.initMostStores(this.personalData.mostKey);
        this.initEvent();
    }

    initMostStores(type: string) {
        this.loadingNode = instantiate(this.loadingPrefab);
        this.loadingNode.active = false;
        this.bg.addChild(this.loadingNode);

        this.dialogNode = instantiate(this.dialogPrefab);
        this.dialogNode.getComponent(dialogCom).initDialog('input');
        this.dialogNode.active = false;
        this.bg.addChild(this.dialogNode);

        this.messageNode = instantiate(this.messagePrefab);
        this.messageNode.active = false;
        this.bg.addChild(this.messageNode);

        this.toggleButtonNode.active = false;

        if (['aRestaurant', 'hRestaurant', 'cRestaurant', 'wRestaurant', 'pharmacies', 'fondue', ].indexOf(type) > -1) {
            this.createBlock(type);
        } else if (['cultivate'].indexOf(type) > -1) {
            this.createLongBlock(type);
        } else if (['ssclean'].indexOf(type) > -1) {
            this.createSquare(type);
        } else {
            this.createBlockTxt(type);
        }
    }

    initEvent() {
        this.backButtonNode.on(Node.EventType.TOUCH_END, this.backButtonEvent, this);
        this.dialogNode.on('dialogEvent', this.dialogNodeEvent, this);
        this.loadingNode.on('progressOver', this.loadingNodeEvent, this);
    }

    createBlockTxt(type: string) {
        let body = this.mostBodyNode.getComponent(UITransform).getBoundingBoxToWorld();
        let width = body.width;
        let height = body.height;
        let blockWidth = (width - this.mostSpace * 4) / 3; // 块与块之间的间隔
        let blockHeight = blockWidth + 60;
        let x = -(width - blockWidth) / 2 + this.mostSpace;
        let y = (height - blockHeight) / 2 - this.mostSpace * 3;
        let cols = 3;
        let verticeX = x
        let title = MostStores[type].title;
        let key = MostStores[type].key;
        let list = MostStores[type].list;

        this.headerLabel.string = title;
        list.forEach((item, index) => {
            let blockTxtNode = instantiate(this.blockTxtPrefab);
            blockTxtNode.setPosition(new Vec3(x, y));
            blockTxtNode.getComponent(UITransform).setContentSize(blockWidth, blockHeight);
            blockTxtNode.getComponent(blockTxtCom).setBlockTxtCom({label1: item.title, label2: item.price + '元', img: this[item.key + 'SpriteFrame']})
            this.mostBodyNode.addChild(blockTxtNode);

            blockTxtNode.on(Node.EventType.TOUCH_END, () => {
                this.blockTxtEvent(item);
            }, this);

            x += (blockWidth + this.mostSpace);
            if ((index + 1) % cols === 0) {
                x = verticeX;
                y -= (blockHeight + this.mostSpace);
            }
        })
    }

    createBlock(type: string) {
        let body = this.mostBodyNode.getComponent(UITransform).getBoundingBoxToWorld();
        let width = body.width;
        let height = body.height;
        let blockWidth = (width - this.mostSpace * 3) / 2; // 块与块之间的间隔
        let blockHeight = this.blockHeight;   // 默认
        let x = -(width - blockWidth) / 2 + this.mostSpace;
        let y = (height - blockHeight) / 2 - this.mostSpace;
        let cols = 2;
        let verticeX = x
        let title = MostStores[type].title;
        let key = MostStores[type].key;
        let list = MostStores[type].list;

        this.headerLabel.string = title;
        list.forEach((item, index) => {
            let blockNode = instantiate(this.blockPrefab);
            blockNode.setPosition(new Vec3(x, y));
            blockNode.getComponent(UITransform).setContentSize(blockWidth, blockHeight);
            blockNode.getComponent(blockCom).setData({label1: item.title, label2: item.price + '¥', img: this[item.key + 'SpriteFrame']})
            this.mostBodyNode.addChild(blockNode);

            blockNode.on(Node.EventType.TOUCH_END, () => {
                this.blockEvent(item);
            }, this);

            x += (blockWidth + this.mostSpace);
            if ((index + 1) % cols === 0) {
                x = verticeX;
                y -= (blockHeight + this.mostSpace);
            }
        })
    }

    createLongBlock(type: string) {
        console.log(type);
    }

    createSquare(type: string) {
        let body = this.mostBodyNode.getComponent(UITransform).getBoundingBoxToWorld();
        let width = body.width;
        let height = body.height;
        let space = this.mostSpace * 3
        let blockWidth = (width - space * 3) / 2; // 块与块之间的间隔
        let blockHeight = blockWidth;   // 默认
        let x = -(width - blockWidth) / 2 + space;
        let y = (height - blockHeight) / 2 - space;
        let cols = 2;
        let verticeX = x
        let title = MostStores[type].title;
        let key = MostStores[type].key;
        let squareNum = MostStores[type].squareNum;

        for (let i = 0; i < squareNum; i++) {
            let blockNode = instantiate(this.squarePrefab);
            blockNode.setPosition(new Vec3(x, y));
            blockNode.getComponent(UITransform).setContentSize(blockWidth, blockHeight);
            this.mostBodyNode.addChild(blockNode);

            blockNode.on(Node.EventType.TOUCH_END, () => {
                // this.blockEvent();
            }, this);

            x += (blockWidth + space);
            if ((i + 1) % cols === 0) {
                x = verticeX;
                y -= (blockHeight + space);
            }
        }
    }

    backButtonEvent() {
        this.loadingNode.active = true;
        this.loadingNode.getComponent(loadingCom).updateCircle();
        director.preloadScene('personal', () => {
            director.loadScene('personal');
        })
    }

    blockTxtEvent(value: any) {
        let needInputDialog = ['saloon', 'bath'];
        this.selectNode = value;
        if (needInputDialog.indexOf(this.personalData.mostKey) > -1) {
            this.dialogNode.getComponent(dialogCom).initDialog('', value.title);
        } else {
            this.dialogNode.getComponent(dialogCom).initDialog('input');
        }
        this.dialogNode.active = true;
    }

    blockEvent(value: any) {
        let price = Number(value.price);
        let money = Number(this.personalData.liabilities?.money || 0);
        this.selectNode = value;
        if (money >= price) {
            this.loadingNode.active = true;
            this.loadingNode.getComponent(loadingCom).increaseProgress(this.personalData.processTime);
        } else {
            this.messageNode.setSiblingIndex(this.messageNode.parent.children.length - 1);
            this.messageNode.getComponent(messageCom).setMessage('金钱不够!');
        }
    }

    dialogNodeEvent(params) {
        if (params.type === 'sure') {
            if (this.personalData.rucksacks.length + Number(params.value) > 20) { // 背包格数
                this.messageNode.active = true;
                this.messageNode.getComponent(messageCom).setMessage('已超过背包最大容量!');
            } else {
                let t = [];
                for (let i = 0; i < Number(params.value); i++) {
                    t.push({...this.selectNode})
                }
                this.personalData.rucksacks.push(...t)
            }
        }
        this.dialogNode.getComponent(dialogCom).initValue();
        this.dialogNode.active = false;
    }

    loadingNodeEvent() {
        let price = this.selectNode.price;
        let str = '';

        this.loadingNode.active = false;
        this.personalData.liabilities.money -= price;
        str += `消费${price}元, `;
        // TODO  其他属性的变化
        if (this.selectNode.effect) {
            let { food, satiation } = this.selectNode.effect;
            if (food) {
                this.personalData.mood += food;
                str += `食物满足度${food}点, `;
            }
            if (satiation) {
                this.personalData.satiation += satiation;
                str += `饱食度增加${satiation}点.`;
            }
        }
        if (this.selectNode.time) {
            this.personalData.time += getTime(this.selectNode.time);
        }
        this.messageNode.getComponent(messageCom).setMessage(str);
    }

    onDestroy() {
        console.log('mostStores is destroy')
        window['personalData'] = this.personalData;
        localStorage.setItem('personalData', JSON.stringify(this.personalData));
    }

    update(deltaTime: number) {
        
    }
}

