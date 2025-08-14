'use client';

import { useState, useEffect } from 'react';
import { VRViewer } from '../components/VRViewer';
import { SceneSelector } from '../components/SceneSelector';
import { VRControls } from '../components/VRControls';

const scenes = [
    {
        id: 1,
        name: 'Mountain Peak',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2048&h=1024&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=150&fit=crop'
    },
    {
        id: 2,
        name: 'Ocean View',
        image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=2048&h=1024&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=300&h=150&fit=crop'
    },
    {
        id: 3,
        name: 'Forest Path',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2048&h=1024&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=150&fit=crop'
    },
    {
        id: 4,
        name: 'City Skyline',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=2048&h=1024&fit=crop',
        thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=150&fit=crop'
    }
];

export default function Page() {
    const [currentScene, setCurrentScene] = useState(scenes[0]);
    const [isVRMode, setIsVRMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleSceneChange = (scene: typeof scenes[0]) => {
        setIsLoading(true);
        setCurrentScene(scene);
        setTimeout(() => setIsLoading(false), 500);
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">VR Not Supported</h2>
                    <p className="text-gray-300">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 relative overflow-hidden">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-white">VR 360° Explorer</h1>
                        <VRControls 
                            isVRMode={isVRMode}
                            onToggleVR={() => setIsVRMode(!isVRMode)}
                        />
                    </div>
                </div>
            </header>

            {/* Main VR Viewer */}
            <div className="relative w-full h-screen">
                {isLoading && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-40">
                        <div className="text-center text-white">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                            <p className="text-lg">Loading 360° Scene...</p>
                        </div>
                    </div>
                )}
                
                <VRViewer 
                    scene={currentScene}
                    isVRMode={isVRMode}
                    onError={setError}
                />
            </div>

            {/* Scene Selector */}
            <div className="absolute bottom-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
                <SceneSelector 
                    scenes={scenes}
                    currentScene={currentScene}
                    onSceneChange={handleSceneChange}
                />
            </div>
        </div>
    );
}