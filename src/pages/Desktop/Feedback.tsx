import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

export default function Feedback() {
    return (
        <Suspense fallback={<FeedbackSuspense/>}>
            <div>Это Feedback</div>
        </Suspense>
    )
}

function FeedbackSuspense() {
    const { t } = useTranslation();

    return (<p>{t('page is loading')}</p>)
}