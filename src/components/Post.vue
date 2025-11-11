<template>

    <el-card>
        <template #header>
            <div class="card-header" style="display: flex;justify-content: space-between">
                <h1 style="margin: 0;">这是一个标题</h1>

                <el-button type="" :icon="Edit" link />
            </div>
        </template>

        <Viewer :value="value" :plugins="plugins" @change="handleChange" />

        <template #footer>
            <div class="card-footer">
                footer
            </div>
        </template>
    </el-card>


</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPost } from '@/api/post'
import { Editor, Viewer } from '@bytemd/vue-next'

const value = ref('')
const route = useRoute();

onMounted(async () => {
    const res = await getPost(`${route.params.id}.md`)
    value.value = res
})

const handleChange = (v) => {
    value.value = v
}
</script>