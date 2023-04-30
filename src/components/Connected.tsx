import { useAccount, useDisconnect } from 'wagmi'

export function Connected() {
  const { connector } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div>
      <h1>Wallet Connected</h1>
      <button onClick={() => disconnect()}>
        Disconnect from {connector?.name}
      </button>
    </div>
  )
}
