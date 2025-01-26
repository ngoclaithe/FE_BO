import { Layout } from '../components/layout/Layout';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Topbar from '../components/Topbar';
import PlayerManagement from '../components/PlayerManagement';
import DepositManagement from '../components/DepositManagement';
import RecentTradesManagement from '../components/RecentTradesManagement';

const AdminDashboard = () => {
    const [selectedTab, setSelectedTab] = useState('players');
    const [userId, setUserId] = useState(null);
    const token = sessionStorage.getItem('token');

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
        }
    }, [token]);

    return (
        <Layout>
            <div className="bg-gray-100 min-h-screen">
                <Topbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {selectedTab === 'players' && <PlayerManagement token={token} />}
                    {selectedTab === 'deposit' && <DepositManagement />}
                    {selectedTab === 'online' && <RecentTradesManagement token={token} />}
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;