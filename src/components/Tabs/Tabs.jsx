import './Tabs.scss'
import classNames from 'classnames'
import getTabsElementsIdsFromTitle from './utils/getTabsElementsIdsFromTitle'
import TabsNavigation from './components/TabsNavigation'

const Tabs = (props) => {
	const {
		className,
		title, // Компонент табов должен быть как-то озаглавлен. Т.к. по макету заголовка нет, мы все равно добавим визуально скрытый заголовок.
		items = [], // Массив объектов, в каждом из которых должно быть свойство title, children и опциональное булевое поле isActive, отвечающее за то, активирована ли конкрентная вкладка табов или нет.
		navigationTargetElementId = null,	
	} = props

	return (
		<div 
			className={classNames(className, 'tabs')}
			data-js-tabs={JSON.stringify({
				navigationTargetElementId,
			})}
		>
			{!navigationTargetElementId && ( // Если параметр navigationTargetElementId не передали, то будет считать, что разметка навигации табов должна находиться внутри элемента с классом tabs.
				<TabsNavigation title={title} items={items} />
			)}
			<div className="tabs__body">
				{items.map((item, index) => {
					const {
						title,
						children,
						isActive,
					} = item

					const { buttonId, contentId } = getTabsElementsIdsFromTitle(title)
					
					return (
						<div className={classNames('tabs__content', {
							'is-active': isActive,
						})}
						id={contentId}
						aria-labelledby={buttonId}
						tabIndex={0}
						data-js-tabs-content=""
						key={index}
						>
							{children}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Tabs