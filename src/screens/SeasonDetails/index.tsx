import { Box, FlatList, Row, Text } from "native-base";
import React from "react";
import { Image, View } from "react-native";
import api from "../../api";
import AppHeader from "../../components/AppHeader";
import PageLoader from "../../components/PageLoader";
import { useSeasonDetails } from "../../queries";
import { Page } from "../../theme";

export type ISeasonDetailsProps = {};

const SeasonDetails: React.FC<ISeasonDetailsProps> = ({ route }) => {
  const { tvId, seasonId } = route.params;
  const { data, isLoading, error } = useSeasonDetails(tvId, seasonId);

  if (isLoading) {
    return <PageLoader />;
  }

  const { air_date, episodes, name, poster_path } = data;

  const renderItem = ({ item, index }) => {
    return <Episode {...item} index={index + 1} />;
  };

  return (
    <Page>
      {/* <FloatingBackButton /> */}
      <AppHeader title={name} showBack />
      <FlatList
        showsVerticalScrollIndicator={false}
        ml="4"
        data={episodes || []}
        renderItem={renderItem}
      />
    </Page>
  );
};

const Episode = ({ name, still_path, runtime, overview, index }) => {
  const imageSize = 90;
  return (
    <Box mb="5">
      <Row>
        <Image
          source={{
            uri: api.getUrlForImagePath(still_path),
          }}
          resizeMode="contain"
          style={{
            height: imageSize,
            width: imageSize * 1.78,
            borderRadius: 12,
            backgroundColor: "#000000",
          }}
        />
        <Box px="2" flex={1} justifyContent="center">
          <Text fontWeight="semibold">
            {index}. {name}
          </Text>
          <Text fontWeight="hairline" fontSize="xs">
            {runtime}m
          </Text>
        </Box>
      </Row>
      <Text mt="2" pr="2" fontSize="10" fontWeight="light">
        {overview}
      </Text>
    </Box>
  );
};

export { SeasonDetails };
