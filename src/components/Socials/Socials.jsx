import './Socials.scss'
import classNames from 'classnames'
import Button from '../Button'

const Socials = (props) => {
	const {
		className,
		links = [],
	} = props

	return (
		<div 
			className={classNames(className, 'soc1als')} // Буква i заменена на цифру 1. Таким способом мы обойдем некоторые блокировщики рекламы, которые по css классу soc1als без опечаток, скрыли бы наш элемент соцсетей, посчитав это рекламным банером.
		>
			<ul className="soc1als__list">
				{links.map(( {label, iconName}, index ) => (
					<li className="soc1als__item" key={index}>
						<Button
							className="soc1als__link"
							mode="black-10"
							href="/"
							target="_blank"
							label={label}
							isLabelHidden
							iconName={iconName}
							hasFillIcon
						/>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Socials