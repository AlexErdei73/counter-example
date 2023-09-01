function counterFactory(counterState, newCounterState, parentNode) {
  const temp = document.querySelectorAll("template")[0];
  const counter = temp.content.querySelector(".counter");
  const component = document.importNode(counter, true);
  parentNode.appendChild(component);

  const counterValue = component.querySelector(".counter .value");
  const counterIncrementInput = component.querySelector("input.increment");
  const counterIncrementHeading = component.querySelector("h2.increment");
  const counterButton = component.querySelector("button.count");
  const deleteButton = component.querySelector("button.delete");

  function init() {
    counterValue.textContent = `Value: ${counterState.value}`;
    counterIncrementInput.value = counterState.increment;
    counterIncrementHeading.textContent = `Increment: ${counterState.increment}`;

    counterButton.addEventListener("click", function () {
      newCounterState.value = counterState.value + counterState.increment;
    });

    deleteButton.addEventListener("click", function () {
      newCounterState = null;
      component.remove();
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
    if (!newCounterState) return;
    if (counterState[key] === newCounterState[key]) return false;
    counterState[key] = newCounterState[key];
    return true;
  }

  const renders = {
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

  function render() {
    for (const key in counterState) {
      renders[key]();
    }
  }

  return {
    component,
    init,
    render,
  };
}

export default counterFactory;
