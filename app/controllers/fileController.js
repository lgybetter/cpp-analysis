import Promise from 'bluebird'
import electron from 'electron'
const {dialog} = electron.remote
const fs = Promise.promisifyAll(require('fs'));

const writePackage = (filePath, data) => {
  return fs.writeFileAsync(filePath, JSON.stringify(data, null, 2)).catch(err => {
    return Promise.reject(err)
  });
}

const readPackage = (filePath) => {
  return fs.readFileAsync(filePath, 'utf-8').catch(err => {
    return Promise.reject(err)
  });
}

const openDialog = () => {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog({
      properties: [
        'openFile',
      ]
    }, (res) => {
      if(!res) {
        return reject('404')
      }
      return resolve(res[0])
    });
  })
}

export default {
  writePackage,
  readPackage,
  openDialog
}