import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CopyLinkDialog from "./CopyLinkDialog";
import { useNavigate } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import CloseIcon from "@mui/icons-material/Close";

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
  DialogContentText,
  DialogTitle,
} from "@mui/material";
const drawerWidth = 240;
const navItems = ["Home", "Preview", "Publish"];
const url = process.env.BACKEND_URL;
function Navbar(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [quizLink, setQuizLink] = useState("");
  const navigate = useNavigate();
  const handleLinkDialogClose = () => {
    setLinkDialogOpen(false);
    // console.log("navigating");

    window.location.reload();
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  function handleQuizReport() {
    // console.log("clicked");

    //navigate to quizreport
    navigate("/admin/quiz-report");
  }
  function handleHomeClick() {
    navigate("/admin/create-quiz");
  }
  const handleClose = () => {
    setOpen(false);
  };
  function handlePublish() {
    //check if title or question or options are empty
    if (
      props?.title.trim() === "" ||
      props?.questions.some(
        (q) =>
          q.question.trim() === "" || q.options.some((o) => o.trim() === "")
      )
    ) {
      alert("Please fill all fields before publishing");
      return;
    } else setOpen(true);
  }
  async function handleConfirmPublish() {
    setOpen(false);
    setLoader(true);
    try {
      const data = { questions: props.questions, title: props.title };
      const response = await axios.post(url + "/admin/publish", data);
      setQuizLink(response.data.message);
      // console.log(response.data.message);
    } catch (error) {
      // console.log("speed");
      setLoader(false);
      // console.log(error);
    }
    setLoader(false);
    setLinkDialogOpen(true);
  }
  function handlePreviewDialog() {
    setPreviewDialogOpen(false);
  }
  function handleShowPreview() {
    setPreviewDialogOpen(true);
  }
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Zquiz
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={
                item === "Publish"
                  ? handlePublish
                  : null || item === "Quizes"
                  ? handleQuizReport
                  : null || item === "Home"
                  ? handleHomeClick
                  : null || item === "Preview"
                  ? handleShowPreview
                  : null
              }
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ gap: "200px" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              alignItems: "center",
              display: "flex",
            }}
          >
            {/* <PublishOutlinedIcon /> */}
            <a
              href="/admin/create-quiz"
              style={{ textDecoration: "none", color: "white" }}
            >
              Zquiz
            </a>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, ind) => {
              return (
                <Button
                  key={ind}
                  sx={{ color: "#fff" }}
                  onClick={
                    item === "Publish"
                      ? handlePublish
                      : null || item === "Quizes"
                      ? handleQuizReport
                      : null || item === "Home"
                      ? handleHomeClick
                      : null || item === "Preview"
                      ? handleShowPreview
                      : null
                  }
                >
                  {item}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to publish the quiz online?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Exit</Button>
          <Button onClick={handleConfirmPublish} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for preview of the quiz */}
      <Dialog
        open={previewDialogOpen}
        onClose={handlePreviewDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Quiz Preview</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handlePreviewDialog}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Typography variant="h4" align="center" gutterBottom>
            {props.title}
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
            <Paper
              elevation={3}
              sx={{ padding: "2rem", maxWidth: "800px", margin: "2rem auto" }}
            >
              <Divider sx={{ marginBottom: "2rem" }} />

              <FormControl component="fieldset">
                {props.questions.map((q, qInd) => (
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
                    <RadioGroup>
                      {q.options.map((o, oInd) => {
                        return (
                          <FormControlLabel
                            key={oInd}
                            value={oInd}
                            control={<Radio disabled />}
                            label={
                              <Typography>
                                <MathJax inline dynamic>
                                  <div
                                    dangerouslySetInnerHTML={{ __html: o }}
                                  />
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

          <Button
            onClick={handlePreviewDialog}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Close Preview
          </Button>
        </DialogContent>
      </Dialog>

      {loader && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loader}
        >
          <CircularProgress />
        </Backdrop>
      )}
      <CopyLinkDialog
        linkDialogOpen={linkDialogOpen}
        handleLinkDialogClose={handleLinkDialogClose}
        quizLink={quizLink}
      />
    </Box>
  );
}

export default Navbar;
