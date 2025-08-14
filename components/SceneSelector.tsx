'use client';

interface Scene {
    id: number;
    name: string;
    image: string;
    thumbnail: string;
}

interface SceneSelectorProps {
    scenes: Scene[];
    currentScene: Scene;
    onSceneChange: (scene: Scene) => void;
}

export function SceneSelector({ scenes, currentScene, onSceneChange }: SceneSelectorProps) {
    return (
        <div className="container mx-auto px-4 py-4">
            <div className="flex space-x-4 overflow-x-auto pb-2">
                {scenes.map((scene) => (
                    <button
                        key={scene.id}
                        onClick={() => onSceneChange(scene)}
                        className={`flex-shrink-0 group relative rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 ${
                            currentScene.id === scene.id
                                ? 'ring-2 ring-blue-500 scale-105'
                                : 'hover:ring-2 hover:ring-white/50'
                        }`}
                    >
                        <img
                            src={scene.thumbnail}
                            alt={scene.name}
                            className="w-32 h-20 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-end">
                            <div className="p-2 w-full">
                                <p className="text-white text-sm font-medium truncate">
                                    {scene.name}
                                </p>
                            </div>
                        </div>
                        {currentScene.id === scene.id && (
                            <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}