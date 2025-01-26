import React from 'react';

const EditRestaurantDialog = ({ editFormData, handleEditChange, handleUpdate, closeDialog }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Chỉnh Sửa Nhà Hàng</h2>
        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700">Tên Nhà Hàng</label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Địa Chỉ</label>
              <input
                type="text"
                name="address"
                value={editFormData.address}
                onChange={handleEditChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Số Điện Thoại</label>
              <input
                type="text"
                name="phone_number"
                value={editFormData.phone_number}
                onChange={handleEditChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tên Chủ Nhà Hàng</label>
              <input
                type="text"
                name="owner_name"
                value={editFormData.owner_name}
                onChange={handleEditChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Điểm Đánh Giá</label>
              <input
                type="number"
                step="0.1"
                name="preference_score"
                value={editFormData.preference_score}
                onChange={handleEditChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Giờ mở cửa</label>
              <input
                type="text"
                name="open_time"
                value={editFormData.open_time}
                onChange={handleEditChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Chọn vị trí trên bản đồ</label>
            <div id="map" style={{ height: '200px', width: '100%' }}></div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Cập Nhật Nhà Hàng
          </button>
        </form>
        <button
          onClick={closeDialog}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default EditRestaurantDialog;