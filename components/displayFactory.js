function displayFactory(countersState) {
  const countersOutput = document.querySelector("#display .counters output");
  const sumOutput = document.querySelector("#display .sum output");

  function update() {
    countersOutput.textContent = countersState.length;
    sumOutput.textContent = countersState
      .map((counter) => counter.value)
      .reduce((sum, value) => (sum += value), 0);
  }

  return {
    countersState,
    update,
  };
}

export default displayFactory;
