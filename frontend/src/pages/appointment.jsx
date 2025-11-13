import { useState } from "react";
import { IMaskInput } from "react-imask";
import styled from "styled-components";

const AppointmentContainer = ({ className, addNewApplication }) => {
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setMessage("");

    const cleanPhone = phone.replace(/\D/g, "");
    if (!userName.trim()) {
      setMessageType("error");
      setMessage("Введите ваше имя");
      setIsSubmit(false);
      return;
    }
    if (cleanPhone.length !== 11) {
      setMessageType("error");
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
        credentials: "include",
        body: JSON.stringify({
          namePatient: userName,
          phone: phone,
          problem: problem,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        if (addNewApplication && result.data) {
          addNewApplication(result.data);
        }
        setUserName("");
        setPhone("");
        setProblem("");
        setMessageType("success");
        setMessage("Заявка отправлена");
      } else {
        setMessageType("error");
        setMessage("Заявка не отправлена, возникла ошибка");
      }
    } catch (error) {
      console.log(error);

      setMessageType("error");
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

      {message && <div className={`message ${messageType}`}>{message}</div>}
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
    font-size: 20px;
    text-align: center;
  }

  .message.error {
    color: red;
  }

  .message.success {
    color: green;
    font-size: 20px;
    text-align: center;
  }

  #problemInput {
    height: 150px;
  }
`;
