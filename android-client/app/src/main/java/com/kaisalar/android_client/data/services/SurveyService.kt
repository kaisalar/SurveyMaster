package com.kaisalar.android_client.data.services

import android.content.Context
import android.widget.Toast
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.beust.klaxon.Klaxon
import com.kaisalar.android_client.data.constants.POST_SURVEY_URL
import com.kaisalar.android_client.data.models.forCreation.SurveyForCreation
import com.kaisalar.android_client.utils.AuthTokenHandler

class SurveyService(val context: Context) {

    companion object {
        fun getInstance(context: Context): SurveyService {
            return SurveyService(context)
        }
    }

    private val requestQueue = Volley.newRequestQueue(context)

    fun postSurvey(survey: SurveyForCreation, onSuccess: () -> Unit, onFailure: (String) -> Unit) {
        val requestBody = Klaxon().toJsonString(survey)
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
                Toast.makeText(context, requestBody, Toast.LENGTH_LONG).show()
                onFailure(result)
            }
        ) {
            override fun getBodyContentType(): String {
                return "application/json; charset=utf-8"
            }

            override fun getBody(): ByteArray {
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
}