import React, { Suspense } from "react";

 export default function About() {
    return (
        <Suspense fallback={<AboutSuspense/>}>
            <div>Это About</div>
        </Suspense>
    )
 }

 function AboutSuspense() {
    return (<p>Страница загружается...</p>)
 }