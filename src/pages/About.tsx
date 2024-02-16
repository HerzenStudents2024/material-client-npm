import React, { Suspense } from "react";

 export default function About() {
    return (
        <Suspense fallback={<AboutSuspense/>}>
            <div></div>
        </Suspense>
    )
 }

 function AboutSuspense() {
    return (<p>Страница загружается...</p>)
 }