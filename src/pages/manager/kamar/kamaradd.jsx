import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Menu/Navbar";
import Sidebar from "../../../components/Menu/Sidebar";
const KamarAdd = () => {
  const [formData, setFormData] = useState({
    nomor_kamar: "",
    tipe_kamar: "",
    harga: "",
    ketersediaan: "",
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
        "http://localhost:5285/api/Kamar",
        formData
      );
      window.location.href = "/manager/kamar";
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
                <h1 className="text-2xl font-bold text-white">Kamar</h1>
                <p className="text-lg">Tambah Data Kamar</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="nomor_kamar"
                    className="form-label text-sm font-medium text-gray-600"
                  >
                    Nomor Kamar
                  </label>
                  <input
                    type="text"
                    id="nomor_kamar"
                    name="nomor_kamar"
                    value={formData.nomor_kamar}
                    onChange={handleChange}
                    className="form-control mt-1"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="tipe_kamar"
                    className="form-label text-sm font-medium text-gray-600"
                  >
                    Tipe Kamar
                  </label>
                  <select
                    id="tipe_kamar"
                    name="tipe_kamar"
                    value={formData.tipe_kamar}
                    onChange={handleChange}
                    className="form-control mt-1"
                  >
                    <option value="">--- Pilih Tipe Kamar ---</option>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="family">Family</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="harga"
                    className="form-label text-sm font-medium text-gray-600"
                  >
                    Harga
                  </label>
                  <input
                    type="number"
                    id="harga"
                    name="harga"
                    value={formData.harga}
                    onChange={handleChange}
                    className="form-control mt-1"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="ketersediaan"
                    className="form-label text-sm font-medium text-gray-600"
                  >
                    Ketersediaan
                  </label>
                  {/* select */}
                  <select
                    id="ketersediaan"
                    name="ketersediaan"
                    value={formData.ketersediaan}
                    onChange={handleChange}
                    className="form-control mt-1"
                  >
                    <option value="">--- Pilih Ketersediaan ---</option>
                    <option value="1">Tersedia</option>
                    <option value="0">Tidak Tersedia</option>
                  </select>
                </div>

                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Tambah Data
                  </button>
                  <Link to="/manager/kamar" className="bg-slate-600 text-white px-4 py-2 rounded ml-3">
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

export default KamarAdd;
