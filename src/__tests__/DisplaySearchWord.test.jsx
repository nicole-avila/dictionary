import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import { server } from "./mocks/server";
import { FavoriteListProvider } from "../components/FavoriteListProvider/FavoriteListProvider";
import DisplaySearchWord from "../components/DisplaySearchWord/DisplaySearchWord";
import mockWords from "./mocks/mockWords.json";
import userEvent from "@testing-library/user-event";

beforeAll(() => server.listen());
afterAll(() => server.close());

describe("Testing DisplaySearchWord Component", () => {
  it("should render component without crashing..", () => {
    render(
      <FavoriteListProvider>
        <DisplaySearchWord
          searchWord={mockWords}
          setFavoriteStar={mockWords} //behövs dom dom funktionerna vara med ?
          setSearchBar={mockWords}
        />
      </FavoriteListProvider>
    );
  });

  it("should render a word", async () => {
    render(
      <FavoriteListProvider>
        <DisplaySearchWord
          searchWord={mockWords}
          setFavoriteStar={mockWords} //behövs dom dom funktionerna vara med ?
          setSearchBar={mockWords}
        />
      </FavoriteListProvider>
    );

    const WordElement = screen.getByText("lady");
    expect(WordElement).toBeInTheDocument();
  });

  it("should render details from searchWord", async () => {
    render(
      <FavoriteListProvider>
        <DisplaySearchWord searchWord={mockWords} />
      </FavoriteListProvider>
    );
    const user = userEvent.setup();
    expect(screen.getByText("lady")).toBeInTheDocument();
    expect(screen.getByRole("img", "heart shape icon")).toBeInTheDocument();
    expect(screen.getAllByText("/ˈleɪdi/")).toHaveLength(2);
    expect(screen.getByTestId("audio")).toBeInTheDocument();

    expect(screen.getByText("EXEMPEL OF MEANINGS")).toBeInTheDocument();
    expect(screen.getAllByText("noun")).toHaveLength(2);
    expect(screen.getAllByRole("listitem")).toHaveLength(18);
  });

  it("should toggle favorite icon from empty heart to filled on click", async () => {
    render(
      <FavoriteListProvider>
        <DisplaySearchWord searchWord={mockWords} setSearchWord={vi.fn()} />
      </FavoriteListProvider>
    );
    const user = userEvent.setup();
    expect(screen.getByText("lady")).toBeInTheDocument();
    const heartEmpty = screen.getByRole("img", "gray heart shape icon");
    expect(heartEmpty.src).toContain("heart-empty.svg");
    expect(heartEmpty).toBeInTheDocument();

    await user.click(heartEmpty);

    const heartFilled = screen.getByRole("img", "pink heart shape icon");
    expect(heartFilled).toBeInTheDocument();
  });
});
