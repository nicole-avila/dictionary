import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import App from "../App";

it("should render the correct header", () => {
  render(<App />);
  expect(screen.getByText("hello world")).toBeInTheDocument();
});
