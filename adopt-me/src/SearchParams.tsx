import { useContext, useState } from "react";
import { IPet } from "./Pet";
import useBreedList from "./useBreedList";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import AdoptPetContext from "./AdoptPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

export interface IResponsePet extends IPet {
  id: number;
  city: string;
  state: string;
}

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    animal: "",
    location: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptPetContext);

  const results = useQuery({
    queryKey: ["search", requestParams],
    queryFn: fetchSearch,
  });
  const pets = results?.data?.pets ?? [];

  return (
    <section className="mx-auto my-0 w-11/12">
      <form
        className="mb-10 flex flex-col justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet && (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        )}
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            className="search-input"
            placeholder="Location"
          ></input>
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            className="search-input"
            name="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            className="search-input grayed-out-disabled"
            name="breed"
            disabled={breeds.length < 1}
          >
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button className="rounded border-none bg-orange-500 px-6 text-white hover:opacity-50">
          Submit
        </button>
      </form>
      <Results list={pets} />
    </section>
  );
};

export default SearchParams;
