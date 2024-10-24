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
    useTheme,
    Snackbar,
    CircularProgress,
    Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../../sections/reutilizables/SidebarCustom';
import { apiURL } from '../../config/apiConfig';
import axios from 'axios';

const Administradores = () => {
    const theme = useTheme();
    const [admins, setAdmins] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [currentAdmin, setCurrentAdmin] = useState({});
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dpi, setDpi] = useState('');
    const [password, setPassword] = useState('');
    const [activo, setActivo] = useState('1');
    const [isLoading, setIsLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');


    const fetchAdmins = async () => {
        setIsLoading(true);
        setNoData(false);
        try {
            const response = await axios.get(apiURL + '/listarAdministradores', {
                params: {
                    Page: currentPage,
                    Limit: 20
                }
            });
            console.log(response);
            if (response.data.code === '200') {
                const fetchedAdmins = JSON.parse(response.data.message);
                if (fetchedAdmins.length === 0) {
                    setNoData(true);
                } else {
                    setAdmins(fetchedAdmins);
                    setTotalPages(response.data.totalPages);
                    console.log(fetchedAdmins);
                }
            } else {
                setNoData(true);
            }
            const totalCount = response.data.count;
            setTotalPages(Math.ceil(totalCount / 20));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
        return () => {
        };
    }, [currentPage]);

    const handleOpen = (type, admin = null) => {
        setModalType(type);
        if (admin) {
            setCurrentAdmin(admin);
            setNombre(admin.Nombres);
            setApellido(admin.Apellidos);
            setDpi(admin.Dpi);
            setPassword(admin.Password);
            setActivo(admin.Activo);
        } else {
            setCurrentAdmin(null);
            setNombre('');
            setApellido('');
            setDpi('');
            setPassword('');
            setActivo('1');
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteUser = async (adminId) => {
        try {
            const response = await axios.post( apiURL  + '/eliminarAdministradorPorId', {
                id: adminId.toString(),
            });
            if (response.data.code === '200') {
                setSnackbarMessage('Usuario eliminado con éxito');
                setSnackbarSeverity('success');
                fetchAdmins();
            } else {
                setSnackbarMessage('Error al eliminar usuario');
                setSnackbarSeverity('error');
            }
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error deleting user:', error);
            setSnackbarMessage('Error al eliminar usuario');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleSave = async () => {
        if (modalType === 'add') {
            try {
                const response = await axios.post(apiURL + '/registroAdministrador', {
                    nombre,
                    apellido,
                    dpi,
                    password
                });
                if (response.data.code === '200') {
                    setSnackbarMessage('Usuario creado con éxito');
                    setSnackbarSeverity('success');
                    fetchAdmins();
                    handleClose();
                } else {
                    setSnackbarMessage('Error al crear usuario');
                    setSnackbarSeverity('error');
                }
                setSnackbarOpen(true);
            } catch (error) {
                console.error('Error creating user:', error);
                setSnackbarMessage('Error al crear usuario');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } else {
            try {
                
                console.log(currentAdmin);
                const response = await axios.post( apiURL  + '/actualizarAdministradorPorId', {
                    id: currentAdmin.Id.toString(),
                    nombres: nombre,
                    apellidos: apellido,
                    dpi: dpi
                });
                if (response.data.code === '200') {
                    setSnackbarMessage('Usuario actualizado con éxito');
                    setSnackbarSeverity('success');
                    fetchAdmins();
                    handleClose();
                } else {
                    setSnackbarMessage('Error al actualizar usuario');
                    setSnackbarSeverity('error');
                }
                setSnackbarOpen(true);
            } catch (error) {
                console.error('Error updating user:', error);
                setSnackbarMessage('Error al actualizar usuario');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
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
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <CircularProgress />
                        </Box>
                    ) : noData ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <Typography variant="h6">No hay datos</Typography>
                        </Box>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nombre</TableCell>
                                        <TableCell>Apellido</TableCell>
                                        <TableCell>DPI</TableCell>
                                        <TableCell>Activo</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {admins.map((admin) => (
                                        <TableRow key={admin.id}>
                                            <TableCell>{admin.Nombres}</TableCell>
                                            <TableCell>{admin.Apellidos}</TableCell>
                                            <TableCell>{admin.Dpi}</TableCell>
                                            <TableCell>{admin.Activo === '1' ? 'Sí' : 'No'}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Editar">
                                                    <IconButton onClick={() => handleOpen('edit', admin)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Eliminar">
                                                    <IconButton onClick={() => handleDeleteUser(admin.Id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                        >
                            Anterior
                        </Button>
                        <Typography sx={{ mx: 2 }}>Página {currentPage} de {totalPages}</Typography>
                        <Button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            Siguiente
                        </Button>
                    </Box>

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
                                {modalType === 'add' ? 'Crear nuevo administrador' : 'Editar administrador'}
                            </Typography>
                            <TextField
                                label="Nombre"
                                fullWidth
                                margin="normal"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            <TextField
                                label="Apellido"
                                fullWidth
                                margin="normal"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                            <TextField
                                label="DPI"
                                fullWidth
                                margin="normal"
                                value={dpi}
                                onChange={(e) => setDpi(e.target.value)}
                            />
                            {modalType === 'add' && (
                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
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
                    <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                >
                    <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>

                </Box>
            </Box>
        </Box>
    );
};

export default Administradores;