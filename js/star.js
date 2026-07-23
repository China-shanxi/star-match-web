// 星座映射：英文标识、日期范围、图标链接
const starMap = {
    aries: { name: "白羊座", start: [3,21], end: [4,19], icon:"https://img0.baidu.com/it/u=3932456780,3017864211&fm=253&fmt=auto&app=138&f=PNG?w=80&h=80" },
    taurus: { name: "金牛座", start: [4,20], end: [5,20], icon:"https://img2.baidu.com/it/u=1986542310,3388712402&fm=253&fmt=auto&app=138&f=PNG?w=80&h=80" },
    gemini: { name: "双子座", start: [5,21], end: [6,21], icon:"https://img0.baidu.com/it/u=3288764330,3882311102&fm=253&fmt=auto&app=138&f=PNG?w=80&h=80" },
    cancer: { name: "巨蟹座", start: [6,22], end: [7,22], icon:"https://img2.baidu.com/it/u=2233114444,3111244400&fm=253&fmt=auto&app=138&f=PNG?w=80&h=80" },
    leo: { name: "狮子座", start: [7,23], end: [8,22], icon:"https://img0.baidu.com/it/u=3882211100,3222444111&fm=253&fmt=auto&app=138&f=PNG?w=80&h=80" },
    virgo: { name: "处女座", start: [8,23], end: [9,22], icon:"https://img0.baidu.com/it/u=2233114444,3111244400&fm=253&fmt=auto&app=138&f=PNG?w=80&h=80" },
    libra: { name: "天秤座", start: [9,23], end: [10,23], icon:"https://img0.baidu.com/it/u=3288764330,3882311102&fm=253&fmt=auto&app=138&f=PNG?w=80&h=80" },
    scorpio: { name: "天蝎座", start: [10,24], end: [11,22], icon:"https://img0.baidu.com/it/u=3932456780,3017864211&fm=253&fmt=auto&app=138&f=PNG?w=80&h=80" },
    sagittarius: { name: "射手座", start: [11,23], end: [12,21], icon:"https://img0.baidu.com/it/u=1986542310,3388712402&fm=253&fmt=auto&app=138&f=PNG?w=80&h=80" },
    capricorn: { name: "摩羯座", start: [12,22], end: [1,19], icon:"https://img0.baidu.com/it/u=2233114444,3111244400&fm=253&fmt=auto&app=138&f=PNG?w=80&h=80" },
    aquarius: { name: "水瓶座", start: [1,20], end: [2,18], icon:"https://img0.baidu.com/it/u=3882211100,3222444111&fm=253&fmt=auto&app=138&f=PNG?w=80&h=80" },
    pisces: { name: "双鱼座", start: [2,19], end: [3,20], icon:"https://img0.baidu.com/it/u=3288764330,3882311102&fm=253&fmt=auto&app=138&f=PNG?w=80&h=80" }
};

const starSelect = document.getElementById('starSelect');
const birthdayInput = document.getElementById("birthday");
const getStarBtn = document.getElementById('getStarBtn');
const starResult = document.getElementById('starResult');
const starIcon = document.getElementById("starIcon");
const shareStarBtn = document.getElementById("shareStarBtn");
let currentStarText = ""; // 保存当前运势文本用于分享

// 1. 生日自动匹配星座
birthdayInput.addEventListener("change", ()=>{
    const val = birthdayInput.value;
    if(!val) return;
    const date = new Date(val);
    const m = date.getMonth()+1;
    const d = date.getDate();
    let targetKey = "";
    for(let key in starMap) {
        const s = starMap[key];
        let inRange = false;
        // 跨年星座：摩羯12.22-1.19单独判断
        if(key === "capricorn") {
            if((m === 12 && d >=22) || (m ===1 && d <=19)) inRange = true;
        } else {
            if((m === s.start[0] && d >= s.start[1]) || (m === s.end[0] && d <= s.end[1])) inRange = true;
        }
        if(inRange) {
            targetKey = key;
            break;
        }
    }
    if(targetKey) {
        starSelect.value = targetKey;
        starIcon.src = starMap[targetKey].icon;
    }
})

// 2. 切换星座自动显示图标
starSelect.addEventListener("change", ()=>{
    const key = starSelect.value;
    if(!key) {
        starIcon.src = "";
        return;
    }
    starIcon.src = starMap[key].icon;
})

// 3. 星空粒子背景生成函数
function createStarBg() {
    const box = document.getElementById("starBg");
    let html = "";
    for(let i=0; i<200; i++) {
        const size = Math.random() * 3 + 1;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 3;
        html += `<div class="star-dot" style="width:${size}px;height:${size}px;top:${top}%;left:${left}%;animation-delay:${delay}s"></div>`;
    }
    box.innerHTML = html;
}

// 4. 调用公开免费运势API（和风天气星座免费接口）
getStarBtn.addEventListener('click', async () => {
    const val = starSelect.value;
    if (!val) {
        starResult.innerHTML = "<span style='color:red'>请先选择星座或填写生日！</span>";
        return;
    }
    const starName = starMap[val].name;
    starResult.innerHTML = "正在获取今日运势...";
    try {
        // 免费公开星座API，无需密钥，跨域可本地调试
        const res = await fetch(`https://api.vvhan.com/api/horoscope?type=${val}`);
        const data = await res.json();
        if(data.success) {
            const info = data.data;
            currentStarText = `✨${starName}今日运势✨
整体运势：${info.all}
爱情运势：${info.love}
事业运势：${info.work}
今日财运：${info.money}
幸运色：${info.color}
幸运数字：${info.number}`;
            starResult.innerHTML = `
                <h3>✨${starName}座今日运势✨</h3>
                <p><strong>整体运势：</strong>${info.all}</p>
                <p><strong>爱情运势：</strong>${info.love}</p>
                <p><strong>事业运势：</strong>${info.work}</p>
                <p><strong>今日财运：</strong>${info.money}</p>
                <p><strong>幸运色：</strong>${info.color}</p>
                <p><strong>幸运数字：</strong>${info.number}</p>
            `;
            // 存入本地记录
            addRecord({
                type: "star",
                content: `${starName}今日运势查询`
            })
        } else {
            starResult.innerHTML = "<span style='color:red'>运势数据获取失败，请稍后重试</span>";
        }
    } catch(err) {
        starResult.innerHTML = "<span style='color:red'>网络请求失败，无法获取运势</span>";
        console.error(err);
    }
})

// 5. 分享运势功能（复制文本到剪贴板）
shareStarBtn.addEventListener("click", async ()=>{
    if(!currentStarText) {
        alert("请先查询运势后再分享！");
        return;
    }
    try {
        await navigator.clipboard.writeText(currentStarText);
        alert("运势内容已复制到剪贴板，直接粘贴分享！");
    } catch {
        alert("复制失败，请手动复制页面文字分享");
    }
})
