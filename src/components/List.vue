<template>

    <el-card>
        <template #header>
            <div class="card-header" style="display: flex;justify-content: space-between">
                <h1 style="margin: 0;">这是一个标题</h1>

                <el-button type="" :icon="Edit" link />
            </div>
        </template>
        <li v-for="item in value" :key="item.id">
            <router-link :to="`/article/${item.split('.')[0]}`">{{ item }}</router-link>
        </li>
        <template #footer>
            <div class="card-footer">
                footer
            </div>
        </template>
    </el-card>


</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getList } from '@/api/post.ts'

const value = ref('')

onMounted(async () => {
    const res = await getList()
    value.value = res
})

</script>