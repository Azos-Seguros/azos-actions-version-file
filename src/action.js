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

    let version = await executeCommand("git",["tag","--sort","-v:refname"]) || "0.0.0";
    let hash = await executeCommand("git", ["rev-parse","--short","HEAD"]);
    let fileContent = `${version}:${hash}`;

    let versionFilePath = path.join(process.env.GITHUB_WORKSPACE, 'version');

    fs.writeFileSync(versionFilePath,fileContent);

    await executeCommand("git",["config","--global","user.name","AZOS Actions Version File"]);

    await executeCommand("git",["config","--global","user.email","azos.version.action@github.com"]);

    await executeCommand("git",["commit","-am",`Update version file to version:hash ${fileContent}`]);

    await executeCommand("git",["push"]);
}

run();