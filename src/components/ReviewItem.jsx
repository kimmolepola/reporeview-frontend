import React from 'react';
import { Alert, View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';

const styles = (props) => {
  const buttonColor = props && props.buttonColor ? props.buttonColor : "white";
  
  return (StyleSheet.create({
    separator: {
      height: theme.separator.normal,
    },
    reviewContent: {
      flexDirection: 'row',
      display: 'flex',
      backgroundColor: 'white',
    },
    header: {
      marginBottom: theme.separator.normal
    },
    rating: {
      display:'flex',
      flexDirection: 'column',
      justifyContent:'center',
      alignItems: 'center',
      width: theme.ratingCircle.size,
      height: theme.ratingCircle.size,
      borderRadius: theme.ratingCircle.size/2,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    reviewInfoAndText: {
      flexShrink: 1,
      marginLeft: theme.margin.normal,
      flexDirection: 'column',
      display: 'flex',
    },
    reviewInfo: {
      display: 'flex',
      flexDirection: 'column',
      height: theme.ratingCircle.size,
      justifyContent: 'center'
    },
    buttonContainer: {
      marginTop: theme.margin.normal,
      height: theme.ratingCircle.size,
      display: 'flex',
      flexDirection: 'row',
    },
    button: {
      flexGrow: 1,
      backgroundColor: buttonColor,
      borderRadius: theme.borderRadius.normal,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    reviewContentAndButtons: {
      padding: theme.padding.normal,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
    }
  }));
};
  
const ReviewItem = ({ userData, myReviews, deleteReview, history, item }) => {
  
  let ownReview = false;
  let name = "";
  if (item.user){
    name = item.user.username;
    if (userData && userData.authorizedUser)
      ownReview = item.user.id === userData.authorizedUser.id;
  } else if (item.repository){
    name = item.repository.fullName;
  }

  const onPressViewRepository = () => {
    if (history){
      history.push(`/Repository/${item.repository.id}`);
    }
  };

  const onPressDeleteReview = () => {
    Alert.alert(
      "Delete review", 
      "Are you sure you want to delete this review?",
      [
        {
          text: 'CANCEL',
        },
        {
          text: 'DELETE',
          onPress: () => deleteReview(item.id)
        }
      ],
    );
  };

  const ViewButton = () => (
    <TouchableOpacity onPress={onPressViewRepository} style={styles({ buttonColor: theme.colors.primary }).button} >
      <Text style={{ color: theme.colors.subheading, fontWeight: 'bold' }}>View repository</Text>
    </TouchableOpacity>
  );

  const DeleteButton = () => (
    <TouchableOpacity onPress={onPressDeleteReview} style={styles({ buttonColor: '#FF1E5F' }).button}>
      <Text style={{ color: theme.colors.subheading, fontWeight: 'bold' }}>Delete review</Text>
    </TouchableOpacity>
  );

  const Buttons = () => (
    <View style={styles().buttonContainer}>
      {myReviews && <ViewButton/>}
      {myReviews && <View style={{ padding: theme.padding.half }}/>}
      {(myReviews || ownReview) && <DeleteButton/>}
    </View>
  );

  return (
    <View style={styles().reviewContentAndButtons}>
      <View style={styles().reviewContent}>
        <View style={styles().rating}>
          <Text fontSize="extra" fontWeight="bold" color="primary" >{item.rating}</Text>
        </View>
        <View style={styles().reviewInfoAndText}>
          <View style={styles().reviewInfo}>
            <Text fontWeight="bold">{name}</Text>
            <Text color="textSecondary">{format(new Date(item.createdAt), 'dd.MM.yyyy')}</Text>
          </View>
          <Text >{item.text}</Text>
        </View>
      </View>
      {(myReviews || ownReview) && <Buttons />}
    </View>
  );
};
  
export default ReviewItem;