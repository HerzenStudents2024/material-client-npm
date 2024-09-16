import * as React from 'react';
import { Global } from '@emotion/react';
import { Box, Button, CssBaseline, Grid, IconButton, Skeleton, SwipeableDrawer, Theme, Typography, createStyles, makeStyles, styled } from '@mui/material';
import grey from '@mui/material/colors/grey';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import { useTranslation } from 'react-i18next';

const drawerBleeding = 56;

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const ModalBottomPart = styled(Box)(({ theme }) => ({
  bgcolor:'inherit',
  height: '100%',
  overflow: 'auto'
}));

const Modal = styled(Box)(({ theme }) => ({
  position: 'relative',
  top: -drawerBleeding,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  visibility: 'visible',
  backgroundColor: 'inherit',
}));

export default function SwipeableEdgeDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => () => {
    setOpen(!open);
  };
  const { t } = useTranslation();

  return (
    <div>
      <CssBaseline />
      <Global
        styles={{
          '.MuiPaper-root.MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer()}
        onOpen={toggleDrawer()}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        allowSwipeInChildren={true}
        sx={{zIndex: 100000000}}
      >
        <Modal>
          <Puller />
          <Grid container justifyContent='space-between' direction='row'>
            <Typography p={2} fontWeight='bold'>{t('categories')}</Typography>
            {/* <Button sx={{
              p: 2,
              pointerEvents: "all"
            }} onClick={toggleDrawer()}>{open ? "Close" : "Open"}</Button> */}
              <IconButton sx={{pointerEvents: "auto"}} onClick={toggleDrawer()} color="inherit">
                {open ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
              </IconButton>
          </Grid>
          <ModalBottomPart>
          </ModalBottomPart>
        </Modal>
      </SwipeableDrawer>
    </div>
  );
}
