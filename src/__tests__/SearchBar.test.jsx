import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/SearchBar/SearchBar";
import { server } from "./mocks/server";
import mockWords from "./mocks/mockWords.json";

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("Testing SearchBar Component", () => {
  it("should render..", () => {
    render(<SearchBar />);
  });

  it("should render Loading before api calls", async () => {
    render(<SearchBar mockWords={mockWords} />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    await user.type(input, "'lady'{Enter}");

    expect(screen.findByText("Loading.."));
  });

  it("should have a input field with a placholder", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("search your word..")
    ).toBeInTheDocument();
  });

  it("should accept a user typing a word in search-input", async () => {
    render(<SearchBar mockWords={mockWords} />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, "lady");
    expect(input).toHaveValue("lady");
  });

  vi.mock("../../fetch/fetchFreeDictionary", () => ({
    fetchFreeDictionary: async () => ({ message: "Sorry pal, no word found" }),
  }));
  //Lägg in message i din json fil!

  it("should display a message when the word dose not exsist", async () => {
    const { container } = render(<SearchBar mockWords={mockWords} />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, "{Enter}"); //simulerar ett sökord
    expect(screen.findByText("Loading.."));

    const message = container.querySelector(".search");

    expect(message.textContent).toBe("Please enter a word to search");
  });
});

////////////////////////////////////////////////
// it("should call the handleSubmit function when the form is submitted", async () => {
//     const mockSubmit = vi.fn();
//     render(<SearchBar handleSubmit={mockSubmit} setSearchWord={vi.fn()} />);
//     const user = userEvent.setup();
//     const input = screen.getByRole("textbox");

//     await user.type(input, "lady");
//     fireEvent.submit(input);

//     //   await waitFor(() => {
//     //     expect(mockSubmit).toHaveBeenCalled();
//     //   });
// });

//////////////////////////////////////////
// it("SearchBar component should recive two props", () => {
//   const mockSetSearchWord = vi.fn();
//   const mockSetFavoriteStar = vi.fn();
//   render(
//     <SearchBar
//       setSearchWord={mockSetSearchWord}
//       setFavoriteStar={mockSetFavoriteStar}
//     />
//   );

//   // expect(mockSetSearchWord).toHaveBeenCalledWith();
//   // expect(mockSetFavoriteStar).toBe(false);
// });
