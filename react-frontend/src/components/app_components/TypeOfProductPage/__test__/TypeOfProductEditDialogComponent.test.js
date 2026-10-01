import React from "react";
import { render, screen } from "@testing-library/react";

import TypeOfProductEditDialogComponent from "../TypeOfProductEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders typeOfProduct edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TypeOfProductEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("typeOfProduct-edit-dialog-component")).toBeInTheDocument();
});
