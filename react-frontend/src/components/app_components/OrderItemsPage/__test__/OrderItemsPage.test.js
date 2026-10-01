import React from "react";
import { render, screen } from "@testing-library/react";

import OrderItemsPage from "../OrderItemsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders orderItems page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <OrderItemsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("orderItems-datatable")).toBeInTheDocument();
    expect(screen.getByRole("orderItems-add-button")).toBeInTheDocument();
});
