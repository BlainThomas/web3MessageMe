import { useAccount } from 'wagmi'
import { useState } from 'react'
import './App.css'
import { Connect, SignMessage, VerifyMessage } from './components'

export function App() {
  const { isConnected } = useAccount();
  const [ signMessage, setSignMessage ] = useState<boolean>(true);

  function handleMessageType(){
    setSignMessage(!signMessage);
  }

  return (
    <div id='body'>
      <div className='container'>
        <Connect />
        {isConnected && 
          <>
            <button onClick={handleMessageType}>
              {signMessage ? 'Verify a Message' : 'Sign a Message'}
            </button>
            <div className='message-container'>
            {signMessage ? <SignMessage /> : <VerifyMessage />}
            </div>
          </>
        }
      </div>
    </div>
  )
}