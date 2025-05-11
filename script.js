// --- Сайдбар ---
const btnAnnotation = document.getElementById("btn-annotation");
const btnContent = document.getElementById("btn-content");
const btnTextbook = document.getElementById("btn-textbook");
const contentArea = document.getElementById("content-area");

let textbookChapters = [];
let currentChapterIndex = 0;

// --- Функция подсветки кнопок сайдбара ---
function setSidebarActiveButton(activeBtn) {
  [btnAnnotation, btnContent, btnTextbook].forEach((btn) => {
    btn.classList.toggle("active", btn === activeBtn);
    btn.setAttribute("aria-selected", btn === activeBtn ? "true" : "false");
  });
}

// --- Функция подсветки кнопок панели управления ---
function setActiveControlPanelButton(activeBtn) {
  [lecturesBtn, practicalBtn, testsBtn].forEach((btn) => {
    btn.classList.toggle("active", btn === activeBtn);
  });
}

// --- Контент для Аннотации ---
const annotationContent = `
  <h1>Аннотация</h1>
  <span>
    Данный электронный учебник предназначен для студентов технических
    специальностей, изучающих дисциплину «Инженерная компьютерная
    графика». Учебник охватывает основные теоретические и практические
    аспекты создания, обработки и визуализации инженерных чертежей и
    моделей с использованием современных программных средств. В учебнике
    подробно рассматриваются методы двумерного и трёхмерного
    моделирования, основы работы с CAD-системами, принципы построения
    инженерных изображений и стандарты оформления технической
    документации. Материал представлен в доступной форме с большим
    количеством иллюстраций и практических заданий, что способствует
    глубокому пониманию и закреплению знаний. Учебник будет полезен как
    для самостоятельного изучения, так и в качестве учебного пособия на
    занятиях.
  </span>
`;

// --- Генерация списка содержания ---
function generateContentList() {
  return `
    <h1>Содержание</h1>
    <ul class="content-list">
      ${textbookChapters
        .map(
          (ch) => `
        <li><a href="#" data-chapter="${ch.id}">${ch.title}</a></li>
      `
        )
        .join("")}
    </ul>
  `;
}

// --- Генерация HTML учебника с навигацией ---
function generateTextbookHTML() {
  const chaptersHTML = textbookChapters
    .map(
      (ch, index) => `
    <article id="${ch.id}" class="textbook-chapter${
        index === 0 ? " active" : ""
      }" data-index="${index}">
      <h2>${ch.title}</h2>
      <div class="textbook-content">${ch.content}</div>
    </article>
  `
    )
    .join("");

  const navButtonsHTML = textbookChapters
    .map(
      (_, index) => `
    <button class="page-number${
      index === 0 ? " active" : ""
    }" data-index="${index}" aria-label="Перейти к странице ${index + 1}">${
        index + 1
      }</button>
  `
    )
    .join("");

  return `
    <div class="textbook-container" style="display:flex; flex-direction: column; height: 100%;">
      <div class="textbook-chapters" style="flex-grow:1; overflow-y:auto; padding-right: 10px;">
        ${chaptersHTML}
      </div>
      <div class="textbook-navigation">
        <span class="nav-arrow" id="prev-chapter" role="button" tabindex="0" aria-label="Предыдущая глава">&#8592;</span>
        <div class="page-numbers">
          ${navButtonsHTML}
        </div>
        <span class="nav-arrow" id="next-chapter" role="button" tabindex="0" aria-label="Следующая глава">&#8594;</span>
      </div>
    </div>
  `;
}

// --- Показать Аннотацию ---
function showAnnotation() {
  contentArea.innerHTML = annotationContent;
  setSidebarActiveButton(btnAnnotation);
  contentArea.focus();
}

// --- Показать Содержание ---
function showContent() {
  contentArea.innerHTML = generateContentList();
  setSidebarActiveButton(btnContent);
  contentArea.focus();

  // Обработчики кликов по пунктам содержания
  const links = contentArea.querySelectorAll(".content-list a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const chapterId = link.getAttribute("data-chapter");
      showTextbook(chapterId);
    });
  });
}

// --- Показать Учебник ---
function showTextbook(scrollToChapterId = null) {
  contentArea.innerHTML = generateTextbookHTML();
  setSidebarActiveButton(btnTextbook);
  contentArea.focus();

  const chapters = contentArea.querySelectorAll(".textbook-chapter");
  const pageButtons = contentArea.querySelectorAll(".page-number");
  const prevBtn = contentArea.querySelector("#prev-chapter");
  const nextBtn = contentArea.querySelector("#next-chapter");

  function updateChapterVisibility(index) {
    currentChapterIndex = index;
    chapters.forEach((ch, i) => {
      ch.classList.toggle("active", i === index);
    });
    pageButtons.forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
    });
    prevBtn.classList.toggle("disabled", index === 0);
    nextBtn.classList.toggle("disabled", index === chapters.length - 1);
    chapters[index].scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Навигация стрелками
  prevBtn.addEventListener("click", () => {
    if (currentChapterIndex > 0)
      updateChapterVisibility(currentChapterIndex - 1);
  });
  nextBtn.addEventListener("click", () => {
    if (currentChapterIndex < chapters.length - 1)
      updateChapterVisibility(currentChapterIndex + 1);
  });

  // Навигация по номерам страниц
  pageButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-index"));
      updateChapterVisibility(idx);
    });
  });

  // Показать нужную главу
  if (scrollToChapterId) {
    const idx = textbookChapters.findIndex((ch) => ch.id === scrollToChapterId);
    if (idx !== -1) {
      updateChapterVisibility(idx);
    } else {
      updateChapterVisibility(0);
    }
  } else {
    updateChapterVisibility(0);
  }
}

// --- Загрузка учебника из JSON ---
async function loadTextbookChapters() {
  try {
    const response = await fetch("./textbookChapters.json");
    if (!response.ok) throw new Error("Ошибка загрузки учебника");
    textbookChapters = await response.json();
  } catch (error) {
    console.error(error);
    contentArea.innerHTML =
      '<p style="color:red;">Не удалось загрузить учебник. Попробуйте обновить страницу.</p>';
  }
}

// --- Загрузка HTML страниц в main (для панели управления) ---
const mainElement = document.querySelector("main");

async function loadPageInMain(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
    const html = await response.text();
    mainElement.innerHTML = html;
  } catch (err) {
    console.error(err);
    mainElement.innerHTML =
      '<p style="color:red;">Ошибка загрузки контента. Попробуйте позже.</p>';
  }
}

const headerLogo = document.getElementById("header-title");
if (headerLogo) {
  headerLogo.style.cursor = "pointer";
  headerLogo.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// --- Инициализация ---
async function init() {
  await loadTextbookChapters();

  showAnnotation();

  btnAnnotation.addEventListener("click", showAnnotation);
  btnContent.addEventListener("click", showContent);
  btnTextbook.addEventListener("click", () => showTextbook());

  // Экспорт функции для вызова из содержания
  window.showTextbook = showTextbook;
}

init();
