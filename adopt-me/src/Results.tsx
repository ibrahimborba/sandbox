import Pet from "./Pet";
import { IResponsePet } from "./SearchParams";


interface IProps {
  list: IResponsePet[];
}

const Results = ({ list }: IProps) => {
  return (
    <div className="search">
      {!list.length ? (
        <h1>No Pets Found</h1>
      ) : (
        list.map((element) => (
          <Pet
            key={element.petID}
            petID={element.petID}
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
