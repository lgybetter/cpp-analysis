const DataStore = require('nedb');
const Promise = require('bluebird');
const co = require('co');
const db = {};
const config = require('../../config')

const get = (name, query) => {
  db[name] = new DataStore({
    filename: `${config.dbPath}/${name}.db`, 
    autoload: true
  });
  return new Promise((resolve, reject) => {
    db[name].find(query, (err, docs) => {
      if(err) {
        return reject(err)
      }
      return resolve(docs);
    })
  })
}

const post = (name, insert) => {
  db[name] = new DataStore({
    filename: `${config.dbPath}/${name}.db`,
    autoload: true
  });
  return new Promise((resolve, reject) => {
    db[name].insert(insert, (err, newDocs) => {
      if(err) {
        return reject(err)
      }
      return resolve(newDocs)
    })
  })
}

const put = (name, query, update, options) => {
  db[name] = new DataStore({
    filename:`${config.dbPath}/${name}.db`,
    autoload: true
  });
  return new Promise((resolve, reject) => {
    db[name].update(query, update, options, (err, numReplaced) => {
      if(err) {
        return reject(err)
      }
      console.log(numReplaced)
      return resolve(numReplaced);
    })
  })
}

const remove = (name, query, options) => {
  db[name] = new DataStore({
    filename:`${config.dbPath}/${name}.db`,
    autoload: true
  });
  return new Promise((resolve, reject) => {
    db[name].remove(query, options, (err, numRemoved) => {
      if(err) {
        return reject(err)
      }
      return resolve(numRemoved);
    })
  })
}

module.exports = {
  get,
  post,
  remove,
  put
}
