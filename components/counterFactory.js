function counterFactory(counterState, newCounterState, parentNode) {
  const temp = document.querySelectorAll("template")[0];
  const counter = temp.content.querySelector(".counter");
  const component = document.importNode(counter, true);
  parentNode.appendChild(component);

  const counterValue = component.querySelector(".counter .value output");
  const counterIncrementInput = component.querySelector("input.increment");
  const counterIncrementOutput = component.querySelector(
    ".counter .increment output"
  );
  const counterButton = component.querySelector("button.count");
  const deleteButton = component.querySelector("button.delete");

  function init() {
    counterValue.textContent = counterState.value;
    counterIncrementInput.value = counterState.increment;
    counterIncrementOutput.textContent = counterState.increment;

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
    if (counterState[key] === newCounterState[key]) return;
    counterState[key] = newCounterState[key];
    component.querySelector(`.counter .${key} output`).textContent =
      counterState[key];
  }

  const renders = {
    value: () => renderKey("value"),
    increment: () => renderKey("increment"),
  };

  function render() {
    for (const key in counterState) {
      renders[key]();
    }
  }

  return {
    init,
    render,
  };
}

export default counterFactory;
