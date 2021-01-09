import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    subheading: 'white',
    barBackground: '#24292e',
    appBackground: '#e1e4e8',
    greyBorder: 'grey',
    error: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    extra: 18
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  borderRadius: {
    normal: 4,
  },
  margin: {
    normal: 14,
    half: 8,
  },
  padding: {
    normal: 14,
    half: 8
  },
  separator: {
    normal: 10
  },
  ratingCircle: {
    size: 50,
  }
};
  
export default theme;