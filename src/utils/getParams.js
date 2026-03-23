import getAttrNameSelector from "./getAttrNameFromSelector"

const getParams = (element, dataAttrSelector) => { // В параметрах функция принимает DOM-элемент и CSS селектор по data атрибуту
	return JSON.parse( // 3. И, т.к. значение является строкой, в которую вшит JSON объект, через метод JSON.parse мы преобразуем строку в JS объект. Ну и, наконец, функция getParams возвращает этот самый объект.
		element.getAttribute( // 2. Далее у DOM-элемента через getAttribute получаем значение data атрибута из разметки.
			getAttrNameSelector(dataAttrSelector) // 1. По цепочке из селектора по data атрибуту (dataAttrSelector) мы получим чистое имя атрибута без квадратных скобок. 
		)
	)
}

export default getParams