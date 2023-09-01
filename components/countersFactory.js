import counterFactory from "./counterFactory.js";

function countersFactory(countersState, display) {
  const node = document.querySelector("#counters-container");
  const newCounterButton = document.querySelector("#new-counter");

  const counters = [];
  function deleteCounter() {
    const index = countersState.indexOf(null);
    counters.splice(index - 1, 1);
    countersState.splice(index - 1, 1);
  }

  const instance = { node, display, deleteCounter };

  countersState.forEach((counter, i) => {
    counter = counterFactory(countersState[i], instance);
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
