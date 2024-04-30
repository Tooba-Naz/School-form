import React, { useState } from "react";
import Banner from "../Components/Banner";
import { Button } from "../Components/Button";
import { IoMdAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { Input } from "../Components/Input";

const SchoolForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([
    { id: 1, name: "School A", address: "123 Main St", logo: "logo.jpg", email: "schoolA@example.com" },
    { id: 2, name: "School B", address: "456 Elm St", logo: "logo.jpg", email: "schoolB@example.com" },
    { id: 3, name: "School C", address: "789 Oak St", logo: "logo.jpg", email: "schoolC@example.com" }]);
  const [selectedSchool, setSelectedSchool] = useState(null);

  const handleSearch = () => {
    const filtered = data.filter(student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const addschool = (school) => {
    setData([...data, school]); // Update the data state with the new school
    setIsModalOpen(false);
  };

  const handleEdit = (school) => {
    setSelectedSchool(school);
    setModalOpen(true);
  };
  const handleSave = (updatedSchool) => {
    // Find the index of the selected school in the data array
    const index = data.findIndex(school => school.id === updatedSchool.id);
    // Update the school data array with the updated school object
    const updatedData = [...data];
    updatedData[index] = updatedSchool;
    setData(updatedData);
  };
  const handleDelete = (id) => {
    const updatedStudentData = data.filter(student => student.id !== id);
    setData(updatedStudentData);
  };
  return (
    <>
      <Banner />
      <div className="flex items-center justify-center pt-24 bg-gray-300">
        <div className="w-full max-w-screen-lg mx-auto">
          <div className="relative">
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or address"
                className="mb-2 sm:mb-0 mr-0 sm:mr-2"
              />
              <Button
                variant="Contact"
                type="button"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Logo
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(searchQuery !== "" ? filteredData : data).map((school, index) => (
                    <tr key={index} className="font-bold bg-white border-b text-sm dark:bg-gray-800 dark:border-gray-700">
                      <td>{school.id}</td>
                      <td>{school.name}</td>
                      <td>{school.address}</td>
                      <td><img className="rounded-full h-10 px-1 ml-2 sm:ml-24 my-1" src={"logo.jpg"} alt="Logo" /></td>
                      <td>{school.email}</td>
                      <td>
                        <Button variant="Contact" onClick={() => handleEdit(school)}>Edit</Button>
                        <Button variant="Contact" onClick={() => { console.log(school.id); handleDelete(school.id) }}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="absolute top-0 right-0 mt-4 sm:mt-0">
              <Button
                variant="Contact"
                type="button"
                id="button-addon3"
                onClick={() => setIsModalOpen(true)}
              >
                <IoMdAdd />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <NewTask setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} addschool={addschool} data={data} />
      <EditModal setModalOpen={setModalOpen} ModalOpen={ModalOpen} handleSave={handleSave} selectedSchool={selectedSchool} />
    </>
  );
}

export default SchoolForm;

const NewTask = ({ isModalOpen, setIsModalOpen, addschool, data }) => {
  
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState(data.length + 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const school = {
      id: id,
      name: name,
      address: address,
      email: email,
    };
    addschool(school);
    setId(id + 1);
    setName("");
    setAddress("");
    setEmail("");
  };

  return (
    <>
      <div
        id="authentication-modal"
        tabIndex="-1"
        className={`z-10 fixed inset-0 p-4 overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center ${isModalOpen ? '' : 'hidden'}`}
      >
        <div className="relative bg-white rounded-lg shadow w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="rounded-full font-bold"
            >
              <IoMdClose size={30} />
            </button>
          </div>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Register
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center items-center">
                <Input
                  type="text"
                  label={"Id"}
                  className="py-5 w-full md:w-9/12"
                  variant="Modal"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="id"
                />
              </div>
              <div className="flex justify-center items-center">
                <Input
                  type="text"
                  label={"Name"}
                  className="py-5 w-full md:w-9/12"
                  variant="Modal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
              <div className="flex justify-center items-center">
                <Input
                  type="text"
                  label={"Address"}
                  className="pb-5 w-full md:w-9/12"
                  variant="Modal"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                />
              </div>
              <div className="flex justify-center items-center">
                <Input
                  type="text"
                  label={"Email"}
                  className="pb-5 w-full md:w-9/12"
                  variant="Modal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="flex flex-col items-center">
                <Button
                  type="submit"
                  size="large"
                  className="rounded-full w-full md:w-auto"
                  variant="Contact"
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const EditModal = ({ ModalOpen, setModalOpen, selectedSchool, handleSave}) => {
 
  const [name, setName] = useState(selectedSchool ? selectedSchool.name || '' : '');
  const [address, setAddress] = useState(selectedSchool ? selectedSchool.address || '' : '');
  const [email, setEmail] = useState(selectedSchool ? selectedSchool.email || '' : '');

  const handleSubmit = (e) => {
    e.preventDefault();
   
    const updatedSchool = {
      ...selectedSchool,
      name: name,
      address: address,
      email: email
    };
    handleSave(updatedSchool);
    setModalOpen(false);
  };

  return (
    <>
      <div
        id="authentication-modal"
        tabIndex="-1"
        className={`z-10 fixed inset-0 p-4 overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center ${ModalOpen ? '' : 'hidden'}`}
      >
        <div className="relative bg-white rounded-lg shadow w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setModalOpen(false)}
              className="rounded-full font-bold"
            >
              <IoMdClose size={30} />
            </button>
          </div>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Edit Student Information
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center items-center">
                <Input
                  type="text"
                  label={"Id"}
                  className="py-5 w-full md:w-9/12"
                  variant="Modal"
                  value={selectedSchool ? selectedSchool.id : ''}
                  placeholder="Id"
                  disabled // Disable editing of ID field
                />
              </div>
              <div className="flex justify-center items-center">
                <Input
                  type="text"
                  label={"Name"}
                  className="py-5 w-full md:w-9/12"
                  variant="Modal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={selectedSchool ? selectedSchool.name : ''}
                />
              </div>
              <div className="flex justify-center items-center">
                <Input
                  type="text"
                  label={"Address"}
                  className="pb-5 w-full md:w-9/12"
                  variant="Modal"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={selectedSchool ? selectedSchool.address : ''}
                />
              </div>
              <div className="flex justify-center items-center">
                <Input
                  type="text"
                  label={"Email"}
                  className="pb-5 w-full md:w-9/12"
                  variant="Modal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={selectedSchool ? selectedSchool.email : ''}
                />
              </div>
              <div className="flex flex-col items-center">
                <Button
                  type="submit"
                  size="large"
                  className="rounded-full w-full md:w-auto"
                  variant="Contact"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
