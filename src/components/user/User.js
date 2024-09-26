import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    CssBaseline,
    Paper,
    IconButton,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    TextField,
    Tooltip,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../../sections/reutilizables/SidebarCustom';
import { apiURL2 } from '../../config/apiConfig';
import { apiURL } from '../../config/apiConfig';
import axios from 'axios';

const User = () => {
    const theme = useTheme();
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [newUserName, setNewUserName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [userStatus, setUserStatus] = useState('1'); // Estado por defecto

    const api = apiURL2;

    let isMounted = true;
    const fetchUsers = async () => {
        try {
            if (api) {
                const response = await axios.get(api + '/listUsers');
                if (isMounted && response.data.code === '200') {
                    setUsers(JSON.parse(response.data.message));
                }
            } else {
                console.error('API URL is invalid');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
        return () => {
            isMounted = false;
        };
    }, [api]);

    const handleOpen = (type, user = null) => {
        setModalType(type);
        if (user) {
            setCurrentUser(user);
            setNewUserName(user.UserName);
            setNewPassword(''); // Clear password when editing
            setUserStatus(user.Estado); // Set user status for editing
        } else {
            setCurrentUser(null);
            setNewUserName('');
            setNewPassword('');
            setUserStatus('1'); // Set default status for new user
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        if (modalType === 'add') {
            await axios.post(apiURL + '/register', { UserName: newUserName, Password: newPassword })
                .then(response => {
                    if (response.data.code === '200') {
                        fetchUsers();
                        handleClose();
                    } else {
                        alert(response.data.message);
                    }
                })
                .catch(error => console.error('Error adding user:', error));
        } else if (modalType === 'edit' && currentUser) {
            console.log('Updating user:', currentUser.Id, newUserName, userStatus);
            const response = await axios.post(api + '/updateUser', {
                id: currentUser.Id.toString(),
                userName: newUserName,
                estado: userStatus,
            });
            console.log('Datos enviados:', { id: currentUser.Id, userName: newUserName, estado: userStatus });
            if (response.data.code === '200') {
                fetchUsers();
                handleClose();
            } else {
                alert(response.data.message);
            }
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <CssBaseline />
            <Sidebar />

            <Box
                component="main"
                sx={{ flexGrow: 1, padding: theme.spacing(3), marginTop: theme.spacing(8), minHeight: '100vh' }}
            >
                <AppBar position="fixed" sx={{ backgroundColor: '#1E3A8A', zIndex: theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Usuarios
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box sx={{ mt: 8 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpen('add')}
                    >
                        Agregar usuario
                    </Button>
                </Box>

                <Box sx={{ mt: 3 }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre de usuario</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.Id}>
                                        <TableCell>{user.UserName}</TableCell>
                                        <TableCell>{user.Estado === '1' ? 'Activo' : 'Inactivo'}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Edit">
                                                <IconButton onClick={() => handleOpen('edit', user)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Box
                            sx={{
                                width: '400px',
                                padding: theme.spacing(3),
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Typography variant="h6">
                                {modalType === 'add' ? 'Crear nuevo usuario' : 'Editar usuario'}
                            </Typography>
                            <TextField
                                label="Nombre de usuario"
                                fullWidth
                                margin="normal"
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
                            />
                            {modalType === 'add' && (
                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            )}
                            {modalType === 'edit' && (
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Estado</InputLabel>
                                    <Select
                                        value={userStatus}
                                        onChange={(e) => setUserStatus(e.target.value)}
                                    >
                                        <MenuItem value="1">Activo</MenuItem>
                                        <MenuItem value="0">Inactivo</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                            <Box display="flex" justifyContent="flex-end" mt={2}>
                                <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ mr: 1 }}>
                                    Cancelar
                                </Button>
                                <Button onClick={handleSave} variant="contained" color="primary">
                                    {modalType === 'add' ? 'Agregar' : 'Guardar'}
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            </Box>
        </Box>
    );
};

export default User;
