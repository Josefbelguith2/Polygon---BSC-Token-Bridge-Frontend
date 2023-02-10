import web3 from 'web3';

// fallback url helpful for loading web3 data even if user not connected to metamask
export default class Web3 {
  private static _instance: web3;

  public static get instance() {
    if (Web3._instance) return Web3._instance;
    Web3._instance = new web3(web3.givenProvider || 'YOUR FALLBACK RPC URL');
    return Web3._instance;
  }

  public static isEnabled() {
    return typeof (window as any).ethereum !== 'undefined';
  }
}
