import {createContext} from 'react';
import {Post} from "../types";

interface AppContextProviderType {
  currentPostIndex: number | null;
  setCurrentPostIndex: (index: number) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}

const AppContext = createContext<AppContextProviderType | null>(null);

export default AppContext;