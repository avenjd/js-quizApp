'use strict'
const quizQuestionBox = document.querySelector('.quiz__question__box')
const quizAnswers = document.querySelector('.quiz__answers')
const submitButton = document.querySelector('.btn')

const API_LINK = 'https://quizapi.io/api/v1/questions'
const API_KEY = 'fskktED1lARHF7zv3OnMjHFuE1vMlYTY94wWbZlM'
const API_CATEGORY = 'javascript'
const API_LIMIT = 1
const URL =
	'https://quizapi.io/api/v1/questions' +
	'?apiKey=' +
	API_KEY +
	'&tags=' +
	API_CATEGORY +
	'&limit=' +
	API_LIMIT +
	'&multiple_correct_answers=false'
axios
	.get(URL)
	.then((res) => {
		//generowanie pytań
		generateQuestion(res)
		//generowanie wszystkich odpowiedzi
		generateAnswers(res)

		getAllAnswers()

		//funckja ktora bedzie nadawala nasluchiwanie na wszystkie answ
		// sprwadzanie czy jakikolwiek z nich zawiera klase checked, jesli zawiera to mu ja usunac a nadac temu w ktory kliknal uzytkownik

		//wcisniecie guzika podsumowanie
		submitButton.addEventListener('click', submitAnswer)
	})
	.catch((e) => {
		console.log(e)
	})

const generateQuestion = (res) => {
	const question = document.createElement('p')
	question.classList.add('quiz__question')
	question.textContent = res.data[0].question
	quizQuestionBox.append(question)
}

const generateAnswers = (res) => {
	let ans = Object.values(res.data[0].answers)
	const arrayOfAnswers = []
	for (let i = 0; i < ans.length; i++) {
		if (ans[i] != null) {
			arrayOfAnswers.push(ans[i])
		}
	}
	for (const e of arrayOfAnswers) {
		const answer = document.createElement('div')
		answer.classList.add('quiz__answer')
		answer.textContent = e
		quizAnswers.append(answer)
	}
}

const getAllAnswers = () => {
	//pobieranie wszystkich quizAnswerów z html kolekcji do arraya
	const allAns = Array.from(document.getElementsByClassName('quiz__answer'))

	//nadawnie nasluchiwania na wszystkie answery
	allAns.forEach((item) => {
		item.addEventListener('click', setOneToActive)
	})
}

const setOneToActive = (e) => {
	//wszystkie odpowiedzi
	const allAns = Array.from(document.getElementsByClassName('quiz__answer'))

	//wybrana odpowiedz
	const choosedAns = e.target

	//pomijanie elementu wybranego ze wszystkich
	const allOtherAns = allAns.filter((e) => {
		return e !== choosedAns
	})

	//ze wszystkich prócz pominiętego usuwanie klasy checked
	allOtherAns.forEach((e) => {
		e.classList.remove('checked')
	})

	//na wybrany element dodawanie klasy checked
	choosedAns.classList.add('checked')
}

const submitAnswer = () => {
	console.log('button click')
}
