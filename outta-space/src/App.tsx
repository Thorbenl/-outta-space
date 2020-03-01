import React from "react";
import { Container, Form, Loader } from "semantic-ui-react";
import { fetchBreeds } from "./api";
import { CatsList } from "./components/cats_list";
import { CatBreeds } from "./interfaces";

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
