// @ts-nocheck

import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

export default function Error404() {
    return (
        <Suspense fallback={<Error404Suspense/>}>
            <div>Это Error 404</div>
        </Suspense>
    )
}

function Error404Suspense() {
    const { t } = useTranslation();

    return (<p>{t('page is loading')}</p>)
}