import { useContext } from 'react';
import { RootStoreContext } from '../providers/RootStoreProvider';

const useSelectedClub = () => {
  const context = useContext(RootStoreContext);
  return context.clubs.selected || {};
};

export default useSelectedClub;
