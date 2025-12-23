import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { TooltipProvider } from "./components/ui/tooltip";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

// Safety Check for API URL
if (!import.meta.env.VITE_API_URL) {
  console.error("CRITICAL: VITE_API_URL is not defined! API calls may fail.");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
