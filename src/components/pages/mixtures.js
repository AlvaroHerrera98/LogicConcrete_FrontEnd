import React, { useEffect, useState } from "react";
import "../../App.css";
import PageNavBar from "../nav/pagenav";
import Ingridients from "./ingridient";
import LoadingComponent from "../loading";
import MixtureDetail from "../admin/mixturedetail";
import axiosInstance from "../../axios";
import { Container } from "@mui/material";
import { Box } from "@mui/system";

function Mixture() {
  const Loading = LoadingComponent(MixtureDetail);
  const [appState, setAppState] = useState({
    loading: true,
    mixtures: null,
  });

  useEffect(() => {
    axiosInstance.get("mixtures/").then((res) => {
      const allMixtures = res.data;
      setAppState({ mixtures: allMixtures, loading: false });
    });
  }, [setAppState]);

  return (
    <React.StrictMode>
      <PageNavBar />
      <Box mt={4}>
        <Container
          maxWidth="lg"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div>
            <h1 style={{ textAlign: "center" }}> Mezclas </h1>
            <Loading
              isLoading={appState.loading}
              allMixtures={appState.mixtures}
            />
          </div>
          <div>
            <Ingridients />
          </div>
        </Container>
      </Box>
    </React.StrictMode>
  );
}

export default Mixture;
