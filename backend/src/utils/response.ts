const responsePayload = (status: boolean, message: string, payload?: any) => ({
  status,
  message,
  payload,
});

export default responsePayload;
