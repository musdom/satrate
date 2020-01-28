import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    rate: null,
    age: null,
    resObj: {}
  },
});

export default app;
