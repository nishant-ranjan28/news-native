import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import { Text, View } from "../components/Themed";

export const TOKEN = [
  "b5a2c1d752adec1b86a2b766e97c18be",
  "2de6a306dec14dbd7d21c920953dff6d",
  "e34dae573f2202c10d338992b03a321b",
  "7c49329e251bf2abd58dc9b970d33c90",
  "39233d0268cd8aa594bdfd80defc3f5f",
  "828b4967cb3fc3d4d22f49309621f5e9",
  "846ff54b15a4db65581577f714d0726d",
  "67f3bf5ee8e53eb7797ee088e8c4fb81",
  "f0f69e61c8da9c77707a1c74b0b20b36",
  "5ada4dd631a349761740f0052fed0dc0",
  "5d940199cfe2ef194d3968d45f88c9c9",
  "6ffcad4a6d996086acfd17ebb54c0f3d",
  "a140b8c96c8e19667765b5838bcda29c",
];

export const HEADLILNES = `https://gnews.io/api/v4/top-headlines?lang=en`;

export default function TabOneScreen() {
  const [active, setActive] = useState("breaking-news");
  const [articles, setArticles] = useState([]);
  // const handleCatClick = (category) => {
  //   setActive(category);
  // };
  const fetchNews = async () => {
    let response;
    let count = 0;
    try {
      response = await fetch(`${HEADLILNES}&token=${TOKEN[0]}&topic=${active}`);
      while (response.status === 429 || response.status === 401) {
        Array.prototype.rotate = function (n: any) {
          while (this.length && n < 0) n += this.length;
          this.push.apply(this, this.splice(0, n));
          return this;
        };
        TOKEN.rotate(1);

        count += 1;
        if (count == TOKEN.length - 1) {
          throw "maximum limit reached";
        }
        response = await fetch(
          `${HEADLILNES}&token=${TOKEN[0]}&topic=${active}`
        );
      }
    } catch (e) {
      alert(e);
    }
    response = await response.json();
    setArticles(response.articles);
  };

  useEffect(() => {
    fetchNews();
  }, [active]);

  const ifArticleComplete = (article) => {
    return article.image && article.title && article.description ? true : false;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Apna News</Text>
        {articles.map(
          (article, index) =>
            ifArticleComplete(article) && (
              <Card key={index}>
                <Card.Image source={{ uri: article.image }}></Card.Image>
                <Card.Divider />
                <Card.FeaturedSubtitle>
                  <Text>{article.title}</Text>
                </Card.FeaturedSubtitle>
              </Card>
            )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  header: {
    fontWeight: "100",
    fontSize: 30,
  },
});
