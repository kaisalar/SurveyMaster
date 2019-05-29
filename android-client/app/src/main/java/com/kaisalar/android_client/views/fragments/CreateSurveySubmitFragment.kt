package com.kaisalar.android_client.views.fragments

import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.services.SurveyService
import com.kaisalar.android_client.views.activities.CreateNewSurveyActivity
import com.kaisalar.android_client.views.dialogs.LoadingDialog
import com.kaisalar.android_client.views.toasts.DoneToast
import com.kaisalar.android_client.views.toasts.ErrorToast
import kotlinx.android.synthetic.main.fragment_create_survey_submit.*

class CreateSurveySubmitFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_create_survey_submit, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        createSurveySubmitButton.setOnClickListener {
            val loadingDialog = LoadingDialog.getInstance(context!!)
            loadingDialog.show()
            SurveyService.getInstance(context!!).postSurvey(
                survey = CreateNewSurveyActivity.survey,
                onSuccess = {
                    loadingDialog.dismiss()
                    DoneToast.getInstance(context!!).show("Survey Created Successfully")
                    activity?.onBackPressed()
                },
                onFailure = {
                    loadingDialog.dismiss()
                    ErrorToast.getInstance(context!!).show(it)
                }
            )
        }
    }

    override fun onResume() {
        super.onResume()
        createSurveyTitleTextView.text = CreateNewSurveyActivity.survey.title
        createSurveyDiscriptionTextView.text = CreateNewSurveyActivity.survey.description
    }
}
