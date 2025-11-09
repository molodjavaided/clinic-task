import { formatCreatedAt } from "../utils";
import styled from "styled-components";

const TableContainer = ({ className, applications }) => {
  return (
    <div className={className}>
      <h2>Заявки формы</h2>
      <table>
        <thead>
          <tr>
            <th>Дата отправки</th>
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
    </div>
  );
};

export const Table = styled(TableContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;

  table {
    width: 100%;
  }

  td {
    text-align: center;
    width: 150px;
  }
`;
