import counterFactory from "./components/counterFactory.js";

const state = {
  counter: {
    value: 0,
    increment: 1,
  },
};

const newState = JSON.parse(JSON.stringify(state));

const countersContainer = document.querySelector("#counters-container");

const counter = counterFactory(
  state.counter,
  newState.counter,
  countersContainer
);

counter.init();

setInterval(function () {
  for (const key in state.counter) {
    counter.render[key]();
  }
}, 20);
