import React from "react";
import './index.css';
import telegram from "./img/telegram.svg";
import instagram from "./img/instagram.svg";
import viber from "./img/viber.svg";
import whatsapp from "./img/whatsapp.svg";
import vk from "./img/vk.svg";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer__wrapper">
						<div className="contacts">
							<ul className="socials contacts__socials">
								<li className="socials__item">
									<a className="socials__link" href="/#">
										<img src={telegram} alt="telegram" className="socials__icon"/>
									</a>
								</li>

								<li className="socials__item">
									<a className="socials__link" href="/#">
										<img src={whatsapp} alt="whatsapp" className="socials__icon"/>
									</a>
								</li>
								<li className="socials__item">
									<a className="socials__link" href="/#">
										<img src={viber} alt="viber" className="socials__icon"/>
									</a>
								</li>
								<li className="socials__item">
									<a className="socials__link" href="/#">
										<img src={instagram} alt="instagram" className="socials__icon"/>
									</a>
								</li>
								<li className="socials__item">
									<a className="socials__link" href="/#">
										<img src={vk} alt="vk" className="socials__icon"/>
									</a>
								</li>
							</ul>
						</div>

					</div>
				</div>
		</footer>
	);
};

export default Footer;