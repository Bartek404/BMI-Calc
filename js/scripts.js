'use strict'
let weightInput
let heightInput
let resultBox
let btn
let chartList
let allLiItems
let error
let body
let btnClear
const re = /[^a-z ]\ *([.0-9])*\d/g

function getAllItems() {
	weightInput = document.querySelector('#weight')
	heightInput = document.querySelector('#height')
	resultBox = document.querySelector('#result')
	btn = document.querySelector('.calc')
	btnClear = document.querySelector('.clear')
	chartList = document.querySelector('ul')
	allLiItems = document.querySelectorAll('li')
	error = document.querySelector('.error')
	body = document.querySelector('body')
}
getAllItems()

const getBMI = () => {
	if (weightInput.value.match(re) && heightInput.value.match(re)) {
		let weight = weightInput.valueAsNumber
		let height = heightInput.valueAsNumber * 0.01
		result.value = weight / Math.round(height * 2)
		error.textContent = ''
	} else {
		error.textContent = 'Please enter a valid number!'
	}
}

const showOnChart = () => {
	let li
	if (result.value == 0) {
		error.textContent = 'Please enter a valid number!'
	} else if (18.5 > result.value) {
		li = document.querySelector('ul :nth-child(1)')
		li.classList.add('active')
	} else if (18.5 < result.value && result.value < 24.9) {
		li = document.querySelector('ul :nth-child(2)')
		li.classList.add('active')
	} else if (25 <= result.value && result.value <= 29.9) {
		li = document.querySelector('ul :nth-child(3)')
		li.classList.add('active')
	} else if (30 <= result.value) {
		li = document.querySelector('ul :nth-child(4)')
		li.classList.add('active')
	}
}

const removeActive = () => {
	allLiItems.forEach(item => {
		item.classList.remove('active')
	})
}

const changeBackgroundFn = () => {
	if (body.classList.contains('yellow' || 'green' || 'red')) {
		body.classList.remove('yellow')
		body.classList.remove('green')
		body.classList.remove('red')
	}
	if (0 < result.value && 18.5 > result.value) {
		body.classList.add('yellow')
	} else if (18.5 < result.value && result.value < 24.9) {
		body.classList.add('green')
	} else if (25 <= result.value && result.value <= 29.9) {
		body.classList.add('yellow')
	} else if (30 <= result.value) {
		body.classList.add('red')
	}
}

const clearFn = () => {
	weightInput.value = ''
	heightInput.value = ''
	result.value = ''
	removeActive()
	changeBackgroundFn()
}

const allFunctions = () => {
	removeActive()
	getBMI()
	showOnChart()
	changeBackgroundFn()
}

const allListeners = () => {
	btn.addEventListener('click', allFunctions)
	btnClear.addEventListener('click', clearFn)
	document.addEventListener('keypress', e => {
		if (e.key === 'Enter') {
			allFunctions()
		}
	})
	document.addEventListener('keyup', e => {
		if (e.key === 'Escape') {
			clearFn()
		}
	})
}
allListeners()
