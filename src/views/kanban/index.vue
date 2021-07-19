<template>
  <div class="kanban-container board">
    <!-- list数据源 group分组 分组内可以互相拖拽 -->
    <drag-kanban :list="list1" :group="group" class="kanban todo" header-text="Todo" />
    <drag-kanban :list="list2" :group="group" class="kanban working" header-text="Working" />
    <drag-kanban :list="list3" :group="group" class="kanban done" header-text="Done" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DragKanban from '@/components/DragKanban.vue'

export default defineComponent({
    name: 'Kanban',
    components: {
        DragKanban
    },
    data() {
        return {
            group: 'mission',
            list1: [
                { name: 'Mission', id: 1 },
                { name: 'Mission', id: 2 },
                { name: 'Mission', id: 3 },
                { name: 'Mission', id: 4 }
            ],
            list2: [
                { name: 'Mission', id: 5 },
                { name: 'Mission', id: 6 },
                { name: 'Mission', id: 7 }
            ],
            list3: [
                { name: 'Mission', id: 8 },
                { name: 'Mission', id: 9 },
                { name: 'Mission', id: 10 }
            ]
        }
    }
})
</script>

<style lang="scss">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>
