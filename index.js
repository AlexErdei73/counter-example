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
  const counterIncrementInput = component.querySelector("#increment-input");
  const counterIncrementHeading = component.querySelector("#increment-heading");

  function init() {
    const counterButton = component.querySelector("button");

    counterValue.textContent = `Value: ${counterState.value}`;
    counterIncrementInput.value = counterState.increment;
    counterIncrementHeading.textContent = `Increment: ${counterState.increment}`;

    counterButton.addEventListener("click", function () {
      newCounterState.value = counterState.value + counterState.increment;
    });

    counterIncrementInput.addEventListener("change", function (event) {
      const newIncrement = +event.target.value;
      if (!newIncrement) {
        newCounterState.increment = 0;
        return;
      }
      newCounterState.increment = newIncrement;
    });
  }

  function renderKey(key) {
    if (counterState[key] === newCounterState[key]) return false;
    counterState[key] = newCounterState[key];
    return true;
  }

  const render = {
    value: () => {
      if (renderKey("value", "textContent")) {
        counterValue.textContent = `Value: ${counterState.value}`;
      }
    },
    increment: () => {
      if (renderKey("increment", "value")) {
        counterIncrementInput.value = counterState.increment;
        counterIncrementHeading.textContent = `Increment: ${counterState.increment}`;
      }
    },
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
