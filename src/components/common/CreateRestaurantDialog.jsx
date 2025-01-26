import React from 'react';

const CreateRestaurantDialog = ({ formData, handleChange, handleImageChange, handleSubmit, setShowCreateForm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full shadow-xl"> {/* Tăng width dialog */}
        <h2 className="text-lg text-center text-gray-700 mb-4">Tạo Nhà Hàng</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* 3 cột trên màn hình lớn */}
            <div className="mb-4">
              <label className="block text-gray-700">Tên Nhà Hàng</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Địa Chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Số Điện Thoại</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tên Chủ Nhà Hàng</label>
              <input
                type="text"
                name="owner_name"
                value={formData.owner_name}
                onChange={handleChange}
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
                value={formData.preference_score}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Giờ mở cửa</label>
              <input
                type="text"
                name="open_time"
                value={formData.open_time}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Tải Ảnh</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Chọn vị trí trên bản đồ</label>
            <div id="map" style={{ height: '200px', width: '100%' }}></div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Tạo Nhà Hàng
          </button>
        </form>
        <button
          onClick={() => setShowCreateForm(false)}
          className="mt-4 text-blue-500 hover:text-blue-700"
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

export default CreateRestaurantDialog;