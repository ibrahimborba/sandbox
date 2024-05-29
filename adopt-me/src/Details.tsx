import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import ErrorBoundary from "./ErrorBoundary";

const Details = () => {
  const { id } = useParams();
  const results = useQuery({ queryKey: ["details", id], queryFn: fetchPet });
  if (results.isLoading) {
    return (
      <div className="loading-panel">
        <h2 className="loader">Loading</h2>
      </div>
    );
  }
  const pet = results.data.pets[0];

  return (
    <>
      <section className="details">
        <h2>{pet.name}</h2>
        <h3>
          {pet.animal} - {pet.breed} - {pet.city},{pet.state}
        </h3>
        <button>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </section>
    </>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
