import React from "react";
import { View } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";

export const CustomMapCard = ({
  title,
  ids,
  nav,
  deleteCustomMap = () => {},
}) => {
  const handleDelete = () => {
    deleteCustomMap();
  };

  const handleNavigate = () => {
    nav.navigate(title);
  };

  return (
    <Card style={{ margin: 10 }}>
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{ids}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={handleNavigate}>
          View Map
        </Button>
        <Button mode="contained" onPress={handleDelete}>
          Delete Map
        </Button>
      </Card.Actions>
    </Card>
  );
};
