import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useReviews from '../hooks/useReviews';
import ReviewItem from './ReviewItem';
import ItemSeparator from './ItemSeparator';
import { useHistory } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';
import Text from './Text';

const styles = StyleSheet.create({
  loading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "66%"
  }
});

const ReviewList = () => {
  const [deleteReview] = useDeleteReview();
  const { reviews, fetchMore, loading } = useReviews({ first: 8 });
  const history = useHistory();

  const onEndReach = () => {
    fetchMore();
  };

  const reviewNodes = reviews ? reviews.edges.map(edge => edge.node) : [];

  if (loading){
    return (
      <View style={styles.loading}><Text>loading...</Text></View>
    );
  }

  return (
    <FlatList
      data={reviewNodes}
      renderItem={(item) => <ReviewItem myReviews={true} deleteReview={deleteReview} history={history} item={item.item}/>}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );

};

export default ReviewList;