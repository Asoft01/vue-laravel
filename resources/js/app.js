require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import App from './App.vue';
import Home from '../js/components/Home';
import ContactList from '../js/components/ContactList';
import AddContact from '../js/components/AddContact';
import EditContact from '../js/components/EditContact';

// Sweet alert 2
import VueSweetalert2 from 'vue-sweetalert2';
window.Swal= require('sweetalert2');
Vue.use(VueSweetalert2);

import utils from './helpers/utilities';
Vue.prototype.$utils = utils;

import VueAxios from 'vue-axios';
import axios from 'axios';
import Vue from 'vue';
// import Vue from 'vue';

const routes = [
    {
        name: '/',
        path: '/',
        component: Home
    }, {
        name: '/contacts',
        path: '/contacts',
        component: ContactList
    }, {
        name: 'add_contacts',
        path: '/add_contacts',
        component: AddContact
    }, {
        name: 'get_contact',
        path: '/get_contact/edit/:id?',
        component: EditContact
    }
]

Vue.use(VueAxios, axios);

const router = new VueRouter({mode:'history', routes: routes});
const app = new Vue(Vue.util.extend({ router }, App)).$mount('#app');