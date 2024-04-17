import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

export default function Login() {
    return (
        <Suspense fallback={<LoginSuspense/>}>
            <div>Это Login</div>
        </Suspense>
    )
}

function LoginSuspense() {
    const { t } = useTranslation();

    return (<p>{t('page is loading')}</p>)
}