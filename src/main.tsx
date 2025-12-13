import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { TooltipProvider } from "./components/ui/tooltip";
import App from "./App";
import "./index.css";
// import { unstable_setRequestLocale } from 'react-dom'; // not needed
// Just add this at the very top of your entry file:
import { RouterProvider } from 'react-router-dom';

// Or simply suppress them like this (cleanest way):
if (import.meta.env.DEV) {
  // @ts-ignore
  window.__REACT_ROUTER_FUTURE_FLAGS__ = {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  };
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <App />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>
);
