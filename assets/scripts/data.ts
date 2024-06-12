import { squareCom } from "./components/squareCom"

const Labor = {
    type: [
        {
            title: '初级',
            type: 'junior'
        },
        {
            title: '中级',
            type: 'middle'
        },
        {
            title: '高级',
            type: 'senior'
        }
    ],
    workObj: {
        junior: [
            {
                title: '工地务工',
                salary: { value: 100, unit: '/次(中介抽取10%)' },
                settle: '日结',
                time: { value: 4, type: 'hour', unit: '小时' },
                effect: { mood: -20, satiation: -70 },
                key: 'cooly'
            },
            {
                title: '美因外卖',
                salary: { value: 100, unit: '/次(中介抽取10%)' },
                settle: '日结',
                time: { value: 4, type: 'hour', unit: '小时' },
                effect: { mood: -20, satiation: -60 },
                key: 'takeaway'
            },
            {
                title: '大件搬运',
                salary: { value: 100, unit: '/次(中介抽取10%)' },
                settle: '日结',
                time: { value: 4, type: 'hour', unit: '小时' },
                effect: { mood: -20, satiation: -70 },
                key: 'portage'
            }
        ],
        middle: [
            {
                title: '保安',
                salary: { value: 150, unit: '/次(中介抽取10%)' },
                settle: '日结',
                time: { value: 4, type: 'hour', unit: '小时' },
                effect: { mood: -10, satiation: -50 },
                key: 'ensure'
            },
            {
                title: '物流分拣',
                salary: { value: 150, unit: '/次(中介抽取10%)' },
                settle: '日结',
                time: { value: 4, type: 'hour', unit: '小时' },
                effect: { mood: -15, satiation: -60 },
                key: 'sorter'
            },
            {
                title: '传单',
                salary: { value: 150, unit: '/次(中介抽取10%)' },
                settle: '日结',
                time: { value: 4, type: 'hour', unit: '小时' },
                effect: { mood: -15, satiation: -60 },
                key: 'flier'
            },
            {
                title: '餐厅洗碗工',
                salary: { value: 150, unit: '/次(中介抽取10%)' },
                settle: '日结',
                time: { value: 3, type: 'hour', unit: '小时' },
                effect: { mood: -10, satiation: -50 },
                key: 'dishwasher'
            }
        ],
        senior: [
            {
                title: '网管',
                salary: { value: 200, unit: '/次(中介抽取10%)' },
                settle: '日结',
                time: { value: 4, type: 'hour', unit: '小时' },
                effect: { mood: -10, satiation: -50 },
                key: 'network'
            },
            {
                title: '快递管理员',
                salary: { value: 200, unit: '/次(中介抽取10%)' },
                settle: '日结',
                time: { value: 4, type: 'hour', unit: '小时' },
                effect: { mood: -10, satiation: -50 },
                key: 'network'
            },
            {
                title: '酒吧服务员',
                salary: { value: 200, unit: '/次(中介抽取10%)' },
                settle: '日结',
                time: { value: 4, type: 'hour', unit: '小时' },
                effect: { mood: -10, satiation: -50 },
                key: 'network'
            },
            {
                title: 'KTV接待员',
                salary: { value: 200, unit: '/次(中介抽取10%)' },
                settle: '日结',
                time: { value: 4, type: 'hour', unit: '小时' },
                effect: { mood: -10, satiation: -50 },
                key: 'network'
            }
        ]
    }
}

const Food = {
    type: [
        {
            title: '蔬菜',
            type: 'fruit'
        },
        {
            title: '肉类',
            type: 'meat'
        },
        {
            title: '海鲜',
            type: 'seafood'
        }
    ],
    foodObj: {
        fruit: [
            {
                title: '黄瓜',
                price: '2',
                key: 'cucumber'
            },
            {
                title: '辣椒',
                price: '2',
                key: 'capsicum'
            },
            {
                title: '包菜',
                price: '3',
                key: 'cabbage'
            },
            {
                title: '土豆',
                price: '3',
                key: 'potato'
            }
        ],
        meat: [
            {
                title: '猪肉',
                price: '10/斤',
                key: 'pork'
            },
            {
                title: '猪肉',
                price: '10/斤',
                key: 'pork'
            },
            {
                title: '猪肉',
                price: '10/斤',
                key: 'pork'
            },
            {
                title: '猪肉',
                price: '10/斤',
                key: 'pork'
            }
        ],
        seafood: [
            {
                title: '鱼',
                price: '20/斤',
                key: 'fish'
            },
            {
                title: '鱼',
                price: '20/斤',
                key: 'fish'
            },
            {
                title: '鱼',
                price: '20/斤',
                key: 'fish'
            },
            {
                title: '鱼',
                price: '20/斤',
                key: 'fish'
            }
        ]
    }
}

const Personal = {
    
}

const StoreAndStreet = {
    streets: [
        {
            title: '东街道',
            key: 'east'
        },
        {
            title: '西街道',
            key: 'west'
        },
        {
            title: '南街道',
            key: 'south'
        }
        ,
        {
            title: '北街道',
            key: 'north'
        }
    ],
    stores:{
        east: [
            {
                title: '安家客',
                key: 'house'
            },
            {
                title: '小鸟驿站',
                key: 'horse'
            },
            {
                title: '西虹大药房',
                key: 'pharmacies'
            },
            {
                title: '中餐厅',
                key: 'cRestaurant'
            },
            {
                title: '西餐厅',
                key: 'wRestaurant'
            },
            {
                title: '西虹大商城',
                key: 'shop'
            },
            {
                title: '西虹网吧',
                key: 'internet'
            },
            {
                title: '汽修',
                key: 'mechanic'
            },
            {
                title: '旅行社',
                key: 'travel'
            },
            
            // {
            //     title: '乔杉平价旅馆',
            //     key: 'motel'
            // }, 
            {
                title: '西街道',
                key: 'west'
            },    
            {
                title: '南街道',
                key: 'south'
            },
            {
                title: '北街道',
                key: 'north'
            }
        ],
        west: [
            {
                title: '东街道',
                key: 'east'
            },
            {
                title: '南街道',
                key: 'south'
            },
            {
                title: '北街道',
                key: 'north'
            },
            {
                title: '人力资源市场',
                time: { value: 15, type: 'minute' },
                key: 'labor'
            },
            {
                title: '平价餐馆',
                time: { value: 5, type: 'minute' },
                key: 'aRestaurant'
            },
            {
                title: '公园',
                time: { value: 15, type: 'minute' },
                key: 'park'
            },
            {
                title: '煎饼果子摊位',
                price: '6',
                attributes: '满(-1), 饱(+30)',
                effect: { satiation: 40, food: -2 },
                time: { value: 20, type: 'minute' },
                key: 'pancake'
            },
            {
                title: '蛋炒饭摊位',
                price: '8',
                attributes: '满(-1), 饱(+60)',
                effect: { satiation: 60, food: -3 },
                time: { value: 15, type: 'minute' },
                key: 'eggRice'
            },
            {
                title: '豆浆油条摊位',
                price: '10',
                attributes: '满(-1), 饱(+20)(早餐+60)',
                effect: { satiation: 20, food: -1 },
                time: { value: 5, type: 'minute' },
                key: 'soyMilk'
            }
        ],
        south: [
            {
                title: '东街道',
                key: 'east'
            },
            {
                title: '西街道',
                key: 'west'
            },
            {
                title: '北街道',
                key: 'north'
            },
            {
                title: '衫衫服饰',
                time: { value: 10, type: 'minute' },
                key: 'sscloth'
            }, 
            {
                title: '衫衫干洗店',
                // price: '2/件',
                time: { value: 10, type: 'minute' },
                key: 'ssclean'
            }, 
            {
                title: '便利店',
                time: { value: 10, type: 'minute' },
                key: 'convenience'
            },
            {
                title: '老火锅',
                time: { value: 30, type: 'minute' },
                key: 'fondue'
            },
            {
                title: '湘菜馆',
                time: { value: 15, type: 'minute' },
                key: 'hRestaurant'
            },
            {
                title: 'KTV',
                time: { value: 2, type: 'hour' },
                effect: { mood: 60 },
                price: { value: 188, unit: '' },
                key: 'ktv'
            },
            {
                title: '麻将馆',
                time: { value: 4, type: 'hour' },
                effect: { mood: 50 },
                price: { value: 50, unit: '' },
                key: 'mahjong'
            },
            {
                title: '酒吧',
                time: { value: 3, type: 'hour' },
                effect: { mood: 70 },
                key: 'saloon'
            },
            {
                title: '洗浴中心',
                time: { value: 3, type: 'hour' },
                effect: { mood: 70 },
                key: 'bath'
            },

            // {
            //     title: '菜市场',
            //     key: 'foodMarket'
            // },
            // {
            //     title: '快炒沙县',
            //     key: 'south'
            // },
            // {
            //     title: '炭火烤鱼',
            //     key: 'south'
            // },
            // {
            //     title: '平价旅馆',
            //     key: 'west'
            // },
        ],
        north: [
            {
                title: '西虹建设(工地)',
                key: 'site'
            },
            {
                title: '西虹技术培训班',
                key: 'cultivate'
            },
            {
                title: '西虹仓库',
                key: 'depot'
            },
            {
                title: '夜宵',
                price: '30',
                description: '满(-1), 饱(+30)',
                time: '10分钟',
                key: 'grill'
            },
            {
                title: '夜市',
                key: 'market'
            },
            {
                title: '废品厂',
                key: 'scrapyard'
            },
            {
                title: '警察局',
                key: 'police'
            },
        
            
            // {
            //     title: '东西烧烤',
            //     key: 'north'
            // },
            // {
            //     title: '平价旅馆',
            //     key: 'west'
            // },
            {
                title: '东街道',
                key: 'east'
            },
            {
                title: '西街道',
                key: 'west'
            },
            {
                title: '南街道',
                key: 'south'
            }
        ]
    }
}

const MostStores = {
    ssclean: {
        title: '干洗店',
        key: 'wash', 
        squareNum: 8,
    },
    sscloth: {
        title: '衫衫服饰',
        key: 'sscloth',
        list: [
            {
                title: '衫衫服饰1',
                price: '20',
                description: '耐(10)',
                key: 'sscloth1'
            },
            {
                title: '衫衫服饰2',
                price: '20',
                description: '耐(10)',
                key: 'sscloth2'
            },
            {
                title: '衫衫服饰3',
                price: '20',
                description: '耐(10)',
                key: 'sscloth3'
            },
            {
                title: '衫衫服饰4',
                price: '20',
                description: '耐(10)',
                key: 'sscloth4'
            },
            {
                title: '衫衫服饰5',
                price: '20',
                description: '耐(10)',
                key: 'sscloth5'
            },
        ]
    },
    cultivate: {
        title: '西虹技术培训班',
        key: 'cultivate',
        list: [
            {
                title: '工程设计',
                price: '3000',
                description: '已完成进度: 0/20',
                key: 'engineering'
            },
            {
                title: '汽修培训',
                price: '3000',
                description: '已完成进度: 0/20',
                key: 'mechanic'
            },
            {
                title: '厨师培训',
                price: '3000',
                description: '已完成进度: 0/20',
                key: 'chef'
            },
            {
                title: '会记培训',
                price: '3000',
                description: '已完成进度: 0/20',
                key: 'sessional'
            },
            {
                title: '管理培训',
                price: '3000',
                description: '已完成进度: 0/20',
                key: 'managerial'
            },
        ]
    },
    aRestaurant: {
        title: '平价餐馆',
        key: 'aRestaurant',
        list: [
            {
                title: '土豆丝',
                price: '10',
                key: 'aPotato',
                effect: { satiation: 30, food: -2 },
                time: { value: 20, type: 'minute' },
                foodType: 1
            },
            {
                title: '空心菜',
                price: '10',
                key: 'aCabbage',
                effect: { satiation: 30, food: -2 },
                time: { value: 20, type: 'minute' },
                foodType: 1
            },
            {
                title: '爆炒猪肝',
                price: '18',
                key: 'aLiver',
                effect: { satiation: 60, food: 1 },
                time: { value: 20, type: 'minute' },
                foodType: 2
            },
            {
                title: '香干炒肉',
                price: '18',
                key: 'aCurd',
                effect: { satiation: 60, food: 1 },
                time: { value: 20, type: 'minute' },
                foodType: 2
            },
            {
                title: '辣椒炒肉',
                price: '18',
                key: 'aPepper',
                effect: { satiation: 60, food: 1 },
                time: { value: 20, type: 'minute' },
                foodType: 2
            },
            {
                title: '小炒黄牛肉',
                price: '25',
                key: 'aBeef',
                effect: { satiation: 70, food: 2 },
                time: { value: 20, type: 'minute' },
                foodType: 2
            }
        ]
    },
    convenience: {
        title: '便利店',
        key: 'convenience',
        list: [
            {
                title: '方便面',
                price: '5',
                key: 'noodle',
                foodType: 1
            },
            {
                title: '泡面搭档',
                price: '1',
                key: 'hams',
                foodType: 1
            },
            {
                title: '小面包',
                price: '3',
                key: 'bakery',
                foodType: 1
            },
            {
                title: '麻辣小王子',
                price: '3',
                key: 'congee',
                foodType: 1
            },
            {
                title: '牛肉干',
                price: '5',
                key: 'beef',
                foodType: 2
            },
            {
                title: '苹果',
                price: '4',
                key: 'apple',
                foodType: 1
            },
            {
                title: '香蕉',
                price: '2',
                key: 'banana',
                foodType: 1
            }
        ]
    },
    hRestaurant: {
        title: '湘菜馆',
        key: 'hRestaurant',
        list: [
            {
                title: '剁椒鱼头',
                price: '68',
                key: 'fish',
                foodType: 2
            },
            {
                title: '湘里腊肉',
                price: '52',
                key: 'meat',
                foodType: 2
            },
            {
                title: '辣子鸡丁',
                price: '48',
                key: 'chicken',
                foodType: 2
            },
            {
                title: '农家一碗香',
                price: '48',
                key: 'egg',
                foodType: 2
            },
            {
                title: '爆炒腰花',
                price: '42',
                key: 'cabbage',
                foodType: 2
            },
            {
                title: '时令蔬菜',
                price: '24',
                key: 'fruit',
                foodType: 1 
            }
        ]
    },
    fondue: {
        title: '地道火锅',
        key: 'fondue',
        list: [
            {
                title: '毛肚',
                price: '48',
                key: 'tripe',
                foodType: 2
            },
            {
                title: '鸭肠',
                price: '38',
                key: 'sausage',
                foodType: 2
            },
            {
                title: '豆腐',
                price: '14',
                key: 'tofu',
                foodType: 1
            },
            {
                title: '肥牛',
                price: '32',
                key: 'fat',
                foodType: 2
            },
            {
                title: '羊肉卷',
                price: '42',
                key: 'lamb',
                foodType: 2
            },
            {
                title: '脑花',
                price: '24',
                key: 'brains',
                foodType: 2
            },
            {
                title: '虾滑',
                price: '22',
                key: 'prawn',
                foodType: 2
            },
        ]
    },
    saloon: {
        title: '酒吧',
        key: 'saloon',
        list: [
            {
                title: '啤酒',
                price: '118',
                key: 'low'
            },
            {
                title: '鸡尾酒',
                price: '468',
                key: 'middle'
            },
            {
                title: '葡萄酒',
                price: '888',
                key: 'high'
            },
        ] 
    },
    bath: {
        title: '洗浴',
        key: 'bath',
        list: [
            {
                title: '188套餐',
                price: '118',
                key: 'low'
            },
            {
                title: '388套餐',
                price: '388',
                key: 'middle'
            },
            {
                title: '688套餐',
                price: '688',
                key: 'high'
            },
        ]  
    },
    pharmacies: {
        title: '西虹大药房',
        key: 'pharmacies',
        list: [
            {
                title: '99感冒灵颗粒',
                price: '12',
                key: 'low'
            },
            {
                title: '藿香正气水',
                price: '12',
                key: 'low'
            },
            {
                title: '健胃消食丸',
                price: '14',
                key: 'low'
            },
            {
                title: '消炎水',
                price: '16',
                key: 'low'
            },
        ]
    },
    wRestaurant: {
        title: '西餐厅',
        key: 'wRestaurant',
        list: [
            {
                title: '法式焗蜗牛',
                price: '198',
                key: 'snail',
                foodType: 2
            },
            {
                title: '安格斯牛排',
                price: '218',
                key: 'steak',
                foodType: 2
            },
            {
                title: '意式香草烤羊排',
                price: '298',
                key: 'lamb',
                foodType: 2
            },
            {
                title: '意大利面',
                price: '108',
                key: 'spaghetti',
                foodType: 2
            },
            {
                title: '凯撒沙拉',
                price: '99',
                key: 'salads',
                foodType: 1
            },
        ]
    },
    cRestaurant: {
        title: '中餐厅',
        key: 'cRestaurant',
        list: [
            {
                title: '清蒸东星斑',
                price: '498',
                key: 'eastern',
                foodType: 2
            },
            {
                title: '干煎小黄鱼',
                price: '198',
                key: 'fish',
                foodType: 2
            },
            {
                title: '清蒸大闸蟹',
                price: '198',
                key: 'hairy',
                foodType: 2
            },
            {
                title: '清蒸鲈鱼',
                price: '128',
                key: 'flatfish',
                foodType: 2
            },
            {
                title: '葱烧海参',
                price: '298',
                key: 'cucumber',
                foodType: 2
            },
            {
                title: '辣炒蛏子',
                price: '128',
                key: 'razor',
                foodType: 2
            },
        ]
    },
    shop: {
        title: '商城',
        key: 'shop', 
    }
}

const Mobile = {
    list: {
        event1: [
            {
                type: 'l',
                label: '小子该给钱了!'
            },
            {
                type: 'r',
                label: '放心, 少不了你的.'
            },
            {
                type: 'l',
                label: '看你你还是靠得住的!!'
            },
            {
                type: 'r',
                label: '我说过的话就一定做得到'
            },
            {
                type: 'l',
                label: '看你你还是靠得住的!!'
            },
            {
                type: 'r',
                label: '我说过的话就一定做得到'
            },
            {
                type: 'l',
                label: '看你你还是靠得住的!!'
            },
            {
                type: 'r',
                label: '我说过的话就一定做得到'
            }
        ],
        event2: [
            {
                label: '挺自觉的!'
            }
        ],
    },
    friends: [
        {
            name: '小明',
            age: 18,
        },
        {
            name: '小明',
            age: 18,
        },
        {
            name: '小明',
            age: 18,
        },
        {
            name: '小明',
            age: 18,
        },
        {
            name: '小明',
            age: 18,
        },
        {
            name: '小明',
            age: 18,
        },
        {
            name: '小明',
            age: 18,
        },
    ],
    app: [
        {
            name: '维信',
            key: 'achat'
        },
        {
            name: '维信',
            key: 'achat'
        },
        {
            name: '维信',
            key: 'achat'
        },
        {
            name: '维信',
            key: 'achat'
        },
        {
            name: '维信',
            key: 'achat'
        }
    ]
}


export { Labor, Food, StoreAndStreet, MostStores, Mobile }