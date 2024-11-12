document.getElementById('changeColor').addEventListener('click', async () => {
    try {
        // 获取当前标签页
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab) {
            console.error('没有找到当前标签页');
            return;
        }

        // 检查是否是chrome://开头的页面
        if (tab.url.startsWith('chrome://')) {
            alert('此扩展不能在Chrome系统页面上运行');
            return;
        }

        // 注入并执行脚本
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                document.body.style.backgroundColor = '#90EE90';
            }
        });
    } catch (error) {
        alert('无法在此页面上运行扩展');
        console.error('发生错误：', error);
    }
}); 