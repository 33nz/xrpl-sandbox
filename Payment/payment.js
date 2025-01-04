import { Client, Wallet, xrpToDrops } from 'xrpl'

// Get wallet from seed
const wallet = Wallet.fromSeed('sEdSuFyxRq8qaxH57V859XULo38NXLr')

// New ledger connection
const client = new Client('wss://s.altnet.rippletest.net:51233')
await client.connect()

try {
  // Create payment object
  // Prepare transaction
  // Sign the transaction
  // Submit the transaction and wait for the result
} catch (error) {
} finally {
}
