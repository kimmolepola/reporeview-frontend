import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';
import ItemSeparator from './ItemSeparator';
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

const Filter = ({ filter }) => {
  const onChangeSearch = (input) => {
    filter.setFilterKeyword(input);
  };
  return (
    <Searchbar style={{ margin: theme.margin.normal }}
      placeholder={"Filter"}
      onChangeText={onChangeSearch}
      value={filter.filterKeyword}
    />
  );};

const Picker = ({ setOrdering }) => {
  return (
    <RNPickerSelect
      onValueChange={ (value) =>  value ? setOrdering(value) : null }
      items={[
        { label: 'Latest repositories', value: { orderBy: "CREATED_AT" } },
        { label: 'Highest rated repositories', value: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" } },
        { label: 'Lowest rated repositories', value: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" } },
      ]}
    />
  );};

const Header = ({ ordering, setOrdering, filter }) => (
  <View>
    <Filter filter={filter} />
    <Picker ordering={ordering} setOrdering={setOrdering} />
  </View>
);

export class RepositoryListContainer extends React.Component {

  renderHeader = () => {
    return (
      <Header filter={this.props.filter} ordering={this.props.ordering} setOrdering={this.props.setOrdering}/>
    );
  }

  render() {
    // Get the nodes from the edges array

    if (this.props.loading){
      return (<View>{this.renderHeader()}<View style={styles.loading}><Text>loading...</Text></View></View>);
    }

    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={RepositoryItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
        // other props
      />
    );
  }
}

const RepositoryList = ({ ordering, setOrdering, filter }) => {

  const { filterKeyword } = filter;
  const { repositories, fetchMore, loading } = useRepositories({ first: 8, ordering, filterKeyword });

  const onEndReach = () => {
    fetchMore();
  };

  return (<RepositoryListContainer 
    filter={filter} 
    ordering={ordering}
    setOrdering={setOrdering} 
    repositories={repositories}
    onEndReach={onEndReach}
    loading={loading}
  />);
};

export default RepositoryList;

/*
export const RepositoryListContainer = ({ repositories, setOrdering, filter }) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RepositoryItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <Header filter={filter} setOrdering={setOrdering}/>}
      // other props
    />
  );
};
*/