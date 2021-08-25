const exec = require('@actions/exec');

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

    //executeCommand(`cd ${process.env.GITHUB_WORKSPACE}`);

    let version = await executeCommand("git",["tag","--sort","-v:refname"]);
    console.log("version===",version);
    let hash = await executeCommand("git", ["log","--oneline","|","awk","'NR==1{print $1}'"]);
    console.log("hash===",hash);
    let fileContent = `${version}:${hash}`;

    console.log( `Version: ${fileContent}`)

    await executeCommand(`echo ${fileContent} > version`);
}

run();