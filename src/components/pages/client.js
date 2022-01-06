import React, { useEffect, useState } from "react";
import "../../App.css";
import PageNavBar from "../nav/pagenav";
import LoadingComponent from "../loading";
import Detail from "../admin/clientdetail";
import axiosInstance from "../../axios";
import { Container } from "@mui/material";
import { Box } from "@mui/system";

function Client() {
  const Loading = LoadingComponent(Detail);
  const [appState, setAppState] = useState({
    loading: true,
    clients: [],
  });

  useEffect(() => {
    axiosInstance.get("clients/").then((res) => {
      const allClients = res.data;
      setAppState({ clients: allClients, loading: false });
    });
  }, [setAppState]);

  return (
    <React.StrictMode>
      <PageNavBar />
      <Box mt={4}>
        <Container>
          <div>
            <h1 style={{ textAlign: "center" }}> Clientes </h1>
            <Loading
              isLoading={appState.loading}
              allClients={appState.clients}
              setAppState={setAppState}
            />
          </div>
        </Container>
      </Box>
    </React.StrictMode>
  );
}

export default Client;
