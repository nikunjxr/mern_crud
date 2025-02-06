import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; 

const EditEmployeModal = ({ isOpen, closeModal, company, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    designation: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (company) {
    
      setFormData({
        name: company.name || "",
        email: company.email || "",
        mobile: company.mobile || "",
        address: company.address || "",
        designation: company.designation || "",
      });
    }
  }, [company]);

  const handleImageUpload = (event) => {
    setProfileImage(event.target.files[0]); // Single file upload
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      if (!company?._id) {
        toast.error("Employee ID is missing.");
        return;
      }
  
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
  
      if (profileImage) {
        data.append("profileImage", profileImage);
      }
  
      // Debugging: Log FormData before sending
      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }
  
      const response = await axios.patch(
        `http://localhost:5000/updateEmployee/${company._id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      onSave(response.data);
      closeModal();
      toast.success("Employee updated successfully!");
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee.");
    }
  };
  
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Edit Employee
        </h2>
        <div>
          <label className="block font-medium text-gray-700">Employee Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Profile Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full rounded-lg"
          />
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={closeModal} className="bg-gray-300 py-2 px-4 rounded-lg">
            Close
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeModal;
