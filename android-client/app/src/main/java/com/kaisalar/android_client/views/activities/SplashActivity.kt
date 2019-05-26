package com.kaisalar.android_client.views.activities

import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import com.kaisalar.android_client.utils.AuthTokenHandler

class SplashActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val token = AuthTokenHandler.getAuthToken(this)

        if (token.isNullOrBlank()) {
            val intent = Intent(this, AuthenticationActivity::class.java)
            startActivity(intent)
        } else {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }
        finish()
    }
}
