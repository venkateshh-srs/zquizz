import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import { url } from "../constants";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({
  linkDialogOpen,
  handleLinkDialogClose,
  quizLink,
}) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopy = () => {
    const textToCopy = `${process.env.FRONTEND_URL}/user/quiz/${quizLink}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setSnackbarOpen(true);
        // console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <>
      {linkDialogOpen && (
        <BootstrapDialog
          onClose={handleLinkDialogClose}
          aria-labelledby="customized-dialog-title"
          open={linkDialogOpen}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Copy and share the quiz link
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleLinkDialogClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography
              gutterBottom
            >{`${process.env.FRONTEND_URL}/user/quiz/${quizLink}`}</Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCopy}>
              Copy
            </Button>
          </DialogActions>
        </BootstrapDialog>
      )}
      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={1500}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Copied to clipboard
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
