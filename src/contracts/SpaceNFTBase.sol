//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
// import {ERC721A} from "erc721a/contracts/ERC721A.sol";
import {ERC721A} from "erc721a/contracts/ERC721A.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @notice this error will output if a function requires an admin
 */
error SpaceNFTBase__NOTADMIN();

/**
 * @title The base contract for the SpaceNFT contract
 * @author DannyLabs Team
 * @notice this contract contains the base functionalities for the NFT mint
 * @dev Marked as abstract as it is a branch of the Main SpaceNFT Contract
 */

abstract contract SpaceNFTBase is Ownable, ERC721A, ReentrancyGuard {
    /**
     * @notice mapping connects a wallet address to its role as an admin or not
     */
    mapping(address => bool) public isAdmin;

    /**
     * @notice baseURI stores the main uri for the NFT metadata
     */
    string public baseURI;

    /** @param _name is the name of the NFT Collection
        @param _symbol is the symbol of the NFT Collection
        @param _uri  is the base url to the NFT metadta 
    */
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _uri
    ) ERC721A(_name, _symbol) {
        baseURI = _uri;
    }

    /**
     * @notice this functions sets admin(s) for wallet addresses
     * @dev only owner has the ability to set admin
     * @param _addr is the adress passed in to connect
     */
    function setAdmin(address _addr) public onlyOwner {
        isAdmin[_addr] = true;
    }

    /**
     * @notice this functions remove admin(s) for wallet addresses
     * @dev only owner has the ability to set admin
     * @param _addr is the adress passed in to connectz
     */
    function removeAdmin(address _addr) external onlyOwner {
        isAdmin[_addr] = false;
    }

    /**
     * @notice this function allows admin to update baseURI
     * @dev only owner has the ability to set admin
     * @param _uri is the adress passed in to connectz
     */
    function setURI(string memory _uri) external onlyAdmin {
        baseURI = _uri;
    }

    /**
     * @notice function gives access to the base URI for metadata
     * @dev overrides the baseURI function in erc721a implementation
     * @return baseURI for access of metadata
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    /**
     * @notice checks on certain function calls if adr is apart of admin or not
     * @dev utilizing revert instead of require to save on gas per transaction
     */
    modifier onlyAdmin() {
        if (!isAdmin[msg.sender] && msg.sender != owner())
            revert SpaceNFTBase__NOTADMIN();
        _;
    }

    /**
     * @notice modifier ensures that whomever is calling the contract comes
     * from an actual wallet, not smart contract
     */
    modifier callerIsUser() {
        require(tx.origin == msg.sender, "Not a Sender");
        _;
    }

    /**
     * @notice function gives us access to the total number of tokens minted between wallets
     * @dev utilizing _numberMinted internal function from erc721a smart contract to get access
     * @param owner refers to the address we are querying
     * @return Total NFTs minted by a user
     */
    function numberMinted(address owner) public view returns (uint256) {
        return _numberMinted(owner);
    }

    /**
     * @notice tokenURI gives us the full URI to a specific NFT's metadata
     * @dev is an override of base implemention of Azuki ERC721A
     * @param tokenId is the id of the NFT metadata we are looking for
     * @return tokenURI which contains NFT info
     */
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory baseURI_ = _baseURI();
        return
            bytes(baseURI_).length != 0
                ? string(abi.encodePacked(baseURI, _toString(tokenId), ".json"))
                : string(abi.encodePacked(baseURI, "unreveal.json"));
    }

    //Override required by solidity
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721A) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
