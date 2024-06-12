import { _decorator, Component, Node, Prefab, instantiate, Sprite, SpriteFrame, EventTouch, Vec3, view, UITransform, Scene, SceneAsset, director } from 'cc';
const { ccclass, property } = _decorator;

import { bgImgCom } from './components/bgImgCom';
import { buttonCom } from './components/buttonCom';

const storys = {
    1: ['在这个城市里',
    '总有一些故事',
    '总有一些人',
    '和我们一样'],
    2: ['故事的背景开始啦'],
    3: ['开场白来啦, 开始游戏啦']
}

const data = {
    name: '傻根',
    age: 19,
    sex: '男',
    health: 100,
    satiation: 100, // 饱食度
    food: 100,  // 满足度
    mood: 100,  // 心情

    liabilities: {
        money: 100, // 金钱
    },

    time: new Date('2002-01-01 06:00:00').getTime(), // 时间
    event: [], // 事件
    rucksacks: [], // 背包

    processTime: 3, // 动画时间

    mostKey: '', // 暂时用不上
    engineering: null,  // 培训资格证
    mechanic: null,  // 培训资格证
    chef: null,  // 培训资格证
    sessional: null,  // 培训资格证
    managerial: null,  // 培训资格证

    experience: 0,
    level: 1,
}

@ccclass('game')
export class game extends Component {

    @property(Node)
    private bg: Node = null;
    @property(Prefab)
    private bgImgPrefab: Prefab = null;
    @property(Prefab)
    private buttonPrefab: Prefab = null;

    @property(SpriteFrame)
    private bgSpriteFrame1: SpriteFrame = null;
    @property(SpriteFrame)
    private bgSpriteFrame2: SpriteFrame = null;
    @property(SpriteFrame)
    private bgSpriteFrame3: SpriteFrame = null;

    private step: number = 1;


    start() {
        console.log('game start')
        this.originBgStorage();
    }

    originBgStorage() {
        let bgImgNode = instantiate(this.bgImgPrefab);
        bgImgNode.getComponent(Sprite).spriteFrame = this.bgSpriteFrame1;
        bgImgNode.getComponent(bgImgCom).setArrString(storys[this.step]);
        this.bg.addChild(bgImgNode);
        bgImgNode.on(Node.EventType.TOUCH_END, this.bgImgEvent, this);
    }

    bgImgEvent(event: EventTouch) {
        let bgImgNode = event.currentTarget; // 获取当前触发事件的节点
        let spriteComponent = bgImgNode.getComponent(Sprite); // 获取节点上的 Sprite 组件
        if (spriteComponent && this.step !== 3) {
            this.step = Math.min(this.step + 1, 3);
            // 假设你已经有了一个新的 SpriteFrame 对象，用于替换原有图片
            let bgSpriteFrame = this['bgSpriteFrame' + this.step];
            let story = storys[this.step];
            spriteComponent.spriteFrame = bgSpriteFrame;
            bgImgNode.getComponent(bgImgCom).setArrString(story);
            // bgImgNode.off(Node.EventType.TOUCH_END, this.bgStartEvent, this);

            // 创建button
            if (this.step === 3) {
                let buttonNode = instantiate(this.buttonPrefab);
                // let width = view.getVisibleSize().width;
                let height = view.getVisibleSize().height;
                let nodeWidth = 200;
                let nodeHeight = 80;
                buttonNode.getComponent(UITransform).setContentSize(nodeWidth, nodeHeight);
                buttonNode.getComponent(buttonCom).setString('开始游戏');
                buttonNode.setPosition(new Vec3(0, nodeHeight * 1.5 - (height / 2)))
                bgImgNode.addChild(buttonNode);
                buttonNode.on(Node.EventType.TOUCH_END, this.buttonEvent, this);
            }
        }
    }

    // bgStartEvent(event: EventTouch) {

    // }

    buttonEvent(event: EventTouch) {
        window['personalData'] = data;
        localStorage.setItem('personalData', JSON.stringify(data));
        director.preloadScene('personal', () => {
            console.log('load personal scene')
            director.loadScene("personal");  // 人力资源市场
        })
    }

    update(deltaTime: number) {
        
    }
}

