package com.kaisalar.android_client.data.models.forGetting

class TextAnswerContent(val value: String)

class TextAnswerForGetting(
    questionId: String,
    type: String,
    val content: TextAnswerContent,
    question: QuestionForGetting
) : AnswerForGetting(questionId, type, question)