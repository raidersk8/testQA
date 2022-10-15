<template>
	<div>{{question}}</div>
	<input type="text" v-model="answer" @keyup.enter="handleKeyUpEnter">
	<div>кол-во вопросов {{ countQuestions }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	props: {
		list: {
			type: Array as () => QA[],
			default: () => [],
		},
	},

	data(): {
		answer: string,
		question: string,
		correctAnswer: string,
		localList: QA[],
		maxCountError: number,
		countError: number,
	} {
		return {
			answer: '' as string, // Ответ пользователя
			question: '' as string, // Вопрос
			correctAnswer: '' as string, // Правильный ответ
			localList: JSON.parse(JSON.stringify(this.list)) as QA[], // Список вопросов
			maxCountError: 2, // Максимальное число ошибок на один ответ
			countError: 0, // Кол-во ошибок за один ответ
		};
	},

	created(): void {
		this.nextQuestion();
	},

	computed: {
		/**
		 * Счетчик кол-во вопросов
		 */
		countQuestions(): number {
			return this.localList.length + 1;
		}
	},

	methods: {
		/**
		 * Обработка отправки ответа
		 */
		handleKeyUpEnter(): void {
			if (this.isCompare(this.correctAnswer.split('|'), this.answer.split('|'))) {
				if (this.localList.length > 0) {
					alert('верно');
					this.nextQuestion();
				} else {
					alert('все');
					this.$emit('finish');
				}
			} else {
				alert('ошибка');
				this.countError++;
				if (this.countError >= this.maxCountError) {
					alert(this.correctAnswer);
					this.addQA();
					this.nextQuestion();
				}
			}
		},

		/**
		 * Переходим к следующему вопросу
		 */
		nextQuestion(): void {
			this.countError = 0;
			this.answer = '';
			let removeIndex: number = Math.floor(Math.random() * this.localList.length);
			let removeElements: QA[] = this.localList.splice(removeIndex, 1);
			if (removeElements.length > 0) {
				this.question = removeElements[0].question;
				this.correctAnswer = removeElements[0].answer;
			}
		},

		/**
		 * Добавляем 2 вопроса
		 */
		addQA(): void {
			let addQAItem: QA = {
				question: this.question,
				answer: this.correctAnswer,
			}
			this.localList.push(addQAItem, addQAItem);
		},

		/**
		 * Сравниваем массивы ответов, для случаев когда ответов больше двух
		 */
		isCompare(arr1: string[], arr2: string[]): boolean {
			if (arr1.length != arr2.length) {
				return false;
			}
			for(let i=0; i<arr1.length; i++) {
				if (arr2.indexOf(arr1[i]) === -1) {
					return false;
				}
			}
			return true;
		},
	},
});
</script>
