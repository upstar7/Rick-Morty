import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Cookies from 'js-cookie';

interface Scene {
  id: string;
  location: string;
  description: string;
  characters: string[];
  imageChar: string;
}

interface Episode {
  id: string;
  name: string;
}

interface Character {
  id: string;
  name: string;
  image: string;
}

interface Location {
  id: string;
  name: string;
}

const GET_EPISODES = gql`
  query GetEpisodes {
    episodes {
      results {
        id
        name
      }
    }
    characters {
      results {
        id
        name
        image
      }
    }
    locations {
      results {
        id
        name
      }
    }
  }
`;

const App: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<string>('');
  const [selectedCharImage, setselectedCharImage] = useState<string>('null');
  const [scenes, setScenes] = useState<Scene[]>([]);

  const { loading, error, data } = useQuery(GET_EPISODES);

  useEffect(() => {
    if (data) {
      setEpisodes(data.episodes.results);
      setCharacters(data.characters.results);
      setLocations(data.locations.results);
    }
  }, [data]);

  const handleEpisodeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedEpisode(event.target.value);
    const savedScenes = Cookies.get(event.target.value);
    if (savedScenes) {
      setScenes(JSON.parse(savedScenes));
    } else {
      setScenes([]);
    }
  };

  const handleAddScene = (): void => {
    const newScene: Scene = {
      id: Date.now().toString(),
      location: '',
      description: '',
      characters: [],
      imageChar: '',
    };
    setScenes([...scenes, newScene]);
    Cookies.set(selectedEpisode, JSON.stringify([...scenes, newScene]));
  };

  const handleRemoveScene = (sceneId: string): void => {
    const updatedScenes = scenes.filter((scene) => scene.id !== sceneId);
    setScenes(updatedScenes);
    Cookies.set(selectedEpisode, JSON.stringify(updatedScenes));
  };

  const handleCharacterChange = (sceneId: string, selectedCharacters: string[], charImage: any): void => {
    console.log(charImage);
    
    const updatedScenes = scenes.map((scene) =>
      scene.id === sceneId ? { ...scene, characters: selectedCharacters, imageChar: charImage } : scene
    );
    setScenes(updatedScenes);
    Cookies.set(selectedEpisode, JSON.stringify(updatedScenes));
  };

  const handleLocationChange = (sceneId: string, location: string): void => {
    const updatedScenes = scenes.map((scene) =>
      scene.id === sceneId ? { ...scene, location } : scene
    );
    setScenes(updatedScenes);
    Cookies.set(selectedEpisode, JSON.stringify(updatedScenes));
  };

  const handleDescriptionChange = (sceneId: string, description: string): void => {
    const updatedScenes = scenes.map((scene) =>
      scene.id === sceneId ? { ...scene, description } : scene
    );
    setScenes(updatedScenes);
    Cookies.set(selectedEpisode, JSON.stringify(updatedScenes));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <div className="container mt-2">
      <h1>Rick and Morty Scene Drafting Tool</h1>
      <h2>Select an episode:</h2>
      <select className="form-select" value={selectedEpisode} onChange={handleEpisodeChange}>
        <option value="">Select an episode</option>
        {episodes.map((episode) => (
          <option key={episode.id} value={episode.id}>
            {episode.name}
          </option>
        ))}
      </select>
      {selectedEpisode && (
        <div className='my-2'>
          <h2>Episode Scenes</h2>
          <button className="btn btn-primary my-3" onClick={handleAddScene}>Add Scene</button>
          {scenes.map((scene) => (
            <div key={scene.id}>
              <h4>Scene {scene.id}</h4>
              <div className="d-flex align-items-start">
              <label className='me-2'>
                Location:
                <select
                  className="form-select"
                  value={scene.location}
                  onChange={(e) => handleLocationChange(scene.id, e.target.value)}
                >
                  <option value="">Select a locations</option>
                  {locations.map((character) => (
                    <option key={character.id} value={character.name}>
                      {character.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className='me-2'>
                Description:
                <input
                  type="text"
                  className="form-control"
                  placeholder='Enter description'
                  value={scene.description}
                  onChange={(e) => handleDescriptionChange(scene.id, e.target.value)}
                />
              </label>
              <label className='me-2'>
                Characters:
                <select
                  className="form-select"
                  value={scene.characters}
                  onChange={(e) => handleCharacterChange(scene.id, Array.from(e.target.selectedOptions, option => option.value), e.target.value.split("-")[1])}
                >
                  <option value="">Select a character</option>
                  {characters.map((character) => (
                    <option key={character.id} value={character.name + "-" + character.image}>
                      {character.name}
                    </option>
                  ))}
                </select>
              </label>
              {
                selectedCharImage !== undefined ?
                <img src={scene.imageChar} width={150} alt="" className='me-2'/>
                : ""
              }
              </div>
              <button className="btn btn-danger" onClick={() => handleRemoveScene(scene.id)}>Remove Scene</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
