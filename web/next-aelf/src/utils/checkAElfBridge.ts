import { AElfDappBridge } from '@aelf-react/types';
let endpoint = '';

// options & connect is aelf-bridge only
export function isAElfBridge(aelfBridge: AElfDappBridge) {
  return !!(aelfBridge.options && aelfBridge.connect);
}
export function isCurrentAElfBridge(aelfBridge: AElfDappBridge) {
  return endpoint === aelfBridge.options?.endpoint;
}

export async function reConnectAElfBridge(aelfBridge: AElfDappBridge) {
  const isConnected = await aelfBridge.connect?.();
  if (!isConnected) throw Error('Reconnect Failed');
  endpoint = aelfBridge.options?.endpoint || '';
}

// aelf-bridge only supports one node and needs to check whether it is connected
export async function checkAElfBridge(aelfBridge: AElfDappBridge) {
  if (isAElfBridge(aelfBridge) && !isCurrentAElfBridge(aelfBridge)) {
    await reConnectAElfBridge(aelfBridge);
  }
}
