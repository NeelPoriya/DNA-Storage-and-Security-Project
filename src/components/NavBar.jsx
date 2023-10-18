import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
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

const navigationIconsSize = '1.25rem';

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
    const [toggleDrawer, setToggleDrawer] = useState(false);

    return (
        <AppBar position={'sticky'} >
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setToggleDrawer(true)}>
                    <IoMenu />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    <Link href="/">DNA Archive</Link>
                </Typography>
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