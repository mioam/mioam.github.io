<script setup lang="ts">
import { ref } from 'vue'


</script>

<template>
  <div class="hero-container">

    <el-card style="width: 30rem; text-align: center;">
      <template #header>
        <h1>mioam's blog</h1>
      </template>
      <el-space alignment="center" direction="horizontal" size="small" warp>
        <el-button style="font-size: 1.5rem;" type="primary" @click="$router.push('/article')" link>article</el-button>
        <!-- <el-button style="font-size: 1.5rem;" type="primary" @click="$router.push('/article')" link>article</el-button> -->
      </el-space>
    </el-card>
  </div>
</template>

<style scoped>
.hero-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>