import React from 'react';

const DetailCartItem = ({ cart, onClose }) => {
    if (!cart) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
                <h2 className="text-xl font-bold mb-4">Chi tiết giỏ hàng</h2>
                <ul>
                    {cart.items.map((item) => (
                        <li key={item.id} className="mb-4">
                            <div className="flex items-center">
                                <img
                                    src={item.merchandise_image}
                                    alt={item.merchandise_name}
                                    className="w-10 h-10 mr-2"
                                />
                                <div>
                                    <p className="font-semibold">{item.merchandise_name}</p>
                                    <p>Số lượng: {item.quantity}</p>
                                    <p>Giá: {item.price} VNĐ</p>
                                    {item.shop && (
                                        <div className="mt-1">
                                            <p className="text-sm text-gray-600">
                                                Cửa hàng: {item.shop.name}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Điện thoại: {item.shop.phone}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Địa chỉ: {item.shop.address}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={onClose}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default DetailCartItem;