import counterFactory from "./counterFactory.js";

function countersFactory(countersState) {
  const node = document.querySelector("#counters-container");
  const newCounterButton = document.querySelector("#new-counter");

  const counters = [];
  function deleteCounter() {
    counters.splice(counters.indexOf(null), 1);
  }

  const instance = { node, deleteCounter };

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
  }

  newCounterButton.addEventListener("click", handleAddCounter);

  return instance;
}

export default countersFactory;
