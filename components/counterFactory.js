function counterFactory(counterState, parent, index) {
  const temp = document.querySelectorAll("template")[0];
  const counter = temp.content.querySelector(".counter");
  const node = document.importNode(counter, true);
  parent.node.appendChild(node);

  const counterValue = node.querySelector(".counter .value output");
  const counterIncrementInput = node.querySelector("input.increment");
  const counterIncrementOutput = node.querySelector(
    ".counter .increment output"
  );
  const counterButton = node.querySelector("button.count");
  const deleteButton = node.querySelector("button.delete");

  function init() {
    counterValue.textContent = counterState.value;
    counterIncrementInput.value = counterState.increment;
    counterIncrementOutput.textContent = counterState.increment;

    counterButton.addEventListener("click", function () {
      counterState.value = counterState.value + counterState.increment;
      counterValue.textContent = counterState.value;
      parent.display.update();
    });

    deleteButton.setAttribute("data-index", index);

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
    node,
    init,
  };
}

export default counterFactory;
