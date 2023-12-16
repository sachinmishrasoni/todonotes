import { useState } from 'react';
import { AppBar, Avatar, IconButton, Stack, Toolbar, Tooltip } from "@mui/material";
import TodoImg from "../../../assets/image/todo.png";
import SettingsDrawer from "./SettingsDrawer";
import AppName2 from './AppName2';
import { SettingsOutlined } from '@mui/icons-material';


const Header = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <>
            <AppBar
                position={"sticky"}
                sx={{
                    justifyContent: 'center',
                    height: '60px',
                    borderRadius: '0 0 15px 15px',
                    backgroundColor: 'myThemeColors.primary',
                    color: 'inherit'
                }}
            >
                <Toolbar
                    sx={{
                        px: '8px !important',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
                        <Avatar
                            src={TodoImg}
                            sx={{
                                width: { xxs: 40, sm: 45 },
                                height: { xxs: 40, sm: 45 }
                            }}
                        />

                        <AppName2 />
                    </Stack>
                    


                    <Tooltip title='Settings'>
                        <IconButton size="small" onClick={() => setIsSettingsOpen(true)}>
                            <SettingsOutlined />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            {/* Settings Drawer */}
            <SettingsDrawer isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} />
        </>
    )
}

export default Header