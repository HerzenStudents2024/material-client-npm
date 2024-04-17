import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

export default function Register() {
    return (
        <Suspense fallback={<RegisterSuspense/>}>
            <div>Это Register</div>
        </Suspense>
    )
}

function RegisterSuspense() {
    const { t } = useTranslation();

    return (<p>{t('page is loading')}</p>)
}