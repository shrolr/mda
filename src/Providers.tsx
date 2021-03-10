import React  from "react";
import { Routes } from "./Routes";
import { StateProvider } from "./context/state";
import { Root } from "native-base";

interface ProvidersProps { }

export const Providers: React.FC<ProvidersProps> = ({ }) => {
  return (
    <Root>
      <StateProvider>
        <Routes />
      </StateProvider>
    </Root>
  );
};
