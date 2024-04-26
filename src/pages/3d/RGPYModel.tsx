import { createTheme, useTheme } from "@mui/material";
import React, { Suspense, useEffect, useRef } from "react";

import { Camera, Canvas, useFrame, useThree } from "@react-three/fiber";
import {Sky, Gltf, PerspectiveCamera, useFBX, useGLTF} from "@react-three/drei";
import { MathUtils } from 'three';
import { Stats, OrbitControls } from '@react-three/drei'
import * as THREE from 'three';
import { useDispatch } from "react-redux";
import { setCameraPosition } from "../../store/slice";

const shadowOffset = 50;

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


export default function RGPYModel({camera} : any) {
    //Theme
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    //3d
    const fbx = useFBX('/3d/RGPY.fbx')

    return (
    <Canvas camera={camera}>
        <Sky sunPosition={[100, 20, 100]}/>
        <ambientLight intensity={0.5}/>
        <directionalLight
            castShadow
            intensity={3}
            shadow-mapSize={4096}
            shadow-camera-top={shadowOffset}
            shadow-camera-bottom={-shadowOffset}
            shadow-camera-left={shadowOffset}
            shadow-camera-right={-shadowOffset}
            position={[100, 100, 0]}
        />
        <primitive object={fbx} scale={0.1}/>
        {/* <Gltf castShadow receiveShadow scale={0.1} src="/3d/RGPY.glb"/> */}
        {/* {<primitive object={model} scale={0.1}/>} not working*/} 
        {/* <Model /> */}
        <meshStandardMaterial attach="material" color={"#6be092"} />
        <OrbitControls
            maxPolarAngle={Math.PI / 3}
            />
        <Stats />
    </Canvas>
    )
}