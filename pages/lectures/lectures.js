// Массив лекций с заголовками и контентом
const lecturesData = [
  {
    id: "lecture1",
    title: "Введение в инженерную графику",
    content: `<p>В этой лекции мы рассмотрим основные понятия инженерной графики, её роль в проектировании и производстве.</p>
                <p>Вы узнаете, как создавать и читать технические чертежи, а также познакомитесь с основными инструментами.</p>`,
  },
  {
    id: "lecture2",
    title: "Основы двумерного черчения",
    content: `<p>Двумерное черчение - это основа для создания технических документов.</p>
                <p>В лекции обсуждаются типы линий, стандарты оформления и правила построения.</p>`,
  },
  {
    id: "lecture3",
    title: "Трёхмерное моделирование",
    content: `<p>Знакомство с методами создания 3D моделей, их преимуществами и применением в инженерии.</p>
                <p>Рассмотрим каркасное, поверхностное и твердотельное моделирование.</p>`,
  },
  {
    id: "lecture4",
    title: "CAD-системы и их возможности",
    content: `<p>Обзор популярных CAD-систем, их функционала и как они помогают инженерам в работе.</p>`,
  },
  {
    id: "lecture5",
    title: "Визуализация и рендеринг",
    content: `<p>Основы создания реалистичных изображений и анимаций инженерных моделей.</p>`,
  },
  {
    id: "lecture6",
    title: "Работа с чертежами в AutoCAD",
    content: `<p>Практические советы и приёмы работы в AutoCAD для эффективного создания чертежей.</p>`,
  },
  {
    id: "lecture7",
    title: "Параметрическое моделирование",
    content: `<p>Преимущества параметрического подхода и его применение в современных CAD-системах.</p>`,
  },
  {
    id: "lecture8",
    title: "Сборочные единицы и их проектирование",
    content: `<p>Как создавать и управлять сборками из нескольких деталей в CAD-средах.</p>`,
  },
  {
    id: "lecture9",
    title: "Стандарты и нормативы в инженерной графике",
    content: `<p>Обзор основных стандартов, обязательных для соблюдения при создании технической документации.</p>`,
  },
  {
    id: "lecture10",
    title: "Практические советы по оформлению чертежей",
    content: `<p>Рекомендации по оформлению, проверке и подготовке чертежей к сдаче и производству.</p>`,
  },
];

// Ссылки на контейнеры
const lecturesList = document.getElementById("lectures-list");

// Создаем карточки лекций
function createLectureCards() {
  lecturesData.forEach((lecture) => {
    const card = document.createElement("div");
    card.className = "lecture-card";
    card.textContent = lecture.title;
    card.dataset.id = lecture.id;
    card.addEventListener("click", () => openLecture(lecture.id, card));
    lecturesList.appendChild(card);
  });
}

// Открытые лекции (будут добавляться сюда)
const openedLecturesContainer = document.createElement("div");
openedLecturesContainer.className = "opened-lectures";
lecturesList.after(openedLecturesContainer);

// Открываем лекцию
function openLecture(id, clickedCard) {
  // Проверяем, не открыта ли уже эта лекция
  if (document.getElementById(`opened-${id}`)) {
    // Лекция уже открыта, ничего не делаем
    return;
  }

  const lecture = lecturesData.find((l) => l.id === id);
  if (!lecture) return;

  // Создаем контейнер открытой лекции
  const openedLecture = document.createElement("article");
  openedLecture.className = "opened-lecture";
  openedLecture.id = `opened-${id}`;

  // Заголовок
  const title = document.createElement("h2");
  title.textContent = lecture.title;
  openedLecture.appendChild(title);

  // Контент
  const content = document.createElement("div");
  content.innerHTML = lecture.content;
  openedLecture.appendChild(content);

  // Кнопка закрытия
  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.setAttribute("aria-label", "Закрыть лекцию");
  closeBtn.innerHTML = '<span class="material-icons">close</span>';
  closeBtn.addEventListener("click", () => {
    openedLecture.remove();
  });
  openedLecture.appendChild(closeBtn);

  // Вставляем открытую лекцию рядом с карточкой
  // Определяем позицию: если карточка ближе к верху - вставляем сверху, иначе снизу
  const cardRect = clickedCard.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  if (cardRect.top < viewportHeight / 2) {
    // Вставляем после карточки (снизу)
    if (clickedCard.nextSibling) {
      clickedCard.parentNode.insertBefore(
        openedLecture,
        clickedCard.nextSibling
      );
    } else {
      clickedCard.parentNode.appendChild(openedLecture);
    }
  } else {
    // Вставляем перед карточкой (сверху)
    clickedCard.parentNode.insertBefore(openedLecture, clickedCard);
  }
}

// Инициализация
createLectureCards();
