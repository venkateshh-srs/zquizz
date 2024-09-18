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
const drawerWidth = 240;
const navItems = ["Home", "Publish"];
const url = process.env.BACKEND_URL;
function Navbar(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
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
