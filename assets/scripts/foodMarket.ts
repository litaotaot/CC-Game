import { _decorator, Component, instantiate, Node, Prefab, Vec3, view, SpriteFrame, director } from 'cc';
const { ccclass, property } = _decorator;

import { blockCom } from './components/blockCom'
import { dialogCom } from './components/dialogCom'
import { Food } from './data'

@ccclass('foodMarket')
export class foodMarket extends Component {

    @property(Prefab)
    private blockPrefab: Prefab = null;
    @property(Prefab)
    private dialogPrefab: Prefab = null;

    @property(Node)
    private bg: Node = null;
    @property(Node)
    private marketNode: Node = null;
    @property(Node)
    private fruitsButtonNode: Node = null;
    @property(Node)
    private meatsButtonNode: Node = null;
    @property(Node)
    private seafoodButtonNode: Node = null;
    @property(Node)
    private backButtonNode: Node = null;

    @property(SpriteFrame)
    private porkSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private fishSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private cucumberSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private capsicumSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private cabbageSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private potatoSpriteFrame: SpriteFrame = null;

    private offsetViewTop: number = 200; // 编辑器中设置的偏移量
    // private blockWidth: number = 340;
    private blockHeight: number = 140;
    private foodTypeKey: string = 'fruit';
    private verticeX: number = 0;
    private verticeY: number = 0;
    private dialogNode: Node = null;
    private selectNodeValue: any = null;
    private personalData: any = {};

    start() {
        this.personalData = window['personalData'] || JSON.parse(localStorage.getItem('personalData'));
        this.initFoodMarket();
        this.initEvent();
    }

    initEvent() {
        this.fruitsButtonNode.on(Node.EventType.TOUCH_END, this.fruitsButtonEvent, this);
        this.meatsButtonNode.on(Node.EventType.TOUCH_END, this.meatButtonEvent, this);
        this.seafoodButtonNode.on(Node.EventType.TOUCH_END, this.seafoodButtonEvent, this);
        this.backButtonNode.on(Node.EventType.TOUCH_END, this.backButtonEvent, this);

        this.dialogNode.on('dialogEvent', (event) => {
            this.dialogNodeEvent(event)
        });
    }

    initFoodMarket() {
        let width = view.getVisibleSize().width;
        let height = view.getVisibleSize().height;
        let offsetHeight = height - this.offsetViewTop
        this.verticeX = -(width - 30) / 2 / 2;
        this.verticeY =offsetHeight / 2 - (this.blockHeight / 2)

        this.dialogNode = instantiate(this.dialogPrefab);
        this.dialogNode.getComponent(dialogCom).initDialog('input');
        this.dialogNode.active = false;
        this.bg.addChild(this.dialogNode);

        this.createNode(this.verticeX, this.verticeY, Food.foodObj[this.foodTypeKey])
    }

    createNode(x: number, y: number, foods: any[]) {
        foods.forEach((food, index) => {
            let foodNode = instantiate(this.blockPrefab);
            let label2 = food.price + '¥/斤';
            foodNode.getComponent(blockCom).setData({label1: food.title, label2, img: this[food.key + 'SpriteFrame']});
            foodNode.setPosition(new Vec3(x, y));
            this.marketNode.addChild(foodNode);

            foodNode.on(Node.EventType.TOUCH_END, () => {
                this.foodNodeEvent(food)
            }, this)

            y -= (index % 2) * this.blockHeight;
            x = -x;
        })
    }

    foodNodeEvent(value: any) {
        this.selectNodeValue = value;
        this.dialogNode.active = true;
        this.dialogNode.getComponent(dialogCom).initValue();
    }

    fruitsButtonEvent() {
        if (this.foodTypeKey === 'fruit') return;
        this.foodTypeKey = 'fruit';
        this.marketNode.removeAllChildren();
        this.createNode(this.verticeX, this.verticeY, Food.foodObj[this.foodTypeKey])
    }
    meatButtonEvent() {
        if (this.foodTypeKey === 'meat') return;
        this.foodTypeKey = 'meat';
        this.marketNode.removeAllChildren();
        this.createNode(this.verticeX, this.verticeY, Food.foodObj[this.foodTypeKey])
    }
    seafoodButtonEvent() {
        if (this.foodTypeKey === 'seafood') return;
        this.foodTypeKey = 'seafood';
        this.marketNode.removeAllChildren();
        this.createNode(this.verticeX, this.verticeY, Food.foodObj[this.foodTypeKey])
    }
    backButtonEvent() {
        director.preloadScene('personal', () => {
            director.loadScene('personal');
        })
    }

    dialogNodeEvent(event: { type: string, value: string }) {
        console.log(event, this.selectNodeValue)
        if (event.type === 'sure') {
            let num = Number(event.value);
            let price = Number(this.selectNodeValue.price);
            this.personalData.rucksacks.push({...this.selectNodeValue, num})
            this.personalData.liabilities.money -= price * num;
        }   
        this.selectNodeValue = null;
        this.dialogNode.active = false;
    }

    onDestroy() {
        console.log('foodMarket is destroy')
        window['personalData'] = this.personalData;
        // TODO
        localStorage.setItem('personalData', JSON.stringify(this.personalData))
    }

    update(deltaTime: number) {
        
    }
}

