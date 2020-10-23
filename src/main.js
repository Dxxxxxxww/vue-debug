import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Vue.component('loading-component', {
//   template: '<div>loading</div>'
// })

// Vue.component('error-component', {
//   template: '<div>error</div>'
// })

// const LoadingComponent = Vue.component("loading-component")
// const ErrorComponent = Vue.component("error-component");

const LoadingComponent = {
  template: '<div style="color: red;">loading</div>'
}
const ErrorComponent = {
  template: '<div style="color: red;">error</div>'
}

const p = new Promise((resolve, reject) => {
  return setTimeout(() => {
    resolve({
      template: '<div>say hello</div>'
    })
  }, 5000)
})
// 验证 timeout 之后 还是否会加载组件
// 结果不会，内部执行自定义 reject 之后，就不会再执行 自定义的 resolve
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象) 哈哈哈
  component: p, // import('./components/promise'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 0,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3
})
Vue.component('hello-world', AsyncComponent)

/* Fail ed to resolve async component: function AsyncComponent() {
  return {
    // 需要加载的组件 (应该是一个 `Promise` 对象) 哈哈哈
    component: p,
    // import('./components/promise'),
    // 异步组件加载时使用的组件
    loading: LoadingComponent,
    // 加载失败时使用的组件
    error: ErrorComponent,
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 0,
    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 3
  };
}
Reason: timeout (3ms) */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
