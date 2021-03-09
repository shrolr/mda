import React, { useEffect } from "react";
import { Routes } from "./Routes";
import { StateProvider } from "./context/state";
interface ProvidersProps { }

export const Providers: React.FC<ProvidersProps> = ({ }) => {
  return (
    <StateProvider>
      <Routes />
    </StateProvider>
  );
};
