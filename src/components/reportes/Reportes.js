import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    CssBaseline,
    Paper,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Tooltip,
    useTheme,
    Modal,
    CircularProgress,  // Importar CircularProgress para el indicador de carga
    Snackbar, // Importa Snackbar para las notificaciones
    Alert,   // Importa Alert para personalizar el Snackbar
} from '@mui/material';
import Sidebar from '../../sections/reutilizables/SidebarCustom';
import { apiURL } from '../../config/apiConfig';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Para mostrar el marcador correctamente
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Reportes = () => {
    const theme = useTheme();
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  // Estado para la carga
    const [noData, setNoData] = useState(false);   // Estado para "sin datos"
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterTicketType, setFilterTicketType] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openChangeStateModal, setOpenChangeStateModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [newState, setNewState] = useState('');
    const [reason, setReason] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [selectedImage, setSelectedImage] = useState(null);  // Estado para almacenar la imagen seleccionada
    const [openImageModal, setOpenImageModal] = useState(false);  // Estado para abrir el modal de imagen


    const api = apiURL;

    const fetchTickets = async () => {
        setIsLoading(true);
        setNoData(false);
        try {
            const response = await axios.get(api + '/listarTickets', {
                params: {
                    Page: currentPage,
                    Limit: 20,
                    Estado: filterStatus,
                    FechaCreacion: filterDate,
                    TipoTicket: filterTicketType,
                },
            });


            if (response.data.code === '200') {
                const fetchedTickets = JSON.parse(response.data.message);
                if (fetchedTickets.length === 0) {
                    setNoData(true);
                }
                console.log(fetchedTickets);
                setTickets(fetchedTickets);

            } else {
                setNoData(true);

            }
            const totalCount = response.data.count;
            setTotalPages(Math.ceil(totalCount / 20));
        } catch (error) {
            console.error('Error fetching tickets:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (location) => {
        setSelectedLocation(location);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedLocation(null);
    };

    const handleOpenChangeStateModal = (ticket) => {
        setSelectedTicket(ticket);
        setOpenChangeStateModal(true);
        // Lógica para mostrar solo el estado siguiente disponible
        if (ticket.Estado === 'Nuevo') {
            setNewState('En ejecución');
        } else if (ticket.Estado === 'En ejecución') {
            setNewState('Finalizado');
        } else {
            setNewState(''); // Si ya está finalizado, no hay más cambios posibles
        }

        setReason(''); // Limpia el motivo
    };

    const handleCloseChangeStateModal = () => {
        setOpenChangeStateModal(false);
        setSelectedTicket(null);
        setNewState('');
        setReason('');
    };

    const handleUpdateState = async () => {
        if (!reason || reason.length > 50) {
            setSnackbarMessage('El motivo es requerido y no debe sobrepasar los 50 caracteres.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        try {
            const dpi = localStorage.getItem('dpi');
            const response = await axios.post(api + '/actualizarEstadoPorId', {
                idTicket: selectedTicket.TicketId.toString(),
                estado: newState,
                motivo: reason,
                dpi: dpi,
                deviceIdPushOtp: selectedTicket.DeviceIdPushOtp
            });

            if (response.data.code === '200') {
                setSnackbarMessage('Estado actualizado correctamente.');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                fetchTickets(); // Refresca la lista de tickets
                handleCloseChangeStateModal();
            } else {
                setSnackbarMessage(response.data.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error actualizando estado del ticket:', error);
            setSnackbarMessage('Error al actualizar el estado del ticket.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleOpenImageModal = (imageBase64) => {
        setSelectedImage(imageBase64);
        setOpenImageModal(true);
    };

    const handleCloseImageModal = () => {
        setSelectedImage(null);
        setOpenImageModal(false);
    };


    useEffect(() => {
        fetchTickets();
    }, [currentPage, filterStatus, filterDate, filterTicketType]);

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
                            Reportes
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel id="filter-status-label">Estado</InputLabel>
                        <Select
                            labelId="filter-status-label"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            label="Estado"
                        >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="Nuevo">Nuevo</MenuItem>
                            <MenuItem value="En ejecución">En ejecución</MenuItem>
                            <MenuItem value="Finalizado">Finalizado</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Fecha Creación"
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: 200 }}
                    />

                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel id="filter-ticket-type-label">Tipo Ticket</InputLabel>
                        <Select
                            labelId="filter-ticket-type-label"
                            value={filterTicketType}
                            onChange={(e) => setFilterTicketType(e.target.value)}
                            label="Tipo Ticket"
                        >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="1">Carretera</MenuItem>
                            <MenuItem value="2">Tubería de agua potable</MenuItem>
                            <MenuItem value="3">Basurero</MenuItem>
                            <MenuItem value="4">Otros</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ mt: 3 }}>
                    {isLoading ? (  // Muestra el círculo de carga mientras se obtienen los datos
                        <CircularProgress />
                    ) : noData ? (  // Muestra el mensaje "Sin datos" si no hay tickets
                        <Typography variant="h6">Sin datos</Typography>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Título</TableCell>
                                        <TableCell>Descripción</TableCell>
                                        <TableCell>Creado Por</TableCell>
                                        <TableCell>Tipo Ticket</TableCell>
                                        <TableCell>Fecha Creación</TableCell>
                                        <TableCell>Estado</TableCell>
                                        <TableCell>Referencia</TableCell>
                                        <TableCell>Ver fotografía</TableCell>
                                        <TableCell>Ver Ubicación</TableCell>
                                        <TableCell>Cambiar Estado</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tickets.map((ticket) => (
                                        <TableRow key={ticket.TicketId}>
                                            <TableCell>{ticket.Titulo}</TableCell>
                                            <TableCell>{ticket.Descripcion}</TableCell>
                                            <TableCell>{ticket.NombreUsuario}</TableCell>
                                            <TableCell>{ticket.TipoTicket}</TableCell>
                                            <TableCell>{ticket.FechaCreacion}</TableCell>
                                            <TableCell>{ticket.Estado}</TableCell>
                                            <TableCell>{ticket.Referencia}</TableCell>
                                            <TableCell>
                                                {ticket.Imagen ? (
                                                    <Tooltip title="Ver fotografía">
                                                        <Button
                                                            variant="contained"
                                                            onClick={() => handleOpenImageModal(ticket.Imagen)}
                                                        >
                                                            Ver Foto
                                                        </Button>
                                                    </Tooltip>
                                                ) : (
                                                    <Typography>No disponible</Typography>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title="Ver ubicación">
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => handleOpenModal(ticket.Ubicacion)}
                                                    >
                                                        Ver
                                                    </Button>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title="Cambiar estado">
                                                    <Button variant="contained" onClick={() => handleOpenChangeStateModal(ticket)}>Cambiar</Button>
                                                </Tooltip>
                                            </TableCell>


                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>

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

                <Modal open={openImageModal} onClose={handleCloseImageModal}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                            outline: 'none',
                        }}
                    >
                        <Box
                            sx={{
                                padding: 2,
                                backgroundColor: 'white',
                                borderRadius: 2,
                                maxWidth: '80vw',
                                maxHeight: '80vh',
                                boxShadow: 24,
                                overflowY: 'auto', // Agrega un scroll en caso de que la imagen sea muy grande
                            }}
                        >
                            <Typography variant="h6" sx={{ mb: 2 }}>Fotografía del Ticket</Typography>
                            {selectedImage && (
                                <Box
                                    component="img"
                                    src={`data:image/jpeg;base64,${selectedImage}`}
                                    alt="Fotografía del ticket"
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '70vh', // Limita la altura de la imagen
                                    }}
                                />
                            )}
                            <Button variant="contained" onClick={handleCloseImageModal} sx={{ mt: 2 }}>
                                Cerrar
                            </Button>
                        </Box>
                    </Box>
                </Modal>



                {/* Modal para ver ubicación */}
                <Modal open={openModal} onClose={handleCloseModal}>
                    <Box sx={{ padding: 2, backgroundColor: 'white', borderRadius: 2, width: '80%', margin: 'auto', marginTop: '10%', boxShadow: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Ubicación del Ticket</Typography>
                        {selectedLocation && (
                            <MapContainer center={selectedLocation.split(',')} zoom={13} style={{ height: '400px', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={selectedLocation.split(',')}>
                                    <Popup>
                                        <Typography variant="body1">Ubicación: {selectedLocation}</Typography>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        )}
                        <Button variant="contained" onClick={handleCloseModal} sx={{ mt: 2 }}>
                            Cerrar
                        </Button>
                    </Box>
                </Modal>

                {/* Modal para cambiar estado */}
                <Modal open={openChangeStateModal} onClose={handleCloseChangeStateModal}>
                    <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 2, maxWidth: 400, margin: 'auto' }}>
                        <Typography variant="h6">Cambiar Estado del Ticket</Typography>
                        {newState ? (
                            <>
                                <TextField
                                    label="Nuevo Estado"
                                    value={newState}
                                    fullWidth
                                    variant="outlined"
                                    disabled // Deshabilita la edición
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Motivo"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                    sx={{ mb: 2 }}
                                    inputProps={{ maxLength: 50 }}
                                />
                            </>
                        ) : (
                            <Typography>No hay más cambios disponibles para este ticket.</Typography>
                        )}

                        <Button
                            variant="contained"
                            onClick={handleUpdateState}
                            disabled={!newState} // Deshabilita si no hay estado nuevo
                        >
                            Actualizar Estado
                        </Button>
                        <Button onClick={handleCloseChangeStateModal}>Cancelar</Button>
                    </Box>
                </Modal>
                {/* Snackbar para notificaciones */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000} // Se cierra automáticamente en 6 segundos
                    onClose={() => setSnackbarOpen(false)}
                >
                    <Alert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default Reportes;
