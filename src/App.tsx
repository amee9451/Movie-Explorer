import React, { Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
const MovieDetails = React.lazy(() => import("./pages/MovieDetails"));
const Favorites = React.lazy(() => import("./pages/Favorites"));

const App: React.FC = () => (
  <div className="min-h-screen bg-gray-100">
    <header className="bg-blue-600 text-white p-4 text-xl font-bold">
      <div className="container mx-auto flex justify-between">
        <Link to="/">Movie Explorer</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </header>
    <main className="container mx-auto p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Suspense>
    </main>
  </div>
);

export default App;
