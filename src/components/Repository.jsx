import React from 'react';
import useRepository from '../hooks/useRepository';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import { FlatList, View, StyleSheet } from 'react-native';
import theme from '../theme';
import ReviewItem from './ReviewItem';
import ItemSeparator from './ItemSeparator';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  header: {
    marginBottom: theme.separator.normal
  }
});

const Repository = ({ userData }) => {

  const [deleteReview] = useDeleteReview();
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({ id, first: 8 });

  const reviews = repository ? repository.reviews.edges.map(x => x.node) : [];

  const onEndReach = () => {
    fetchMore();
  };

  if (repository){
    return (
      <FlatList
        data={reviews}
        renderItem={(item) => <ReviewItem deleteReview={deleteReview} item={item.item} userData={userData}/>}
        //renderItem={ReviewItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <RepositoryItem single={true} item={repository}/>}
        ListHeaderComponentStyle={styles.header}
        ItemSeparatorComponent={ItemSeparator}
        stickyHeaderIndices={[0]}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
  return <View/>;
};

export default Repository;