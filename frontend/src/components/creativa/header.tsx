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
import comision from '../../assets/creativa_white.webp'
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { MdLibraryMusic } from "react-icons/md";

export const HeaderCreativa: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky = true,}) => {
  const navigate = useNavigate()
  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();

  return (
    <AppBar position="fixed" sx={{background: 'none', boxShadow:'none', color:"white", padding:"20px 0"}}>
      <Toolbar>
        <Stack direction="row" width="100%" alignItems="center" >
          <Link to="/creativa">
            <img src={comision} alt="comision" className="w-20"/>
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
              onClick={() => {navigate('/creativa/talento')}}
            >
              <MdLibraryMusic />
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
