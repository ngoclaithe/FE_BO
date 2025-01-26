import { Layout } from '../components/layout/Layout';
import { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getCurrentWallet } from '../services/apiWallet';
import { updateTrade } from '../services/apiTrade';
import ReactApexChart from 'react-apexcharts';
import { initialChartData } from '../constants/chart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TradePage = () => {
  const token = sessionStorage.getItem('token');
  const [userId, setUserId] = useState(null);
  const [selectedPair, setSelectedPair] = useState('BTC/USDT');
  const [isLoading, setIsLoading] = useState(true);
  const [timeFromBE, setTimeFromBE] = useState(null);
  const [currentBalance, setCurrentBalance] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);
  const [chartData, setChartData] = useState(initialChartData);
  const [expiryTime, setExpiryTime] = useState('1:00');
  const [isTradeDisabled, setIsTradeDisabled] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [tradeData, setTradeData] = useState(null); 
  const [referenceTime, setReferenceTime] = useState(null);
  const [referencePrice, setReferencePrice] = useState(null); 
  const [actualPrice, setActualPrice] = useState(null); 
  const [highlightedPrice, setHighlightedPrice] = useState(null); 
  const [highlightedColor, setHighlightedColor] = useState(null); 
  const ws = useRef(null);

  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.sub;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const userIdFromToken = getUserIdFromToken(token);
      setUserId(userIdFromToken);

      getCurrentWallet(token).then(response => {
        if (response && response.current_balance) {
          setCurrentBalance(response.current_balance);
        }
      }).catch(error => {
        console.error('Error fetching current wallet:', error);
      });
    }
  }, [token]);

  useEffect(() => {
    if (userId) {
      ws.current = new WebSocket(`wss://giaongay.cloud/api/markets/ws/fe/${userId}?token=${token}`);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
        setIsLoading(false);
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const price = selectedPair === 'BTC/USDT' ? data.btc_price : data.eth_price;

        setCurrentPrice(price);
        setActualPrice(price); 

        const timeFromBE = new Date(data.time + "Z");
        const localTime = timeFromBE.toLocaleString();

        setTimeFromBE(timeFromBE.getTime());

        if (tradeData && new Date(tradeData.time).getTime() === timeFromBE.getTime()) {
          const isWin = tradeData.type === 'up' ? price > tradeData.current_price : price < tradeData.current_price;
          const result = isWin ? 'Chính xác' : 'Chưa chính xác';

          toast(result);

          setHighlightedPrice(price);
          setHighlightedColor(isWin ? 'green' : 'red');

          setTradeData(null);
        }

        setChartData((prevData) => {
          const newData = [
            ...prevData.series[0].data,
            {
              x: timeFromBE,
              y: price,
            },
          ];

          const minX = newData.length > 0 ? newData[0].x : timeFromBE.getTime();
          const maxX = timeFromBE.getTime() + (timeFromBE.getTime() - minX) / 5;

          return {
            ...prevData,
            series: [
              {
                ...prevData.series[0],
                data: newData,
              },
            ],
            options: {
              ...prevData.options,
              xaxis: {
                ...prevData.options.xaxis,
                range: maxX - minX,
              },
            },
          };
        });
      };

      ws.current.onclose = () => {
        console.log('WebSocket disconnected');
      };

      return () => {
        if (ws.current) {
          ws.current.close();
        }
      };
    }
  }, [userId, token, selectedPair, tradeData]);

  const handleTradeAction = (action) => {
    if (!timeFromBE || !currentPrice) return;
    if (depositAmount > currentBalance) {
      // alert('Số tiền nhập vào vượt quá số tiền hiện có!');
      return;
    }
    setIsTradeDisabled(true);
    startCountdown();

    const tradeTimePlus60Sec = new Date(timeFromBE + 60000);
    console.log('Thời gian dự đoán:', tradeTimePlus60Sec.toISOString());
    const symbol = selectedPair.split('/')[0];
    const type = action === 'TĂNG' ? 'up' : 'down';

    const newTradeData = {
      symbol: symbol,
      time: tradeTimePlus60Sec.toISOString(),
      type: type,
      deposit: depositAmount.toString(),
      userId: userId,
      current_price: currentPrice,
    };

    setTradeData(newTradeData);
    setReferencePrice(currentPrice); 
    setReferenceTime(tradeTimePlus60Sec.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }));

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(newTradeData));
    } else {
      console.error('WebSocket không kết nối');
    }
  };

  const startCountdown = () => {
    let timeLeft = 60;
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft -= 1;
        setExpiryTime(`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`);
      } else {
        clearInterval(interval);
        setIsTradeDisabled(false);
        setExpiryTime('1:00');
  
        getCurrentWallet(token).then(response => {
          if (response && response.current_balance) {
            setCurrentBalance(response.current_balance);
          }
        }).catch(error => {
          console.error('Error fetching current wallet:', error);
        });
      }
    }, 1000);
  };

  useEffect(() => {
    setChartData(initialChartData);
  }, [selectedPair]);

  return (
    <Layout>
      <div className="bg-gray-900 min-h-screen p-4 text-white flex flex-col">
        <div className="mb-6 flex justify-between items-center">
          <select
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-gray-600 w-full md:w-auto text-lg"
          >
            <option value="BTC/USDT">BTC/USDT</option>
            <option value="ETH/USDT">ETH/USDT</option>
          </select>
          <div className="text-lg ml-4">
            Số dư: <span className="font-bold">${currentBalance}</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-6 flex-1">
          {isLoading ? (
            <div className="text-center text-xl py-20">Đang kết nối</div>
          ) : (
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="line"
              height={350}
            />
          )}

          <div className="flex flex-col md:flex-row justify-between mb-6 mt-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <div className="text-lg">Hết hạn: {expiryTime}</div>
                <div className="text-lg">Giá mốc: {referencePrice}</div>
                <div className="text-lg">Thời gian tham chiếu: {referenceTime}</div>
                {/* <div className="text-lg">Giá thực tế: {actualPrice}</div> */}
                {highlightedPrice && (
                  <div className="text-lg" style={{ color: highlightedColor }}>
                    Giá tại thời điểm tham chiếu: {highlightedPrice}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-2">Nhập số tiền:</label>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(Number(e.target.value))}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full"
              min="0"
              max={currentBalance}
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => handleTradeAction('TĂNG')}
              className={`bg-green-600 flex-1 py-4 rounded-lg transition-colors ${
                isTradeDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
              }`}
              disabled={isTradeDisabled}
            >
              <span className="text-xl font-bold">TĂNG</span>
            </button>
            <button
              onClick={() => handleTradeAction('GIẢM')}
              className={`bg-red-600 flex-1 py-4 rounded-lg transition-colors ${
                isTradeDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
              }`}
              disabled={isTradeDisabled}
            >
              <span className="text-xl font-bold">GIẢM</span>
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default TradePage;