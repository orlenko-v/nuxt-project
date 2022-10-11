<template>
  <div class="wrapper px-32">
    <div class="container">
      <header class="my-8 flex justify-between items-center">  
        <nuxt-link to="/" class="flex items-center">
          <Logo class="h-10" /><span class="ml-2">Mountain Gallery</span>
        </nuxt-link>
        <div>
          <div class="flex items-center">
            <input class="rounded-l-xl border border-gray-200" v-model="inputData" placeholder="  Enter ID here" />
            <button class="px-4 rounded-r-xl bg-gray-400 hover:bg-gray-500 text-white" @click="add(inputData)">Add</button>
          </div>
          <div v-if="apiCallState.pending">Fetching data...</div>
          <div v-if="apiCallState.error">An error occured</div>
        </div>
        <ul class="menu flex items-center">
          <li class="mx-2 px-2 rounded-md hover:text-white hover:bg-teal-500">
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          &middot;
          <li class="mx-2 px-2 rounded-md hover:text-white hover:bg-teal-500">
            <nuxt-link to="/about">About</nuxt-link>
          </li>
        </ul>
      </header>
      <main>
        <section class="articles flex flex-col">
          <article class="flex items-center even:flex-row-reverse" v-for="item in computedItems" :key="item.id">
            <div class="flex flex-col flex-[40%]">
              <img class="h-96 object-cover rounded-xl" :src="item.image" />
              <button class="px-2 mt-4 rounded-md self-center bg-slate-400 hover:bg-slate-500 text-white" @click="remove(item.id)">Remove</button>
            </div>
            <div class="info border border-gray-200 flex-[60%]">
              <h1>{{ item.title }}</h1>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </section>
      </main>
      <footer>
      </footer>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo,
  },
  data () {
    return {
      inputData: '',
      apiCallState: {
        pending: false,
        error: false,
      }
    };
  },
  computed: {
    computedItems () {
      return this.$store.getters.getItems;
    },
  },
  methods: {
    async add (itemId) {
      this.apiCallState.pending = true;
      try {
        const item = await this.$axios.$get(`https://api.nuxtjs.dev/posts/${itemId}`);
        this.$store.dispatch('addItem', item);
        this.apiCallState.pending = false;
      } catch (e) {
        this.apiCallState.pending = false;
        this.apiCallState.error = true;
      }
    },
    remove (itemId) {
      this.$store.dispatch('removeItem', itemId);
    },
  },
  async asyncData ({ $axios, store, error }) {
    try {
      const items = await $axios.$get(`https://api.nuxtjs.dev/posts`);
      store.dispatch('addItems', items);
    } catch (e) {
      error(e);
    }
  },
};
</script>
