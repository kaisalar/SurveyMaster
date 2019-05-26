package com.kaisalar.android_client.data.models.forCreation

open class MultipleChoiceQuestionForCreation : QuestionForCreation {
    var content: Content

    constructor(title: String, description: String, content: Content) : super(title, description) {
        this.content = Content(content)
    }

    constructor(title: String, description: String) : super(title, description)  {
        this.content = Content(mutableListOf())
    }
    open inner class Content {
        var choices = mutableListOf<String>()

        constructor()

        constructor(choices: List<String>) {
            this.choices.addAll(choices)
        }

        constructor(content: Content) : this(content.choices)
    }
}