import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import { url } from "../constants";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(true);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  // useEffect(() => {
  //   setTimeout(() => {
  //     //wont reload, just renders(SPA) and thr eplace options clears the login page in navigation history so that user cant navigate back to login page after login
  //     navigate("/admin/login", { replace: true });
  //   }, 2000);
  // }, []);
  const handleEmailChange = (e) => {
    setEmail(() => e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(() => e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setDisplayLoader(true);
    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post(url + "/admin/login", data);
      // console.log(response);

      setDisplayError(() => false);
      navigate("/admin/create-quiz", { replace: true });
    } catch (error) {
      // console.log(error);

      setError(error.response.data.message);
      setDisplayError(true);
    } finally {
      setDisplayLoader(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="signup-container">
        {displayError && (
          <Alert severity="error" onClose={() => setDisplayError(false)}>
            {error}
          </Alert>
        )}
        {displaySuccess && location.state?.success && (
          <Alert severity="success" onClose={() => setDisplaySuccess(false)}>
            Registered successfully
          </Alert>
        )}

        <TextField
          sx={{ width: "28.6ch" }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
        />
        <FormControl sx={{ width: "28.6ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <div className="submit-buttons">
          <Link to="/admin/signup">
            <Button
              sx={{ width: "13.6ch", padding: "12px" }}
              variant="outlined"
            >
              Signup
            </Button>
          </Link>
          {!displayLoader ? (
            <Button
              sx={{ width: "13.6ch", padding: "12px" }}
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          ) : (
            <CircularProgress size={42} />
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
