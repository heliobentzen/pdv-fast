import { lazy } from "react";

export const moduleRegistry = {
    productlist: lazy(() => import("../Card/ProductList")),
    order: lazy(() => import("../Card/Order")),
    orderStatus: lazy(() => import("../Card/OrderStatusModule")),
};