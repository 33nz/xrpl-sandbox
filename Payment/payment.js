import { Client, Wallet, xrpToDrops } from 'xrpl'

// Get wallet from seed
const wallet = Wallet.fromSeed('TBC')

// New ledger connection
const client = new Client('wss://')
await client.connect()

try {
  // Create payment object
  const payment = {
    Account: wallet.classicAddress, // rAddress of the sending account
    TransactionType: 'Payment', // Important
    Amount: xrpToDrops(20), //  Important: Amount of XRP, converted to drops
    Destination: 'TBC',
  }

  // Prepare transaction
  const prepared = await client.autofill(payment) // Autofill saves us some time

  // Sign the transaction
  const signed = wallet.sign(prepared)

  // Submit the transaction and wait for the result
} catch (error) {
  console.log(error)
} finally {
  await client.disconnect()
}
