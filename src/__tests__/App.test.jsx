import { render, screen, waitFor, within } from "@testing-library/react";
import { it, expect } from "vitest";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Integration Testing on App ", () => {
  it("should render app", () => {
    render(<App />);
  });

  it("should search for a word, like it, and see the favorite word in the favorites List", async () => {
    render(<App />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    await user.type(input, "lady {Enter}");

    const imgTag = await screen.findByAltText("gray heart shape icon");
    user.click(imgTag);

    const favoriteList = await screen.findByAltText(
      "icon in a shape of a heart"
    );
    expect(favoriteList).toBeInTheDocument();
    user.click(favoriteList);

    const favoriteWord = screen.getByText("lady");
    expect(favoriteWord).toBeInTheDocument();
  });

  it("should toggle favoriteList when heart-icon is clicked", () => {
    const { getByAltText } = render(<App />);
    const user = userEvent.setup();
    const heartIcon = getByAltText("icon in a shape of a heart");
    user.click(heartIcon);

    expect(heartIcon).toBeInTheDocument();
  });

  it("should display correct word after submisson via click", async () => {
    render(<App />);

    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    await user.type(input, "lady {Enter}");

    const searchWord = screen.getByDisplayValue("lady");
    expect(searchWord).toBeInTheDocument();
  });

  it("should changes from light to dark mode", async () => {
    render(<App />);
    const user = userEvent.setup();
    const darkTheme = screen.getByRole("checkbox");
    const appBackground = screen.getByRole("banner");

    expect(darkTheme).toBeInTheDocument();
    // expect(appBackground).toHaveStyle("background-color: rgb(255,255,255)");

    await user.click(darkTheme);
    expect(appBackground).toHaveStyle("background-color: rgba(0,0,0,0)");
  });

  it("should display a message when the word dose not exsist", async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, "{Enter}"); //simulerar ett sökord
    expect(screen.findByText("Loading.."));

    const message = container.querySelector(".search");

    expect(message.textContent).toBe("Please enter a word to search");
  });

  it("should display a message when searching for word that dose not excist in the dictionary", async () => {
    render(<App />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, "'laady'{Enter}");
    const setMessage = await screen.findByText(
      "Sorry pal, we couldn't find definitions for the word you were looking for."
    );
    expect(setMessage).toBeInTheDocument();
  });

  it("should be able to hear audio", async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    await user.type(input, "lady {Enter}");

    const phoneticToggel = container.querySelector(".display__phonetics-title");
    user.click(phoneticToggel);

    const audioElement = await screen.findByTestId("audio");
    expect(audioElement).toBeInTheDocument();

    audioElement.play();

    await waitFor(() => {
      expect(audioElement).toBeTruthy();
    });
  });

  it("should search for a word, like it, and see the favorite word in the favorites List", async () => {
    render(<App />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    await user.type(input, "lady {Enter}");

    const imgTag = await screen.findByAltText("gray heart shape icon");
    user.click(imgTag);

    const favoriteList = await screen.findByAltText(
      "icon in a shape of a heart"
    );
    expect(favoriteList).toBeInTheDocument();
    user.click(favoriteList);

    const favoriteWord = screen.getByText("lady");
    expect(favoriteWord).toBeInTheDocument();
  });

  it("should remove a favorite word from the favorite list", async () => {
    render(<App />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    await user.type(input, "lady {Enter}");

    const imgTag = await screen.findByAltText("gray heart shape icon");
    user.click(imgTag);

    const favoriteList = await screen.findByAltText(
      "icon in a shape of a heart"
    );
    expect(favoriteList).toBeInTheDocument();
    user.click(favoriteList);

    const favoriteWord = screen.getByText("lady");
    expect(favoriteWord).toBeInTheDocument();

    const removeBtn = await screen.findByText(/remove word/i);
    expect(removeBtn).toBeInTheDocument();
    await user.click(removeBtn);

    await waitFor(() => {
      expect(favoriteWord).not.toBeInTheDocument();
    });
  });
});

////////////////////////////////

// it("DisplaySearch component should recive three props", () => {
//   const mockSearchWord = "lady";
//   const mockSetSearchWord = vi.fn();
//   const mockSetFavoriteStar = vi.fn();
//   render(
//     <DisplaySearchWord
//       SearchWord={mockSearchWord}
//       setSearchWord={mockSetSearchWord}
//       setFavoriteStar={mockSetFavoriteStar}
//     />
//   );

/////////////////////////////////

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
