import { fireEvent, render, screen } from "@testing-library/react";
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
});

it("Should ", () => {
  const { getByAltText } = render(<App />);

  const heartIcon = getByAltText("icon in a shape of a heart");
  fireEvent.click(heartIcon);

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

it("should changes from light to dark mode", () => {
  render(<App />);
  const darkTheme = screen.getByRole("checkbox", "darkmode-toggle");

  const appBackground = screen.getByRole("dark-mode");
  // expect(appBackground).toHaveStyle("background: background: rgb(59, 57, 57)");

  expect(darkTheme).toBeInTheDocument();
});

///////////////////////////////////

//   expect(mockSetSearchWord).toHaveBeenCalledWith();
//   expect(mockSetFavoriteStar).toBe(false);

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

// Here are the accessible roles:

//   banner:

//   Name "":
//   <header
//     class="header"
//   />

//   --------------------------------------------------
//   checkbox:

//   Name "":
//   <input
//     id="darkmode-toggle"
//     type="checkbox"
//   />

//   --------------------------------------------------
//   heading:

//   Name "dictionary":
//   <h1
//     class="header__title"
//   />

//   --------------------------------------------------
//   img:

//   Name "icon in a shape of a heart":
//   <img
//     alt="icon in a shape of a heart"
//     class="header__heart-icon"
//     src="/src/assets/heart.svg"
//   />

//   --------------------------------------------------
//   textbox:

//   Name "":
//   <input
//     class="search__input"
//     placeholder="search your word.."
//     type="text"
//     value="lady "
//   />
