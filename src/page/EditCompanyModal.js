import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; 

const EditCompanyModal = ({ isOpen, closeModal, company, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    city: "",
    state: "",
    country: "",
  });

  const [logoImages, setLogoImages] = useState([]);
  const [ownerImages, setOwnerImages] = useState([]);

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || "",
        owner: company.owner || "",
        city: company.city || "",
        state: company.state || "",
        country: company.country || "",
      });
    }
  }, [company]);

  const handleLogoUpload = (event) => {
    setLogoImages(event.target.files); 
  };

  const handleOwnerUpload = (event) => {
    setOwnerImages(event.target.files); 
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const data = new FormData();
      console.log(data)
      
      
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

 
      for (let i = 0; i < logoImages.length; i++) {
        data.append("logo", logoImages[i]);
      }

    
      for (let i = 0; i < ownerImages.length; i++) {
        data.append("images", ownerImages[i]);
      }

      const response = await axios.patch(
        `http://localhost:5000/updateCompany/${company._id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onSave(response.data);
      closeModal();
      toast.success("Company updated successfully!");
    } catch (error) {
      console.error("Error updating company:", error);
      toast.error("Failed to update company. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Edit Company
        </h2>
        <div>
          <label className="block font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Owner</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Company Logo</label>
          <input type="file" multiple onChange={handleLogoUpload} className="border p-2 w-full rounded-lg" />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Owner Images</label>
          <input type="file" multiple onChange={handleOwnerUpload} className="border p-2 w-full rounded-lg" />
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={closeModal} className="bg-gray-300 py-2 px-4 rounded-lg">Close</button>
          <button onClick={handleSave} className="bg-blue-600 text-white py-2 px-4 rounded-lg">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyModal;
