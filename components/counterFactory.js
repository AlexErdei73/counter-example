function counterFactory(counterState, newCounterState, parentNode) {
  const temp = document.querySelectorAll("template")[0];
  const counter = temp.content.querySelector(".counter");
  const component = document.importNode(counter, true);
  parentNode.appendChild(component);

  const counterValue = component.querySelector("#value");
  const counterIncrementInput = component.querySelector("#increment-input");
  const counterIncrementHeading = component.querySelector("#increment-heading");
  const counterButton = component.querySelector("button");

  function init() {
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
      if (renderKey("value")) {
        counterValue.textContent = `Value: ${counterState.value}`;
      }
    },
    increment: () => {
      if (renderKey("increment")) {
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
}

export default counterFactory;
