import React from "react";
import axiosInstance from "../../../axios";
import { useHistory } from "react-router-dom";
//Material-UI
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@mui/material/MenuItem";

const useStyles = makeStyles((theme) => ({
  paper: {
    //marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

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

export default function VehiculeEdit({
  open,
  setOpen,
  vehiculeId,
  formData,
  updateFormData,
  allEmploy,
}) {
  const handleClose = () => setOpen(false);

  const classes = useStyles();

  const history = useHistory();

  const handleChange = (e) => {
    if ([e.target.name] === "name") {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .put(`vehicules/edit/` + vehiculeId + "/", {
        name: formData.name,
        employees: formData.employees,
      })
      .then(function () {
        history.push({
          pathname: "/main/employees/",
        });
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
              Modificación de Vehiculo
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Nombre del Vehiculo"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        select
                        variant="outlined"
                        required
                        fullWidth
                        id="employees"
                        label="Conductor del Vehiculo"
                        name="employees"
                        autoComplete="employees"
                        value={formData.employees}
                        onChange={handleChange}
                        style={{ display: "flex" }}
                      >
                        {allEmploy.map((emp) => {
                          return (
                            <MenuItem key={emp.id} value={emp.id}>
                              {emp.firstname}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </FormControl>
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <Button
                    type="submit"
                    style={{ background: "#c67649", textAlign: "center" }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                  >
                    Modificar Vehiculo
                  </Button>
                </Box>
              </form>
            </div>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}
