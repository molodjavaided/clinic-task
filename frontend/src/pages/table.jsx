import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCreatedAt } from "../utils";
import styled from "styled-components";

const TableContainer = ({ className, applications, loadingData }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchApplications = async () => {
      setIsLoading(true);
      const result = await loadingData();

      if (!isMounted) {
        return;
      }

      if (!result.success) {
        if (result.unauthorized) {
          navigate("/login");
        } else if (result.error) {
          setError(result.error);
        } else {
          setError("Не удалось загрузить заявки");
        }
      } else {
        setError("");
      }
      setIsLoading(false);
    };

    fetchApplications();

    return () => {
      isMounted = false;
    };
  }, [loadingData, navigate]);

  if (isLoading) {
    return (
      <div className={className}>
        <div className="loading">Загрузка</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2>Заявки формы</h2>

      {error && <div className="message error">{error}</div>}

      {!error && applications.length === 0 && (
        <div className="message">Заявок пока нет</div>
      )}

      {!error && applications.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Дата и время отправки</th>
              <th>ФИО</th>
              <th>Телефон</th>
              <th>Проблема</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((data) => (
              <tr key={data._id}>
                <td>{formatCreatedAt(data.createdAt)}</td>
                <td>{data.namePatient}</td>
                <td>{data.phone}</td>
                <td>{data.problem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export const Table = styled(TableContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    text-align: center;
    width: 150px;
    padding: 10px;
    border: 1px solid #000;
  }

  .message {
    font-size: 18px;
    text-align: center;
  }

  .message.error {
    color: red;
  }

  .loading {
    font-size: 18px;
    text-align: center;
    margin: 20px 0;
  }
`;
