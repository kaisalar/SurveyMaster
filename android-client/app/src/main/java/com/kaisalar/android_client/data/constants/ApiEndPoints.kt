package com.kaisalar.android_client.data.constants

const val BASE_URL = "http://192.168.1.102:5000/"
const val API_URL = "${BASE_URL}api/"

// Auth Service
const val CREATE_USER_URL = "${API_URL}users"
const val AUTH_USER_URL = "${API_URL}auth"

// Survey Service
const val POST_SURVEY_URL = "${API_URL}surveys"
const val GET_SURVEYS_URL = "${API_URL}surveys"
const val DELETE_SURVEYS_URL = "${API_URL}surveys"

fun surveyResponsesUrl(surveyId: String) : String {
    return "$GET_SURVEYS_URL/$surveyId/responses"
}

fun surveyResponseUrl(surveyId: String, responseId: String) : String {
    return "$GET_SURVEYS_URL/$surveyId/responses/$responseId"
}

fun surveyReportUrl(surveyId: String) : String {
    return "$GET_SURVEYS_URL/$surveyId/report"
}

// Fill
const val FILL_URL = "http://192.168.43.226:3000/fill"