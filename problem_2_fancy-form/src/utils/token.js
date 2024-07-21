import AVAILABLE_TOKEN from "../constants/tokenRate.json";

const getImagePath = (currency) => {
  try {
    return require(`../assets/tokens/${currency}.svg`);
  } catch (error) {
    return require(`../assets/tokens/unknown.jpg`);
  }
};

export const getListToken = () =>
  AVAILABLE_TOKEN.map((tokenData) => ({
    name: tokenData.currency,
    price: tokenData.price,
    imgPath: getImagePath(tokenData.currency),
  }));

export const getDefaultToken = () => [
  {
    name: AVAILABLE_TOKEN[0].currency,
    price: AVAILABLE_TOKEN[0].price,
    imgPath: getImagePath(AVAILABLE_TOKEN[0].currency),
  },
  {
    name: AVAILABLE_TOKEN[1].currency,
    price: AVAILABLE_TOKEN[1].price,
    imgPath: getImagePath(AVAILABLE_TOKEN[1].currency),
  },
];
