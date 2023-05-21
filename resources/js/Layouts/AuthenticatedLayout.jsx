import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';

export default function Authenticated({ user, children }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleLogout = () => {
        axios.post('/logout')
        .then(() => {
            Inertia.visit('/login');
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <Typography variant="subtitle1" style={{ marginRight: 15 }}>
                        {user.name}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List>
                    <ListItem button onClick={() => { Inertia.visit('/profile') }}>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Drawer>

            <main style={{ padding: 20 }}>
                {children}
            </main>
        </div>
    );
}
