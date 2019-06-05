package com.kaisalar.android_client.data.services

import android.content.Context
import com.android.volley.NetworkResponse
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.beust.klaxon.Klaxon
import com.kaisalar.android_client.data.constants.AUTH_USER_URL
import com.kaisalar.android_client.data.constants.CREATE_USER_URL
import com.kaisalar.android_client.data.models.forCreation.UserForCreation

class AuthService(val context: Context) {

    companion object {
        fun getInstance(context: Context): AuthService {
            return AuthService(context)
        }
    }

    private val requestQueue = Volley.newRequestQueue(context)

    fun createNewUser(user: UserForCreation, onSuccess: (String) -> Unit, onFailure: (String) -> Unit) {
        val request = object : StringRequest(
            Method.POST,
            CREATE_USER_URL,
            Response.Listener<String> {
                onSuccess(it)
            },
            Response.ErrorListener {
                if (it.message != null)
                    onFailure(it.message!!)
                onFailure("")
            }
        ) {
            override fun getBodyContentType(): String {
                return "application/json; charset=utf-8"
            }

            override fun getBody(): ByteArray {
                val requestBody = Klaxon().toJsonString(user)
                return requestBody.toByteArray()
            }

            override fun parseNetworkResponse(response: NetworkResponse?): Response<String> {
                val token = response?.headers?.get("x-auth-token")!!
                return Response.success(token, null)
            }
        }

        requestQueue.add(request)
    }

    fun authUser(email: String, password: String, onSuccess: (String) -> Unit, onFailure: (String) -> Unit) {
        class LoginInfo(val email: String, val password: String)

        val request = object : StringRequest(
            Method.POST,
            AUTH_USER_URL,
            Response.Listener<String> {
                onSuccess(it)
            },
            Response.ErrorListener {
                onFailure("")
            }
        ) {
            override fun getBodyContentType(): String {
                return "application/json; charset=utf-8"
            }

            override fun getBody(): ByteArray {
                val requestBody = Klaxon().toJsonString(LoginInfo(email, password))
                return requestBody.toByteArray()
            }
        }

        requestQueue.add(request)
    }
}