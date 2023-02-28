import { expect, test } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { deleteTaskByHelper, postTask } from './support/helpers'
import { TasksPage } from './support/pages/tasks'
import data from './fixtures/tasks.json'

let taskPage: TasksPage

test.beforeEach(({ page }) => {
    taskPage = new TasksPage(page)
})
 
test.describe('Cadastro', () => {
    test('CN001: Nova tarefa', async ({ request }) => {
        const task = data.success as TaskModel

        await deleteTaskByHelper(request, task.name)

        await taskPage.goToPage()
        await taskPage.createTaks(task)
        await taskPage.shouldHaveText(task.name)
    })

    test('CN002: Não duplicar tarefa', async ({ request }) => {
        const task = data.duplicate as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await taskPage.goToPage()
        await taskPage.createTaks(task)
        await taskPage.alertHaveText('Task already exists!')

    })

    test('CN003: Campo tarefas obrigatório', async () => {
        const task = data.required as TaskModel

        await taskPage.goToPage()
        await taskPage.createTaks(task)

        const validationMessage = await taskPage.inputNewTask.evaluate(e => (e as HTMLInputElement).validationMessage)
        await expect(validationMessage).toEqual('This is a required field')
    })
}) 

test.describe('Atualização', () => {

    test('CN004: Concluir tarefa adicionada', async ({ request }) => {

        const task = data.update as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await taskPage.goToPage()
        await taskPage.toggle(task.name)
        await taskPage.shouldBeDone(task.name)
    })
})

test.describe('Excluir', () => {

    test('CN001: Tarefa', async ({ request }) => {

        const task = data.delete as TaskModel

        await deleteTaskByHelper(request, task.name)
        await postTask(request, task)

        await taskPage.goToPage()
        await taskPage.removeTask(task.name)
        await taskPage.shouldNotExist(task.name)
    })
})