import React from "react";
import { Card, Title, Paragraph, Button } from "react-native-paper";

const SearchResult = ({
  commonName,
  taxonId,
  name,
  rank,
  add,
  newMapIds,
  remove,
}) => {
  const isAdded = newMapIds.split(",").includes(taxonId.toString());

  return (
    <Card key={taxonId} style={{ marginVertical: 10 }}>
      <Card.Content>
        <Title>{commonName}</Title>
        <Paragraph>ID: {taxonId}</Paragraph>
        <Paragraph>Name: {name}</Paragraph>
        <Paragraph>Rank: {rank}</Paragraph>
      </Card.Content>
      <Card.Actions>
        {isAdded ? (
          <Button mode="contained" onPress={remove}>
            Remove
          </Button>
        ) : (
          <Button mode="contained" onPress={add}>
            Add
          </Button>
        )}
      </Card.Actions>
    </Card>
  );
};

export default SearchResult;
