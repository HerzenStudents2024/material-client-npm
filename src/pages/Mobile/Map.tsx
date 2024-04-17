import { Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, ThemeProvider, Tooltip, Typography, createTheme, useTheme } from "@mui/material";
import LayersIcon from '@mui/icons-material/Layers';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "../../i18n";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MapMobileComponent() {
    //Modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { t, i18n } = useTranslation();

    //Theme
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    //Language
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };

    return (
    <>
        <Grid container direction="column" spacing={2} minHeight="100vh" minWidth="100vw" p={2}>
            <Grid item>
                <Grid container direction="row" spacing={2} width="100%" alignItems="center" justifyContent="center">
                    <Grid item>
                        <Tooltip title={t('site settings')}>
                            <Button variant="contained" sx={{height: "55px"}} onClick={handleOpen}>
                                <SettingsIcon/>
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item width="80%">
                        <TextField placeholder={t("search on the map")} sx={{height: "55px"}} fullWidth={true}>
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
                            <Button variant="contained">
                                +
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item textAlign="right">
                        <Tooltip title={t('zoom out')} placement="left">
                            <Button variant="contained">
                                -
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>


        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
            <Box sx={{
                position: 'absolute' as 'absolute',
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
                    <p onClick={colorMode.toggleColorMode}>{theme.palette.mode === 'dark' ? t("dark mode") : t("light mode")}</p>
                    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Box>
                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">{t("language")}</InputLabel>
                        <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={age}
                        onChange={handleChange}
                        label="Age"
                        >
                            {Array.from(languages.keys())
                                .map(language => 
                                    <MenuItem 
                                        onClick={() => i18n.changeLanguage(language)}
                                        value={languages.get(language)}
                                    >
                                        {languages.get(language)}
                            </MenuItem>)}
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