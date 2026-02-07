// Это корневой файл, который оборачивает ВСЕ страницы, чтобы не пришлось на каждой странице (в файлах index.jsx, )
import '@/styles'
import { Head } from "minista" // Встроенный в фреймворк minista JSX компонент Head, который в качестве children, принимет любые элементы, которые в итоге попадут внутрь HTML элемента head.
import Header from "@/layouts/Header" // Обращение к одноименному Header выглядит непрофессионально. В папке каждого компонента будет собственный файл с названием index.js
import Content from "@/layouts/Content"
import Footer from "@/layouts/Footer"

export default function (props) { // Компонент в параметрах будет ожидать сущность props, которая является объектом.

	const {
		children,
		title,
	 } = props
  return (
    <>
      <Head htmlAttributes={{ lang: 'en' }}> {/* Сюда в формате объекта в качестве значения мы можем передать атрибут элемента HTML, который попадет в итогую разметку */}
        <title>Media Wave | {title}</title>
				<script src="/src/main.js" type="module"/> {/* type="module" нужен, чтобы скрипт загружался после того, как обработается весь HTML код в body*/}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" /> {/* Теперь в терминале IDE мы не увидим предупреждения, что сборщик проектов не может найти подключенную favicon. Для этого мы воспользовались сервсисом favicon.io*/}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
     </Head>
      <Header />
      <Content>
        {children}
      </Content>
      <Footer />
    </>
  )
}
