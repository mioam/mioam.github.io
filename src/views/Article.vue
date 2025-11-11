<template>
    <div class="common-layout">
        <div class="header">
            <el-page-header :icon="ArrowLeft" @back="back">
                <template #content>
                    <AutoBreadcrumb />
                </template>
            </el-page-header>
        </div>

        <div class="main">
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import { Expand, Fold, Edit, ArrowLeft } from '@element-plus/icons-vue'

import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// 侧边栏开关
const isCollapse = ref(false)

import gfm from '@bytemd/plugin-gfm'
import { Editor, Viewer } from '@bytemd/vue-next'
import 'bytemd/dist/index.css'

import { getPost } from '@/api/post'
import AutoBreadcrumb from '@/components/AutoBreadcrumb.vue'

const plugins = [
    gfm(),
    // Add more plugins here
]
const route = useRoute()
const router = useRouter()

const back = () => {
    const segments = route.path.split('/').filter(Boolean)
    segments.pop()
    router.push('/' + segments.join('/') || '/')
}

</script>

<style lang="css" scoped>
.main {
    /* background-color: #646; */
    max-width: 1280px;
    padding: 1rem;
    margin: 0 auto;
}

.header {
    /* background-color: #b2e5ff; */
    padding: 0.5rem;
    /* height: 4rem; */
    display: flex;
    justify-content: center;

    overflow: hidden;
}

.header div {
    /* display: flex; */
    overflow: hidden;
    width: 100vw;
    max-width: 1280px;

}
</style>