import countersFactory from "./components/countersFactory.js";
import displayFactory from "./components/displayFactory.js";

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

const display = displayFactory(state.counters);
display.update();
countersFactory(state.counters, display);

//setInterval(() => console.log(state.counters), 200);
