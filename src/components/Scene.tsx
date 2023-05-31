// import React from 'react';

// interface SceneProps {
//   scene: {
//     id: string;
//     location: string;
//     description: string;
//     characters: string[];
//   };
//   onLocationChange: (location: string) => void;
//   onDescriptionChange: (description: string) => void;
//   onAddCharacter: () => void;
//   onRemoveCharacter: (characterIndex: number) => void;
//   onCharacterChange: (characterIndex: number, characterName: string) => void;
//   onRemoveScene: () => void;
// }

// const Scene: React.FC<SceneProps> = ({
//   scene,
//   onLocationChange,
//   onDescriptionChange,
//   onAddCharacter,
//   onRemoveCharacter,
//   onCharacterChange,
//   onRemoveScene,
// }) => {
//   const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onLocationChange(e.target.value);
//   };

//   const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     onDescriptionChange(e.target.value);
//   };

//   const handleCharacterChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     characterIndex: number
//   ) => {
//     onCharacterChange(characterIndex, e.target.value);
//   };

//   return (
//     <div>
//       <button onClick={onRemoveScene}>Remove Scene</button>

//       <label>
//         Location:
//         <input type="text" value={scene.location} onChange={handleLocationChange} />
//       </label>

//       <label>
//         Description:
//         <textarea value={scene.description} onChange={handleDescriptionChange} />
//       </label>

//       <h4>Characters:</h4>
//       {scene.characters.map((character, index) => (
//         <div key={index}>
//           <input
//             type="text"
//             value={character}
//             onChange={(e) => handleCharacterChange(e, index)}
//           />
//           <button onClick={() => onRemoveCharacter(index)}>Remove Character</button>
//         </div>
//       ))}

//       <button onClick={onAddCharacter}>Add Character</button>
//     </div>
//   );
// };

// export default Scene;

import React from "react";

interface SceneProps {
    scene: {
        id: string;
        location: string;
        description: string;
        characters: string[];
    };
    onLocationChange: (location: string) => void;
    onDescriptionChange: (description: string) => void;
    onAddCharacter: () => void;
    onRemoveCharacter: (characterIndex: number) => void;
    onCharacterChange: (characterIndex: number, characterName: string) => void;
    onRemoveScene: () => void;
}

const Scene: React.FC<SceneProps> = ({
    scene,
    onLocationChange,
    onDescriptionChange,
    onAddCharacter,
    onRemoveCharacter,
    onCharacterChange,
    onRemoveScene,
}) => {
    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onLocationChange(e.target.value);
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        onDescriptionChange(e.target.value);
    };

    const handleCharacterChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        characterIndex: number
    ) => {
        onCharacterChange(characterIndex, e.target.value);
    };

    return (
        <div>
            <button onClick={onRemoveScene}>Remove Scene</button>

            <label>
                Location:
                <input
                    type="text"
                    value={scene.location}
                    onChange={handleLocationChange}
                />
            </label>

            <label>
                Description:
                <textarea
                    value={scene.description}
                    onChange={handleDescriptionChange}
                />
            </label>

            <h4>Characters:</h4>
            {scene.characters.map((character, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={character}
                        onChange={(e) => handleCharacterChange(e, index)}
                    />
                    <button onClick={() => onRemoveCharacter(index)}>
                        Remove Character
                    </button>
                </div>
            ))}

            <button onClick={onAddCharacter}>Add Character</button>
        </div>
    );
};

export default Scene;
