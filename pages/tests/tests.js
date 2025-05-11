// tests.js

document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.querySelector(".list-test");
  const mainContainer = document.querySelector("main");

  // Создаем контейнер для отображения открытого теста
  const openedContainer = document.createElement("div");
  openedContainer.classList.add("opened-test-container");
  mainContainer.appendChild(openedContainer);

  let testsData = null; // Здесь будут данные из JSON

  // Переменные для текущего теста
  let currentTest = null;
  let currentQuestionIndex = 0;
  let userAnswers = [];

  // Отрисовка списка тестов (карточек)
  function renderTestList() {
    openedContainer.innerHTML = ""; // Очистить контейнер вывода теста
    listContainer.innerHTML = ""; // Очистить список (на всякий случай)

    testsData.forEach((test) => {
      const card = document.createElement("div");
      card.classList.add("card-test");
      card.style.cursor = "pointer";
      card.innerHTML = `
        <span>
          Тест ${test.id}:
          <span class="test-title">${test.title}</span>
        </span>
      `;
      card.addEventListener("click", () => {
        startTest(test.id);
      });
      listContainer.appendChild(card);
    });
  }

  // Запуск теста по id
  function startTest(testId) {
    currentTest = testsData.find((t) => t.id === testId);
    if (!currentTest) return;

    // Скрыть список тестов
    listContainer.style.display = "none";
    openedContainer.style.display = "block";

    currentQuestionIndex = 0;
    userAnswers = [];
    renderQuestion();
  }

  // Отрисовка вопроса
  function renderQuestion() {
    const q = currentTest.questions[currentQuestionIndex];
    openedContainer.innerHTML = `
      <h2>Тест ${currentTest.id}: ${currentTest.title}</h2>
      <div class="question" style="margin-bottom: 20px;">
        <p><strong>Вопрос ${currentQuestionIndex + 1} из ${
      currentTest.questions.length
    }:</strong></p>
        <p>${q.question}</p>
      </div>
      <div class="options" style="margin-bottom: 10px;">
        ${q.options
          .map(
            (opt, i) => `
          <label style="display: block; margin-bottom: 10px; cursor: pointer;">
            <input type="radio" name="option" value="${i}" />
            ${opt}
          </label>
        `
          )
          .join("")}
      </div>
      <button id="next-btn" disabled style="
        background-color: #5D3FD3;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 6px;
        cursor: pointer;
      ">${
        currentQuestionIndex === currentTest.questions.length - 1
          ? "Завершить"
          : "Далее"
      }</button>
      <button id="back-btn" style="
        background-color: #aaa;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 6px;
        cursor: pointer;
        margin-left: 10px;
      ">Назад</button>
      <button id="exit-btn" style="
        background-color: #f44336;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 6px;
        cursor: pointer;
        margin-left: 10px;
      ">Выйти из теста</button>
    `;

    // Восстановить ранее выбранный ответ, если есть
    if (userAnswers[currentQuestionIndex] !== undefined) {
      const inputs = openedContainer.querySelectorAll('input[name="option"]');
      inputs[userAnswers[currentQuestionIndex]].checked = true;
      openedContainer.querySelector("#next-btn").disabled = false;
    }

    const options = openedContainer.querySelectorAll('input[name="option"]');
    const nextBtn = openedContainer.querySelector("#next-btn");
    const backBtn = openedContainer.querySelector("#back-btn");
    const exitBtn = openedContainer.querySelector("#exit-btn");

    options.forEach((option) => {
      option.addEventListener("change", () => {
        nextBtn.disabled = false;
      });
    });

    nextBtn.addEventListener("click", () => {
      const selected = openedContainer.querySelector(
        'input[name="option"]:checked'
      );
      if (!selected) return;
      userAnswers[currentQuestionIndex] = parseInt(selected.value, 10);
      currentQuestionIndex++;
      if (currentQuestionIndex < currentTest.questions.length) {
        renderQuestion();
      } else {
        showResults();
      }
    });

    backBtn.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
      }
    });

    exitBtn.addEventListener("click", () => {
      if (
        confirm(
          "Вы уверены, что хотите выйти из теста? Ваши ответы не будут сохранены."
        )
      ) {
        resetTest();
      }
    });
  }

  // Показать результаты теста
  function showResults() {
    let correctCount = 0;
    let resultsHtml = `<h2>Результаты теста ${currentTest.id}: ${currentTest.title}</h2><ol style="padding-left:20px;">`;

    currentTest.questions.forEach((q, idx) => {
      const userAnswer = userAnswers[idx];
      const isCorrect = userAnswer === q.correct;
      if (isCorrect) correctCount++;

      resultsHtml += `
        <li style="margin-bottom: 15px;">
          <p><strong>${q.question}</strong></p>
          <p>Ваш ответ: <span style="color: ${isCorrect ? "green" : "red"};">${
        q.options[userAnswer] ?? "Не выбран"
      }</span></p>
          ${
            !isCorrect
              ? `<p>Правильный ответ: <span style="color: green;">${
                  q.options[q.correct]
                }</span></p>`
              : ""
          }
        </li>
      `;
    });

    resultsHtml += "</ol>";
    resultsHtml += `<p style="font-weight: 700;">Правильных ответов: ${correctCount} из ${
      currentTest.questions.length
    } (${((correctCount / currentTest.questions.length) * 100).toFixed(
      0
    )}%)</p>`;

    const passPercent = 70;
    if ((correctCount / currentTest.questions.length) * 100 < passPercent) {
      resultsHtml += `<p style="color:red; font-weight:bold;">Тест не пройден. Попробуйте снова.</p>`;
      resultsHtml += `<button id="restart-btn" style="
        background-color: #7B66F7;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 20px;
      ">Начать заново</button>`;
    } else {
      resultsHtml += `<p style="color:green; font-weight:bold;">Тест успешно пройден!</p>`;
      resultsHtml += `<button id="restart-btn" style="
        background-color: #7B66F7;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 6px;
        cursor: pointer;
        margin-top: 20px;
      ">Пройти тест заново</button>`;
    }

    resultsHtml += `<button id="exit-to-list-btn" style="
      background-color: #5D3FD3;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 10px;
      margin-left: 10px;
    ">Вернуться к списку тестов</button>`;

    openedContainer.innerHTML = resultsHtml;

    document.getElementById("restart-btn").addEventListener("click", () => {
      currentQuestionIndex = 0;
      userAnswers = [];
      renderQuestion();
    });

    document
      .getElementById("exit-to-list-btn")
      .addEventListener("click", () => {
        resetTest();
      });
  }

  // Вернуть к списку тестов
  function resetTest() {
    currentTest = null;
    currentQuestionIndex = 0;
    userAnswers = [];
    openedContainer.style.display = "none";
    listContainer.style.display = "flex";
    openedContainer.innerHTML = "";
  }

  // Загрузка данных из JSON-файла
  fetch("testsData.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      testsData = data;
      renderTestList();
    })
    .catch((error) => {
      console.error("Ошибка загрузки данных тестов:", error);
      listContainer.innerHTML =
        '<p style="color:red;">Ошибка загрузки данных тестов. Попробуйте позже.</p>';
    });
});
