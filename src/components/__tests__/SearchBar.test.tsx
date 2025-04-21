import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import SearchBar from "../SearchBar"; // Adjust path as needed
import { sanitizeInput } from "../../utils/sanitizeInput";
jest.mock("../../utils/sanitizeInput");

describe("SearchBar Component", () => {
  const mockHandleSearch = jest.fn();

  it("should render with initialState and update input value", () => {
    const { getByPlaceholderText } = render(
      <SearchBar handleSearch={mockHandleSearch} initialState="Batman" />,
    );

    const input = getByPlaceholderText(
      "Search for movie...",
    ) as HTMLInputElement;
    expect(input.value).toBe("Batman");

    fireEvent.change(input, { target: { value: "Inception" } });
    expect(input.value).toBe("Inception");
  });

  it("should call handleSearch on button click", () => {
    const { getByPlaceholderText, getByRole } = render(
      <SearchBar handleSearch={mockHandleSearch} initialState="" />,
    );

    const input = getByPlaceholderText(
      "Search for movie...",
    ) as HTMLInputElement;
    const button = getByRole("button", { name: "Search" });

    fireEvent.change(input, { target: { value: "Matrix" } });
    fireEvent.click(button);

    expect(mockHandleSearch).toHaveBeenCalledWith("Matrix");
  });

  it("should call handleSearch on Enter key press", () => {
    const { getByPlaceholderText } = render(
      <SearchBar handleSearch={mockHandleSearch} initialState="" />,
    );

    const input = getByPlaceholderText(
      "Search for movie...",
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Interstellar" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(mockHandleSearch).toHaveBeenCalledWith("Interstellar");
  });

  it("sets query and triggers search on button click", async () => {
    (sanitizeInput as jest.Mock).mockImplementation((input) => input.trim());
    render(<SearchBar handleSearch={mockHandleSearch} initialState="" />);
    const input = screen.getByPlaceholderText(/Search for movie.../i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "batman " } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockHandleSearch).toHaveBeenCalledWith("batman ");
    });
  });

  it("renders search input and search button", () => {
    render(<SearchBar handleSearch={mockHandleSearch} initialState="" />);
    expect(
      screen.getByPlaceholderText(/Search for movie.../i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });
});
