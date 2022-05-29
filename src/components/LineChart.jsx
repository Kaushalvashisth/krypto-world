import React, { useState,useEffect} from 'react';
import { Line} from 'react-chartjs-2';
import { Button, Col, Row, Typography } from 'antd';
import  axios  from 'axios';
import Chart from 'chart.js/auto'; //important
import {
   PlusOutlined
} from '@ant-design/icons'
const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
   const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [currency,setCurrency]=useState('usd');
  const [flag,setflag] = useState(false);
  // const [watchList,setWatchList] = useState([])

  // const handleWatchList = (crypto) => {
  //     const wl=JSON.parse(localStorage.getItem('watchList'))
  //     if (!wl.includes(crypto)) {
  //        // watchList.push(crypto);
  //        wl.push(crypto);
  //        console.log(wl);
  //        localStorage.setItem('watchList', JSON.stringify(wl));
  //        // alert("Element added to watchlist");
  //     }
  // }
  console.log("Coin is ",coinName.toLowerCase());
  const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

//   const coinPrice = [];
//   const coinTimestamp = [];

//   for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
//     coinPrice.push(coinHistory?.data?.history[i].price);
//   }

//   for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
//     coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
//   }
//   console.log("coinPrice = ",coinPrice);
//   console.log("coinTime = ",coinTimestamp);
//   const data = {
//     labels: coinTimestamp,
//     datasets: [
//       {
//         label: 'Price In USD',
//         data: coinPrice,
//         fill: false,
//         backgroundColor: '#0071bd',
//         borderColor: '#0071bd',
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   };

  const fetchHistoricData = async () => {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinName.toLowerCase()}/market_chart?vs_currency=${currency}&days=${days}#`);
    setflag(true);
    setHistoricData(data.prices);
   console.log("New api call ",data.prices);
  };
  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
   //  axios.get(`https://api.coingecko.com/api/v3/coins/${coinName.toLowerCase()}/market_chart?vs_currency=usd&days=${days}#`)
   //      .then(response => console.log(response));
  }, [days]);
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
          {/* <button onClick={handleWatchList({coinName,currentPrice})}>Add to watchList<PlusOutlined /></button> */}
        </Col>
      </Row>
      {!historicData | flag===false ? (
          <div>Loading........</div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <Button                  
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </Button>
              ))}
            </div>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#1890ff",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            
          </>
        )}
    </>
  );
};

export default LineChart;