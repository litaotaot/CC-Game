import { _decorator, Component, Label, Node, LabelComponent, Color, Vec3, view, UITransform, Prefab, instantiate, SpriteFrame, director } from 'cc';
const { ccclass, property } = _decorator;

import { Mobile } from './data';
import { appCom } from './components/appCom';
import { chatCom } from './components/chatCom';
import { blockLongCom } from './components/blockLongCom';

@ccclass('mobile')
export class mobile extends Component {

    @property(Prefab)
    private chatPrefab: Prefab = null;
    @property(Prefab)
    private blockLongPrefab: Prefab = null;
    @property(Prefab)
    private appPrefab: Prefab = null;

    @property(Node)
    private listNode: Node = null;
    @property(Node)
    private chatNode: Node = null; 
    @property(Node)
    private appNode: Node = null;
    @property(Node)
    private listScrollContent: Node = null;
    @property(Node)
    private chatScrollContent: Node = null;

    @property(Node)
    private chatBack: Node = null;
    @property(Node)
    private listBack: Node = null;
    @property(Node)
    private appBack: Node = null;



    @property(SpriteFrame)
    private achatSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private otherSpriteFrame: SpriteFrame = null;
    @property(SpriteFrame)
    private mySpriteFrame: SpriteFrame = null;

    private personalData: any = {};

    start() {
        this.personalData = window['personalData'] || JSON.parse(localStorage.getItem('personalData'));
        this.chatNode.active = false;
        this.listNode.active = false;
        // this.initList();
        // this.initChat();
        this.initApp();
        this.initEvent();
    }

    initEvent() {
        this.chatBack.on(Node.EventType.TOUCH_END, this.listEvent,this);
        this.listBack.on(Node.EventType.TOUCH_END, this.appEvent,this);
        this.appBack.on(Node.EventType.TOUCH_END, this.appBackEvent,this);
    }

    initChat(type: string = '') {
        let body = this.chatNode.getComponent(UITransform).getBoundingBoxToWorld();
        let width = body.width;
        let blockHeight = 100;
        let space = 20;
        let x = 0;
        let y = -(blockHeight) / 2 - space;
        let list = Mobile.list[type] || [];
        list.forEach(item => {
            let chatBlock = instantiate(this.chatPrefab);
            let spriteFrame = item.type === 'l' ? this.otherSpriteFrame : this.mySpriteFrame
            chatBlock.getComponent(chatCom).setValue(item.label, item.type, spriteFrame);
            chatBlock.setPosition(new Vec3(0, y));
            this.chatScrollContent.addChild(chatBlock);
            y -= blockHeight + space;
        })
        console.log(Math.abs(y) + blockHeight / 2 + space)
        this.chatScrollContent.getComponent(UITransform).setContentSize(width, Math.abs(y) + blockHeight / 2 + space);
    }

    initList() {
        let body = this.listNode.getComponent(UITransform).getBoundingBoxToWorld();
        let width = body.width;
        let space = 20;
        let blockWidth = width - space * 2;
        let blockHeight = 0;
        let y = 0;

        Mobile.friends.forEach((item, index) => {
            let block = instantiate(this.blockLongPrefab);
            blockHeight = block.getComponent(UITransform).height;
            if (index === 0) {
                y = -blockHeight / 2 - space;
            } else {
                y -= blockHeight;
            }
            block.getComponent(blockLongCom).setValue({ label2: item.name });
            block.getComponent(UITransform).setContentSize(blockWidth, blockHeight);
            block.setPosition(new Vec3(0, y));
            block.on(Node.EventType.TOUCH_END, () => {
                this.chatEvent(item);
            })
            this.listScrollContent.addChild(block);
        })
        console.log(Math.abs(y) + blockHeight / 2 + space)
        this.listScrollContent.getComponent(UITransform).setContentSize(width, Math.abs(y) + blockHeight / 2 + space);

        // this.listNode.addChild(block);
    }

    initApp() {
        let body = this.appNode.getComponent(UITransform).getBoundingBoxToWorld();
        let width = body.width;
        let height = body.height;
        let col = 4;
        let blockWidth = 120;
        let blockHeight = 160;
        let space = (width - blockWidth * col) / 5;
        let x = (-width + blockWidth) / 2 + space;
        let y = (height - blockHeight) / 2 - space;

        Mobile.app.forEach((item, index) => {
            let block = instantiate(this.appPrefab);
            block.getComponent(appCom).setValue({ label: item.name, sprite: this.achatSpriteFrame });
            block.setPosition(new Vec3(x, y));
            block.on(Node.EventType.TOUCH_END, () => {
                this.listEvent(item)
            })
            this.appNode.addChild(block);

            if (index % col === col - 1) {
                x = (-width + blockWidth) / 2 + space;
                y -= blockHeight + space;
            } else {
                x += blockWidth + space;
            }
        })

    }

    listEvent(item: any) {
        this.appNode.active = false;
        this.chatNode.active = false;
        this.listNode.active = true;
        this.initList();
    }

    chatEvent(item: any) {
        this.appNode.active = false;
        this.listNode.active = false;
        this.chatNode.active = true;
        this.initChat('event1');
    }

    appEvent(item: any) {
        this.appNode.active = true;
        this.listNode.active = false;
        this.chatNode.active = false;
        this.initApp();
    }

    appBackEvent() {
        director.preloadScene('personal', () => {
            director.loadScene('personal');
        })
    }

    update(deltaTime: number) {
        
    }
}

