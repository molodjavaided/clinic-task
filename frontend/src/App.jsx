import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { Appointment, Auth, Table } from "./pages";
import { Header } from "./components/header";
import styled from "styled-components";

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  max-width: 1440px;
  min-height: 100%;
  background-color: #fff;
`;

const Page = styled.div`
  padding: 120px 0 20px;
`;

function App() {
  const [applications, setApplications] = useState([]);

  const loadingData = async () => {
    try {
      const response = await fetch("/api/names");
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadingData();
  }, []);

  return (
    <AppColumn>
      <Header />
      <Page>
        <Routes>
          <Route path="/" element={<Appointment loadingData={loadingData} />} />

          <Route
            path="/table"
            element={<Table applications={applications} />}
          />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </Page>
    </AppColumn>
  );
}

export default App;
