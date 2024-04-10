import { Suspense, useState } from 'react'
import './NavigationPath.css'
import { useTranslation } from 'react-i18next';
import StandartContainer from '../StandartContainer/StandartContainer';

export default function NavigationPath() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
  };

  return <StandartContainer>
    <p className='navigation-path'>
      <p>Тестовая строка 1</p>
      <p className='navigation-path__right-element'>Тестовая строка 2</p>
    </p>
  </StandartContainer>
}