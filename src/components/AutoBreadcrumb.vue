<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 自动生成面包屑数据
const breadcrumbs = computed(() => {
    console.log(route.matched)
    return route.matched
        .filter(item => item.meta?.breadcrumb)
        .map(item => {
            const breadcrumb = item.meta.breadcrumb
            const title = typeof breadcrumb === 'function'
                ? breadcrumb(route)
                : breadcrumb

            return {
                path: item.path,
                title,
                isClickable: item.path !== route.path
            }
        })
})
</script>

<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, _) in breadcrumbs" :key="item.path"
            :to="item.isClickable ? { path: item.path } : undefined">
            {{ item.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>