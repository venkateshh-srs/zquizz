//mui imports
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

import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../constants";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(() => e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(() => e.target.value);
  };
  const handleNameChange = (e) => {
    setName(() => e.target.value);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setDisplayLoader(true);
    // console.log("suiiii");

    const userDetails = {
      email,
      password,
      name,
    };
    try {
      const response = await axios.post(url + "/admin/signup", userDetails);
      // console.log(response.data);
      const data = {
        success: true,
      };
      setDisplayError(() => false);
      navigate("/admin/login", { state: data, replace: true });
    } catch (error) {
      // console.log(error);

      setDisplayError(() => true);
      setError(error.response?.data?.message);
      // console.log(error.data.message);
    } finally {
      setDisplayLoader(false);
    }
  };
  // const handleLogin = (e) => {};

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  //loader
  //add jwt
  //client side verification

  return (
    <>
      <div className="signup-container">
        {displayError && (
          <Alert severity="error" onClose={() => setDisplayError(false)}>
            {error}
          </Alert>
        )}
        <TextField
          sx={{ width: "28.6ch" }}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={name}
          onChange={handleNameChange}

          // required
          // helperText={emailError ? "Email is required" : ""}
          // error={emailError}
        />
        <TextField
          sx={{ width: "28.6ch" }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          // required
          // helperText={emailError ? "Email is required" : ""}
          // error={emailError}
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
            // helperText={passwordError ? "Password is required" : ""}
            // error={passwordError}
          />
        </FormControl>
        <div className="submit-buttons">
          <Link to="/admin/login">
            <Button
              sx={{ width: "13.6ch", padding: "12px" }}
              variant="outlined"
            >
              Login
            </Button>
          </Link>

          {!displayLoader ? (
            <Button
              sx={{ width: "13.6ch", padding: "12px" }}
              variant="contained"
              color="primary"
              onClick={handleSignup}
            >
              Signup
            </Button>
          ) : (
            <CircularProgress size={42} />
          )}
        </div>
      </div>
    </>
  );
}

export default Signup;
