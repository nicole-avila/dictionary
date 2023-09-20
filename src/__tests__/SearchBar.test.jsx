import { fireEvent, waitFor, render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/SearchBar/SearchBar";

describe("Testing SearchBar Component", () => {
  it("should have text 'search your word' in search-input placeholder", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("search your word..")
    ).toBeInTheDocument();
  });

  it("should accept a user typing a word in search-input", async () => {
    render(<SearchBar searchWord={""} setSearchWord={vi.fn()} />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, "lady");
    expect(input).toHaveValue("lady");
  });

  it("should recive three props", async () => {
    const mockSearchWord = "lady";
    const mockSetSearchWord = vi.fn();
    const mockSetFavoriteStar = vi.fn();
    render(
      <SearchBar
        searchWord={mockSearchWord}
        setSearchWord={mockSetSearchWord}
        setFavoriteStar={mockSetFavoriteStar}
      />
    );
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, "lady");

    expect(mockSetSearchWord).toHaveBeenCalledWith(mockSearchWord);
    //   expect(mockSetFavoriteStar).toBe(false);
  });

  it("should display a message when searching no word", async () => {
    render(<SearchBar searchWord={""} setSearchWord={vi.fn()} />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, "''{Enter}");

    expect(
      screen.getByText("Please enter a word to search")
    ).toBeInTheDocument();
  });

  vi.mock("../../fetch/fetchFreeDictionary", () => ({
    fetchFreeDictionary: async () => ({ message: "Sorry pal, no word found" }),
  }));

  it("should display a message when the word do not exsist", async () => {
    render(<SearchBar searchWord={""} setSearchWord={() => {}} />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, "'soåkvf' {Enter}"); //simulerar ett sökord

    expect(screen.getByText("Sorry pal, no word found")).toBeInTheDocument();
    // const setMessage = await screen.findByText("Sorry pal, no word found");
    // expect(setMessage).toBeInTheDocument();

    // expect(
    //     screen.getByText(
    //       "Sorry pal, we couldn't find definitions for the word you were looking for."
    //     )
  });
});

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
//   });
