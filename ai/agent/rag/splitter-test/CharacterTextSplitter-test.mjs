import "dotenv/config";
import {
    //  CharacterTextSplitter,
    RecursiveCharacterTextSplitter,
     } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import {
    getEncodingNameForModel,
    getEncoding
} from "js-tiktoken";
//  日志
const logDocument = new Document({
    pageContent: `[2024-01-15 10:00:00] INFO: Application started
[2024-01-15 10:00:05] DEBUG: Loading configuration file
[2024-01-15 10:00:10] INFO: Database connection established
[2024-01-15 10:00:15] WARNING: Rate limit approaching
[2024-01-15 10:00:20] ERROR: Failed to process request
[2024-01-15 10:00:25] INFO: Retrying operation
[2024-01-15 10:00:30] SUCCESS: Operation completed
[2026-01-10 14:30:00] INFO: 系统开始执行大规模数据迁移任务，本次迁移涉及核心业务数据库中的用户表、订单表、商品库存表、物流信息表、支付记录表、评论数据表等共计十二个关键业务表，预计处理数据量约500万条记录，数据总大小预估为280GB，迁移过程将采用分批次增量更新策略以减少对生产环境的影响，同时启用双写机制确保数据一致性，任务预计总耗时约3小时15分钟，迁移完成后将自动触发全面的数据一致性校验流程以及性能基准测试，请相关运维人员和DBA团队密切关注系统资源使用情况、网络带宽占用率以及任务执行进度，如遇异常情况请立即启动应急预案并通知技术负责人
`
})//最后一行为什么没切割超过了chunksize 作为document来存放 这就是他的缺陷 要用recursive的splitter
//倒数第二行没加进去 图为会超过chunksize 要保证语义完整性


//表达rag的时候一定要说出recursive的概念
const logSplitter = new RecursiveCharacterTextSplitter({
    separators: ['\n',"。","，"],//先尝试换行来进行切割 语义超过了chunksize 就递归使用句号也不行 就用逗号
    chunkSize: 200,
    chunkOverlap: 20,//不破坏语义完整性 重叠    但是会尽量接近chunkSize
})
//把document作为数组进行切割
const logChunks = await logSplitter.splitDocuments([logDocument]);
console.log(logChunks);
// 10 个 chunk 每个 chunk 长度为 10 个字符


const enc = getEncoding("cl100k_base");
logChunks.forEach(doc => {
    console.log(doc);
    console.log('character length',doc.pageContent.length);
    console.log('token length',enc.encode(doc.pageContent).length);
});//可以用来在做一件事之前先计算token的开销看能否优化