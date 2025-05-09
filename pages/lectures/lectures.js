// Получаем контейнер списка карточек
const lecturesList = document.querySelector(".list-lectures");

// Создаем контейнер для открытой лекции под списком карточек
const openedLectureContainer = document.createElement("div");
openedLectureContainer.className = "opened-lecture-container";
lecturesList.after(openedLectureContainer);
openedLectureContainer.style.display = "none";

// Переменная для хранения данных лекций
let lecturesData = [];

// Функция создания карточек и навешивания клика
function createLectureCards() {
  lecturesList.innerHTML = ""; // очистить на всякий случай
  lecturesData.forEach((lecture, index) => {
    const card = document.createElement("div");
    card.className = "card-lectures";
    card.innerHTML = `Лекция ${index + 1}: <span class="lecture-title">${
      lecture.title
    }</span>`;
    card.style.cursor = "pointer";
    card.addEventListener("click", () => openLecture(index));
    lecturesList.appendChild(card);
  });
}

// Функция открытия лекции по индексу
function openLecture(index) {
  const lecture = lecturesData[index];
  if (!lecture) return;

  if (openedLectureContainer.dataset.openedId === lecture.id) {
    // Закрыть, если уже открыта
    openedLectureContainer.style.display = "none";
    openedLectureContainer.innerHTML = "";
    delete openedLectureContainer.dataset.openedId;
    return;
  }

  openedLectureContainer.style.display = "block";
  openedLectureContainer.dataset.openedId = lecture.id;

  openedLectureContainer.innerHTML = `
    <h2>${lecture.title}</h2>
    <div>${lecture.content}</div>
  `;

  openedLectureContainer.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Загрузка JSON и инициализация
async function init() {
  try {
    const response = await fetch("lecturesData.json");
    if (!response.ok) throw new Error("Ошибка загрузки данных лекций");
    lecturesData = await response.json();
    createLectureCards();
  } catch (error) {
    console.error(error);
    lecturesList.innerHTML =
      "<p style='color:red;'>Не удалось загрузить данные лекций.</p>";
  }
}

init();
