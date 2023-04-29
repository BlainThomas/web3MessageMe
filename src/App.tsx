import { useAccount } from 'wagmi'
import { Account, Connect, VerifyMessage, NetworkSwitcher, SignMessage } from './components'

export function App() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1>{isConnected ? 'Connect Wallet' : 'Send Message'} </h1>
      <Connect />

      {isConnected && (
        <>
          <SignMessage />
          <VerifyMessage />
          <Account />
          <NetworkSwitcher />
        </>
      )}
    </>
  )
}
