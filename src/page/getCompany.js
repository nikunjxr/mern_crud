import React, { useEffect, useState } from "react";
import axios from "axios";
import EditCompanyModal from "./EditCompanyModal";
import { ToastContainer, toast } from 'react-toastify'; 
import { Link } from "react-router-dom";

const GetCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 3;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/companyGet");
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
      await axios.delete(`http://localhost:5000/DeletedCompany/${id}`);
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company._id !== id)
      );
           toast.success("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error("Failed to delete employee. Try again.");
    }
  };
  

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleSave = (updatedCompany) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company._id === updatedCompany._id ? updatedCompany : company
      )
    );
  };

  // Pagination logic
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

  const nextPage = () => {
    if (currentPage < Math.ceil(companies.length / companiesPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading)
    return <p className="text-center mt-6 text-gray-700">Loading...</p>;
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6 ">
        Company List
      </h2>
      <Link to="CompanyAdd" className="bg-gray-300 mr-4 p-3 rounded-xl mb-12  text-center" >
        Add Company
        </Link>
      <div className="overflow-x-auto mt-12">
       
        <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">Company Name</th>
              <th className="p-3 border">Owner</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Logos</th>
              <th className="p-3 border">Owner Images</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCompanies.length > 0 ? (
              currentCompanies.map((company, index) => (
                <tr key={index} className="text-center border-b">
                  <td className="p-3 border">{company.name}</td>
                  <td className="p-3 border">{company.owner}</td>
                  <td className="p-3 border">{`${company.city}, ${company.state}, ${company.country}`}</td>
                  <td className="p-3 border group">
                    {Array.isArray(company.logo) && company.logo.length > 0 ? (
                      company.logo.map((logo, i) => (
                        <img
                          key={i}
                          src={`http://localhost:5000/${logo}`}
                          alt="Company Logo"
                          className="h-24 w-24 object-cover inline-block rounded-md m-1 transition-transform duration-300 ease-in-out group-hover:scale-110"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      ))
                    ) : (
                      <span className="text-gray-500">{company.name}</span>
                    )}
                  </td>

                  <td className="p-3 border">
                    {Array.isArray(company.images) &&
                    company.images.length > 0 ? (
                      company.images.map((img, i) => (
                        <img
                          key={i}
                          src={`http://localhost:5000/${img}`}
                          alt="Owner"
                          className="h-24 w-24 object-cover inline-block rounded-md m-1 transition-transform duration-300 ease-in-out group-hover:scale-110"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      ))
                    ) : (
                      <span className="text-gray-500">No Owner Image</span>
                    )}
                  </td>

                  <td>
                    <button
                      className="bg-gray-300 mr-4 p-3 rounded-xl"
                      onClick={() => handleEdit(company)}
                    >
                      Edit
                    </button>
                   
                    <button
                      className="bg-black text-white mr-4 p-3 rounded-xl"
                      onClick={() => handleDelete(company._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 p-4">
                  No companies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 mx-2 rounded-lg ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
          }`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="px-4 py-2 mx-2 text-gray-700">
          Page {currentPage} of {Math.ceil(companies.length / companiesPerPage)}
        </span>

        <button
          className={`px-4 py-2 mx-2 rounded-lg ${
            currentPage >= Math.ceil(companies.length / companiesPerPage)
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(companies.length / companiesPerPage)}
        >
          Next
        </button>
        <ToastContainer />
      </div>

      <EditCompanyModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        company={selectedCompany}
        onSave={handleSave}
      />
    </div>
  );
};

export default GetCompanies;
