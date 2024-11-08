import { Client, Wallet } from 'xrpl'

// Get wallet from seed
const wallet = Wallet.fromSeed('TBC')

// New ledger connection
const client = new Client('TBC')
await client.connect()

try {
  // Create account delete tx object

  const deleteTx = {
    
  }
}