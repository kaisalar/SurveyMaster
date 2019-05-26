package com.kaisalar.android_client.views.fragments

import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import com.kaisalar.android_client.R
import com.kaisalar.android_client.views.activities.CreateNewSurveyActivity
import kotlinx.android.synthetic.main.fragment_create_survey_basic_info.*

class CreateSurveyBasicInfoFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_create_survey_basic_info, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
    }

    override fun onPause() {
        super.onPause()
        CreateNewSurveyActivity.survey.apply {
            this.title = createSurveyTitleEditText.text.toString()
            this.description = createSurveyDescriptionEditText.text.toString()
        }
    }
}
