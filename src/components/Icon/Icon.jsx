import './Icon.scss'
import classNames from 'classnames'
import { Icon as MinistaIcon } from 'minista' // Фреймворк Minista уже умеет встроенное решение для работы с иконками через специальный компонент Icon, который мы можем импортировать из пути Minista.

const Icon = (props) => {
	const {
		className,
		name,
		hasFill = false,
		
	} = props

	return (
		<span 
			className={classNames(className, 'icon')}
		>
			<MinistaIcon 
				iconId={name} // По iconId, в который мы здесь передаем name, компонент MinistaIcon будет искать в папке src/assests/icons файл svg икноки с таким же названием.
				fill={hasFill ? 'currentColor' : 'none'}
				stroke={hasFill ? 'none' : 'currentColor'}
			/> { /* Далее используем в наше разметке компонент MinistaIcon как одиночный тег и указываем ему prop iconId={name}*/ }
		</span>
	)
}

export default Icon