import { StyleSheet } from "react-native";

export default StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  noPadding: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginVertical: 4,
  },

  fillSpace: {
    flex: 1,
  },

  stretch: {
    alignSelf: "stretch",
  },

  rightAligned: {
    justifyContent: "flex-end",
  },

  topMargin: {
    marginTop: 16,
  },

  bottomMargin: {
    marginBottom: 16,
  },

  rightMargin: {
    marginRight: 16,
  },

  leftMargin: {
    marginLeft: 16,
  },

  backgroundCover: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    opacity: 0.7,

    padding: 16,
  },

  lightText: {
    color: "#fff",
    fontSize: 18,
  },

  errorText: {
    color: "#ff0000",
    fontSize: 18,
  },

  header: {
    fontSize: 30,
    alignSelf: "center",
  },

  textInput: {
    alignSelf: "stretch",
    padding: 8,
    borderBottomWidth: 2,

    marginVertical: 8,
  },

  lightTextInput: {
    borderBottomColor: "#FFF",
  },

  darkTextInput: {
    borderBottomColor: "#000",
  },

  inlineTextButton: {
    color: "#87F1FF",
    fontSize: 18,
  },

  pressedInlineTextButton: {
    color: "#87F1FF",
    fontSize: 18,
    opacity: 0.6,
  },
});
