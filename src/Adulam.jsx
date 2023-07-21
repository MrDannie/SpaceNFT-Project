import abi from "./abis/src/contracts/SpaceNFT.sol/SpaceNFT.json";
import address from "./abis/contractAddress.json";
import { getGlobalState, setGlobalState } from "./store";
import { ethers } from "ethers";

const { ethereum } = window;
const contractAddress = address.address;
const contractAbi = abi.abi;
// const opensea_uri = `https://testnets.opensea.io/assets/goerli/${contractAddress}/`;

const getEtheriumContract = () => {
  const connectedAccount = getGlobalState("connectedAccount");

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    return contract;
  } else {
    return getGlobalState("contract");
  }
};

const isWalletConnected = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_accounts" });

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]);
      await isWalletConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]);
    } else {
      alert("Please connect to MUMBAI Network.");
      console.log("No accounts found.");
    }
  } catch (error) {
    reportError(error);
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    setGlobalState("connectedAccount", accounts[0]);
  } catch (error) {
    reportError(error);
  }
};

const publicMint = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = getEtheriumContract();
    const amount = ethers.utils.parseEther("0.001");

    console.log(amount, contract, contractAddress, "Contract Called");
    await contract.publicMint({
      from: connectedAccount,
      value: amount._hex,
    });
    console.log(amount, "Response Returned");

    window.location.reload();
  } catch (error) {
    reportError(error);
  }
};

const reportError = (error) => {
  console.log(error.message);
  throw new Error("No ethereum object.");
};

export { isWalletConnected, connectWallet, publicMint };
