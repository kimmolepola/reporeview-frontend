import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import useCreateReview from '../hooks/useCreateReview';
import { useHistory } from 'react-router-native';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  flexContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.padding.normal,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.padding.normal,
    borderRadius: theme.borderRadius.normal,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    marginTop: 5, 
    marginBottom: 5, 
    color: theme.colors.subheading, 
    fontWeight: 'bold',
  }
});

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required("Repository owner name is required"),
  repositoryName: yup
    .string()
    .required("Repository name is required"),
  ratingString: yup
    .number()
    .required("Rating is required")
    .moreThan(-1, "Rating must be between 0 and 100")
    .lessThan(101, "Rating must be between 0 and 100")
    .integer("Rating must be an integer")
    .typeError("Rating must be a number"),
  text: yup
    .string()
});

/*
const initialValues = {
  ownerName: 'EricJMarti',
  repositoryName: 'inventory-hunter',
  ratingString: '90',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};
*/

const initialValues = {
  ownerName: '',
  repositoryName: '',
  ratingString: '',
  text: '',
};

const ReviewForm = ({ onSubmit }) => (
  <View style={styles.flexContainer}>
    <FormikTextInput multiline name="ownerName" placeholder="Repository owner name"/>
    <View style={{ margin: theme.margin.half }}/>
    <FormikTextInput multiline name="repositoryName" placeholder="Repository name"/>
    <View style={{ margin: theme.margin.half }}/>
    <FormikTextInput name="ratingString" placeholder="Rating between 0 and 100"/>
    <View style={{ margin: theme.margin.half }}/>
    <FormikTextInput multiline name="text" placeholder="Review"/>
    <View style={{ margin: theme.margin.half }}/>
    <TouchableOpacity style={styles.button} onPress={onSubmit}>
      <Text style={styles.buttonText}>Create a review</Text>
    </TouchableOpacity>
  </View>
);

const RepositoryReviewForm = () => {
  const [review] = useCreateReview();
  const history = useHistory();
  
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, ratingString, text } = values;
  
    const rating = parseInt(ratingString);

    try {
      const data = await review({ ownerName, repositoryName, rating, text });
      if (data && data.createReview && data.createReview.repositoryId){
        history.push(`/Repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Error", e.message);
    }
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit}/>}
    </Formik>
  );
};

export default RepositoryReviewForm;
