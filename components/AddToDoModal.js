import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AppStyles from "../styles/AppStyles";

export default function AddToDoModal(props) {
  const [todo, setTodo] = useState("");

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Add Todo</Text>
      <TextInput
        style={[AppStyles.textInput, AppStyles.darkTextInput]}
        placeholder="ToDo"
        value={todo}
        onChangeText={setTodo}
      />

      <View style={[AppStyles.rowContainer, AppStyles.rightAligned]}>
        <Button title="Cancel" onPress={props.onClose} />
        <Button
          title="Ok"
          onPress={() => {
            props.addToDo(todo);
            setTodo("");
            props.onClose();
          }}
        />
      </View>
    </View>
  );
}
