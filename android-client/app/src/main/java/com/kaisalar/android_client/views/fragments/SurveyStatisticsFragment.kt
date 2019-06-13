package com.kaisalar.android_client.views.fragments

import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.constants.EXTRA_SURVEY_ID
import com.kaisalar.android_client.data.services.SurveyService
import com.kaisalar.android_client.views.toasts.ErrorToast

class SurveyStatisticsFragment : Fragment() {

    private lateinit var surveyService: SurveyService

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_survey_statistics, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        var surveyId = ""
        val bundle = this.arguments
        if (bundle != null) {
            surveyId = bundle.getString(EXTRA_SURVEY_ID)!!
        }

        surveyService = SurveyService.getInstance(context!!)


        surveyService.getSurveyReport(
            surveyId = surveyId,
            onSuccess = {
                Toast.makeText(context, it.answers.count().toString(), Toast.LENGTH_LONG).show()
            },
            onFailure = {
                ErrorToast.getInstance(context!!).show(it)
            }
        )
    }
}
