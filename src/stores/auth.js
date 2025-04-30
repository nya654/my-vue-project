import {defineStore} from 'pinia'
import axios from 'axios';
import {ref} from 'vue';

export const useAuthStore = defineStore(
  'auth',
  () => {
  //首先我要实现什么呢 1.检查登陆状态的函数
  //   2.实现登陆的函数
  //   3.实现登出状态的函数
    const user = ref(null)
    const isLoading = ref(false)
    const error = ref(null)
    const initialize = async () => {
      try{
        //需要从后端获取他的sessionID是否有效
        const response = await axios.get("https://localhost:8000/api/init")
        user.value = response.data

      }catch (error){
        //获取失败可能是会话不存在 可以直接强制清除cookie
        user.value = null
        document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      }
    }

    initialize()


     const login =  async (credentials) => {
        try {
          const response = await axios.post('http://localhost:8000/api/login', credentials)
          alert(response.data.message)
        }catch(error){
          if (error.response) {
            // 后端返回了 HTTP 错误状态码 (4xx/5xx)
            const { status, data } = error.response;

            if (status === 401) {
              // 处理认证错误
              alert(data.detail.message || data.detail);
            } else {
              // 其他错误
              alert(`请求失败: ${status}`);
            }
          } else {
            // 网络错误或请求未发送
            alert('网络连接失败');
          }
        }
      }
      const logout = () => {
        try{
          const response = axios.post("http://localhost:8000/api/logout")
          document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
          return true
        }catch (error){
          console.error('Logout error:', error)
          return false
        }
      }
      return{logout,login,user,isLoading,error}
}
)