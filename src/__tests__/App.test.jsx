import { render, screen, waitFor } from "@testing-library/react";
import { it, expect } from "vitest";
import { DarkThemeProvider } from "../components/DarkTheme/DarkThemeContext";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Integration Testing on App ", () => {
  it("should render app", () => {
    render(<App />);
  });

  it("should changes from light to dark mode", async () => {
    render(
      <DarkThemeProvider>
        <App />
      </DarkThemeProvider>
    );
    const user = userEvent.setup();
    const darkTheme = screen.getByRole("checkbox");

    const bodyElement = document.body;
    expect(bodyElement).toHaveClass("light");
    await user.click(darkTheme);

    expect(bodyElement).toHaveClass("dark");
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

  it("should be able to hear audio", async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    await user.type(input, "lady {Enter}");

    expect(input).toBeInTheDocument();
    const Loading = await screen.findByText("Loading..");

    const phoneticToggel = await screen.findByText(
      "click here for phonetics spelling"
    );
    expect(Loading).not.toBeInTheDocument();
    await user.click(phoneticToggel);

    const audioElement = screen.getByTestId("audio");
    expect(audioElement).toBeInTheDocument();
    audioElement.play();

    await waitFor(() => {
      expect(audioElement).toBeTruthy();
    });
  });

  it("should display synonyms and antonyms", async () => {
    render(<App />);

    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    await user.type(input, "mood{Enter}");

    expect(screen.findByText("Loading.."));

    const searchWord = await screen.findAllByText("mood");
    expect(searchWord).toHaveLength(2);

    const antonyms = screen.getByRole("heading", { name: /antonyms/i });
    expect(antonyms).toBeInTheDocument();

    const synonyms = screen.getAllByRole("heading", { name: /synonyms/i });
    expect(synonyms).toHaveLength(5);
  });

  it("should display a message when the word dose not excist", async () => {
    const { container } = render(<App />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, "{Enter}");
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

  it("should search for a word, like it, and see the favorite word in the favorites List", async () => {
    render(<App />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    await user.type(input, "lady {Enter}");
    expect(input).toBeInTheDocument();

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

/* 
My tests in the App Component focus on how a user interacts with my application.
This includes testing different scenarios, such as switching between light and dark mode, 
switching the favorites list, searching for words, listening to sounds, showing synonyms and antonyms, and managing favorite words.

Using libraries like @testing-library/react and vitest. They help ensure that my application behaves correctly and meets the expectations of my users. 

My tests in my other components are based on unit tests and integration tests, which are important to ensure that my components work 
correctly both individually and together when they interact with each other. In all those components I have used 
the Mock Service Worker (MSW) which enables mocking of API calls to isolate the tests, which is a good approach for unit testing.
*/
