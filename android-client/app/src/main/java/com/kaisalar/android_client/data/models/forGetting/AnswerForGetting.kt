package com.kaisalar.android_client.data.models.forGetting

open class AnswerForGetting {
    val questionId: String
    val type: String
    constructor(questionId: String, type: String) {
        this.questionId = questionId
        this.type = type
    }
}