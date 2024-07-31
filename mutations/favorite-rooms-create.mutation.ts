import { gql } from 'apollo-angular';

export const ROOMS_FAVORITE_CREATE_MUTATION = gql`
  mutation CreateRoomFavorite($roomFavoriteCreateInput: RoomFavoriteCreateInput!) {
    createRoomFavorite(roomFavoriteCreateInput: $roomFavoriteCreateInput)
  }
`;
