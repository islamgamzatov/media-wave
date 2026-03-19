import './Categories.scss'
import Section from '../../layouts/Section'
import CategoryCard from '../../components/CategoryCard'

const Categories = () => {
	const categoryItems = [
		{
			title: 'Action',
			images: [
				'/src/assets/images/categories/action/1.jpg',
				'/src/assets/images/categories/action/1.jpg',
				'/src/assets/images/categories/action/1.jpg',
				'/src/assets/images/categories/action/1.jpg',
			],
		},
		{
			title: 'Adventure',
			images: [
				'/src/assets/images/categories/action/1.jpg',
				'/src/assets/images/categories/action/1.jpg',
				'/src/assets/images/categories/action/1.jpg',
				'/src/assets/images/categories/action/1.jpg',
			],
		},
		{
			title: 'Comedy',
			images: [
				'/src/assets/images/categories/action/1.jpg',
				'/src/assets/images/categories/action/1.jpg',
				'/src/assets/images/categories/action/1.jpg',
				'/src/assets/images/categories/action/1.jpg',
			],
		},
		{
			title: 'Drama',
			images: [
				'/src/assets/images/categories/action/1.jpg',
				'/src/assets/images/categories/action/1.jpg',
				'/src/assets/images/categories/action/1.jpg',
				'/src/assets/images/categories/action/1.jpg',
			],
		},
		{
			title: 'Horror',
			images: [
				'/src/assets/images/categories/action/1.jpg',
				'/src/assets/images/categories/action/1.jpg',
				'/src/assets/images/categories/action/1.jpg',
				'/src/assets/images/categories/action/1.jpg',
			],
		},
	]
	return (
		<Section
			title = "Explore our wide variety of categories"
			titleId = 'categories-id'
			description = "Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new"
			actions = {(
				<div>
					<button>Назад</button>
					<button>Вперед</button>
				</div>
			)}
			isActionsHiddenOnMobile
		>
			{categoryItems.map((categoryItem, index) => (
				<CategoryCard
					{...categoryItem}
					key={index}
				/>
			))}
		</Section>
	)
}

export default Categories