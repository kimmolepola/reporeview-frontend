import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useHistory, withRouter } from 'react-router-native';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.normal,
  },
  flexContainer: {
    padding: theme.padding.normal,
    flexDirection: 'column',
    display: 'flex',
    backgroundColor: 'white',
  },
  flexContainerImageAndInfo: {
    marginBottom: theme.margin.normal,
    display: 'flex',
    flexDirection: 'row',
  },
  flexContainerInfo: {
    flexShrink: 1,
    marginLeft: theme.margin.normal,
    marginRight: theme.margin.normal,
    display: 'flex',
    flexDirection: 'column',
  },
  flexContainerStats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  flexContainerStatsItems: {
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center'
  },
  flexItem: {
    flexGrow: 0,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.padding.normal,
    borderRadius: theme.borderRadius.normal,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.margin.normal,
  },
  buttonText: {
    marginTop: 5, 
    marginBottom: 5, 
    color: theme.colors.subheading, 
    fontWeight: 'bold',
  }
});

const Stat = ({ testid, name, value }) => (
  <View style={styles.flexContainerStatsItems}>
    <Text testID={testid} fontWeight="bold">
      {value}
    </Text>
    <Text color="textSecondary">
      {name}
    </Text>
  </View>
);

const RenderItem = ({ item, single }) => {

  const history = useHistory();
  const onPressRepo = () => {
    history.push(`/Repository/${item.id}`);
  };
  const onPressWeb = () => {
    Linking.openURL(item.url);
  };

  return (
    <TouchableOpacity onPress={onPressRepo}>
      <View testID="repositoryItem" style={styles.flexContainer}>
        <View style={styles.flexContainerImageAndInfo}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.ownerAvatarUrl,
            }}
          />
          <View style={styles.flexContainerInfo}>
            <Text testID="fullName" fontWeight="bold">
              {item.fullName}
            </Text>
            <Text testID="description" color="textSecondary"paddingTopBottom="true">
              {item.description}
            </Text>
            <Text testID="language" padding="true" backgroundColor="true" color="subheading">
              {item.language}
            </Text>
          </View>
        </View>
        <View style={styles.flexContainerStats}>
          <Stat testid="stars" name="Stars" value={item.stargazersCount} />
          <Stat testid="forks" name="Forks" value={item.forksCount} />
          <Stat testid="reviews" name="Reviews" value={item.reviewCount} />
          <Stat testid="rating" name="Rating" value={item.ratingAverage} />
        </View>
        { single &&
          <TouchableOpacity style={styles.button} onPress={onPressWeb}>
            <Text style={styles.buttonText}>Open in GitHub</Text>
          </TouchableOpacity>
        }
      </View>
    </TouchableOpacity>
  );};

export default withRouter(RenderItem);
