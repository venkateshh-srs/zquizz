import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import NavBar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const url = process.env.BACKEND_URL;

export default function QuizReport() {
  const [expanded, setExpanded] = useState(false);
  const [allReports, setAllReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url + "/admin/quiz-report");
        const totalData = response.data.totalData;
        setAllReports(totalData);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const disablePublish = true;

  return (
    <>
      <NavBar disablePublish={disablePublish} />
      <Box sx={{ mt: 9 }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          allReports.map((report, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={handleExpansion(index)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" color="textSecondary">
                  {report.quizData.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer>
                  <Typography>
                    <a
                      href={`${process.env.FRONTEND_URL}/user/quiz/${report.quizData.quizId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {process.env.FRONTEND_URL}/user/quiz/
                      {report.quizData.quizId}
                    </a>
                  </Typography>
                  <Table sx={{ minWidth: 200 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Total Score</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {report.completedUsers.map((user, idx) => (
                        <TableRow key={idx}>
                          <TableCell align="center">{user.email}</TableCell>
                          <TableCell align="center">{user.userName}</TableCell>
                          <TableCell align="center">{user.score}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Box>
    </>
  );
}
