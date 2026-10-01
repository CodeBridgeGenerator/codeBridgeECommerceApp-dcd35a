import React from "react";
import { render, screen } from "@testing-library/react";

import ProductColourCreateDialogComponent from "../ProductColourCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders productColour create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProductColourCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("productColour-create-dialog-component")).toBeInTheDocument();
});
