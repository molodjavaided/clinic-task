import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useCallback, useState } from "react";
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

  const loadingData = useCallback(async () => {
    try {
      const response = await fetch("/api/names", {
        credentials: "include",
      });

      if (response.status === 401) {
        return { success: false, unauthorized: true };
      }

      if (!response.ok) {
        return { success: false, error: "Не удалось получить заявки" };
      }

      const data = await response.json();
      setApplications(data);

      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, error: "Ошибка при получении данных" };
    }
  }, []);

  const addNewApplication = useCallback((newApplication) => {
    setApplications((prev) => [newApplication, ...prev]);
  }, []);

  return (
    <AppColumn>
      <Header />
      <Page>
        <Routes>
          <Route
            path="/"
            element={<Appointment addNewApplication={addNewApplication} />}
          />

          <Route
            path="/table"
            element={
              <Table applications={applications} loadingData={loadingData} />
            }
          />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </Page>
    </AppColumn>
  );
}

export default App;
