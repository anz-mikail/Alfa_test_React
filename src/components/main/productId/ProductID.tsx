import React, { useState } from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addFavorite, addLike, changeProduct, deleteBase, disLike} from "../../../store/slice";

import heart from '../../../styles/icons/heart.png'
import heartRed from '../../../styles/icons/heartRed.png'
import like from '../../../styles/icons/like.png'
import favoriteBlack from '../../../styles/icons/favoritesBlack.png'
import favoriteIcon from '../../../styles/icons/favorites.png'
import deleteIcon from "../../../styles/icons/iconDelete.png"

import "./ProductID.css";


function ProductID () {
    const params = useParams();
    const [changeText, setChangeText] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // @ts-ignore
    const productID:any = useSelector(state => state.Data.base[params.id]);

    const clickLike =  ()=> {
        dispatch(addLike(params.id))
    };
    const clickDisLike =  ()=> {
        dispatch(disLike(params.id))
    };
    const clickAddFavorite =  ()=> {
        dispatch(addFavorite(params.id))
    };
    const clickDelete =  ()=> {
        dispatch(deleteBase(params.id))
        navigate('/products')
    };
    const handleChangeBtn = () => {
        const saveBtn: Element | any = document.querySelector('.save-btn')
        const changeBtn: Element | any = document.querySelector('.change-btn')
        const productText: Element | any = document.querySelector('.product-text')
        const changeProductText: Element | any = document.querySelector('.change-product-text')
        saveBtn.style.display = 'block'
        changeBtn.style.display = 'none'
        changeProductText.style.display = 'block'
        productText.style.display = 'none'
    };
    const handleSave = () => {
        if (changeText) {
            const action = {
                id: params.id,
                text: changeText
            }
            dispatch(changeProduct(action))
            navigate('/products')
        } else {
            const validateText: Element | any = document.querySelector('.validate');
            validateText.style.display = 'block';
        }
    };
    return (
        <div className="ProductID">
            <Link to="/products">Главная страница</Link>
            <div className='favorites-container'>
                <img src={like} alt="like" className='like-icon'
                     onClick={clickLike}/>
                <img src={like} alt="like" className='disLike-icon'
                     onClick={clickDisLike}/>
                {productID?.like > 0 ?
                    <img src={heartRed} alt="heart" className='heart-icon'/> :
                    <img src={heart} alt="heart" className='heart-icon'/>}
                <span>{productID?.like}</span>
                {productID?.favorites ?
                    <img src={favoriteBlack} alt="favorite" className='like-icon'
                         onClick={clickAddFavorite}/> :
                    <img src={favoriteIcon} alt="favorite" className='like-icon'
                         onClick={clickAddFavorite}/>}
                <img src={deleteIcon} alt="delete" className='like-icon'
                     onClick={clickDelete}/>
            </div>
            <p className="product-text">{productID?.text}</p>
            <textarea
                className='change-product-text'
                onChange={e => setChangeText(e.target.value)}
                defaultValue={productID?.text}
            />
            <p className='validate'>Измените или наберите текст!</p>
            <button
                onClick={handleChangeBtn}
                className='change-btn'
            >Редактировать
            </button>
            <button
                onClick={handleSave}
                className='save-btn'
            >Сохранить
            </button>
        </div>
    );
}


export default ProductID;