import { useContext, useState, useTransition } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import AdoptPetContext from "./AdoptPetContext";
import { Animal } from "./APIResponsesTypes";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    animal: "" as Animal,
    location: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);
  const [isPending, startTransition] = useTransition();
  const [adoptedPet] = useContext(AdoptPetContext);

  const results = useQuery({
    queryKey: ["search", requestParams],
    queryFn: fetchSearch,
  });
  const pets = results?.data?.pets ?? [];

  return (
    <section className="mx-auto my-0 w-11/12">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal: formData.get("animal")?.toString() as Animal ?? ("" as Animal),
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          startTransition(() => {
            setRequestParams(obj);
          });
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
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
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
        {isPending ? (
          <div>
            <h2 className="loader">Loading</h2>
          </div>
        ) : (
          <button className="rounded border-none bg-orange-500 px-6 text-white hover:opacity-50">
            Submit
          </button>
        )}
      </form>
      <Results list={pets} />
    </section>
  );
};

export default SearchParams;
