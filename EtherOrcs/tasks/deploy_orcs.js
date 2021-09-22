const fs = require('fs');
const deployments = require('../data/deployments');

task('deploy-orcs').setAction(async function () {
  const [deployer] = await ethers.getSigners();

  const factory = await ethers.getContractFactory('Anonymice', deployer);
  const instance = await factory.deploy();
  await instance.deployed();

  console.log(`Deployed orcsRink to: ${instance.address}`);
  deployments.orcsRink = instance.address;

  const json = JSON.stringify(deployments, null, 2);
  fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
    flag: 'w',
  });
});
