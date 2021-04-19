import RestService from '@/services/providers/APIDataProvider';

const restActions = new RestService();

export default {
  install (Vue) {
    Vue.prototype.$restActions = restActions;
  }
};
