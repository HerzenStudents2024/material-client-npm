import { Avatar, Grid, Typography, createTheme, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {Sky, Gltf, PerspectiveCamera, useFBX, useGLTF, useTexture, MeshDistortMaterial, Text, Text3D, useMatcapTexture, PivotControls, Center} from "@react-three/drei";
import { Stats, OrbitControls, Html } from '@react-three/drei'
import { easing } from 'maath'

import { Vector3 } from "three";
import Hello from "../Mobile/Hello";

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


const shadowOffset = 50;

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MapLabel3d(props: {text: string, pos: number[]}) {
    const textPosition = new Vector3(props.pos[0], props.pos[1] + 2, props.pos[2])
    const imagePosition = new Vector3(props.pos[0], props.pos[1] + 8, props.pos[2])
    const text3dPosition = new Vector3(props.pos[0] - 0.5, props.pos[1] + 3, props.pos[2])
    const ref = useRef();

    return(
        <>
            <Text3D
              position={text3dPosition}
              ref={ref}
              size={2}
              font={"/3d/gt.json"}
              bevelEnabled
              lineHeight={0.9}
              letterSpacing={0.3}
            >
              {"1"}
              <meshMatcapMaterial color="black"/>
        </Text3D>
        
        {/* <Image url="../../../public/images/main/light-background-logo.png" position={imagePosition} /> */}
        <Text position={textPosition} color={"black"}>
            {props.text}
        </Text>
        </>
    )
}

function MapLabel(props: {text: string, pos: number[], theme: boolean}) {
    const bgColor = props.theme ? "black" : "background.default"
    return(
        <Html scale={0.5} distanceFactor={30} position={new Vector3(props.pos[0], props.pos[1] + 4, props.pos[2])} style={{transform: "translate(-50%, 0)"}}>
            <center>
                <Avatar>
                    <AccountBalanceIcon/>
                </Avatar>
            </center>
            <Typography bgcolor={bgColor} whiteSpace="nowrap" margin={1}>{props.text}</Typography>
        </Html>
    )
}

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


export default function RGPYModel({camera, theme} : any) {
    //OrbitControls
    const [draggable, setDraggable] = useState(true)

    //Theme
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
            enabled={draggable}
            />
        <Stats />
        <mesh position={[0, 10, 0]}>
            <PivotControls lineWidth={5} disableRotations={true} disableScaling={true} disableSliders={true} onDragStart={() => {setDraggable(false)}} onDragEnd={() => {setDraggable(true)}}>
                <MapLabel text={"1 корпус"} pos={[0, 0, 0]} theme={theme}/>
            </PivotControls>
        </mesh>
        {/* <mesh position={[0, 10, 0]}>
            <PivotControls disableRotations={true} disableScaling={true} disableSliders={true} onDragStart={() => {setDraggable(false)}} onDragEnd={() => {setDraggable(true)}}>
                <MapLabel3d text={"корпус"} pos={[0, 0, 0]}/>
            </PivotControls>
        </mesh> */}
        
    </Canvas>
    )
}