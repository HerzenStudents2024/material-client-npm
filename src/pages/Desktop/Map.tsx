// @ts-nocheck

import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

export default function Map() {
    return (
        <Suspense fallback={<MapSuspense/>}>
            <div>Это Map</div>
        </Suspense>
    )
}

function MapSuspense() {
    const { t } = useTranslation();

    return (<p>{t('page is loading')}</p>)
}