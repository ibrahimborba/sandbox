import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal: string): [string[], string] {
  const results = useQuery({
    queryKey: ["details", animal],
    queryFn: fetchBreedList,
  });
  return [results?.data?.breeds ?? [], status];
}
