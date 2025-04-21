import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";

const App: React.FC = () => (
  <div className="min-h-screen bg-gray-100">
    <header className="bg-blue-600 text-white p-4 text-xl font-bold">
      <div className="container mx-auto flex justify-between">
        <Link to="/">Movie Explorer</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </header>
    <main className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </main>
  </div>
);

export default App;
