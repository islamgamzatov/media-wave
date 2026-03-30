import getParams from "../utils/getParams"

const rootSelector = '[data-js-tabs]'

class Tabs {
	selectors = {
		root: rootSelector,
		navigation: '[data-js-tabs-navigation]',
		button: '[data-js-tabs-button]',
		content: '[data-js-tabs-content]',
	}

	stateClasses = {
		isActive: 'is-active',
	}

	stateCSSVariables = {
		activeButtonWidth: '--tabsActiveButtonWidth',
		activeButtonOffsetLeft: '--activeButtonOffsetLeft',
	}

	constructor(rootElement) {
		this.rootElement = rootElement
		this.params = getParams(this.rootElement, this.selectors.root)
		this.navigationElement = this.params.navigationTargetElementId
			? document.getElementById(this.params.navigationTargetElementId)
			: this.rootElement.querySelector(this.selectors.navigation)
		this.buttonElements = [...this.navigationElement.querySelectorAll(this.selectors.button)] // Обернем результат выражения в квадратные скобки, укажем в начале spread operator (...). Это нужно, чтобы в дальнйшем коде без проблем применять к this.buttonElements любые методы массивов (в частности, findIindex)
		this.contentElements = [...this.rootElement.querySelectorAll(this.selectors.content)]
		this.state = { // Объект состояния компонента
			activeTabIndex: this.buttonElements.findIndex(({ ariaSelected }) => ariaSelected) // Функция внутри findIndex возвращает true или false в зависимости от значения ariaSelected. Сам findIndex возвращает число, индекс элемента, в значении ariaSelected которого true. Таким образом, мы определяем индекс активного таба
		}
		this.limitTabsIndex = this.buttonElements.length - 1 // Так мы получим индекс последенего элемента табов или, другими словами, лимит индекса табов. Это нужно, чтобы корректно зациклить переключение табов через клавиши клавиатуры
		this.bindEvents()
	}

	updateUI() { // Цель этого метода - обновить DOM-дерево, раскидать значения атрибутов элементам текущего компонента табов
		const { activeTabIndex } = this.state

		this.buttonElements.forEach((buttonElement, index) => {
			const isActive = index === activeTabIndex // Так мы узнаем, должна ли быть активной текущая кнопка buttonElement или нет

			buttonElement.classList.toggle(this.stateClasses.isActive, isActive)
			buttonElement.ariaSelected = isActive
			buttonElement.tabIndex = isActive ? 0 : -1
		})

		this.contentElements.forEach((contentElement, index) => {
			const isActive = index === activeTabIndex
			
			contentElement.classList.toggle(this.stateClasses.isActive, isActive)
		})
	}

	onButtonClick(buttonIndex) {
		this.state.activeTabIndex = buttonIndex
		this.updateUI()
	}

	bindEvents() { // В рамках тела данного метода я буду привязывать слушатели различных событий, необходимых для работы текущего компонента.
		this.buttonElements.forEach((buttonElement, index) => { // Начнем с кликов по кнопкам навигации
			buttonElement.addEventListener('click', () => this.onButtonClick(index)) // В рамках каждой итеррации на ButtonElement через метод addEventListener вешаем слушатель события клика, в качестве втрого аргумента передаем стрелочную функцию, которая будет вызывать через this метод onButtonClick и передавать ему в аргументы сущность index
		})
	}
}

class TabsCollection {
	constructor() {
		this.init()
	}

	init() {
		document.querySelectorAll(rootSelector).forEach((element) => {
			new Tabs(element)
		})
	}
}

export default TabsCollection