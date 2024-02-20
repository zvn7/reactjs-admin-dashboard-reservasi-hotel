import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../../components/Menu/Navbar";
import SidebarResepsionis from "../../../components/Menu/SidebarResepsionis";

function ResepsionisKamarEdit() {
  const { id } = useParams();

  const [formValue, setFormValue] = useState({
    nomor_kamar: "",
    tipe_kamar: "",
    harga: "",
    ketersediaan: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5285/api/Kamar/GetKamarById?id=${id}`
      );
      const data = response.data.data;
      setFormValue(data || {});
      console.log(data);
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

    const formDataInput = {
      id: formValue.id,
      nomor_kamar: formValue.nomor_kamar,
      tipe_kamar: formValue.tipe_kamar,
      harga: formValue.harga,
      ketersediaan: formValue.ketersediaan,
    };

    alert("Data berhasil diubah");

    try {
      await axios.put(
        `http://localhost:5285/api/Kamar/${id}`,
        formDataInput
      );

      // Redirect to the Pengunjung page after successful data update
      window.location.href = "/resepsionis/kamar";
    } catch (error) {
      console.error("Error updating data:", error);
      alert(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <SidebarResepsionis />
        <div className="ml-64 p-16 pt-0 w-full mt-28">
          <div className="bg-dark p-5 rounded-lg shadow text-white">
            <div className="flex justify-between items-center mb-5 text-white">
              <h1 className="text-2xl font-bold text-white">Kamar</h1>
              <p className="text-lg">Edit Data Kamar</p>
            </div>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label
                  htmlFor="nomor_kamar"
                  className="block text-sm font-medium text-gray-600"
                >
                  Nomor Kamar
                </label>
                <input
                  type="text"
                  id="nomor_kamar"
                  name="nomor_kamar"
                  value={formValue.nomor_kamar}
                  onChange={changeHandler}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              {/* select option */}
              <div className="mb-4">
                <label
                  htmlFor="tipe_kamar"
                  className="block text-sm font-medium text-gray-600"
                >
                  Tipe Kamar
                </label>
                <select
                  id="tipe_kamar"
                  name="tipe_kamar"
                  value={formValue.tipe_kamar}
                  onChange={changeHandler}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="">Pilih Tipe Kamar</option>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="family">Family</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="harga"
                  className="block text-sm font-medium text-gray-600"
                >
                  Harga
                </label>
                <input
                  type="text"
                  id="harga"
                  name="harga"
                  value={formValue.harga}
                  onChange={changeHandler}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="ketersediaan"
                  className="block text-sm font-medium text-gray-600"
                >
                  Ketersediaan
                </label>
                {/* select option */}
                <select
                  id="ketersediaan"
                  name="ketersediaan"
                  value={formValue.ketersediaan}
                  onChange={changeHandler}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="">Pilih Ketersediaan</option>
                  <option value="1">Tersedia</option>
                  <option value="0">Tidak Tersedia</option>
                </select>
              </div>

              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit Data
                </button>
                <Link
                  to="/resepsionis/kamar"
                  className="bg-slate-600 text-white px-4 py-2 rounded ml-3"
                >
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

export default ResepsionisKamarEdit;
