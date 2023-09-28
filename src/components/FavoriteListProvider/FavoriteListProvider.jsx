import { createContext, useReducer } from "react";
/*
An initinal state object with a favorites array, it then implements a reducer
function below thats takes the current state and an action as parameters.
The reducer handles two types of actions ADD_FAVORITE and REMOVE_FAVORITE an returns a new state bases on the atcion type.
*/
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

/*
My Component FavoriteListProvider uses the useReducer hook to initialize the state and get the state and dispatch values.
It has two functions: 1. handleAddFavorite that handles adding a favorite word TO the list
2. handleRemoveFavorite is to handle removing a favorite FROM the list.
It then renders the FavoriteListContext.Provider component, passing the state values and functions as the context value.
And renders the children prop, which represents the nested components within the FavoriteListProvider.
*/

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
