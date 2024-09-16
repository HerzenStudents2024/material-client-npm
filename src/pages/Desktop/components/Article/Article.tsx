// @ts-nocheck

import { Suspense, useState } from 'react'
import './Article.css'
import { useTranslation } from 'react-i18next';
import StandartContainer from '../StandartContainer/StandartContainer';

interface Article {
  name: string
  childrens: any
}

export default function Article(props: Article) {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
  };

  return <StandartContainer>
    <p className='article-name'>
      {props.name}
    </p>
    {props.childrens}
  </StandartContainer>
}
