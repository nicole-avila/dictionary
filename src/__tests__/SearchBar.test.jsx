import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import { server } from "./mocks/server";
import userEvent from "@testing-library/user-event";
import SearchBar from "../components/SearchBar/SearchBar";
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

  it("should display a message when the word dose not exsist", async () => {
    render(<SearchBar mockWords={mockWords} />);
    const user = userEvent.setup();
    const input = screen.getByRole("textbox");

    await user.type(input, "{Enter}");
    expect(screen.findByText("Loading.."));

    expect(
      screen.getByText("Please enter a word to search")
    ).toBeInTheDocument();
  });
});
