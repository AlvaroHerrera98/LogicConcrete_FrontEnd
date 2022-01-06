import React, { useState } from "react";
import axiosInstance from "../../../axios";
import Info from "./info";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import TextField from "@material-ui/core/TextField";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

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

export default function OrderSelect({ allOrders, allVehicules,  }) {
  const initialFormData = Object.freeze({
    name: "",
    client: "",
    mixture: "",
    measure: "",
    destination: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const getOrder = (id) => (e) => {
    axiosInstance.get("orders/edit/orderdetail/" + id).then(
      (res) => {
        updateFormData({
          ...formData,
          name: res.data.name,
          client: res.data.client,
          mixture: res.data.mixture,
          measure: res.data.measure,
          destination: res.data.destination,
        });
        console.log(res.data);
      },
      [updateFormData]
    );

    setOrderId(id);
  };

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

  // eslint-disable-next-line no-unused-vars
  const [orderId, setOrderId] = useState("");

  return (
    <React.Fragment>
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
                Orden
              </Typography>
              <Grid>
                <form>
                  <Grid item>
                    <FormControl fullWidth>
                      <TextField
                        select
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Orden"
                        name=""
                        autoComplete="orden"
                        onChange={handleChange}
                        //value={formData.client}
                        style={{ display: "flex" }}
                      >
                        {allOrders?.map((ord) => {
                          return (
                            <MenuItem
                              key={ord.id}
                              value={ord.id}
                              onClick={getOrder(ord.id)}
                            >
                              {ord.name}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </FormControl>
                  </Grid>
                </form>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <Info formData={formData} allVehicules={allVehicules} />
    </React.Fragment>
  );
}
