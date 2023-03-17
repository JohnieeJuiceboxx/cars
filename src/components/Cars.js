import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Cars({ setMode }) {
  const [cars, setCars] = useState([]);
  const [expanded, setExpanded] = useState(Boolean);

  useEffect(() => {
    setMode("cars");
    fetch("/cars")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => {
        setCars(jsonRes);
      });
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const centsToDollar = (cents) => {
    return (cents / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  return (
    <div className="car_component_container">
      <div>
        <h1>The Car Depot Car Collection</h1>
      </div>
      <div style={{ padding: "0 30px" }}>
        {cars.length
          ? cars.map((car, idx) => (
              <Accordion
                expanded={expanded === car.Id}
                onChange={handleChange(car.Id)}
                key={idx}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{
                      width: "33%",
                      flexShrink: 0,
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    {`${car.Year} ${car.Make} ${car.Model}`}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    {`${centsToDollar(car.Price)}`}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Typography
                      sx={{
                        width: "33%",
                        flexShrink: 0,
                        fontWeight: "bold",
                      }}
                    >
                      {`Color: ${car.Color}`}
                    </Typography>
                    <Typography
                      sx={{
                        width: "33%",
                        flexShrink: 0,
                        fontWeight: "bold",
                      }}
                    >
                      {`Mileage: ${car.Mileage} mi`}
                    </Typography>
                    <Typography
                      sx={{
                        width: "33%",
                        flexShrink: 0,
                        fontWeight: "bold",
                      }}
                    >
                      {`Package: ${car.Package}`}
                    </Typography>
                  </div>

                  <Typography>
                    Bacon ipsum dolor amet filet mignon meatball shankle,
                    andouille frankfurter venison jerky boudin sirloin. Swine
                    frankfurter chislic tongue landjaeger turducken. Sirloin
                    t-bone cow, andouille ham hock doner shank strip steak
                    tenderloin meatball pork boudin. Kielbasa jerky prosciutto,
                    strip steak pastrami rump turkey beef frankfurter buffalo.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          : null}
      </div>
    </div>
  );
}
