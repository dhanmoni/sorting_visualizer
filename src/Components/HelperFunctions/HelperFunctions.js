const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const decreaseSpeed = ({ speed, setSpeed, data }) => {
  if (speed < 2) return false;
  speed < 15
    ? setSpeed((prevCount) => prevCount - 1)
    : data === "twice"
    ? speed > 100
      ? setSpeed((prevCount) => prevCount - 100)
      : setSpeed((prevCount) => prevCount - 10)
    : setSpeed((prevCount) => prevCount - 10);
};

const increaseSpeed = ({ speed, setSpeed, data }) => {
  if (speed >= 1000) return false;
  speed < 15
    ? setSpeed((prevCount) => prevCount + 1)
    : data === "twice"
    ? speed < 900
      ? setSpeed((prevCount) => prevCount + 100)
      : setSpeed((prevCount) => prevCount + 10)
    : setSpeed((prevCount) => prevCount + 10);
};

const decreaseArrayLength = ({ maxlength, setLength, data }) => {
  if (maxlength <= 5) return false;
  data === "twice"
    ? maxlength > 20
      ? setLength((prevLen) => prevLen - 20)
      : setLength((prevLen) => prevLen - 5)
    : setLength((prevLen) => prevLen - 5);
};

const increaseArrayLength = ({ maxlength, setLength, data, width }) => {
  let limit = 150;
  let bound = 130;
  if (width <= 600) {
    limit = 50;
    bound = 30;
  }
  if (maxlength >= limit) return false;
  data === "twice"
    ? maxlength < bound
      ? setLength((prevLen) => prevLen + 20)
      : setLength((prevLen) => prevLen + 5)
    : setLength((prevLen) => prevLen + 5);
};

export {
  increaseSpeed,
  increaseArrayLength,
  decreaseSpeed,
  decreaseArrayLength,
  getRandomInt,
};
