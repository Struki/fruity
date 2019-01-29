var MetaCoin = artifacts.require("MetaCoin");
var ConvertLib = artifacts.require("ConvertLib");


module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
	
//This links the contracts, Jack.
  deployer.link(ConvertLib, MetaCoin);


  deployer.deploy(MetaCoin);
};
