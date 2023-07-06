import React from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "src/store";
import { modalsRegistry } from "./modals-provider.constants";
import { ModalName } from "src/store/modals";

export const ModalsProvider = observer(() => {
  const modals = useStore("modals");

  return (
    <>
      {Object.entries(modals.registry).map(([name, props]) => {
        const ModalComponent = modalsRegistry[name as ModalName];
        const isOpen = !!modals.registry[name as ModalName];

        return (
          <ModalComponent
            key={name}
            {...(props as any)}
            isOpen={isOpen}
            onClose={() => modals.close(name as ModalName)}
          />
        );
      })}
    </>
  );
});
