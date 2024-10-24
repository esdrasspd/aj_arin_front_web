import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline, Paper, Drawer, IconButton, Grid, useTheme, Card, CardContent, CardHeader } from '@mui/material';
import Sidebar from '../../sections/reutilizables/SidebarCustom';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import axios from 'axios';
import { apiURL } from '../../config/apiConfig';

const Dashboard = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [reports, setReports] = useState({ Nuevo: '0', EnEjecucion: '0', Finalizado: '0' });

  const getReports = async () => {
    try {
      const response = await axios.get(`${apiURL}/contarReportes`);
      if (response.data.code === '200') {
        const data = JSON.parse(response.data.message);
        setReports(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReports();
  }, []);


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
                Bienvenido a Aj Arin
              </Typography>
              <Typography variant="body1" paragraph>
                Desde acá podrás manejar los reporte de los usuarios.
              </Typography>
            </Paper>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Reportes Nuevos</Typography>
                      <Typography variant="body1">{reports.Nuevo}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Reportes En Ejecución</Typography>
                      <Typography variant="body1">{reports.EnEjecucion}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Reportes Finalizados</Typography>
                      <Typography variant="body1">{reports.Finalizado}</Typography>
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
