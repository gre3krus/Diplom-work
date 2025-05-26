// --- Сайдбар ---
const btnAnnotation = document.getElementById("btn-annotation");
const btnContent = document.getElementById("btn-content");
const btnTextbook = document.getElementById("btn-textbook");
const btnKnowledgeBase = document.getElementById("btn-knowledge-base");
const btnGlossary = document.getElementById("btn-glossary");
const btnFeedback = document.getElementById("btn-feedback");
const contentArea = document.getElementById("content-area");

let textbookChapters = [];
let currentChapterIndex = 0;

// --- Функция подсветки кнопок сайдбара ---
function setSidebarActiveButton(activeBtn) {
  [
    btnAnnotation,
    btnContent,
    btnTextbook,
    btnKnowledgeBase,
    btnGlossary,
    btnFeedback,
  ].forEach((btn) => {
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
    <p>Добро пожаловать в учебный курс! Этот электронный учебник создан для студентов технических специальностей, 
    изучающих дисциплину «Инженерная компьютерная графика». Наш ресурс предлагает 
    комплексный подход к освоению современных технологий проектирования.</p>

    <h3>Содержание учебного курса:</h3>
    <p>Наш сайт-учебник включает:</p>
    <ul>
      <li>Полноценную базу знаний по инженерной графике</li>
      <li>15 подробных лекций с теоретическим материалом</li>
      <li>5 практических работ для отработки навыков</li>
      <li>5 контрольных тестов для проверки знаний</li>
      <li>Обучающие видеоуроки по работе с CAD-системами</li>
      <li>Электронный учебник с методическими материалами</li>
    </ul>

    <h3>Основные темы курса:</h3>
    <p>Учебник охватывает:</p>
    <ul>
      <li>Методы 2D и 3D моделирования</li>
      <li>Работу с современными CAD-программами</li>
      <li>Принципы создания инженерных чертежей</li>
      <li>Стандарты оформления технической документации</li>
      <li>Практическое применение знаний в реальных проектах</li>
    </ul>

    <p>Весь материал представлен в доступной форме с наглядными примерами, 
    иллюстрациями и практическими заданиями. Наш ресурс подойдет как для 
    самостоятельного изучения, так и для работы на аудиторных занятиях 
    под руководством преподавателя.</p>
  </span>
`;

// --- Контент для Базы знаний ---
const knowledgeBaseContent = `
  <h1>База знаний</h1>
  <p>Добро пожаловать в базу знаний по инженерной компьютерной графике. Здесь вы найдете полезные советы и обучающие материалы, которые помогут углубить ваши знания и навыки в области проектирования, черчения и моделирования.</p>
  
  <p>Ниже представлены три видеолекции, раскрывающие фундаментальные и практические аспекты инженерной графики, от основ дисциплины до конкретных техник работы в популярных CAD-системах.</p>
  
  <div style="display: flex; flex-direction: column; gap: 40px; margin-top: 30px;">
  
    <section style="text-align: center;">
      <h3>Видео 1: Лекция «Предмет Инженерная и компьютерная графика»</h3>
      <p>В этой лекции дается общее представление о дисциплине инженерной и компьютерной графики, её задачах, значении и области применения в современной инженерии.</p>
      <iframe
        width="720"
        height="405"
        src="https://rutube.ru/play/embed/8ed5b7aec52a39722ff6d3aa89b6b9ed"
        frameborder="0"
        allow="clipboard-write; autoplay"
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen
      ></iframe>
    </section>
    
    <section style="text-align: center;">
      <h3>Видео 2: Инженерная компьютерная графика (Черчение) — часть 1</h3>
      <p>Первый практический урок по черчению в инженерной графике, где рассматриваются базовые техники создания чертежей и правила оформления технической документации.</p>
      <iframe
        width="720"
        height="405"
        src="https://rutube.ru/play/embed/263ec743ae696660441fddc2c51a29eb"
        frameborder="0"
        allow="clipboard-write; autoplay"
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen
      ></iframe>
    </section>
    
    <section style="text-align: center;">
      <h3>Видео 3: Построение третьего вида в КОМПАС через 2D и сравнение с построением через 3D</h3>
      <p>Демонстрация построения третьего вида детали в системе КОМПАС с использованием двухмерного черчения и сравнение с трехмерным моделированием, что помогает понять преимущества и особенности каждого подхода.</p>
      <iframe
        width="720"
        height="405"
        src="https://rutube.ru/play/embed/62116ef2c6120f0d9394e12887f3b36b"
        frameborder="0"
        allow="clipboard-write; autoplay"
        webkitallowfullscreen
        mozallowfullscreen
        allowfullscreen
      ></iframe>
    </section>
    
  </div>
`;

// --- Контент для Глоссария ---
const glossaryContent = `
  <h1>Глоссарий</h1>
  <div class="glossary-container">
    <p class="glossary-intro">Здесь собраны ключевые терминов курса «Инженерная компьютерная графика» с подробными определениями.</p>
    
    <div class="glossary-grid">
      <!-- Ряд 1 -->
      <div class="glossary-card">
        <h3 class="term">1. CAD (Computer-Aided Design)</h3>
        <p class="definition">Автоматизированное проектирование с использованием специализированного программного обеспечения.</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">2. CAM (Computer-Aided Manufacturing)</h3>
        <p class="definition">Автоматизированная подготовка управляющих программ для станков с ЧПУ.</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">3. BIM (Building Information Modeling)</h3>
        <p class="definition">Информационное моделирование зданий с использованием интеллектуальных 3D-моделей.</p>
      </div>
      
      <!-- Ряд 2 -->
      <div class="glossary-card">
        <h3 class="term">4. Параметрическое моделирование</h3>
        <p class="definition">Метод создания моделей с изменяемыми параметрами и зависимостями между элементами.</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">5. Твердотельное моделирование</h3>
        <p class="definition">Создание 3D-моделей как цельных объемных тел с физическими свойствами.</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">6. Поверхностное моделирование</h3>
        <p class="definition">Метод построения моделей с помощью математически заданных поверхностей.</p>
      </div>
      
      <!-- Ряд 3 -->
      <div class="glossary-card">
        <h3 class="term">7. Чертежный вид</h3>
        <p class="definition">Стандартное изображение детали (фронтальный, профильный, горизонтальный).</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">8. Разрезы и сечения</h3>
        <p class="definition">Условные изображения, показывающие внутреннюю структуру объекта.</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">9. Допуски и посадки</h3>
        <p class="definition">Система нормированных отклонений размеров сопрягаемых деталей.</p>
      </div>
      
      <!-- Ряд 4 -->
      <div class="glossary-card">
        <h3 class="term">10. Шероховатость поверхности</h3>
        <p class="definition">Характеристика микронеровностей обработанной поверхности детали.</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">11. Базовая система координат</h3>
        <p class="definition">Основная система отсчета для позиционирования элементов модели.</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">12. Эскиз (Sketch)</h3>
        <p class="definition">2D-контур, используемый как основа для создания 3D-элементов.</p>
      </div>
      
      <!-- Ряд 5 -->
      <div class="glossary-card">
        <h3 class="term">13. Выдавливание (Extrude)</h3>
        <p class="definition">Операция создания объемного тела путем перемещения 2D-профиля.</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">14. Вращение (Revolve)</h3>
        <p class="definition">Создание тела вращением плоского контура вокруг оси.</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">15. Сопряжение (Fillet)</h3>
        <p class="definition">Скругление углов и ребер детали заданным радиусом.</p>
      </div>
      
      <!-- Ряд 6 -->
      <div class="glossary-card">
        <h3 class="term">16. Фаска (Chamfer)</h3>
        <p class="definition">Скошенная кромка на краю детали под заданным углом.</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">17. Массив (Pattern)</h3>
        <p class="definition">Множественное копирование элементов модели по заданному закону.</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">18. Оболочка (Shell)</h3>
        <p class="definition">Операция создания тонкостенной конструкции из объемного тела.</p>
      </div>
      
      <!-- Ряд 7 -->
      <div class="glossary-card">
        <h3 class="term">19. Сборка (Assembly)</h3>
        <p class="definition">Компоновка отдельных деталей в единую конструкцию с заданными связями.</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">20. Сопряжение (Mate)</h3>
        <p class="definition">Тип связи между компонентами сборки, определяющий их взаимное положение.</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">21. Ассоциативность чертежа</h3>
        <p class="definition">Связь между 3D-моделью и ее 2D-проекциями, обеспечивающая автоматическое обновление.</p>
      </div>
      
      <!-- Ряд 8 -->
      <div class="glossary-card">
        <h3 class="term">22. Спецификация</h3>
        <p class="definition">Табличный документ с перечнем всех компонентов сборки и их характеристик.</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">23. Геометрические ограничения</h3>
        <p class="definition">Правила, определяющие взаимное положение элементов эскиза.</p>
      </div>
      
      <div class="glossary-card">
        <h3 class="term">24. Размерные цепи</h3>
        <p class="definition">Система взаимосвязанных размеров, определяющих геометрию изделия.</p>
      </div>
      
      <!-- Ряд 9 -->
      <div class="glossary-card">
        <h3 class="term">25. Параметризация</h3>
        <p class="definition">Метод проектирования с использованием управляющих параметров и формул.</p>
      </div>
    </div>
  </div>

  <style>
    .glossary-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .glossary-intro {
      font-size: 1.1em;
      margin-bottom: 30px;
      text-align: center;
      color: #555;
    }
    
    .glossary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
    }
    
    .glossary-card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .glossary-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.12);
    }
    
    .term {
      color: #2c3e50;
      margin-top: 0;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }
    
    .definition {
      color: #555;
      line-height: 1.5;
    }
    
    @media (max-width: 768px) {
      .glossary-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
`;

// --- Контент для Обратной связи ---
const feedbackContent = `
    <h1>Обратная связь</h1>
    <span>Пожалуйста, заполните форму ниже, чтобы отправить нам ваши вопросы или предложения.</span>
  <div class="feedback-container">
    <form id="feedback-form" class="feedback-form">
      <div class="form-group">
        <label for="first-name">Имя:</label>
        <input type="text" id="first-name" name="first-name" required>
        <span class="error-message"></span>
      </div>
      
      <div class="form-group">
        <label for="phone">Номер телефона:</label>
        <input 
        type="tel" 
        id="phone" 
        name="phone"
        placeholder="+7 (___) ___-__-__"
        pattern="\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}"
        required
        data-mask="+7 (###) ###-##-##"
        >
        <span class="error-message"></span>
      </div>
      
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <span class="error-message"></span>
      </div>
      
      <div class="form-group">
        <label for="comment">Ваш комментарий:</label>
        <textarea id="comment" name="comment" rows="5" required></textarea>
        <span class="error-message"></span>
      </div>
      
      <button type="submit" class="submit-btn">Отправить</button>
    </form>
  </div>

  <style>
    .feedback-container {
      width: 700px;
      margin: 0 auto;
      padding: 20px;
      border-radius: 8px;
    }
    
    .feedback-form {
      display: flex;
      flex-direction: column;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    
    label {
      font-weight: 500;
      color: #333;
    }
    
    input, textarea {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    
    textarea {
      resize: vertical;
    }
    
    .error-message {
      color: #e74c3c;
      font-size: 14px;
      height: 16px;
    }
    
    .submit-btn {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
    }
    
    .submit-btn:hover {
      background-color: #2980b9;
    }
    
    input:invalid, textarea:invalid {
      border-color: #5d3fd3;;
    }
    
    .success-message {
      text-align: center;
      padding: 20px;
      color: white;
      border-radius: 8px;
      margin-top: 20px;
    }

     #phone {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s;
  }
  
  #phone:focus {
    border-color: #5d3fd3;
    outline: none;
    box-shadow: 0 0 0 2px rgba(93, 63, 211, 0.2);
  }
  
  #phone:invalid:not(:placeholder-shown) {
    border-color: #ff4d4d;
  }

  #phone:invalid:not(:placeholder-shown) + .error-message {
    display: block;
  }
  </style>
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

// --- Показать Глоссарий ---
function showGlossary() {
  contentArea.innerHTML = glossaryContent;
  setSidebarActiveButton(btnGlossary);
  contentArea.focus();
}

// --- Показать Обратную связь ---
function showFeedback() {
  contentArea.innerHTML = feedbackContent;
  setSidebarActiveButton(btnFeedback);
  contentArea.focus();

  const form = document.getElementById("feedback-form");
  const phoneInput = document.getElementById("phone");

  // Маска ввода телефона
  phoneInput.addEventListener("input", function (e) {
    const x = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

    e.target.value = !x[2]
      ? "+7"
      : `+7 (${x[2]}${x[3] ? `) ${x[3]}` : ""}${x[4] ? `-${x[4]}` : ""}${
          x[5] ? `-${x[5]}` : ""
        }`;
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Проверка валидности формы
    if (validateForm()) {
      // В реальном приложении здесь был бы AJAX-запрос к серверу
      showSuccessMessage();
    }
  });
}

// --- Валидация формы ---
function validateForm() {
  let isValid = true;
  const form = document.getElementById("feedback-form");
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    const errorMessage = input.nextElementSibling;

    if (!input.value.trim()) {
      errorMessage.textContent = "Это поле обязательно для заполнения";
      isValid = false;
    } else if (input.type === "email" && !validateEmail(input.value)) {
      errorMessage.textContent = "Пожалуйста, введите корректный email";
      isValid = false;
    } else if (input.id === "phone" && !validatePhone(input.value)) {
      errorMessage.textContent = "Пожалуйста, введите корректный номер";
      isValid = false;
    } else {
      errorMessage.textContent = "";
    }
  });

  return isValid;
}

// --- Валидация email ---
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// --- Валидация телефона ---
function validatePhone(phone) {
  const re = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
  return re.test(phone);
}

// --- Показать сообщение об успешной отправке ---
function showSuccessMessage() {
  const form = document.getElementById("feedback-form");
  form.style.display = "none";

  const successHTML = `
  <div class="success-message">
    <div class="success-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24">
        <path fill="#3fd35d" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
      </svg>
    </div>
    <h2>Спасибо за ваш отзыв!</h2>
    <p>Ваше сообщение успешно доставлено.</p>
    <div class="success-decoration">
      <div class="decoration-circle"></div>
      <div class="decoration-circle"></div>
    </div>
  </div>

  <style>
    .success-message {
      text-align: center;
      padding: 40px 30px;
      background: #f8f9fa;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      max-width: 500px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      animation: fadeIn 0.6s ease-out;
    }
    
    .success-icon {
      margin: 0 auto 20px;
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: scaleIn 0.8s;
    }
    
    .success-icon svg {
      animation: drawCircle 1.2s ease-in-out;
    }
    
    .success-message h2 {
      color: #2e7d32;
      margin-bottom: 15px;
      font-size: 24px;
      font-weight: 600;
    }
    
    .success-message p {
      color: #555;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 10px;
    }
    
    .success-decoration {
      position: absolute;
      bottom: -30px;
      right: -30px;
      opacity: 0.08;
    }
    
    .decoration-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: #4CAF50;
      position: absolute;
    }
    
    .decoration-circle:nth-child(1) {
      top: 0;
      left: 0;
    }
    
    .decoration-circle:nth-child(2) {
      top: 30px;
      left: 50px;
      width: 80px;
      height: 80px;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes scaleIn {
      0% { transform: scale(0); opacity: 0; }
      80% { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes drawCircle {
      0% { stroke-dasharray: 0, 100; }
      100% { stroke-dasharray: 100, 100; }
    }
  </style>
`;

  form.insertAdjacentHTML("afterend", successHTML);
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

// --- Показать Базу знаний ---
function showKnowledgeBase() {
  contentArea.innerHTML = knowledgeBaseContent;
  setSidebarActiveButton(btnKnowledgeBase);
  contentArea.focus();
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
  btnKnowledgeBase.addEventListener("click", showKnowledgeBase);
  btnGlossary.addEventListener("click", showGlossary);
  btnFeedback.addEventListener("click", showFeedback);

  // Экспорт функции для вызова из содержания
  window.showTextbook = showTextbook;
}

init();
