'use client';
import { Canvas } from '@react-three/fiber'
import Model from './Model';
import { Environment } from '@react-three/drei'

export default function Index() {
  return (
    <Canvas style={{background: '#000000'}}>
        <Model />
        <directionalLight intensity={2} position={[0, 2, 3]}/>
        <Environment files={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/medias/qwantani_moon_noon_puresky_4k.hdr`} background/>

    </Canvas>
  )
}
