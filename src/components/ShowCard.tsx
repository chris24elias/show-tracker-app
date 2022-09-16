import { Text } from "native-base";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import api from "../api";

interface ShowCardProps {
  poster;
  title;
  year;
  onPress: any;
  size: number;
  style?: ViewStyle;
}

const ShowCard: React.FC<ShowCardProps> = ({
  poster,
  title,
  year,
  onPress,
  size,
  style,
}) => {
  const getPathForPoster = () => {
    return api.getUrlForImagePath(poster);
  };

  return (
    <View
      style={[
        {
          flex: 1,
          marginTop: 10,
        },
        style,
      ]}
    >
      <TouchableOpacity
        onPress={() => onPress()}
        style={{
          height: size * 1.5,
          width: size,
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "white",
          alignSelf: "center",
        }}
      >
        {poster ? (
          <Image
            source={{ uri: getPathForPoster() }}
            style={{ height: "100%", width: "100%", resizeMode: "cover" }}
            onError={(e) => console.log("error", e.nativeEvent.error)}
          />
        ) : null}
      </TouchableOpacity>
      <View
        style={{
          alignSelf: "center",
          width: size,
        }}
      >
        <Text
          fontSize="md"
          fontWeight="bold"
          color="white"
          marginTop={3}
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text fontSize="sm" color="primary.500" marginTop={1}>
          {year?.slice(0, 4)}
        </Text>
      </View>
    </View>
  );
};

export default ShowCard;

const styles = StyleSheet.create({});
