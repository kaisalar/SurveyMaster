package com.kaisalar.android_client.views.fragments

import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.constants.EXTRA_RESPONSE_ID
import com.kaisalar.android_client.data.constants.EXTRA_SURVEY_ID
import com.kaisalar.android_client.data.models.forGetting.ResponseForGetting
import com.kaisalar.android_client.data.services.SurveyService
import com.kaisalar.android_client.views.activities.ResponseActivity
import com.kaisalar.android_client.views.adapters.ResponsesAdapter
import com.kaisalar.android_client.views.toasts.ErrorToast
import kotlinx.android.synthetic.main.fragment_survey_responses.*

class SurveyResponsesFragment : Fragment() {

    private lateinit var surveyService: SurveyService
    lateinit var globalAdapter: ResponsesAdapter
    private val responses = mutableListOf<ResponseForGetting>()

    private val HELPER_NONE = 0
    private val HELPER_LOADING = 1
    private val HELPER_CONNECTION_ERROR = 2

    lateinit var surveyId: String

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_survey_responses, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val bundle = this.arguments
        if (bundle != null) {
            surveyId = bundle.getString(EXTRA_SURVEY_ID)!!
        }

        surveyService = SurveyService.getInstance(context!!)

        responsesRefreshLayout.setColorSchemeColors(resources.getColor(com.kaisalar.android_client.R.color.color2))

        val adapter = ResponsesAdapter(
            context = context!!,
            responses = responses,
            onClick = {
                onResponseClick(it)
            }
        )
        globalAdapter = adapter

        val layoutManager = LinearLayoutManager(context)

        responsesRecyclerView.apply {
            this.adapter = adapter
            this.layoutManager = layoutManager
        }

        init()

        responsesRefreshLayout.setOnRefreshListener {
            refreshResponses()
            responsesRefreshLayout.isRefreshing = false
        }
    }

    private fun init() {
        showHelperLayout(HELPER_LOADING)
        surveyService.getSurveyResponses(
            surveyId = surveyId,
            onSuccess = {
                responses.clear()
                responses.addAll(it)
                globalAdapter.notifyDataSetChanged()
                showHelperLayout(HELPER_NONE)
            },
            onFailure = {
                showHelperLayout(HELPER_CONNECTION_ERROR)
            }
        )
    }

    private fun refreshResponses() {
        surveyService.getSurveyResponses(
            surveyId = surveyId,
            onSuccess = {
                responses.clear()
                responses.addAll(it)
                globalAdapter.notifyDataSetChanged()
                showHelperLayout(HELPER_NONE)
            },
            onFailure = {
                ErrorToast.getInstance(context!!).show(it)
            }
        )
    }

    private fun showHelperLayout(choice: Int) {
        if (connectionErrorHelperLayout != null && loadingHelperLayout != null) {
            when (choice) {
                0 -> {
                    connectionErrorHelperLayout.visibility = View.GONE
                    loadingHelperLayout.visibility = View.GONE
                }
                1 -> {
                    connectionErrorHelperLayout.visibility = View.GONE
                    loadingHelperLayout.visibility = View.VISIBLE
                }
                2 -> {
                    connectionErrorHelperLayout.visibility = View.VISIBLE
                    loadingHelperLayout.visibility = View.GONE
                }
            }
        }
    }

    private fun onResponseClick(response: ResponseForGetting) {
        val intent = Intent(context, ResponseActivity::class.java)
        intent.putExtra(EXTRA_RESPONSE_ID, response._id)
        intent.putExtra(EXTRA_SURVEY_ID, response.surveyId)
        startActivity(intent)
    }
}
