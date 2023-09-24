import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import Header from "../components/Header/Header";
import { DarkThemeProvider } from "../components/DarkTheme/DarkThemeContext";

describe(" Testing FavoriteList component ", () => {
  it("should render whitout crashing", () => {
    <DarkThemeProvider>
      <Header />
    </DarkThemeProvider>;
  });

  it("should render title, Dictionery, img-tag and paragraph", () => {
    render(
      <DarkThemeProvider>
        <Header setFavoriteListVisible={vi.fn()} />
      </DarkThemeProvider>
    );
    expect(screen.getByText("dictionary")).toBeInTheDocument();
    expect(
      screen.getByAltText("icon in a shape of a heart")
    ).toBeInTheDocument();
    expect(screen.getByText("favorites")).toBeInTheDocument();
  });
});
