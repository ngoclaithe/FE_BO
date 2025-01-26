import { Layout } from '../components/layout/Layout';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMoneys, getMoneysByUserId } from '../services/apiMoney';
import { jwtDecode } from 'jwt-decode';

const WalletPage = () => {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState('');
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState('nap');
  const [moneyHistory, setMoneyHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [code, setCode] = useState('');

  const banks = [
    { type_bank: 'MB', name_bank: 'Ngân hàng Quân đội (MB)', number_bank: '123456789', owner: 'Nguyễn Văn A' },
    { type_bank: 'ACB', name_bank: 'Ngân hàng Á Châu (ACB)', number_bank: '987654321', owner: 'Trần Thị B' },
    { type_bank: 'VCB', name_bank: 'Ngân hàng Ngoại thương (VCB)', number_bank: '456789123', owner: 'Lê Văn C' },
    { type_bank: 'VTB', name_bank: 'Ngân hàng VietinBank (VTB)', number_bank: '321654987', owner: 'Phạm Thị D' },
  ];

  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.sub;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  };

  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleBankChange = (e) => {
    const selectedBank = e.target.value;
    setSelectedBank(selectedBank);
    setError(null);
    // Generate a new random code when a bank is selected
    setCode(Math.random().toString().slice(2, 8));
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (!isNaN(rawValue)) {
      setAmount(formatCurrency(rawValue));
      setError(null);
    }
  };

  const handleCreateMoney = async (type_trans) => {
    setError(null);
    setLoading(true);

    const userId = getUserIdFromToken(token);
    if (!userId) {
      setError('Không thể xác định người dùng. Vui lòng đăng nhập lại.');
      setLoading(false);
      return;
    }

    const cleanAmount = parseFloat(amount.replace(/,/g, ''));
    if (!cleanAmount || cleanAmount <= 0) {
      setError('Vui lòng nhập số tiền hợp lệ.');
      setLoading(false);
      return;
    }

    const selectedBankDetails = banks.find((bank) => bank.type_bank === selectedBank);
    if (!selectedBankDetails) {
      setError('Vui lòng chọn ngân hàng hợp lệ.');
      setLoading(false);
      return;
    }

    const newMoneyData = {
      userId: userId,
      type_trans: type_trans,
      number_moneys: cleanAmount,
      name_bank: selectedBankDetails.name_bank,
      number_bank: selectedBankDetails.number_bank,
      type_bank: selectedBankDetails.type_bank,
      time: new Date().toISOString(),
      code: code, // Use the generated code
    };

    try {
      await createMoneys(newMoneyData);
      alert(`Giao dịch ${type_trans === 'nap' ? 'nạp tiền' : 'rút tiền'} thành công!`);
      setAmount('');
      setSelectedBank('');
      setCode(''); // Reset the code after successful transaction
    } catch (error) {
      setError('Có lỗi xảy ra khi thực hiện giao dịch. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetMoneyHistory = async () => {
    setLoading(true);
    setError(null);

    const userId = getUserIdFromToken(token);
    if (!userId) {
      setError('Không thể xác định người dùng. Vui lòng đăng nhập lại.');
      setLoading(false);
      return;
    }

    try {
      const response = await getMoneysByUserId(userId);
      setMoneyHistory(response);
    } catch (error) {
      setError('Có lỗi xảy ra khi lấy lịch sử giao dịch. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'history') {
      handleGetMoneyHistory();
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl mx-4">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <ul className="space-y-2">
                {['nap', 'rut', 'history'].map((tab) => (
                  <li
                    key={tab}
                    className={`p-2 cursor-pointer ${
                      activeTab === tab ? 'bg-white border-l-4 border-blue-500' : 'bg-gray-200'
                    }`}
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab === 'nap' ? 'Nạp tiền' : tab === 'rut' ? 'Rút tiền' : 'Lịch sử nạp rút'}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-3/4 md:pl-6">
              {activeTab === 'nap' && (
                <>
                  <h2 className="text-xl font-bold text-blue-700 mb-4">Nạp tiền</h2>
                  {error && <div className="text-red-500 mb-4">{error}</div>}
                  
                  <div className="mb-4">
                    <label className="block mb-2">Chọn ngân hàng</label>
                    <select
                      className="w-full border border-gray-300 p-2 rounded"
                      onChange={handleBankChange}
                      value={selectedBank}
                    >
                      <option value="">-- Chọn ngân hàng --</option>
                      {banks.map((bank) => (
                        <option key={bank.type_bank} value={bank.type_bank}>
                          {bank.name_bank}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedBank && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Thông tin tài khoản:</p>
                      <p className="text-sm font-semibold">
                        Chủ tài khoản: {banks.find((bank) => bank.type_bank === selectedBank)?.owner}
                      </p>
                      <p className="text-sm font-semibold">
                        Số tài khoản: {banks.find((bank) => bank.type_bank === selectedBank)?.number_bank}
                      </p>
                      <p className="text-sm font-semibold">
                        Mã code: {code}
                      </p>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block mb-2">Nhập số tiền</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded"
                      placeholder="Nhập số tiền"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </div>

                  <button
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 disabled:opacity-50"
                    onClick={() => handleCreateMoney('nap')}
                    disabled={loading || !selectedBank || !amount}
                  >
                    {loading ? 'Đang xử lý...' : 'Nạp tiền'}
                  </button>
                </>
              )}

              {activeTab === 'rut' && (
                <>
                  <h2 className="text-xl font-bold text-blue-700 mb-4">Rút tiền</h2>
                  {error && <div className="text-red-500 mb-4">{error}</div>}
                  
                  <div className="mb-4">
                    <label className="block mb-2">Chọn ngân hàng</label>
                    <select
                      className="w-full border border-gray-300 p-2 rounded"
                      onChange={handleBankChange}
                      value={selectedBank}
                    >
                      <option value="">-- Chọn ngân hàng --</option>
                      {banks.map((bank) => (
                        <option key={bank.type_bank} value={bank.type_bank}>
                          {bank.name_bank}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedBank && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Thông tin tài khoản:</p>
                      <p className="text-sm font-semibold">
                        Chủ tài khoản: {banks.find((bank) => bank.type_bank === selectedBank)?.owner}
                      </p>
                      <p className="text-sm font-semibold">
                        Số tài khoản: {banks.find((bank) => bank.type_bank === selectedBank)?.number_bank}
                      </p>
                      <p className="text-sm font-semibold">
                        Mã code: {code}
                      </p>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block mb-2">Nhập số tiền</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 p-2 rounded"
                      placeholder="Nhập số tiền"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </div>

                  <button
                    className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 disabled:opacity-50"
                    onClick={() => handleCreateMoney('rut')}
                    disabled={loading || !selectedBank || !amount}
                  >
                    {loading ? 'Đang xử lý...' : 'Rút tiền'}
                  </button>
                </>
              )}

              {activeTab === 'history' && (
                <div>
                  <h2 className="text-xl font-bold text-blue-700 mb-4">Lịch sử giao dịch</h2>
                  {loading ? (
                    <div>Đang tải...</div>
                  ) : error ? (
                    <div className="text-red-500">{error}</div>
                  ) : (
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border p-2">Loại GD</th>
                          <th className="border p-2">Số tiền</th>
                          <th className="border p-2">Ngân hàng</th>
                          <th className="border p-2">Thời gian</th>
                        </tr>
                      </thead>
                      <tbody>
                        {moneyHistory.map((transaction, index) => (
                          <tr key={index} className="text-center">
                            <td className="border p-2">{transaction.type_trans === 'nap' ? 'Nạp' : 'Rút'}</td>
                            <td className="border p-2">{formatCurrency(transaction.number_moneys)}</td>
                            <td className="border p-2">{transaction.name_bank}</td>
                            <td className="border p-2">{new Date(transaction.time).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WalletPage;