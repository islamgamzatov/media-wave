import './Button.scss'
import classNames from 'classnames' // Импортируем функцию из библиотеки classnames.
import Icon from '@/components/Icon'

const Button = (props) => {
	const { // Деструктурируем значения свойств, чтобы иметь возможность обращаться к ним как к переменным.
		className,
		type = 'button', // Деструктурируем значение свойства button, чтобы нам не приходилось вручную прописывать type="button" каждый раз, если бы не использовали шаблонизатор разметки.
		href, // Компонент Button под капотом может быть или HTML элементом button, или ссылкой.
		target, // если target нет → по умолчанию _self.  {/* По умолчанию target="_self" Открывает ссылку в новой вкладке/окне, чтобы пользователь не ушёл с вашего сайта */}
		mode = '', // '' (default) | 'transparent' | 'black-10'
		label, // Параметр будет отвечать за текстовое содержимое кнопки // Если isLabelHidden=true, также используется как значение для атрибутов title и aria-label.
		isLabelHidden = false, // Данный булевый параметр нужен на случай, если текстовое содержимое кнопки отображаться не будет. isLabelHidden — скрыть текст, но оставить для скринридеров. А для кнопки с текстом это не нужно.
		iconName,
		iconPosition = 'before', // 'before' | 'after'
		hasFillIcon,

	} = props
	
	const isLink = href !== undefined
	const Component = isLink ? 'a' : 'button'
	const linksProps = { href, target } // Если имя свойства объекта совпадает с именем переменной, можно писать только имя переменной.
	const buttonProps = { type }
	const specificProps = isLink ? linksProps : buttonProps // Так мы, в зависимости от переданного в параметры href значения, сделаем наш компонент Button либо ссылкой, либо кнопкой в финальном HTML коде.
	const title = isLabelHidden ? label : undefined
	const iconComponent = iconName && 
		<Icon 
			className="button__icon" 
			name={iconName}
			hasFill={hasFillIcon}
		/>


	return (
		<Component
			className={classNames(className, 'button', {
				[`button--${mode}`]: mode, // <-- Это БЭМ-модификатор. Если mode не передали, то дополнительный класс модификатор не добавится, иначе добавиться соотвествующий класс БЭМ-модификатора.
			})}
			title={title} // Так, если title = undefined, ничего не произойдет. А при строке в значении будет добавлен атрибут с соотвествующим текстом.
			aria-label={title} // Аналогично описанному выше.
			{ ...specificProps } // Так мы развернем только нужные атрибуты, соотвествующие конкретной вариации компонента кнопки.
		>
			{iconPosition === 'before' && iconComponent}
			{!isLabelHidden && (
				<span className="button__label">{label}</span> // Мы выводим label с его span обреткой только когда isLabelHidden=false (текст виден, поэтому title и aria-label не нужны).
			)}
			{iconPosition === 'after' && iconComponent}
		</Component>
	)
}

export default Button;