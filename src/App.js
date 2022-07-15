import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function App() {
  const [mint, setMint] = useState([])
  const [burn, setBurn] = useState([])
  let provider = new ethers.providers.WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/p1JTO_kY405u6cLC13uCUgbD6h1Gj9Fz", 1)
  const ADDRESS = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'
  const ABI = [
    "event Mint(address indexed to, uint256 amount);",
    "event Burn(address indexed burner, uint256 value);"
  ];
  const contract = new ethers.Contract(ADDRESS, ABI, provider)
  async function retrieveMint() {
    const mintTransaction = await contract.queryFilter('Mint', 6766284, 'latest')
    setMint(mintTransaction.slice(mintTransaction.length - 21, mintTransaction.length - 1));
  }
  async function retrieveBurn() {
    const burnTransaction = await contract.queryFilter('Mint', 6766284, 'latest')
    return burnTransaction
  }
  useEffect(() => {
    console.log(mint)
  });
  return (
    <div className="App">
      <button className="btn-location" onClick={e => retrieveMint()}>Locate Me</button>
    </div>
  );
}

export default App;
