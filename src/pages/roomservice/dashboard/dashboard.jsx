import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../../components/Menu/Navbar";
import SidebarRoomService from "../../../components/Menu/SidebarRoomService";

const RoomServiceDashboardPage = () => {
  const [pengunjungCount, setPengunjungCount] = useState(0);
  const [kamarCount, setKamarCount] = useState(0);
  const [karyawanCount, setKaryawanCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePengunjung = await axios.get('http://localhost:5285/api/Pengunjung');
        setPengunjungCount(responsePengunjung.data.data.length);

        const responseKamar = await axios.get('http://localhost:5285/api/Kamar');
        setKamarCount(responseKamar.data.data.length);

        const responseKaryawan = await axios.get('http://localhost:3000/getData');
        setKaryawanCount(responseKaryawan.data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <SidebarRoomService />
        <div className="ml-64 p-16 pt-0 w-full mt-28">
          <div className="bg-dark p-5 rounded-lg shadow">
            <div className="flex justify-between items-center mb-5 text-white">
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-lg">Welcome to your dashboard!</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-xl font-bold text-white">Total Pengunjung</h2>
                <p className="text-3xl font-bold text-yellow-500">{pengunjungCount}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-xl font-bold text-white">Total Kamar</h2>
                <p className="text-3xl font-bold text-green-500">{kamarCount}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-xl font-bold text-white">Total Karyawan</h2>
                <p className="text-3xl font-bold text-blue-500">{karyawanCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomServiceDashboardPage;
