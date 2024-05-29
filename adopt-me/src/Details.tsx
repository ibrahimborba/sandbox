import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import ErrorBoundary from "./ErrorBoundary";
import { useContext, useState } from "react";
import Modal from "./Modal";
import AdoptPetContext from "./AdoptPetContext";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptPetContext);
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
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal && (
          <Modal>
            <section>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </section>
          </Modal>
        )}
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
