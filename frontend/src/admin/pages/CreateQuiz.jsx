import { isAuthenticated } from "../constants";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import QuestionTemplate from "../components/QuestionTemplate.jsx";

function CreateQuiz() {
  const [loading, setLoading] = useState(true);
  const [savedQuestions, setSavedQuestions] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const isUserAuthenticated = async () => {
      const res = await isAuthenticated();
      if (res) {
        setLoading(false);
        setSavedQuestions(res.questions);
        setTitle(res.title);
      } else navigate("/admin/login");
    };
    isUserAuthenticated();
  }, []);
  if (loading) return <>Loading...</>;
  return (
    <>
      <Box>
        <Navbar questions={savedQuestions} title={title} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <QuestionTemplate
          questions={savedQuestions}
          setQuestions={setSavedQuestions}
          title={title}
          setTitle={setTitle}
        />
      </Box>
    </>
  );
}

export default CreateQuiz;
