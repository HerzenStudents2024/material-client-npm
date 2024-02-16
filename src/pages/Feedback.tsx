import React, { Suspense } from "react";

 export default function Feedback() {
    return (
        <Suspense fallback={<FeedbackSuspense/>}>
            <div>Это Feedback</div>
        </Suspense>
    )
 }

 function FeedbackSuspense() {
    return (<p>Страница загружается...</p>)
 }