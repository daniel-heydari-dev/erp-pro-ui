import { Outlet } from "react-router-dom";

import { SearchProvider } from "@/contexts/SearchContext";
import { TransitionProvider } from "@/contexts/TransitionContext";

const AppProvidersLayout = () => {
  return (
    <TransitionProvider>
      <SearchProvider>
        <Outlet />
      </SearchProvider>
    </TransitionProvider>
  );
};

export default AppProvidersLayout;
