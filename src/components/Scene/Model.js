import React, { useEffect, useRef, useState } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'


export default function Model() {
    const { nodes } = useGLTF(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/medias/glass_chair.glb`);
    const { viewport } = useThree()
    const torus = useRef(null);
    const title = 'abandoned chairs';
    const [visibleCharacters, setVisibleCharacters] = useState(0);

    useEffect(() => {
        let count = 0;
        const timer = setInterval(() => {
            count += 1;
            setVisibleCharacters(count);
            if (count >= title.length) clearInterval(timer);
        }, 100);
        return () => clearInterval(timer);
    }, []);
    
    useFrame( () => {
        torus.current.rotation.x += 0.02
        torus.current.rotation.y += 0.008
        torus.current.rotation.z += 0.005
    })

    const materialProps = {
  thickness: 2,
  roughness: 0.0,
  transmission: 1.0,
  ior: 1.2,
  chromaticAberration: 0.03,
  backside: true
};

    
    return (
        <group scale={viewport.width / 15} >
            <Text font={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Barrio-Regular.ttf`} position={[0, 0, -1]} fontSize={1.0} color="#5b56d6" anchorX="center" anchorY="middle">
                {title.slice(0, visibleCharacters)}
            </Text>
            <Text font={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/fonts/PPNeueMontreal-Bold.otf`} position={[0, -2.3, 0]} fontSize={0.28} color="#5b56d6" anchorX="center" anchorY="middle">
                click on the chairs to continue
            </Text>
            <mesh
  ref={torus}
  geometry={nodes.Cube009_Glass001_0.geometry}
  scale={1}
  position={[0, 0, 0]}
  rotation={[0, 0, 0]}
  castShadow
  receiveShadow
  onClick={() => window.open(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/collection.html`, '_blank')}
  onPointerOver={(e) => (document.body.style.cursor = 'pointer')}
  onPointerOut={(e) => (document.body.style.cursor = 'default')}
>
  <MeshTransmissionMaterial {...materialProps} />
</mesh>
        </group>
        
    )
}
