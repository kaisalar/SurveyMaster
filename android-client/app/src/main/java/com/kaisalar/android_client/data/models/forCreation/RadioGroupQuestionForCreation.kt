package com.kaisalar.android_client.data.models.forCreation

import com.kaisalar.android_client.data.constants.QUESTION_RADIO_GROUP

class RadioGroupQuestionForCreation : MultipleChoiceQuestionForCreation {
    val type = QUESTION_RADIO_GROUP

    constructor(title: String, description: String, content: Content) : super(title, description, content)

    constructor(title: String, description: String) : super(title, description)
}