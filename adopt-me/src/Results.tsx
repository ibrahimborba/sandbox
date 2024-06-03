import { Pet as PetType } from "./APIResponsesTypes";
import Pet from "./Pet";

const Results = ({ pets }: { pets: PetType[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((element) => (
          <Pet
            key={element.id}
            id={element.id}
            name={element.name}
            animal={element.animal}
            breed={element.breed}
            images={element.images}
            location={`${element.city}, ${element.state}`}
          />
        ))
      )}
    </div>
  );
};

export default Results;
