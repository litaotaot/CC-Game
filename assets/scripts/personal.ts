import { _decorator, Component, Label, Node, Prefab, Vec3, SpriteFrame, director, instantiate, view, UITransform } from 'cc';
const { ccclass, property } = _decorator;

import { blockCom } from './components/blockCom'
import { dialogCom } from './components/dialogCom';
import { messageCom } from './components/messageCom';
import { loadingCom } from './components/loadingCom';
import { StoreAndStreet } from './data'
import { formatTime, getTime, randomValue, randomBoolean, setPersonalData } from './tools'

@ccclass('personal')
export class personal extends Component {

    @property(Prefab)
    private blockPrefab: Prefab = null;
    @property(Prefab)
    private dialogPrefab: Prefab = null;
    @property(Prefab)
    private loadingPrefab: Prefab = null;
    @property(Prefab)
    private messagePrefab: Prefab = null;

    @property(Node)
    private personalNode: Node = null;
    @property(Node)
    private personalImgNode: Node = null;
    @property(Node)
    private personalScrollView: Node = null;
    @property(Node)
    private personalScrollContent: Node = null;
    @property(Node)
    private overDayButtonNode: Node = null;
    @property(Node)
    private rucksacksNode: Node = null;

    @property(Label)
    private HealthLabel: Label = null;
    @property(Label)
    private MoodLabel: Label = null;
    @property(Label)
    private SatiationLabel: Label = null;
    @property(Label)
    private FoodLabel: Label = null;
    @property(Label)
    private AgeLabel: Label = null;
    @property(Label)
    private LevelLabel: Label = null;
    @property(Label)
    private MoneyLabel: Label = null;
    @property(Label)
    private TimeLabel: Label = null;
    @property(Label)
    private EventLabel1: Label = null;
    @property(Label)
    private EventLabel2: Label = null;
    @property(Label)
    private EventLabel3: Label = null;

    @property(SpriteFrame)
    private eastSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private westSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private northSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private southSpriteFrame: SpriteFrame = null;

    @property(SpriteFrame)
    private aRestaurantSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private ssclothSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private sscleanSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private bathSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private saloonSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private fondueSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private hRestaurantSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private mahjongSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private convenienceSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private ktvSpriteFrame: SpriteFrame = null;

    private bodyVerticeX: number = 0;
    private bodyVerticeY: number = 0;
    private blockSpace: number = 10;
    private blockWidth: number = 340;
    private blockHeight: number = 140;
    private offsetViewTop: number = 400 + 120;
    private contentWrapHeight: number = 760;
    private personalData: any = {};
    private selectStore: any = {};
    private dialogNode: Node = null;
    private loadingNode: Node = null;
    private messageNode: Node = null;
    private mostStores: Array<string> = ['sscloth', 'ssclean', 'aRestaurant', 'convenience', 'fondue', 'saloon', 'hRestaurant', 'bath'];
    private dialogStores: Array<string> = ['eggRice', 'soyMilk', 'pancake'];
    private loadingStores: Array<string> = ['ktv', 'mahjong']

    start() {
        this.personalData = window['personalData'] || JSON.parse(localStorage.getItem('personalData'));
        console.log(this.personalData)
        this.initStore();
        this.initEvent();
        this.initInfo();
    }

    initEvent() {
        this.overDayButtonNode.on(Node.EventType.TOUCH_END, this.overDayButtonEvent, this);
        this.rucksacksNode.on(Node.EventType.TOUCH_END, this.rucksacksEvent, this);
        this.dialogNode.on('dialogEvent', (event) => {
            this.dialogNodeEvent(event)
        });
    }

    initInfo() {
        this.HealthLabel.string = '健康度: ' + this.personalData.health;
        this.MoodLabel.string = '心情度: ' + this.personalData.mood;
        this.SatiationLabel.string = '饱食度: ' + this.personalData.satiation;
        this.FoodLabel.string = '食物满足度: ' + this.personalData.food;
        this.AgeLabel.string = '年龄: ' + this.personalData.age;
        this.LevelLabel.string = '等级: ' + this.personalData.level;
        this.MoneyLabel.string = '钱包: ' + this.personalData.liabilities.money;
        this.TimeLabel.string = formatTime(this.personalData.time);

        // this.EventLabel1.string = this.personalData.event1;
        // this.EventLabel2.string = this.personalData.event2;
        // this.EventLabel3.string = this.personalData.event3;
    }

    initStore() {
        let width = view.getVisibleSize().width;
        let height = view.getVisibleSize().height;
        let offsetHeight = height - this.offsetViewTop;
        this.bodyVerticeX = -(width - this.blockWidth) / 2 + this.blockSpace;
        this.bodyVerticeY = - (this.blockHeight / 2 + this.blockSpace);

        this.dialogNode = instantiate(this.dialogPrefab);
        this.dialogNode.getComponent(dialogCom).initDialog('input');
        this.personalNode.addChild(this.dialogNode);
        this.dialogNode.active = false;

        this.messageNode = instantiate(this.messagePrefab);
        this.personalNode.addChild(this.messageNode);
        this.messageNode.active = false;

        this.loadingNode = instantiate(this.loadingPrefab);
        this.personalNode.addChild(this.loadingNode);
        this.loadingNode.active = false;

        this.createNode(this.bodyVerticeX, this.bodyVerticeY, StoreAndStreet.streets)
    }

    createNode(x: number, y: number, streets: any[]) {
        let cHeight = Math.ceil(streets.length / 2) * (this.blockHeight + this.blockSpace) + this.blockSpace;
        this.setContentHeight(cHeight);
        streets.forEach((street, index) => {
            let streetNode = instantiate(this.blockPrefab);

            streetNode.getComponent(blockCom).setData({label2: street.title, img: this[street.key + 'SpriteFrame']});
            streetNode.setPosition(new Vec3(x, y));
            this.personalScrollContent.addChild(streetNode);

            streetNode.on(Node.EventType.TOUCH_END, () => {
                this.streetNodeEvent(street);
            }, this)

            y -= (index % 2) * this.blockHeight;
            x = -x;
        })
    }

    streetNodeEvent(street: any) {
        let streets = ['east', 'west', 'north', 'south'];
        let x = this.bodyVerticeX
        let y = this.bodyVerticeY
        let stores = StoreAndStreet.stores[street.key];
        let cHeight = Math.ceil(stores.length / 2) * (this.blockHeight + this.blockSpace) + this.blockSpace;
        this.setContentHeight(cHeight);
        this.personalScrollContent.removeAllChildren();
        stores.forEach((store, index) => {
            let storeNode = instantiate(this.blockPrefab);
            let time = store.time ? `${store.time.value}${store.time.type === 'hour' ? '/小时' : '/分钟'}` : '';
            let params = {
                label1: store.title,
                label2: store.price ? `${store.price.value}${store.price.unit}` : time,
                label3: store.price ? time : '',
                img: this[store.key + 'SpriteFrame'],
            };

            storeNode.getComponent(blockCom).setData(params);
            storeNode.setPosition(new Vec3(x, y));
            this.personalScrollContent.addChild(storeNode);

            storeNode.on(Node.EventType.TOUCH_END, () => {
                if (streets.indexOf(store.key) > -1) {
                    this.streetNodeEvent(store)
                } else {
                    this.storeNodeEvent(store);
                }
            }, this)

            y -= (index % 2) * this.blockHeight;
            x = -x;
        })
    }

    storeNodeEvent(store: any) {
        this.selectStore = store;
        if (store.key === 'labor') {
            // TODO loading状态添加
            director.preloadScene('laborMarket', () => {
                director.loadScene('laborMarket');
            });
        }
        if (store.key === 'foodMarket') {
            director.preloadScene('foodMarket', () => {
                director.loadScene('foodMarket');
            });
        }
        if (store.key === 'cultivate') {
            director.preloadScene('trainingSchool', () => {
                director.loadScene('trainingSchool');
            });
        }
        if (this.mostStores.indexOf(store.key) > -1) {
            this.personalData.mostKey = store.key
            director.preloadScene('mostStores', () => {
                director.loadScene('mostStores');
            });
        }
        if (this.dialogStores.indexOf(store.key) > -1) {
            this.dialogNode.getComponent(dialogCom).initDialog('input');
            this.dialogNode.active = true; 
        }
        if (this.loadingStores.indexOf(store.key) > -1) {
            let price = store.price ? store.price.value : 0;
            switch (store.key) {
                case 'ktv':
                    this.dialogNode.getComponent(dialogCom).initDialog('', `是否消费${price}进入ktv?`);
                    break;
                case 'mahjong':
                    this.dialogNode.getComponent(dialogCom).initDialog('', `是否消费${price}进入麻将馆?`);
                    break;
            }
            // this.dialogNode.getComponent(dialogCom).initDialog('');
            this.dialogNode.active = true; 
        }
    }

    overDayButtonEvent() {
        // window['personalData'] = this.personalData;
        localStorage.setItem('personalData', JSON.stringify(this.personalData));
    }

    rucksacksEvent() {
        director.preloadScene('rucksacks', () => {
            director.loadScene('rucksacks');
        });
    }

    dialogNodeEvent(event: { type: string, value: string }) {
        if (event.type === 'sure') {
            this.loadingNode.active = true;
            this.loadingNode.getComponent(loadingCom).increaseProgress({
                cb: () => {
                    this.loadingNodeEvent(event.value);
                },
            });
        } else {
            this.dialogNode.active = false;
        }
    }

    loadingNodeEvent(value: number|string) {
        let num = Number(value || 0);
        let time = this.selectStore.time;
        let effect = this.selectStore.effect || {};
        let { food = 0, satiation = 0, mood = 0 } = effect
        let price = Number(this.selectStore.price ? this.selectStore.price.value : 0);

        if (this.loadingStores.indexOf(this.selectStore.key) > -1) {
            if (this.selectStore.key === 'mahjong') {
                let bool = randomBoolean();
                let money = randomValue();
                let mahPrice = bool ? money : -money;
                mood += bool ? 20 : -20;
                this.messageActive(`失去${price}元, 打麻将${mahPrice}元, 心情上升${mood}!`)
            } else {
                this.messageActive(`失去${price}元, 心情上升${mood}!`)
            }
        }

        // this.personalData.liabilities.money -= price * num;
        // this.personalData.time += getTime(time);
        // this.personalData.food += food * num;
        // this.personalData.mood += mood * num;
        // this.personalData.satiation += satiation * num;
        this.personalData = setPersonalData(this.personalData, { num, time, price, food, mood, satiation })

        this.initInfo();
        this.dialogNode.active = false;
        this.loadingNode.active = false;
    }

    setContentHeight(cHeight) {
        let wrap = this.personalScrollView.getComponent(UITransform).getBoundingBoxToWorld();
        let wrapHeight = wrap.height ?? this.contentWrapHeight;
        let wrapWidth = wrap.width;
        if (cHeight > wrapHeight) {
            this.personalScrollContent.getComponent(UITransform).setContentSize(wrapWidth, cHeight);
        }
    }

    messageActive(value: string) {
        this.messageNode.setSiblingIndex(this.messageNode.parent.children.length - 1);
        this.messageNode.getComponent(messageCom).setMessage(value);
    }

    onDestroy() {
        console.log('mostStores is destroy')
        window['personalData'] = this.personalData;
        localStorage.setItem('personalData', JSON.stringify(this.personalData));
    }

    update(deltaTime: number) {
        
    }
}

