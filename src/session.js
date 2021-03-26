export function Session() {
  let sessionStartTime;

  const start = () => {
    sessionStartTime = Date.now();
  };

  const getTime = () => {
    return Date.now() - sessionStartTime;
  };

  return {
    start,
    getTime
  };
}
