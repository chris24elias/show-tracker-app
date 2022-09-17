import { useNavigation } from "@react-navigation/native";
import { Box, FlatList, Heading } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import ShowCard from "../../components/ShowCard";
import routes from "../../navigation/routes";

interface DiscoverSectionProps {
  data: any[];
  title: string;
}

const DiscoverSection: React.FC<DiscoverSectionProps> = ({ data, title }) => {
  const navigation = useNavigation();
  const sectionCardheight = 120;

  const renderItem = ({ item }) => {
    return (
      <ShowCard
        size={sectionCardheight}
        poster={item.poster_path}
        title={item.name}
        year={item.first_air_date}
        onPress={() =>
          navigation.navigate(routes.showDetails, {
            tmdbId: item.id,
          })
        }
        style={{ marginRight: 15 }}
      />
    );
  };

  return (
    <Box px={3} marginTop={3}>
      <Heading fontSize="2xl">{title}</Heading>
      <FlatList
        data={data}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
    </Box>
  );
};

export default DiscoverSection;

const styles = StyleSheet.create({});
