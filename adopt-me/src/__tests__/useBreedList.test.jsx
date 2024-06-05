import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBreedList from "../useBreedList";
import { renderHook, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { Provider } from "react-redux";
import store from "../store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
    },
  },
});

const ReduxProvider = ({ children, store }) => (
  <Provider store={store}>{children}</Provider>
);

test("gives an empty list with no animal provided", async () => {
  const { result } = renderHook(() => useBreedList(""), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </QueryClientProvider>
    ),
  });

  const [breedList, status] = result.current;
  expect(breedList).toHaveLength(0);
  expect(status).toBe("loaded");
});

test("gives back breeds when given an animal", async () => {
  const breeds = ["Havanese", "Poodle", "Labrador"];
  fetch.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
      breeds,
    }),
  );
  const { result } = renderHook(() => useBreedList("dog"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>{children}</ReduxProvider>
      </QueryClientProvider>
    ),
  });

  await waitFor(() => expect(result.current[1]).toBe("loaded"));

  const [breedList] = result.current;
  expect(breedList).toEqual(breeds);
});
