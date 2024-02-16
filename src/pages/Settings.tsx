import React, { Suspense } from "react";

 export default function Settings() {
    return (
        <Suspense fallback={<SettingsSuspense/>}>
            <div>Это Settings</div>
        </Suspense>
    )
 }

 function SettingsSuspense() {
    return (<p>Страница загружается...</p>)
 }