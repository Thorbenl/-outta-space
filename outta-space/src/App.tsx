import React from "react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import {
  Container,
  Header,
  Card,
  Divider,
  Message,
  Image,
  Button
} from "semantic-ui-react";
import Page, { Grid, GridColumn } from "@atlaskit/page";

export interface CatBreeds {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  desription: string;
  life_span: string;
  wikipedia_url: string;
}

export async function fetchBreeds() {
  const headers = {
    "x-api-key": "a6586d3b-0dbc-456e-9b1f-946b9580a546"
  };
  let url = "https://api.thecatapi.com/v1/breeds";
  try {
    let response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function fetchBreedsPicture(breed: string) {
  const headers = {
    "x-api-key": "a6586d3b-0dbc-456e-9b1f-946b9580a546"
  };
  let url = `https://api.thecatapi.com/v1/images/search?breed_id=${breed}`;
  try {
    let response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

const CatsList = (props: { cats: CatBreeds[] }) => {
  // const [state, setState] = React.useState<CatPictures>();
  // const handleGetPicture = (name: string) => {
  //   fetchBreedsPicture(name)
  //     .then(response => {
  //       setState(response);
  //     })
  //     .catch(error => {
  //       //
  //     });
  // };
  return (
    <div>
      <Header as="h5"> Cats List</Header>
      <Page>
        <Grid>
          {props.cats.map(cat => (
            <React.Fragment key={cat.id}>
              <GridColumn medium={3}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      <a href={cat.wikipedia_url}>{cat.name}</a>
                    </Card.Header>

                    <Divider horizontal>Info</Divider>

                    <Card.Description>
                      <Message>
                        <Message.Header>Life Span</Message.Header>
                        <Message.List>
                          <Message.Item>{cat.life_span}</Message.Item>
                        </Message.List>
                      </Message>
                    </Card.Description>
                    <Card.Description>
                      <Message>
                        <Message.Header>Temperament</Message.Header>
                        <Message.List>
                          <Message.Item>{cat.temperament}</Message.Item>
                        </Message.List>
                      </Message>
                    </Card.Description>
                    <Card.Description>
                      <Message>
                        <Message.Header>Origin</Message.Header>
                        <Message.List>
                          <Message.Item>{cat.origin}</Message.Item>
                        </Message.List>
                      </Message>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </GridColumn>
            </React.Fragment>
          ))}
        </Grid>
      </Page>
    </div>
  );
};

const App = () => {
  const [cats, setCats] = React.useState<CatBreeds[]>([]);
  React.useEffect(() => {
    fetchBreeds()
      .then(response => {
        setCats(response);
      })
      .catch(error => {
        console.log("BLEH", error);
      });
  }, []);

  return (
    <div className="App">
      <Container>
        <CatsList cats={cats}></CatsList>
      </Container>
    </div>
  );
};

export default App;
