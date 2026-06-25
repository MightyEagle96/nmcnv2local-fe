import React, { createContext, useContext, useState } from "react";

export interface ActiveProgramme {
  _id: string;
  index: number;
  name: string;
  code: string;
}

type ActiveProgrammeContextType = {
  activeProgramme: ActiveProgramme | null;
  setActiveProgramme: React.Dispatch<
    React.SetStateAction<ActiveProgramme | null>
  >;
};

const ActiveProgrammeContext = createContext<
  ActiveProgrammeContextType | undefined
>(undefined);

type Props = {
  children: React.ReactNode;
};

export const ActiveProgrammeProvider = ({ children }: Props) => {
  const [activeProgramme, setActiveProgramme] =
    useState<ActiveProgramme | null>(null);

  return (
    <ActiveProgrammeContext.Provider
      value={{ activeProgramme, setActiveProgramme }}
    >
      {children}
    </ActiveProgrammeContext.Provider>
  );
};

export const useActiveProgramme = () => {
  const context = useContext(ActiveProgrammeContext);
  if (!context) {
    throw new Error(
      "useActiveProgramme must be used within an ActiveProgrammeProvider",
    );
  }
  return context;
};
