import React from "react";
import {
  Message,
  Card,
  Modal,
  Button,
  Divider,
  Icon,
  Header
} from "semantic-ui-react";
import Page, { Grid, GridColumn } from "@atlaskit/page";
import { CatBreeds } from "../interfaces";
import "semantic-ui-css/semantic.min.css";

const CatsList = (props: { cats: CatBreeds[] }) => {
  return (
    <div>
      <Header as="h5">Cats List</Header>
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
                            {cat.weight && (
                              <React.Fragment>
                                <Icon name="weight" size="big"></Icon>
                                {`${cat.weight.metric} kg`}
                              </React.Fragment>
                            )}
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
                              <Message.List>
                                <Message.Item>{cat.description}</Message.Item>
                              </Message.List>
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

export { CatsList };
