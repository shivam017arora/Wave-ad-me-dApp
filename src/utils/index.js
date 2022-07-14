export const getNetwork = (chainId) => {
  switch (parseInt(chainId)) {
    case 1:
      return "mainnet";
    case 4:
      return "rinkeby";
    case 1337:
      return "hardhat";
    case 31337:
      return "hardhat";
    default:
      return "unknown";
  }
};
