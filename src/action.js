var shell = require('shelljs');

async function run(){

    let version = await shell.exec('node --version', {silent:true}).stdout;
    let hash = await shell.exec('node --version', {silent:true}).stdout;
    let fileContent = `${version}:${hash}`;

    console.log( `Version: ${fileContent}`)

    await shell.exec(`echo ${fileContent} > version`, {silent:true});
}

run();