import { Html } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";

export default function MapLabel(position: Vector3, text: string, image: any) {
    return(
        <mesh position={position}>
            <Html>
                {image}
                <div>
                    {text}
                </div>
            </Html>
        </mesh>
    )
}