import React from "react";
import { render, screen } from "@testing-library/react";

import ReturnsRefundsEditDialogComponent from "../ReturnsRefundsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders returnsRefunds edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ReturnsRefundsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("returnsRefunds-edit-dialog-component")).toBeInTheDocument();
});
