import React, { Suspense } from "react";

 export default function Admin() {
    return (
        <Suspense fallback={<AdminSuspense/>}>
            <div>Это Admin</div>
        </Suspense>
    )
 }

 function AdminSuspense() {
    return (<p>Страница загружается...</p>)
 }