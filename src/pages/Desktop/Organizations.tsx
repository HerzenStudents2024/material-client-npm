import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

export default function Organizations() {
    return (
        <Suspense fallback={<OrganizationsSuspense/>}>
            <div>Это Organizations</div>
        </Suspense>
    )
}

function OrganizationsSuspense() {
    const { t } = useTranslation();

    return (<p>{t('page is loading')}</p>)
}