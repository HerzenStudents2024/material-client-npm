import React, { Suspense } from "react";

 export default function Login() {
    return (
        <Suspense fallback={<LoginSuspense/>}>
            <div>Это Login</div>
        </Suspense>
    )
 }

 function LoginSuspense() {
    return (<p>Страница загружается...</p>)
 }