import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../../components/Menu/Navbar";
import Sidebar from "../../../components/Menu/Sidebar";

function KaryawanEdit() {
  const { id } = useParams();
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
    nama_lengkap: "",
    jenis_kelamin: "",
    role: "",
  });

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getData/${id}`);
      const data = response.data;
      setFormValue(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const changeHandler = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    alert("Data berhasil diupdate");
    try {
      const response = await axios.put(
        `http://localhost:3000/updateData/${id}`,
        formValue
      );
      console.log(response);
      // Assuming the response contains the updated data
      // You can redirect or update the state as needed
      window.location.href = "/manager/karyawan";
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengupdate data.");
    }
  };

  return (
    <div>
      <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="ml-64 p-16 pt-0 w-full mt-28">
            <div className="bg-dark p-5 rounded-lg shadow text-white">
              <div className="flex justify-between items-center mb-5 text-white">
                <h1 className="text-2xl font-bold text-white">Karyawan</h1>
                <p className="text-lg">Edit Data Karyawan</p>
              </div>
              <form onSubmit={submitHandler}>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formValue.username}
                    onChange={changeHandler}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formValue.email}
                    onChange={changeHandler}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formValue.password}
                    onChange={changeHandler}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="nama_lengkap"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="nama_lengkap"
                    name="nama_lengkap"
                    value={formValue.nama_lengkap}
                    onChange={changeHandler}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="jenis_kelamin"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Jenis Kelamin
                  </label>
                  <select
                    id="jenis_kelamin"
                    name="jenis_kelamin"
                    value={formValue.jenis_kelamin}
                    onChange={changeHandler}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="l">Laki-laki</option>
                    <option value="p">Perempuan</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formValue.role}
                    onChange={changeHandler}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="">Pilih Role</option>
                    <option value="manager">Manager</option>
                    <option value="resepsionis">Resepsionis</option>
                    <option value="room_service">Room Service</option>
                  </select>
                </div>

                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Edit Data
                  </button>
                  <Link to="/manager/karyawan" className="bg-slate-600 text-white px-4 py-2 rounded ml-3">
                    Kembali
                  </Link> 
                </div>
              </form>
            </div>
          </div>
      </div>
      </div>
  );
}

export default KaryawanEdit;
