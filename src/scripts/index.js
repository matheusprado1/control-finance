import { insertedValues } from "./valuesDatabase.js";
import { applyCurrentFilter } from "./filter.js";

export let localInsertedValues = [];

const selectButtons = () => {
  const selectButtons = document.querySelectorAll(".button__outline");

  Array.from(selectButtons).forEach(currentButton => {
    currentButton.addEventListener("click", () => {
      selectButtons.forEach(button => {
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

  if (array.length === 0) {
    cardsContainer.insertAdjacentHTML("afterbegin",
      `<div class="empty__container">
      <p class="empty__title">Nenhum valor cadastrado</p>
      <p class="empty__info">Registrar novo valor</p>
     </div>
    `)
  }

  array.forEach(item => {
    cardsContainer.insertAdjacentHTML("afterbegin",
      `<div class="card">
        <p class="card__value">R$ ${(item.value).toFixed(2)}</p>
        <div class="card__info">
          <p class="info">${idToCategory(item)}</p>
          <button class="button__info" data-id=${item.id}><svg class="delete__icon" width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5625 0.875H9.28125L9.00781 0.382812C8.89844 0.164062 8.67969 0 8.43359 0H5.28906C5.04297 0 4.82422 0.164062 4.71484 0.382812L4.46875 0.875H1.1875C0.941406 0.875 0.75 1.09375 0.75 1.3125V2.1875C0.75 2.43359 0.941406 2.625 1.1875 2.625H12.5625C12.7812 2.625 13 2.43359 13 2.1875V1.3125C13 1.09375 12.7812 0.875 12.5625 0.875ZM2.19922 12.7695C2.22656 13.4805 2.80078 14 3.51172 14H10.2109C10.9219 14 11.4961 13.4805 11.5234 12.7695L12.125 3.5H1.625L2.19922 12.7695Z" fill="#ADB5BD"/>
      </svg></button>
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


const buttonTypeSelect = () => {
  const buttonEntrie = document.querySelector("#button__entrie");
  const buttonOut = document.querySelector("#button__out");

  buttonEntrie.addEventListener("click", typeButton);
  buttonOut.addEventListener("click", typeButton);
}

const typeButton = event => {
  const buttonEntrie = document.querySelector("#button__entrie");
  const buttonOut = document.querySelector("#button__out");

  buttonEntrie.classList.remove("selected");
  buttonOut.classList.remove("selected");

  event.target.classList.add("selected");
}


const generateId = () => {
  let idCounter = localInsertedValues.length + 1;

  return idCounter++;
}

const getCategoryID = () => {
  const buttonEntrie = document.querySelector("#button__entrie");
  const buttonOut = document.querySelector("#button__out");

  if (buttonEntrie.classList.contains("selected")) {
    return 0;
  } else if (buttonOut.classList.contains("selected")) {
    return 1;
  }
}

const handleAdd = () => {
  const input = document.querySelector("#input__insert");
  const button = document.querySelector("#button__insert");

  button.addEventListener("click", () => {
    let value = +input.value;

    let id = generateId();
    let categoryID = getCategoryID();

    localInsertedValues.push({ id, value, categoryID });
    console.log(localInsertedValues);

    // Renderize os cards novamente após adicionar o novo item
    applyCurrentFilter();
    renderCards(localInsertedValues);
    input.value = "";
  });
}

const enableButtonInsert = () => {
  const input = document.querySelector("#input__insert");
  const button = document.querySelector("#button__insert");

  input.addEventListener("input", () => {
    if (input.value === "" || input.value <= 0) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  })
}

enableButtonInsert();
buttonTypeSelect();
handleAdd();
selectButtons();
renderCards(localInsertedValues);