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

    let version = await executeCommand("git",["tag","--sort","-v:refname"]) || "0.0.0";
    console.log("version===",version);
    let hash = await executeCommand("git", ["rev-parse","--short","HEAD"]);
    console.log("hash===",hash);
    let fileContent = `${version}:${hash}`;

    console.log( `Version: ${fileContent}`)

    await executeCommand("echo",[`${fileContent}`,">","version"]);

    await executeCommand("cat",["version"]);

    await executeCommand("git",["add","version"]);

    await executeCommand("git",["commit","-m",`Add version file ${fileContent}`]);

    await executeCommand("git",["push","origin","main"]);
}

run();