const header = document.querySelector("header");
const headerTitle = document.getElementById("header-title");
const fullText = "Инженерная компьютерная графика";
const shortText = "ИКГ";

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
    headerTitle.textContent = shortText;
  } else {
    header.classList.remove("scrolled");
    headerTitle.textContent = fullText;
  }
});

const btnAnnotation = document.getElementById("btn-annotation");
const btnContent = document.getElementById("btn-content");
const btnTextbook = document.getElementById("btn-textbook");
const contentArea = document.getElementById("content-area");

function setActiveButton(activeBtn) {
  [btnAnnotation, btnContent, btnTextbook].forEach((btn) => {
    btn.classList.toggle("active", btn === activeBtn);
    btn.setAttribute("aria-selected", btn === activeBtn ? "true" : "false");
  });
}

// Контент для вкладок

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

const contentContent = `
  <h1>Содержание</h1>
  <ul class="content-list">
    <li><a href="#" data-chapter="chapter1">1. Введение в инженерную компьютерную графику</a></li>
    <li><a href="#" data-chapter="chapter2">2. Основы двумерного черчения</a></li>
    <li><a href="#" data-chapter="chapter3">3. Трёхмерное моделирование</a></li>
    <li><a href="#" data-chapter="chapter4">4. CAD-системы в инженерной графике</a></li>
    <li><a href="#" data-chapter="chapter5">5. Визуализация и рендеринг</a></li>
    <li><a href="#" data-chapter="chapter6">6. Практические задания и проекты</a></li>
    <li><a href="#" data-chapter="chapter7">7. Приложения</a></li>
  </ul>
`;

const textbookChapters = [
  {
    id: "chapter1",
    title: "1. Введение в инженерную компьютерную графику",
    content: `
      <p>Инженерная компьютерная графика - это область, связанная с созданием и обработкой технических изображений с помощью компьютерных технологий. Она применяется для проектирования, моделирования и визуализации инженерных объектов.</p>
      <p>В современном мире компьютерная графика стала неотъемлемой частью инженерного проектирования, позволяя создавать точные и наглядные модели.</p>
    `,
  },
  {
    id: "chapter2",
    title: "2. Основы двумерного черчения",
    content: `
      <p>Двумерное черчение - это процесс создания плоских изображений, которые отражают форму и размеры объектов. Основные элементы - линии, окружности, дуги и текст.</p>
      <p>Стандарты оформления чертежей обеспечивают единообразие и понятность технической документации.</p>
    `,
  },
  {
    id: "chapter3",
    title: "3. Трёхмерное моделирование",
    content: `
      <p>Трёхмерное моделирование позволяет создавать объёмные цифровые модели объектов, которые можно вращать, масштабировать и анализировать.</p>
      <p>Используются различные методы: каркасное моделирование, поверхностное и твердотельное моделирование.</p>
    `,
  },
  {
    id: "chapter4",
    title: "4. CAD-системы в инженерной графике",
    content: `
      <p>CAD-системы (Computer-Aided Design) - программные комплексы для автоматизации проектирования.</p>
      <p>Они позволяют создавать, редактировать и анализировать инженерные модели и чертежи.</p>
    `,
  },
  {
    id: "chapter5",
    title: "5. Визуализация и рендеринг",
    content: `
      <p>Визуализация - процесс создания изображений из 3D-моделей с применением материалов, освещения и эффектов.</p>
      <p>Рендеринг позволяет получить фотореалистичные изображения для презентаций и анализа.</p>
    `,
  },
  {
    id: "chapter6",
    title: "6. Практические задания и проекты",
    content: `
      <p>Практические задания помогают закрепить теоретические знания и развить навыки работы с графическими системами.</p>
      <p>Проекты включают создание чертежей, 3D-моделей и сборочных единиц.</p>
    `,
  },
  {
    id: "chapter7",
    title: "7. Приложения",
    content: `
      <p>Приложения содержат стандарты, нормативы и справочные материалы, необходимые для работы инженера-графика.</p>
      <p>Также рекомендации по дальнейшему обучению и использованию программных средств.</p>
    `,
  },
];

// Функция для генерации HTML учебника с навигацией
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
      (ch, index) => `
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

// Переключение вкладок
function setActiveButton(activeBtn) {
  [btnAnnotation, btnContent, btnTextbook].forEach((btn) => {
    btn.classList.toggle("active", btn === activeBtn);
    btn.setAttribute("aria-selected", btn === activeBtn ? "true" : "false");
  });
}

function showAnnotation() {
  contentArea.innerHTML = annotationContent;
  setActiveButton(btnAnnotation);
  contentArea.focus();
}

function showContent() {
  contentArea.innerHTML = contentContent;
  setActiveButton(btnContent);
  contentArea.focus();

  // Добавляем обработчики на пункты содержания
  const links = contentArea.querySelectorAll(".content-list a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const chapterId = link.getAttribute("data-chapter");
      showTextbook(chapterId);
    });
  });
}

let currentChapterIndex = 0;

function showTextbook(scrollToChapterId = null) {
  contentArea.innerHTML = generateTextbookHTML();
  setActiveButton(btnTextbook);
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
    // Прокрутка к активной главе (если нужно)
    chapters[index].scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Обработчики навигации
  prevBtn.addEventListener("click", () => {
    if (currentChapterIndex > 0) {
      updateChapterVisibility(currentChapterIndex - 1);
    }
  });
  nextBtn.addEventListener("click", () => {
    if (currentChapterIndex < chapters.length - 1) {
      updateChapterVisibility(currentChapterIndex + 1);
    }
  });

  pageButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-index"));
      updateChapterVisibility(idx);
    });
  });

  // Если вызвали с id главы - найти её индекс и показать
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

// Инициализация - показываем Аннотацию по умолчанию
showAnnotation();

// Обработчики кнопок
btnAnnotation.addEventListener("click", showAnnotation);
btnContent.addEventListener("click", showContent);
btnTextbook.addEventListener("click", () => showTextbook());

// Экспорт функции для вызова из содержания
window.showTextbook = showTextbook;
