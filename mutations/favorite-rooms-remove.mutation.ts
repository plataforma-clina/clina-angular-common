import { gql } from 'apollo-angular';

export const ROOMS_FAVORITE_REMOVE_MUTATION = gql`
  mutation RemoveRoomFavorite($roomFavoriteRemoveInput: RoomFavoriteRemoveInput!) {
    removeRoomFavorite(roomFavoriteRemoveInput: $roomFavoriteRemoveInput)
  }
`;
