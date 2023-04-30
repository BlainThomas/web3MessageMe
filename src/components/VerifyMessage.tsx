import { useState } from "react";
import { ethers } from "ethers";
import { ErrorMessage, SuccessMessage } from "./Messages/";

interface VerifyMessageProps {}

interface VerifyMessageInputs {
  message: string;
  address: string;
  signature: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const verifyMessage = async ({ message, address, signature }: VerifyMessageInputs) => {
  try {
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const VerifyMessage: React.FC<VerifyMessageProps> = () => {
  const [error, setError] = useState<string | undefined>();
  const [successMsg, setSuccessMsg] = useState<string | undefined>();

  const handleVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSuccessMsg(undefined);
    setError(undefined);
    const isValid = await verifyMessage({
      setError,
      message: data.get("message")!.toString(),
      address: data.get("address")!.toString(),
      signature: data.get("signature")!.toString(),
    });

    if (isValid) {
      setSuccessMsg("Signature is valid!");
    } else {
      setError("Invalid signature");
    }
  };

  return (
    <form className="m-4" onSubmit={handleVerification}>
      <h2>Verify signature</h2>
      <textarea
        required
        name="message"
        placeholder="Message"
      />
      <textarea
        required
        name="signature"
        placeholder="Signature"
      />
      <input
        required
        type="text"
        name="address"
        placeholder="Signer address"
      />
      <button type="submit" >Verify signature</button>
      <div className="p-4 mt-4">
        <ErrorMessage message={error} />
        <SuccessMessage message={successMsg} />
      </div>
    </form>
  );
};
