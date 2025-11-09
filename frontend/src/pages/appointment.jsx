import { useState } from "react";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AppointmentContainer = ({ loadingData, className }) => {
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 11) {
      setMessage("Введите корректный номер");
      setIsSubmit(false);
      return;
    }

    try {
      const response = await fetch("/api/name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          namePatient: userName,
          phone: phone,
          problem: problem,
        }),
      });

      if (response.ok) {
        setUserName("");
        setPhone("");
        setProblem("");
        setMessage("Заявка отправленна");

        await loadingData();
        navigate("/table");
      } else {
        setMessage("Заявка не отправлена, возникла ошибка");
      }
    } catch (error) {
      console.log(error);

      setMessage("Заявка не отправлена, возникла ошибка");
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div className={className}>
      <h1>Запись на прием к врачу</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nameInput">ФИО</label>
          <input
            type="text"
            className="input-form"
            id="nameInput"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="phoneInput">Номер телефон</label>
          <IMaskInput
            mask="+7 (000) 000-00-00"
            definitions={{ 0: /[0-9]/ }}
            radix="."
            value={phone}
            onAccept={(value) => setPhone(value)}
            className="input-form"
            id="phoneInput"
            placeholder="+7 (000) 000-00-00"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="problemInput">Опишите проблему</label>
          <input
            type="text"
            className="input-form"
            id="problemInput"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
        </div>

        <button
          className="button button-submit"
          type="submit"
          disabled={isSubmit}
        >
          {isSubmit ? "Отправляем заявку" : "Отправить"}
        </button>
      </form>

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export const Appointment = styled(AppointmentContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }

  .input-group {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  }

  input {
    width: 300px;
    border-radius: 10px;
    border: 1px solid black;
    padding: 5px 10px;
  }

  .message {
    color: red;
    font-size: 20px;
    text-align: center;
  }

  #problemInput {
    height: 150px;
  }
`;
