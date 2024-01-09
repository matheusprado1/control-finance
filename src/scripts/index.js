import { insertedValues } from "./valuesDatabase.js";
import { applyCurrentFilter } from "./filter.js";

export let localInsertedValues = [...insertedValues];

const selectButton = () => {
  const deleteButtons = document.querySelectorAll(".button__outline");

  Array.from(deleteButtons).forEach(currentButton => {
    currentButton.addEventListener("click", () => {
      deleteButtons.forEach(button => {
        button.classList.remove("button__select");
      });
      currentButton.classList.add("button__select");
    })
  })
}

const idToCategory = (item) => {
  const { categoryID } = item;
  if (categoryID === 0) {
    return "Entrada";
  }
  return "Saída";
}

export const renderCards = (array = []) => {
  const cardsContainer = document.querySelector(".cards__container");

  cardsContainer.innerHTML = "";

  array.forEach(item => {
    cardsContainer.insertAdjacentHTML("afterbegin",
      `<div class="card">
        <p class="card__value">R$ ${(item.value).toFixed(2)}</p>
        <div class="card__info">
          <p class="info">${idToCategory(item)}</p>
          <button class="button__info" data-id=${item.id}>Excluir</button>
        </div>
      </div>
      `);
  })
  handleDelete();
}

const deleteCard = (id, array = []) => {
  return array.filter(item => item.id !== Number(id));
}

const handleDelete = () => {
  const deleteButtons = document.querySelectorAll(".button__info");

  Array.from(deleteButtons).forEach(item => {
    item.addEventListener("click", () => {
      console.log('Button clicked, id:', item.dataset.id);
      console.log('Before delete:', localInsertedValues);
      localInsertedValues = deleteCard(item.dataset.id, localInsertedValues);
      console.log('After delete:', localInsertedValues);

      applyCurrentFilter();
    });
  })
}

selectButton();
renderCards(localInsertedValues);


