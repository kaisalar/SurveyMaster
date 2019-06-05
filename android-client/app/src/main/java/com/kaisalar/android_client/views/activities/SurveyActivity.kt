package com.kaisalar.android_client.views.activities

import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.app.AppCompatActivity
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.constants.EXTRA_SURVEY_ID
import com.kaisalar.android_client.data.constants.EXTRA_SURVEY_TITLE
import com.kaisalar.android_client.views.fragments.SurveyResponsesFragment
import com.kaisalar.android_client.views.fragments.SurveyStatisticsFragment
import kotlinx.android.synthetic.main.activity_survey.*

class SurveyActivity : AppCompatActivity() {

    private val responsesFragment = SurveyResponsesFragment()
    private val statisticsFragment = SurveyStatisticsFragment()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_survey)

        supportActionBar!!.setDisplayHomeAsUpEnabled(true)
        supportActionBar!!.setDisplayShowHomeEnabled(true)

        val title = intent.getStringExtra(EXTRA_SURVEY_TITLE)
        val id = intent.getStringExtra(EXTRA_SURVEY_ID)
        supportActionBar!!.title = title

        val bundle = Bundle()
        bundle.putString(EXTRA_SURVEY_ID, id)

        responsesFragment.arguments = bundle
        statisticsFragment.arguments = bundle

        val t = supportFragmentManager.beginTransaction()
        t.add(R.id.surveyContainer, responsesFragment)
        t.commit()

        surveyNavBar.setOnNavigationItemSelectedListener {
            when (it.itemId) {
                R.id.nav_survey_responses -> showFragment(responsesFragment)
                R.id.nav_survey_statistics -> showFragment(statisticsFragment)
            }
            true
        }

    }

    private fun showFragment(fragment: Fragment) {
        val t = supportFragmentManager.beginTransaction()
        t.replace(R.id.surveyContainer, fragment)
        t.commit()
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return true
    }
}
