const logger = (param: any) => (store: any) => (next: any) => (action: any) => {
  next(action);
};

export default logger;
