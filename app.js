const xrpl = require('xrpl')

const displayLastLedgerIndex = async () => {
  const client = new xrpl.Client('wss://xrplcluster.com') // holds the connection to the ledger
  await client.connect() // connect to the ledger

  const ledgerInfo = await client.request({
    command: 'ledger',
    ledger_index: 'validated',
  })

  console.log(
    `Hello world from the XRP ledger, the last index was: ${ledgerInfo.result.ledger_index}`
  )

  await client.disconnect() // close down coneection when finished
}

displayLastLedgerIndex()
