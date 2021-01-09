import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import { Route, Switch, Redirect } from 'react-router-native';
import SignIn from './SignIn';
import Repository from './Repository';
import RepositoryReviewForm from './RepositoryReviewForm';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import SignUp from './SignUp';
import ReviewList from './ReviewList';

const Main = () => {
  const { data } = useAuthorizedUser();
  //const [loggedIn, setLoggedIn] = useState(data != undefined && data.authorizedUser != null);
  const [loggedIn, setLoggedIn] = useState();
  useEffect(()=>{
    setLoggedIn(Boolean(data && data.authorizedUser));
  },[data]);
  const [ordering, setOrdering] = useState({ orderBy: "CREATED_AT" });
  const [filterKeyword, setFilterKeyword] = useState("");
  const filter = {
    filterKeyword,
    setFilterKeyword,
  };

  return (
    <View style={{ flex: 1 }} backgroundColor={theme.colors.appBackground}>
      <AppBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/" exact>
          <RepositoryList 
            ordering={ordering} 
            setOrdering={setOrdering}
            filter={filter}
          />
        </Route>
        <Route path="/SignIn" exact>
          <SignIn setLoggedIn={setLoggedIn}/>
        </Route>
        <Route path="/Repository/:id">
          <Repository userData={data}/>
        </Route>
        <Route path="/Review" exact>
          <RepositoryReviewForm />
        </Route>
        <Route path="/SignUp">
          <SignUp setLoggedIn={setLoggedIn}/>
        </Route>
        <Route path="/MyReviews" exact>
          <ReviewList />
        </Route>
        <Redirect to="/"/>
      </Switch>
    </View>
  );
};

export default Main;
