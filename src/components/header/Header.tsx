import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { addBase, clearBase } from "../../store/slice";

import catIcon from '../../styles/icons/cat.png'
import "./Header.css";


function Header () {
    const dispatch = useDispatch()

    useEffect(() => {
        const Response = async () => {
            try {
                const Response = await fetch('https://meowfacts.herokuapp.com/?count=20', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    }
                })
                const Data = await Response.json()
                dispatch(addBase(Data.data))
            } catch (error) {
                console.error(error)
            }
        };
        Response()
    }, []);

    return (
        <nav>
            <button onClick={() => dispatch(clearBase())} className='clear-btn'>Очистить базу</button>
            <p>Забавные факты о кошачьих </p>
            <img src={catIcon} alt='cat' className='cat-icon'/>
        </nav>
    )
}


export default Header;