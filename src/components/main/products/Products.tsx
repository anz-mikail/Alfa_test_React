import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addLike, disLike, addFavorite, deleteBase} from "../../../store/slice";
import heart from '../../../styles/icons/heart.png'
import heartRed from '../../../styles/icons/heartRed.png'
import like from '../../../styles/icons/like.png'
import favoriteBlack from '../../../styles/icons/favoritesBlack.png'
import favoriteIcon from '../../../styles/icons/favorites.png'
import deleteIcon from "../../../styles/icons/iconDelete.png"

import "./Products.css";


function Products () {
    const [favorite, setFavorite] = useState<boolean>(false)
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(0)

    const navigate = useNavigate();
    const dispatch = useDispatch()
    // @ts-ignore
    const base:any = useSelector(state => state.Data.base)
    const clickLike =  (event: number)=> {
        dispatch(addLike(event))
    }
    const clickDisLike =  (event: number)=> {
        dispatch(disLike(event))
    }
    const clickAddFavorite =  (event: number)=> {
        dispatch(addFavorite(event))
    }
    const clickDelete =  (event: number)=> {
        dispatch(deleteBase(event))
    }
    const handleChangeCheckbox = () => {
        setFavorite(!favorite)
    }
    const handleClickProduct = (event: number) => {
        navigate(`/products/${event}`)
    }

    useEffect(() => {
        const paginationElement: Element | any = document.querySelector('.pagination');
        const itemsPerPage = 12;
        const totalPages = Math.ceil(base.length / itemsPerPage);
        let currentPage = 1;

        function displayItems(page:any) {
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setStartIndex(startIndex)
            setEndIndex(endIndex);
        }
        function setupPagination() {
            paginationElement.innerHTML = ''; // Очистка пагинации

            // Кнопка "Предыдущая"
            const prevLi = document.createElement('li');
            const prevLink = document.createElement('a');
            prevLink.textContent = '«';
            prevLink.href = '#';
            prevLink.addEventListener('click', (e: any) => {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                }
            });
            prevLi.appendChild(prevLink);
            paginationElement.appendChild(prevLi);
            // Номера страниц
            for (let i = 1; i <= totalPages; i++) {
                const li: Element | any = document.createElement('li');
                const link: Element | any = document.createElement('a');
                link.textContent = i;
                link.href = '#';
                if (i === currentPage) {
                    link.classList.add('active');
                }
                link.addEventListener('click', (e: any) => {
                    e.preventDefault();
                    currentPage = i;
                    updatePagination();
                });
                li.appendChild(link);
                paginationElement.appendChild(li);
            }
            // Кнопка "Следующая"
            const nextLi = document.createElement('li');
            const nextLink = document.createElement('a');
            nextLink.textContent = '»';
            nextLink.href = '#';
            nextLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePagination();
                }
            });
            nextLi.appendChild(nextLink);
            paginationElement.appendChild(nextLi);
        }

        function updatePagination() {
            displayItems(currentPage);
            // Обновляем активный класс
            const links: Element | any = paginationElement.querySelectorAll('a');
            links.forEach((link: any) => {
                link.classList.remove('active');
                if (parseInt(link.textContent) === currentPage) {
                    link.classList.add('active');
                }
            });
            // Управление состоянием кнопок "Предыдущая/Следующая"
            paginationElement.querySelector('li:first-child a').style.pointerEvents = currentPage === 1 ? 'none' : 'auto';
            paginationElement.querySelector('li:last-child a').style.pointerEvents = currentPage === totalPages ? 'none' : 'auto';
        }
    // Инициализация
        displayItems(currentPage);
        setupPagination();
    }, [base.length]);

    return (
        <>
            <form className='checkboxForm'>
                <label className='checkboxLabel'>
                    <input
                        className='checkbox'
                        type="checkbox"
                        name="check"
                        onChange={handleChangeCheckbox}
                    />
                    <span>Показать избранные</span>
                </label>
                <Link to="/create-product">Создать новую запись</Link>
            </form>
            <div className='product-container'>
                {base.length !== undefined ?
                    base.slice(startIndex,endIndex).map((item: any, index: number) => (
                        (favorite && item.favorites) || !favorite?
                            <div key={index}>
                                <div className='favorites'>
                                    <img src={like} alt="like" className='like-icon'
                                         onClick={() => clickLike(index)}/>
                                    <img src={like} alt="like" className='disLike-icon'
                                         onClick={() => clickDisLike(index)}/>
                                    {item.like > 0 ?
                                        <img src={heartRed} alt="heart" className='heart-icon'/> :
                                        <img src={heart} alt="heart" className='heart-icon'/>
                                    }
                                    <p>{item?.like}</p>
                                    {item.favorites ?
                                        <img src={favoriteBlack} alt="favorite" className='like-icon'
                                             onClick={() => clickAddFavorite(index)}/> :
                                        <img src={favoriteIcon} alt="favorite" className='like-icon'
                                             onClick={() => clickAddFavorite(index)}/>
                                    }
                                    <img src={deleteIcon} alt="delete" className='like-icon'
                                         onClick={() => clickDelete(index)}/>
                                </div>
                                <div className="products" onClick={() => handleClickProduct(index)}>
                                    {item.text}
                                </div>
                            </div>
                            : null
                        ))
                    : null
                }
            </div>
            <div aria-label='paginate'>
                <ul className='pagination'></ul>
            </div>
        </>
    )
}


export default Products;