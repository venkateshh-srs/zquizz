import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const url = process.env.BACKEND_URL;

function Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [userDetails, setUserDetails] = useState({ userName: "", email: "" });
  const [title, setTitle] = useState("");
  const { quizId } = useParams();
  const navigate = useNavigate();

  const handleAnswerChange = (questionIndex, answerIndex) => {
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] =
        newAnswers[questionIndex] === answerIndex ? null : answerIndex;
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    console.log("submitting");

    try {
      const res = await axios.post(
        url + "/user/submit/" + quizId,
        selectedAnswers
      );
      console.log(res.data.selectedOptions);
      console.log(res.data.correctOptions);

      navigate("/user/result/" + quizId, {
        state: {
          score: res.data.score,
          questions,
          selectedOptions: res.data.selectedOptions,
          correctOptions: res.data.correctOptions,
        },
        replace: true,
      });
    } catch (error) {
      // Handle submission error, e.g., navigate to login page
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(url + "/user/quiz/" + quizId);
        const questions = response.data.message;
        const title = response.data.title;
        setSelectedAnswers(Array(questions.length).fill(null));
        setLoading(false);
        setQuestions(questions);
        setTitle(title);
      } catch (error) {
        // Handle error, e.g., navigate to login page
      }
    }
    getData();
  }, [quizId, navigate]);

  if (loading) return <>Loading..</>;

  return (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", maxWidth: "800px", margin: "2rem auto" }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        {title}
      </Typography>

      <Divider sx={{ marginBottom: "2rem" }} />

      <MathJaxContext
        config={{
          loader: { load: ["input/tex", "input/mml", "output/chtml"] }, // Load both LaTeX and MathML
          tex: {
            inlineMath: [
              ["$", "$"],
              ["\\(", "\\)"],
            ],
            displayMath: [
              ["$$", "$$"],
              ["\\[", "\\]"],
            ],
          },
        }}
      >
        <FormControl component="fieldset">
          {questions.map((q, qInd) => (
            <Box key={qInd} mb={4}>
              <FormLabel
                sx={{
                  marginBottom: "1rem",
                  fontWeight: "bold",
                  wordBreak: "break-word",
                }}
              >
                {qInd + 1}.{"  "}
                <MathJax inline dynamic>
                  <div
                    style={{ display: "inline" }}
                    dangerouslySetInnerHTML={{ __html: q.question }}
                  />
                </MathJax>
              </FormLabel>
              <RadioGroup
                value={selectedAnswers[qInd]}
                onChange={(event) =>
                  handleAnswerChange(qInd, parseInt(event.target.value))
                }
              >
                {q.options.map((o, oInd) => (
                  <FormControlLabel
                    sx={{
                      wordBreak: "break-word",
                    }}
                    key={oInd}
                    value={oInd}
                    control={<Radio />}
                    label={
                      <MathJax inline dynamic>
                        <div dangerouslySetInnerHTML={{ __html: o }} />
                      </MathJax>
                    }
                  />
                ))}
              </RadioGroup>
            </Box>
          ))}
          <Divider sx={{ margin: "2rem 0" }} />
        </FormControl>
      </MathJaxContext>
      <div style={{ textAlign: "center" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Quiz
        </Button>
      </div>
    </Paper>
  );
}

export default Quiz;
