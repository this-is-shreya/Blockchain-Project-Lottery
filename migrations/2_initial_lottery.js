const lottery = artifacts.require("lottery");

module.exports = function (deployer) {
  deployer.deploy(lottery);
};
