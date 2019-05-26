package com.kaisalar.android_client.data.models.forCreation

import com.kaisalar.android_client.data.constants.QUESTION_CHECKBOX

class CheckBoxQuestionForCreation : MultipleChoiceQuestionForCreation {
    val type = QUESTION_CHECKBOX

    constructor(title: String, description: String, content: Content) : super(title, description, content)

    constructor(title: String, description: String) : super(title, description)
}