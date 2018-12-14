// Returns a Date object if the input is a valid datetime string in JSON format (if not:returns input)

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
const reviver = (key, value) => {
  if (typeof value === "string" && dateFormat.test(value)) {
    return new Date(value);
  }
  return value;
};

export default reviver;
