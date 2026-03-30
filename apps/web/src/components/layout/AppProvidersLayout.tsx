import { Outlet } from 'react-router-dom';

import { SearchProvider } from '../context/SearchContext/SearchContext';
import { TransitionProvider } from '../context/TransitionContext/TransitionContext';

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
