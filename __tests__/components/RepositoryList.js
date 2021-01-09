import React from 'react';
import { RepositoryListContainer } from '../../src/components/RepositoryList';
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
        // Add your test code here
      const { getAllByTestId, getAllByText } = render(<RepositoryListContainer repositories={repositories} />);

      const testIds = ["fullName", "description", "language", "stars", "forks", "rating", "reviews"];
      for (const testId of testIds){ // test that all the nodes are rendered
        expect(getAllByTestId(testId)).toHaveLength(repositories.edges.length);
      }

      const fullNames = [];
      const descriptions = [];
      const languages = [];
      const forksCounts = [];
      const stargazersCounts = [];
      const ratingAverages = [];
      const reviewCounts = [];

      for (let i = 0; i++;i<repositories.length){
        fullNames.push(repositories.edges[i].node.fullName);
        descriptions.push(repositories.edges[i].node.description);
        languages.push(repositories.edges[i].node.language);
        forksCounts.push(repositories.edges[i].node.forksCount);
        stargazersCounts.push(repositories.edges[i].node.stargazersCount);
        ratingAverages.push(repositories.edges[i].node.ratingAverage);
        reviewCounts.push(repositories.edges[i].node.reviewCount);
      }

      for (let i = 0; i++;i<repositories.length){ // test that a node has a possibly correct content
        expect(getAllByTestId("fullName")[i]).toHaveTextContent(fullNames.join('|'));
        expect(getAllByTestId("description")[i]).toHaveTextContent(descriptions.join('|'));
        expect(getAllByTestId("language")[i]).toHaveTextContent(languages.join('|'));
        expect(getAllByTestId("forks")[i]).toHaveTextContent(forksCounts.join('|'));
        expect(getAllByTestId("stars")[i]).toHaveTextContent(stargazersCounts.join('|'));
        expect(getAllByTestId("rating")[i]).toHaveTextContent(ratingAverages.join('|'));
        expect(getAllByTestId("reviews")[i]).toHaveTextContent(reviewCounts.join('|'));
      }

      for (let i = 0; i++;i<repositories.length){ // test that the repository contents are found somewhere in the render
        expect(getAllByText(fullNames[i]).length).toBeGreaterThan(0);
        expect(getAllByText(descriptions[i]).length).toBeGreaterThan(0);
        expect(getAllByText(languages[i]).length).toBeGreaterThan(0);
        expect(getAllByText(forksCounts[i]).length).toBeGreaterThan(0);
        expect(getAllByText(stargazersCounts[i]).length).toBeGreaterThan(0);
        expect(getAllByText(ratingAverages[i]).length).toBeGreaterThan(0);
        expect(getAllByText(reviewCounts[i]).length).toBeGreaterThan(0);
      }
    });
  });
});