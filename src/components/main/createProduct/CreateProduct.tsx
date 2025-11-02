import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "../../../store/slice";

import "./createProduct.css";
import { useDispatch } from "react-redux";


function CreateProduct () {
    const [newText, setNewText] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clickCreateProduct = () => {
        if (newText) {
            const newProduct = {
                text: newText,
                like: 0,
                favorites: false,
            }
            dispatch(createProduct(newProduct));
            navigate('/products')
        } else {
            const validateText: Element | any = document.querySelector('.validate');
            validateText.style.display = 'block';
        }
    }
    return (
        <div className="createProduct">
            <Link to="/products">Главная страница</Link>
            <textarea onChange={e => setNewText(e.target.value)}/>
            <p className='validate'>Для создания публикации нужно набрать текст</p>
            <button
                onClick={clickCreateProduct}
                className="create-btn"
            >Создать</button>
        </div>
    )
}

export default CreateProduct;