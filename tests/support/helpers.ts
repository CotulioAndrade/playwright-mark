import { expect, APIRequestContext } from '@playwright/test'
import { TaskModel } from '../fixtures/task.model'

require('dotenv').config()
const BASE_API = process.env.BASE_API

//Custom Helpers
/**
 * funções para todos projeto
 * Ex: API helpers para ambiente de testes para deletar ou criar massa de teste
 */
export async function deleteTaskByHelper(request: APIRequestContext, taskName: string) {
    await request.delete(`${BASE_API}/helper/tasks/${taskName}`)
}
export async function postTask(request: APIRequestContext, task: TaskModel) {
    const newTask = await request.post(`${BASE_API}/tasks`, { data: task })
    expect(newTask.ok()).toBeTruthy()
}