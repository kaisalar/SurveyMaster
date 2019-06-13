package com.kaisalar.android_client.data.services

import android.content.Context
import android.util.Log
import android.widget.Toast
import com.android.volley.NetworkResponse
import com.android.volley.Response
import com.android.volley.VolleyError
import com.android.volley.toolbox.JsonRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.beust.klaxon.Klaxon
import com.kaisalar.android_client.data.constants.*
import com.kaisalar.android_client.data.models.forCreation.SurveyForCreation
import com.kaisalar.android_client.data.models.forGetting.*
import com.kaisalar.android_client.utils.AuthTokenHandler
import org.json.JSONObject

class SurveyService(val context: Context) {

    companion object {
        fun getInstance(context: Context): SurveyService {
            return SurveyService(context)
        }
    }

    private val requestQueue = Volley.newRequestQueue(context)

    fun getSurveys(onSuccess: (List<SurveyForGetting>) -> Unit, onFailure: (String) -> Unit) {
        val request = object : JsonRequest<List<SurveyForGetting>>(
            Method.GET,
            GET_SURVEYS_URL,
            null,
            Response.Listener<List<SurveyForGetting>> {
                onSuccess(it)
            },
            Response.ErrorListener {
                val result = when (it.networkResponse?.statusCode) {
                    400 -> "Bad Request"
                    401 -> "Access Denied"
                    else -> "Connection Error"
                }
                onFailure(result)
            }
        ) {
            override fun getHeaders(): MutableMap<String, String> {
                val headers = HashMap<String, String>()
                val token = AuthTokenHandler.getAuthToken(context)
                if (token != null)
                    headers["x-auth-token"] = token
                return headers
            }

            override fun parseNetworkResponse(response: NetworkResponse?): Response<List<SurveyForGetting>> {
                val json = String(response?.data!!)
                val surveysData = Klaxon().parseArray<SurveyForGetting>(json)
                val surveys = surveysData?.reversed()
                return Response.success(surveys, cacheEntry)
            }
        }
        requestQueue.add(request)
    }

    fun getSurveyQuestions(surveyId: String, onSuccess: (List<QuestionForGetting>) -> Unit, onFailure: (String) -> Unit) {
        val url = "$GET_SURVEYS_URL/$surveyId"
        val request = object : JsonRequest<List<QuestionForGetting>>(
            Method.GET,
            url,
            null,
            Response.Listener<List<QuestionForGetting>> {
                onSuccess(it)
            },
            Response.ErrorListener {
                Toast.makeText(context, it.message, Toast.LENGTH_LONG).show()
                val result = when (it.networkResponse?.statusCode) {
                    400 -> "Bad Request"
                    401 -> "Access Denied"
                    else -> "Connection Error"
                }
                onFailure(result)
            }
        ) {
            override fun getHeaders(): MutableMap<String, String> {
                val headers = HashMap<String, String>()
                val token = AuthTokenHandler.getAuthToken(context)
                if (token != null)
                    headers["x-auth-token"] = token
                return headers
            }

            override fun parseNetworkResponse(response: NetworkResponse?): Response<List<QuestionForGetting>> {
                val json = String(response?.data!!)
                val jsonPages = JSONObject(json).getJSONArray("pages")
                val jsonQuestions = jsonPages.getJSONObject(0).getJSONArray("questions")
                val questions = mutableListOf<QuestionForGetting>()
                for (i in 0 until jsonQuestions.length()) {
                    val obj = jsonQuestions.getJSONObject(i)
                    val question = Klaxon().parse<QuestionForGetting>(obj.toString(0))
                    if (question != null)
                        questions.add(question)
                }
                return Response.success(questions, cacheEntry)

            }
        }

        requestQueue.add(request)
    }

    fun getSurveyResponses(surveyId: String, onSuccess: (List<ResponseForGetting>) -> Unit, onFailure: (String) -> Unit) {
        val url = surveyResponsesUrl(surveyId)
        val request = object : JsonRequest<List<ResponseForGetting>>(
            Method.GET,
            url,
            null,
            Response.Listener {
                onSuccess(it)
            },
            Response.ErrorListener {
                val result = when (it.networkResponse?.statusCode) {
                    400 -> "Bad Request"
                    401 -> "Access Denied"
                    404 -> "Not Found"
                    else -> "Connection Error"
                }
                onFailure(result)
            }
        ) {
            override fun getHeaders(): MutableMap<String, String> {
                val headers = HashMap<String, String>()
                val token = AuthTokenHandler.getAuthToken(context)
                if (token != null)
                    headers["x-auth-token"] = AuthTokenHandler.getAuthToken(context)!!
                return headers
            }

            override fun parseNetworkResponse(response: NetworkResponse?): Response<List<ResponseForGetting>> {
                val json = String(response?.data!!)
                val responses = Klaxon().parseArray<ResponseForGetting>(json)
                return Response.success(responses, cacheEntry)
            }
        }

        requestQueue.add(request)
    }

    fun getSurveyResponse(
        surveyId: String,
        responseId: String,
        onSuccess: (List<AnswerForGetting>) -> Unit,
        onFailure: (String) -> Unit
    ) {
        val url = surveyResponseUrl(surveyId, responseId)
        val request = object : JsonRequest<List<AnswerForGetting>>(
            Method.GET,
            url,
            null,
            Response.Listener {
                onSuccess(it)
            },
            Response.ErrorListener {
                Toast.makeText(context, it.message, Toast.LENGTH_LONG).show()
                Log.d("test_kais", it.message)
                val result = when (it.networkResponse?.statusCode) {
                    400 -> "Bad Request"
                    401 -> "Access Denied"
                    404 -> "Not Found"
                    else -> "Connection Error"
                }
                onFailure(result)
            }
        ) {
            override fun getHeaders(): MutableMap<String, String> {
                val headers = HashMap<String, String>()
                val token = AuthTokenHandler.getAuthToken(context)
                if (token != null)
                    headers["x-auth-token"] = AuthTokenHandler.getAuthToken(context)!!
                return headers
            }

            override fun parseNetworkResponse(response: NetworkResponse?): Response<List<AnswerForGetting>> {
                val json = String(response?.data!!)
                val jsonAnswers = JSONObject(json).getJSONArray("answers")
                val answers = mutableListOf<AnswerForGetting>()
                for (i in 0 until jsonAnswers.length()) {
                    val obj = jsonAnswers.getJSONObject(i)

                    when (obj.getString("type")) {
                        ANSWER_TEXT -> {
                            val answer = Klaxon().parse<TextAnswerForGetting>(obj.toString(0))
                            answers.add(answer!!)
                        }
                        ANSWER_MULTIPLE_CHOICE -> {
                            val answer = Klaxon().parse<MultipleChoiceAnswerForGetting>(obj.toString(0))
                            answers.add(answer!!)
                        }
                        ANSWER_SINGLE_NUMBER_VALUE -> {
                            val answer = Klaxon().parse<SingleNumberValueAnswerForGetting>(obj.toString(0))
                            answers.add(answer!!)
                        }
                        ANSWER_RANGE -> {
                            val answer = Klaxon().parse<RangeAnswerForGetting>(obj.toString(0))
                            answers.add(answer!!)
                        }
                    }
                }
                return Response.success(answers, cacheEntry)
            }
        }

        requestQueue.add(request)
    }

    fun getSurveyReport(surveyId: String, onSuccess: (ReportForGetting) -> Unit, onFailure: (String) -> Unit) {
        val url = surveyReportUrl(surveyId)
        val request = object : JsonRequest<ReportForGetting> (
            Method.GET,
            url,
            null,
            Response.Listener<ReportForGetting> {
                onSuccess(it)
            },
            Response.ErrorListener {
                val result = when (it.networkResponse?.statusCode) {
                    400 -> "Bad Request"
                    401 -> "Access Denied"
                    404 -> "Not Found"
                    else -> "Connection Error"
                }
                onFailure(result)
            }
        ) {
            override fun getHeaders(): MutableMap<String, String> {
                val headers = HashMap<String, String>()
                val token = AuthTokenHandler.getAuthToken(context)
                if (token != null)
                    headers["x-auth-token"] = AuthTokenHandler.getAuthToken(context)!!
                return headers
            }

            override fun parseNetworkResponse(response: NetworkResponse?): Response<ReportForGetting> {
                val json = String(response?.data!!)
                val report = Klaxon().parse<ReportForGetting>(json)
                return Response.success(report, cacheEntry)
            }
        }

        requestQueue.add(request)
    }

    fun postSurvey(survey: SurveyForCreation, onSuccess: () -> Unit, onFailure: (String) -> Unit) {
        val request = object : StringRequest(
            Method.POST,
            POST_SURVEY_URL,
            Response.Listener<String> {
                onSuccess()
            },
            Response.ErrorListener {
                val result = when (it.networkResponse?.statusCode) {
                    400 -> "Bad Request"
                    401 -> "Access Denied"
                    else -> "Connection Error"
                }
                onFailure(result)
            }
        ) {
            override fun getBodyContentType(): String {
                return "application/json; charset=utf-8"
            }

            override fun getBody(): ByteArray {
                val requestBody = Klaxon().toJsonString(survey)
                return requestBody.toByteArray()
            }

            override fun getHeaders(): MutableMap<String, String> {
                val headers = HashMap<String, String>()
                val token = AuthTokenHandler.getAuthToken(context)
                if (token != null)
                    headers["x-auth-token"] = AuthTokenHandler.getAuthToken(context)!!
                return headers
            }

        }

        requestQueue.add(request)
    }

    fun deleteSurvey(surveyId: String, onSuccess: () -> Unit, onFailure: (String) -> Unit) {
        val url = "$DELETE_SURVEYS_URL/$surveyId"
        val request = object : StringRequest(
            Method.DELETE,
            url,
            Response.Listener {
                onSuccess()
            },
            Response.ErrorListener {
                val result = when (it.networkResponse?.statusCode) {
                    400 -> "Bad Request"
                    401 -> "Access Denied"
                    403 -> "Forbidden"
                    else -> "Connection Error"
                }
                onFailure(result)
            }
        ) {
            override fun getHeaders(): MutableMap<String, String> {
                val headers = HashMap<String, String>()
                val token = AuthTokenHandler.getAuthToken(context)
                if (token != null)
                    headers["x-auth-token"] = AuthTokenHandler.getAuthToken(context)!!
                return headers
            }
        }

        requestQueue.add(request)
    }

}