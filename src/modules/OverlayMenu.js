class OverlayMenu {
	selectors = { // Объект с css селекторами к нужным нам элементам разметки.
		root: '[data-js-overlay-menu]', // В значении в одиночных кавычках указываем CSS селектор по атрибуту.
		dialog: '[data-js-overlay-menu-dialog]',
		burgerButton: '[data-js-overlay-menu-burger-button]',
	}

	stateClasses = { // Здесь будут перечислены css классы состояний.
		isActive: 'is-active', // Будем добавлять BurgerButton
		isLock: 'is-lock',// Будем добавлять корневому элементу разметки HTML для блокировки вертикального скролла страницы.
	}

	constructor() {
		this.rootElement = document.querySelector(this.selectors.root)
		this.dialogElement = this.rootElement.querySelector(this.selectors.dialog)
		this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton)
		this.bindEvents()
	}

	onBurgerButtonClick = () => {
		this.burgerButtonElement.classList.toggle(this.stateClasses.isActive) // свойство classList в связке с методом toggle автоматически переключает указанный CSS-класс у элемента: добавляет его, если класса нет, и удаляет, если он уже присутствует.
		this.dialogElement.open = !this.dialogElement.open // Меняем значение свойства open на противоположное.
		document.documentElement.classList.toggle(this.stateClasses.isLock) // Блокировка вертикального скролла.
	}

	bindEvents() { // В подобных методах в синтаксисе JS классов мы будем привязывать слушатели браузерных событий к DOM-элементам.
		this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick)
	}
}

export default OverlayMenu