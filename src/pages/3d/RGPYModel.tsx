import { createTheme, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import {Sky, Gltf, PerspectiveCamera, useFBX, useGLTF, useTexture, MeshDistortMaterial} from "@react-three/drei";
import { Stats, OrbitControls } from '@react-three/drei'
import { easing } from 'maath'

import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';


const shadowOffset = 50;

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


function Image({ url, ...props }) {
    const ref = useRef()
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const texture = useTexture(url)
  
    useFrame((state, delta) => {
      easing.damp(ref.current.material, 'distort', hovered ? 0.5 : 0, 0.25, delta)
      easing.damp(ref.current.material, 'speed', hovered ? 4 : 0, 0.25, delta)
      easing.dampE(ref.current.rotation, clicked ? [0, 0, Math.PI] : [0, 0, 0], 0.5, delta)
      easing.damp3(ref.current.scale, clicked ? 15 : 10, 0.25, delta)
      easing.dampC(ref.current.material.color, hovered ? '#003896' : 'white', 0.25, delta)
    })
  
    return (
      <mesh
        ref={ref}
        onClick={(e) => (e.stopPropagation(), click(!clicked))}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={(e) => (e.stopPropagation(), hover(false))}
        {...props}>
        <planeGeometry args={[1, 1, 64, 64]} />
        <MeshDistortMaterial map={texture} speed={4} toneMapped={false} />
      </mesh>
    )
  }


export default function RGPYModel({camera} : any) {
    //Theme
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    //3d
    //const fbx = useFBX('/3d/RGPY.fbx')
    const model = useGLTF('/3d/RGPY.glb')

    model.scene.traverse(child => {
        if (child.material) child.material.metalness = 0;
    })

    return (
    <Canvas camera={camera} style={{position: 'absolute', width: '100%', height: '100%'}}>
        <Sky sunPosition={[100, 20, 100]}/>
        <ambientLight intensity={1}/>
        <directionalLight
            castShadow
            intensity={5}
            shadow-mapSize={4096}
            shadow-camera-top={shadowOffset}
            shadow-camera-bottom={-shadowOffset}
            shadow-camera-left={shadowOffset}
            shadow-camera-right={-shadowOffset}
            position={[100, 100, 0]}
        />
        {/* <primitive object={fbx} scale={0.1}/> */}
        {/* <Gltf castShadow receiveShadow scale={0.1} src="/3d/RGPY.glb"/> */}
        {<primitive object={model.scene} scale={0.1}>
            <meshStandardMaterial/>
        </primitive>} 
        {/* <Model /> */}
        <OrbitControls
            maxPolarAngle={Math.PI / 3}
            />
        <Stats />
        <Image url="../../../public/images/main/light-background-logo.png" position={[10, 10, 10]} />
    </Canvas>
    )
}