'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Environment } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

function PanoramicSphere() {
    const meshRef = useRef<THREE.Mesh>(null);
    
    useEffect(() => {
        // Load a 360 panoramic image
        const loader = new THREE.TextureLoader();
        const texture = loader.load(
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2048&h=1024&fit=crop',
            undefined,
            undefined,
            (error) => {
                console.error('Error loading panoramic texture:', error);
            }
        );
        
        if (meshRef.current) {
            meshRef.current.material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.BackSide, // Render inside of sphere
            });
        }
    }, []);

    return (
        <mesh ref={meshRef} scale={[-50, 50, 50]}>
            <sphereGeometry args={[1, 32, 16]} />
            <meshBasicMaterial color="#87CEEB" side={THREE.BackSide} />
        </mesh>
    );
}

function FloatingText() {
    const textRef = useRef<THREE.Group>(null);
    
    useEffect(() => {
        const animate = () => {
            if (textRef.current) {
                textRef.current.rotation.y += 0.01;
                textRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.5;
            }
            requestAnimationFrame(animate);
        };
        animate();
    }, []);

    return (
        <group ref={textRef} position={[0, 0, -5]}>
            <Text
                fontSize={2}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
            >
                Hello VR World!
            </Text>
            <Text
                fontSize={0.8}
                color="#cccccc"
                anchorX="center"
                anchorY="middle"
                position={[0, -1.5, 0]}
            >
                Look around with your mouse or VR device
            </Text>
        </group>
    );
}

function VRControls() {
    const [isVRSupported, setIsVRSupported] = useState(false);
    
    useEffect(() => {
        if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
            setIsVRSupported(true);
        }
    }, []);

    return (
        <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.8}
            autoRotate={false}
            target={[0, 0, 0]}
        />
    );
}

export default function VRExperience() {
    const [webGLSupported, setWebGLSupported] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check WebGL support
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) {
                setWebGLSupported(false);
            }
        } catch (error) {
            setWebGLSupported(false);
        }
        
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    if (!webGLSupported) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white">
                <div className="text-center p-8">
                    <h1 className="text-3xl font-bold mb-4">VR Not Supported</h1>
                    <p className="text-lg">Your device doesn't support WebGL required for VR experience.</p>
                    <p className="mt-4 text-sm opacity-75">Try using a modern browser or device.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen relative">
            {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black text-white">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p className="text-lg">Loading VR Experience...</p>
                    </div>
                </div>
            )}
            
            <Canvas
                camera={{ position: [0, 0, 0], fov: 75 }}
                style={{ background: '#000' }}
                onCreated={({ gl }) => {
                    gl.setClearColor('#000000');
                }}
            >
                <Suspense fallback={null}>
                    <PanoramicSphere />
                    <FloatingText />
                    <VRControls />
                    <Environment preset="night" />
                </Suspense>
            </Canvas>
            
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-3 rounded-lg">
                <p className="text-sm">
                    🖱️ Drag to look around<br />
                    📱 Use device orientation on mobile
                </p>
            </div>
        </div>
    );
}