const getAttrNameSelector = (attrSelector) => { // Функция в параметрах будет ожидать строку с css селектором по атрибуту. Задача этой функции обрубить у строчки квадратные скобки в начале и в конце (извлечь чистое имя атрибута)
	return attrSelector.substring( // В круглые скобки передаем два аргумента: начальный и конечный индекс подстроки
		1,
		attrSelector.length - 1
	)
}

export default getAttrNameSelector