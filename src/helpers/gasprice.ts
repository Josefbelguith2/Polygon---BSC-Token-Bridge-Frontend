import axios from 'axios';
import Web3 from './web3';

const fetchGasPrice = async () => {
  const web3 = Web3.instance;
  const connectedNetwork = await web3.eth.net.getId();
  if (connectedNetwork !== 1) {
    return undefined;
  }

  try {
    const gasPriceStation = await axios.get('https://ethgasstation.info/api/ethgasAPI.json');
    if (gasPriceStation.data.fastest) {
      const fastestPrice = gasPriceStation.data.fastest.toString();
      return parseInt(fastestPrice) * 1e9;
    }
    return undefined;
  } catch (error) {
    return undefined;
  }
};

export default fetchGasPrice;
