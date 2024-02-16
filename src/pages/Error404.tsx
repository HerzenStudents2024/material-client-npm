import React, { Suspense } from "react";

 export default function Error404() {
    return (
        <Suspense fallback={<Error404Suspense/>}>
            <div>Это Error 404</div>
        </Suspense>
    )
 }

 function Error404Suspense() {
    return (<p>Страница загружается...</p>)
 }