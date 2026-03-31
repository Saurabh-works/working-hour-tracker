import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the playful tracker heading and primary action", () => {
  render(<App />);

  expect(screen.getByText(/work hours tracker/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /calculate logout time/i }),
  ).toBeInTheDocument();
});
