const pxToRem = (pixels) => {
	const htmlElementFontSize = parseInt(
		getComputedStyle(document.documentElement).fontSize // Выясним, какой font-size указан для корневого элемента разметки (html). getComputedStyle — это метод JavaScript, который возвращает объект, содержащий значения всех CSS-свойств элемента, фактически примененных браузером. Здесь будет строка с указанием пикселей в качестве единицы измерения, поэтому, чтобы из получить именно чистое число, используем parseInt
	)

	return pixels / htmlElementFontSize
}

export default pxToRem