import { Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, ThemeProvider, Tooltip, Typography, createTheme, makeStyles, styled, useTheme } from "@mui/material";
import LayersIcon from '@mui/icons-material/Layers';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import React, { Suspense, useEffect, useRef, useState } from "react";
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

const Map = styled(Box)(({ theme }) => ({
    position: 'absolute',
    width: '100%',
    height: '100%'
  }));

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.default',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const FieldContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  }));


function MapMobileComponent() {
    //===Location===
    const [location, setLocation] = useState(null);

    function handleLocationClick() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error);
        } else {
          console.log("Geolocation not supported");
        }
    }
    function success(position) {
        saveCameraPosition();

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }
    
    function error() {
        console.log("Unable to retrieve your location");
    }
    

    //===Theme===
    const theme = useTheme().palette.mode === 'dark';
    const colorMode = React.useContext(ColorModeContext);
    //===Translation===
    const { t, i18n } = useTranslation();

    //===Three.js===
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

    const direction = new THREE.Vector3;
    camera.current.getWorldDirection(direction);

    const saveCameraPosition = () => {
        dispatch(setCameraPosition([camera.current.position.x, camera.current.position.y, camera.current.position.z]))
    }

    const increaseZoom = () => {
        camera.current.position.addScaledVector(direction, 3);
        saveCameraPosition();
    }

    const decreaseZoom = () => {
        camera.current.position.addScaledVector(direction, -3);
        saveCameraPosition();
    }

    //===Modal===
    const [lng, setLng] = React.useState(languages.get(i18n.language));

    const handleChange = (event: SelectChangeEvent) => {
      setLng(event.target.value);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        saveCameraPosition();
        setOpen(true);
    }
    const handleClose = () => {
        saveCameraPosition();
        setOpen(false);
    }

    return (
    <>
        <Map>
            <RGPYModel camera={camera.current}></RGPYModel>
        </Map>

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
                    <Button variant="contained" onClick={handleLocationClick}>
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
            <Box sx={modalStyle}>
                <h1>{t('site settings')}</h1>
                <FieldContainer>
                    <p onClick={colorMode.toggleColorMode}>
                        { theme ? t("dark mode") : t("light mode")}
                    </p>
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                        {theme ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </FieldContainer>
                <FieldContainer marginBottom={1}>
                    <InputLabel sx={{marginRight: 1}}>{t("language")}:</InputLabel>
                    <Select
                    variant="standard"
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
                </FieldContainer>
                
                <FieldContainer>
                    <Button variant="outlined" sx={{marginRight: 1}} onClick={() => window.open("/mobile/signup", "_self")}>Вход</Button>
                    <Button variant="outlined" onClick={() => window.open("/mobile/signu", "_self")} >Регистрация</Button>
                </FieldContainer>
                
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