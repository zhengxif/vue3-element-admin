<template>
  <div class="profile-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>关于我</span>
        </div>
      </template>
      <div class="profile" v-if="userInfo">
        <el-upload
          class="avatar-uploader"
          action="/dev-api/user/upload"
          :headers="uploadHeaders"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          accept="image/*"
        >
          <div class="avatar">
            <img class="avatar-img" :src="userAvatar" alt="头像" @error="loadError" />
            <div class="upload-icon">
              修改头像
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </div>
        </el-upload>
        <h2>用户名：{{ userInfo.username }}</h2>
        <h3>用户角色：{{ roleNames }}</h3>
        <div v-if="userInfo.description">
          <span>个人说明</span>
          <p>{{ userInfo.description }}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, getCurrentInstance } from 'vue'
import { useStore } from '@/store'
import defaultAvatar from '@/assets/logo.png'
import { ApiResponse } from '@/api/type'

export default defineComponent({
    name: 'Profile',
    setup() {
        const store = useStore()
        const { proxy } = getCurrentInstance()!
        const userInfo = computed(() => store.state.user.userInfo)
        const roleNames = computed(() => store.getters.roleNames.join(' '))
        const userAvatar = ref(defaultAvatar)

        const avatar = computed(() => userInfo?.value?.avatar || defaultAvatar)

        watch(avatar, value => {
            userAvatar.value = value
        }, {
            immediate: true
        })

        // 上传大小 格式限制
        const beforeAvatarUpload = (file: File) => {
            const isJPG = ['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isJPG) {
        proxy?.$message.error('上传头像图片只能是 JPG/PNG/SVG 格式!')
            }
            if (!isLt2M) {
        proxy?.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        }

        // 头像上传成功后回调
        const handleAvatarSuccess = (res: ApiResponse<{url: string}>) => {
            store.dispatch('user/getUserInfo')
            userAvatar.value = res.data.url
        }
        // 上传请求 headers携带token
        const token = computed(() => store.state.user.token)

        // 头像加载失败处理函数
        const loadError = () => {
            console.error('头像加载失败')
            userAvatar.value = defaultAvatar
        }

        const uploadHeaders = computed(() => {
            return {
                Authorization: `Bearer ${token.value}`
            }
        })
        return {
            userInfo,
            userAvatar,
            roleNames,
            uploadHeaders,
            loadError,
            beforeAvatarUpload,
            handleAvatarSuccess
        }
    }
})
</script>

<style lang="scss" scoped>
  .profile-container {
    width: 500px;
    margin: 10px auto;
    .profile {
      text-align: center;
      .avatar {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 10px auto;
        .upload-icon {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background-color: rgba(0, 0, 0, .4);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #f5f5f5c4;
          opacity: 0;
          &:hover {
            opacity: 1;
          }
          i {
            font-size: 30px;
          }
        }
        .avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
    }
  }
</style>
