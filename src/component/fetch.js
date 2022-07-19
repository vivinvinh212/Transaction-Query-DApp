import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import TimeStamp from "../component/timestamp";



const Fetch = () => {
    const [mint, setMint] = useState([])
    const [burn, setBurn] = useState([])



    let provider = new ethers.providers.WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/p1JTO_kY405u6cLC13uCUgbD6h1Gj9Fz", 1)
    const ADDRESS = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'
    const ABI = [
        "event Mint(address indexed to, uint256 amount);",
        "event Burn(address indexed burner, uint256 value);"
    ];
    const contract = new ethers.Contract(ADDRESS, ABI, provider)

    useEffect(() => {
        const fetchMint = async () => {
            const mintTransaction = await contract.queryFilter('Mint', 6766284, 'latest')
            setMint(mintTransaction.slice(mintTransaction.length - 21, mintTransaction.length - 1));
        }
        const fetchBurn = async () => {
            const burnTransaction = await contract.queryFilter('Burn', 6766284, 'latest')
            setBurn(burnTransaction.slice(burnTransaction.length - 21, burnTransaction.length - 1));
        }
        fetchBurn();
        fetchMint();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <h1> WBTC mint and burn lastest transactions query (hash, amount, time stamp)</h1>
            <div className='mint'>
                <h2> Last 20 mint transactions data</h2>
                {mint.slice(0).reverse().map((item, i) => {
                    return <ul className="mt-2" key={i}>
                        <li>Transaction Hash: {item.transactionHash}</li>
                        <li>To Address: {item.args[0]}</li>
                        <li>Amount: {ethers.utils.formatEther(item.args.amount)}</li>
                        <li>TimeStamp: <TimeStamp blockNumber={item.blockNumber} /></li>
                    </ul>
                })}
            </div>
            {/* <div className='test'>
                <Grid
                    data={[
                        ['John', 'john@example.com'],
                        ['Mike', 'mike@gmail.com']
                    ]}
                    columns={['Name', 'Email']}
                    search={true}
                    pagination={{
                        enabled: true,
                        limit: 1,
                    }}
                />
            </div> */}
            <div className='burn'>
                <h2> Last 20 burn transactions data</h2>
                {burn.slice(0).reverse().map((item, i) => {
                    return <ul className="mt-2" key={i}>
                        <li>Transaction Hash: {item.transactionHash}</li>
                        <li>Burner Address: {item.args.burner}</li>
                        <li>Amount: {ethers.utils.formatEther(item.args.value)}</li>
                        <li>TimeStamp: <TimeStamp blockNumber={item.blockNumber} /></li>
                    </ul>
                })}
            </div>

        </div>


    )

}



export default Fetch;