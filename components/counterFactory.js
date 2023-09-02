function counterFactory(counterState, parent) {
  const temp = document.querySelectorAll("template")[0];
  const counter = temp.content.querySelector(".counter");
  const component = document.importNode(counter, true);
  parent.node.appendChild(component);

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
      counterState.value = counterState.value + counterState.increment;
      counterValue.textContent = counterState.value;
      parent.display.update();
    });

    deleteButton.addEventListener("click", function () {
      counterState.value = null;
      component.remove();
      parent.deleteCounter();
    });

    counterIncrementInput.addEventListener("change", function (event) {
      const increment = +event.target.value;
      if (!increment) {
        counterState.increment = 0;
        return;
      }
      counterState.increment = increment;
      counterIncrementOutput.textContent = counterState.increment;
    });
  }

  return {
    init,
  };
}

export default counterFactory;
