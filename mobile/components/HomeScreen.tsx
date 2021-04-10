import React, { useEffect, FC, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Button, Input, Layout, TopNavigation, Divider } from "@ui-kitten/components";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../type";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDatabase } from "../context/DatabaseContext";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: FC<Props> = ({ navigation }) => {
  const [snusPerWeek, setSnusPerWeek] = useState("");
  const [snusAtHome, setSnusAtHome] = useState("");
  const db = useDatabase();

  const goToMain = () => {
    // TODO: Add form control
    db.createUser(parseInt(snusAtHome), parseInt(snusPerWeek));
    navigation.navigate("Main");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <Text category="h1" style={{ fontFamily: "PoppinsBold" }}>
          Snuber
        </Text>
        <Input
          keyboardType="number-pad"
          placeholder="Antal dosor i veckan"
          value={snusPerWeek}
          onChangeText={(nextValue) => setSnusPerWeek(nextValue)}
        />
        <Input
          keyboardType="number-pad"
          placeholder="Hur många dosor du har hemma"
          value={snusAtHome}
          onChangeText={(nextValue) => setSnusAtHome(nextValue)}
        />
        <Button style={styles.baseStyle} onPress={goToMain}>
          Fortsätt
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
  },
  baseStyle: {
    marginTop: 10,
  },
});

export default HomeScreen;
