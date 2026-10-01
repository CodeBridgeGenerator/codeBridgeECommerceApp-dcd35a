import React from "react";
import { render, screen } from "@testing-library/react";

import ProductColourPage from "../ProductColourPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders productColour page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProductColourPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("productColour-datatable")).toBeInTheDocument();
    expect(screen.getByRole("productColour-add-button")).toBeInTheDocument();
});
