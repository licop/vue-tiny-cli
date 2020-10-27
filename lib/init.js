const {promisify} = require('util');
const figlet = promisify(require('figlet'));
const clear = require('clear');
const chalk = require('chalk');
const log = content => console.log(chalk.green(content));
const {clone} = require('./download');
const open = require('open');

// promisify化spawn
// 对接数据流
const spawn = async (...args) => {
    const {spawn} = require('child_process');
    
    return new Promise(resolve => {
        const proc = spawn(...args);
        // 把子进程的数据流插入主进程中，使得terminal可以打印出子进程的日志
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);
        
        proc.on('close', () => {
            resolve();
        })
    })
}

module.exports = async name => {
    // 打印欢迎界面
    clear();
    const data = await figlet('Licop Welcome')
    log(data);

    // clone
    log(`🚀创建项目 ${name}` )
    await clone('github:licop/vue-cli-template', name);
    
    // 自动安装依赖
    log('🔨安装依赖');
    await spawn('cnpm', ['install'], {cwd: `./${name}`});

    log(chalk.green(`
安装完成
To get start
==================
    cd ${name}
    npm run serve
==================
    `));
    open(`http://localhost:8080`)
    // 启动
    await spawn('npm', ['run', 'serve'], {cwd: `./${name}`});
}
