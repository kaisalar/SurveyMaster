package com.kaisalar.android_client.views.adapters

import android.content.Context
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageButton
import android.widget.TextView
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.constants.FILL_URL
import com.kaisalar.android_client.data.models.forGetting.SurveyForGetting
import com.kaisalar.android_client.utils.DateUtils
import com.kaisalar.android_client.views.adapters.SurveysAdapter.Holder

class SurveysAdapter(
    val context: Context,
    private val surveys: List<SurveyForGetting>,
    val onClick: (SurveyForGetting) -> Unit,
    val onShareClick: (String) -> Unit,
    val onCopyClick: (String) -> Unit,
    val onDeleteClick: (String) -> Unit
) : RecyclerView.Adapter<Holder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): Holder {
        val view = LayoutInflater.from(context).inflate(R.layout.survey_list_item, parent, false)
        return Holder(view)
    }

    override fun getItemCount(): Int {
        return surveys.count()
    }

    override fun onBindViewHolder(holder: Holder, position: Int) {
        holder.bindSurvey(surveys[position])
    }

    inner class Holder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        private val titleTextView = itemView.findViewById<TextView>(R.id.responseNumber)
        private val descriptionTextView = itemView.findViewById<TextView>(R.id.surveyDescriptionTextView)
        private val dateTextView = itemView.findViewById<TextView>(R.id.surveyDateTextView)
        private val shareButton = itemView.findViewById<Button>(R.id.surveyShareButton)
        private val copyButton = itemView.findViewById<Button>(R.id.surveyCopyButton)
        private val deleteButton = itemView.findViewById<ImageButton>(R.id.surveyDeleteButton)

        fun bindSurvey(survey: SurveyForGetting) {
            titleTextView.text = survey.title
            if (!survey.description.isBlank()) {
                descriptionTextView.text = survey.description
            } else {
                descriptionTextView.visibility = View.GONE
            }
            dateTextView.text = DateUtils.convertTimeMillis(survey.date)
            shareButton.setOnClickListener {
                val link = "$FILL_URL/${survey._id}"
                onShareClick(link)
            }
            copyButton.setOnClickListener {
                val link = "$FILL_URL/${survey._id}"
                onCopyClick(link)
            }
            deleteButton.setOnClickListener {
                onDeleteClick(survey._id)
            }
            itemView.setOnClickListener {
                onClick(survey)
            }
        }
    }
}