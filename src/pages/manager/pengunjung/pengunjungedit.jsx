import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../../components/Menu/Navbar";
import Sidebar from "../../../components/Menu/Sidebar";

function PengunjungEdit() {
  const { id } = useParams();

  const [formValue, setFormValue] = useState({
    id: "",
    nama: "",
    alamat: "",
    email: "",
    telepon: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5285/api/Pengunjung/GetPengunjungById?id=${id}`
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
      nama: formValue.nama,
      alamat: formValue.alamat,
      email: formValue.email,
      telepon: formValue.telepon,
    };

    alert("Data berhasil diubah");

    try {
      await axios.put(
        `http://localhost:5285/api/Pengunjung/${id}`,
        formDataInput
      );

      // Redirect to the Pengunjung page after successful data update
      window.location.href = "/manager/pengunjung";
    } catch (error) {
      console.error("Error updating data:", error);
      alert(error);
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
              <p className="text-lg">Edit Data Pengunjung</p>
            </div>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium text-gray-600"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formValue.nama}
                  onChange={changeHandler}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="alamat"
                  className="block text-sm font-medium text-gray-600"
                >
                  Alamat
                </label>
                <input
                  type="text"
                  id="alamat"
                  name="alamat"
                  value={formValue.alamat}
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
                  htmlFor="telepon"
                  className="block text-sm font-medium text-gray-600"
                >
                  Telepon
                </label>
                <input
                  type="tel"
                  id="telepon"
                  name="telepon"
                  value={formValue.telepon}
                  onChange={changeHandler}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit Data
                </button>
                <Link
                  to="/pengunjung"
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

export default PengunjungEdit;
