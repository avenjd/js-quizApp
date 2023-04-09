'use strict'
const quizQuestionBox = document.querySelector('.quiz__question__box')
const quizAnswers = document.querySelector('.quiz__answers')

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
		const question = document.createElement('p')
		question.classList.add('quiz__question')
		question.textContent = res.data[0].question
		quizQuestionBox.append(question)

		//generowanie wszystkich odpowiedzi
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
		
		const allAns = document.getElementsByClassName('quiz__answer')
		console.log(allAns)

		let clickEvent = () => {
			console.log('some event content here...')
		}

		Array.from(allAns).forEach((item) => {
			item.addEventListener('click', clickEvent)
		})
	})
	.catch((e) => {
		console.log(e)
	})
