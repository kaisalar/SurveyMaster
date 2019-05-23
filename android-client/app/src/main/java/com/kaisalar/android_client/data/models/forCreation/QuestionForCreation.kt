package com.kaisalar.android_client.data.models.forCreation

open abstract class QuestionForCreation {
    var title: String
    var description: String
    constructor(title: String, description: String) {
        this.title = title
        this.description = description
    }
}