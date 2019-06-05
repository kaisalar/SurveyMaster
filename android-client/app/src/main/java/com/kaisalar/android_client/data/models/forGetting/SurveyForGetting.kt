package com.kaisalar.android_client.data.models.forGetting

class SurveyForGetting(
    val _id: String,
    val title: String,
    val description: String,
    val link: String,
    val date: Long,
    val users: List<UserForSurvey>
)