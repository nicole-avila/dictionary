import { render, screen, waitFor, within } from "@testing-library/react";
import { it, expect } from "vitest";
import App from "../App";
import SearchBar from "../components/SearchBar/SearchBar";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php",
    (_req, res, ctx) => res(ctx.json({ word: mockWords }))
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());

it("should render app", () => {
  render(<App />);
});

it("should toggle favoriteList when heart-icon is clicked", () => {
  const { getByAltText } = render(<App />);
  const user = userEvent.setup();
  const heartIcon = getByAltText("icon in a shape of a heart");
  user.click(heartIcon);

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

it("should search for a word, like it, and see the favorite word in the favorites List", async () => {
  render(<App />);
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");
  await user.type(input, "lady {Enter}");

  const imgTag = await screen.findByAltText("heart shape icon");
  user.click(imgTag);

  const favoriteList = await screen.findByAltText("icon in a shape of a heart");
  expect(favoriteList).toBeInTheDocument();
  user.click(favoriteList);

  const favoriteWord = screen.getByText("lady");
  expect(favoriteWord).toBeInTheDocument();
});

it("should remove a favorite word from the favorite list", async () => {
  const { container } = render(<App />);
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");
  await user.type(input, "lady {Enter}");

  const imgTag = await screen.findByAltText("heart shape icon");
  user.click(imgTag);

  const favoriteList = await screen.findByAltText("icon in a shape of a heart");
  expect(favoriteList).toBeInTheDocument();
  await user.click(favoriteList);

  const favoriteWord = screen.getByText("lady");
  expect(favoriteWord).toBeInTheDocument();

  const removeBtn = await screen.findByText(/remove word/i);
  expect(removeBtn).toBeInTheDocument();
  await user.click(removeBtn);

  await waitFor(() => {
    expect(favoriteWord).not.toBeInTheDocument();
  });

  // user.click(removeBtn);
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

  const audioSource = audioElement.querySelector("source");
  expect(audioSource).toBeInTheDocument();

  audioElement.play();

  await waitFor(() => {
    expect(audioElement).toBeTruthy();
  });
});
