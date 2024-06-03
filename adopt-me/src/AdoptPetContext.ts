import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

const AdoptPetContext = createContext<[Pet | null, (adoptedPet: Pet) => void]>([
  {
    id: 1337,
    name: "Fido",
    animal: "dog",
    description: "Lorem ipsum",
    breed: "Dog",
    images: [],
    city: "City",
    state: "ST",
  },
  () => {},
]);

export default AdoptPetContext;
