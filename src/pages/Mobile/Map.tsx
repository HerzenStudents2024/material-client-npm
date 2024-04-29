import { Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, ThemeProvider, Tooltip, Typography, createTheme, makeStyles, useTheme } from "@mui/material";
import LayersIcon from '@mui/icons-material/Layers';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import React, { Suspense, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "../../i18n";

import RGPYModel from "../3d/RGPYModel";
//чтение
import { useSelector } from "react-redux";
//запись
import { useDispatch } from "react-redux";
import { setCameraPosition } from "../../store/slice";
import * as THREE from 'three';
import { MathUtils } from 'three';
import SwipeableEdgeDrawer from "./components/SwipeableDrawer";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });



function MapMobileComponent() {
    //Theme
    const theme = useTheme().palette.mode === 'dark';
    const colorMode = React.useContext(ColorModeContext);

    const camera = useRef(new THREE.PerspectiveCamera())

    //чтение
    const query = useSelector(
        (state: { cameraPosition: { data: number[] } }) => state.cameraPosition.data,
      ) as number[];
    //запись
    const dispatch = useDispatch();

    useEffect(() => {
        camera.current.rotation.set(-MathUtils.degToRad(60), 0, 0)
        camera.current.position.set(query[0], query[1], query[2]);
    })

    const increaseZoom = () => {
        const direction = new THREE.Vector3;
        camera.current.getWorldDirection(direction);
        camera.current.position.addScaledVector(direction, 2);
        dispatch(setCameraPosition([camera.current.position.x, camera.current.position.y, camera.current.position.z]))
    }

    const decreaseZoom = () => {
        const direction = new THREE.Vector3;
        camera.current.getWorldDirection(direction);
        camera.current.position.addScaledVector(direction, -2);
        dispatch(setCameraPosition([camera.current.position.x, camera.current.position.y, camera.current.position.z]))
    }

    const { t, i18n } = useTranslation();

    //Modal
    const [lng, setLng] = React.useState(languages.get(i18n.language));

    const handleChange = (event: SelectChangeEvent) => {
      setLng(event.target.value);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        dispatch(setCameraPosition([camera.current.position.x, camera.current.position.y, camera.current.position.z]))
        setOpen(true);
    }
    const handleClose = () => {
        dispatch(setCameraPosition([camera.current.position.x, camera.current.position.y, camera.current.position.z]))
        setOpen(false);
    }

    return (
    <>
        <div style={{position: 'absolute', width: '100%', height: '100%'}}>
            <RGPYModel camera={camera.current}></RGPYModel>
        </div>

        <Grid 
        container
        direction="column" 
        spacing={2} 
        minHeight="100vh" 
        minWidth="100vw" 
        p={2}>
            <Grid item>
                <Grid 
                container 
                direction="row" 
                spacing={2} 
                width="100%" 
                alignItems="center" 
                justifyContent="center">
                    <Grid item>
                        <Tooltip title={t('site settings')}>
                            <Button 
                            variant="contained" 
                            sx={{height: "55px"}} 
                            onClick={handleOpen}>
                                <SettingsIcon/>
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item width="80%">
                        <TextField 
                        variant='filled' 
                        placeholder={t("search on the map")} 
                        sx={{height: "55px"}} 
                        fullWidth={true} 
                        onChange={(event) => {}}>
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item textAlign="right">
                <Tooltip title={t('layer settings')} placement="left">
                    <Button variant="contained">
                        <LayersIcon/>
                    </Button>
                </Tooltip>
            </Grid>
            <Grid item textAlign="right">
                <Tooltip title={t('my location')} placement="left">
                    <Button variant="contained">
                        <MyLocationIcon/>
                    </Button>
                </Tooltip>
            </Grid>
            <Grid item spacing={2} direction="column" textAlign="right" mt={4}>
                <Grid container direction="column" spacing={2}>
                    <Grid item textAlign="right">
                        <Tooltip title={t('zoom in')} placement="left">
                            <Button variant="contained" onClick={increaseZoom}>
                                +
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item textAlign="right">
                        <Tooltip title={t('zoom out')} placement="left">
                            <Button variant="contained" onClick={decreaseZoom}>
                                -
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <SwipeableEdgeDrawer/>
        </Grid>

        <Modal 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="modal-modal-title" 
        aria-describedby="modal-modal-description" >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.default',
                color: 'text.primary',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                <h1>{t('site settings')}</h1>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    bgcolor: 'background.default',
                    color: 'text.primary',
                    borderRadius: 1,
                    mt: 1
                }}
                >
                    <p onClick={colorMode.toggleColorMode}>
                        { theme ? t("dark mode") : t("light mode")}
                    </p>
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                        {theme ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Box>
                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <InputLabel>{t("language")}</InputLabel>
                    <Select
                    value={lng}
                    onChange={handleChange}
                    >
                        {Array
                        .from(languages.keys()) 
                        .map(language => 
                            <MenuItem 
                            onClick={() => i18n.changeLanguage(language)}
                            value={languages.get(language)}
                            >
                                {languages.get(language)}
                            </MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Box>
        </Modal>
    </>
    )
}

function MapSuspense() {
    return (<p>Страница загружается...</p>)
}

export default function MapMobile() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
        createTheme({
            palette: {
            mode,
            },
        }),
        [mode],
    );

    return (
    <Suspense fallback={<MapSuspense/>}>
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <MapMobileComponent />
            </ThemeProvider>
        </ColorModeContext.Provider>
        </Suspense>
    );
}