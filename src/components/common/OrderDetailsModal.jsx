import { useState } from 'react';
const OrderDetailsModal = ({ order, onClose }) => {
    if (!order || !order.items) return null; 
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 pb-2">Chi tiết đơn hàng</h2>
          <div className="space-y-6">
            {order.items.map((item) => (
              <div key={item.id} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50">
                <p className="text-lg font-semibold text-blue-700">{item.name}</p>
                <p className="text-gray-700">Số lượng: <span className="font-medium">{item.quantity}</span></p>
                <p className="text-gray-700">Giá: <span className="font-medium">{item.price}</span></p>
                <p className="text-gray-600 italic">{item.note || 'Không có ghi chú'}</p>
                <div className="mt-4 border-t pt-2">
                  <p className="font-semibold text-gray-800">Nhà hàng:</p>
                  <p className="text-gray-700">Tên: {item.restaurant.name}</p>
                  <p className="text-gray-700">Địa chỉ: {item.restaurant.address}</p>
                  <p className="text-gray-700">Số điện thoại: {item.restaurant.phone}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={onClose}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-md"
          >
            Đóng
          </button>
        </div>
      </div>
    );
};
export default OrderDetailsModal;
