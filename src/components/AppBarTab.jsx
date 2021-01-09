import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import { useHistory } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  flexItem: {
    flexGrow: 0,
    paddingLeft: theme.padding.normal,
    paddingRight: theme.padding.normal,
    paddingBottom: 20,
    paddingTop: 30
  },
});

const AppBarTab = ({ text, link }) => {
  const history = useHistory();

  const onPress = () => {
    history.push(link);
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.flexItem}>
        {<Text fontSize="subheading" color="subheading" fontWeight="bold">{text}</Text>}        
      </View>
    </TouchableOpacity>
  );
};

export default AppBarTab;

/*
return (
  <Link to={link} component={TouchableOpacity} activeOpacity={0.8}>
    <View style={styles.flexItem}>
      {<Text fontSize="subheading" color="subheading" fontWeight="bold">{text}</Text>}        
    </View>
  </Link>
);
*/