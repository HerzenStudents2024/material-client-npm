import * as React from 'react';
import { Global } from '@emotion/react';
import { Box, Button, CssBaseline, Skeleton, SwipeableDrawer, Typography } from '@mui/material';
import grey from '@mui/material/colors/grey';

const drawerBleeding = 56;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function SwipeableEdgeDrawer(props: Props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <CssBaseline />
      <Global
        styles={{
          body: {
            backgroundColor: `${grey[100]} !important`,
          },
          '.MuiPaper-root.MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box sx={{ textAlign: 'right', pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            backgroundColor: '#fff',
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 6,
              bgcolor: 'grey.300',
              borderRadius: '3px',
              position: 'absolute',
              top: 8,
              left: 'calc(50% - 15px)',
            }}
          />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography>
        </Box>
        <Box sx={{ mx: 2, mb: 2, height: '100%', overflow: 'auto' }}>
          <Skeleton variant="rectangular" height="100%" />
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
