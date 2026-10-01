import React from "react";
import { render, screen } from "@testing-library/react";

import TypeOfProductCreateDialogComponent from "../TypeOfProductCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders typeOfProduct create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TypeOfProductCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("typeOfProduct-create-dialog-component")).toBeInTheDocument();
});
