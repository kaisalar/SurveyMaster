package com.kaisalar.android_client.data.models.forGetting

class TextAnswerForGetting(questionId: String, type: String, val content: Content) :
    AnswerForGetting(questionId, type) {
    inner class Content(val value: String)
}