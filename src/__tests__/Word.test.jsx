import { render, screen } from "@testing-library/react";
import { server } from "./mocks/server";
import { it, expect } from "vitest";
import { FavoriteListProvider } from "../components/FavoriteListProvider/FavoriteListProvider";
import userEvent from "@testing-library/user-event";
import mockWords from "./mocks/mockWords.json";
import Word from "../components/DisplaySearchWord/Word";
import DisplaySearchWord from "../components/DisplaySearchWord/DisplaySearchWord";

beforeAll(() => server.listen());
afterAll(() => server.close());

describe(" Testing FavoriteList component ", () => {
  it("should render whitout crashing", () => {
    render(
      <FavoriteListProvider>
        <Word word={mockWords[0]} />
      </FavoriteListProvider>
    );
  });

  it("should toggle audio visibility when its clicked", async () => {
    render(
      <FavoriteListProvider>
        <DisplaySearchWord searchWord={mockWords} />
      </FavoriteListProvider>
    );
    const user = userEvent.setup();
    expect(screen.getByText("lady")).toBeInTheDocument();
    await user.click();

    const phoneticsSpellingTitle = screen.getByText(
      "click here for phonetics spelling"
    );
    user.click(phoneticsSpellingTitle);

    const audio = screen.getAllByTestId("audio"); // Logen visar två audio, en tom och en med url
    expect(audio).toHaveLength(2);
  });
});
