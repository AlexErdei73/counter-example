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

(function countersFactory(countersState) {
  const node = document.querySelector("#counters-container");
  const newCounterButton = document.querySelector("#new-counter");

  const instance = { node };

  const counters = [];
  countersState.forEach((counter, i) => {
    counter = counterFactory(state.counters[i], instance);
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
      instance
    );
    newCounter.init();
    counters.push(newCounter);
  }

  newCounterButton.addEventListener("click", handleAddCounter);

  return instance;
})(state.counters);
