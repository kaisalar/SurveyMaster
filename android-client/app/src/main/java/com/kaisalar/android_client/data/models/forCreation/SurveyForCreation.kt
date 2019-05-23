package com.kaisalar.android_client.data.models.forCreation

class SurveyForCreation {
    var title: String
    var description: String
    var pages = mutableListOf<PageForCreation>()

    constructor(title: String, description: String) {
        this.title = title
        this.description = description
    }

    fun addPage(page: PageForCreation) {
        this.pages.add(page)
    }
}