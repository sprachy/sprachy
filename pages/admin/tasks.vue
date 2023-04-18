<script setup lang="ts">
const tasks = await api.getTasks()
</script>

<template>
  <div class="container">
    <div class="mt-4">Showing {{ tasks.length }} tasks</div>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Question (de)</th>
          <th>Question (en)</th>
          <th>Answer (de)</th>
          <th>Answer (en)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks">
          <td>{{ task.id }}</td>
          <td>{{ task.questionDe }}</td>
          <td>{{ task.questionEn }}</td>
          <td>{{ task.answerDe }}</td>
          <td>{{ task.answerEn }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>