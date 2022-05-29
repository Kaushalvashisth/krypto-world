// https://eth-ropsten.alchemyapi.io/v2/JdiqLL-AQFhEw7R_1sI6_P7qGidp0pcd
require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/JdiqLL-AQFhEw7R_1sI6_P7qGidp0pcd',
      accounts: ['e7f6b70bc3dc4e994f60e6d4973b3acf7fa7bd9484c23857cdced2a5ef15479b'],
    },
  },
};