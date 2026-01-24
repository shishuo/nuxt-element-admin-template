<script setup>
import { ref, computed } from "vue";
import {
  QrCode,
  MonitorSmartphone,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-vue-next";

const loginMode = ref("qr");
const authType = ref("sms");
const phone = ref("");
const code = ref("");
const password = ref("");
const agreed = ref(false);
const autoLogin = ref(false);
const showPassword = ref(false);
const bannerImg =
  "https://img.yzcdn.cn/upload_files/2025/11/27/FnrCt_V-WYl3FTUJ0X7ogHPX2dEo.png";

const toggleMode = () => {
  loginMode.value = loginMode.value === "qr" ? "form" : "qr";
};

const switchTab = (type) => {
  authType.value = type;
};

const handleLogin = () => {
  if (!agreed.value) {
    alert("请先阅读并同意用户协议");
    return;
  }
  console.log("Login with:", {
    mode: loginMode.value,
    type: authType.value,
    phone: phone.value,
    code: code.value,
    password: password.value,
  });
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const isFormValid = computed(() => {
  if (loginMode.value === "qr") return true;
  if (!agreed.value) return false;

  if (authType.value === "sms") {
    return phone.value.length > 0 && code.value.length > 0;
  } else {
    return phone.value.length > 0 && password.value.length > 0;
  }
});
</script>

<template>
  <div class="login-page">
    <header class="header">
      <div class="logo">
        <span class="logo-icon">👍</span>
        <span class="logo-text">师说</span>
      </div>
    </header>

    <main class="main-container">
      <div class="login-card">
        <div class="login-box">
          <div class="corner-switch" @click="toggleMode">
            <div class="switch-tooltip" v-if="loginMode === 'form'">
              扫码登录更便捷
              <div class="tooltip-arrow"></div>
            </div>
            <div class="switch-icon-wrapper">
              <MonitorSmartphone
                v-if="loginMode === 'qr'"
                class="switch-icon"
              />
              <QrCode v-else class="switch-icon" />
            </div>
            <div class="corner-bg"></div>
          </div>

          <div v-if="loginMode === 'qr'" class="qr-view">
            <h2 class="view-title">扫码登录</h2>

            <div class="qr-wrapper">
              <div class="qr-placeholder">
                <div class="qr-code-img"></div>
              </div>
            </div>

            <div class="qr-instruction">
              打开支付宝或微信扫一扫登录
              <span class="badge"><ShieldCheck :size="12" /> 隐私保护中</span>
            </div>

            <div class="other-methods">
              <span class="divider-text">其他登录方式</span>
              <div class="method-icons">
                <div class="icon-btn alipay">支</div>
                <div class="icon-btn wechat">微</div>
                <div class="icon-btn code">密</div>
                <div class="icon-btn more">...</div>
              </div>
            </div>
          </div>

          <div v-else class="form-view">
            <div class="form-tabs">
              <div
                class="tab-item"
                :class="{ active: authType === 'sms' }"
                @click="switchTab('sms')"
              >
                验证码登录
              </div>
              <div
                class="tab-item"
                :class="{ active: authType === 'password' }"
                @click="switchTab('password')"
              >
                密码登录
              </div>
            </div>

            <div v-if="authType === 'sms'" class="form-content">
              <div class="input-group">
                <div class="country-select">
                  <span>中国 +86</span>
                  <span class="arrow">▼</span>
                </div>
                <input
                  type="text"
                  v-model="phone"
                  placeholder="请输入手机号"
                  class="input-field"
                />
                <div class="privacy-badge">
                  <ShieldCheck :size="12" /> 隐私保护中
                </div>
              </div>

              <div class="input-group">
                <input
                  type="text"
                  v-model="code"
                  placeholder="输入短信验证码"
                  class="input-field"
                />
                <button class="get-code-btn">获取验证码</button>
              </div>
            </div>

            <div v-if="authType === 'password'" class="form-content">
              <div class="input-group">
                <div class="country-select">
                  <span>中国 +86</span>
                  <span class="arrow">▼</span>
                </div>
                <input
                  type="text"
                  v-model="phone"
                  placeholder="请输入手机号"
                  class="input-field"
                />
                <div class="privacy-badge">
                  <ShieldCheck :size="12" /> 隐私保护中
                </div>
              </div>

              <div class="input-group">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="输入登录密码"
                  class="input-field"
                />
                <button class="icon-action" @click="togglePasswordVisibility">
                  <Eye v-if="showPassword" :size="18" />
                  <EyeOff v-else :size="18" />
                </button>
                <button class="forgot-btn">忘记密码</button>
              </div>
            </div>

            <div class="form-footer">
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="autoLogin" />
                  <span>3天内自动登录</span>
                </label>
              </div>
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="agreed" />
                  <span
                    >阅读并同意<a href="#">用户协议</a>、<a href="#"
                      >隐私声明</a
                    ></span
                  >
                </label>
              </div>

              <button
                class="submit-btn"
                :class="{ active: isFormValid }"
                @click="handleLogin"
              >
                登录
              </button>
            </div>
          </div>

          <div class="register-link" v-if="loginMode === 'form'"></div>
        </div>

        <div class="ad-box">
          <img :src="bannerImg" class="ad-image" alt="Advertisement" />
        </div>
      </div>

      <div class="bottom-text">没有账号，<a href="#">免费注册</a></div>
    </main>

    <footer class="footer">© 2012 - 2026 Youzan.com</footer>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.login-page {
  min-height: 100vh;
  background-color: #f7f8fa;
  display: flex;
  flex-direction: column;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, sans-serif;
}

.header {
  height: 60px;
  padding: 0 40px;
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.logo-icon {
  color: #ee0000;
  font-size: 24px;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  display: flex;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  width: 880px;
  height: 480px;
  margin-bottom: 20px;
}

.login-box {
  flex: 1;
  position: relative;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.corner-switch {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 10;
}

.switch-tooltip {
  position: absolute;
  right: 45px;
  top: 5px;
  background: #3c8ce7;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
}

.tooltip-arrow {
  position: absolute;
  right: -4px;
  top: 50%;
  margin-top: -4px;
  border-left: 4px solid #3c8ce7;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}

.switch-icon-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  color: #999;
}

.qr-view {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.view-title {
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin-bottom: 30px;
}

.qr-wrapper {
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
}

.qr-placeholder {
  width: 160px;
  height: 160px;
  border: 1px solid #eee;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-code-img {
  width: 140px;
  height: 140px;
  background-color: #f0f0f0;
}

.qr-instruction {
  font-size: 14px;
  color: #666;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}

.badge {
  background: #fef0f0;
  color: #ee0000;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.other-methods {
  width: 100%;
  border-top: 1px solid #eee;
  position: relative;
  margin-top: 20px;
  padding-top: 20px;
}

.divider-text {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 0 10px;
  font-size: 12px;
  color: #999;
}

.method-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.icon-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  cursor: pointer;
}

.icon-btn.alipay {
  background: #1677ff;
}
.icon-btn.wechat {
  background: #07c160;
}
.icon-btn.code {
  background: #3c8ce7;
}
.icon-btn.more {
  background: #ee0000;
}

.form-view {
  width: 100%;
  max-width: 320px;
}

.form-tabs {
  display: flex;
  margin-bottom: 30px;
}

.tab-item {
  font-size: 18px;
  color: #666;
  margin-right: 20px;
  cursor: pointer;
  padding-bottom: 8px;
  border-bottom: 2px solid transparent;
}

.tab-item.active {
  color: #333;
  font-weight: 600;
  border-bottom-color: #333;
}

.input-group {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
  margin-bottom: 20px;
  position: relative;
}

.country-select {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #333;
  margin-right: 10px;
  cursor: pointer;
}

.arrow {
  font-size: 10px;
  color: #999;
}

.input-field {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
}

.input-field::placeholder {
  color: #ccc;
}

.privacy-badge {
  background: #fef0f0;
  color: #ee0000;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 2px;
}

.get-code-btn {
  background: none;
  border: none;
  color: #3c8ce7;
  font-size: 14px;
  cursor: pointer;
}

.icon-action {
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  margin-right: 10px;
}

.forgot-btn {
  background: none;
  border: none;
  color: #3c8ce7;
  font-size: 14px;
  cursor: pointer;
  padding-left: 10px;
  border-left: 1px solid #eee;
}

.form-footer {
  margin-top: 10px;
}

.checkbox-group {
  margin-bottom: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
}

.checkbox-label a {
  color: #3c8ce7;
  text-decoration: none;
}

.submit-btn {
  width: 100%;
  height: 44px;
  background: #f5f5f5;
  color: #999;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s;
}

.submit-btn:hover {
  background: #eee;
}

.submit-btn.active {
  background: #ee0000;
  color: white;
}

.submit-btn.active:hover {
  background: #d00000;
}

.ad-box {
  width: 380px;
  background: #1a1a1a;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.ad-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bottom-text {
  margin-top: 20px;
  font-size: 14px;
  color: #999;
}

.bottom-text a {
  color: #3c8ce7;
  text-decoration: none;
}

.footer {
  text-align: center;
  padding: 20px;
  color: #ccc;
  font-size: 12px;
}
</style>
