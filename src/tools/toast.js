const createToast = (message) => {
  window.M?.toast({ html: message, classes: 'rounded green' });
};

export default createToast;
