import { useAccount, useConnect } from 'wagmi'

export function Connect() {
  const { connector } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()

  return (
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
  )
}
