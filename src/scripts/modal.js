const handleModal = () => {
  const button = document.querySelector("#register");
  const modalContainer = document.querySelector("#modalController");

  button.addEventListener("click", () => {
    modalContainer.showModal();
    closeModal();
  })
}
handleModal();

const closeModal = () => {
  const closeModalButton = document.querySelectorAll(".closeModal");
  const modalContainer = document.querySelector("#modalController");

  Array.from(closeModalButton).forEach(item => {
    item.addEventListener("click", () => {
      modalContainer.close();
    })
  })
}