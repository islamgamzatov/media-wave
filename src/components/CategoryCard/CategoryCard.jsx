import './CategoryCard.scss'
import { Image } from 'minista'
import Icon from '@/components/Icon'

const CategoryCard = (props) => {
	const {
		title, // Строка с текстом загловка
		images = [], // Массив строк с путями до файлов изображений
	} = props

	return (
		<a className="category-card" href="/movies">
			<div className="category-card__images">
				{images.map((imgSrc, index) => (
					<Image // <-- Во фреймворке Minista есть встроенный компонент Image. Компоненту достаточно передать параметр src, а на выходе в финальной разметке мы получим максимально заполенный элемент img.
						className='category-card__image'
						src={imgSrc}
						key={index} // Указываем key={index}, т.к. этот элемент является корневым, который возвращается на каждой итеррации map.
					/>
				))}
			</div>
			<div className="category-card__body">
				<h3 className="category-card__title">
					{title}
				</h3>
				<Icon 
					className="category-card__icon" 
					name="arrow-right"
				/>
			</div>
		</a>
	)
}

export default CategoryCard