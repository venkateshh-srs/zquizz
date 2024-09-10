import { useState, useRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import { betterFunction } from "../constants";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Box, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function QuestionTemplate({ questions, setQuestions, title, setTitle }) {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function handleTitleChange(e) {
    const newTitle = e.target.value;
    setTitle(() => {
      betterFunction(questions, newTitle);
      return newTitle;
    });
  }
  function handleQuestionChange(qInd, e) {
    setQuestions((prev) => {
      const questions = [...prev];
      questions[qInd].question = e.target.value;
      betterFunction(questions, title);

      return questions;
    });
  }
  function handleDeleteQuestion(qInd) {
    setOpen(true);
    setSnackbarMessage(`Qustion ${qInd + 1} deleted`);
    setQuestions((prev) => {
      const questions = [...prev];
      const updatedQuestions = questions.filter((q, ind) => {
        return ind !== qInd;
      });
      // console.log(questions);
      // autoSave(updatedQuestions, 100);
      return updatedQuestions;
    });
    //why if i call debounce here not updating properly(not deleting the question, prev questions state is only coming)
    // debounce(updatedQuestions, 100);
  }
  function handleAddQuestion() {
    setOpen(true);
    setQuestions((prev) => {
      const newQuestions = [...prev];
      newQuestions.push({ question: "", options: [""], correctOption: 0 });
      return newQuestions;
    });
    //why +1
    //how to decouple ,while decoling child->parent or parent->child
    //why not to put component in this function for invcating child with props

    setSnackbarMessage(() => `Question ${questions.length + 1} added`);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  function handleAddOption(qInd) {
    // const newQuestions = [...questions];
    // newQuestions[qInd].options.push("");
    // setQuestions(newQuestions);

    // setQuestions((oldQuestions) => {
    //   //Never directly mutate the state
    //   //react cant find the diff bcoz, prev and curr referes to same address of "questions"
    //   oldQuestions[qInd].options.push("");
    //   return oldQuestions;
    // });
    setQuestions((oldQuestions) => {
      //  const updatedQuestions = oldQuestions //"updated questions" refers to same address
      // console.log(oldQuestions);

      const updatedQuestions = [...oldQuestions]; //new address will be created
      updatedQuestions[qInd].options.push("");
      // console.log(updatedQuestions);

      return updatedQuestions;
    });
  }
  function handleDeleteOption(qInd, oInd) {
    setQuestions((oldQuestions) => {
      const updatedQuestions = [...oldQuestions];
      const updatedOptions = updatedQuestions[qInd].options.filter((o, ind) => {
        // console.log(ind, oInd);
        return ind !== oInd;
      });

      updatedQuestions[qInd].options = updatedOptions;
      return updatedQuestions;
    });
  }
  function handleOptionChange(qInd, oInd, e) {
    setQuestions((oldQuestions) => {
      const updatedQuestions = [...oldQuestions];
      updatedQuestions[qInd].options[oInd] = e.target.value;
      betterFunction(updatedQuestions, title);
      return updatedQuestions;
    });
  }
  function handleCorrectOptionChange(qInd, e) {
    setQuestions((oldQuestions) => {
      const updatedQuestions = [...oldQuestions];
      updatedQuestions[qInd].correctOption = e.target.value;
      // console.log(updatedQuestions[qInd].correctOption);
      betterFunction(updatedQuestions, title);
      return updatedQuestions;
    });
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          border: "1px solid GREY",

          mt: "6rem",
          // position: "fixed",
          // zIndex: 1,
        }}
      >
        <h1>Create Quiz</h1>
      </Box>

      <Box
        sx={{
          position: "absolute",
          mt: "11rem",
          borderRadius: "8px",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <TextField
            sx={{ width: "21rem" }}
            id="standard-basic"
            label="Title"
            variant="standard"
            placeholder="Enter title of your quiz"
            value={title}
            onChange={handleTitleChange}
          />
        </Box>
        {questions.map((q, qInd) => (
          <>
            <Box
              key={qInd}
              sx={{
                border: "1px solid grey",
                borderRadius: "8px",
                // position: "absolute",
                // top: "5rem",
                display: "flex",
                flexDirection: "column",
                flexShrink: 1,
                mb: 3,

                padding: "3rem",
                pb: 3,
                "&:hover .delete-icon-question": { visibility: "visible" },
                "@media (max-width: 550px)": {
                  padding: "0rem",
                  pb: "1rem",
                },
              }}
            >
              <TextField
                label={`Question ${qInd + 1}`}
                multiline
                maxRows={5}
                variant="standard"
                sx={{ width: "400px", mb: 2 }}
                onChange={() => handleQuestionChange(qInd, event)}
                value={q.question}
              />
              {q.options.map((o, oInd) => (
                <>
                  <Box
                    key={oInd}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      "&:hover .delete-icon-option": { visibility: "visible" },
                    }}
                  >
                    <TextField
                      label={`Option ${oInd + 1}`}
                      variant="outlined"
                      onChange={() => handleOptionChange(qInd, oInd, event)}
                      value={q.options[oInd]}
                    />
                    <IconButton
                      className="delete-icon delete-icon-option"
                      onClick={() => handleDeleteOption(qInd, oInd)}
                      sx={{ visibility: "hidden" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </>
              ))}
              <Box
                sx={{
                  // border: "1px solid green",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                  "&:hover.delete-icon-question": { visibility: "visible" },
                }}
              >
                <Button
                  onClick={() => handleAddOption(qInd)}
                  variant="outlined"
                  sx={{ marginBottom: "40px" }}
                >
                  Add Option
                </Button>
              </Box>
              <Box
                sx={{
                  // border: "1px solid green",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                  "&:hover.delete-icon-question": { visibility: "visible" },
                }}
              >
                <FormControl sx={{ width: "10rem" }}>
                  <InputLabel>Correct option</InputLabel>
                  <Select
                    value={q.correctOption}
                    onChange={(e) => handleCorrectOptionChange(qInd, e)}
                  >
                    {q.options.map((o, oInd) => {
                      return (
                        <MenuItem key={oInd} value={oInd}>
                          {o || `Option ${oInd + 1}`}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <IconButton
                  className="delete-icon delete-icon-question"
                  onClick={() => handleDeleteQuestion(qInd)}
                  sx={{ visibility: "hidden", color: "red" }}
                  // onClick={handleClick({ vertical: "bottom", horizontal: "left" })}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </>
        ))}
        <div style={{ textAlign: "center" }}>
          <Button
            sx={{ mb: 7 }}
            onClick={handleAddQuestion}
            variant="contained"
          >
            Add
          </Button>
        </div>
      </Box>
      {/* why not rendering every time */}
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        message={snackbarMessage}
        severity="success"
      />
    </>
  );
}

export default QuestionTemplate;
