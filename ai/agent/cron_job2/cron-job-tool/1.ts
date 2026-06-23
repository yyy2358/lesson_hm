//  async onApplicationBootstrap()
// const job = new CronJob(CronExpression.EVERY_SECOND,() =>{
    //   console.log('job run')
    // });
    // this.schedulerRegistry.addCronJob('job1',job);
    // job.start();
    // setTimeout(() => {
    //   this.schedulerRegistry.getCronJob('job1').stop(); 
    // }, 5000);//定时器 5秒后停止定时任务
    // const intervalRef = setInterval(() => {
    //   console.log('run interval job')
    // }, 1000);
    // this.schedulerRegistry.addInterval('interval1',intervalRef);//定时器cronjob
    // setTimeout(() => {
    //   this.schedulerRegistry.deleteInterval('interval1');
    // }, 5000);//每隔一秒循环执行 5秒后删除定时任务

    // const timeoutRef = setTimeout(() => {
    //   console.log('run timeout job')
    // }, 3000);
    // this.schedulerRegistry.addTimeout('timeout1',timeoutRef);
    // setTimeout(() => {
    //   this.schedulerRegistry.deleteTimeout('timeout1');
    // }, 5000);//3秒后执行一次 5秒后后删除定时任务
    
    //job.service
    // const enabledJob = await this.entityManager.find(Job,{where:{isEnabled:true}});
    // this.logger.log(`Found ${enabledJob.length} enabled job(s)`);