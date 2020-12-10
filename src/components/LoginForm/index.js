import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../requests";

import { NewTypography, NewTextField, OuterDiv, StyledButton } from "./styles";
import axios from "axios";
const baseURL = "https://kenziehub.me";

const LoginForm = ({ setAuthentication }) => {
  const history = useHistory();
  const [message, setMessage] = useState("");

  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    errors,
    setError,
  } = useForm();

  useEffect(() => {
    register("email", { required: "O email está em branco" });
    register("password", { required: "A senha está em branco" });
    return () => {
      unregister("email");
      unregister("passoword");
    };
  }, [register, unregister]);

  const handleLogin = async (data) => {
    const resLogin = await login(data);
    setMessage(resLogin);
    history.push("/devs");
  };

  return (
    <OuterDiv>
      <NewTypography variant="h3">Login</NewTypography>
      {message}
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <NewTextField
            variant="outlined"
            margin="normal"
            size="medium"
            label="Usuário"
            name="email"
            inputRef={register}
            onChange={(e) => setValue("email", e.target.value)}
          />
          {errors.user && (
            <p style={{ color: "red" }}> {errors.user.message} </p>
          )}
        </div>
        <div>
          <NewTextField
            margin="normal"
            variant="outlined"
            size="medium"
            label="Senha"
            name="password"
            inputRef={register}
            onChange={(e) => setValue("password", e.target.value)}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <StyledButton color="primary" variant="contained" type="submit">
          {" "}
          Entrar
        </StyledButton>
      </form>
    </OuterDiv>
  );
};

export default LoginForm;