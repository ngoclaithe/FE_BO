import React, { useEffect, useState } from 'react';
import { getPendingTrades, updateTrade } from '../services/apiTrade';
import { updateMarketFromAdmin } from '../services/apiMarket';

const RecentTradesManagement = ({ token }) => {
  const [pendingTrades, setPendingTrades] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const fetchPendingTrades = async () => {
    try {
      const data = await getPendingTrades(token);
      setPendingTrades(data);
    } catch (error) {
      console.error('Error fetching pending trades:', error);
      alert('Không thể lấy dữ liệu. Vui lòng thử lại.');
    }
  };

  const startInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const id = setInterval(fetchPendingTrades, 10000);
    setIntervalId(id);
  };

  const stopInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    fetchPendingTrades();
    startInterval();

    return () => stopInterval();
  }, []);

  const openDialog = (trade) => {
    setSelectedTrade(trade);
    setCurrentPrice(trade.current_price || 0);
  };

  const closeDialog = () => {
    setSelectedTrade(null);
    setCurrentPrice(0);
  };

  const increasePrice = () => {
    setCurrentPrice((prev) => prev + 1);
  };

  const decreasePrice = () => {
    setCurrentPrice((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const savePrice = async () => {
    if (selectedTrade) {
      try {
        const targetTime = new Date(selectedTrade.time_predict)
          .toISOString()
          .replace("T", " ")
          .slice(0, 19);
  
        const data = {
          userId: selectedTrade.userId,
          target_price: currentPrice,
          symbol: selectedTrade.symbol,
          target_time: targetTime,
        };
  
        let result;
        if (selectedTrade.type_predict === 'up') {
          result = currentPrice > selectedTrade.current_price ? 'win' : 'lose';
        } else if (selectedTrade.type_predict === 'down') {
          result = currentPrice < selectedTrade.current_price ? 'win' : 'lose';
        }
  
        const updateMarket = await updateMarketFromAdmin(token, data);
        const updatedTrade = await updateTrade(selectedTrade.id, { result: result }, token);
  
        closeDialog();
      } catch (error) {
        console.error("Lỗi khi cập nhật giá trị:", error);
        alert("Có lỗi xảy ra khi cập nhật giá trị. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800">Quản lý giao dịch gần đây</h2>

      <div className="mt-6 overflow-x-auto">
        {pendingTrades.length === 0 ? (
          <p className="text-gray-500">Không có giao dịch nào.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Mã giao dịch</th>
                <th className="py-2 px-4 border-b">Loại tiền</th>
                <th className="py-2 px-4 border-b">User_ID</th>
                <th className="py-2 px-4 border-b">Tiền nạp</th>
                <th className="py-2 px-4 border-b">Thời gian dự đoán</th>
                <th className="py-2 px-4 border-b">Loại dự đoán</th>
                <th className="py-2 px-4 border-b">Giá hiện tại</th>
                <th className="py-2 px-4 border-b">Kết quả</th>
                <th className="py-2 px-4 border-b">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {pendingTrades.map((trade) => (
                <tr key={trade.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{trade.id}</td>
                  <td className="py-2 px-4 border-b">{trade.symbol}</td>
                  <td className="py-2 px-4 border-b">{trade.userId}</td>
                  <td className="py-2 px-4 border-b">{trade.deposit}</td>
                  <td className="py-2 px-4 border-b">{trade.time_predict}</td>
                  <td className="py-2 px-4 border-b">{trade.type_predict}</td>
                  <td className="py-2 px-4 border-b">{trade.current_price}</td>
                  <td className="py-2 px-4 border-b">{trade.result}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => openDialog(trade)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Cài đặt giá trị
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedTrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Cài đặt giá trị cho giao dịch {selectedTrade.id}</h3>
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={decreasePrice}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                -
              </button>
              <span className="text-xl">{currentPrice}</span>
              <button
                onClick={increasePrice}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                +
              </button>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeDialog}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                onClick={savePrice}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentTradesManagement;