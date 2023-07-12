import "./Main.css";
import { Link } from "react-router-dom";

const hamburger = document.getElementById("hamburger");
const hamburgerClose = document.getElementById("hamburger-close");
const menu = document.getElementById("menu");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("show");
    menu.classList.toggle("show");
  });

  hamburgerClose.addEventListener("click", () => {
    hamburgerClose.classList.toggle("show");
    hamburger.classList.toggle("show");
    menu.classList.toggle("show");
  });
}

const Hero = () => {
  // const onMintNFT = async () => {
  //   setGlobalState("loading", {
  //     show: true,
  //     msg: "Minting new NFT to your account",
  //   });

  //   await publicMint()
  //     .then(() => setAlert("Minting Successful...", "green"))
  //     .catch(() => setGlobalState("loading", { show: false, msg: "" }));
  // };

  return (
    <div className="App">
      <header className="content-body">
        <header className="header-content">
          <div className="container">
            <div className="flex-box header-flex">
              <div>
                <p className="sub-heading">INTRODUCING TO YOU,</p>
                <h1>SPACE NFT</h1>
                <p className="short-text">
                  Space NFT starts with a collection of 10,000 avatars that give
                  you membership access to Th SPACE: a corner of the internet
                  where artists, builders, and web3 enthusiasts meet to create a
                  decentralized future. Well sit back, and relax because we’ll
                  give you a truly out of this world experience! Explore!
                </p>
              </div>
              <div className="mint">
                <div>
                  <Link to="/">
                    <img
                      src={require("../assets/destination/image-moon.png")}
                      alt="titan"
                    />
                  </Link>
                </div>
                {/* {connectedAccount ? (
                  <div>
                    <button>
                      <span>{truncate(connectedAccount, 4, 4, 11)}</span>
                    </button>
                    <button onClick={onMintNFT}>
                      <span>Mint</span>
                    </button>
                  </div>
                ) : (
                  <button onClick={connectWallet}>
                    <span>Connect Wallet</span>
                  </button>
                )} */}
              </div>
            </div>
          </div>
        </header>
      </header>
    </div>
  );
};

export default Hero;
