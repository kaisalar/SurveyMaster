package com.kaisalar.android_client.data.models.forCreation

import com.kaisalar.android_client.data.constants.INPUT_TEXT
import com.kaisalar.android_client.data.constants.QUESTION_TEXT

class TextQuestionForCreation : QuestionForCreation {
    val type = QUESTION_TEXT
    val content: Content

    constructor(title: String, description: String, content: Content) : super(title, description) {
        this.content = Content(content)
    }

    constructor(title: String, description: String) : super(title, description) {
        content = Content("", INPUT_TEXT, 1, 255)
    }

    inner class Content {
        var placeHolder: String
        var inputType: String
        var min: Int
        var max: Int

        constructor(placeHolder: String, inputType: String, min: Int, max: Int) {
            this.placeHolder = placeHolder
            this.inputType = inputType
            this.min = min
            this.max = max
        }

        constructor(content: Content) {
            this.placeHolder = content.placeHolder
            this.inputType = content.inputType
            this.min = content.min
            this.max = content.max
        }
    }
}