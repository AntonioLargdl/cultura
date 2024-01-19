import React from "react";
import { useRouterContext, TitleProps, useLink, useRouterType,} from "@refinedev/core";
import { Button, useTheme } from "@mui/material";

import logoBlack from "../../assets/secretaria.webp"
import logoWhite from "../../assets/secretaria_white.webp"
import iconBlack from "../../assets/icon.webp"
import iconWhite from "../../assets/icon_white.webp"

export const AppIcon: React.FC<TitleProps> = ({ collapsed }) => {
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? logoWhite : logoBlack;
    const icon = theme.palette.mode === 'dark' ? iconWhite : iconBlack;

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    return (
        <Button fullWidth variant="text" disableRipple>
            <ActiveLink to="/">
                {collapsed ? (
                    <img
                        src={icon}
                        alt="moreliabrilla"
                        width="35px"
                        style={{ maxHeight: "45px" }}
                    />
                    ) : (
                    <img src={logo} alt="Refine" width="150px" />
                )}
            </ActiveLink>
        </Button>
    );
};