import React, { useState } from "react";

import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const CompanyForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [logoImages, setLogoImages] = useState([]);
  const [ownerImages, setOwnerImages] = useState([]);


  const handleLogoUpload = (event) => {
    setLogoImages(Array.from(event.target.files)); 
  };

  const handleOwnerUpload = (event) => {
    setOwnerImages(Array.from(event.target.files));
  };

  const handleNumericInput = (e) => {
    const value = e.target.value;
    e.target.value = value.replace(/[^0-9]/g, '');
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("country", data.country);
    formData.append("zipcode", data.zipcode);
    formData.append("owner", data.owner);

    if (logoImages) {
      logoImages.forEach((file) => formData.append("logo", file));
    }
    if (ownerImages) {
      ownerImages.forEach((file) => formData.append("images", file));
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/Companies",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Data sent successfully:", response.data);
      toast.success("Company registered successfully!");

      // Clear form data after successful submission
      reset();

    } catch (error) {
      console.log("Error sending data:", error);
      toast.error("Error while submitting data.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-3 rounded-lg shadow-lg w-[600px] mb-6 mt-3">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-3">
          Company Registration Form
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Company Name</label>
            <input {...register("name", { required: "Company name is required" })} className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block font-medium text-gray-700">Owner Name</label>
            <input {...register("owner", { required: "Owner name is required" })} className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.owner && <p className="text-red-500">{errors.owner.message}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Company Logo </label>
            <input type="file" onChange={handleLogoUpload} className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Address</label>
            <input {...register("address", { required: "Address is required" })} className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700">City</label>
              <input {...register("city", { required: "City is required" })} className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.city && <p className="text-red-500">{errors.city.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">State</label>
              <input {...register("state", { required: "State is required" })} className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {errors.state && <p className="text-red-500">{errors.state.message}</p>}
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Country</label>
            <input {...register("country", { required: "Country is required" })} className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.country && <p className="text-red-500">{errors.country.message}</p>}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Zip Code</label>
            <input 
              type="text" 
              {...register("zipcode", { required: "Zip code is required" })} 
              onInput={handleNumericInput} 
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            {errors.zipcode && <p className="text-red-500">{errors.zipcode.message}</p>}
          </div>
          

       

          <div>
            <label className="block font-medium text-gray-700">Owner Images (Multiple)</label>
            <input type="file" multiple onChange={handleOwnerUpload} className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg w-full transition-all duration-200">
            Submit
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
