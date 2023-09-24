import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import { DarkThemeProvider } from "../components/DarkTheme/DarkThemeContext";
import DarkThemeButton from "../components/DarkTheme/DarkThemeButton";
import userEvent from "@testing-library/user-event";
import { DarkModeContext } from "../components/DarkTheme/DarkThemeContext";

describe(" Testing FavoriteList component ", () => {
  it("should render whitout crashing", () => {
    render(
      <DarkThemeProvider>
        <DarkThemeButton />
      </DarkThemeProvider>
    );
  });
});
/////////////////////////////////
//   it("should toggles dark mode when its clicked", () => {
//     const mockValue = {
//       darkMode: false,
//       handleDarkMode: vi.fn(),
//     };
//     const user = userEvent.setup();
//     const { container } = render(
//       <DarkThemeProvider>
//         <DarkThemeButton />
//       </DarkThemeProvider>
//     );

//     const themeToggle = container.querySelector(".theme-btn");
//     user.click(themeToggle);

//     // const user = userEvent.setup();
//     // const themeToggle = screen.getByLabelText("darkmode-toggle");
//   });
//   it("should toggles dark mode when its clicked", () => {
//     const mockValue = {
//       darkMode: false,
//       handleDarkMode: vi.fn(),
//     };
//     const user = userEvent.setup();
//     const { container } = render(
//       <DarkThemeProvider>
//         <DarkThemeButton />
//       </DarkThemeProvider>
//     );

//     const themeToggle = container.querySelector(".theme-btn");
//     user.click(themeToggle);

//     // const user = userEvent.setup();
//     // const themeToggle = screen.getByLabelText("darkmode-toggle");
//   });

// const themeToggle = screen.getByRole("checkbox", {
//   name: "darkmode-toggle",
// });
// const themeToggle = screen.getByLabelText("darkmode-toggle");
// const themeToggle = screen.getByRole("checkbox", {
//   name: "darkmode-toggle",
// });
