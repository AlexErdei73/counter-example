import counterFactory from "./components/counterFactory.js";

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

const newState = JSON.parse(JSON.stringify(state));

const countersContainer = document.querySelector("#counters-container");

const counters = [];
state.counters.forEach((counter, i) => {
  counter = counterFactory(
    state.counters[i],
    newState.counters[i],
    countersContainer
  );
  counter.init();
  counters[i] = counter;
});

setInterval(function () {
  state.counters.forEach((counter, i) => {
    for (const key in counter) {
      counters[i].render[key]();
    }
  });
}, 20);
