import './Header.scss'
import Logo from '../../components/Logo'
import classNames from 'classnames'
import Button from '../../components/Button'
import BurgerButton from '../../components/BurgerButton'
// Верхнеуровневый слой, который нужно будет использовать на каждой странице.
const Header = (props) => { // Деструктурируем значение свойства url, переданного в объектом props
	const {
		url,
	} = props

	const menuItems = [ 
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Movies & Shows',
			href: '/movies',
		},
		{
			label: 'Support	',
			href: '/support',
		},
		{
			label: 'Subscriptions',
			href: '/subscriptions',
		},
	 ]

	return (
		<header className='header' data-js-overlay-menu=""> { /* Значение подобным атрибутом как пустую строку стоит указывать, потому что того требует JSX синтаксис */ }
			<div className="header__inner container">
				<Logo 
					className="header__logo"
					loading="eager"
				/>
				<dialog className="header__overlay-menu-dialog" data-js-overlay-menu-dialog=""> { /* Тег dialog - нативное решение, который из коробки предоставляет всю нужную функциональность. Особенности: По умолчанию на странице не виден (display: none). Чтобы его открыть обращаемся к DOM-элементу и вызываем его метод showModal. Чтобы его закрыть, достаточно обернуть внутреннюю кнопку в тег form, у которого в атрибуте method указано значения dialog. */ }
					<nav className="header__menu">
						<ul className="header__menu-list">
							{menuItems.map(({ label, href }, index) => ( // Благодаря фигурным скобкам в JSX синтаксисе мы можем использовать JS выражения, которые будут преобразованы в разметку.
								<li className="header__menu-item" key={index}>
									<a
										className={classNames('header__menu-link', { // C объектами в качестве аргумента функция classNames работает по таким правилам: в качестве имени свойства указывается css класс (is-active в нашем случае), а в качестве значения любые js выражения, результат которых будет вычислен как булевое значение. Если такое значение будет истинным, то класс is-active добавитьcя, а иначе нет.
											'is-active': href === url // Теперь класс is-active будет динамически добавляться в зависимости от изменяемого href (и совпадает ли он в href в ссылке) // Minista автоматически добавит is-active на нужной странице // Сравнит href ссылки с url страницы → определит → добавит
										})}
										href={href}
									>
										{label}
									</a>
								</li> // По правилам JSX синтаксиса при переборе массивов информации через метод map, корневому элементу возвращаемой разметки (li) нужно добавить специальный параметр key с уникальным идентификатором в значении (кстати, в качестве атрибуте в разметке ты его не увидишь, т.к. это подкапотоная механика самого jsx). В мире React указывать index в качестве ключа - это плохой тон, но в нашем случае можно (т.к. разметка генерируется сборщиком проектов и на выходе мы получим HTML файлы с уже полностью прописанной внутри разметкой). Если бы наша разметка генерировалась JSом в браузере пользователя (т.е. как в приложениях на React), то подобный код был бы не оптимален.
							))}
						</ul>
					</nav>
					<div className="header__actions">
						<Button 
							className="header__button"
							label="Search"
							isLabelHidden
							mode="transparent"
							iconName="search"
						/>
						<Button 
							className="header__button"
							label="Notifications"
							isLabelHidden
							mode="transparent"
							iconName="notification"
						/>
					</div>
				</dialog>
				<BurgerButton
					className="header__burger-button visible-tablet" // утилитарный класс visible-tablet нужен, чтобы кнопка отобразилась только на ширине экрана 1023px и уже.
					extraAttrs={{
						'data-js-overlay-menu-burger-button': '',
					}}
				/>
			</div>
		</header>
	)
}

export default Header