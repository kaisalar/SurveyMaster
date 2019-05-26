package com.kaisalar.android_client.data.models.forCreation

import com.kaisalar.android_client.data.constants.QUESTION_PARAGRAPH

class ParagraphQuestionForCreation : QuestionForCreation {
    val type = QUESTION_PARAGRAPH
    var content: Content

    constructor(title: String, description: String, content: Content) : super(title, description) {
        this.content = Content(content)
    }

    constructor(title: String, description: String) : super(title, description) {
        content = Content("", 0, 0)
    }

    inner class Content {
        var placeholder: String
        var min: Int
        var max: Int

        constructor(placeholder: String, min: Int, max: Int) {
            this.placeholder = placeholder
            this.min = min
            this.max = max
        }

        constructor(content: Content) {
            this.placeholder = content.placeholder
            this.min = content.min
            this.max = content.max
        }
    }
}