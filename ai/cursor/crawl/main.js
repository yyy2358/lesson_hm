const rp = require('request-promise');
const cheerio = require('cheerio');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// 定义CSV写入器
const csvWriter = createCsvWriter({
    path: 'weibo_hot_topics.csv',
    header: [
        { id: 'rank', title: '排名' },
        { id: 'title', title: '标题' },
        { id: 'heat', title: '热度' },
        { id: 'link', title: '链接' }
    ]
});

// 目标URL
const url = 'https://tophub.today/n/KqndgxeLl9';

// 发送HTTP请求获取网页内容
rp(url)
    .then(html => {
        // 使用cheerio加载HTML
        const $ = cheerio.load(html);
        const hotTopics = [];

        // 解析表格中的每一行
        $('table tr').each((index, element) => {
            if (index === 0) return; // 跳过表头行

            const rank = $(element).find('td:nth-child(1)').text().trim();
            const titleElement = $(element).find('td:nth-child(2) a');
            const title = titleElement.text().trim();
            const link = 'https://tophub.today' + titleElement.attr('href');
            const heat = $(element).find('td:nth-child(3)').text().trim();

            hotTopics.push({ rank, title, heat, link });
        });

        // 将数据写入CSV文件
        csvWriter.writeRecords(hotTopics)
            .then(() => console.log('CSV文件已成功写入'))
            .catch(err => console.error('写入CSV文件时出错:', err));
    })
    .catch(err => console.error('获取网页内容时出错:', err));