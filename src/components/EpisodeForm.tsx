// import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_SCENE, REMOVE_SCENE } from '../graphql/mutations';
// import Scene from './Scene';

// interface EpisodeFormProps {
//   episodeId: string;
// }

// interface SceneData {
//   id: string;
//   location: string;
//   description: string;
//   characters: string[];
// }

// const EpisodeForm: React.FC<EpisodeFormProps> = ({ episodeId }) => {
//   const [scenes, setScenes] = useState<SceneData[]>([]);
//   const [addScene] = useMutation(ADD_SCENE);
//   const [removeScene] = useMutation(REMOVE_SCENE);

//   const handleAddScene = async () => {
//     try {
//       const { data } = await addScene({
//         variables: { episodeId },
//       });

//       const newScene: SceneData = {
//         id: data.addScene.id,
//         location: '',
//         description: '',
//         characters: [],
//       };

//       setScenes((prevScenes) => [...prevScenes, newScene]);
//     } catch (error) {
//       // Handle error
//     }
//   };

//   const handleRemoveScene = async (sceneId: string) => {
//     try {
//       await removeScene({
//         variables: { sceneId },
//       });

//       setScenes((prevScenes) => prevScenes.filter((scene) => scene.id !== sceneId));
//     } catch (error) {
//       // Handle error
//     }
//   };

//   const handleLocationChange = (sceneId: string, location: string) => {
//     setScenes((prevScenes) =>
//       prevScenes.map((scene) =>
//         scene.id === sceneId ? { ...scene, location } : scene
//       )
//     );
//   };

//   const handleDescriptionChange = (sceneId: string, description: string) => {
//     setScenes((prevScenes) =>
//       prevScenes.map((scene) =>
//         scene.id === sceneId ? { ...scene, description } : scene
//       )
//     );
//   };

//   const handleAddCharacter = (sceneId: string) => {
//     setScenes((prevScenes) =>
//       prevScenes.map((scene) =>
//         scene.id === sceneId ? { ...scene, characters: [...scene.characters, ''] } : scene
//       )
//     );
//   };

//   const handleRemoveCharacter = (sceneId: string, characterIndex: number) => {
//     setScenes((prevScenes) =>
//       prevScenes.map((scene) =>
//         scene.id === sceneId
//           ? { ...scene, characters: scene.characters.filter((_, index) => index !== characterIndex) }
//           : scene
//       )
//     );
//   };

//   const handleCharacterChange = (
//     sceneId: string,
//     characterIndex: number,
//     characterName: string
//   ) => {
//     setScenes((prevScenes) =>
//       prevScenes.map((scene) =>
//         scene.id === sceneId
//           ? {
//               ...scene,
//               characters: scene.characters.map((character, index) =>
//                 index === characterIndex ? characterName : character
//               ),
//             }
//           : scene
//       )
//     );
//   };

//   return (
//     <div>
//       <button onClick={handleAddScene}>Add Scene</button>
//       {scenes.map((scene) => (
//         <Scene
//           key={scene.id}
//           scene={scene}
//           onLocationChange={(location) => handleLocationChange(scene.id, location)}
//           onDescriptionChange={(description) => handleDescriptionChange(scene.id, description)}
//           onAddCharacter={() => handleAddCharacter(scene.id)}
//           onRemoveCharacter={(characterIndex) => handleRemoveCharacter(scene.id, characterIndex)}
//           onCharacterChange={(characterIndex, characterName) =>
//             handleCharacterChange(scene.id, characterIndex, characterName)
//           }
//           onRemoveScene={() => handleRemoveScene(scene.id)}
//         />
//       ))}
//     </div>
//   );
// };

// export default EpisodeForm;


import React, { useState } from 'react';
import Scene from './Scene';

interface EpisodeFormProps {
  episodeId: string;
}

interface SceneData {
  id: string;
  location: string;
  description: string;
  characters: string[];
}

const EpisodeForm: React.FC<EpisodeFormProps> = ({ episodeId }) => {
  const [scenes, setScenes] = useState<SceneData[]>([]);

  const handleAddScene = () => {
    const newScene: SceneData = {
      id: String(Date.now()), // Generate a unique ID for the scene
      location: '',
      description: '',
      characters: [],
    };

    setScenes((prevScenes) => [...prevScenes, newScene]);
  };

  const handleRemoveScene = (sceneId: string) => {
    setScenes((prevScenes) => prevScenes.filter((scene) => scene.id !== sceneId));
  };

  const handleLocationChange = (sceneId: string, location: string) => {
    setScenes((prevScenes) =>
      prevScenes.map((scene) =>
        scene.id === sceneId ? { ...scene, location } : scene
      )
    );
  };

  const handleDescriptionChange = (sceneId: string, description: string) => {
    setScenes((prevScenes) =>
      prevScenes.map((scene) =>
        scene.id === sceneId ? { ...scene, description } : scene
      )
    );
  };

  const handleAddCharacter = (sceneId: string) => {
    setScenes((prevScenes) =>
      prevScenes.map((scene) =>
        scene.id === sceneId ? { ...scene, characters: [...scene.characters, ''] } : scene
      )
    );
  };

  const handleRemoveCharacter = (sceneId: string, characterIndex: number) => {
    setScenes((prevScenes) =>
      prevScenes.map((scene) =>
        scene.id === sceneId
          ? { ...scene, characters: scene.characters.filter((_, index) => index !== characterIndex) }
          : scene
      )
    );
  };

  const handleCharacterChange = (
    sceneId: string,
    characterIndex: number,
    characterName: string
  ) => {
    setScenes((prevScenes) =>
      prevScenes.map((scene) =>
        scene.id === sceneId
          ? {
              ...scene,
              characters: scene.characters.map((character, index) =>
                index === characterIndex ? characterName : character
              ),
            }
          : scene
      )
    );
  };

  return (
    <div>
      <button onClick={handleAddScene}>Add Scene</button>
      {scenes.map((scene) => (
        <Scene
          key={scene.id}
          scene={scene}
          onLocationChange={(location) => handleLocationChange(scene.id, location)}
          onDescriptionChange={(description) => handleDescriptionChange(scene.id, description)}
          onAddCharacter={() => handleAddCharacter(scene.id)}
          onRemoveCharacter={(characterIndex) => handleRemoveCharacter(scene.id, characterIndex)}
          onCharacterChange={(characterIndex, characterName) =>
            handleCharacterChange(scene.id, characterIndex, characterName)
          }
          onRemoveScene={() => handleRemoveScene(scene.id)}
        />
      ))}
    </div>
  );
};

export default EpisodeForm;
