// 星座运势数据
const starData = {
    白羊: {
        luck: "今日整体运势中上，活力满满，适合主动出击",
        love: "桃花运不错，单身者容易遇到合拍的人",
        work: "工作效率提升，难题能快速找到解决思路",
        money: "小额财运佳，适合合理规划小额支出",
        color: "浅粉色",
        num: 7
    },
    金牛: {
        luck: "运势平稳，适合沉淀自己，不宜冲动做决定",
        love: "感情稳定，适合和伴侣安静相处谈心",
        work: "按部就班即可，不适合创新冒险项目",
        money: "守财运势好，减少不必要消费",
        color: "米黄色",
        num: 4
    },
    双子: {
        luck: "社交运拉满，沟通顺利，适合拓展人脉",
        love: "多聊天能增进感情，单身容易邂逅有趣异性",
        work: "谈判、沟通类工作容易出成果",
        money: "朋友可能带来小商机",
        color: "天蓝色",
        num: 9
    },
    巨蟹: {
        luck: "偏居家运势，内心平和，适合陪伴家人",
        love: "温柔体贴容易打动对方，感情升温",
        work: "细心类工作不易出错，不适合高强度竞争",
        money: "家庭相关小额开销增多",
        color: "银白色",
        num: 2
    },
    狮子: {
        luck: "高光运势，自信心充足，适合展现自己",
        love: "魅力十足，异性好感度高",
        work: "项目主导、展示汇报容易获得认可",
        money: "有机会获得奖励、红包",
        color: "金橙色",
        num: 1
    },
    处女: {
        luck: "细致运势，适合整理规划，解决积压琐事",
        love: "细节关怀打动伴侣，避免挑剔争吵",
        work: "核对、整理类工作零失误",
        money: "适合复盘账单，节省开支",
        color: "薄荷绿",
        num: 6
    },
    天秤: {
        luck: "贵人运在线，纠结的事情会有人帮你权衡",
        love: "浪漫氛围充足，适合约会聚餐",
        work: "合作项目进展顺利，搭档十分靠谱",
        money: "人情往来支出适中",
        color: "淡紫色",
        num: 3
    },
    天蝎: {
        luck: "洞察力极强，能看穿隐藏问题，适合复盘规划",
        love: "感情深度升温，彼此更加信任",
        work: "深挖细节能找到别人忽略的突破口",
        money: "长线理财运势平稳",
        color: "酒红色",
        num: 8
    },
    射手: {
        luck: "自由运势，适合出门散心、短途出行",
        love: "轻松相处感情更好，不要过度束缚对方",
        work: "外出对接、出差容易有收获",
        money: "外出游玩注意理性消费",
        color: "橘黄色",
        num: 5
    },
    摩羯: {
        luck: "事业运势强势，踏实付出会看到回报",
        love: "慢热温柔，长久陪伴最动人",
        work: "长期项目迎来阶段性成果",
        money: "正财稳定，努力就有收入提升",
        color: "深灰色",
        num: 0
    },
    水瓶: {
        luck: "灵感爆棚，脑洞大开，适合创意类事情",
        love: "精神共鸣最重要，三观契合更容易长久",
        work: "创意策划、新思路容易被采纳",
        money: "新奇小物件容易忍不住购买",
        color: "冰蓝色",
        num: 11
    },
    双鱼: {
        luck: "温柔治愈运势，情绪柔软，适合放松疗愈",
        love: "浪漫氛围感拉满，暧昧容易修成正果",
        work: "艺术、文案、共情类工作表现优秀",
        money: "容易冲动为喜欢的事物消费",
        color: "浅藕粉",
        num: 12
    }
};

const starSelect = document.getElementById('starSelect');
const getStarBtn = document.getElementById('getStarBtn');
const starResult = document.getElementById('starResult');

getStarBtn.addEventListener('click', () => {
    const val = starSelect.value;
    if (!val) {
        starResult.innerHTML = "<span style='color:red'>请先选择星座！</span>";
        return;
    }
    const data = starData[val];
    starResult.innerHTML = `
        <h3>✨${val}座今日运势✨</h3>
        <p><strong>整体运势：</strong>${data.luck}</p>
        <p><strong>爱情运势：</strong>${data.love}</p>
        <p><strong>事业运势：</strong>${data.work}</p>
        <p><strong>今日财运：</strong>${data.money}</p>
        <p><strong>幸运色：</strong>${data.color}</p>
        <p><strong>幸运数字：</strong>${data.num}</p>
    `;
})
