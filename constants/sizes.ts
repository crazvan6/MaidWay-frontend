import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

// Responsive sizing based on screen dimensions
const sizes = {
  icons: {
    xs: width * 0.03,  // 3% of screen width
    sm: width * 0.035, // 3.5%
    md: width * 0.04,  // 4%
    lg: width * 0.05,  // 5%
    xl: width * 0.06,  // 6%
    xxl: width * 0.08, // 8%
    extra: width * 0.1
  },

  navbar: {
    filter: {
      height: height * 0.17,
      width: width
    },

    profile: {
      height: height * 0.4,
      width: width
    }
  },

  buttons: {
    xs: {
      width: width * 0.13,
      height: width * 0.13
    },

    md: {
      height: height * 0.04,
      width: width * 0.4
    },

    lg: {
      height: height * 0.06,
      width: width * 0.9
    },

    switch: {
      height: height * 0.15,
      width: width * 0.4
    },

    filter: {
      height: height * 0.1,
    },

    check: {
      height: width * 0.06,
      width: width * 0.06
    }
  },

  input: {
    md: {
      height: height * 0.07,
      width: width * 0.9
    },
  }
};

export default sizes;
