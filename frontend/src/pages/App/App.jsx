import { useContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { getUser } from "../../services/authService";
import HomePage from "../HomePage/HomePage";
import HootListPage from "../HootListPage/HootListPage";
import NewHootFormPage from "../NewHootFormPage/NewHootFormPage";
import HootDetailsPage from "../HootDetailsPage/HootDetailsPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import LogInPage from "../LogInPage/LogInPage";
import NavBar from "../../components/NavBar/NavBar";
import * as hootService from "../../services/hootService";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();

      // console log to verify
      setHoots(hootsData);
      console.log("hootsData:", hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);

  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots([newHoot, ...hoots]);
    console.log("hootFormData", hootFormData);
    navigate("/hoots");
  };

  return (
    <main className="App">
      <section id="main-section">
        <NavBar user={user} setUser={setUser} />
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hoots" element={<HootListPage hoots={hoots} />} />
            <Route
              path="/hoots/:hootId"
              element={<HootDetailsPage hoots={hoots} />}
            />
            <Route
              path="/hoots/new"
              element={<NewHootFormPage handleAddHoot={handleAddHoot} />}
            />
            <Route path="*" element={null} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="*" element={null} />
          </Routes>
        )}
      </section>
    </main>
  );
}
