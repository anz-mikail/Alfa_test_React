import React from 'react'
import "./Footer.css";


function Footer () {
    return (
        <footer>
            <ul className="self_info">
                <li>+7(938)024-04-66</li>
                <li>e-mail: anz.mikail@mail.ru</li>
                <li><a
                    className='link'
                    href='https://github.com/anz-mikail'
                    rel="noreferrer"
                    target='_blank'>
                    GitHub: github.com/anz-mikail</a>
                </li>
                <li><a
                    className='link'
                    href='https://t.me/Mikael_Anz'
                    rel="noreferrer"
                    target='_blank'>Telegram: @Mikael_Anz</a>
                </li>
            </ul>
        </footer>
    )
}

export default Footer;