import React, {useState} from 'react';
import { useSignMessage } from 'wagmi';
import { verifyMessage } from 'ethers/lib/utils';

interface MessageDataProps {
  header: string;
  text: string;
}

export function SignMessage(): JSX.Element {

  const recoveredAddress = React.useRef<string>();
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess: (data, variables) => {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data);
      recoveredAddress.current = address;
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get('message');
    if (typeof message === 'string') {
      signMessage({ message });
    }
  };

  const MessageData = ({ header, text }: MessageDataProps) => {
      const [isCopied, setIsCopied] = useState(false);
    
      const handleCopyClick = () => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      };
  
    return (
      <div className='copy-data' onClick={handleCopyClick}>
        <h3>{header}</h3>
        <div className='signature'>{text}</div>
        <div className='copy-text' >{isCopied ? "Copied!" : "Click to copy"}
        </div>
      </div>
    );
  };

  return (
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <h2>Sign Message</h2>
        <div className="my-3">
          <textarea
            id="message"
            name="message"
            placeholder="Enter a message to sign"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}>{isLoading ? 'Check Wallet' : 'Sign Message'}
        </button>
        {data && (
          <div className='message'>
            <MessageData header="Your Address" text={recoveredAddress.current || ""} />
            <MessageData header="Signature" text={data} />
          </div>
        )}
        {error && <div>{error.message}</div>}
      </form>
  );
}