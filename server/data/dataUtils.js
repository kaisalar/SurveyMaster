const files = require('files')
const sjcl = require('./sjcl.js');
const { sjclKey } = require('../config');
const devDeugger = require('../debugger');
async function saveJson(path, object) {
  const dir = await files.dir(path)
  devDeugger("savefile: " + (path))
  try {
    await files.mkdir(dir)
    const _data = JSON.stringify(object)
    const data = sjcl.encrypt(sjclKey, _data);
    await files.write(path, data)
  } catch (e) {
    devDeugger("IO saving ERROR", e);
  }
}

async function loadJson(path) {
  let object
  try {
    const dir = await files.dir(path)
    devDeugger("loadfile: " + (path))
    if (!await exists(path)) {
      await files.mkdir(dir)
      devDeugger('not found file and created:', path)
      return;
    }
    const _data = await files.read(path)
    const data = sjcl.decrypt(sjclKey, _data);
    if (!data) throw `${path} file has an error in loading data`
    object = await JSON.parse(data)
    devDeugger("object loaded", object);
  } catch (e) {
    devDeugger("IO loading ERROR", e)
  }
  return object
}
async function getFiles(path) {
  try {
    devDeugger("getfiles: " + (path))
    if (!(await exists(path))) {
      await files.mkdir(path)
    }
    return await files
      .list(path)
      .filter(file => files.stat(file).isFile())
      .map(files.abs)
  } catch (e) {
    devDeugger("IO getting dfiles ERROR", e);
  }
}

async function exists(path) {
  return await files.exists(path)
}
async function removeFile(path) {
  try {
    devDeugger("remove file:" + await files.mkdir(path));
    if (exists(path)) {
      await files.remove(path)
    }
  } catch (e) {
    devDeugger("IO revove ERROR", e);
    throw e
  }
}
module.exports = {
  saveJson,
  loadJson,
  getFiles,
  exists,
  removeFile
}
