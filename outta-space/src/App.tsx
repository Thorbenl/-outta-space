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
  Button,
  Form,
  Loader,
  Modal,
  Icon
} from "semantic-ui-react";
import Page, { Grid, GridColumn } from "@atlaskit/page";

export interface CatBreeds {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
  life_span: string;
  wikipedia_url: string;
  country_code: string;
  weight: {
    metric: string;
  };
}

export async function fetchBreeds(breed?: string) {
  const headers = {
    "x-api-key": "a6586d3b-0dbc-456e-9b1f-946b9580a546"
  };

  let url = "https://api.thecatapi.com/v1/breeds";
  if (breed) {
    let url = `https://api.thecatapi.com/v1/breeds/search?q=${breed}`;
    try {
      let response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
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

const CatDescription = (props: { description: string }) => {
  return (
    <Message.List>
      <Message.Item>{props.description}</Message.Item>
    </Message.List>
  );
};

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
              <GridColumn medium={4}>
                <Card.Group>
                  <Card style={{ margin: "2rem" }}>
                    <Card.Content>
                      <Card.Header>
                        {cat.country_code && (
                          <i
                            className={`${cat.country_code.toLocaleLowerCase()} flag`}
                          ></i>
                        )}
                        <a href={cat.wikipedia_url}>{cat.name}</a>
                      </Card.Header>

                      <Divider horizontal>Info</Divider>

                      <Card.Description>
                        <Message style={{ marginBottom: "1rem" }}>
                          <Message.Header>Life Span</Message.Header>
                          <Message.List>
                            <Message.Item>{`${cat.life_span} years`}</Message.Item>
                          </Message.List>
                        </Message>
                      </Card.Description>
                      <Card.Description>
                        <Message style={{ marginBottom: "1rem" }}>
                          <Message.Header>Origin</Message.Header>
                          <Message.List>
                            <Message.Item>{cat.origin}</Message.Item>
                          </Message.List>
                        </Message>
                      </Card.Description>
                      <Card.Description>
                        <Message style={{ marginBottom: "1rem" }}>
                          <Message.Header>Weight</Message.Header>
                          <Message.Item>
                            <Icon name="weight" size="big"></Icon>
                            {`${cat.weight.metric} kg`}
                          </Message.Item>
                        </Message>
                      </Card.Description>
                      <Divider horizontal>Trivia</Divider>
                      <Card.Description>
                        <Message style={{ marginBottom: "1rem" }}>
                          <Message.Header>Temperament</Message.Header>
                          <Modal
                            trigger={
                              <Button style={{ marginTop: "1rem" }}>
                                Show Modal
                              </Button>
                            }
                          >
                            <Message.List>
                              <Message.Item>{cat.temperament}</Message.Item>
                            </Message.List>
                          </Modal>
                        </Message>
                      </Card.Description>
                      <Card.Description>
                        <Message style={{ marginBottom: "1rem" }}>
                          <Message.Header>Description</Message.Header>
                          <Modal
                            trigger={
                              <Button style={{ marginTop: "1rem" }}>
                                Show Modal
                              </Button>
                            }
                          >
                            <Modal.Content>
                              <CatDescription
                                description={cat.description}
                              ></CatDescription>
                            </Modal.Content>
                          </Modal>
                        </Message>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Card.Group>
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
  const [loading, setLoading] = React.useState(true);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    fetchBreeds(event.target.value)
      .then(response => {
        setCats(response);
      })
      .catch(error => {
        console.log("BLEH", error);
      });
  };

  React.useEffect(() => {
    fetchBreeds()
      .then(response => {
        setLoading(false);
        setCats(response);
      })
      .catch(error => {
        console.log("BLEH", error);
      });
  }, []);

  return (
    <div className="App">
      <Container>
        <Form>
          <Form.Field>
            <label>Cat Search</label>
            <input onChange={handleSearchChange} placeholder="Cat Breed" />
          </Form.Field>
        </Form>
        {loading && <Loader active={loading} />}
        <CatsList cats={cats}></CatsList>
      </Container>
    </div>
  );
};

export default App;
