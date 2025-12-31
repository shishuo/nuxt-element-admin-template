<template>
  <div class="school-admin">
    <div class="menu">
      <div class="left-slider-menu">
        <div class="school-logo">
          <div class="popover-img">
            <el-popover
                placement="bottom-start"
                popper-class="versions-popover"
                trigger="hover"
                width="288"
            >
              <div class="versions-card">
                <div>学校编号：{{ schoolDetail.schoolId }}</div>
                <div>学校名称：{{ schoolDetail.name }}</div>
                <div>学校类型：{{ schoolDetail.kind.desc }}</div>
                <div class="display_flex">
                  认证状态：
                  <a @click="goVerify">{{ schoolDetail.verify?.desc }}</a>
                </div>
                <div class="card-path">
                  <a
                      :href="`https://shop${schoolDetail.schoolId}.mp.${dev}/index.htm`"
                      target="_blank"
                  >访问微官网</a>
                  <a href="https://www.shishuo.com" target="_blank">师说首页</a>
                </div>
              </div>
              <img
                  slot="reference"
                  :src="supportSchool.logo"
                  :style="{ filter:(schoolDetail.verify?.name == 'success' ? '' : 'grayscale(1)')}"
              />
            </el-popover>
          </div>
          <a class="version-logo" to="/admin/setting/system/verify/init" @click="goVerify">
            <i
                :class="schoolDetail.verify?.name == 'success' ? 'color-gold1' : ''"
                class="iconfont icon-fill-verify"
            ></i>
          </a>
        </div>
        <div class="slider-main">
          <div class="menu-list">
            <div
                v-for="menu in sideMenuList.fatherList"
                :class="sideMenuActive.fatherActive === menu.code ? 'is-active' : ''"
            >
              <el-popover
                  v-model="showPopover[menu.code]"
                  :close-delay="0"
                  :disabled="!menu.url && !menu.code"
                  placement="right-start"
                  popper-class="child-menu-popover"
                  trigger="hover"
              >
                <div class="child-menu-list">
                  <div class="menu-name">{{ menu.name }}</div>
                  <ul>
                    <template v-for="sonMenu in menu.menuList">
                      <li
                          v-if="showTitle(sonMenu)"
                          :data-son-menu-id="sonMenu.code"
                          class="two-layout-slider-item"
                      >
                        <nuxt-link
                            v-if="sonMenu.vue"
                            :class="sideMenuActive.sonActive == sonMenu.code ? 'active' : ''"
                            :to="sonMenu.url"
                            class="title"
                            @click.native="addUseMenu(sonMenu)"
                        >{{ sonMenu.name }}
                        </nuxt-link>
                      </li>
                    </template>
                  </ul>
                </div>
                <div v-if="menu.code === 'oa'" slot="reference">
                  <nuxt-link
                      class="menu-item"
                      to="/admin/office/home"
                      @click.native="addUseMenu(menu.menuList[0])"
                  >
                    <i v-if="menu.icon" :class="'icon-line-' + menu.code" class="logo iconfont"></i>
                    <div class="name">{{ menu.name }}</div>
                  </nuxt-link>
                </div>
                <div v-else-if="menu.code === 'support'" slot="reference"></div>
                <div v-else-if="menu.code === 'market'" slot="reference">
                  <nuxt-link
                      :to="menu.url"
                      class="menu-item"
                      @click.native="addUseMenu(menu.menuList[0])"
                  >
                    <img alt class="logo" src="../assets/img/admin/office/oa/icon_market.svg"/>
                    <div class="name">{{ menu.name }}</div>
                  </nuxt-link>
                </div>
                <div v-else-if="menu.url" slot="reference">
                  <nuxt-link
                      :to="menu.url"
                      class="menu-item"
                      @click.native="addUseMenu(menu.menuList[0])"
                  >
                    <i v-if="menu.icon" :class="'icon-line-' + menu.code" class="logo iconfont"></i>
                    <div class="name">{{ menu.name }}</div>
                  </nuxt-link>
                </div>
                <!--                      <div v-else class="menu-line"></div>-->
                <div v-else slot="reference" class="menu-line"></div>
              </el-popover>
            </div>
          </div>
          <div class="bottom">
            <el-popover
                :close-delay="0"
                placement="right-start"
                popper-class="menu-popover"
                trigger="hover"
                width="120"
            >
              <div class="child-menu-list">
                <nuxt-link class="child-menu-item bottom-menu" to="/admin/support/basic">
                  <i class="iconfont icon-line-support"></i>
                  <div>师说服务</div>
                </nuxt-link>
                <a
                    :href="'https://www.' + navigate"
                    class="child-menu-item bottom-menu"
                    target="_blank"
                >
                  <i class="iconfont icon-line-grid"></i>
                  <div>师说官网</div>
                </a>
                <nuxt-link class="child-menu-item bottom-menu" to="/">
                  <i class="iconfont icon-line-text"></i>
                  <div>版本介绍</div>
                </nuxt-link>
              </div>
              <div slot="reference" class="about fw500 cursor-p">关于师说</div>
            </el-popover>

            <div class="version fs-12 mt8">版本：9.0</div>
          </div>
        </div>
      </div>
    </div>

    <!--    中间main部分-->
    <div id="main" class="main">
      <Header
          ref="header"
          :campus="campus"
          :menu-list="sideMenuList.fatherList"
          :school="supportSchool"
          class="ss-header"
          @onCampusChange="onCampusChange"
          @showHelp="showHelp"
      />
      <div class="left-slider-son-menu">
        <div class="menu-name">{{ menuName }}</div>
        <ul>
          <template v-for="sonMenu in sideMenuList.sonList">
            <li
                v-if="showTitle(sonMenu)"
                :data-son-menu-id="sonMenu.code"
                class="two-layout-slider-item"
            >
              <nuxt-link
                  v-if="sonMenu.vue"
                  :class="sideMenuActive.sonActive == sonMenu.code ? 'active' : ''"
                  :to="sonMenu.url"
                  class="title"
                  @click.native="addUseMenu(sonMenu)"
              >{{ sonMenu.name }}
              </nuxt-link>
            </li>
          </template>
        </ul>
      </div>
      <div class="ss-main">
        <nuxt-child class="main-main"/>

        <Footer v-if="showFooter"></Footer>

        <div class="right">
          <div class="ss-right-slider right-slider hiddenSlider">
            <div class="help">
              <span>{{ type === 'help' ? '帮助与客服' : '通知' }}</span>
              <i class="fs-24 el-icon-close cursor-p" @click="closeRightSlider"></i>
            </div>
            <div v-if="type === 'help'" class="help-body">
              <div class="server">
                <img alt src="../assets/img/kefushi.png"/>
                <div class="server-left">
                  <div class="name">AI智能客服小诗</div>
                  <div class="title">24小时在线</div>
                </div>
              </div>

              <div class="server-mobile">客服电话：0731-89601598</div>

              <el-input v-model="helpUrl" placeholder="搜索功能和帮助" size="medium" @change="getHelpList"></el-input>

              <div class="help-path">
                <a :href="'https://www.' + navigate + '/help/list'" target="_blank">帮助中心</a>
              </div>

              <div v-for="help in helpList" class="help-cell">
                <div class="fs-18 color-text2">{{ help.name }}</div>
                <div class="title fs-14">
                  <div class="content text-hidden-1 color-text3">{{ help.title }}</div>
                  <nuxt-link class="text-blue" to="/">立即添加</nuxt-link>
                </div>
              </div>
            </div>
            <div v-if="type === 'notice'" class="notice-body">
              <div v-if="notice in noticeList" class="notice-item fs-14 color-text2">
                <div class="notice-item-flex" style="margin-bottom: 6px;">
                  <div class="color-text1 fs-16">{{ notice.title }}</div>
                  <div>{{ notice.day }}</div>
                </div>
                <div class="notice-item-flex">
                  <div class="text-hidden">美术书法课美术书法课美术书法课美术书法课美术书法课</div>
                  <div class="color-brand1">未读</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  directives: {},
  head() {
    return {
      pageTitle: '师说教务管理系统'
    }
  },
  data() {
    return {
      dev: process.env.BASE_DOMAIN,
      schoolDetail: {
        kind: '',
      },
      activeIndex: '',
      showFooter: true,
      isShowHelp: true,
      type: 'help',
      isChangeCampus: false,
      showPopover: {
        oa: false,
      },
      campus: {
        campusId: 0,
        name: '暂无校区',
      },
      supportSchool: {
        expire7: false,
        expire: true,
        name: '测试',
        logo: '',
        verify: false,
      },
      // 导航父级标题名称
      menuName: '',
      menuListHover: {
        isShow: true,
        timer: 0,
      },
      // 侧边栏 导航列表
      sideMenuList: {
        fatherList: [],
        sonList: [],
      },
      sideMenuActive: {
        fatherActive: '',
        sonActive: '',
        hoverActive: '',
      },
      helpUrl: '',
      helpList: [
        // { name: '如何添加老师？', title: '方便配置老师的教学资源哦！' },
        // { name: '如何添加科目？', title: '快来定制你的专属科目,打造独特课...' },
        // { name: '如何进行排课？', title: '策划一份属于你的专属课程表吧,让...' },
        // { name: '如何添加学生？', title: '快速新增学生,打造专属学习圈！' },
        // { name: '如何添加班级？', title: '为系统添加学生们的班级吧！' },
        // { name: '如何进行消课？', title: '一键消课,轻松微调教学计划' },
      ],
      noticeList: [],
      navigate: process.env.BASE_DOMAIN,
    }
  },
  mounted() {
    this.getSchoolDetail()
    this.getSupportSchool()
    this.getMenuList()
    this.getNoticeList()
    this.getHelpList()
    // this.getStageList()
  },
  updated: function () {
    this.$nextTick(function () {
      // console.log('###########', this.$refs)
    })
  },
  watch: {
    type(val) {
      this.isShowHelp = !this.isShowHelp
    },
  },
  methods: {
    getSchoolDetail() {
      http.get('/admin/office/school/detail.json').then((res) => {
        this.schoolDetail = res
        console.log('schoolDetail', this.schoolDetail)
      })
    },
    getNoticeList() {
      http.get('/admin/office/notice.json').then((res) => {
        this.noticeList = res.notice
      })
    },
    getHelpList() {
      // this.$http
      //   .get('/admin/office/help/detail.json', {url: this.helpUrl})
      //   .then((res) => {
      //     this.helpList = res.help
      //   })
    },
    // getStageList() {
    //   this.$http.get('/admin/office/stage/list.json').then((res) => {
    //     let defaultStageId = ''
    //     if (res.length) {
    //       res.forEach((stage) => {
    //         if (stage.current) {
    //           defaultStageId = stage.stageId
    //         }
    //       })
    //       if(!defaultStageId){
    //         defaultStageId = res[0].stageId
    //       }
    //     }else{
    //       defaultStageId = ''
    //     }
    //     localStorage.setItem('stageList', JSON.stringify(res))
    //     localStorage.setItem('defaultStageId', defaultStageId)
    //   })
    // },
    onCampusChange() {
      this.getSupportSchool()
      this.getMenuList()
    },
    getMenuList() {
      http
          .get('/admin/office/menu/list.json')
          .then((res) => {
            this.sideMenuList.fatherList = res
            console.log('fatherList', this.sideMenuList.fatherList)
            for (let menu of this.sideMenuList.fatherList) {
              if (menu.code === this.sideMenuActive.fatherActive) {
                this.menuName = menu.name
                this.sideMenuList.sonList = menu.menuList
              }
            }
          })
          .catch((e) => {
            this.sideMenuList.fatherList = []
            this.sideMenuList.sonList = []
            this.menuName = ''
          })
    },
    getSupportSchool() {
      http
          .get('/admin/office/support/school/detail.json')
          .then((data) => {
            const obj = {}
            obj.schoolId = data.schoolId
            obj.schoolName = data.name
            obj.campusId = data.campusId
            obj.campusName = data.campusName
            localStorage.setItem('school', JSON.stringify(obj))
            this.supportSchool = data
            this.campus.campusId = data.campusId
            this.campus.name = data.campusName
          })
    },
    showTitle(sonMenu) {
      let show = false
      if (sonMenu.vue) {
        if (sonMenu.url) {
          show = true
        }
      }
      return show
    },
    addUseMenu({menuId, code}) {
      let index = code.indexOf('_')
      const codeKey = code.slice(0, index)
      if (this.sideMenuActive.sonActive !== code) {
        http.post('/admin/office/shortcut/add.json', {
          type: 'used',
          menuId,
        }).then((res) => {
          this.$refs.header.update()
          this.showPopover[codeKey] = false
        })
      }
    },
    showHelp(type) {
      this.type = type
      if (this.isShowHelp) {
        this.addShowClass()
      } else {
        this.removeShowClass()
      }
      this.isShowHelp = !this.isShowHelp
    },
    addShowClass() {
      document
          .querySelector('.ss-right-slider')
          .classList.remove('hiddenSlider')
      document
          .querySelector('.ss-header')
          .classList.remove('helpCloseHeaderClass')
      document.querySelector('.ss-main').classList.remove('helpCloseMainClass')
      document
          .querySelector('.ss-right-slider')
          .classList.add('showClassSlider')
      document.querySelector('.ss-header').classList.add('helpShowHeaderClass')
      document.querySelector('.ss-main').classList.add('helpShowMainClass')
    },
    removeShowClass() {
      document.querySelector('.ss-right-slider').classList.add('hiddenSlider')
      document.querySelector('.ss-header').classList.add('helpCloseHeaderClass')
      document.querySelector('.ss-main').classList.add('helpCloseMainClass')
    },
    closeRightSlider() {
      this.isShowHelp = true
      this.removeShowClass()
    },
    selectMenuActive(fatherCode, code, showFooter) {
      this.activeIndex = code
      this.showFooter = showFooter === false ? false : true
      this.sideMenuActive.fatherActive = fatherCode
      this.sideMenuActive.sonActive = code.toString()
      console.log('asd')
      console.log('fatherCode', fatherCode)
      console.log('code', code)
      console.log(this.sideMenuList.fatherList[0]?.code, fatherCode)
      for (let menu of this.sideMenuList.fatherList) {
        if (menu.code == fatherCode) {
          this.menuName = menu.name
          this.sideMenuList.sonList = menu.menuList
        }
      }
    },
    changeLang(type) {
      this.$i18n.locale = type
    },
    goVerify() {
      if (this.schoolDetail.verify.name === 'success') {
        this.$router.push('/admin/setting/system/verify/detail')
      } else {
        this.$router.push('/admin/setting/system/verify/init')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './admin.scss';
</style>

<style lang="scss">
.child-menu-popover {
  background: transparent;
  box-shadow: none;

  .popper__arrow {
    display: none;
  }

  .child-menu-list {
    background: #f7f7f9;
    width: 120px;
    overflow: auto;
    height: calc(100vh - 76px);
    position: fixed;
    left: 108px;
    top: 76px;
    padding: 0 6px;

    &::after {
      content: '';
      background: url('assets/img/side/chamfer.png');
      background-size: 24px 24px;
      position: absolute;
      width: 24px;
      height: 24px;
      top: 0;
      left: 0;
      z-index: 1001;
    }

    .menu-name {
      font-size: 23px;
      color: #3d3d3d;
      padding: 24px 0 16px;
      text-align: center;
      line-height: 32px;
    }

    //第二个侧边栏里面每个li的高度
    .two-layout-slider-item {
      margin-bottom: 4px;

      .title {
        display: block;
        color: #666666;
        text-decoration: none;
        padding: 10px 0 10px 26px;
        line-height: 20px;
        border-radius: 8px;
        font-weight: 500;
      }

      .title:hover {
        background: #e6eefa;
        color: #666;
      }

      /*三级侧边栏选中后加这个类*/

      .active {
        background: #e6eefa;
        color: var(--brand-1) !important;
      }
    }

    .two-layout-slider-item:hover {
      a {
        color: #1774ff;
      }
    }
  }
}

.menu-popover {
  padding: 13px 8px;
  border-radius: 8px;
  border: none;
  margin-left: 9px !important;
  box-shadow: var(--shadow-popover);

  .child-menu-list {
    .child-menu-item {
      display: block;
      color: var(--text-3);
      border-radius: 8px;
      padding: 9px 0 9px 24px;

      &:hover {
        color: var(--brand-1);
        background-color: var(--brand-6);
      }
    }

    .bottom-menu {
      display: flex;
      align-items: center;
      padding-left: 12px;

      i {
        margin-right: 8px;
      }
    }
  }
}

.notice-body {
  padding: 16px;

  .notice-item {
    padding: 16px 12px;
    background: var(--brand-6);
    border-radius: 12px;

    .notice-item-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .text-hidden {
        width: 50%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
