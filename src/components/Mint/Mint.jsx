import "./Mint.css";
import { setAlert, setGlobalState, useGlobalState } from "../../store";
import { publicMint, connectWallet } from "../../Adulam";

const Mint = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");

  const onMintNFT = async () => {
    if (connectedAccount) {
      setGlobalState("loading", {
        show: true,
        msg: "Minting new NFT to your account",
      });

      await publicMint()
        .then(() => setAlert("Minting Successful...", "green"))
        .catch(() => setGlobalState("loading", { show: false, msg: "" }));
    } else {
      await connectWallet()
        .then(() => setAlert("Connected!", "green"))
        .catch(() => setGlobalState("loading", { show: false, msg: "" }));
    }
  };

  return (
    <div className="mint-body">
      <div>
        <h1>ABOUT SPACE NFT</h1>
        <p>
          Space NFT starts with a collection of 10,000 avatars that give you
          membership access to The SPACE: <br /> a corner of the internet where
          artists, builders, and web3 enthusiasts meet to create a decentralized
          future. <br /> Well sit back, and relax because we’ll give you a truly
          out of this world experience! Explore!
        </p>
        <button onClick={onMintNFT} className="btn mint-button">
          MINT
        </button>
      </div>
    </div>
  );
};

export default Mint;
