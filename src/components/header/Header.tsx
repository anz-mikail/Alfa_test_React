import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { addBase } from "../../store/slice";

import catIcon from '../../styles/icons/cat.png'
import "./Header.css";


function Header () {
    const dispatch = useDispatch()
    useEffect(() => {
        const Response = async () => {
            try {
                const Response = await fetch('https://meowfacts.herokuapp.com/?count=100', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    }
                })
                const Data = await Response.json()
                // localStorage.clear()
                // Data.data.forEach((item: any, index: any) => {localStorage.setItem(index +1, JSON.stringify(item))})
                dispatch(addBase(Data.data))
            } catch (error) {
                console.error(error)
            }
        };
        Response();
    }, []);
    return (
        <nav>
            <p>Забавные факты о кошачьих </p>
            <img src={catIcon} alt='cat' className='cat-icon'/>
        </nav>
    )
}


export default Header;