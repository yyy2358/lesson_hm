import {
    getEncodingNameForModel,
    getEncoding
} from 'js-tiktoken';
//AIGC 生成的文本 要计算 token 数量 按token 不断推理生成的  token 生成的单位也是计算的 单位

const modelName = "gpt-4";
const encodingName = getEncodingNameForModel(modelName);//拿到encoding计算的方式
console.log(encodingName,"////");

const enc = getEncoding(encodingName);
//不同语言 字符语义一样，但长度不一样 ，token 按语义（算力）来计算开销
console.log('apple',enc.encode('apple'),
enc.encode('apple').length)
console.log('pineapple',enc.encode('pineapple'),
enc.encode('pineapple').length)
console.log('吃饭',enc.encode('吃饭'),
enc.encode('吃饭').length)
console.log('一二三',enc.encode('一二三'),
enc.encode('一二三').length)
