import getIdGromTitle from "../../../utils/getIdFromTitle"


const getTabsElementsIdsFromTitle = (title) => {
	
	const titleFormatted = getIdGromTitle(title)
	const buttonId = `${titleFormatted}-tab`
	const contentId = `${titleFormatted}-tabpanel`

	return {
		buttonId: `${titleFormatted}-tab`,
		contentId: `${titleFormatted}-tabpanel`,
	}
}

export default getTabsElementsIdsFromTitle