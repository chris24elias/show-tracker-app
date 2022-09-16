import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Box, Icon, IconButton } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FloatingBackButton: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <Box
      style={{
        position: 'absolute',
        top: insets.top,
        left: 0,
        zIndex: 10
      }}
    >
      <IconButton
        onPress={() => navigation.goBack()}
        icon={<Icon size="md" as={<Feather name="chevron-left" />} color="white" />}
      />
    </Box>
  );
};

export default FloatingBackButton;

const styles = StyleSheet.create({});
