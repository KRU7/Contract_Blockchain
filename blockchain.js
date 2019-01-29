const SHA256 = require('crypto-js/sha256')
const Block = require('./block')
let level = require('level')
let chaindb = './chain'
const db = level(chaindb)
let chaindbh = './hash'
const dbh = level(chaindbh)


class Blockchain {
  constructor () {
    this.getBlockHeight().then((height) => {
      if (height === -1) {
        this.addBlock(new Block('Genesis block')).then(() => console.log('Genesis block added!'))
      }
    })
  }


  async addBlock (newBlock) {
    const height = parseInt(await this.getBlockHeight())

    newBlock.height = height + 1
    newBlock.time = new Date().getTime().toString().slice(0, -3)

    if (newBlock.height > 0) {
      const prevBlock = await this.getBlock(height)
      newBlock.previousBlockHash = prevBlock.hash
    }

    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString()
    let hashed  = SHA256(JSON.stringify(newBlock.body)).toString()
    try{
      let status = await this.getdataHashStatus(hashed)
      if (status == true){
        return false
      }
    }catch(error){
      if (error == "Not found"){
        await this.addBlockToDBH(hashed , true)
        await this.addBlockToDB(newBlock.height, JSON.stringify(newBlock))
        return true
      }
      else{
        return false
      }
    }
  }


  async getBlockHeight () {
    return await this.getBlockHeightFromDB()
  }

  async getBlock (blockHeight) {
    return await this.getBlockByHeight(blockHeight)
  }

  async addBlockToDB (key, value) {
    return new Promise((resolve, reject) => {
      db.put(key, value, (error) => {
        if (error) {
          return reject(error)
        }

        return resolve(`Added block #${key}`)
      })
    })
  }

  async addBlockToDBH (key, value) {
    return new Promise((resolve, reject) => {
      dbh.put(key, value, (error) => {
        if (error) {
          return reject(error)
        }
        return resolve(`Added blockHash #${key}`)
      })
    })
  }

  async getBlockHeightFromDB () {
    return new Promise((resolve, reject) => {
      let height = -1

      db.createReadStream().on('data', (data) => {
        height++
      }).on('error', (error) => {
        return reject(error)
      }).on('close', () => {
        return resolve(height)
      })
    })
  }
  
  async getBlockByHeight (key) {
    return new Promise((resolve, reject) => {
      db.get(key, (error, value) => {
        if (value === undefined) {
          return reject('Not found')
        } else if (error) {
          return reject(error)
        }

        value = JSON.parse(value)
        return resolve(value)
      })
    })
  }

  async getdataHashStatus (key) {
    return new Promise((resolve, reject) => {
      dbh.get(key, (error, value) => {
        if (value === undefined) {
          return reject('Not found')
        } else if (error) {
          return reject(error)
        }

        value = JSON.parse(value)

        return resolve(value)
      })
    })
  }

  async getBlockByHash (hash) {
    let block

    return new Promise((resolve, reject) => {
      db.createReadStream().on('data', (data) => {    
        block = JSON.parse(data.value)
        if (block.hash === hash) {
            return resolve(block)
          }    
      }).on('error', (error) => {
        return reject(error)
      }).on('close', () => {
        return reject('Not found')
      })
    })
  }


  isGenesis (key) {
    return parseInt(key) === 0
  }
}

module.exports = Blockchain
