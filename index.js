const compression = require('compression')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Block = require('./block')
const Blockchain = require('./blockchain')
const chain = new Blockchain()
const IBlockchain = require('./iblockchain')
const ichain = new IBlockchain()
const cors = require('cors')


app.use(compression())
app.listen(3000)//, () => console.log('API listening on port 3000'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => res.status(404).json({
  status: 404,
  message: 'Check the README.md for the accepted endpoints'
}))

app.post('/block', async (req, res) => {
  const body = {transaction} = req.body
  if (transaction.clientname   && transaction.bmr && transaction.source && transaction.destination  && transaction.dateOfContract && transaction.vehicletype && transaction.contractStartDate && transaction.contractEndDate){
      body.transaction = {
        clientname: transaction.clientname,
        bmr: transaction.bmr,
        source : transaction.source,
        destination : transaction.destination,
        dateOfContract : transaction.dateOfContract,
        vehicletype: transaction.vehicletype,
        contractStartDate : transaction.contractStartDate,
        contractEndDate : transaction.contractEndDate,
        duration : transaction.duration
      }
      
      let result = await chain.addBlock(new Block(body))
      if (result){
        const height = await chain.getBlockHeight()
        const response = await chain.getBlock(height)
        res.status(201).json({
            hash : response.hash,
            height : response.height,
            clientname : response.body.transaction.clientname,
            contractEndDate : response.body.transaction.contractEndDate
        })
      }
      else{
          res.status(404).send("Block already exits") 
      }
    }
    else{
      res.status(404).send("Parameter not found")
    }

})

app.get('/getblock/:height', async (req, res) => {
  try {
    const response = await chain.getBlock(req.params.height)
    res.send(response)
  } catch (error) {
    res.status(404).send("Block not found")
    
  }
})

app.get('/gethash/:hash', async (req, res) => {
  try {
      const response = await chain.getBlockByHash(req.params.hash)
      res.send(response)
  } catch (error) {
    res.status(404).send("Block not found")
  }
})



app.post('/invoiceblock', async (req, res) => {
  const body = {invoice} = req.body

  if (invoice.clientname && invoice.companyname && invoice.email && invoice.invoicenum && invoice.ponum && invoice.idate && invoice.pdate && invoice.items && invoice.quantity && invoice.price && invoice.amount){
      body.invoice = {
        clientname: invoice.clientname,
        companyname : invoice.companyname,
        email: invoice.email,
        invoicenum: invoice.invoicenum,
        ponum : invoice.ponum,
        idate : invoice.idate,
        pdate : invoice.pdate,
        items: invoice.items,
        quantity : invoice.quantity,
        price: invoice.price,
        amount: invoice.amount,
        notes: invoice.notes
      }
      
      let result = await ichain.addBlock(new Block(body))
      if (result){
        const height = await ichain.getBlockHeight()
        const response = await ichain.getBlock(height)
        res.status(201).json({
          hash : response.hash,
          height : response.height,
          clientname : response.body.invoice.clientname,
          invoicenum : response.body.invoice.invoicenum
        })
      }
      else{
          res.status(404).send("Block already exits") 
      }
    }
    else{
      res.status(404).send("Parameters not found")
    }
})

app.get('/getiblock/:height', async (req, res) => {
  try {
    const response = await ichain.getBlock(req.params.height)
    res.send(response)
  } catch (error) {
    res.status(404).send("Block not found")
  }
})
