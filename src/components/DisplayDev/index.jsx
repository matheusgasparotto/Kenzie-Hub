import { Grid, Container, Typography, Box } from "@material-ui/core";
import { StyledButton } from "./styles";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DevCard from "../DevCard";
import { useDispatch, useSelector } from "react-redux";
import { changeShowLoading } from "../../store/modules/Loading/actions";

const DisplayDev = ({ search }) => {
  const { devs } = useSelector((state) => state.Users);

  useEffect(() => {
    console.log(devs);
  }, []);

  const [arrDevs, setArrDevs] = useState();
  useEffect(() => {
    search && setArrDevs(search.devs);
  }, [search]);

  const [devNumber, setDevNumber] = useState(3);
  const location = useLocation();
  return (
    <>
      <Container maxWidth={location.pathname === "/" ? "md" : "lg"}>
        <Box m={3}>
          <Typography
            variant="h5"
            color="textPrimary"
            component="p"
            align="center"
          >
            {location.pathname === "/" && "Veja os Devs que já se cadastraram:"}
          </Typography>
        </Box>
        <Grid
          container
          direction="row"
          alignItems="stretch"
          justify="center"
          spacing={4}
        >
          {location.pathname === "/"
            ? devs
                .slice(0, devNumber)
                .map((dev, index) => (
                  <DevCard
                    isHome
                    key={index}
                    id={dev.id}
                    name={dev.name}
                    image={dev.avatar_url}
                    module={dev.course_module}
                    stacks={
                      dev.techs.length !== 0
                        ? dev.techs.map((tech) => `${tech.title} | `)
                        : "Sem tecnologias ainda."
                    }
                  />
                ))
            : arrDevs
            ? arrDevs.map((dev, index) => (
                <DevCard
                  key={index}
                  id={dev.id}
                  name={dev.name}
                  image={dev.avatar_url}
                  module={dev.course_module}
                  stacks={
                    dev.techs.length !== 0
                      ? dev.techs.map((tech) => `${tech.title} | `)
                      : "Sem tecnologias ainda."
                  }
                />
              ))
            : devs?.map((dev, index) => (
                <DevCard
                  key={index}
                  id={dev.id}
                  name={dev.name}
                  image={dev.avatar_url}
                  module={dev.course_module}
                  stacks={
                    dev.techs.length !== 0
                      ? dev.techs.map((tech) => `${tech.title} | `)
                      : "Sem tecnologias ainda."
                  }
                />
              ))}
        </Grid>
      </Container>
      <Box m={3}>
        {location.pathname === "/" && (
          <Grid container direction="row" alignItems="center" justify="center">
            <StyledButton
              variant="contained"
              color="primary"
              size="large"
              disableElevation
              onClick={() => setDevNumber(devNumber + 3)}
            >
              Ver Mais
            </StyledButton>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default DisplayDev;
