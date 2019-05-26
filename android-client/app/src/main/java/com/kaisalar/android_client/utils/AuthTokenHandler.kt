package com.kaisalar.android_client.utils

import android.content.Context
import android.preference.PreferenceManager

object AuthTokenHandler {
    fun getAuthToken(context: Context): String? {
        val sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)
        return sharedPreferences.getString("token", "")
    }

    fun putAuthToken(context: Context, token: String) {
        val sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)
        val editor = sharedPreferences.edit()
        editor.putString("token", token)
        editor.apply()
    }

    fun clearAuthToken(context: Context) {
        val sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)
        val editor = sharedPreferences.edit()
        editor.putString("token", "")
        editor.apply()
    }
}