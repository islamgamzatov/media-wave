import 'swiper/css'
import './Slider.scss' // Если пренебречь последовательностью подключения файлов, то мы рискукем обрубить себе возможность повлиять на стили Slider
import SliderNavigation from './components/SliderNavigation'

const defaultSliderParams = { // Этот объект следует заполнить в соотвествии API библиотеки Swiper. Передо мной стоит задача сделать так, чтобы JSX компонент Slider в своих параметрах мог принимать объект конфигурации для Swiper, за что будет отвечать SliderParams
	slidesPerView: 5, // Кол-во слайдов, которое мы видим на desktop версии макета. Отвечает за кол-во единовременно отображаемых слайдов.
	slidesPerGroup: 5, // Отвечает за кол-во сгруппированных слайдов, которые будут прокручиваться группами. Зачастую для slidesPerView и slidesPerGroup задают одинаковые значения.
	spaceBetween: 30,
}

const Slider = (props) => {
	const {
		children,
		navigationTargetElementId = null, // При вызове компонента сюда будет передаваться строка с Id элемента, который и будет отвечать за навигацию слайдера. На этот параметр мы будем опираться в JS коде, чтобы найти конкретный дом элемент с навигацией слайдера и связать его с конкретным слайдером. Когда нам протребуется визуально вынести навигацию за пределы слайдера.
		sliderParams = defaultSliderParams, // Нам нужно сделать так, чтобы JSX компонент Slider в своих параметрах мог принимать объект конфигурации для Swiper, за что и отвечает sliderParams.
	} = props
	return (
		<div 
			className="slider"
			data-js-slider={JSON.stringify({ // Прокидываем sliderParams в разметку так, чтобы далее мы могли в рамках js кода получить эти данные
				sliderParams, // Объект кофигурации для Swiper
				navigationTargetElementId // Для определения DOM-элемента, который в рамках конкретного Slider будет отвечать за навигацию.
			})} 
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