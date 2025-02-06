import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; 

const EmployeesAdd = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/geAllCompanies");
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("company", selectedCompany);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("country", data.country);
    formData.append("zipcode", data.zipcode);
    formData.append("dob", data.dob);
    formData.append("designation", data.designation);
  
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }
  
    try {
      const response = await axios.post("http://localhost:5000/Employee", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Data sent successfully:", response.data);
      toast.success("Employee added successfully!");
      reset(); // Clear form fields
    } catch (error) {
      console.error("Error sending data:", error);
  
      // Check if the error response contains "Email already exists"
      if (error.response && error.response.data.message === "Email already exists") {
        toast.error("Email already exists! Please use a different email.");
      } else {
        toast.error("Failed to add employee. Please try again.");
      }
    }
  };
  
  const handleMobileChange = (e) => {
    const mobileValue = e.target.value;
    if (!/^\d+$/.test(mobileValue)) {
      e.target.value = mobileValue.replace(/\D/g, ''); 
    }
  };

  const handleZipcodeChange = (e) => {
    const zipcodeValue = e.target.value;
    if (!/^\d+$/.test(zipcodeValue)) {
      e.target.value = zipcodeValue.replace(/\D/g, ''); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-3 rounded-lg shadow-lg w-[600px] mb-6 mt-6">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-3">
          Employee Registration Form
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          
          <div>
            <label className="block font-medium text-gray-700">Select Company</label>
            <select
              {...register("company", { required: "Company selection is required" })}
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCompany._id}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company.id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
            {errors.company && <p className="text-red-500">{errors.company.message}</p>}
          </div>

          
          <div>
            <label className="block font-medium text-gray-700">Employee Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Mobile</label>
              <input
                {...register("mobile", { required: "Mobile number is required" })}
                onChange={handleMobileChange}
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.mobile && <p className="text-red-500">{errors.mobile.message}</p>}
            </div>
          </div>

 
          <div>
            <label className="block font-medium text-gray-700">Address</label>
            <input
              {...register("address", { required: "Address is required" })}
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
          </div>


          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700">City</label>
              <input
                {...register("city", { required: "City is required" })}
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && <p className="text-red-500">{errors.city.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">State</label>
              <input
                {...register("state", { required: "State is required" })}
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.state && <p className="text-red-500">{errors.state.message}</p>}
            </div>
          </div>

   
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700">Country</label>
              <input
                {...register("country", { required: "Country is required" })}
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.country && <p className="text-red-500">{errors.country.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Zipcode</label>
              <input
                {...register("zipcode", { required: "Zipcode is required" })}
                onChange={handleZipcodeChange}
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.zipcode && <p className="text-red-500">{errors.zipcode.message}</p>}
            </div>
          </div>

    
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-gray-700">DOB</label>
              <input
                type="date"
                {...register("dob", { required: "Date of birth is required" })}
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
            </div>

            <div>
              <label className="block font-medium text-gray-700">Designation</label>
              <input
                {...register("designation", { required: "Designation is required" })}
                className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.designation && <p className="text-red-500">{errors.designation.message}</p>}
            </div>
          </div>


          <div>
            <label className="block font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

    
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg w-full transition-all duration-200"
          >
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EmployeesAdd;
