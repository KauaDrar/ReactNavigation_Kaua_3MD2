import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";

export default function Clima({ route }) {
  const cidade = route.params.cidade;
  const id = route.params.id;
  const [loading, setLoading] = useState(true);
  const [climas, setClimas] = useState("");

  useEffect(() => {
    const request = async () => {
      const req = await fetch(
        `https://api.hgbrasil.com/weather?woeid=${id}&array_limit=10&fields=only_results,temp,city_name,forecast,max,min,date&key=679f4f5a`
      );
      const json = await req.json();

      if (json) {
        console.log(json.forecast);
        setClimas(json.forecast);
      }

      setLoading(false);
    };

    request();
  }, []);

  return (
    <View style={styles.bloco}>
      <Text style={styles.nomeCidade}>{cidade}</Text>
      {loading && (
        <View style={{flex: 1, justifyContent: "center"}}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      )}
      {!loading && (
        <FlatList
        style={{ width: "100%"}}
        alignItems="center"
        showsVerticalScrollIndicator={false}
        data={climas}
        keyExtractor={item => item.date}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <View style={styles.clima}>
              <Text style={styles.data}>{item.date}</Text>
              <Text>Max: {item.max}</Text>
              <Text>Min: {item.min}</Text>
            </View>
          );
        }}
      />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bloco: {
    paddingTop: 30,
    backgroundColor: "#8ecae6",
    flex: 1,
    alignItems: "center",
  },
  areaBotoes: {
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 30,
  },
  subtitulo: {
    textAlign: "center",
    fontSize: 20,
  },
  botao: {
    backgroundColor: "#023047",
    borderRadius: 5,
    padding: 8,
    marginVertical: 10,
  },
  txtBotao: {
    fontSize: 20,
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  nomeCidade: {
    fontSize: 22,
    fontWeight: "bold",
  },
  clima: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  data: {
    fontSize: 20,
  },
});
