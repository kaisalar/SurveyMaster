package com.kaisalar.android_client.data.models.forGetting

class SingleNumberValueAnswerContent(val value: Number)

class SingleNumberValueAnswerForGetting(
    questionId: String,
    type: String,
    val content: SingleNumberValueAnswerContent,
    question: QuestionForGetting
) : AnswerForGetting(questionId, type, question)