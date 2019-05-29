package com.kaisalar.android_client.data.services

import android.content.Context
import com.android.volley.NetworkResponse
import com.android.volley.Response
import com.android.volley.toolbox.JsonRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.beust.klaxon.Klaxon
import com.kaisalar.android_client.data.constants.DELETE_SURVEYS_URL
import com.kaisalar.android_client.data.constants.GET_SURVEYS_URL
import com.kaisalar.android_client.data.constants.POST_SURVEY_URL
import com.kaisalar.android_client.data.models.forCreation.SurveyForCreation
import com.kaisalar.android_client.data.models.forGetting.SurveyForGetting
import com.kaisalar.android_client.utils.AuthTokenHandler

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