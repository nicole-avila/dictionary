import { fireEvent, render } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import App from "../App";

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
