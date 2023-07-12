// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import {SpaceNFTBase} from "./SpaceNFTBase.sol";
import "hardhat/console.sol";

//All Errors for specific events.
error Zukuverse__NOTPUBLIC();
error Zukuverse__LOWFUNDS();
error Zukuverse__MAXSUPPLYREACHED();
error Zukuverse__OVERMAXMINT();

/**
 * @title Space NFT Smart Contract.
 * @author DannyLabs team
 * @notice this is the main NFT smart contract for the SpaceNFT collection
 * @dev inherits abstract base for full implementation
 */
contract SpaceNFT is SpaceNFTBase {
    /**
     * @notice event is emitted after successful mint
     * @param sender refers to who minted
     * @param quantity refers to how many the sender minted
     */
    event Zukuverse__Minted(address indexed sender, uint256 indexed quantity);

    /**
     * @notice publicSale is a bool that determines when public mint is active
     */
    bool public publicSale = true;

    /**
     * @notice this is the object based configuration for main mint info
     */
    struct MintConfig {
        uint24 publicMaxPerAddress;
        uint256 publicPrice;
        uint256 maxSupply;
    }
    MintConfig public spaceNFTMintconfig;

    /** 
   @param _name is the name of the Collection 
    @param _symbol is the symbol of the Collection 
   */
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri
    ) SpaceNFTBase(_name, _symbol, _uri) {
        // spaceNFTMintconfig.publicPrice = _mintDetails.publicPrice;
        // spaceNFTMintconfig.maxSupply = _mintDetails.maxSupply;
        // spaceNFTMintconfig.publicMaxPerAddress = _mintDetails.publicMaxPerAddress;
        // setAdmin(_devWallet);
        // adminMint(_owner, _quantity);
    }

    /**
     * @notice editMintConfig is function executed to update mint details
     * @dev onlyAdmin can execute the function
     * @param _publicMaxPerAddress is the max of NFts per wallet for public mint
     * @param _publicPrice is the cost for NFT for public mint
     * @param _maxSupply is the max Supply for total collection
     */
    function editMintConfig(
        uint _publicPrice,
        uint _maxSupply,
        uint24 _publicMaxPerAddress
    ) external onlyAdmin {
        spaceNFTMintconfig.publicMaxPerAddress = _publicMaxPerAddress;
        spaceNFTMintconfig.maxSupply = _maxSupply;
        spaceNFTMintconfig.publicPrice = _publicPrice;
    }

    /**
     * @notice editActiveSale allows for update of sale phase for og, gem and public mints
     * @dev only admin can update the active sale
     * @param _publicSale is the bool for update of public sale status
     */
    function editActiveSale(bool _publicSale) external onlyAdmin {
        publicSale = _publicSale;
    }

    function publicMint() external payable callerIsUser {
        uint256 _quantity = 1;
        if (!publicSale) revert Zukuverse__NOTPUBLIC();
        if (msg.value < spaceNFTMintconfig.publicPrice * _quantity)
            revert Zukuverse__LOWFUNDS();
        if (_quantity > 1) revert Zukuverse__OVERMAXMINT();
        mint(_quantity);
    }

    /**
     * @notice the main mint function for all the phases
     * @dev set internally since it is called within each of the individual mint functions for the
     * phases. Also implement Reentrancy guard and callerIsUser for security purposes
     * @param _quantity refers to the total number of minted NFTs in single transaction
     */
    function mint(uint256 _quantity) internal nonReentrant {
        // if (totalSupply() + _quantity > spaceNFTMintconfig.maxSupply)
        //     revert Zukuverse__MAXSUPPLYREACHED();
        _safeMint(msg.sender, _quantity);
        emit Zukuverse__Minted(msg.sender, _quantity);
    }

    /**
     * @notice the admin mint function for team NFT reserve
     * @dev implement nonReentrant and callerIsUser for security purposes and only
     * admin can execute function
     * @param _owner is whomever on the receiving the minted NFTs
     * @param _quantity refers to the total number of minted NFTs in single transaction
     */
    function adminMint(
        address _owner,
        uint256 _quantity
    ) public onlyAdmin nonReentrant callerIsUser {
        _safeMint(_owner, _quantity);
    }

    // function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    //     _requireMinted(tokenId);

    //     string memory baseURI = _baseURI();
    //     return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
    // }

    // The following functions are overrides required by Solidity.

    // function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    //     internal
    //     override(ERC721, ERC721Enumerable)
    // {
    //     super._beforeTokenTransfer(from, to, tokenId);
    // }

    // function supportsInterface(bytes4 interfaceId)
    //     public
    //     view
    //     override(ERC721, ERC721Enumerable)
    //     returns (bool)
    // {
    //     return super.supportsInterface(interfaceId);
    // }

    // function _baseURI() internal pure override returns (string memory) {
    //     return "ipfs://Qmc1UadV1BFmXJsQnMdcZT3vZxRsZZE5EKqgLdtfeCX4HW/";
    // }
}
