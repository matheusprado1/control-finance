import { localInsertedValues } from "./index.js";
import { renderCards } from "./index.js";

let insertedValuesFiltered = [];

const filterTotal = (array = []) => {
  insertedValuesFiltered = [...array];
}

const filterEntries = (array = []) => {
  insertedValuesFiltered = array.filter(item => item.categoryID === 0);
}

const filterOut = (array = []) => {
  insertedValuesFiltered = array.filter(item => item.categoryID === 1);
}

const sumTotalFilter = (array = []) => {
  return array.map(item => {
    const { value } = item;
    return value;
  }).reduce((a, b) => a + b, 0);
}

export const renderTotalFilter = (array = []) => {
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
    case 'out':
      filterOut(localInsertedValues);
      break;
  }
  renderCards(insertedValuesFiltered);
  renderTotalFilter(insertedValuesFiltered);
}

export const handleFilter = () => {
  const allButton = document.querySelector("#all");
  const entriesButton = document.querySelector("#entries");
  const outButton = document.querySelector("#out");

  allButton.addEventListener("click", () => {
    currentFilter = 'all';
    applyCurrentFilter();
  })
  entriesButton.addEventListener("click", () => {
    currentFilter = 'entries';
    applyCurrentFilter();
  })
  outButton.addEventListener("click", () => {
    currentFilter = 'out';
    applyCurrentFilter();
  })
}
handleFilter();
renderTotalFilter(localInsertedValues);


