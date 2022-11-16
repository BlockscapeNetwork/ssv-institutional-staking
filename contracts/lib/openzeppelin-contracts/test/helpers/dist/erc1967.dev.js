"use strict";

var ImplementationLabel = 'eip1967.proxy.implementation';
var AdminLabel = 'eip1967.proxy.admin';
var BeaconLabel = 'eip1967.proxy.beacon';

function labelToSlot(label) {
  return '0x' + web3.utils.toBN(web3.utils.keccak256(label)).subn(1).toString(16);
}

function getSlot(address, slot) {
  return web3.eth.getStorageAt(web3.utils.isAddress(address) ? address : address.address, web3.utils.isHex(slot) ? slot : labelToSlot(slot));
}

module.exports = {
  ImplementationLabel: ImplementationLabel,
  AdminLabel: AdminLabel,
  BeaconLabel: BeaconLabel,
  ImplementationSlot: labelToSlot(ImplementationLabel),
  AdminSlot: labelToSlot(AdminLabel),
  BeaconSlot: labelToSlot(BeaconLabel),
  getSlot: getSlot
};