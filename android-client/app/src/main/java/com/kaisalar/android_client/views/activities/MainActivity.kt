package com.kaisalar.android_client.views.activities

import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.app.AppCompatActivity
import com.kaisalar.android_client.R
import com.kaisalar.android_client.views.fragments.HomeFragment
import com.kaisalar.android_client.views.fragments.ProfileFragment
import com.kaisalar.android_client.views.fragments.SettingsFragment
import com.kaisalar.android_client.views.fragments.SurveysFragment
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private val homeFragment = HomeFragment()
    private val surveysFragment = SurveysFragment()
    private val profileFragment = ProfileFragment()
    private val settingsFragment = SettingsFragment()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val t = supportFragmentManager.beginTransaction()
        t.add(R.id.container, homeFragment)
        t.commit()

        navBar.setOnNavigationItemSelectedListener {
            when (it.itemId) {
                R.id.nav_home -> showFragment(homeFragment)
                R.id.nav_list -> showFragment(surveysFragment)
                R.id.nav_profile -> showFragment(profileFragment)
                R.id.nav_settings -> showFragment(settingsFragment)
            }
            true
        }
    }

    private fun showFragment(fragment: Fragment) {
        val t = supportFragmentManager.beginTransaction()
        t.replace(R.id.container, fragment)
        t.commit()
    }
}
