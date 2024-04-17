import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

export default function Admin() {
    return (
        <Suspense fallback={<AdminSuspense/>}>
            <div>Это Admin</div>
        </Suspense>
    )
}

function AdminSuspense() {
    const { t } = useTranslation();

    return (<p>{t('page is loading')}</p>)
}