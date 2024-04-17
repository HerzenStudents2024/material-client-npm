import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

export default function Organization() {
    const params = useParams();
    return (
        <Suspense fallback={<OrganizationSuspense/>}>
            <div>Это Organization {params.organizationId}</div>
        </Suspense>
    )
}

function OrganizationSuspense() {
    const { t } = useTranslation();

    return (<p>{t('page is loading')}</p>)
}