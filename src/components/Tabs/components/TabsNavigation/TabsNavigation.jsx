import './TabsNavigation.scss'
import getIdGromTitle from '../../../../utils/getIdFromTitle'
import classNames from 'classnames'
import getTabsElementsIdsFromTitle from '../../utils/getTabsElementsIdsFromTitle'

const TabsNavigation = (props) => {
	const {
		className,
		id,
		title,
		items = [],
	} = props

	const titleFormatted = getIdGromTitle(title)
	const titleId = `${titleFormatted}-title`

	return (
		<div 
			className={classNames(className, 'tabs-navigation')}
			id={id}
			role="tablist"
			aria-labelledby={titleId}
			data-js-tabs-navigation=""
		>
			<h3 className="visually-hidden" id={titleId}>
				{title}
			</h3>
			{items.map((item, index) => {
				const { buttonId, contentId } = getTabsElementsIdsFromTitle(item.title)

				return (
					<div 
						className={classNames('tabs-navigation__button', {
							'is-active': item.isActive,
						})}
						id={buttonId}
						aria-controls={contentId}
						role="tab" // Как раз для этого момента мы сделали кнопку через div. Если бы мы использовали тег button, то определять ему кастомную роль через атрибут role было бы неправильно. С div же мы можем делать что угодно.
						aria-selected={item.isActive}
						tabIndex={item.isActive ? 0 : -1}
						data-js-tabs-button=""
						key={index}
					>
						{item.title}
					</div>
				)
			})}
		</div>
	)
}

export default TabsNavigation