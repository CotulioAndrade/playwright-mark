import { Page, expect, Locator } from '@playwright/test'
import { TaskModel } from '../../../fixtures/task.model'

export class TasksPage {
    readonly page: Page
    readonly inputNewTask: Locator
    readonly buttonCreateTask: Locator
    readonly targetTaskInput: Locator

    constructor(page: Page) {
        this.page = page
        this.inputNewTask = page.locator('#newTask')
        this.buttonCreateTask = page.locator('css=button >> text=Create')
    }

    async goToPage() {
        await this.page.goto('/')
    }

    async createTaks(task: TaskModel) {
        await this.inputNewTask.fill(task.name)
        await this.buttonCreateTask.click()
    }

    async shouldHaveText(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(target).toBeVisible()
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('.swal2-html-container')
        await expect(target).toHaveText(text)
    }

    async toggle(taskName: string) {
        const target = this.page.locator(`//p[text()="${taskName}"]/..//button[contains(@class, "Toggle")]`)
        await target.click()
    }

    async removeTask(taskName: string) {
        const target = this.page.locator(`//p[text()="${taskName}"]/..//button[contains(@class, "Delete")]`)
        await target.click()
    }

    async shouldBeDone(taskName: string) {
        const target = this.page.getByText(taskName)
        await expect(target).toHaveCSS('text-decoration-line', 'line-through')
    }

    async shouldNotExist(taskName: string) {
        const target = this.page.locator(`css=.task-item p >> text=${taskName}`)
        await expect(target).not.toBeVisible()
    }

}