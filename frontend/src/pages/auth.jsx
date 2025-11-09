import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AuthContainer = ({ className }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);

        setEmail("");
        setPassword("");

        navigate("/");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Ошибка сети");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="emailInput">Email</label>
          <input
            type="email"
            className="input-form"
            id="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="passwordInput">Пароль</label>
          <input
            type="password"
            className="input-form"
            id="passwordInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {message && <div className="message">{message}</div>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Идет вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
};

export const Auth = styled(AuthContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
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
`;
