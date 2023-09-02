import counterFactory from "./counterFactory.js";

function countersFactory(countersState, display) {
  const node = document.querySelector("#counters-container");
  const newCounterButton = document.querySelector("#new-counter");

  const counters = [];
  function deleteCounter() {
    const index = countersState.map((counter) => counter.value).indexOf(null);
    counters.splice(index, 1);
    countersState.splice(index, 1);
    display.update();
  }

  const instance = { node, display, deleteCounter };

  countersState.forEach((counterState, i) => {
    const counter = counterFactory(counterState, instance);
    counter.init();
    counters[i] = counter;
  });

  function handleAddCounter() {
    countersState.push({
      value: 0,
      increment: 1,
    });
    const newCounter = counterFactory(
      countersState[countersState.length - 1],
      instance
    );
    newCounter.init();
    counters.push(newCounter);
    display.update();
  }

  newCounterButton.addEventListener("click", handleAddCounter);

  return instance;
}

export default countersFactory;
