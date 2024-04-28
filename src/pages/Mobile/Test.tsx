import { Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, ThemeProvider, Tooltip, Typography, createTheme, useTheme } from "@mui/material";
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

export default function TestComponent() {
    return (
    <>
        <SwipeableEdgeDrawer/>
    </>
    )
}