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

    await executeCommand("ls",[process.env.GITHUB_WORKSPACE]);
   // await executeCommand("git",["add","version"]);

   // await executeCommand("git",["commit","-m",`Add version file ${fileContent}`]);

   // await executeCommand("git",["push","origin","main"]);
}

run();