import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Menu/Navbar";
import Sidebar from "../../../components/Menu/Sidebar";
const PengunjungAdd = () => {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    email: "",
    telepon: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5285/api/Pengunjung",
        formData
      );
      window.location.href = "/manager/pengunjung";
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
                <h1 className="text-2xl font-bold text-white">Pengunjung</h1>
                <p className="text-lg">Tambah Data Pengunjung</p>
              </div>
              <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="nama"
                  className="form-label text-sm font-medium text-gray-600"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="form-control mt-1"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="alamat"
                  className="form-label text-sm font-medium text-gray-600"
                >
                  Alamat
                </label>
                <input
                  type="text"
                  id="alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="form-control mt-1"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="form-label text-sm font-medium text-gray-600"
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

              <div className="mb-3">
                <label
                  htmlFor="telepon"
                  className="form-label text-sm font-medium text-gray-600"
                >
                  Telepon
                </label>
                <input
                  type="tel"
                  id="telepon"
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleChange}
                  className="form-control mt-1"
                />
              </div>

              <div className="d-flex justify-content-start">
                <button
                  type="submit"
                  className="btn btn-primary me-3"
                >
                  Tambah Data
                </button>
                <Link to="/manager/pengunjung" className="btn btn-secondary">
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

export default PengunjungAdd;
