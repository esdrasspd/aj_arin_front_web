import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline, Paper, Drawer, IconButton, Grid, useTheme, Card, CardContent, CardHeader } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../../sections/reutilizables/SidebarCustom';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Dashboard = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <CssBaseline />
      
      <Sidebar/>

      <Box
        component="main"
        sx={{ flexGrow: 1, padding: theme.spacing(3), marginTop: theme.spacing(8), minHeight: '100vh' }}
      >
        <AppBar position="fixed" sx={{ backgroundColor: '#1E3A8A', zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ mt: 8 }}>
          <Container>
            <Paper elevation={3} sx={{ padding: theme.spacing(3), backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginTop: theme.spacing(3), fontWeight: 500 }}>
                Bienvenido a Nominet
              </Typography>
              <Typography variant="body1" paragraph>
                Desde acá podrás manejar tu negocio de manera sencilla y eficiente. Utiliza las herramientas a continuación para obtener una visión rápida de tus estadísticas y gestión.
              </Typography>
            </Paper>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader
                      title="Estadísticas de Ventas"
                      subheader="Visión general de ventas"
                      avatar={<BarChartIcon sx={{ bgcolor: '#003366' }} />}
                    />
                    <CardContent>
                      <Typography variant="h6">Ventas Totales</Typography>
                      <Typography variant="body1">Q45,000</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader
                      title="Información General"
                      subheader="Resumen de la empresa"
                      avatar={<InfoIcon sx={{ bgcolor: '#003366' }} />}
                    />
                    <CardContent>
                      <Typography variant="h6">Número de Empleados</Typography>
                      <Typography variant="body1">120</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader
                      title="Calendario de Eventos"
                      subheader="Próximos eventos"
                      avatar={<CalendarTodayIcon sx={{ bgcolor: '#003366' }} />}
                    />
                    <CardContent>
                      <Typography variant="h6">Próximo Evento</Typography>
                      <Typography variant="body1">Reunión de equipo - 5 de Octubre</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader
                      title="Usuarios Activos"
                      subheader="Datos de usuarios"
                      avatar={<PeopleIcon sx={{ bgcolor: '#003366' }} />}
                    />
                    <CardContent>
                      <Typography variant="h6">Usuarios Activos</Typography>
                      <Typography variant="body1">350</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
