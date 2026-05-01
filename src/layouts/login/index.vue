<template>
  <div class="login-page" :style="'background-image: url(' + pkachan + ');'">
    <Transition name="slide-fade">
      <div v-if="toggleLoginForm" class="login-shell">
        <div class="login-card">
          <div class="login-topbar">
            <div class="login-progress">
              <span class="login-progress-segment login-progress-segment-active"></span>
            </div>
          </div>

          <div class="login-logo-wrap">
            <div class="login-logo-box">
              <img src="./../../assets/logo.svg" class="w-full" alt="Company logo">
            </div>
          </div>

          <div class="login-company-wrap">
            <div class="login-company-name font-moul">ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
            <div class="login-company-system font-moul">{{ store.state.system.name }}</div>
          </div>

          <div class="login-hero">
            <h1 class="login-title">Welcome Back</h1>
            <p class="login-subtitle">Please enter your details</p>
          </div>

          <n-form>
            <div class="login-field-block">
              <label class="login-field-label">USERNAME / ID</label>
              <n-input
                placeholder="Enter your user ID"
                v-model:value="credentials.email"
                clearable
                @keyup.enter="funcLogin"
                class="login-input"
              />
            </div>

            <div class="login-field-block">
              <div class="login-password-row">
                <label class="login-field-label mb-0">PASSWORD</label>
                <button
                  type="button"
                  class="login-forgot-link"
                  @click="funcForgotPassword"
                >
                  Forgot?
                </button>
              </div>
              <n-input
                placeholder="Enter your password"
                v-model:value="credentials.password"
                type="password"
                clearable
                @keyup.enter="funcLogin"
                class="login-input"
              />
            </div>

            <div class="login-action-block">
              <n-button
                type="default"
                class="login-button"
                :loading="loading"
                @click="funcLogin"
              >
                Sign In
              </n-button>
            </div>
          </n-form>
        </div>
      </div>
    </Transition>

    <div class="fixed bottom-0 mx-auto w-full">
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import { getUser } from '@plugins/authentication'
import { getMaxUploadFilesize, setMaxUploadFilesize } from '@plugins/file'
import { getRoutes } from '@plugins/route'
import FooterComponent from '@components/footer/copy-right.vue'
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import pkachan from '@assets/pkachan.png'

export default {
  name: 'LoginTemplate',
  components: {
    FooterComponent
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const message = useMessage()
    const toggleLoginForm = ref(false)

    if (getUser() !== undefined && getUser() !== null) {
      router.push('/search')
    }

    const credentials = reactive({
      email: '',
      password: '',
    })

    const loading = ref(false)

    function funcForgotPassword() {
      router.push('/forgot-password')
    }

    function funcLogin() {
      if (credentials.email == '' || credentials.email == null) {
        message.warning('Please enter your username or ID first.')
        return false
      }

      if (credentials.password == '' || credentials.password == null) {
        message.warning('Please enter your password first.')
        return false
      }

      loading.value = true
      store.dispatch('auth/login', {
        email: credentials.email,
        password: credentials.password
      }).then((res) => {
        if (res.data.ok) {
          store.commit('auth/setAuthentication', {
            user: res.data.record,
            token: res.data.token
          })

          setMaxUploadFilesize(parseFloat(res.data.upload_max_filesize.replace('M', '')))

          let routes = router.getRoutes()
          for (let i in routes) {
            router.hasRoute(routes[i].name) ? router.removeRoute(routes[i].name) : false
          }

          routes = getRoutes()
          for (let i in routes) {
            router.addRoute(routes[i])
          }

          message.success('Welcome!')
          router.push('/')
        } else {
          message.error(res.data.message)
        }

        loading.value = false
      }).catch((err) => {
        loading.value = false
        if (err.response !== null) {
          let messageText = err.response.status + ': ' + err.response.statusText + '.'
          if (err.response.data !== null && err.response.data.errors !== undefined) {
            for (var key in err.response.data.errors) {
              messageText += err.response.data.errors[key]
            }
          }
          message.error(err.response.data.message + ' ( ' + messageText + ' ) ')
        } else {
          console.log(err.response)
        }
      })
    }

    onMounted(() => {
      setTimeout(function () {
        toggleLoginForm.value = true
      }, 200)
    })

    return {
      credentials,
      loading,
      store,
      toggleLoginForm,
      funcForgotPassword,
      funcLogin,
      pkachan
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.login-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 1rem 6rem;
}

.login-card {
  width: min(100%, 430px);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
  padding: 1.5rem 1.25rem 2rem;
}

.login-topbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.9rem;
}

.login-progress {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.login-progress-segment {
  width: 1.9rem;
  height: 0.34rem;
  border-radius: 999px;
  background: #e2e8f0;
}

.login-progress-segment-active {
  background: #0f172a;
}

.login-logo-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 0.9rem;
}

.login-logo-box {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: #0f172a;
  padding: 0.75rem;
  box-shadow: 0 12px 20px rgba(15, 23, 42, 0.18);
}

.login-company-wrap {
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-company-name {
  color: #d97706;
  margin-bottom: 0.35rem;
}

.login-company-system {
  color: #64748b;
  font-size: 0.78rem;
  line-height: 1.45;
}

.login-hero {
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-title {
  color: #0f172a;
  font-size: 2rem;
  line-height: 1.15;
  font-weight: 700;
  margin: 0 0 0.45rem;
}

.login-subtitle {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.55;
  margin: 0;
}

.login-field-block {
  margin-bottom: 1rem;
}

.login-field-label {
  display: block;
  color: #94a3b8;
  font-size: 0.85rem;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-bottom: 0.55rem;
}

.login-password-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.55rem;
}

.login-forgot-link {
  color: #0f172a;
  font-size: 0.85rem;
  font-weight: 700;
}

.login-input :deep(.n-input-wrapper) {
  min-height: 48px;
  border-radius: 14px;
  background: #f8fafc;
  box-shadow: none;
}

.login-action-block {
  margin-top: 1.25rem;
}

.login-button {
  width: 100%;
  height: 50px;
  border-radius: 14px;
  background: #0f172a;
  border-color: #0f172a;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  box-shadow: 0 12px 20px rgba(15, 23, 42, 0.14);
}

.login-button:not(.n-button--disabled):hover {
  background: #111c37;
  border-color: #111c37;
  color: #ffffff;
}

:deep(.n-form-item) {
  margin-bottom: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 1.15rem 1rem 1.5rem;
    border-radius: 24px;
  }

  .login-title {
    font-size: 1.75rem;
  }
}
</style>
