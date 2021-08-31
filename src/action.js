const exec = require('@actions/exec');
const fs = require('fs');
const path = require('path');

async function executeCommand(command, args=[]) {

    let myOutput = '';
    let myError = '';

    const options = {};
    options.listeners = {
        stdout: (data) => {
            myOutput += data.toString();
        },
        stderr: (data) => {
            myError += data.toString();
        }
    };

    await exec.exec(command, args, options);

    return myOutput;

}


async function run(){

    await executeCommand("git",["fetch"]);
    await executeCommand("git",["pull"]);

    let tagRef = await executeCommand("git",["rev-list","--tags","--max-count=1"]);
    let version = await executeCommand("git",["describe","--tags",`${tagRef}`]);
    let hash = await executeCommand("git", ["rev-parse","--short","HEAD"]);

    version = version || "0.0.0";

    let fileContent = `${version}:${hash}`.trim().replace("\n","");

    let versionFilePath = path.join(process.env.GITHUB_WORKSPACE, 'version');

    fs.writeFileSync(versionFilePath,fileContent);

    await executeCommand("git",["config","--global","user.name","AZOS Actions Version File"]);

    await executeCommand("git",["config","--global","user.email","azos.version.action@github.com"]);

    await executeCommand("git",["add","version"]);

    await executeCommand("git",["commit","-m",`Update version file to version:hash ${fileContent}`]);

    await executeCommand("git",["push"]);
}

run();