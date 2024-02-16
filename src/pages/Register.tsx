import React, { Suspense } from "react";

 export default function Register() {
    return (
        <Suspense fallback={<RegisterSuspense/>}>
            <div>Это Register</div>
        </Suspense>
    )
 }

 function RegisterSuspense() {
    return (<p>Страница загружается...</p>)
 }