package com.kaisalar.android_client.views.fragments

import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.models.forGetting.SurveyForGetting
import com.kaisalar.android_client.data.services.SurveyService
import com.kaisalar.android_client.views.activities.CreateNewSurveyActivity
import com.kaisalar.android_client.views.adapters.SurveysAdpater
import com.kaisalar.android_client.views.dialogs.LoadingDialog
import com.kaisalar.android_client.views.toasts.DoneToast
import com.kaisalar.android_client.views.toasts.ErrorToast
import kotlinx.android.synthetic.main.fragment_surveys.*

class SurveysFragment : Fragment() {

    private lateinit var surveyService: SurveyService
    private val surveysList = mutableListOf<SurveyForGetting>()
    private lateinit var globalAdapter: SurveysAdpater

    private val HELPER_NONE = 0
    private val HELPER_LOADING = 1
    private val HELPER_CONNECTION_ERROR = 2

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_surveys, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        surveyService = SurveyService.getInstance(context!!)

        surveysRefreshLayout.setColorSchemeColors(resources.getColor(R.color.color2))

        addNewSurveyButton.setOnClickListener {
            val intent = Intent(context, CreateNewSurveyActivity::class.java)
            startActivity(intent)
        }

        val adapter = SurveysAdpater(
            context = context!!,
            surveys = surveysList,
            onShareClick = {},
            onCopyClick = {},
            onDeleteClick = {
                deleteSurvey(it)
            }
        )
        globalAdapter = adapter

        val layoutManager = LinearLayoutManager(context)

        surveysRecyclerView.apply {
            this.adapter = adapter
            this.layoutManager = layoutManager
        }

        init()

        surveysRefreshLayout.setOnRefreshListener {
            refreshSurveys()
            surveysRefreshLayout.isRefreshing = false
        }
    }

    private fun refreshSurveys() {
        surveyService.getSurveys(
            onSuccess = {
                surveysList.clear()
                surveysList.addAll(it)
                globalAdapter.notifyDataSetChanged()
                showHelperLayout(HELPER_NONE)
            },
            onFailure = {
                ErrorToast.getInstance(context!!).show(it)
            }
        )
    }

    private fun init() {
        showHelperLayout(HELPER_LOADING)
        loadingHelperLayout.visibility = View.VISIBLE
        surveyService.getSurveys(
            onSuccess = {
                surveysList.clear()
                surveysList.addAll(it)
                globalAdapter.notifyDataSetChanged()
                showHelperLayout(HELPER_NONE)
            },
            onFailure = {
                showHelperLayout(HELPER_CONNECTION_ERROR)
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

    private fun deleteSurvey(surveyId: String) {
        val loadingDialog = LoadingDialog.getInstance(context!!)
        loadingDialog.show()
        val removedSurvey = surveysList.find { s -> s._id == surveyId }
        val removedIndex = surveysList.indexOf(removedSurvey)
        surveyService.deleteSurvey(
            surveyId = surveyId,
            onSuccess = {
                surveysList.removeAt(removedIndex)
                loadingDialog.dismiss()
                globalAdapter.notifyItemRemoved(removedIndex)
                DoneToast.getInstance(context!!).show("Survey deleted successfully")
            },
            onFailure = {
                loadingDialog.dismiss()
                ErrorToast.getInstance(context!!).show(it)
            }
        )
    }
}
