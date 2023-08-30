const state = {
  counter: {
    value: 0,
    increment: 1,
  },
};

const newState = JSON.parse(JSON.stringify(state));

const counter = (function counterFactory(counterState, newCounterState) {
  const component = document.querySelector("#counter");
  const counterValue = component.querySelector("#value");
  const counterIncrement = component.querySelector("#increment");

  function init() {
    const counterButton = component.querySelector("button");

    counterValue.textContent = counterState.value;
    counterIncrement.value = counterState.increment;

    counterButton.addEventListener("click", function () {
      newCounterState.value = counterState.value + counterState.increment;
    });

    counterIncrement.addEventListener("change", function (event) {
      const newIncrement = +event.target.value;
      if (!newIncrement) {
        newCounterState.increment = 0;
        return;
      }
      newCounterState.increment = newIncrement;
    });
  }

  function renderKey(key, property) {
    if (counterState[key] === newCounterState[key]) return;
    counterState[key] = newCounterState[key];
    component.querySelector(`#${key}`)[property] = counterState[key];
  }

  const render = {
    value: () => renderKey("value", "textContent"),
    increment: () => renderKey("increment", "value"),
  };

  return {
    component,
    init,
    render,
  };
})(state.counter, newState.counter);

counter.init();

setInterval(function () {
  for (const key in state.counter) {
    counter.render[key]();
  }
}, 20);
