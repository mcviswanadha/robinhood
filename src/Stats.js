import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Stats.css';
import StatsRow from './StatsRow';
import { db } from './firebase';

const BASE_URL = 'https://finnhub.io/api/v1/quote';
const TOKEN = 'bv8q6e748v6rnm7c3mfg';

function Stats() {

    const [stockData, setStockData] = useState([]);
    const [myStocks, setmyStocks] = useState([]);

    const getMyStocks = () => {
        db
          .collection('myStocks')
          .onSnapshot(snapshot => {
              console.log("shapshot", snapshot.docs)
              let promises = [];
              let tempData = [];
              snapshot.docs.map((doc) => {
                  promises.push(getStocksData(doc.data().ticker)
                    .then(res => {
                        tempData.push({
                            id: doc.id,
                            data: doc.data(),
                            info: res.data
                        })
                    }))
              })
            Promise.all(promises).then(() => {
                setmyStocks(tempData);
            })

          })
    }

    const getStocksData = (stock) => {
        return axios
                .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
                .catch((error) => {
                    console.error("Error")
                });
    };

    useEffect(()=>{
        let tempStocksData = [];
        const stocksList = ["AAPL", "MSFT", "TSLA", "FB", "BABA", "UBER", "DIS", "SBUX"];
        let promises = [];
        getMyStocks();
        stocksList.map((stock) => {
            promises.push(
            getStocksData(stock)
            .then((res) => {
                tempStocksData.push({
                name: stock,
                ...res.data
              });
            })
          )
        });
        Promise.all(promises).then(() => {
            setStockData(tempStocksData);
        })
    },[])

    return (
        <div className='stats'>
            <div className='stats__container'>
                <div className='stats__header'>
                    <p>Stocks</p>
                </div>
                <div className='stats__content'>
                    <div className='stats__rows'>
                        {myStocks.map((stock) => (
                            <StatsRow 
                                key={stock.data.ticker}
                                name={stock.data.ticker}
                                openPrice={stock.info.o}
                                shares={stock.data.shares}
                                price={stock.info.c}
                            />
                        ))}
                    </div>
                </div>
                <div className='stats__header stats__lists'>
                    <p>Lists</p>
                </div>
                <div className='stats__content'>
                    <div className='stats__rows'>
                        {stockData.map((stock) => (
                            <StatsRow 
                                key={stock.name}
                                name={stock.name}
                                openPrice={stock.o}
                                price={stock.c}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats
