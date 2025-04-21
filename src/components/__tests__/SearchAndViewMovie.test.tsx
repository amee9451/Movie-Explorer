import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../../src/App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Search and View Movie Flow", () => {
  it("searches and displays movies", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        Search: [
          {
            Title: "Batman Begins",
            Year: "2005",
            imdbID: "tt0372784",
            Type: "movie",
            Poster: "https://example.com/batman.jpg",
          },
        ],
      },
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "Batman" },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(screen.getByText(/Batman Begins/i)).toBeInTheDocument();
    });
  });
});
