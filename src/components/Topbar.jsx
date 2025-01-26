import React from 'react';

const Topbar = ({ selectedTab, setSelectedTab }) => {
    return (
        <div className="bg-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <button
                            onClick={() => setSelectedTab('players')}
                            className={`px-4 py-2 text-sm font-medium ${
                                selectedTab === 'players'
                                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Quản lý giao dịch theo người chơi
                        </button>
                        <button
                            onClick={() => setSelectedTab('deposit')}
                            className={`px-4 py-2 text-sm font-medium ${
                                selectedTab === 'deposit'
                                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Quản lý nạp tiền
                        </button>
                        <button
                            onClick={() => setSelectedTab('manageruser')}
                            className={`px-4 py-2 text-sm font-medium ${
                                selectedTab === 'manageruser'
                                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Quản lý người dùng
                        </button>
                        <button
                            onClick={() => setSelectedTab('online')}
                            className={`px-4 py-2 text-sm font-medium ${
                                selectedTab === 'online'
                                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Quản lý giao dịch gần đây
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;