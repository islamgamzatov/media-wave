// Данный файл отвечает за компонент главной страницы.
import Categories from "../sections/Categories"
import Hero from "../sections/Hero"
import Devices from "../sections/Devices"
import Questions from "../sections/Qusetions"
import Plans from "../sections/Plans"

export const metadata = {
	title: 'Home',
  isHeaderFixed: true,
}

export default function () {
  return (
    <>
      <Hero />
      <Categories />
      <Devices />
      <Questions />
      <Plans />
    </>
  )
}
