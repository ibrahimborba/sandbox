import { render } from "@testing-library/react";
import { test, expect } from "vitest";
import { StaticRouter } from "react-router-dom/server";
import Pet from "../Pet";

test("display a default thumbnail", async () => {
  const pet = render(
    <StaticRouter>
      <Pet />
    </StaticRouter>,
  );

  const petThumbnail = await pet.findByTestId("thumbnail");
  expect(petThumbnail.src).toContain("none.jpg");
  pet.unmount();
});

test("display a non default thumbnail", async () => {
    const pet = render(
      <StaticRouter>
        <Pet images={["1.jpg", "2.jpg", "3.jpg"]} />
      </StaticRouter>,
    );
  
    const petThumbnail = await pet.findByTestId("thumbnail");
    expect(petThumbnail.src).toContain("1.jpg");
    pet.unmount();
  });