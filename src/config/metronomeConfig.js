const scheduleAheadTime = 0.1;
const noteLength = 0.03;
const lookahead = 25;
const currentSubLength = (subdivision) => {
  return subdivision === "Quarter"
    ? 1
    : subdivision === "Eighth"
    ? 2
    : subdivision === "Sixteenth"
    ? 4
    : subdivision === "Triplet"
    ? 3
    : null;
};

export { scheduleAheadTime, noteLength, lookahead, currentSubLength };
