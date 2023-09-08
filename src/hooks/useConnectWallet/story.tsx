import React, { FormEvent, useState, FunctionComponent } from "react";
import Web3 from "web3";

import Typography from "../../elements/Typography";
import useConnectWallet from "./index";
import { signWalletTransaction } from "../../utils";

const Demo: FunctionComponent = () => {
  const {
    wallet,
    connect,
    disconnect,
    error,
    getAddress,
    getChangeAddress,
    getBalance,
    getSupportedWallets,
    signTransaction,
  } = useConnectWallet();

  const [address, setAddress] = useState<string>("");
  const [changeAddress, setChangeAddress] = useState<string>("");
  const [balance, setBalance] = useState<number | undefined>();

  const supportedWallets = getSupportedWallets();

  const installedWallets = supportedWallets.filter(
    (wallet) => wallet.isInstalled
  );

  const handleRecieveAddress = (addr: string) => {
    setAddress(addr);
  };

  const handleRecieveChangeAddress = (addr: string) => {
    setChangeAddress(addr);
  };

  const handleRecieveBalance = (balance: number) => {
    setBalance(balance);
  };

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    connect((event.target as HTMLSelectElement).value);
  };

  const handleDisconnectWallet = () => {
    setAddress("");
    setBalance(undefined);
    disconnect();
  };

  if (Object.keys(supportedWallets).length === 0) {
    return (
      <Typography>
        Cardano wallet extensions are currently only supported in Chrome and
        Brave browsers.
      </Typography>
    );
  }

  const signMessageWithMetamask = async () => {
    if (typeof window.ethereum === "undefined") {
      // Metamask is not installed
      console.error("Metamask is not installed");
      return;
    }

    try {
      // Request permission to access the user's accounts
      await window.ethereum.enable();

      // Create a Web3 instance
      const web3 = new Web3(window.ethereum);

      // Get the user's current account address
      const [account] = await web3.eth.getAccounts();

      // Generate a random message to sign
      const message = "Sign this message to verify your account ownership.";

      // Sign the message using Metamask
      const password = "password22";

      const signature = await web3.eth.personal.sign(
        message,
        account,
        password
      );
      console.log("Message successfuly signed with wallet!");
      console.log({ account, message, signature });
      // Verify signature
      console.log("Recovering signer using the message and signature...");
      web3.eth.personal.ecRecover(message, signature).then((res) => {
        console.log("Recovered signer: ", res);
      });
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  return installedWallets.length === 0 ? (
    <>
      <Typography>
        Please install one of the following supported Cardano wallets:
      </Typography>

      <ul style={{ listStyleType: "none" }}>
        {supportedWallets.map(({ name, icon }) => (
          <li style={{ display: "flex", alignItems: "center" }} key={name}>
            <span style={{ marginRight: "1rem" }}>
              <img style={{ width: "16px", height: "16px" }} src={icon} />
            </span>
            {name}
          </li>
        ))}
      </ul>
    </>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {!!wallet && (
        <Typography style={{ marginBottom: "1rem" }}>
          Currently connected wallet2: {wallet.name}
        </Typography>
      )}

      {!!address && (
        <Typography style={{ marginBottom: "1rem" }}>
          Address: {address}
        </Typography>
      )}

      {!!changeAddress && (
        <Typography style={{ marginBottom: "1rem" }}>
          Change address: {changeAddress}
        </Typography>
      )}

      {!!balance && (
        <Typography style={{ marginBottom: "1rem" }}>
          Balance: &#x20B3; {balance}
        </Typography>
      )}

      {!wallet && installedWallets.length > 0 && (
        <>
          <Typography style={{ marginBottom: "1rem" }}>
            Select an installed wallet:
          </Typography>

          <select onChange={handleChange}>
            <option />
            {installedWallets.map(({ id, name }) => {
              return <option key={id} value={id} label={name} />;
            })}
          </select>
        </>
      )}

      {!!wallet && (
        <div style={{ marginTop: "1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <button onClick={() => getAddress(handleRecieveAddress)}>
              Get address
            </button>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <button onClick={() => signMessageWithMetamask()}>
              Sign transaction
            </button>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <button
              onClick={() => getChangeAddress(handleRecieveChangeAddress)}
            >
              Get change address
            </button>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <button onClick={() => getBalance(handleRecieveBalance)}>
              Get balance
            </button>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <button onClick={handleDisconnectWallet}>Disconnect wallet</button>
          </div>
        </div>
      )}

      {!!error && (
        <div style={{ marginTop: "1rem" }}>
          <Typography style={{ color: "red" }}>{error}</Typography>
        </div>
      )}
    </div>
  );
};

export default {
  title: "useConnectWallet",
  component: Demo,
};

export const Primary = () => <Demo />;
