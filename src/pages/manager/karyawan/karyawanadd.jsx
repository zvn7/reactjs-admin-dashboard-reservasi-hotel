import { useState } from "react";
import axios from "axios";
import bcrypt from 'bcryptjs';
import { Link } from "react-router-dom";
import Navbar from "../../../components/Menu/Navbar";
import Sidebar from "../../../components/Menu/Sidebar";
const KaryawanAdd = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    nama_lengkap: "",
    jenis_kelamin: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Hash the password before sending it to the server
    const hashedPassword = await bcrypt.hash(formData.password, 10);
  
    try {
      await axios.post(
        "http://localhost:3000/insertData",
        { ...formData, password: hashedPassword }
      );
      window.location.href = "/manager/karyawan";
      window.alert("Data berhasil ditambahkan!");
    } catch (error) {
      console.error("Error adding data:", error);
      alert("Terjadi kesalahan saat menambahkan data.");
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
                <p className="text-lg">Tambah Data Karyawan</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className="orm-label text-sm font-medium text-gray-600"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control mt-1"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="orm-label text-sm font-medium text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control mt-1"
                  />
                </div>

                {/* password */}

                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="orm-label text-sm font-medium text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control mt-1"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="nama_lengkap"
                    className="orm-label text-sm font-medium text-gray-600"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="nama_lengkap"
                    name="nama_lengkap"
                    value={formData.nama_lengkap}
                    onChange={handleChange}
                    className="form-control mt-1"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="jenis_kelamin"
                    className="orm-label text-sm font-medium text-gray-600"
                  >
                    Jenis Kelamin
                  </label>
                  <select
                    id="jenis_kelamin"
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    onChange={handleChange}
                    className="form-control mt-1"
                  >
                    <option value="">--- Pilih Jenis Kelamin ---</option>
                    <option value="l">Laki Laki</option>
                    <option value="p">Perempuan</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="role"
                    className="orm-label text-sm font-medium text-gray-600"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="form-control mt-1"
                  >
                    <option value="">--- Pilih Jenis Kelamin ---</option>
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
                    Tambah Data
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
};

export default KaryawanAdd;
