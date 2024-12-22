<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{  $t('appName') }}
        </q-toolbar-title>

        <div>
          <strong>Score: </strong>{{ mathStore.getScore }}
          - <strong>Acertos:</strong> {{ mathStore.getCorrect }}
          - <strong>Erros:</strong> {{ mathStore.getWrong }}
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { useMathStore } from 'src/stores/math-store'
const mathStore = useMathStore()
</script>
