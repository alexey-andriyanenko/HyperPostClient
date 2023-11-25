import mitt from "mitt";

export type TEvents = {
  logout: undefined;
  login: undefined;
};

export const eventBus = mitt<TEvents>();
