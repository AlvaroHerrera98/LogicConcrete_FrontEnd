import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Info({ formData, allVehicules }) {
  return (
    <React.Fragment>
      <Container>
        <Box mt={15}>
          <Card>
            <CardContent>
              <Grid container style={{ style }}>
                <Typography variant="h4" component="div">
                  Información
                </Typography>
                <form noValidate>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Orden"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="client"
                          label="Clientes"
                          name="client"
                          autoComplete="client"
                          value={formData.client}
                          style={{ display: "flex" }}
                        ></TextField>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="mixture"
                          label="Mezcla"
                          name="mixture"
                          autoComplete="mixture"
                          value={formData.mixture}
                        ></TextField>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="measure"
                        label="Cantidad"
                        name="measure"
                        autoComplete="measure"
                        value={formData.measure}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="destination"
                        label="Destino"
                        name="destination"
                        autoComplete="destination"
                        value={formData.destination}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        select
                        required
                        fullWidth
                        id="name"
                        label="Vehiculo"
                        name="vehiculo"
                        autoComplete="vehiculo"
                        //value={formData.destination}
                      >
                        {allVehicules?.map((veh) => {
                          return (
                            <MenuItem key={veh.id} value={veh.id}>
                              {veh.name}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </React.Fragment>
  );
}
