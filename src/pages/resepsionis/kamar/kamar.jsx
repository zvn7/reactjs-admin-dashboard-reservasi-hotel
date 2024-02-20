import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Navbar from "../../../components/Menu/Navbar";
import SidebarResepsionis from "../../../components/Menu/SidebarResepsionis";

function ResepsionisKamarPage() {
  const [kamar, setKamar] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://2dw5vdj7-5285.asse.devtunnels.ms/api/Kamar"
      );
      const data = response.data.data;
      setKamar(data);
      console.log(data);
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
        await axios.delete(`http://localhost:5285/api/Kamar/${id}`);
        fetchData();
        alert("Data berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Terjadi kesalahan saat menghapus data.");
      }
    }
  };

  const getTipeKamar = (tipe_kamar) => {
    switch (tipe_kamar) {
      case "single":
        return "Single";
      case "double":
        return "Double";
      case "family":
        return "Family";
      default:
        return "Unknown Role";
    }
  };

  const getKetersediaan = (ketersediaan) => {
    switch (ketersediaan) {
      case 1:
        return "Tersedia";
      case 0:
        return "Tidak Tersedia";
      default:
        return "Unknown Role";
    }
  };

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
      width: "50px",
      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "Nomor Kamar",
      selector: (row) => row.nomor_kamar,
      sortable: true,
    },
    {
      name: "Tipe Kamar",
      selector: (row) => getTipeKamar(row.tipe_kamar),
      sortable: true,
    },
    {
      name: "Harga",
      selector: (row) => row.harga,
      sortable: true,
      cell: (row) => (
        <div style={{ textAlign: "right" }}>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(row.harga)}
        </div>
      ),
    },
    {
      name: "Ketersediaan",
      selector: (row) => getKetersediaan(row.ketersediaan),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/resepsionis/kamaredit/${row.id}`} className="btn btn-success">
            Edit
          </Link>
          <button onClick={() => deleteData(row.id)} className="btn btn-danger">
            Delete
          </button>
        </div>
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

  const filteredKamar = kamar.filter((item) =>
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
              <h1 className="text-2xl font-bold text-white">Data Kamar</h1>
              <Link to="/resepsionis/kamaradd" className="btn btn-primary">
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
              data={filteredKamar}
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

export default ResepsionisKamarPage;
