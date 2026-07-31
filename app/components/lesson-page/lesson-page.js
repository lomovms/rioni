export default (function initLessonQuiz() {
	const root = document.querySelector('[data-lesson-quiz]');
	if (!root) return;

	const flowEl = root.querySelector('[data-lesson-quiz-flow]');
	const questionEl = root.querySelector('[data-lesson-quiz-question]');
	const answersEl = root.querySelector('[data-lesson-quiz-answers]');
	const progressEl = root.querySelector('[data-lesson-quiz-progress]');
	const nextBtn = root.querySelector('[data-lesson-quiz-next]');
	const resultsEl = root.querySelector('[data-lesson-quiz-results]');
	const summaryEl = root.querySelector('[data-lesson-quiz-summary]');
	const reviewEl = root.querySelector('[data-lesson-quiz-review]');
	if (!flowEl || !questionEl || !answersEl || !progressEl || !nextBtn || !resultsEl || !summaryEl || !reviewEl) return;

	const quiz = [
		{
			question: '1. Вопросы по видео на которые можно ответить самостоятельно, выбрав правильный вариант ответа, несколько вопросов для базовой проверки?',
			answers: ['Вариант ответа', 'Вариант ответа', 'Вариант ответа', 'Вариант ответа'],
			correctIndex: 2,
			explanation: 'Пояснение: Тут написать понятный ответ, почему именно 3 вариант был правильным, а не остальные варианты.'
		},
		{
			question: '2. Какой показатель лучше всего отражает изменение цены актива во времени?',
			answers: ['Волатильность', 'Ликвидность', 'Рентабельность', 'Капитализация'],
			correctIndex: 0,
			explanation: 'Волатильность показывает степень колебания цены актива за определенный период времени.'
		},
		{
			question: '3. Кто является посредником между инвестором и биржей?',
			answers: ['Аналитик', 'Брокер', 'Маркетмейкер', 'Эмитент'],
			correctIndex: 1,
			explanation: 'Брокер предоставляет инвестору доступ к торгам и исполняет его поручения на бирже.'
		},
		{
			question: '4. Что из перечисленного чаще всего относится к пассивному доходу инвестора?',
			answers: ['Комиссия брокера', 'Дивиденды', 'Спред', 'Маржинальный займ'],
			correctIndex: 1,
			explanation: 'Дивиденды - это регулярные выплаты инвестору от прибыли компании, относящиеся к пассивному доходу.'
		}
	];

	let current = 0;
	const selectedAnswers = {};

	function renderQuestion() {
		const item = quiz[current];
		if (!item) return;

		questionEl.textContent = item.question;
		progressEl.textContent = `${current + 1}/${quiz.length} вопросов`;
		nextBtn.disabled = true;
		answersEl.innerHTML = '';

		item.answers.forEach(function(answerText, index) {
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'lesson-quiz__answer';
			btn.setAttribute('data-answer-index', String(index));
			btn.textContent = answerText;
			answersEl.appendChild(btn);
		});
	}

	function buildSummary() {
		summaryEl.innerHTML = '';

		quiz.forEach(function(item, index) {
			var selectedIndex = selectedAnswers[index];
			var selectedText = item.answers[selectedIndex] || 'Ответ не выбран';
			var isCorrect = selectedIndex === item.correctIndex;
			var card = document.createElement('div');
			card.className = 'lesson-quiz__summary-item' + (isCorrect ? ' is-correct' : ' is-wrong');
			card.textContent = (index + 1) + '. ' + selectedText;
			summaryEl.appendChild(card);
		});
	}

	function createReviewAnswer(text, modClass) {
		var el = document.createElement('div');
		el.className = 'lesson-quiz__review-answer' + (modClass ? ' ' + modClass : '');
		el.textContent = text;
		return el;
	}

	function buildReview() {
		reviewEl.innerHTML = '';

		var wrongQuestions = quiz.filter(function(item, index) {
			return selectedAnswers[index] !== item.correctIndex;
		});

		if (!wrongQuestions.length) {
			var success = document.createElement('div');
			success.className = 'lesson-quiz__review-success';
			success.textContent = 'Все ответы верные. Отличная работа!';
			reviewEl.appendChild(success);
			return;
		}

		wrongQuestions.forEach(function(item, wrongIndex) {
			var originalIndex = quiz.indexOf(item);
			var selectedIndex = selectedAnswers[originalIndex];
			var reviewItem = document.createElement('div');
			reviewItem.className = 'lesson-quiz__review-item' + (wrongIndex === 0 ? ' is-open' : '');

			var head = document.createElement('button');
			head.type = 'button';
			head.className = 'lesson-quiz__review-head';
			head.setAttribute('aria-expanded', wrongIndex === 0 ? 'true' : 'false');
			head.innerHTML = '<span>Разбор ошибок</span><span class="lesson-quiz__review-arrow" aria-hidden="true"></span>';

			var body = document.createElement('div');
			body.className = 'lesson-quiz__review-body';
			if (wrongIndex !== 0) {
				body.hidden = true;
			}

			var question = document.createElement('p');
			question.className = 'lesson-quiz__review-question';
			question.textContent = item.question;
			body.appendChild(question);

			var answers = document.createElement('div');
			answers.className = 'lesson-quiz__review-answers';

			item.answers.forEach(function(answer, answerIndex) {
				var modClass = '';
				if (answerIndex === item.correctIndex) {
					modClass = 'is-correct';
				} else if (answerIndex === selectedIndex) {
					modClass = 'is-wrong';
				}
				answers.appendChild(createReviewAnswer(answer, modClass));
			});

			body.appendChild(answers);

			var explanation = document.createElement('p');
			explanation.className = 'lesson-quiz__review-explanation';
			explanation.textContent = item.explanation;
			body.appendChild(explanation);

			head.addEventListener('click', function() {
				var isOpen = reviewItem.classList.contains('is-open');
				reviewItem.classList.toggle('is-open', !isOpen);
				head.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
				body.hidden = isOpen;
			});

			reviewItem.appendChild(head);
			reviewItem.appendChild(body);
			reviewEl.appendChild(reviewItem);
		});
	}

	function showResults() {
		flowEl.hidden = true;
		resultsEl.hidden = false;
		buildSummary();
		buildReview();
	}

	function selectAnswer(buttonEl) {
		const buttons = answersEl.querySelectorAll('.lesson-quiz__answer');
		buttons.forEach(function(btn) {
			btn.classList.remove('is-selected');
		});

		buttonEl.classList.add('is-selected');
		selectedAnswers[current] = Number(buttonEl.getAttribute('data-answer-index'));
		nextBtn.disabled = false;
	}

	function goNext() {
		if (current >= quiz.length - 1) {
			showResults();
			return;
		}

		current += 1;
		renderQuestion();
	}

	answersEl.addEventListener('click', function(event) {
		const answerBtn = event.target.closest('.lesson-quiz__answer');
		if (!answerBtn) return;

		selectAnswer(answerBtn);
	});

	nextBtn.addEventListener('click', function() {
		if (nextBtn.disabled) return;
		goNext();
	});

	renderQuestion();
})();
