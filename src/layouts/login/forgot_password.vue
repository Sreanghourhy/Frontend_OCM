<template>
  <div class="forgot-page" :style="'background-image: url(' + pkachan + ');'">
    <Transition name="slide-fade">
      <div v-if="toggleForgotPasswordForm" class="forgot-shell">
        <div class="forgot-card">
          <div class="forgot-topbar">
            <button type="button" class="icon-button" @click="router.push('/login')">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <div class="progress-indicator">
              <span :class="['progress-segment', currentStep >= 1 ? 'progress-segment-active' : '']"></span>
              <span :class="['progress-segment', currentStep >= 2 ? 'progress-segment-active' : '']"></span>
            </div>
          </div>

          <div class="logo-wrap">
            <div class="logo-box">
              <img src="./../../assets/logo.svg" class="w-full" alt="Company logo">
            </div>
          </div>

          <div class="company-wrap">
            <div class="company-name font-moul">ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
            <div class="company-system font-moul">{{ store.state.system.name }}</div>
          </div>

          <div v-if="currentStep === 1" class="hero-block">
            <h1 class="hero-title">Verify Identity</h1>
            <p class="hero-description">Step 1: Confirm your user ID to receive a verification code.</p>
          </div>

          <div v-else class="hero-block">
            <h1 class="hero-title">Reset Password</h1>
            <p class="hero-description">Step 2: Create a secure new password for your account.</p>
          </div>

          <n-form>
            <div v-if="!otpVerified">
              <div class="field-block">
                <label class="field-label">USER ID</label>

                <div v-if="showOtpField" class="readonly-row">
                  <div class="readonly-value">{{ forgotPasswordForm.telegram_user_id }}</div>
                  <button type="button" class="change-link" @click="funcChangeTelegramUserId">
                    Change
                  </button>
                </div>

                <n-input
                  v-else
                  placeholder="Enter your username"
                  v-model:value="forgotPasswordForm.telegram_user_id"
                  clearable
                  :disabled="forgotPasswordLoading.sendOtp || forgotPasswordLoading.verifyOtp || forgotPasswordLoading.resetPassword"
                  @keyup.enter="funcSendTelegramOtp"
                  class="forgot-input"
                />
              </div>

              <div v-if="!showOtpField" class="action-block">
                <n-button
                  type="default"
                  class="forgot-button forgot-button-neutral"
                  :disabled="isOtpButtonDisabled"
                  :loading="forgotPasswordLoading.sendOtp"
                  @click="funcSendTelegramOtp"
                >
                  {{ otpButtonText }}
                </n-button>
              </div>

              <div v-if="showOtpField" class="field-block">
                <label class="field-label">VERIFICATION CODE</label>
                <n-input
                  placeholder="Enter verification code"
                  v-model:value="forgotPasswordForm.otp"
                  clearable
                  :disabled="forgotPasswordLoading.verifyOtp || forgotPasswordLoading.resetPassword"
                  @keyup.enter="funcVerifyTelegramOtp"
                  class="forgot-input"
                />
              </div>

              <div v-if="showOtpField" class="action-block">
                <n-button
                  type="default"
                  class="forgot-button forgot-button-neutral"
                  :loading="forgotPasswordLoading.verifyOtp"
                  @click="funcVerifyTelegramOtp"
                >
                  Confirm Identity
                </n-button>
              </div>

              <div v-if="showOtpField" class="resend-block">
                <span v-if="resendCountdown > 0">Didn't receive code? Resend in {{ resendCountdown }}s</span>
                <button
                  v-else
                  type="button"
                  class="resend-link"
                  @click="funcSendTelegramOtp"
                >
                  Didn't receive code? Resend
                </button>
              </div>
            </div>

            <div v-if="showResetPasswordFields">
              <div class="field-block">
                <label class="field-label">NEW PASSWORD</label>
                <n-input
                  type="password"
                  placeholder="Enter new password"
                  v-model:value="forgotPasswordForm.password"
                  clearable
                  :disabled="forgotPasswordLoading.resetPassword"
                  @keyup.enter="funcResetTelegramPassword"
                  class="forgot-input"
                />
              </div>

              <div class="field-block">
                <label class="field-label">CONFIRM PASSWORD</label>
                <n-input
                  type="password"
                  placeholder="Re-type password"
                  v-model:value="forgotPasswordForm.password_confirmation"
                  clearable
                  :disabled="forgotPasswordLoading.resetPassword"
                  @keyup.enter="funcResetTelegramPassword"
                  class="forgot-input"
                />
              </div>

              <div class="security-tip">
                <div class="security-tip-icon">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2" />
                  </svg>
                </div>
                <div>
                  <div class="security-tip-title">Security Tip</div>
                  <div class="security-tip-text">Use at least 8 characters with a mix of letters, numbers and symbols.</div>
                </div>
              </div>

              <div class="action-block">
                <n-button
                  type="default"
                  class="forgot-button forgot-button-neutral"
                  :loading="forgotPasswordLoading.resetPassword"
                  @click="funcResetTelegramPassword"
                >
                  Reset Password
                </n-button>
              </div>
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
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { getUser } from '@plugins/authentication'
import FooterComponent from '@components/footer/copy-right.vue'
import pkachan from '@assets/pkachan.png'

export default {
  name: 'ForgotPasswordTemplate',
  components: {
    FooterComponent
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const message = useMessage()

    const toggleForgotPasswordForm = ref(false)
    const showOtpField = ref(false)
    const showResetPasswordFields = ref(false)
    const otpVerified = ref(false)
    const resendCountdown = ref(0)

    let countdownTimer = null

    if (getUser() !== undefined && getUser() !== null) {
      router.push('/search')
    }

    const forgotPasswordForm = reactive({
      telegram_user_id: '',
      otp: '',
      password: '',
      password_confirmation: '',
      reset_token: '',
    })

    const forgotPasswordLoading = reactive({
      sendOtp: false,
      verifyOtp: false,
      resetPassword: false,
    })

    const currentStep = computed(() => {
      return otpVerified.value ? 2 : 1
    })

    const isOtpButtonDisabled = computed(() => {
      return forgotPasswordLoading.sendOtp || resendCountdown.value > 0
    })

    const otpButtonText = computed(() => {
      if (resendCountdown.value > 0) {
        return `Resend in ${resendCountdown.value}s`
      }

      return 'Get OTP'
    })

    function clearCountdown() {
      if (countdownTimer !== null) {
        clearInterval(countdownTimer)
        countdownTimer = null
      }
    }

    function startOtpCountdown() {
      clearCountdown()
      resendCountdown.value = 60

      countdownTimer = setInterval(() => {
        if (resendCountdown.value > 0) {
          resendCountdown.value -= 1
          return
        }

        clearCountdown()
      }, 1000)
    }

    function resetForgotPasswordState() {
      clearCountdown()
      showOtpField.value = false
      showResetPasswordFields.value = false
      otpVerified.value = false
      resendCountdown.value = 0
      forgotPasswordForm.telegram_user_id = ''
      forgotPasswordForm.otp = ''
      forgotPasswordForm.password = ''
      forgotPasswordForm.password_confirmation = ''
      forgotPasswordForm.reset_token = ''
    }

    function getErrorMessage(err, fallbackMessage) {
      if (err?.response?.data?.message) {
        return err.response.data.message
      }

      return fallbackMessage
    }

    function funcChangeTelegramUserId() {
      showOtpField.value = false
      forgotPasswordForm.otp = ''
      forgotPasswordForm.reset_token = ''
      clearCountdown()
      resendCountdown.value = 0
    }

    function funcSendTelegramOtp() {
      if (forgotPasswordForm.telegram_user_id == '' || forgotPasswordForm.telegram_user_id == null) {
        message.warning('Please fill username_id first.')
        return false
      }

      forgotPasswordLoading.sendOtp = true
      store.dispatch('user/telegramPasswordForgotSendOtp', {
        telegram_user_id: forgotPasswordForm.telegram_user_id
      }).then((res) => {
        message.success(res.data.message || 'OTP sent successfully.')
        showOtpField.value = true
        showResetPasswordFields.value = false
        otpVerified.value = false
        forgotPasswordForm.otp = ''
        forgotPasswordForm.password = ''
        forgotPasswordForm.password_confirmation = ''
        forgotPasswordForm.reset_token = ''
        startOtpCountdown()
      }).catch((err) => {
        message.error(getErrorMessage(err, 'Unable to send OTP.'))
      }).finally(() => {
        forgotPasswordLoading.sendOtp = false
      })
    }

    function funcVerifyTelegramOtp() {
      if (forgotPasswordForm.telegram_user_id == '' || forgotPasswordForm.telegram_user_id == null) {
        message.warning('Please fill username_id first.')
        return false
      }

      if (forgotPasswordForm.otp == '' || forgotPasswordForm.otp == null) {
        message.warning('Please fill OTP.')
        return false
      }

      forgotPasswordLoading.verifyOtp = true
      store.dispatch('user/telegramPasswordForgotVerifyOtp', {
        telegram_user_id: forgotPasswordForm.telegram_user_id,
        otp: forgotPasswordForm.otp
      }).then((res) => {
        forgotPasswordForm.reset_token = res.data.reset_token || ''
        otpVerified.value = true
        showResetPasswordFields.value = true
        showOtpField.value = false
        clearCountdown()
        resendCountdown.value = 0
        message.success(res.data.message || 'OTP verified successfully.')
      }).catch((err) => {
        message.error(getErrorMessage(err, 'Unable to verify OTP.'))
      }).finally(() => {
        forgotPasswordLoading.verifyOtp = false
      })
    }

    function funcResetTelegramPassword() {
      if (forgotPasswordForm.reset_token == '' || forgotPasswordForm.reset_token == null) {
        message.warning('Please confirm OTP first.')
        return false
      }

      if (forgotPasswordForm.password == '' || forgotPasswordForm.password == null) {
        message.warning('Please fill new password.')
        return false
      }

      if (forgotPasswordForm.password_confirmation == '' || forgotPasswordForm.password_confirmation == null) {
        message.warning('Please confirm new password.')
        return false
      }

      if (forgotPasswordForm.password !== forgotPasswordForm.password_confirmation) {
        message.warning('Password confirmation does not match.')
        return false
      }

      forgotPasswordLoading.resetPassword = true
      store.dispatch('user/telegramPasswordForgotReset', {
        reset_token: forgotPasswordForm.reset_token,
        password: forgotPasswordForm.password,
        password_confirmation: forgotPasswordForm.password_confirmation
      }).then((res) => {
        message.success(res.data.message || 'Password reset successfully.')
        resetForgotPasswordState()
        router.push('/login')
      }).catch((err) => {
        message.error(getErrorMessage(err, 'Unable to reset password.'))
      }).finally(() => {
        forgotPasswordLoading.resetPassword = false
      })
    }

    onMounted(() => {
      setTimeout(() => {
        toggleForgotPasswordForm.value = true
      }, 200)
    })

    onBeforeUnmount(() => {
      clearCountdown()
    })

    return {
      currentStep,
      forgotPasswordForm,
      forgotPasswordLoading,
      funcChangeTelegramUserId,
      funcResetTelegramPassword,
      funcSendTelegramOtp,
      funcVerifyTelegramOtp,
      isOtpButtonDisabled,
      otpButtonText,
      otpVerified,
      pkachan,
      resendCountdown,
      router,
      showOtpField,
      showResetPasswordFields,
      store,
      toggleForgotPasswordForm,
    }
  }
}
</script>

<style scoped>
.forgot-page {
  min-height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.forgot-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 1rem 6rem;
}

.forgot-card {
  width: min(100%, 430px);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
  padding: 1.5rem 1.25rem 2rem;
}

.forgot-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.icon-button {
  width: 2.25rem;
  height: 2.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
}

.progress-indicator {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.progress-segment {
  width: 1.7rem;
  height: 0.34rem;
  border-radius: 999px;
  background: #e2e8f0;
}

.progress-segment-active {
  background: #0f172a;
}

.logo-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 0.9rem;
}

.logo-box {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: #0f172a;
  padding: 0.75rem;
  box-shadow: 0 12px 20px rgba(15, 23, 42, 0.18);
}

.company-wrap {
  text-align: center;
  margin-bottom: 1.5rem;
}

.company-name {
  color: #d97706;
  margin-bottom: 0.35rem;
}

.company-system {
  color: #64748b;
  font-size: 0.78rem;
  line-height: 1.45;
}

.hero-block {
  margin-bottom: 1.4rem;
}

.hero-title {
  color: #0f172a;
  font-size: 2rem;
  line-height: 1.15;
  font-weight: 700;
  margin: 0 0 0.45rem;
}

.hero-description {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.55;
  margin: 0;
}

.field-block {
  margin-bottom: 1rem;
}

.field-label {
  display: block;
  color: #94a3b8;
  font-size: 0.85rem;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-bottom: 0.55rem;
}

.forgot-input :deep(.n-input-wrapper) {
  min-height: 48px;
  border-radius: 14px;
  background: #f8fafc;
  box-shadow: none;
}

.readonly-row {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #f8fafc;
  padding: 0 1rem;
}

.readonly-value {
  color: #64748b;
  font-size: 0.95rem;
}

.change-link {
  color: #94a3b8;
  font-size: 0.85rem;
  font-weight: 600;
}

.action-block {
  margin-top: 0.4rem;
}

.forgot-button {
  width: 100%;
  height: 50px;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 700;
}

.forgot-button-neutral {
  background: #9499a5;
  color: #ffffff;
  border-color: #9499a5;
}

.forgot-button-neutral:not(.n-button--disabled):hover {
  background: #7f8692;
  border-color: #7f8692;
  color: #ffffff;
}

.resend-block {
  margin-top: 0.9rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.85rem;
}

.resend-link {
  color: #94a3b8;
  font-weight: 600;
}

.security-tip {
  display: flex;
  gap: 0.85rem;
  border-radius: 16px;
  background: #eaf2ff;
  color: #2563eb;
  padding: 1rem;
  margin: 0.5rem 0 1rem;
}

.security-tip-icon {
  flex: 0 0 auto;
}

.security-tip-title {
  font-size: 0.96rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.security-tip-text {
  font-size: 0.88rem;
  line-height: 1.5;
}

@media (max-width: 480px) {
  .forgot-card {
    padding: 1.15rem 1rem 1.5rem;
    border-radius: 24px;
  }

  .hero-title {
    font-size: 1.75rem;
  }
}
</style>
