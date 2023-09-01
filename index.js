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

const countersContainer = document.querySelector("#counters-container");
const newCounterButton = document.querySelector("#new-counter");

const counters = [];
state.counters.forEach((counter, i) => {
  counter = counterFactory(state.counters[i], countersContainer);
  counter.init();
  counters[i] = counter;
});

function handleAddCounter() {
  state.counters.push({
    value: 0,
    increment: 1,
  });
  const newCounter = counterFactory(
    state.counters[state.counters.length - 1],
    countersContainer
  );
  newCounter.init();
  counters.push(newCounter);
}

newCounterButton.addEventListener("click", handleAddCounter);
