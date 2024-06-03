import Pet from "./Pet";

const Results = ({ list }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {!list.length ? (
        <h1>No Pets Found</h1>
      ) : (
        list.map((element) => (
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
