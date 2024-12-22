<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <p class="text-bold">Configurações</p>
    </div>
    <div class="row q-col-gutter-md" style="border: 1px solid gray">
      <div class="col-md-2 col-xs-12">
        <q-select
          :label="$t('operation')"
          v-model="operation"
          :options="['+', '-', '*', '/']"
          outlined dense
        />
      </div>
      <div class="col-md-6 col-xs-12">
        <q-badge color="primary">
          Faixa de Valores: {{ limits.min }} to {{ limits.max }} (0 to 100)
        </q-badge>
        <q-range
          label
          v-model="limits"
          :min="0"
          :max="100"
          :step="10"
          markers
          :marker-labels="fnMarkerLabel"
        />
      </div>
    </div>
    <div class="row q-col-gutter-md q-mt-md">
      <div class="col-md-2 col-xs-12">
        <q-input
          :label="$t('expression')"
          :modelValue="`${number1} ${operation} ${number2}`"
          outlined dense
          readonly
        />
      </div>
    </div>
    <div class="row q-col-gutter-md q-mt-md">
      <div class="col-md-2 col-xs-12">
        <q-input
          :label="$t('result')"
          prefix="="
          v-model="result"
          @keyup.enter="validateOperation"
          inputmode="numeric"
          outlined dense
          autofocus
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { success, error } from 'src/assets/messages'
import { useMathStore } from 'src/stores/math-store'

const mathStore = useMathStore()

const operation = ref('+')
const limits = ref({
  min: 0,
  max: 10
})
const number1 = ref(null)
const number2 = ref(null)
const result = ref(null)
const startTime = ref(new Date())
const endTime = ref(new Date())

const fnMarkerLabel = val => `${val}`

const getRandomNumber = (minNumber = 0, maxNumber = 100) => {
  return Math.round(Math.random() * (maxNumber - minNumber)) + minNumber
}

const reloadValues = () => {
  number1.value = getRandomNumber(limits.value.min, limits.value.max)
  number2.value = getRandomNumber(limits.value.min, limits.value.max)
  result.value = null
  startTime.value = new Date()
}

const init = () => {
  reloadValues()
}

init()

const getCorrectResult = (number1, number2, operation) => {
  switch (operation) {
    case '+':
      return parseInt(number1) + parseInt(number2)
    case '-':
      return parseInt(number1) - parseInt(number2)
    case '*':
      return parseInt(number1) * parseInt(number2)
    case '/':
      return parseInt(number1) / parseInt(number2)
  }
}

const calculateScore = (timeTaken, maxTime = 10, baseScore = 100) => {
  // Calcula o fator de bonificação com base no tempo
  const timeFactor = Math.max(0, (maxTime - timeTaken) / maxTime)

  // Score final = baseScore + bonificação
  return Math.round(baseScore + baseScore * timeFactor)
}

const validateOperation = () => {
  endTime.value = new Date()
  const timeTaken = (endTime.value - startTime.value) / 1000
  const correctResult = getCorrectResult(number1.value, number2.value, operation.value)
  const isCorrect = parseInt(result.value) === correctResult
  console.log('Resultado: ', correctResult)
  if (isCorrect) {
    success('Acertou!')
    mathStore.addScore(calculateScore(timeTaken))
    mathStore.incrementCorrect()
  } else {
    error('Errou!')
    mathStore.incrementWrong()
  }
  reloadValues()
}
</script>
