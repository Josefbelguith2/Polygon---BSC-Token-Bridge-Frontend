import { app } from 'config';
import classes from 'pages/Bridge/bridge.module.scss';
import colors from '../../../variables.module.scss';

const faqs = [
  {
    id: 'bridge',
    title: `What is ${app.company.name}?`,
    content: `${app.company.name} is used to bridge ${app.company.token} tokens on Matic Network (MATIC) and Binance Smart Chain (BSC).`,
  },
  {
    id: 'use-bridge',
    title: 'How to use the Bridge?',
    content: `To use the bridge, connect your Metamask Wallet containing ${app.company.name} tokens. Enter the amount of ${app.company.name} tokens that you wish to bridge and proceed. Once the tokens are transferred, you should submit your transfer hash. Once you submit, your will be signed by the admin. After that, you can deposit the tokens. You have to submit the deposit hash to start a new transaction.`,
  },
  {
    id: 'how-long',
    title: 'How long does a transfer on the Bridge take?',
    content:
      'The time taken to transfer depends on the network congestion and the fees you choose while transfer. Since Matic requires as many as 12 confirmations to process a transaction, you can expect the process to take some time from start to finish. You can speed up the transaction by paying higher fees.',
  },
  {
    id: 'gas-price-higher-than-amount',
    title: 'What if the gas price is higher than the transaction amount?',
    content:
      'The gas price depends on the congestion in the network, which is why it fluctuates throughout the day. It is therefore advisable to keep an eye on fees and plan your transactions accordingly.',
  },
  {
    id: 'bridge-fee',
    title: 'How do the fees work on Bridge?',
    jsx: (
      <p className={classes.faqContent} style={{ fontSize: 10, lineHeight: '12px' }}>
        The gas price you select while submitting a transaction is like an offer pitched to the
        network to process your transaction promptly. When you choose a low gas price, it could lead to
        considerable delays in processing your transaction. You can refer to Polygonscan's gas tracker to plan
        your transaction on Polygon.
        <br />
        <br />
        <a
          style={{ color: colors.primaryColor, cursor: 'pointer' }}
          href="https://polygonscan.com/gastracker"
          target="_blank"
          rel="noreferrer">
          https://polygonscan.com/gastracker
        </a>
      </p>
    ),
  },
];

export default faqs;
