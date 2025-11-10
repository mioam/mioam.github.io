<script setup lang="ts">


</script>

<template>
    <div class="hero-container">
        <el-row justify="center" class="hero-content">
            <el-col class="text-center">
                <h1 class="hero-title">
                    欢迎来到 MySite
                </h1>
                <p class="hero-subtitle">
                    ~
                </p>
                <el-space size="large" wrap>
                    <el-button type="primary" size="large" @click="$router.push('/blog')">
                        blog
                    </el-button>
                </el-space>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.hero-container {
    /* min-height: 70vh; */
    padding: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>