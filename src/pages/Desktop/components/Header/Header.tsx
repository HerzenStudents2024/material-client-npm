// @ts-nocheck

import { Suspense, useState } from 'react'
import './Header.css'
import logo from '/images/main/light-background-simple-logo.png'
import { useTranslation } from 'react-i18next';
import StandartContainer from '../StandartContainer/StandartContainer'

export default function Header() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
  };

  return <div className='header'>
    <StandartContainer>
        <div className='up-header'>
            <div className='up-header__left-block'>
                <a href="/">
                    <img src={logo} className="logo-img" alt='Main Page' />
                </a>
                <p className='logo-text'>РОССИЙСКИЙ ГОСУДАРСТВЕННЫЙ ПЕДАГОГИЧЕСКИЙ<br></br>УНИВЕРСИТЕТ ИМ. А. И. ГЕРЦЕНА</p>
            </div>
            <div className='up-header__right-block'>
                {/* <img src={magnifier} className='search-img up-header__right-block--item' alt='Search' />
                <img src={eye} className='font-size-img up-header__right-block--item' alt='Change font size' />
                <div className='up-header__right-block__language-block up-header__right-block--item'>
                    <p className='language-text'>{i18n.language}</p>
                    <img className='language-img' src={blueTriangle} alt="Change language" />
                </div> */}
            </div>
        </div>
    </StandartContainer>
    <div className='down-header'>
        <a className='down-header__bold-text' href='https://herzen.spb.ru/' target='_blank'>Основной сайт</a>
        <a className='down-header__text' href='algoritms'>Алгоритмы первокурсника</a>
        <a className='down-header__text' href='rgpu-map'>Карта РГПУ</a>
        <a className='down-header__text' href='other-algoritms'>Другие алгоритмы</a>
        <a className='down-header__text' href='help'>Помощь</a>
    </div>
  </div>
}
