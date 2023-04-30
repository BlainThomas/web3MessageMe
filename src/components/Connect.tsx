import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function Connect() {
  const { isConnected, connector } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
    const { disconnect } = useDisconnect()

  return (
    <>
      {isConnected ?
        <div>
          <h1>Wallet Connected</h1>
          <button onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </button>
        </div>
      :
        <div>
          <h1>Connect Wallet</h1>
          <div>
            {connectors
              .filter((x) => x.ready && x.id !== connector?.id)
              .map((x) => (
                <button key={x.id} onClick={() => connect({ connector: x })}>
                  {x.name}
                  {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
                </button>
            ))}
          </div>
        {error && <div>{error.message}</div>}
      </div>
      }
    </>
  )
}
