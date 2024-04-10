import { Suspense } from "react";
import Stack from '@mui/material/Stack';
import { Button, Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { languages } from "../i18n";

export default function HelloMobile() {
    const { t, i18n } = useTranslation();

    console.log()

    return (
    <Suspense fallback={<HelloMobileSuspense/>}>
        <Grid container direction="column" spacing={2} alignItems="center" justifyContent="center" minHeight="100vh">
            <Grid item margin={0}>
                <h1>{GetTimesOfDay()}</h1>
                <span>{t('select language')}</span>
            </Grid>
            <Grid item>
                <Stack spacing={2}>
                    
                    {Array.from(languages.keys())
                        .map(language => 
                            <Button variant="contained" onClick={() => i18n.changeLanguage(language)}>{languages.get(language)}</Button>)}
                </Stack>
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={() => open("/mobile/map")} sx={{mt: 2, color: "red"}}>{t('continue')}</Button>
            </Grid>
        </Grid>
    </Suspense>
    );
}

function GetTimesOfDay() {
    var hours = new Date().getHours()
    const { t, i18n } = useTranslation();

    if (hours < 6 || hours > 23) return t('good night')
    else if (hours >= 6 && hours < 12) return t('good morning')
    else if (hours < 18) return t('good afternoon')
    else return t('good evening')
}

function HelloMobileSuspense() {
    return (<p>Страница загружается...</p>)
 }
