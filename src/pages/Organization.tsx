import React, { Suspense } from "react";
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
    return (<p>Страница загружается...</p>)
 }