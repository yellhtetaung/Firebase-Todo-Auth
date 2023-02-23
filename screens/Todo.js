import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  FlatList,
} from "react-native";
import AppStyles from "../styles/AppStyles";
import { auth, db } from "../firebase";
import { sendEmailVerification } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import InlineTextButton from "../components/InlineTextButton";
import AddToDoModal from "../components/AddToDoModal";

export default function Todo({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [toDos, setToDos] = useState([]);

  const loadToDoList = async () => {
    const q = query(
      collection(db, "todos"),
      where("userId", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    const toDos = [];
    querySnapshot.forEach((doc) => {
      const toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });

    setToDos(toDos);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadToDoList();
  }

  const checkToDoItem = (item, isChecked) => {};

  const deleteToDo = async (toDoId) => {
    await deleteDoc(doc(db, "todos", toDoId));
    const updatedToDos = [...toDos].filter((item) => item.id != toDoId);
    setToDos(updatedToDos);
  };

  const renderToDoItem = ({ item }) => {
    return (
      <View
        style={[
          AppStyles.rowContainer,
          AppStyles.rightMargin,
          AppStyles.leftMargin,
        ]}
      >
        <View style={AppStyles.fillSpace}>
          <BouncyCheckbox
            isChecked={item.completed}
            size={25}
            fillColor="#258ea6"
            unfillColor="#ffffff"
            text={item.text}
            iconStyle={{ borderColor: "#258ea6" }}
            onPress={(isChecked) => {
              checkToDoItem(item, isChecked);
            }}
          />
        </View>
        <InlineTextButton
          text="Delete"
          color="#258ea6"
          onPress={() => deleteToDo(item.id)}
        />
      </View>
    );
  };

  const showToDoList = () => {
    return (
      <FlatList
        style={AppStyles.stretch}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadToDoList();
          setIsRefreshing(true);
        }}
        data={toDos}
        keyExtractor={(item) => item.id}
        renderItem={renderToDoItem}
      />
    );
  };

  const showContent = () => {
    return (
      <View>
        {isLoading ? <ActivityIndicator size="large" /> : showToDoList()}
        <Button
          title="Add ToDo"
          color="#fd4d3d"
          onPress={() => setModalVisible(true)}
        />
      </View>
    );
  };

  const showSendEmailVerfication = () => {
    return (
      <View>
        <Text>Please verify your email to use Todo</Text>
        <Button
          title="Send Verification Email"
          onPress={() => sendEmailVerification(auth.currentUser)}
        />
      </View>
    );
  };

  const addToDo = async (todo) => {
    const toDoToSave = {
      text: todo,
      completed: false,
      userId: auth.currentUser.uid,
    };
    const docRef = await addDoc(collection(db, "todos"), toDoToSave);

    toDoToSave.id = docRef.id;
    let updateToDos = [...toDos];
    updateToDos.push(toDoToSave);

    setToDos(updateToDos);
  };

  return (
    <SafeAreaView>
      <View
        style={[
          AppStyles.rowContainer,
          AppStyles.rightAligned,
          AppStyles.rightMargin,
        ]}
      >
        <InlineTextButton
          text="Manage Account"
          color="#258ea6"
          onPress={() => navigation.navigate("ManageAccount")}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddToDoModal
          onClose={() => setModalVisible(false)}
          addToDo={(todo) => addToDo(todo)}
        />
      </Modal>

      <Text style={AppStyles.header}>Todo</Text>
      {auth.currentUser.emailVerified
        ? showContent()
        : showSendEmailVerfication()}
    </SafeAreaView>
  );
}
