var shell = require("shelljs");

async function run(){

    let version = await shell.exec("git tag --sort -v:refname", {silent:true}).stdout;
    let hash = await shell.exec("git log --oneline | awk 'NR==1{print $1}'", {silent:true}).stdout;
    let fileContent = `${version}:${hash}`;

    console.log( `Version: ${fileContent}`)

    await shell.exec(`echo ${fileContent} > version`, {silent:true});
}

run();