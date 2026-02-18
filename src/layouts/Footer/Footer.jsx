// Верхнеуровневый слой, который нужно будет использовать на каждой странице.
import './Footer.scss'
import Socials from '../../components/Socials/Socials';

const Footer = () => {
	const menuItems = [
		{
			title: 'Home',
			links: ['Categories', 'Devices', 'Pricing', 'FAQ'],
			href: '/',
		},
		{
			title: 'Movies',
			links: ['Gernes', 'Trending', 'New Release', 'Popular'],
			href: '/movies',
		},
		{
			title: 'Shows',
			links: ['Gernes', 'Trending', 'New Release', 'Popular'],
			href: '/movies',
		},
		{
			title: 'Support',
			links: ['Contact Us'],
			href: '/support',
		},
		{
			title: 'Subscription',
			links: ['Plans', 'Features'],
			href: '/subscriptions',
		},
		{
			title: 'Connect With Us',
			socialLinks: [
				{
					label: 'Facebook', // label будем помещвть в качестве значения title и aria-label, т.к. ссылки по макету не имеют сопроводитлеьного текста.
					iconName: 'facebook', // Имя SVG-иконки, которую мы будем делать через уже известный подход со спрайтами.
				},
				{
					label: 'Twitter',
					iconName: 'twitter',
				},
				{	
					label: 'LinkedIn',
					iconName: 'linked-in',
				},
			],
			href: '/contactsus'
		}
	]

	const extraLinks = ['Terms of Use', 'Privacy Policy', 'Cookie Policy']

	return (
		<footer className="footer">
			<div className="footer__inner container">
				<nav className="footer__menu">
					{menuItems.map(( { title, links, socialLinks, href }, index ) => (
						<div className="footer__menu-column" key={index}>
							<a className="footer__menu-title h6" href={href}>{title}</a>
							{links?.length > 0 && (
								<ul className="footer__menu-list">
									{links.map(( link, index ) => (
										<li className="footer__menu-item" key={index}>
											<a className="footer__menu-link" href="/">
												{link}
											</a>
										</li>
									))}
								</ul>
							)}
							{socialLinks?.length > 0 && (
								<Socials className="footer__soc1als" links={socialLinks} />
							)}
						</div>
					))}
				</nav>
				<div className="footer__extra">
					<p className="footer__copyright">@<time dateTime='2023'>2023</time> streamvib, All Rights Reserved</p> {/* Имена большинства атрибутов в JSX синтаксисе мы пишем в camelCase нотации (исключения: дата атрибуты, атрибуты группы area в кебаб кейс) */}
					<div className="footer__extra-links">
						{extraLinks.map((link, index) => (
							<a className="footer__extra-link" href="/" key={index}>
								{link}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer;