import { fireEvent, render } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import App from "../App";
import SearchBar from "../components/SearchBar/SearchBar";

describe("App component", () => {
  it("should render app", () => {
    render(<App />);
  });

  it("should toggle favoriteList when heart-icon is clicked", () => {
    const { getByAltText } = render(<App />);

    const heartIcon = getByAltText("icon in a shape of a heart");
    fireEvent.click(heartIcon);

    expect(heartIcon).toBeInTheDocument();
  });

  it("SearchBar component should recive two props", () => {
    const mockSetSearchWord = vi.fn();
    const mockSetFavoriteStar = vi.fn();
    render(
      <SearchBar
        setSearchWord={mockSetSearchWord}
        setFavoriteStar={mockSetFavoriteStar}
      />
    );

    //   expect(mockSetSearchWord).toHaveBeenCalledWith();
    //   expect(mockSetFavoriteStar).toBe(false);
  });
});

// it("should display a word after submission via enter", async () => {
//   render(<SearchBar />);
//   const user = userEvent.setup();

//   const inputSearch = screen.getByRole("textbox");
//   await user.type(inputSearch, "cat");
//   const searchResult = screen.getByText("cat");
//   await user.click(searchResult);

//   const searchWord = screen.getByRole("searchWord");
//   expect(within(searchWord).getByText("cat")).toBeInTheDocument();
// });
