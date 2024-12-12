import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import DeleteItemScreen from "./DeleteItemScreen";
import { useNavigation } from '@react-navigation/native';
import items from "../../data/items.json";

const ItemScreen = ({route}) => {
  const {item} = route.params;
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.circularIcon}></View>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditItemScreenNew", {item:item})}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.destructiveButton} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.itemDesc}>Price: ${item.price.toFixed(2)}</Text>
        <Text style={styles.itemDesc}>Size: {item.size}</Text>
        <Text style={styles.itemDesc}>Type: {item.productType}</Text>
        <Text style={styles.itemDesc}>Date Recorded: {item.recordDate}</Text>
        <Text style={styles.itemDesc}>Store: {item.store}</Text>
        <Text style={styles.itemDesc}>Pinned: {item.favourite.toString()}</Text>
      </View>
    </ScrollView>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
  root: {
    height: "100%",
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: "32px",
  },
  circularIcon: {
    marginHorizontal: "24px",
    backgroundColor: "tomato",
    width: "108px",
    height: "108px",
    borderRadius: "50%",
  },
  itemName: {
    margin: "auto",
    marginLeft: "6px",
    fontSize: 36,
    fontWeight: "bold",
  },
  body: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  actionButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: "32px",
  },
  button: {
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "32px",
    width: "50%",
    backgroundColor: "#00bcff",
  },
  destructiveButton: {
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "32px",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff2000",
  },
  buttonText: {
    fontSize: "16px",
    color: "#fff",
    fontWeight: "bold",
  },
  itemDesc: {
    paddingHorizontal: "16px",
    fontSize: 18,
    marginBottom: 5,
  },
});
