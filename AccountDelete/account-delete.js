import { Client, Wallet } from 'xrpl'

// Get wallet from seed
const wallet = Wallet.fromSeed('sEd7TBhUooHqhMfx2w2BnoLjLF3KS6Q')

// New ledger connection
const client = new Client('wss://s.altnet.rippletest.net:51233')
await client.connect()

try {
  // Create the account delete object

  const deleteTx = {
    Account: wallet.classicAddress, // rAddress we want to delete (ie this account)
    TransactionType: 'AccountDelete', // Important to spell tis correctly, case sensitive
    Destination: 'rNdN5RgiqxyUB4KsXAopGAubvdnnVtFVPr', // the account where any remaining balance will be sent
  }

  // Prepare the transaction
  const prepared = await client.autofill({
    ...deleteTx,
    LastLedgerSequence: (await client.getLedgerIndex()) + 1000, // add sequence to extend the time window
  }) // Autofill to save time

  // Sign the transaction
  const signed = wallet.sign(prepared)

  // Submit to the ledger
  const result = await client.submitAndWait(signed.tx_blob)
  console.log(result)
} catch (error) {
  console.log(error)
} finally {
  await client.disconnect()
}
