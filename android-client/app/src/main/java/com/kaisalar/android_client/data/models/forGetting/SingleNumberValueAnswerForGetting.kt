package com.kaisalar.android_client.data.models.forGetting

class SignelNumberValueAnswerContent(val value: Number)

class SingleNumberValueAnswerForGetting(questionId: String, type: String, val content: SignelNumberValueAnswerContent)
    : AnswerForGetting(questionId, type)