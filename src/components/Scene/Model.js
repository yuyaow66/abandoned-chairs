import React, { useRef } from 'react'
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'


export default function Model() {
    const { nodes } = useGLTF(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/medias/glass_chair.glb`);
    const { viewport } = useThree()
    const torus = useRef(null);
    
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
                The Abandoned Chairs
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
