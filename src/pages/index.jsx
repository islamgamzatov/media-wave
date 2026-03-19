// Данный файл отвечает за компонент главной страницы.
import Categories from "../sections/Categories"
import Hero from "../sections/Hero"

export const metadata = {
	title: 'Home',
  isHeaderFixed: true,
}

export default function () {
  return (
    <>
      <Hero />
      <Categories />
    </>
  )
}
