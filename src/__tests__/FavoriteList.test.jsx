import { fireEvent, render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import { rest } from "msw";
import { setupServer } from "msw/node";
import FavoriteList from "../components/FavoriteList/FavoriteList";
import { FavoriteListProvider } from "../components/FavoriteListProvider/FavoriteListProvider";

it("should render FavoriteList Component", () => {
  render(
    <FavoriteListProvider>
      <FavoriteList />
    </FavoriteListProvider>
  );
});

it("should render FavoriteList with initinalState", () => {
  const { getByText } = render(
    <FavoriteListProvider>
      <FavoriteList />
    </FavoriteListProvider>
  );

  const headingElement = getByText(/dina favoriter/i);
  expect(headingElement).toBeInTheDocument();
});
