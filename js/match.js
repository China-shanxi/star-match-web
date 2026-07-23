const name1 = document.getElementById('name1');
const name2 = document.getElementById('name2');
const getMatchBtn = document.getElementById('getMatchBtn');
const matchResult = document.getElementById('matchResult');

// 缘分解析库
const matchDesc = [
    { min: 90, text: "天生一对！灵魂契合，缘分深厚，彼此是对方的命中注定，好好珍惜。" },
    { min: 80, text: "上等缘分，三观契合，相处舒服，感情稳步升温，适合长久相伴。" },
    { min: 70, text: "不错的缘分，偶尔小摩擦，但互相包容就能走很远。" },
    { min: 60, text: "中等缘分，需要多沟通磨合，主动包容对方就能收获甜蜜。" },
    { min: 50, text: "缘分平平，容易产生误会，多换位思考，减少争执。" },
    { min: 40, text: "缘分较浅，两人性格差异较大，相处需要极大耐心。" },
    { min: 0, text: "缘分薄弱，容易三观不合，若想长久，需要双方共同改变。" }
];

// 计算缘分分数
function calcScore(n1, n2) {
    let total = 0;
    // 姓名汉字笔画简易算法
    for(let s of n1) total += s.charCodeAt(0);
    for(let s of n2) total += s.charCodeAt(0);
    let score = total % 100;
    return score;
}

// 获取对应缘分文案
function getDesc(score) {
    for(let item of matchDesc) {
        if(score >= item.min) return item.text;
    }
    return "";
}

getMatchBtn.addEventListener('click', () => {
    let n1 = name1.value.trim();
    let n2 = name2.value.trim();
    if(!n1 || !n2) {
        matchResult.innerHTML = "<span style='color:red'>请完整输入两个人姓名！</span>";
        return;
    }
    let score = calcScore(n1, n2);
    let desc = getDesc(score);
    matchResult.innerHTML = `
        <h3>💞 ${n1} & ${n2} 缘分测算结果 💞</h3>
        <p style="font-size:24px;color:#7b3fd8;font-weight:bold">缘分匹配度：${score}分 / 100分</p>
        <p><strong>缘分解析：</strong>${desc}</p>
    `;
})
