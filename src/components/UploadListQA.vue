<template>
	Загрузите файл
	<input type="file" @change="onChange">
</template>

<script lang="ts">
export default {
	emits: ['result'],
	methods: {
		/**
		 * Реагируем на загрузку файла
		 */
		onChange(e: any) {
			if (!e.target.files || e.target.files.length === 0) {
				return false;
			}
			let file = e.target.files[0];
			let reader: FileReader = new FileReader();
			reader.readAsText(file);
			reader.onload = () => {
				this.result(file.name, reader.result?.split('\r\n'))
			};
		},
		
		/**
		 * Отправляем результат работы компонента
		 */
		result(listName: String, list: String[]) {
			this.$emit('result', { 
				listName,
				list,
			});
		}
	},
}
</script>
