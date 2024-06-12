import { _decorator, Component, Label, Node, Prefab, director, instantiate, Vec3, UITransform, Color, SpriteFrame, view } from 'cc';
const { ccclass, property } = _decorator;

import { squareCom } from './components/squareCom'; 
import { dialogCom } from './components/dialogCom';

@ccclass('rucksacks')
export class rucksacks extends Component {

    @property(Prefab)
    private rucksacksPrefab: Prefab = null;
    @property(Prefab)
    private dialogPrefab: Prefab = null;

    @property(Node)
    private bg: Node = null;
    @property(Node)
    private rucksacksBody: Node = null;
    @property(Node)
    private rucksacksBodyStatus: Node = null;
    @property(Node)
    private rucksacksAc: Node = null;
    @property(Node)
    private backButtonNode: Node = null;
    @property(Node)
    private toggleButtonNode: Node = null;
    @property(Node)
    private useButtonNode: Node = null;
    @property(Node)
    private discardButtonNode: Node = null;
    @property(Node)
    private unloadButtonNode: Node = null;


    @property(Label)
    private weightLabel: Label = null;
    @property(Label)
    private rucksacksLabel: Label = null;

    // food
    @property(SpriteFrame)
    private cucumberSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private capsicumSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private cabbageSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private potatoSpriteFrame: SpriteFrame = null;

    // clothes
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

    private squareNodeList: Node[] = [];
    private squareSpace: number = 10;
    private selectNode: any = {};
    private dialogNode: Node = null;
    private personalData: any = {};
    private squareHeight: number = 0;
    private squareVerticalX: number = 0;
    private squareVerticalY: number = 0;

    start() {
        this.personalData = window['personalData'] || JSON.parse(localStorage.getItem('personalData'));
        this.initRucksacks();
        this.initEvent();
    }

    initEvent() {
        this.backButtonNode.on(Node.EventType.TOUCH_END,  this.backButtonEvent, this);
        this.toggleButtonNode.on(Node.EventType.TOUCH_END, this.toggleButtonEvent, this);
        this.useButtonNode.on(Node.EventType.TOUCH_END, this.useButtonEvent, this);
        this.discardButtonNode.on(Node.EventType.TOUCH_END, this.discardButtonEvent, this);
        this.unloadButtonNode.on(Node.EventType.TOUCH_END, this.unloadButtonEvent, this);

        this.dialogNode.on('dialogEvent', (event) => {
            this.dialogNodeEvent(event)
        });
    }

    initRucksacks() {
        let wrap = this.rucksacksBody.getComponent(UITransform).getBoundingBoxToWorld();
        let wrapWidth = wrap.width;
        let wrapHeight = wrap.height;
        let squareHeight = this.squareHeight = (wrapWidth - 30) / 4 || 100;
        let squareVerticalX = this.squareVerticalX = -wrapWidth / 2 + squareHeight / 2;
        let squareVerticalY = this.squareVerticalY = wrapHeight / 2 - squareHeight / 2;
        let rucksacks = this.personalData.rucksacks || [];
        
        this.dialogNode = instantiate(this.dialogPrefab);
        // this.dialogNode.getComponent(dialogCom).initDialog();
        this.bg.addChild(this.dialogNode);
        this.dialogNode.active = false;
        this.rucksacksBodyStatus.active = false;
        this.createSquare(squareVerticalX, squareVerticalY, squareHeight, rucksacks);
        this.createStatus(wrapWidth, wrapHeight, squareHeight);
    }

    createSquare(squareVerticalX: number, squareVerticalY: number, squareHeight:number, rucksacks: Array<any>) {
        let x = squareVerticalX;
        let y = squareVerticalY;
        let cols = 4;
        for (let i = 0; i < 20; i++) {
            let rucksacksNode = instantiate(this.rucksacksPrefab);
            rucksacksNode.getComponent(UITransform).setContentSize(squareHeight, squareHeight);
            if (rucksacks[i]) {
                let node = rucksacksNode.getComponent(squareCom)
                node.setSquareFrame(this[rucksacks[i].key + 'SpriteFrame']);
                node.setSquareLabel(rucksacks[i].num);
            }
            rucksacksNode.setPosition(new Vec3(x, y));
            this.rucksacksBody.addChild(rucksacksNode);
            this.squareNodeList.push(rucksacksNode);

            rucksacksNode.on(Node.EventType.TOUCH_END, () => {
                this.rucksackEvent(i);
            },this)

            if ((i + 1) % cols === 0) {
                x = squareVerticalX;
                y -= squareHeight + this.squareSpace;
            } else {
                x += squareHeight + this.squareSpace;
            }
        }
    }

    createStatus(wrapWidth: number, wrapHeight: number, squareHeight:number) {
        let ac = this.rucksacksAc.getComponent(UITransform).getBoundingBoxToWorld();
        let acWidth = ac.width;
        let acHeight = ac.height;
        let squareSpace = 20
        let cols = 2;
        let x = - acWidth / 2 - squareHeight / 2 - squareSpace;
        let y = acHeight / 2 - squareHeight / 4;
        let squareVerticalY = y;

        for (let i = 0; i < 4; i++) {
            let rucksacksNode = instantiate(this.rucksacksPrefab);
            rucksacksNode.getComponent(UITransform).setContentSize(squareHeight, squareHeight);
            
            rucksacksNode.setPosition(new Vec3(x, y));
            this.rucksacksBodyStatus.addChild(rucksacksNode);

            rucksacksNode.on(Node.EventType.TOUCH_END, () => {
                this.rucksackEvent(i);
            },this)

            if ((i + 1) % cols === 0) {
                y = squareVerticalY;
                x += squareHeight + 20 + 20 + acWidth;
            } else {
                y -= squareHeight + squareSpace;
            }
        }
    }

    rucksackEvent(i: number) {
        let rucksacks = this.personalData.rucksacks || [];
        this.squareNodeList.forEach((squareNode, index) => {
            squareNode.getComponent(squareCom).setSquareBackground(new Color(209, 210, 210, 255));
            if (i === index && rucksacks[i]) {
                squareNode.getComponent(squareCom).setSquareBackground(new Color(241, 189, 55, 255));
                this.selectNode = rucksacks[i];
            }
        })
    }

    backButtonEvent() {
        director.preloadScene('personal', () => {
            director.loadScene('personal');
        })
    }

    toggleButtonEvent() {
        this.rucksacksBodyStatus.active = !this.rucksacksBodyStatus.active;
        this.rucksacksBody.active = !this.rucksacksBody.active;
        this.selectNode = null;
    }

    useButtonEvent() {}

    discardButtonEvent() {
        let type = this.selectNode.num ? 'input' : '';
        this.dialogNode.getComponent(dialogCom).initDialog(type);
        this.dialogNode.active = true;
    }

    unloadButtonEvent() {

    }

    dialogNodeEvent(event: { type: string, value: string }) {
        let rucksacks = this.personalData.rucksacks || []
        if (event.type === 'sure') {
            let num = Number(event.value);
            this.personalData.rucksacks = rucksacks.map((rucksack, index) => {
                if (rucksack.key === this.selectNode.key) {
                    if (rucksack.num && rucksack.num > num) {
                        rucksack.num -= num;
                    } else {
                        rucksack = null;
                    }
                }
                return rucksack;
            })
            this.personalData.rucksacks.filter(rucksack => rucksack);
        }   
        this.createSquare(this.squareVerticalX, this.squareVerticalY, this.squareHeight, this.personalData.rucksacks);
        this.dialogNode.active = false;

    }

    onDestroy() {
        console.log('foodMarket is destroy')
        window['personalData'] = this.personalData;
    }

    update(deltaTime: number) {
        
    }
}

