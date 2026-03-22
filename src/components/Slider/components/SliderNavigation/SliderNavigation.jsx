import classNames from 'classnames'
import './SliderNavigation.scss'
import Button from '../../../Button'

const SliderNavigation = (props) => {
	const {
		className, 
		id, 
		hasPagination = true, // Данный параметр будет отвечать за вывод в рамках компонента SliderNavigation блока с пагинацией (полосочки, отображающие текущий статус слайдера)
		mode = '', // '' (default) | 'tile'

	} = props

	return (
		<div 
			className={classNames(className, 'slider-navigation', {
				[`slider-navigation--${mode}`]: mode, // Когда сущнось mode будет не undefined и не пустой строкой, то корневому элементу slider-navigation добавиться дополнительный БЭМ-модификатор.
			})}
			id={id}
			data-js-slider-navigation=""
		>
			<Button 
				className="slider-navigation__arrow-button slider-navigation__arrow-button-previous"
				mode="black-10"
				iconName="arrow-left"
				label="Previous slide"
				isLabelHidden
				extraAttrs = {{
					'data-js-slider-previous-button': '',
				}}
			/>
			{hasPagination && (
				<div 
					className='slider-navigation__pagination'
					data-js-slider-pagination=""
				/>
			)}
			<Button 
				className="slider-navigation__arrow-button slider-navigation__arrow-button-next"
				mode="black-10"
				iconName="arrow-right"
				label="Next slide"
				isLabelHidden
				extraAttrs = {{
					'data-js-slider-next-button': '',
				}}
			/>
		</div>
	)
}

export default SliderNavigation