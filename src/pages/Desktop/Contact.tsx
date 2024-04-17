import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
    return (
        <Suspense fallback={<ContactSuspense/>}>
            <div>Это Contact</div>
        </Suspense>
    )
}

function ContactSuspense() {
    const { t } = useTranslation();

    return (<p>{t('page is loading')}</p>)
}