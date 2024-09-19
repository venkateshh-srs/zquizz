import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { MathJax, MathJaxContext } from "better-react-mathjax";

function UserResult() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (location.state) {
    const { score, questions, selectedOptions, correctOptions } =
      location.state;

    return (
      <>
        <Paper
          sx={{
            padding: "2rem",
            maxWidth: "400px",
            margin: "2rem auto",
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Your Result
          </Typography>
          <Box
            sx={{
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h5" color="primary">
              Score: {score}
            </Typography>
          </Box>
        </Paper>
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
          <Paper
            elevation={3}
            sx={{ padding: "2rem", maxWidth: "800px", margin: "2rem auto" }}
          >
            <Divider sx={{ marginBottom: "2rem" }} />

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
                  <RadioGroup value={selectedOptions[qInd]}>
                    {q.options.map((o, oInd) => {
                      const isCorrect = oInd === correctOptions[qInd];
                      const isSelected = oInd === selectedOptions[qInd];

                      let textColor = "initial";

                      if (isSelected && isCorrect) {
                        textColor = "rgb(31, 173, 255)"; // selected&incorrect
                      } else if (isSelected && !isCorrect) {
                        textColor = "rgb(255, 51, 51)"; // selected&incorrect
                      } else if (!isSelected && isCorrect) {
                        textColor = "rgb(2, 181, 50)"; // correct option,but not selected by user
                      }

                      return (
                        <FormControlLabel
                          key={oInd}
                          value={oInd}
                          control={<Radio disabled />}
                          label={
                            <Typography sx={{ color: textColor }}>
                              <MathJax inline dynamic>
                                <div dangerouslySetInnerHTML={{ __html: o }} />
                              </MathJax>
                            </Typography>
                          }
                          sx={{
                            wordBreak: "break-word",
                            padding: "0.5rem",
                          }}
                        />
                      );
                    })}
                  </RadioGroup>
                </Box>
              ))}

              <Divider sx={{ margin: "2rem 0" }} />
            </FormControl>
          </Paper>
        </MathJaxContext>
      </>
    );
  }

  return (
    <Paper
      sx={{
        padding: "2rem",
        maxWidth: "450px",
        margin: "2rem auto",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        No Result Available
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Please submit the test to check your result.
      </Typography>
    </Paper>
  );
}

export default UserResult;
