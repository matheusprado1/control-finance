import { renderCards } from "./index.js";
import { localInsertedValues } from "./index.js";

let insertedValuesFiltered = [];

const selectFilterButtons = () => {
  const filterSelectionButtons = document.querySelectorAll(".button__outline");

  Array.from(filterSelectionButtons).forEach(currentButton => {
    currentButton.addEventListener("click", () => {
      filterSelectionButtons.forEach(button => {
        button.classList.remove("button--selected");
      });
      currentButton.classList.add("button--selected");
    })
  })
}

const filterTotal = (array = []) => {
  insertedValuesFiltered = [...array];
}

const filterEntries = (array = []) => {
  insertedValuesFiltered = array.filter(item => item.categoryID === 0);
}

const filterExit = (array = []) => {
  insertedValuesFiltered = array.filter(item => item.categoryID === 1);
}

const sumTotalFilter = (array = []) => {
  return array.map(item => {
    const { value } = item;
    return value;
  }).reduce((a, b) => a + b, 0);
}

const renderTotalFilter = (array = []) => {
  const total = document.querySelector("#total");
  total.textContent = `R$ ${sumTotalFilter(array).toFixed(2)}`;
}

let currentFilter = 'all';

export const applyCurrentFilter = () => {
  switch (currentFilter) {
    case 'all':
      filterTotal(localInsertedValues);
      break;
    case 'entries':
      filterEntries(localInsertedValues);
      break;
    case 'exit':
      filterExit(localInsertedValues);
      break;
  }
  renderCards(insertedValuesFiltered);
  renderTotalFilter(insertedValuesFiltered);
}

const handleFilter = () => {
  const allButton = document.querySelector("#all");
  const entriesButton = document.querySelector("#entries");
  const exitButton = document.querySelector("#exit");

  allButton.addEventListener("click", () => {
    currentFilter = 'all';
    applyCurrentFilter();

  })
  entriesButton.addEventListener("click", () => {
    currentFilter = 'entries';
    applyCurrentFilter();
  })
  exitButton.addEventListener("click", () => {
    currentFilter = 'exit';
    applyCurrentFilter();
  })
}

handleFilter();
selectFilterButtons();
renderTotalFilter(localInsertedValues);


