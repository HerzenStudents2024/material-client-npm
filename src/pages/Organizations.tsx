import React, { Suspense } from "react";

 export default function Organizations() {
    return (
        <Suspense fallback={<OrganizationsSuspense/>}>
            <div>Это Organizations</div>
        </Suspense>
    )
 }

 function OrganizationsSuspense() {
    return (<p>Страница загружается...</p>)
 }