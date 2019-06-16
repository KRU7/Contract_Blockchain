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
  if (transaction.contractType){

    if (transaction.contractId){
      
      if (transaction.dateOfContract){
        
        if (transaction.contractStartDate){

          if (transaction.contractEndDate){

            if (transaction.clientname){

              if (transaction.bmr){

                if (transaction.tradeLicenseNumber){

                  if (transaction.vehicletype){

                    if (transaction.contractType === "Leasing"){

                      if (transaction.vehiclenumber){

                        body.transaction = {
                          contractId : transaction.contractId,
                          clientname: transaction.clientname,
                          tradeLicenseNumber : transaction.tradeLicenseNumber,
                          bmr: transaction.bmr,
                          vehiclenumber : transaction.vehiclenumber,
                          dateOfContract : transaction.dateOfContract,
                          vehicletype: transaction.vehicletype,
                          contractStartDate : transaction.contractStartDate,
                          contractEndDate : transaction.contractEndDate,
                          contractType : transaction.contractType,
                          change : transaction.change
                        }

                        let result = await chain.addBlock(new Block(body))
                        if (result){
                          const height = await chain.getBlockHeight()
                          const response = await chain.getBlock(height)
                          res.status(201).json({
                              hash : response.hash,
                              height : response.height,
                              clientname : response.body.transaction.clientname,
                              contractEndDate : response.body.transaction.contractEndDate,
                              contractId : response.body.transaction.contractId
                          })
                        } else{
                          res.status(404).send("Block already exits") 
                        }
                      } else{
                        res.status(404).send("vehiclenumber Empty")
                      }

                    } else if ((transaction.contractType === "Containerized") || (transaction.contractType === "CrossBorder") || (transaction.contractType === "Domestic")){
                      // console.log("in");
                      if (transaction.source){

                        if (transaction.destination){

                          body.transaction = {
                            contractId : transaction.contractId,
                            clientname: transaction.clientname,
                            tradeLicenseNumber : transaction.tradeLicenseNumber,
                            bmr: transaction.bmr,
                            dateOfContract : transaction.dateOfContract,
                            vehicletype: transaction.vehicletype,
                            contractStartDate : transaction.contractStartDate,
                            contractEndDate : transaction.contractEndDate,
                            source : transaction.source,
                            destination : transaction.destination,
                            contractType : transaction.contractType,
                            change : transaction.change
                          }
                          // console.log("body",body);
                          let result = await chain.addBlock(new Block(body))
                          // console.log(result);
                          if (result){
                            const height = await chain.getBlockHeight()
                            const response = await chain.getBlock(height)
                            // console.log(response)
                            res.status(201).json({
                                hash : response.hash,
                                height : response.height,
                                clientname : response.body.transaction.clientname,
                                contractEndDate : response.body.transaction.contractEndDate,
                                contractId : response.body.transaction.contractId
                            })
                          } else{
                            res.status(404).send("Block already exits") 
                          }
                        } else{
                          res.status(404).send("destination Empty")
                        }
                      } else{
                        res.status(404).send("source Empty")
                      }
                    } else{
                      res.status(404).send("contractType Invalid")
                    }
                  } else{
                    res.status(404).send("vehicletype Empty")
                  }
                } else{
                    res.status(404).send("tradeLicenseNumber Empty")
                }
              } else{
                res.status(404).send("contract rate Empty")
              }
            } else{
                res.status(404).send("clientname Empty")
            }
          } else{
            res.status(404).send("contractEndDate Empty")
          }
        } else{
          res.status(404).send("contractStartDate Empty")
        }
      } else{
        res.status(404).send("dateOfContract Empty")
      }
    } else{
      res.status(404).send("contractId Empty")
    }
  } else{
    res.status(404).send("contractType Empty")
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

app.post('/invoiceblock', async (req, res) => {
  const body = {invoice} = req.body
  if (invoice.clientname){

    if (invoice.companyname){

      if (invoice.email){

        if (invoice.invoicenum){

          if (invoice.ponum){

            if (invoice.idate){

              if (invoice.pdate){

                if (invoice.items){

                  if (invoice.quantity){

                    if (invoice.price){

                      if (invoice.amount){

                        if (invoice.notes){

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
                        } else{
                          res.status(404).send("notes Empty")
                        }
                      } else{
                        res.status(404).send("amount Empty")
                      }
                    } else{
                      res.status(404).send("price Empty")
                    }
                  } else{
                    res.status(404).send("quantity Empty")
                  }
                } else{
                  res.status(404).send("items Empty")
                }
              } else{
                res.status(404).send("pdate Empty")
              }
            } else{
              res.status(404).send("idate Empty")
            }
          } else{
            res.status(404).send("ponum Empty")
          }
        } else{
          res.status(404).send("invoicenum Empty")
        }
      } else{
        res.status(404).send("email Empty")
      }
    } else{
      res.status(404).send("companyname Empty")
    }
  } else{
    res.status(404).send("clientname Empty")
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