import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import Loading from "../components/Loading/Loading";

describe(" Testing FavoriteList component ", () => {
  it("should render whitout crashing", () => {
    render(<Loading />);
  });

  it("should render whitout crashing", () => {
    render(<Loading />);

    expect(screen.getByText("Loading..")).toBeInTheDocument();
  });
});
