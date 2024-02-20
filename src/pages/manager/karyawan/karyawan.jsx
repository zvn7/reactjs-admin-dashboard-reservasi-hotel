import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Navbar from "../../../components/Menu/Navbar";
import Sidebar from "../../../components/Menu/Sidebar";

function KaryawanPage() {
  const [dataKaryawan, setDataKaryawan] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getData");
      const data = await response.data;
      setDataKaryawan(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteData = async (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:3000/deleteData/${id}`
        );
        fetchData();
        alert("Data berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Terjadi kesalahan saat menghapus data.");
      }
    }
  };

  const getRoleName = (role) => {
    switch (role) {
      case "manager":
        return "Manager";
      case "resepsionis":
        return "Resepsionis";
      case "room_service":
        return "Room Service";
      default:
        return "Unknown Role";
    }
  };

  const getJenisKelamin = (jenis_kelamin) => {
    switch (jenis_kelamin) {
      case "l":
        return "Laki - Laki";
      case "p":
        return "Perempuan";
      default:
        return "Unknown Role";
    }
  };

  const columns = [
    {
      name: "#",
      width: "60px",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Nama Lengkap",
      selector: "nama_lengkap",
      sortable: true,
    },
    {
      name: "Jenis Kelamin",
      selector: (row) => getJenisKelamin(row.jenis_kelamin),
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => getRoleName(row.role),
      sortable: true,
    },
    {
      name: "Username",
      selector: "username",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Aksi",
      width: "170px",
      cell: (row) => (
        <>
          <Link
            to={`/manager/karyawanedit/${row.id}`}
            className="btn btn-success me-2"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteData(row.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        background: "#131313",
      },
    },
    headCells: {
      style: {
        color: "#fff",
      },
    },
    rows: {
      style: {
        background: "#131313",
        color: "#fff",
      },
    },
    pagination: {
      style: {
        background: "#131313",
        color: "#fff",
      },
      pageButtonsStyle: {
        background: "#131313",
        color: "#fff",
      },
    },
  };

  const filteredDataKaryawan = dataKaryawan.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="ml-64 p-16 pt-0 w-full mt-28">
          <div className="bg-dark p-5 rounded-lg shadow">
            <div className="flex justify-between items-center mb-5 text-white">
              <h1 className="text-2xl font-bold text-white">Data Karyawan</h1>
              <Link to="/manager/karyawanadd" className="btn btn-primary">
                Tambah Data
              </Link>
            </div>
            <div className="flex justify-end mb-4">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchText(e.target.value)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-300"
              />
            </div>
            <DataTable
              columns={columns}
              data={filteredDataKaryawan}
              pagination
              responsive
              customStyles={customStyles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default KaryawanPage;
