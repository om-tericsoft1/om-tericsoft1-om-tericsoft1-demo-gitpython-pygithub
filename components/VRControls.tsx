'use client';

import { useState, useEffect } from 'react';

interface VRControlsProps {
    isVRMode: boolean;
    onToggleVR: () => void;
}

export function VRControls({ isVRMode, onToggleVR }: VRControlsProps) {
    const [vrSupported, setVrSupported] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        // Check VR support
        if (typeof window !== 'undefined') {
            setVrSupported('xr' in navigator || 'getVRDisplays' in navigator);
        }
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                title="Toggle Fullscreen"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    {isFullscreen ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 15v4.5M15 15h4.5M15 15l5.5 5.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15H4.5M9 15v4.5M9 15l-5.5 5.5"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                    )}
                </svg>
            </button>

            {vrSupported && (
                <button
                    onClick={onToggleVR}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isVRMode
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                >
                    {isVRMode ? 'Exit VR' : 'Enter VR'}
                </button>
            )}
        </div>
    );
}