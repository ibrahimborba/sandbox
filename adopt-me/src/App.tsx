import "./App.css";
import Details from "./Details";
import SearchParams from "./SearchParams";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AdoptPetContext from "./AdoptPetContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptPetContext.Provider value={adoptedPet}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </AdoptPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
