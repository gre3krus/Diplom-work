// practical.js

document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.querySelector(".list-practical");

  // Создаем контейнер для отображения открытой практической
  const openedContainer = document.createElement("div");
  openedContainer.classList.add("opened-practical-container");
  document.querySelector("main").appendChild(openedContainer);

  // Функция для отображения выбранной практической
  function openPractical(id, practicalsData) {
    const practical = practicalsData.find((p) => p.id === id);
    if (!practical) return;

    openedContainer.innerHTML = practical.content;

    // Прокрутка к открытой практике
    openedContainer.scrollIntoView({ behavior: "smooth" });
  }

  // Загружаем данные из JSON-файла practicalsData.json
  fetch("practicalData.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((practicalsData) => {
      // Добавляем обработчики клика на карточки после загрузки данных
      const cards = listContainer.querySelectorAll(".card-practical");
      cards.forEach((card, index) => {
        card.addEventListener("click", () => {
          openPractical(index + 1, practicalsData);
        });
      });
    })
    .catch((error) => {
      console.error("Ошибка загрузки данных практических:", error);
    });
});
