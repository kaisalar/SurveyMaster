package com.kaisalar.android_client.data.models.forGetting

class SingleNumberValueAnswerForGetting(questionId: String, type: String, val content: Content)
    : AnswerForGetting(questionId, type) {
    inner class Content(val value: Number)
}