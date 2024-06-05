import { expect, test } from "vitest";
import Results from "../Results";
import { render } from "@testing-library/react";

test("renders correctly with no pets", async () => {
    const {asFragment} = render(<Results list={[]}/>)
    expect(asFragment()).toMatchSnapshot();
})