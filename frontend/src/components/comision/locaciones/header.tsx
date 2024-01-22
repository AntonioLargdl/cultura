import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useGetLocale, useSetLocale } from "@refinedev/core";
import { RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import { IconButton, useTheme } from "@mui/material";
import i18n from "i18next";
import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { GiFilmProjector } from "react-icons/gi";
import comision from '../../../assets/comision.webp'
import comisionWhite from '../../../assets/comision_white.webp'
import { ColorModeContext } from "../../../contexts/color-mode";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

export const HeaderLocaciones: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky = true,}) => {
    const { mode, setMode } = useContext(ColorModeContext);

    const navigate = useNavigate()
    const changeLanguage = useSetLocale();
    const locale = useGetLocale();
    const currentLocale = locale();

        //  color switcher
    const theme = useTheme();
    const color = theme.palette.mode === 'dark' ? 'white' : 'black';
    const bgcolor = theme.palette.mode === 'dark' ? 'black' : 'white';
    const logo = theme.palette.mode === 'light' ? comision : comisionWhite;

  return (
    <AppBar position="fixed" sx={{background:bgcolor ,boxShadow:'none', color:color, padding:"20px 0"}}>
      <Toolbar>
        <Stack direction="row" width="100%" alignItems="center" >
            <Link to="/cfm">
                <img src={logo} alt="comision" className="w-36"/>
            </Link>
          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
            gap="10px"
          >
            <IconButton
              color="inherit"
              onClick={() => {navigate('/cfm/directorio')}}
            >
              <GiFilmProjector />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={() => {
                setMode();
              }}
            >
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>
            <FormControl sx={{ minWidth: 64 }}>
              <Select
                disableUnderline
                defaultValue={currentLocale}
                inputProps={{ "aria-label": "Without label" }}
                variant="standard"
                sx={{
                  color: "inherit",
                  "& .MuiSvgIcon-root": {
                    color: "inherit",
                  },
                  "& .MuiStack-root > .MuiTypography-root": {
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  },
                }}
              >
                {[...(i18n.languages ?? [])].sort().map((lang: string) => (
                  // @ts-ignore
                  <MenuItem
                    selected={currentLocale === lang}
                    key={lang}
                    defaultValue={lang}
                    onClick={() => {
                      changeLanguage(lang);
                    }}
                    value={lang}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Avatar
                        sx={{
                          width: "28px",
                          height: "20px",
                          marginRight: "5px",
                          marginLeft:"5px",
                          borderRadius:0
                        }}
                        src={`/images/flags/${lang}.svg`}
                      />
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};