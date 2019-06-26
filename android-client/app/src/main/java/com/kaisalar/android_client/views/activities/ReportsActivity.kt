package com.kaisalar.android_client.views.activities

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v4.app.Fragment
import android.widget.Toast
import com.beust.klaxon.Klaxon
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.constants.*
import com.kaisalar.android_client.data.models.forGetting.ReportAnswerForGetting
import com.kaisalar.android_client.data.models.forGetting.ReportForGetting
import com.kaisalar.android_client.data.services.SurveyService
import com.kaisalar.android_client.views.fragments.BarChartFragment
import com.kaisalar.android_client.views.fragments.LineChartFragment
import com.kaisalar.android_client.views.fragments.PieChartFragment
import com.kaisalar.android_client.views.fragments.SettingsFragment
import com.kaisalar.android_client.views.toasts.ErrorToast
import kotlinx.android.synthetic.main.activity_reports.*


lateinit var reportForGetting: ReportForGetting

class ReportsActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_reports)


        reportForGetting = Klaxon().parse<ReportForGetting>(json)!!


        // TODO:  get Survey ID
//        val surveyId = intent?.extras?.getString(EXTRA_SURVEY_ID)!!
//
//        val surveyService = SurveyService.getInstance(baseContext)
//        surveyService.getSurveyReport(
//            surveyId = surveyId,
//            onSuccess = {
//                reportForGetting = it
//            },
//            onFailure = {
//                ErrorToast.getInstance(baseContext).show(it)
//            }
//        )

        setUpCharts(reportForGetting)
    }

    // Stop Back Button
    override fun onBackPressed() {
        // TODO: Back To Previous Activity

    }

    private fun setUpCharts(report: ReportForGetting) {
        supportFragmentManager.beginTransaction()
            .add(R.id.reportChartContiner, SettingsFragment())
            .commit()

        var i = 0
        decideChart(report.answers[i])

        reportNextButton.setOnClickListener {
            if(i < report.answers.size - 1) {
                i++
                decideChart(report.answers[i])
                Toast.makeText(baseContext, report.answers[i].type, Toast.LENGTH_LONG).show()
            }
        }

        reportPreviuosButton.setOnClickListener {
            if(i > 0) {
                i--
                decideChart(report.answers[i])
                Toast.makeText(baseContext, report.answers[i].type, Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun decideChart(answer: ReportAnswerForGetting){
        when (answer.type) {
            QUESTION_TEXT, QUESTION_PARAGRAPH -> buildBarChart(answer)
            QUESTION_CHECKBOX, QUESTION_RADIO_GROUP, QUESTION_DROPDOWN -> buildPieChart(answer)
            QUESTION_SLIDER, QUESTION_RATING -> buildLineChart(answer, false)
            QUESTION_RANGE -> buildLineChart(answer, true)
            else -> {
                buildBarChart(answer)
            }
        }
    }

    private fun buildBarChart(answer: ReportAnswerForGetting) {
        val questionTitle = answer.title
        val labels = ArrayList<String>()
        labels.addAll(answer.content.keys)
        val values = ArrayList<Int>()
        values.addAll(answer.content.values)
        showFragment(BarChartFragment.newInstance(questionTitle, labels, values), true)
    }

    private fun buildPieChart(answer: ReportAnswerForGetting) {
        val questionTitle = answer.title
        val labels = ArrayList<String>()
        labels.addAll(answer.content.keys)
        val values = ArrayList<Int>()
        values.addAll(answer.content.values)
        showFragment(PieChartFragment.newInstance(questionTitle, labels, values), true)
    }

    private fun buildLineChart(answer: ReportAnswerForGetting, isRange: Boolean) {
        val questionTitle = answer.title
        val labels = ArrayList<String>()
        labels.addAll(answer.content.keys)
        val values = ArrayList<Int>()
        values.addAll(answer.content.values)
        showFragment(LineChartFragment.newInstance(questionTitle, labels, values, isRange), true)
    }

    private fun showFragment(fragment: Fragment, addToBackStack: Boolean) {
        val mFragment = supportFragmentManager.beginTransaction()
        mFragment.replace(R.id.reportChartContiner, fragment)
        if (addToBackStack) mFragment.addToBackStack(fragment.toString())
        mFragment.commit()
    }
}
