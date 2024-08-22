import rootStore, {RootStore} from "../stores/RootStore";
import {Context, createContext, FC, ReactNode, useContext} from "react";

export const RootStoreContext: Context<RootStore | null> = createContext<RootStore | null>(null);

interface RootStoreProviderProps {
    children?: ReactNode;
}

export const RootStoreProvider: FC<RootStoreProviderProps> = (props: RootStoreProviderProps) => {
    return (
        <RootStoreContext.Provider value={rootStore}>
            {props.children}
        </RootStoreContext.Provider>
    );
}

export const useStore = (): RootStore => {
    const store: RootStore | null = useContext(RootStoreContext);
    if (!store) {
        throw new Error("useStore must be used within a StoreProvider.");
    }
    return store;
}