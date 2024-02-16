import React, { Suspense } from "react";

 export default function Map() {
    return (
        <Suspense fallback={<MapSuspense/>}>
            <div>Это Map</div>
        </Suspense>
    )
 }

 function MapSuspense() {
    return (<p>Страница загружается...</p>)
 }