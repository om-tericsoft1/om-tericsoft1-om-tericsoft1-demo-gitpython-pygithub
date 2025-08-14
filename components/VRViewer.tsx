'use client';

import { useEffect, useRef, useState } from 'react';

interface VRViewerProps {
    scene: {
        id: number;
        name: string;
        image: string;
    };
    isVRMode: boolean;
    onError: (error: string) => void;
}

export function VRViewer({ scene, isVRMode, onError }: VRViewerProps) {
    const sceneRef = useRef<HTMLDivElement>(null);
    const [aframeLoaded, setAframeLoaded] = useState(false);

    useEffect(() => {
        const loadAFrame = async () => {
            try {
                if (typeof window !== 'undefined' && !window.AFRAME) {
                    const script = document.createElement('script');
                    script.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
                    script.onload = () => {
                        setAframeLoaded(true);
                    };
                    script.onerror = () => {
                        onError('Failed to load VR library');
                    };
                    document.head.appendChild(script);
                } else if (window.AFRAME) {
                    setAframeLoaded(true);
                }
            } catch (error) {
                onError('VR not supported in this environment');
            }
        };

        loadAFrame();
    }, [onError]);

    useEffect(() => {
        if (!aframeLoaded || !sceneRef.current) return;

        const aScene = sceneRef.current.querySelector('a-scene');
        if (aScene) {
            const sky = aScene.querySelector('a-sky');
            if (sky) {
                sky.setAttribute('src', scene.image);
            }
        }
    }, [scene, aframeLoaded]);

    if (!aframeLoaded) {
        return (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <div className="text-white text-center">
                    <div className="animate-pulse">Loading VR Engine...</div>
                </div>
            </div>
        );
    }

    return (
        <div ref={sceneRef} className="w-full h-full">
            <a-scene
                background="color: #000"
                cursor="rayOrigin: mouse"
                raycaster="objects: .clickable"
                vr-mode-ui={isVRMode ? 'enabled: true' : 'enabled: false'}
            >
                <a-assets>
                    <img id="skyTexture" src={scene.image} crossOrigin="anonymous" />
                </a-assets>
                
                <a-sky src="#skyTexture" rotation="0 -90 0"></a-sky>
                
                <a-camera
                    look-controls="enabled: true"
                    wasd-controls="enabled: false"
                    cursor="fuse: true; fuseTimeout: 1500"
                    position="0 0 0"
                >
                    <a-cursor
                        animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
                        animation__fusing="property: scale; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500"
                        geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
                        material="color: white; shader: flat"
                        position="0 0 -1"
                    ></a-cursor>
                </a-camera>
                
                <a-light type="ambient" color="#404040"></a-light>
            </a-scene>
        </div>
    );
}