const scheduleAheadTime = 0.1;
const noteLength = 0.03;
const lookahead = 25;
const currentSubLength = (subdivision) => {
  return subdivision === "First"
    ? 1
    : subdivision === "Duplet"
    ? 2
    : subdivision === "Quadruplet"
    ? 4
    : subdivision === "Triplet"
    ? 3
    : null;
};

export { scheduleAheadTime, noteLength, lookahead, currentSubLength };
