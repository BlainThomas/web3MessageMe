import { useAccount } from 'wagmi'
import { useState } from 'react'
import './App.css'
import { Connect, Connected, SignMessage, VerifyMessage } from './components'

export function App() {
  const { isConnected } = useAccount()
  const [ signMessage, setSignMessage ] = useState<boolean>(true);

  function handleMessageType(){
    setSignMessage(!signMessage);
  }

  return (
    <div id='body'>
      <div className='container'>
        {isConnected ? 
        (
          <>
            <Connected />
            <button onClick={handleMessageType}>
              {signMessage ? 'Verify a Message' : 'Sign a Message'}
            </button>
            <div className='message-container'>
            {signMessage ? <SignMessage /> : <VerifyMessage />}
            </div>
          </>
        ) : (
          <Connect />
        )}
      </div>
    </div>
  )
}