import React, { useEffect, useState } from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import * as Styles from "./styles";
import Results from "./Results";

const drawerBleeding = 80;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800]
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)"
}));

export default function MapTestMobile(props: any) {
  const { window } = props;
  const [open, setOpen] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);

  const toggleDrawer = (newOpen: any) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    setTimeout(() => {
      setSearchCompleted(true);
      setOpen(true);
    }, 5000);
  }, []);

  return (
    <Box style={{ backgroundColor: "#000", height: "100vh" }}>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root": {
            position: "static !important"
          },
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(45% - ${drawerBleeding}px)`,
            overflow: "visible"
          }
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={() => {
          toggleDrawer(false);
        }}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={!searchCompleted}
        ModalProps={{
          keepMounted: true
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
            backgroundColor: "#FFF",
            height: `${drawerBleeding + 1}px`
          }}
        >
          <Puller />
          {!searchCompleted && (
            <>
              <Typography sx={[Styles.searchingText]}>searching...</Typography>
            </>
          )}
          {searchCompleted && (
            <Typography sx={Styles.searchingResult}>results:</Typography>
          )}
        </StyledBox>
        <StyledBox
          sx={{
            height: "100%",
            overflow: "scroll"
          }}
        >
          {searchCompleted && <Results />}
        </StyledBox>
      </SwipeableDrawer>
    </Box>
  );
}
