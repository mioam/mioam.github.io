<template>
  <div class="full">
    <!-- <p><strong>Current route path:</strong> {{ $route.fullPath }}</p>
    <nav>
      <RouterLink to="/">Go to Home</RouterLink>
      <RouterLink to="/login">Go to login</RouterLink>
      <RouterLink to="/article">Go to article</RouterLink>
    </nav> -->
    <el-config-provider>
      <RouterView />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus'


</script>

<style lang="css" scoped>
.full {
  width: 100vw;
  max-width: 100%;
  min-height: 100vh;
}
</style>