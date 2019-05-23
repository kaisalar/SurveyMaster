package com.kaisalar.android_client.data.models.forCreation

class PageForCreation {
    var title: String
    var description: String
    var questions = mutableListOf<QuestionForCreation>()

    constructor(title: String, description: String) {
        this.title = title
        this.description = description
    }

    fun addQuestion(question: QuestionForCreation) {
        this.questions.add((question))
    }
}