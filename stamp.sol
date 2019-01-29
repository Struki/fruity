pragma solidity ^0.4.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol;

contract Stamp is ERC721Token {
  constructor() ERC721Token("Stamp", "STK") public {}

   

	function mint() public {

     _mint(msg.sender, _id);
  }

}
