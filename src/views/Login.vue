<template>
    <el-card class="login-card">
        <h2>登录</h2>
        <el-form @submit.prevent="handleLogin">
            <el-form-item>
                <el-input v-model="form.username" placeholder="用户名" />
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.password" type="password" placeholder="密码" />
            </el-form-item>
            <el-button type="primary" native-type="submit" style="width: 100%">
                登录
            </el-button>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({ username: '', password: '' })

const handleLogin = () => {
    console.log('登录', form)
}
</script>

<style scoped>
.login-card {
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
}
</style>