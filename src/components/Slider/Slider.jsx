import 'swiper/css'
import './Slider.scss' // Если пренебречь последовательностью подключения файлов, то мы рискукем обрубить себе возможность повлиять на стили Slider
import SliderNavigation from './components/SliderNavigation'

const Slider = (props) => {
	const {
		children,
		navigationTargetElementId = null, // При вызове компонента сюда будет передаваться строка с Id элемента, который и будет отвечать за навигацию слайдера. На этот параметр мы будем опираться в JS коде, чтобы найти конкретный дом элемент с навигацией слайдера и связать его с конкретным слайдером. Когда нам протребуется визуально вынести навигацию за пределы слайдера.
	} = props
	return (
		<div 
			className="slider"
			data-js-slider=""
		>
			<div className="slider__wrapper swiper" data-js-slider-swiper="">
				<ul className="slider__list swiper-wrapper">
					{children.map((slide, index) => (
						<li className="slider__item swiper-slide" key={index}>
							{slide}
						</li>
					))}
				</ul>
			</div>
			{!navigationTargetElementId && (
				<SliderNavigation className="slider__navigation"/>
			)}
		</div>
	)
}

export default Slider