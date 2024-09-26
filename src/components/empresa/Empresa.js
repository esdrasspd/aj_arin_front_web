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
import axios from 'axios';

const Empresa = () => {
    const theme = useTheme();
    const [empresas, setEmpresas] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [currentEmpresa, setCurrentEmpresa] = useState(null);
    const [newNombre, setNewNombre] = useState('');
    const [newNit, setNewNit] = useState('');
    const [newDireccion, setNewDireccion] = useState('');
    const [newTelefono, setNewTelefono] = useState('');
    const [empresaStatus, setEmpresaStatus] = useState('1'); // Estado por defecto

    const api = apiURL2;

    let isMounted = true;
    const fetchEmpresas = async () => {
        try {
            const response = await axios.get(api + '/listBusiness');
            if (isMounted && response.data.code === '200') {
                setEmpresas(JSON.parse(response.data.message));
                
            console.log(JSON.parse(response.data.message));
            }
        } catch (error) {
            console.error('Error fetching empresas:', error);
        }
    };

    useEffect(() => {
        fetchEmpresas();
        return () => {
            isMounted = false;
        };
    }, [api]);

    const handleOpen = (type, empresa = null) => {
        setModalType(type);
        if (empresa) {
            
            console.log(empresa);
            setCurrentEmpresa(empresa);
            setNewNombre(empresa.Nombre);
            setNewNit(empresa.NIT);
            setNewDireccion(empresa.Direccion);
            setNewTelefono(empresa.Telefono);
            setEmpresaStatus(empresa.Estado); // Set empresa status for editing
        } else {
            setCurrentEmpresa(null);
            setNewNombre('');
            setNewNit('');
            setNewDireccion('');
            setNewTelefono('');
            setEmpresaStatus('1'); // Set default status for new empresa
        }
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        if (modalType === 'add') {
            await axios.post(api + '/saveBusiness', {
                Nombre: newNombre,
                Nit: newNit,
                Direccion: newDireccion,
                Telefono: newTelefono,
                Estado: empresaStatus
            }).then(response => {
                if (response.data.code === '200') {
                    fetchEmpresas();
                    handleClose();
                } else {
                    alert(response.data.message);
                }
            }).catch(error => console.error('Error adding empresa:', error));
        } else if (modalType === 'edit' && currentEmpresa) {
            console.log(currentEmpresa + "hola");
            await axios.post(api + '/updateBusiness', {
                id: currentEmpresa.EmpresaID.toString(),
                Nombre: newNombre,
                Nit: newNit,
                Direccion: newDireccion,
                Telefono: newTelefono,
                Estado: empresaStatus
            }).then(response => {
                if (response.data.code === '200') {
                    fetchEmpresas();
                    handleClose();
                } else {
                    alert(response.data.message);
                }
            }).catch(error => console.error('Error updating empresa:', error));
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
                            Empresas
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
                        Agregar empresa
                    </Button>
                </Box>

                <Box sx={{ mt: 3 }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Nit</TableCell>
                                    <TableCell>Dirección</TableCell>
                                    <TableCell>Teléfono</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {empresas.map((empresa) => (
                                    <TableRow key={empresa.EmpresaID}>
                                        <TableCell>{empresa.Nombre}</TableCell>
                                        <TableCell>{empresa.NIT}</TableCell>
                                        <TableCell>{empresa.Direccion}</TableCell>
                                        <TableCell>{empresa.Telefono}</TableCell>
                                        <TableCell>{empresa.Estado === '1' ? 'Activo' : 'Inactivo'}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Edit">
                                                <IconButton onClick={() => handleOpen('edit', empresa)}>
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
                                {modalType === 'add' ? 'Crear nueva empresa' : 'Editar empresa'}
                            </Typography>
                            <TextField
                                label="Nombre"
                                fullWidth
                                margin="normal"
                                value={newNombre}
                                onChange={(e) => setNewNombre(e.target.value)}
                            />
                            <TextField
                                label="Nit"
                                fullWidth
                                margin="normal"
                                value={newNit}
                                onChange={(e) => setNewNit(e.target.value)}
                            />
                            <TextField
                                label="Dirección"
                                fullWidth
                                margin="normal"
                                value={newDireccion}
                                onChange={(e) => setNewDireccion(e.target.value)}
                            />
                            <TextField
                                label="Teléfono"
                                fullWidth
                                margin="normal"
                                value={newTelefono}
                                onChange={(e) => setNewTelefono(e.target.value)}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Estado</InputLabel>
                                <Select
                                    value={empresaStatus}
                                    onChange={(e) => setEmpresaStatus(e.target.value)}
                                >
                                    <MenuItem value="1">Activo</MenuItem>
                                    <MenuItem value="0">Inactivo</MenuItem>
                                </Select>
                            </FormControl>
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

export default Empresa;
