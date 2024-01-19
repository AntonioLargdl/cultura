import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useGetLocale, useSetLocale } from "@refinedev/core";
import { RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import i18n from "i18next";
import React from "react";
import comision from '../../assets/comision_white.webp'
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FcFilmReel, FcGlobe } from "react-icons/fc";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { PiFilmReelFill } from "react-icons/pi";
import { GiFilmProjector } from "react-icons/gi";

export const HeaderComision: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky = true,}) => {
  const navigate = useNavigate()
  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();

  return (
    <AppBar position="fixed" sx={{background: 'none', boxShadow:'none', color:"white", margin:"20px 0"}}>
      <Toolbar>
        <Stack direction="row" width="100%" alignItems="center" >
          <img src={comision} alt="comision" className="w-36"/>
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
              onClick={() => {navigate('/cfm/locaciones')}}
            >
              <FaMagnifyingGlassLocation />
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
