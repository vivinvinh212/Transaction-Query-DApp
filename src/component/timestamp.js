import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import moment from 'moment';


export default function TimeStamp({ blockNumber }) {

    const provider = new ethers.providers.WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/p1JTO_kY405u6cLC13uCUgbD6h1Gj9Fz", 1)

    const [timeStamp, setTimeStamp] = useState("")

    useEffect(() => {
        getTime(blockNumber)
        // eslint-disable-next-line
    }, [timeStamp])


    const getTime = async (blockNumber) => {
        //brackets are important
        const result = (await provider.getBlock(blockNumber)).timestamp
        setTimeStamp(moment.unix(result).toString())
    }

    return (
        <span>{timeStamp}</span>
    )
}