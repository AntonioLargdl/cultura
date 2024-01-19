import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useGetIdentity, useGetLocale, useSetLocale } from "@refinedev/core";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import i18n from "i18next";
import React, { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import { useTheme } from "@mui/material";
import { IUser } from "../../interfaces/common";


export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { mode, setMode } = useContext(ColorModeContext);

  const { data: user } = useGetIdentity<IUser>();

  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();

  const theme = useTheme();
  const color = theme.palette.mode === 'dark' ? 'white' : 'black';
  const bgcolor = theme.palette.mode === 'dark' ? 'black' : 'white';


  return (
    <AppBar position={sticky ? "sticky" : "relative"} sx={{background:bgcolor ,boxShadow:'none', color:color}}>
      <Toolbar>
        <Stack direction="row" width="100%" alignItems="center" >
          <HamburgerMenu />
          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
            gap="16px"
          >
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

            <IconButton
              color="inherit"
              onClick={() => {
                setMode();
              }}
            >
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>

            {(user?.image || user?.username) && (
              <Stack
                direction="row"
                gap="16px"
                alignItems="center"
                justifyContent="center"
              >
                {user?.username && (
                  <Typography
                    sx={{
                      display: {
                        xs: "none",
                        sm: "inline-block",
                      },
                      textTransform: 'capitalize'
                    }}
                    variant="subtitle2"
                  >
                    {user?.username}
                  </Typography>
                )}
                <Avatar src={user?.image} alt={user?.username} />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
