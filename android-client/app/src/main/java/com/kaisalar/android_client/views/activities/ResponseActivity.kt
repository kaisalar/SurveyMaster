package com.kaisalar.android_client.views.activities

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.constants.EXTRA_RESPONSE_ID
import com.kaisalar.android_client.data.constants.EXTRA_SURVEY_ID
import com.kaisalar.android_client.data.models.forGetting.AnswerForGetting
import com.kaisalar.android_client.data.models.forGetting.QuestionForGetting
import com.kaisalar.android_client.data.services.SurveyService
import com.kaisalar.android_client.views.adapters.AnswersAdapter
import com.kaisalar.android_client.views.toasts.ErrorToast
import kotlinx.android.synthetic.main.activity_response.*

class ResponseActivity : AppCompatActivity() {

    private val answers = mutableListOf<AnswerForGetting>()
    private val questions = mutableListOf<QuestionForGetting>()
    private lateinit var globalAdapter: AnswersAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_response)

        supportActionBar!!.setDisplayHomeAsUpEnabled(true)
        supportActionBar!!.setDisplayShowHomeEnabled(true)

        val responseId = intent.getStringExtra(EXTRA_RESPONSE_ID)
        val surveyId = intent.getStringExtra(EXTRA_SURVEY_ID)
        supportActionBar!!.title = "Response Details"

        val adapter = AnswersAdapter(
            context = this,
            answers = answers,
            questions = questions
        )
        globalAdapter = adapter

        val layoutManager = LinearLayoutManager(this)

        answersRecyclerView.apply {
            this.adapter = adapter
            this.layoutManager = layoutManager
        }

        init(surveyId, responseId)
    }

    private fun init(surveyId: String, responseId: String) {
        SurveyService.getInstance(this).getSurveyResponse(
            surveyId = surveyId,
            responseId = responseId,
            onSuccess = {
                answers.clear()
                answers.addAll(it)
                SurveyService.getInstance(this).getSurveyQuestions(
                    surveyId = surveyId,
                    onSuccess = { qs ->
                        questions.clear()
                        questions.addAll(qs)
                        globalAdapter.notifyDataSetChanged()
                    },
                    onFailure = {
                        ErrorToast.getInstance(this).show(it)
                    }
                )
            },
            onFailure = {
                ErrorToast.getInstance(this).show(it)
            }
        )
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return true
    }
}
