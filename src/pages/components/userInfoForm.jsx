import React, { useState, ChangeEvent } from 'react';
import api from '../../libs/api';

// Thanks for reading, since the form is with less items, so I make the background of form responsive xdd.
const UserInfoForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Peter',
    email: 'placeholder@example.com',
    phone: '1234567890',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const validate = () => {
    const newErrors = {};
    if (!userInfo.name) newErrors.name = 'Name is required';
    if (!userInfo.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = 'Email is invalid, it must be like xxx@xxx.com';
    }
    if (!userInfo.phone) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9+\-()\s]+$/.test(userInfo.phone)) {
      newErrors.phone = 'Phone must contain only digits and valid symbols';
    }
    return newErrors;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsEditing(false);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Sending data to backend:', userInfo);
   
    const {data} = await api.post('api/createUserInfo', userInfo)
    const { message } = data;
    alert(`Message from api: ${message}`);
};

  return (
    <div className="flex justify-center p-6 bg-gray-100">
      <div className="max-w-[90%] md:w-fit sm:w-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {isEditing ? 'Edit User Info' : 'User Info'}
        </h2>
        <form onSubmit={isEditing ? handleSave : handleSubmit}>
          <div className="space-y-6">
            {isEditing ? (
              <>
                {['name', 'email', 'phone'].map((field, index) => (
                  <div className="flex items-center" key={index}>
                    <label className="w-32 font-semibold text-gray-600 capitalize space-x-4">{field}:</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={userInfo[field]}
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1 bg-gray-100 focus:ring-2 focus:ring-blue-500"
                    />
                    {errors[field] && (
                      <span className="text-red-500 text-sm mt-1">{errors[field]}</span>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <div className="space-y-4">
                {['name', 'email', 'phone'].map((field, index) => (
                  <div className="flex justify-between" key={index}>
                    <label className="w-32 font-semibold text-gray-600 capitalize space-x-4">{field}:</label>
                    <label className="w-full border rounded px-2 py-1 bg-gray-100 text-left">
                      {userInfo[field]}
                    </label>
                  </div>
                ))}
              </div>
            )}

            <div className="flex space-x-4 mt-6">
              {isEditing ? (
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Save
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Submit
                </button>
              )}

              {!isEditing && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfoForm;