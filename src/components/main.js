import React, { useEffect, useState } from "react";
import "../App.css";
import PageNavBar from "../components/nav/pagenav";
import OrderSelect from "./admin/mixer/orderselect";
import Progress from "../components/admin/progress/progress";
import LoadingComponent from "./loading";
import axiosInstance from "../axios";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import * as MuiIcon from "@mui/icons-material/";
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

const Loading = LoadingComponent(Progress);

function Main() {
  const [appState, setAppState] = useState({
    loading: true,
    orders: [],
  });

  const [vehiculesState, setVehiculesState] = useState({
    vehicules: [],
  });

  const [isEnabled, setIsEnabled] = useState(false);

  const [isTurnedOn, setIsTurnedOn] = useState(false);

  const [reset, setReset] = useState(false);

  const fetchData = async () => {
    // eslint-disable-next-line no-unused-vars
    const order = axiosInstance.get("orders/").then((res) => {
      const allOrders = res.data;
      setAppState({ orders: allOrders, loading: false });
      console.log(res.data);
    });

    // eslint-disable-next-line no-unused-vars
    const employee = axiosInstance.get("vehicules/").then((res) => {
      const allVehicules = res.data;
      setVehiculesState({ vehicules: allVehicules, loading: false });
    });
  };

  useEffect(() => {
    fetchData();
    return () => {
      setAppState({});
      setVehiculesState({});
    };
  }, []);

  return (
    <React.StrictMode>
      <PageNavBar />

      <Box mt={4}>
        <Container>
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <h1 style={{ display: "flex", justifyContent: "center" }}>
                Agua
              </h1>
              <Loading
                isLoading={appState.loading}
                delay={0}
                isEnabled={isEnabled}
                reset={reset}
              />
            </div>
            <div>
              <h1 style={{ display: "flex", justifyContent: "center" }}>
                Arena
              </h1>
              <Loading
                isLoading={appState.loading}
                delay={10000}
                isEnabled={isEnabled}
                reset={reset}
              />
            </div>

            <div>
              <h1 style={{ display: "flex", justifyContent: "center" }}>
                Grava
              </h1>
              <Loading
                isLoading={appState.loading}
                delay={20000}
                isEnabled={isEnabled}
                reset={reset}
              />
            </div>

            <div>
              <h1 style={{ display: "flex", justifyContent: "center" }}>
                Cemento
              </h1>
              <Loading
                isLoading={appState.loading}
                delay={30000}
                isEnabled={isEnabled}
                reset={reset}
              />
            </div>

            <div>
              <h1 style={{ display: "flex", justifyContent: "center" }}>
                Aditivo
              </h1>
              <Loading
                isLoading={appState.loading}
                delay={40000}
                isEnabled={isEnabled}
                reset={reset}
                onFinish={() => {
                  setIsEnabled(false);
                  setTimeout(() => {
                    alert("El camion ha sido cargado con la mezcla");
                  }, 1000);
                }}
              />
            </div>
          </Container>

          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "flex-end",
            }}
          >
            <Container>
              <Box mt={15} style={{ style }}>
                <Card>
                  <CardContent>
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                      variant="h4"
                      component="div"
                    >
                      Planta
                    </Typography>
                    <Paper
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <Grid container style={{ justifyContent: "center" }}>
                        <Grid item>
                          <Button
                            onClick={() => {
                              if (!isTurnedOn) {
                                setIsTurnedOn(!isTurnedOn);
                                setReset(!reset);
                                alert("La planta ha sido prendida.");
                              } else {
                                setIsTurnedOn();
                                setReset(!reset);
                                alert("La planta ha sido apagada.");
                              }
                            }}
                            disabled={isEnabled}
                          >
                            <MuiIcon.PowerSettingsNew></MuiIcon.PowerSettingsNew>
                          </Button>
                        </Grid>
                        {/* <Grid item xs={2} sm={6} md={3}>
                    <Button
                    
                    >
                    <MuiIcon.StopCircle></MuiIcon.StopCircle>
                    </Button>
                </Grid> */}
                        <Grid item>
                          <Button
                            onClick={() => {
                              setIsEnabled(true);
                            }}
                            disabled={!isTurnedOn || isEnabled}
                          >
                            <MuiIcon.PlayArrow></MuiIcon.PlayArrow>
                          </Button>
                        </Grid>
                        {/* <Grid item xs={2} sm={6} md={3}>
                    <Button
                    
                    >
                    <MuiIcon.Pause></MuiIcon.Pause>
                    </Button>
                </Grid> */}
                      </Grid>
                    </Paper>
                  </CardContent>
                </Card>
              </Box>
            </Container>
            <OrderSelect
              allOrders={appState.orders}
              allVehicules={vehiculesState.vehicules}
            />
          </Container>
        </Container>
      </Box>
    </React.StrictMode>
  );
}

export default Main;
