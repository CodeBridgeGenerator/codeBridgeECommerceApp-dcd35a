import React from "react";
import { render, screen } from "@testing-library/react";

import CouponsPage from "../CouponsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders coupons page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CouponsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("coupons-datatable")).toBeInTheDocument();
    expect(screen.getByRole("coupons-add-button")).toBeInTheDocument();
});
