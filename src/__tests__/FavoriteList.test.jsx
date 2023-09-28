import { render, screen } from "@testing-library/react";
import { server } from "./mocks/server";
import { it, expect } from "vitest";
import { FavoriteListProvider } from "../components/FavoriteListProvider/FavoriteListProvider";
import userEvent from "@testing-library/user-event";
import mockWords from "./mocks/mockWords.json";
import FavoriteList from "../components/FavoriteList/FavoriteList";

beforeAll(() => server.listen());
afterAll(() => server.close());

describe(" Testing FavoriteList component ", () => {
  it("should render FavoriteList Component with a title", () => {
    render(
      <FavoriteListProvider>
        <FavoriteList />
      </FavoriteListProvider>
    );
    const favoriteListTitle = screen.getByRole("heading", "dina favoriter");
    expect(favoriteListTitle).toBeInTheDocument();
  });

  it("should toggel information from favorite word in the Favorite List", async () => {
    const { container } = render(
      <FavoriteListProvider>
        <FavoriteList mockWords={mockWords} />
      </FavoriteListProvider>
    );
    const user = userEvent.setup();

    const favoriteWord = container.querySelector(".favorites__word");
    await user.click(favoriteWord);

    const phoneticsTitle = screen.getByRole("heading", "PHONETICS SPELLING");
    expect(phoneticsTitle).toBeInTheDocument();

    const meaningsTitle = screen.getByRole("heading", "MEANINGS");
    expect(meaningsTitle).toBeInTheDocument();
  });

  it("should remove a favorite word", async () => {
    const { container } = render(
      <FavoriteListProvider>
        <FavoriteList mockWords={mockWords} />
      </FavoriteListProvider>
    );

    const user = userEvent.setup();
    const removeBtn = container.querySelector(".favorites__btn");
    await user.click(removeBtn);

    const removedWord = screen.queryByText("lady");
    expect(removedWord).not.toBeInTheDocument();
  });
});
