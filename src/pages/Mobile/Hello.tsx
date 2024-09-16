// @ts-nocheck

import { Suspense } from "react";
import Stack from '@mui/material/Stack';
import { Box, Button, Fade, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { languages } from "../../i18n";
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import React from "react";
import CookieIcon from '@mui/icons-material/Cookie';

export default function HelloMobile() {
    const { t, i18n } = useTranslation();
    const [bannerOpen, setBannerOpen] = React.useState(true);

    const closeBanner = () => {
        setBannerOpen(false);
    };

    return (
    <Suspense fallback={<HelloMobileSuspense/>}>
        <Grid 
            container
            direction="column" 
            spacing={2} 
            alignItems="center" 
            justifyContent="center" 
            minHeight="100vh"
        >
            <Grid item margin={0} alignItems="center" 
            justifyContent="center" >
                <h1>{GetTimesOfDay()}</h1>
                <span>{t('select language')}</span>
            </Grid>
            <Grid item>
                <Stack spacing={2}>
                    
                    {Array.from(languages.keys())
                        .map(language => 
                            <Button 
                                variant="contained"
                                onClick={() => i18n.changeLanguage(language)}
                            >
                                {languages.get(language)}
                            </Button>)}
                </Stack>
            </Grid>
            <Grid item>
                <Button 
                    variant="contained"
                    href="/mobile/map"
                    sx={{mt: 2}}
                >
                    {t('continue')}
                </Button>
            </Grid>
        </Grid>
        <TrapFocus open disableAutoFocus disableEnforceFocus>
            <Fade appear={false} in={bannerOpen}>
                <Paper
                    role="dialog"
                    aria-modal="false"
                    aria-label="Cookie banner"
                    square
                    variant="outlined"
                    tabIndex={-1}
                    sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    m: 0,
                    p: 2,
                    borderWidth: 0,
                    borderTopWidth: 1,
                    }}
                >
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        gap={2}
                    >
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            gap={2}
                        >
                            <CookieIcon sx={{height: "100%"}}></CookieIcon>
                            <Box
                                sx={{
                                flexShrink: 1,
                                alignSelf: { xs: 'flex-start', sm: 'center' },
                                }}
                            >
                                <Typography fontWeight="bold" align="left">{t("cookies title")}</Typography>
                                <Typography variant="body2" align="left">
                                {t("cookies text")}
                                </Typography>
                            </Box>
                        </Stack>
                            
                        <Stack
                            gap={2}
                            direction={{
                            xs: 'row-reverse',
                            sm: 'row',
                            }}
                            sx={{
                            flexShrink: 0,
                            alignSelf: { xs: 'flex-end', sm: 'center' },
                            }}
                        >
                            <Button size="small" onClick={closeBanner} variant="contained">
                            {t("cookies allow all")}
                            </Button>
                            <Button size="small" onClick={closeBanner}>
                            {t("cookies reject all")}
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Fade>
        </TrapFocus>
    </Suspense>
    );
}

function GetTimesOfDay() {
    var hours = new Date().getHours()
    const { t } = useTranslation();

    if (hours < 6 || hours > 23) return t('good night')
    else if (hours >= 6 && hours < 12) return t('good morning')
    else if (hours < 18) return t('good afternoon')
    else return t('good evening')
}

function HelloMobileSuspense() {
    const { t } = useTranslation();

    return (<p>{t('page is loading')}</p>)
 }
