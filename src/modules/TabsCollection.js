import getParams from "../utils/getParams"
import BaseComponent from "./generic/BaseComponent"

const rootSelector = '[data-js-tabs]'

class Tabs extends BaseComponent {
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
		super() // Вызываем конструктор класса, от которого мы наследовались. Иначе мы получим ошибку.
		this.rootElement = rootElement
		this.params = getParams(this.rootElement, this.selectors.root)
		this.navigationElement = this.params.navigationTargetElementId
			? document.getElementById(this.params.navigationTargetElementId)
			: this.rootElement.querySelector(this.selectors.navigation)
		this.buttonElements = [...this.navigationElement.querySelectorAll(this.selectors.button)] // Обернем результат выражения в квадратные скобки, укажем в начале spread operator (...). Это нужно, чтобы в дальнйшем коде без проблем применять к this.buttonElements любые методы массивов (в частности, findIindex)
		this.contentElements = [...this.rootElement.querySelectorAll(this.selectors.content)]
		this.state = this.getProxyState({ // Объект состояния компонента. Т.к. state объект теперь проксируемый, то из-за подкаптоной механики, которую мы описали в абстрактном классе (из-за сравнения old и new value метод updateUI будет вызываться автоматически без нашего вмешательства)
			activeTabIndex: this.buttonElements.findIndex(({ ariaSelected }) => ariaSelected) // Функция внутри findIndex возвращает true или false в зависимости от значения ariaSelected. Сам findIndex возвращает число, индекс элемента, в значении ariaSelected которого true. Таким образом, мы определяем индекс активного таба
		})
		
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

	activateTab(newTabIndex) {
		this.state.activeTabIndex = newTabIndex
		this.buttonElements[newTabIndex].focus() // Получаем DOM-элемент конкретной кнопки и вызывает у этого элемента метод focus. Нам нужно дополнительно программно взять в фокус соотвествующую индексу кнопку навигации таба.
	}

	previousTab = () => { // т.е. если мы уже находимся на нулевом по индексу табе, то нужно активировать последений, и иначе предшествующий.
		const newTabIndex = this.state.activeTabIndex === 0
			? this.limitTabsIndex
			: this.state.activeTabIndex - 1

		this.activateTab(newTabIndex)
	}

	nextTab = () => {
		const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex
			? 0
			: this.state.activeTabIndex + 1

		this.activateTab(newTabIndex)
 	}
	
	firstTab = () => {
		this.activateTab(0)
	}

	lastTab = () => {
		this.activateTab(this.limitTabsIndex)
	}

	onButtonClick(buttonIndex) {
		this.state.activeTabIndex = buttonIndex
	}

	/*
		События клавиатуры (предназначены для обработки горячих клавиш):
		keydown - нажатие на клавишу
		keyup - отпускание клавиши
		Примечание: эти события неправильно использовать для отслеживания ввода каких-либо данных в поля input или text-area. Для этих целей есть отдельные события.
		В объекте event события клавиатуры есть свойства:
		key - в значении будет строка с символом нажатой клавиши, который соотвествует текущей раскладке клавиатуры
		code - в значении будет подкаптоный код нажатой клавиши. Особенность свойства в том, что его значение не зависит от текущей раскладки клавиатуры.
		При идентификации нажатой клавиши стоит ориентироваться на значение свойства code.
		keyCode - в значении числовой код нажатой клавиши (согласно таблице ACII символов). Особенность свойства в том, что его значение не зависит от текущей раскладки клавиатуры.
		altKey, ctrlKey, shiftKey, metaKey - содержат булевое значение, отвечают за факт одновременного нажатия на соответствующую специальную клавишу клавиатуры.
		metaKey - свойство для проверки нажатия на клавишу command на маках.
	*/

	onKeyDown = (event) => { // Добавляем метод в формате стрелочной записи, чтобы мочь в рамках методу обращаться к нужному контексту через this. В параметрах метод ожидает объект события event.
		// Проверим, были ли мы в момент нажатия на клавиши клавиатуры сфокусированы на элементе tabs__content или на кнопки навигации по табам tabs-navigation__button
		const { target, code, metaKey } = event // самый глубокий элемент в DOM, на котором непосредственно произошло событие. Использовать, когда нужно знать, на какую конкретно кнопку или ссылку внутри большого блока нажал пользователь.
		const isTabsContentFocused = this.contentElements
			.some((contentElement) => contentElement === target)
		const isTabsButtonFocused = this.buttonElements
			.some((buttonElement) => buttonElement === target)

		if (!isTabsContentFocused && !isTabsButtonFocused) {
			return // Если условие не выполняется, работа текущего onKeyDown прерывается
		}

		const action = { // В объекте понадобятся 4 свойства, каждое из которых отвечает за нажатие на определенную клавишу клавиатуры
			ArrowLeft: this.previousTab, // В значении каждого из этих свойств будет ссылка на конкретный метод нашего класса.
			ArrowRight: this.nextTab,
			Home: this.firstTab,
			End: this.lastTab,
		}[code] // obj[code] (возьми свойство, имя которого лежит в переменной code). Так в action получим ссылку на конкретный метод класса или undefined.

		// Клавиш Home и End нет клавиатурах маков, поэтому вместо этого на таких устройствах используется комбинация клавиш Meta + стрелка влево/вправо
		const isMacHomeKey = metaKey && code === 'ArrowLeft' // В metaKey всегда содержится значения true/false, отвечающее за то, была ли зажата клавиша meta или нет.
		if (isMacHomeKey) {
			event.preventDefault() // Отменяем поведение браузера по умолчанию, чтобы при нажатии Meta + arrow right/left не происходил переход на другую страницу.
			this.firstTab()
			return // Пререываем дальнейшее выполение кода текущего метода
		}

		const isMacEndKey = metaKey && code === 'ArrowRight' // В metaKey всегда содержится значения true/false, отвечающее за то, была ли зажата клавиша meta или нет.
		if (isMacEndKey) {
			event.preventDefault() // Отменяем поведение браузера по умолчанию, чтобы при нажатии Meta + arrow right/left не происходил переход на другую страницу.
			this.lastTab()
			return
		}

		// action?.() // Если action не undefined, то отработает один из методов выше. Иначе не сработает.

		if (action) {
			event.preventDefault()
			action()
		}
	}

	bindEvents() { // В рамках тела данного метода я буду привязывать слушатели различных событий, необходимых для работы текущего компонента.
		this.buttonElements.forEach((buttonElement, index) => { // Начнем с кликов по кнопкам навигации
			buttonElement.addEventListener('click', () => this.onButtonClick(index)) // В рамках каждой итеррации на ButtonElement через метод addEventListener вешаем слушатель события клика, в качестве втрого аргумента передаем стрелочную функцию, которая будет вызывать через this метод onButtonClick и передавать ему в аргументы сущность index
		})
		document.addEventListener('keydown', this.onKeyDown) // Добавляем к document слушатель события keydown
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