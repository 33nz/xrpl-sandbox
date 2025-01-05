import { Client, Wallet, xrpToDrops } from 'xrpl'

// Get wallet from seed
const wallet = Wallet.fromSeed('sEdSuFyxRq8qaxH57V859XULo38NXLr')

// New ledger connection
const client = new Client('wss://s.altnet.rippletest.net:51233')
await client.connect()

try {
  // Create payment object
  const payment = {
    Account: wallet.classicAddress, // rAddress of the sending account
    TransactionType: 'Payment', // case important
    Amount: xrpToDrops(12), // Important: Amount of XRP, converted to drops
    Destination: 'rs2eb24PLdXjwQJnsE5phieHgSy1j4eJHe',
  }

  // Prepare transaction
  const prepared = await client.autofill(payment) // Autofill saves us some time

  // Sign the transaction
  const signed = wallet.sign(prepared)

  // Submit the transaction and wait for the result
  const result = await client.submitAndWait(signed.tx_blob)
  console.log(result)
} catch (error) {
  console.log(error)
} finally {
  await client.disconnect()
}
