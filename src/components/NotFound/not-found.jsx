import React from "react";
import notFound from './img/img.png';
import s from './styles.module.css';
import { Link } from 'react-router-dom';

export const NotFound = ( {children, title, buttonText = "На главную", buttonAction} ) => {
	return (
		<>
		<div className={s.btnA}>
			{buttonAction
					? <a href="#" className="btn" onClick={buttonAction}>{buttonText}</a>
					: <Link to="/" className="btn" >{buttonText}</Link>
				}
		</div>
		
			<div className={s.notFound}>
				<img src={notFound} className={s.image} aria-hidden="true" alt="" />
				<h1 className={s.title}>{title}</h1>
				{children && children}
				
			</div>
			
        </>
	);
}