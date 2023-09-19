import { createContext, useReducer } from "react";

const initialState = {
  favorites: [],
};

function favoriteListReducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.word !== action.payload
        ),
      };
    default:
      return state;
  }
}

export const FavoriteListContext = createContext(null);

export function FavoriteListProvider({ children }) {
  const [state, dispatch] = useReducer(favoriteListReducer, initialState);

  function handleAddFavorite(word) {
    dispatch({ type: "ADD_FAVORITE", payload: word });
  }
  function handleRemoveFavorite(word) {
    dispatch({ type: "REMOVE_FAVORITE", payload: word });
  }

  return (
    <FavoriteListContext.Provider
      value={{
        favorites: state.favorites,
        addFavorite: handleAddFavorite,
        removeFavorite: handleRemoveFavorite,
      }}
    >
      {children}
    </FavoriteListContext.Provider>
  );
}
