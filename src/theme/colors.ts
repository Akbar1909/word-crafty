import {DefaultTheme} from '@react-navigation/native';

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#2E2E38',
  900: '#282831',
  1000: '#2e2e38',
};

export const SECONDARY_COLORS = {
  main: 'rgb(251, 191, 36)',
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    COMMON: {
      white: '#FFFFFF',
      black: '#000000',
    },
    GREY,
    PURPLE: {
      900: 'rgba(76, 29, 149,0.9)',
    },
    PRIMARY: {
      lighter: '#D1E9FC',
      light: '#76B0F1',
      main: 'rgba(109, 40, 217,0.7)',
      dark: '#103996',
      darker: '#061B64',
      contrastText: '#fff',
    },
    SECONDARY: {
      light: '#FFCCBC',
      main: '#3366FF',
      dark: '#E64A19',
      contrastText: '#212121',
    },
    INFO: {
      lighter: '#D0F2FF',
      light: '#74CAFF',
      main: '#1890FF',
      dark: '#0C53B7',
      darker: '#04297A',
      contrastText: '#fff',
    },
    SUCCESS: {
      lighter: '#E9FCD4',
      light: '#AAF27F',
      main: '#54D62C',
      dark: '#229A16',
      darker: '#08660D',
      contrastText: GREY[800],
    },
    WARNING: {
      lighter: '#FFF7CD',
      light: '#FFE16A',
      main: '#FFC107',
      dark: '#B78103',
      darker: '#7A4F01',
      contrastText: GREY[800],
    },
    ERROR: {
      lighter: '#FFE7D9',
      light: '#FFA48D',
      main: '#e01818',
      dark: '#B72136',
      darker: '#7A0C2E',
      contrastText: '#fff',
    },
    background: {
      paper: '#fff',
      default: '#E7E7E7',
      neutral: GREY[200],
      secondary: '#E7E7E7',
      common: '#F0F0F0',
    },
  },
};

export default MyTheme;
