'use client'
import { AppBar, Avatar, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { IoMenu } from 'react-icons/io5';
import { useState } from 'react';
import Link from 'next/link';
import { GiReceiveMoney } from 'react-icons/gi';
import { FaStamp } from 'react-icons/fa';
import { BsFillGearFill, BsFillCalendarEventFill, BsYoutube, BsBuildingsFill } from 'react-icons/bs';
import { AiFillPlayCircle, AiOutlineCloudDownload } from 'react-icons/ai';
import { ImBlogger } from 'react-icons/im';
import { GoGoal } from 'react-icons/go';
import { MdArticle } from 'react-icons/md';
import { signIn, signOut, useSession } from 'next-auth/react';

const navigationIconsSize = '1.25rem';
const settings = ['Notifications', 'Log Out'];

const navigationItems = [
    {
        text: 'Research Paper & Articles',
        icon: <MdArticle style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/research-papers'
    },
    {
        text: 'Research Grants',
        icon: <GiReceiveMoney style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/research-grants'
    },
    {
        text: 'Patents',
        icon: <FaStamp style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/patents'
    },
    {
        text: 'Simulation Tools',
        icon: <BsFillGearFill style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/simulation-tools'
    },
    {
        text: 'Cources and Tutorials',
        icon: <AiFillPlayCircle style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/courses-and-tutorials'
    },
    {
        text: 'Conferences and Webinar events',
        icon: <BsFillCalendarEventFill style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/conferences-and-webinar-events',
    },
    {
        text: 'YouTube Content',
        icon: <BsYoutube style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/youtube-content'
    },
    {
        text: 'Blogs',
        icon: <ImBlogger style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/blogs'
    },
    {
        text: 'Projects',
        icon: <GoGoal style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/projects'
    },
    {
        text: 'Software & Tools',
        icon: <AiOutlineCloudDownload style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/software-and-tools'
    },
    {
        text: 'Companies',
        icon: <BsBuildingsFill style={{ width: navigationIconsSize, height: navigationIconsSize }} />,
        href: '/companies'
    }
]

const NavBar = () => {
    const { data: session } = useSession();
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const userProfile = session ?
        <Box sx={{ flexGrow: '0' }}>
            <Tooltip title={session.user.name}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Image" src={session.user.image} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem key='Notifications' onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Notifications</Typography>
                </MenuItem>
                <MenuItem key='Logout' onClick={() => signOut()}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
        :
        <Button variant='inherit' onClick={() => signIn()}>
            Login
        </Button>;

    return (
        <AppBar position={'sticky'} >
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setToggleDrawer(true)}>
                    <IoMenu />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: '1' }}>
                    <Link href="/">DNA Archive</Link>
                </Typography>
                {userProfile}
            </Toolbar>
            <Drawer
                anchor={'left'}
                open={toggleDrawer}
                onClose={() => setToggleDrawer(false)}
            >
                <Box sx={{ width: 250 }} role="presentation">
                    <List>

                        {navigationItems.map((item, idx) => (
                            <ListItem key={idx}>
                                <Link href={item.href} style={{ width: '100%' }}>
                                    <ListItemButton onClick={() => { setToggleDrawer(false) }} >
                                        <ListItemIcon sx={{ color: 'black' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText >
                                            {item.text}
                                        </ListItemText>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </AppBar >
    );
}

export default NavBar