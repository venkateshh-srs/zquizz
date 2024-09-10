import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
// import { url } from "../constants";
const url = process.env.BACKEND_URL;
function UserLogin() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(true);
  const [displayLoader, setDisplayLoader] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { quizId } = useParams();

  const handleEmailChange = (e) => {
    setEmail(() => e.target.value);
  };
  const handleUserNameChange = (e) => {
    setUserName(() => e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setDisplayLoader(true);
    const data = {
      email,
      userName,
    };
    try {
      const response = await axios.post(url + "/user/quiz/" + quizId, data);
      // console.log(response);
      setDisplayError(() => false);
      navigate("/user/quiz/" + quizId, { replace: true });
    } catch (error) {
      setError(error.response?.data?.message);
      setDisplayError(true);
    } finally {
      setDisplayLoader(false);
    }
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
        <TextField
          sx={{ width: "28.6ch" }}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={userName}
          onChange={handleUserNameChange}
        />

        <div className="submit-buttons">
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

export default UserLogin;
