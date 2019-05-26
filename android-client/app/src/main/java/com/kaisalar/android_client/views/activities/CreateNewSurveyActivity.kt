package com.kaisalar.android_client.views.activities

import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.app.AppCompatActivity
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.models.forCreation.SurveyForCreation
import com.kaisalar.android_client.views.fragments.CreateSurveyBasicInfoFragment
import com.kaisalar.android_client.views.fragments.CreateSurveyQuestionsFragment
import com.kaisalar.android_client.views.fragments.CreateSurveySubmitFragment
import kotlinx.android.synthetic.main.activity_create_new_survey.*

class CreateNewSurveyActivity : AppCompatActivity() {



    companion object {
        var survey = SurveyForCreation("", "")
    }

    private val basicInfoFragment = CreateSurveyBasicInfoFragment()
    private val questionsFragment = CreateSurveyQuestionsFragment()
    private val submitFragment = CreateSurveySubmitFragment()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_new_survey)

        supportActionBar!!.title = "Create New Survey"
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)
        supportActionBar!!.setDisplayShowHomeEnabled(true)

        survey = SurveyForCreation("", "")

        val t = supportFragmentManager.beginTransaction()
        t.add(R.id.createSurveyContainer, basicInfoFragment)
        t.commit()

        createSurveyNavBar.setOnNavigationItemSelectedListener {
            when (it.itemId) {
                R.id.nav_create_info -> showFragment(basicInfoFragment)
                R.id.nav_create_questions -> showFragment(questionsFragment)
                R.id.nav_create_submit -> showFragment(submitFragment)
            }
            true
        }


//        addNewQuestionButton.setOnClickListener { onAddNewQuestion(it) }
//
//        val layoutManager = LinearLayoutManager(this)
//
//        createSurveyQuestionsRecyclerView.apply {
//            this.adapter = questionsAdapter
//            this.layoutManager = layoutManager
//        }
    }

    private fun showFragment(fragment: Fragment) {
        val t = supportFragmentManager.beginTransaction()
        t.replace(R.id.createSurveyContainer, fragment)
        t.commit()
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return false
    }
}
