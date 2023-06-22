import { encode, decode } from "cbor-web";

import { EnabledWallet } from "../common";

const signWalletTransaction = async (wallet: EnabledWallet | null, tx: string): Promise<string> => {
  if (!wallet) {
    throw new Error("No wallet selected");
  }

  const witnesses = await wallet.signTx(tx);
  const decodedTx = decode(tx);
  const decodedWitnesses = decode(witnesses);
  decodedTx[1] = decodedWitnesses;
  const encodedTx = encode(decodedTx);

  return encodedTx.toString("hex");
};

export default signWalletTransaction;
