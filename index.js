import countersFactory from "./components/countersFactory.js";

const state = {
  counters: [
    {
      value: 0,
      increment: 1,
    },
    {
      value: 0,
      increment: 2,
    },
    {
      value: 0,
      increment: 3,
    },
  ],
};

countersFactory(state.counters);
