import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

const defaultValues = {
  Make: "",
  Model: "",
  Package: "",
  Color: "",
  Year: "",
  Category: "",
  Mileage: "",
  Price: "",
  Id: "",
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function AddCars({ setMode }) {
  const [formValues, setFormValues] = useState(defaultValues);
  const [formError, setFormError] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMode("add");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    let error = false;
    let idGenerator = Math.random().toString(36).slice(-8);
    formValues.Id = idGenerator;

    for (let key in formValues) {
      if (formValues[key] === "") {
        error = true;
        setFormError(true);
      }
    }
    if (error) console.error("missing required fields");
    else {
      fetch("/api/cars", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }).then((res) => {
        if (res.ok) {
          setFormValues(defaultValues);
          setFormError(false);
          setOpen(true);
        }
      });
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "orange",
      },
    },
  };
  const inputLabelFocused = {
    "&.Mui-focused": {
      color: "#23A5EB",
    },
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        "& .MuiGrid-root": { justifyContent: "center" },

        width: "80vw",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <h1>The Car Depot Car Collection</h1>
      </div>
      <Grid container>
        <Grid item sm={6} lg={3} xl={3}>
          <TextField
            required
            id="outlined-required"
            label="Make"
            value={formValues.Make}
            name="Make"
            onChange={handleInputChange}
            error={formError && formValues.Make.length === 0}
            sx={inputStyle}
          />
        </Grid>
        <Grid item sm={6} lg={3} xl={3}>
          <TextField
            error={formError && formValues.Model.length === 0}
            required
            id="outlined-required"
            label="Model"
            value={formValues.Model}
            onChange={handleInputChange}
            name="Model"
            sx={inputStyle}
          />
        </Grid>
        <Grid item sm={6} lg={3} xl={3}>
          <TextField
            error={formError && formValues.Package.length === 0}
            required
            id="outlined-required"
            label="Package"
            value={formValues.Package}
            onChange={handleInputChange}
            name="Package"
            sx={inputStyle}
          />
        </Grid>
        <Grid item sm={6} lg={3} xl={3}>
          <TextField
            error={formError && formValues.Color.length === 0}
            required
            id="outlined-required"
            label="Color"
            value={formValues.Color}
            onChange={handleInputChange}
            name="Color"
            sx={inputStyle}
          />
        </Grid>
        <Grid item sm={6} lg={3} xl={3}>
          <TextField
            type="number"
            error={formError && formValues.Year.length === 0}
            required
            id="outlined-required"
            label="Year"
            value={formValues.Year}
            onChange={handleInputChange}
            name="Year"
            sx={inputStyle}
            InputProps={{
              inputProps: { min: 1900 },
            }}
          />
        </Grid>
        <Grid item sm={6} lg={3} xl={3}>
          <TextField
            error={formError && formValues.Category.length === 0}
            required
            id="outlined-required"
            label="Category"
            value={formValues.Category}
            onChange={handleInputChange}
            name="Category"
            sx={inputStyle}
          />
        </Grid>
        <Grid item sm={6} lg={3} xl={3}>
          <TextField
            type="number"
            error={formError && formValues.Mileage.length === 0}
            required
            id="outlined-required"
            label="Mileage"
            value={formValues.Mileage}
            onChange={handleInputChange}
            name="Mileage"
            sx={inputStyle}
            InputProps={{
              inputProps: { min: 0 },
            }}
            onKeyPress={(event) => {
              if (event?.key === "-" || event?.key === "+") {
                event.preventDefault();
              }
            }}
          />
        </Grid>
        <Grid item sm={6} lg={3} xl={3}>
          <TextField
            type="number"
            error={formError && formValues.Price.length === 0}
            required
            id="outlined-required"
            label="Price"
            value={formValues.Price}
            onChange={handleInputChange}
            name="Price"
            sx={inputStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              inputProps: { min: 0 },
            }}
            onKeyPress={(event) => {
              if (event?.key === "-" || event?.key === "+") {
                event.preventDefault();
              }
            }}
          />
        </Grid>
        {/* <TextField
          error={formError && formValues.Id.length === 0}
          required
          id="outlined-required"
          label="Id"
          value={formValues.Id}
          onChange={handleInputChange}
          name="Id"
        /> */}

        {/* </form> */}
        {/* </div> */}
      </Grid>
      <div style={{ marginTop: 50 }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#ff7321" }}
          type="submit"
        >
          Submit
        </Button>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          New Car entry posted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
