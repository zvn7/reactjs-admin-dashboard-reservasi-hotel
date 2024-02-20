import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedComponent from "./ProtectedComponent";
import LoginPage from "./pages/login";
import PengunjungPage from "./pages/manager/pengunjung/pengunjung";
import PengunjungAdd from "./pages/manager/pengunjung/pengunjungadd";
import PengunjungEdit from "./pages/manager/pengunjung/pengunjungedit";
import KamarPage from "./pages/manager/kamar/kamar";
import KamarAdd from "./pages/manager/kamar/kamaradd";
import KamarEdit from "./pages/manager/kamar/kamaredit";
import KaryawanPage from "./pages/manager/karyawan/karyawan";
import KaryawanAdd from "./pages/manager/karyawan/karyawanadd";
import KaryawanEdit from "./pages/manager/karyawan/karyawanedit";
import ResepsionisKamarPage from "./pages/resepsionis/kamar/kamar";
import ResepsionisKamarAdd from "./pages/resepsionis/kamar/kamaradd";
import ResepsionisKamarEdit from "./pages/resepsionis/kamar/kamaredit";
import ResepsionisPengunjungPage from "./pages/resepsionis/pengunjung/pengunjung";
import ResepsionisPengunjungAdd from "./pages/resepsionis/pengunjung/pengunjungadd";
import ResepsionisPengunjungEdit from "./pages/resepsionis/pengunjung/pengunjungedit";
import RoomServiceKamarPage from "./pages/roomservice/kamar/kamar";
// import RoomServiceKamarAdd from "./pages/roomservice/kamar/kamaradd";
// import RoomServiceKamarEdit from "./pages/roomservice/kamar/kamaredit";
import ManagerDashboardPage from "./pages/manager/dashboard/dashboard";
import ResepsionisDashboardPage from "./pages/resepsionis/dashboard/dashboard";
import RoomServiceDashboardPage from "./pages/roomservice/dashboard/dashboard";

function App() {
  return (
    <Router basepath="./my-app">
      <div className="app-content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* manager */}
          <Route
            path="/manager/dashboard"
            element={
              <ProtectedComponent>
                <ManagerDashboardPage />
              </ProtectedComponent>
            }
          />
          <Route
            path="/manager/pengunjung"
            element={
              <ProtectedComponent>
                <PengunjungPage />
              </ProtectedComponent>
            }
          />
          <Route
            path="/manager/pengunjungadd"
            element={
              <ProtectedComponent>
                <PengunjungAdd />
              </ProtectedComponent>
            }
          />
          <Route
            path="/manager/pengunjungedit/:id"
            element={
              <ProtectedComponent>
                <PengunjungEdit />
              </ProtectedComponent>
            }
          />
          <Route
            path="/manager/kamar"
            element={
              <ProtectedComponent>
                <KamarPage />
              </ProtectedComponent>
            }
          />
          <Route
            path="/manager/kamaradd"
            element={
              <ProtectedComponent>
                <KamarAdd />
              </ProtectedComponent>
            }
          />
          <Route
            path="/manager/kamaredit/:id"
            element={
              <ProtectedComponent>
                <KamarEdit />
              </ProtectedComponent>
            }
          />
          <Route
            path="/manager/karyawan"
            element={
              <ProtectedComponent>
                <KaryawanPage />
              </ProtectedComponent>
            }
          />
          <Route
            path="/manager/karyawanadd"
            element={
              <ProtectedComponent>
                <KaryawanAdd />
              </ProtectedComponent>
            }
          />
          <Route
            path="/manager/karyawanedit/:id"
            element={
              <ProtectedComponent>
                <KaryawanEdit />
              </ProtectedComponent>
            }
          />
          {/* resepsionis */}
          <Route
            path="/resepsionis/dashboard"
            element={
              <ProtectedComponent>
                <ResepsionisDashboardPage />
              </ProtectedComponent>
            }
          />
          <Route
            path="/resepsionis/kamar"
            element={
              <ProtectedComponent>
                <ResepsionisKamarPage />
              </ProtectedComponent>
            }
          />
          <Route
            path="/resepsionis/kamaradd"
            element={
              <ProtectedComponent>
                <ResepsionisKamarAdd />
              </ProtectedComponent>
            }
          />
          <Route
            path="/resepsionis/kamaredit/:id"
            element={
              <ProtectedComponent>
                <ResepsionisKamarEdit />
              </ProtectedComponent>
            }
          />
          <Route
            path="/resepsionis/pengunjung"
            element={
              <ProtectedComponent>
                <ResepsionisPengunjungPage />
              </ProtectedComponent>
            }
          />
          <Route
            path="/resepsionis/pengunjungadd"
            element={
              <ProtectedComponent>
                <ResepsionisPengunjungAdd />
              </ProtectedComponent>
            }
          />
          <Route
            path="/resepsionis/pengunjungedit/:id"
            element={
              <ProtectedComponent>
                <ResepsionisPengunjungEdit />
              </ProtectedComponent>
            }
          />
          {/* room service */}
          <Route
            path="/roomservice/dashboard"
            element={
              <ProtectedComponent>
                <RoomServiceDashboardPage />
              </ProtectedComponent>
            }
          />
          <Route
            path="/roomservice/kamar"
            element={
              <ProtectedComponent>
                <RoomServiceKamarPage />
              </ProtectedComponent>
            }
          />
          {/* <Route
            path="/roomservice/kamaradd"
            element={
              <ProtectedComponent>
                <RoomServiceKamarAdd />
              </ProtectedComponent>
            }
          />
          <Route
            path="/roomservice/kamaredit/:id"
            element={
              <ProtectedComponent>
                <RoomServiceKamarEdit />
              </ProtectedComponent>
            }
          /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
