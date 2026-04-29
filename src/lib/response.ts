const Response = {
  success: <D>(data: D) => ({ data, error: null }),
  error: <E extends Error>(error: E) => ({ data: null, error }),
};

export default Response;
