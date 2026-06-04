//不叫table   collection
    // const COLLECTION_NAME = 'test';
    // const DIMENSION = 4; //向量维度

    // try {
    //     await client.createCollection({
    //         collection_name: COLLECTION_NAME,
    //         dimension: DIMENSION,
    //         auto_id: true,
    //     });
    //     console.log(`Collection ${COLLECTION_NAME} 创建成功`);
    //     await client.createIndex({
    //         collection_name: COLLECTION_NAME,
    //         field_names: 'vector',
    //         index_type: IndexType.AUTOINDEX,
    //         metric_type:MetricType.COSINE,
    //     })
    //     console.log(`Index 创建成功`);
    // } catch(err){
    //     console.error(`创建Collection ${COLLECTION_NAME} 失败:`, err);
    // }//node是单线程语言，所以要捕获异常，否则会直接退出 保证健壮性
//    const data = [
//     {
//         vector: [0.1,0.2,0.3,0.4],
//         content: '这是第一条数据'
//     },
//     {
//         vector: [0.5,0.6,0.7,0.8],
//         content: '这是第二条数据'
//     },
//    ];
//    const insertRes = await client.insert({
//     collection_name: COLLECTION_NAME,
//     data
//    });
//    console.log(`插入成功: ${insertRes.IDs.length} 条数据`);

        // const searchRes2 = await client.search({
        //     collection_name: COLLECTION_NAME,
        //     data: [[0.5,0.3,0.3,0.4]],
        //     limit: 1,
        //     output_fields: ['content'],
        // })
        // console.log(`搜索结果: ${JSON.stringify(searchRes2)}`)