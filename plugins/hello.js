export default (_, inject) => {
  inject('hello', () => {
    console.log('Hello!');
  });
};
