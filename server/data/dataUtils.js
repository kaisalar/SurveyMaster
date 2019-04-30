const files = require('files')

async function saveJson(path, object) {
    const dir = await files.dir(path)
    console.log(dir);
    await files.mkdir(dir)
    const data = JSON.stringify(object)
    await files.write(path, data)
}

async function loadJson(path) {
    const data = await files.read(path)
    const object = JSON.parse(data)
    return object
}

async function getFiles(path) {
    return await files.list(path)
}
async function exists(path){
    return await files.exists(path);
}
ob = [{id:1},{id:2}];
console.log({ob});

module.exports = {
    saveJson,
    loadJson,
    getFiles,
    exists
}