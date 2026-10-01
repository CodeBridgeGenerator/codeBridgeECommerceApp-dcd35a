import React from "react";
import { render, screen } from "@testing-library/react";

import OrderItemsEditDialogComponent from "../OrderItemsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders orderItems edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <OrderItemsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("orderItems-edit-dialog-component")).toBeInTheDocument();
});
