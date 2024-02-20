import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Navbar from "../../../components/Menu/Navbar";
import SidebarResepsionis from "../../../components/Menu/SidebarResepsionis";

function ResepsionisPengunjungPage() {
  const [pengunjung, setPengunjung] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5285/api/Pengunjung"
      );
      const data = response.data.data;
      setPengunjung(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, show alert or log it
    }
  };

  const deleteData = async (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:5285/api/Pengunjung/${id}`
        );
        fetchData();
        alert("Data berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Terjadi kesalahan saat menghapus data.");
      }
    }
  };

  const columns = [
    {
      name: "#",
      width: "70px",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Nama",
      selector: "nama",
      sortable: true,
    },
    {
      name: "Alamat",
      selector: "alamat",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Telepon",
      selector: "telepon",
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <>
          <Link
            to={`/resepsionis/pengunjungedit/${row.id}`}
            className="btn btn-success me-2"
          >
            Edit
          </Link>
          <button onClick={() => deleteData(row.id)} className="btn btn-danger">
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

  const filteredPengunjung = pengunjung.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div>
      <Navbar />
      <div className="flex">
        <SidebarResepsionis />
        <div className="ml-64 p-16 pt-0 w-full mt-28">
          <div className="bg-dark p-5 rounded-lg shadow">
            <div className="flex justify-between items-center mb-5 text-white">
              <h1 className="text-2xl font-bold text-white">Data Pengunjung</h1>
              <Link to="/resepsionis/pengunjungadd" className="btn btn-primary">
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
              data={filteredPengunjung}
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

export default ResepsionisPengunjungPage;
