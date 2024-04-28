import { useTheme } from "@mui/material";
import React from "react";

import { Canvas } from "@react-three/fiber";
import {Sky, Gltf, PerspectiveCamera, useFBX, useGLTF} from "@react-three/drei";
import { Stats, OrbitControls } from '@react-three/drei'

const shadowOffset = 50;

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


export default function RGPYModel({camera} : any) {
    //Theme
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    //3d
    //const fbx = useFBX('/3d/RGPY.fbx')
    const model = useGLTF('/3d/RGPY.glb')

    return (
    <Canvas camera={camera} style={{position: 'absolute', width: '100%', height: '100%'}}>
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
        {/* <primitive object={fbx} scale={0.1}/> */}
        {/* <Gltf castShadow receiveShadow scale={0.1} src="/3d/RGPY.glb"/> */}
        {<primitive object={model.scene} scale={0.1}/>} 
        {/* <Model /> */}
        <meshStandardMaterial attach="material" color={"#6be092"} />
        <OrbitControls
            maxPolarAngle={Math.PI / 3}
            />
        <Stats />
    </Canvas>
    )
}