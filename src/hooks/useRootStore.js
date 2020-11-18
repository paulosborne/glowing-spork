import { useContext } from 'react';
import { RootStoreContext } from '../providers/RootStoreProvider';

const useRootStore = () => useContext(RootStoreContext);

export default useRootStore;
