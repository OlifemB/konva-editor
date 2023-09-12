import React, {createContext} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import Router from "@/pages";
import RootStore from './store';
import App from "@/pages/app";

const store = RootStore.create({});
export const StoreContext = createContext(store);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
            <App/>
    </React.StrictMode>
)