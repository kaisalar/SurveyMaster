package com.kaisalar.android_client.data.models.forGetting

class MultipleChoiceAnswerContent(val choices: List<String>)

class MultipleChoiceAnswerForGetting(questionId: String, type: String, val content: MultipleChoiceAnswerContent) :
    AnswerForGetting(questionId, type)
