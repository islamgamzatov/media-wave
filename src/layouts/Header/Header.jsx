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
		<header className='header'>
			<div className="header__inner container">
				<Logo 
					className="header__logo"
					loading="eager"
				/>
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
				<BurgerButton className="header__burger-button"/>
			</div>
		</header>
	)
}

export default Header