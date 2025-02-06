import React, { useEffect, useState } from "react";
import axios from "axios";
import EditEmployeModal from "./EditEmployeModal";
import { ToastContainer, toast } from 'react-toastify'; 
import { Link } from "react-router-dom";

const GetEmployess = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getEmployee");
        setCompanies(response.data);
      } catch (err) {
        setError("Error fetching companies");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleDelete = async (id) => {
   
    try {
      await axios.delete(`http://localhost:5000/deletedEmployee/${id}`);
      setCompanies((prev) => prev.filter((company) => company._id !== id));
      toast.success("Employee deleted successfully!"); // Changed to toast.success
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee. Try again."); // Optional: Add error handling toast
    }
  };
  const handleEdit = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleSave = (updatedCompany) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company._id === updatedCompany._id ? updatedCompany : company
      )
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = companies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <p className="text-center mt-6 text-gray-700">Loading...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Employee List
      </h2>
      <Link to="/EmployessAdd" className="bg-gray-300 mr-4 p-3 rounded-xl mb-12  text-center" >
        Add Employee
        </Link>
      <div className="overflow-x-auto mt-12">
        <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Employee Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Mobile</th>
              <th className="p-3 border">Address</th>
              <th className="p-3 border">DOB</th>
              <th className="p-3 border">Designation</th>
              <th className="p-3 border">Profile Photo</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((company, index) => (
                <tr key={index} className="text-center border-b">
                  <td className="p-3 border">{company.name}</td>
                  <td className="p-3 border">{company.email}</td>
                  <td className="p-3 border">{company.mobile}</td>
                  <td className="p-3 border">{company.address}</td>
                  <td className="p-3 border">{company.dob}</td>
                  <td className="p-3 border">{company.designation}</td>
                  <td className="p-3 border">
                    {company.profileImage?.length > 0 ? (
                      company.profileImage.map((logo, i) => (
                        <img
                          key={i}
                          src={`http://localhost:5000/${logo}`}
                          alt="Profile"
                          className="h-10 w-10 object-cover inline-block rounded-md m-1"
                        />
                      ))
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="bg-gray-300 mr-4 p-2 rounded-xl"
                      onClick={() => handleEdit(company)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-black text-white p-2 rounded-xl"
                      onClick={() => handleDelete(company._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 p-4">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 rounded-lg ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-1 bg-gray-200 rounded-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 rounded-lg ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
        >
          Next
        </button>
        <ToastContainer />
      </div>

      {/* Edit Modal */}
      <EditEmployeModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        company={selectedCompany}
        onSave={handleSave}
      />
       <ToastContainer />
    </div>
  );
};

export default GetEmployess;
