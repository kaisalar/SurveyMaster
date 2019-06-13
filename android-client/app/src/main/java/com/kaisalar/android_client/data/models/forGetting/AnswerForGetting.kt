package com.kaisalar.android_client.data.models.forGetting

open class AnswerForGetting {
    val questionId: String
    val type: String
    val question: QuestionForGetting
    constructor(
        questionId: String,
        type: String,
        question: QuestionForGetting
    ) {
        this.questionId = questionId
        this.type = type
        this.question = question
    }
}