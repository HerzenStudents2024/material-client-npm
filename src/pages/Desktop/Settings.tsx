import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

export default function Settings() {
    return (
        <Suspense fallback={<SettingsSuspense/>}>
            <div>Это Settings</div>
        </Suspense>
    )
}

function SettingsSuspense() {
    const { t } = useTranslation();

    return (<p>{t('page is loading')}</p>)
}