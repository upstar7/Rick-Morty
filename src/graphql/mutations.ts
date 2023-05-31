import { gql } from '@apollo/client';

export const ADD_SCENE = gql`
  mutation AddScene($episodeId: ID!) {
    addScene(episodeId: $episodeId) {
      id
      location
      description
      characters
    }
  }
`;

export const REMOVE_SCENE = gql`
  mutation RemoveScene($sceneId: ID!) {
    removeScene(sceneId: $sceneId)
  }
`;
