package com.kaisalar.android_client.data.models.forGetting

class RangeAnswerContent(val minValue: Number, val maxValue: Number)

class RangeAnswerForGetting(questionId: String, type: String, val content: RangeAnswerContent)
    : AnswerForGetting(questionId, type)