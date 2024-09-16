// @ts-nocheck

import { Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, ThemeProvider, Tooltip, Typography, createTheme, makeStyles, styled, useTheme, ButtonGroup } from "@mui/material";
import LayersIcon from '@mui/icons-material/Layers';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "../../i18n";

import RGPYModel from "./components/RGPYModel";
//чтение
import { useSelector } from "react-redux";
//запись
import { useDispatch } from "react-redux";
import { setCameraPosition } from "../../store/CameraPositionSlice";
import { setFloorButton } from "../../store/FloorButtonSlice";
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
    const [mapViewIs3d, setMapViewIs3d] = useState(true);

    function changeMapView() {
        saveCameraPosition();

        setMapViewIs3d(!mapViewIs3d)
    }
    

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
    const cameraPosition = useSelector(
        (state: { cameraPosition: { data: number[] } }) => state.cameraPosition.data,
      ) as number[];
    //чтение
    const floorButtons = useSelector(
        (state: { floorButton: { data: boolean[] } }) => state.floorButton.data,
      ) as boolean[];
    //чтение
    const floorButtonsVisibility = useSelector(
        (state: { floorButton: { visibility: boolean[] } }) => state.floorButton.visibility,
      ) as boolean[];
    //запись
    const dispatch = useDispatch();

    useEffect(() => {
        camera.current.rotation.set(-MathUtils.degToRad(60), 0, 0)
        camera.current.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
    })

    const direction = new THREE.Vector3;
    camera.current.getWorldDirection(direction);

    const saveCameraPosition = () => {
        dispatch(setCameraPosition([camera.current.position.x, camera.current.position.y, camera.current.position.z]))
    }

    const setFloor = (x: number) => {
        saveCameraPosition()
        dispatch(setFloorButton([true, 1 < x, 2 < x, 3 < x, 4 < x]))
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

    function modalContent() {
        return <div></div>
    }

    return (
    <>
        <Map>
            <RGPYModel camera={camera.current} theme={theme}></RGPYModel>
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
                        <Tooltip title={t('site settings')} PopperProps={{style:{zIndex:100000000}}}>
                            <Button 
                            variant="contained" 
                            sx={{height: "55px", zIndex: 100000000}} 
                            onClick={handleOpen}>
                                <SettingsIcon/>
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item width="80%">
                        <TextField 
                        variant='filled' 
                        placeholder={t("search on the map")} 
                        sx={{height: "55px", zIndex: 100000000}} 
                        fullWidth={true} 
                        onChange={(event) => {}}>
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item textAlign="right">
                <Tooltip title={t('map view')} placement="left" PopperProps={{style:{zIndex:100000000}}}>
                    <Button variant="contained" onClick={changeMapView} sx={{zIndex: 100000000}}>
                        {mapViewIs3d ? "3D" : "2D"}
                    </Button>
                </Tooltip>
            </Grid>
            <Grid item textAlign="right">
                <Tooltip title={t('layer settings')} placement="left" PopperProps={{style:{zIndex:100000000}}}>
                    <Button variant="contained" sx={{zIndex: 100000000}}>
                        <LayersIcon/>
                    </Button>
                </Tooltip>
            </Grid>
            <Grid item textAlign="right">
                <Tooltip title={t('my location')} placement="left" PopperProps={{style:{zIndex:100000000}}}>
                    <Button variant="contained" onClick={handleLocationClick} sx={{zIndex: 100000000}}>
                        <MyLocationIcon/>
                    </Button>
                </Tooltip>
            </Grid>
            <Grid item textAlign="right" mt={4}>
                <Tooltip title={t('zoom in')} placement="left" PopperProps={{style:{zIndex:100000000}}}>
                    <Button variant="contained" onClick={increaseZoom} sx={{zIndex: 100000000}}>
                        +
                    </Button>
                </Tooltip>
            </Grid>
            <Grid item textAlign="right">
                <Tooltip title={t('zoom out')} placement="left" PopperProps={{style:{zIndex:100000000}}}>
                    <Button variant="contained" onClick={decreaseZoom} sx={{zIndex: 100000000}}>
                        -
                    </Button>
                </Tooltip>
            </Grid>
            <Grid item textAlign="right" mt={4}>
                <ButtonGroup orientation="vertical">
                    {floorButtonsVisibility[4] && <Button variant="contained" onClick={() => setFloor(5)} sx={{zIndex: 100000000}} color={floorButtons[4] ? "primary" : "inherit"}>
                        5
                    </Button>}
                    {floorButtonsVisibility[3] && <Button variant="contained" onClick={() => setFloor(4)} sx={{zIndex: 100000000}} color={floorButtons[3] ? "primary" : "inherit"}>
                        4
                    </Button>}
                    {floorButtonsVisibility[2] && <Button variant="contained" onClick={() => setFloor(3)} sx={{zIndex: 100000000}} color={floorButtons[2] ? "primary" : "inherit"}>
                        3
                    </Button>}
                    {floorButtonsVisibility[1] && <Button variant="contained" onClick={() => setFloor(2)} sx={{zIndex: 100000000}} color={floorButtons[1] ? "primary" : "inherit"}>
                        2
                    </Button>}
                    {floorButtonsVisibility[0] && <Button variant="contained" onClick={() => setFloor(1)} sx={{zIndex: 100000000}} color={floorButtons[0] ? "primary" : "inherit"}>
                        1
                    </Button>}
                </ButtonGroup>
                </Grid>

            <SwipeableEdgeDrawer/>
        </Grid>

        <Modal 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="modal-modal-title" 
        aria-describedby="modal-modal-description"
        sx={{zIndex: 100000000}}>
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
                    <InputLabel sx={{color:"inherit", marginRight: 1, zIndex: 100000001}}>{t("language")}:</InputLabel>
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
                </FieldContainer>
                
                <FieldContainer>
                    <Button variant="outlined" sx={{marginRight: 1}} href="/mobile/signin">Вход</Button>
                    <Button variant="outlined" href="/mobile/signup">Регистрация</Button>
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