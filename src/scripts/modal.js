const handleModal = () => {
  const button = document.querySelector("#register");
  const emptyContainer = document.querySelector("#empty");
  const modalContainer = document.querySelector("#modalController");

  button.addEventListener("click", () => {
    modalContainer.classList.add("dialog-modal");
    modalContainer.showModal();
    closeModal();
  })
  emptyContainer.addEventListener("click", () => {
    modalContainer.classList.add("dialog-modal");
    modalContainer.showModal();
    closeModal();
  })
}

const closeModal = () => {
  const closeModalButton = document.querySelectorAll(".closeModal");
  const modalContainer = document.querySelector("#modalController");

  Array.from(closeModalButton).forEach(item => {
    item.addEventListener("click", () => {
      modalContainer.close();
      modalContainer.classList.remove("dialog-modal");
    })
  })
}

handleModal();