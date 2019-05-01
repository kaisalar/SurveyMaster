const files = require('files')

async function saveJson(path, object) {
    const dir = await files.dir(path)
   console.log(dir);
    await files.mkdir(dir)
    const data = JSON.stringify(object)
    await files.write(path, data)
}

async function loadJson(path) {
    const dir = await files.dir(path)
    if(!exists(path)){
        await files.mkdir(dir);
        console.log("not found file and created:",path);
    }
    let object;
    try{
        const data = await files.read(path)
        object = await JSON.parse(data)
    }
    catch(e){
        console.log(e);
    }
    return object;
}
async function getFiles(path) {
    return await files.list(path).filter(file => files.stat(file).isFile()).map(files.abs);
}
async function exists(path){
    return await files.exists(path);
}
async function deleteFile(path){
    
}
module.exports = {
    saveJson,
    loadJson,
    getFiles,
    exists
}