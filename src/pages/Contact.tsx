import React, { Suspense } from "react";

 export default function Contact() {
    return (
        <Suspense fallback={<ContactSuspense/>}>
            <div>Это Contact</div>
        </Suspense>
    )
 }

 function ContactSuspense() {
    return (<p>Страница загружается...</p>)
 }