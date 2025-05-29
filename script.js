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
    <p class="glossary-intro">Здесь собраны ключевые термины курса «Инженерная компьютерная графика» с подробными определениями.</p>
    
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

// Контент для обратной связи

const feedbackContent = `
  <div class="feedback-page">
    <h1>Обратная связь</h1>
    <p class="feedback-intro">Пожалуйста, заполните форму ниже, чтобы отправить нам ваши вопросы или предложения.</p>
    
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
        
        <button type="submit" class="submit-btn">Отправить сообщение</button>
      </form>
    </div>

    <div class="contacts-section">
      <h2>Наши контакты</h2>
      <div class="contacts-grid">
        <div class="contact-card">
          <div class="contact-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#5d3fd3">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          
          <div class="contact-info">
            <h3>Электронная почта</h3>
            <a href="mailto:creatorbook@gmail.com" class="contact-link">
              creatorbook@gmail.com
            </a>
          </div>
        </div>
        
        <div class="contact-card">
          <div class="contact-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#5d3fd3">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
          </div>
          <div class="contact-info">
            <h3>Телефон</h3>
            <a href="tel:88005553535" class="contact-link">
              8 800 555 35 35
            </a>
          </div>
        </div>
        
        <div class="contact-card">
          <div class="contact-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#5d3fd3">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
    </svg>
          </div>
          <div class="contact-info">
            <h3>Режим работы</h3>
            <p class="work-hours">
              <span class="days">ПН-ПТ:</span> 9:00–18:00
            </p>
            <p class="work-hours">
              <span class="days">СБ-ВС:</span> выходной
            </p>
          </div>
        </div>

        <div class="contact-card">
  <div class="contact-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#5d3fd3">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  </div>
  <div class="contact-info">
    <p class="address">
      <strong>Адрес:</strong> г. Сызрань,
      ул. Гидротурбинная, д. 9
    </p>
    <p class="website">
      <strong>Сайт:</strong> 
      <a href="https://spk.minobr63.ru/" target="_blank" rel="noopener noreferrer" class="website-link">
        spk.minobr63.ru
      </a>
    </p>
  </div>
</div>

      </div>
    </div>
  </div>

  <style>
    .feedback-page {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #333;
    }
    
    .feedback-page h1 {
      text-align: center;
      margin-bottom: 15px;
    }
    
    .feedback-intro {
      text-align: center;
      color: #555;
      margin-bottom: 30px;
      font-size: 1.1em;
      line-height: 1.5;
    }
    
    .feedback-container {
      background: #fff;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      margin-bottom: 40px;
    }
    
    .feedback-form {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
    }
    
    .form-group label {
      font-weight: 500;
      margin-bottom: 8px;
      color: #444;
    }
    
    .form-group input,
    .form-group textarea {
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      transition: all 0.3s ease;
    }
    
    .form-group textarea {
      min-height: 120px;
      resize: vertical;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
      border-color: #5d3fd3;
      box-shadow: 0 0 0 3px rgba(93, 63, 211, 0.1);
      outline: none;
    }
    
    .error-message {
      color: #e74c3c;
      font-size: 13px;
      margin-top: 5px;
      min-height: 18px;
    }
    
    .submit-btn {
      background: #5d3fd3;
      color: white;
      border: none;
      padding: 14px 20px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 10px;
    }
    
    .submit-btn:hover {
      background: #4a32a8;
      transform: translateY(-2px);
    }
    
    /* Контакты */
    .contacts-section {
      text-align: center;
      margin-top: 30px;
    }
    
    .contacts-section h2 {
      color: #2c3e50;
      position: relative;
      display: inline-block;
      margin-bottom: 40px;
      font-size: 24px;
    }
    
    .contacts-section h2::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: #5d3fd3;
      border-radius: 3px;
    }
    
    .contacts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 25px;
    }
    
    .contact-card {
      background: #fff;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: center;
      text-align: left;
      transition: all 0.3s ease;
    }
    
    .contact-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    .contact-icon {
      width: 50px;
      height: 50px;
      background: rgba(93, 63, 211, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
      flex-shrink: 0;
    }
    
    .contact-icon svg {
      width: 24px;
      height: 24px;
    }
    
    .contact-info h3 {
      color: #333;
      margin-bottom: 10px;
      font-size: 18px;
    }
    
    .contact-link {
      color: #555;
      text-decoration: none;
      transition: color 0.3s;
      display: block;
      margin-bottom: 5px;
    }
    
    .contact-link:hover {
      color: #5d3fd3;
    }
    
    .work-hours {
      color: #555;
      margin: 5px 0;
    }
    
    .days {
      font-weight: 500;
      color: #444;
    }
    
    /* Адаптивность */
    @media (max-width: 768px) {
      .feedback-container {
        padding: 20px;
      }
      
      .contacts-grid {
        grid-template-columns: 1fr;
      }
      
      .contact-card {
        flex-direction: column;
        text-align: center;
        padding: 20px;
      }
      
      .contact-icon {
        margin-right: 0;
        margin-bottom: 15px;
      }
    }

    .address {
    color: #555;
    margin: 8px 0;
    line-height: 1.5;
  }
  
  .website {
    color: #555;
    margin: 8px 0;
  }
  
  .website-link {
    color: #5d3fd3;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .website-link:hover {
    color: #4a32a8;
    text-decoration: underline;
  }
  
  .contact-info strong {
    color: #333;
    font-weight: 500;
  }
  </style>
`;

// --- Генерация списка содержания ---
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
    <div class="content-navigation">
      <a href="pages/lectures/lectures.html" class="content-link">
        <span id="lectures-btn-content">
          <p class="material-icons">menu_book</p>
          Лекции
        </span>
      </a>
      <a href="pages/practical/practical.html" class="content-link">
        <span id="practical-btn-content">
          <p class="material-icons">science</p>
          Практические
        </span>
      </a>
      <a href="pages/tests/tests.html" class="content-link">
        <span id="tests-btn-content">
          <p class="material-icons">quiz</p>
          Тесты
        </span>
      </a>
    </div>

    <style>
    .content-navigation {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.content-link {
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
}

.content-link:hover {
  transform: scale(1.05);
}

#lectures-btn-content, #practical-btn-content, #tests-btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  padding: 10px;
  border-radius: 10px;
  background-color: #f1f1f1;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

    </style>
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
      border-radius: 16px;
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
