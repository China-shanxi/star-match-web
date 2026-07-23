// 本地存储工具
const RECORD_KEY = "star_match_record";

// 读取所有记录
function getRecordList() {
    const str = localStorage.getItem(RECORD_KEY);
    return str ? JSON.parse(str) : [];
}

// 新增一条记录
function addRecord(data) {
    const list = getRecordList();
    list.unshift({
        time: new Date().toLocaleString(),
        type: data.type, // star / match
        content: data.content
    });
    // 最多保存20条，超出删除末尾
    if(list.length > 20) list.pop();
    localStorage.setItem(RECORD_KEY, JSON.stringify(list));
}

// 清空全部记录
function clearAllRecord() {
    localStorage.removeItem(RECORD_KEY);
    renderRecord();
}

// 渲染记录列表
function renderRecord() {
    const list = getRecordList();
    const dom = document.getElementById("recordList");
    if(list.length === 0) {
        dom.innerHTML = "<p style='text-align:center;color:#666'>暂无测算记录</p>";
        return;
    }
    let html = "";
    list.forEach(item => {
        html += `
        <div class="record-item">
            <div class="record-time">${item.time} | ${item.type === "star" ? "星座运势" : "姓名配对"}</div>
            <div>${item.content}</div>
        </div>
        `
    })
    dom.innerHTML = html;
}

// 清空按钮绑定
document.getElementById("clearRecordBtn").addEventListener("click", clearAllRecord);
