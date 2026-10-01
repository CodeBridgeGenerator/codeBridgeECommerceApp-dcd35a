import React from "react";
import { render, screen } from "@testing-library/react";

import InventoryPage from "../InventoryPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders inventory page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InventoryPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("inventory-datatable")).toBeInTheDocument();
    expect(screen.getByRole("inventory-add-button")).toBeInTheDocument();
});
