import web3 from 'web3';
const isAddress = address => {
    console.log('helper.js 1>>>', address)
  if (address.substring(0,3) === 'xdc') {
    address = "0x" + address.substring(3);
  }
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
  } else if (
    /^(0x|0X)?[0-9a-f]{40}$/.test(address) ||
    /^(0x|0X)?[0-9A-F]{40}$/.test(address)
  ) {
    return true;
  }
  console.log('helper.js 1.2>>>', address)
  return web3.utils.checkAddressChecksum(address);
};
const toChecksumAddress = address => {
    console.log('helper.js 2>>>', address)
    return web3.utils.toChecksumAddress(address);
};
export { isAddress, toChecksumAddress };
