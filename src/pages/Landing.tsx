import React, { Suspense } from "react";
import Header from "../components/Header/Header";
import NavigationPath from "../components/NavigationPath/NavigationPath";
import Article from "../components/Article/Article";

 export default function Landing() {
    return (
        <Suspense fallback={<LandingSuspense/>}>
            <Header></Header>
            <NavigationPath></NavigationPath>
            <Article name={"Пример названия статьи"} childrens={<p>Пример контента статьи</p>}></Article>
        </Suspense>
    )
 }

 function LandingSuspense() {
    return (<p>Страница загружается...</p>)
 }