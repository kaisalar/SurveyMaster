package com.kaisalar.android_client.views.activities

import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.app.AppCompatActivity
import com.kaisalar.android_client.R
import com.kaisalar.android_client.views.fragments.LoginFragment
import com.kaisalar.android_client.views.fragments.SignUpFragment
import kotlinx.android.synthetic.main.activity_authentication.*

class AuthenticationActivity : AppCompatActivity() {

    private val loginFragment = LoginFragment()
    private val signUpFragment = SignUpFragment()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_authentication)

        val t = supportFragmentManager.beginTransaction()
        t.add(R.id.authContainer, loginFragment)
        t.commit()

        authNavBar.setOnNavigationItemSelectedListener {
            when (it.itemId) {
                R.id.nav_login -> showFragment(loginFragment)
                R.id.nav_signup -> showFragment(signUpFragment)
            }
            true
        }
    }

    private fun showFragment(fragment: Fragment) {
        val t = supportFragmentManager.beginTransaction()
        t.replace(R.id.authContainer, fragment)
        t.commit()
    }
}
