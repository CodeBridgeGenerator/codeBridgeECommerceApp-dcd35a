import React from "react";
import { render, screen } from "@testing-library/react";

import ReturnsRefundsCreateDialogComponent from "../ReturnsRefundsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders returnsRefunds create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ReturnsRefundsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("returnsRefunds-create-dialog-component")).toBeInTheDocument();
});
