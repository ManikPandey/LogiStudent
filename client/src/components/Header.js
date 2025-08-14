import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to='/' sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
                    LogiStudent
                </Typography>
                
                {user ? (
                    <>
                    {user.role === 'admin' && (
                            <Button color="inherit" component={Link} to="/admin/dashboard">
                                Admin
                            </Button>
                        )}
                    
                    <Button color="inherit" component={Link} to="/dashboard">
                        Dashboard
                    </Button>
                    <Button color="inherit" onClick={onLogout}>
                        Logout
                    </Button>
                </>
            ) : (
                <>
                    <Button color="inherit" component={Link} to='/login'>Login</Button>
                    <Button color="inherit" component={Link} to='/register'>Register</Button>
                </>
            )}
        </Toolbar>
    </AppBar>
    )
}

export default Header;