package com.kaisalar.android_client.views.fragments

import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.github.mikephil.charting.data.PieData
import com.github.mikephil.charting.data.PieDataSet
import com.github.mikephil.charting.data.PieEntry
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.constants.MATERIAL_COLORS
import kotlinx.android.synthetic.main.fragment_pie_chart.*
import kotlinx.android.synthetic.main.fragment_pie_chart.report_question_title

class PieChartFragment : Fragment() {

    lateinit var questionTitle: String
    lateinit var labels: ArrayList<String>
    lateinit var values: ArrayList<Int>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            questionTitle = it.getString("REPORT_Q_TITLE", "Question Title ?")!!
            labels = it.getStringArrayList("REPORT_LABEL_ARRAY")!!
            values = it.getIntegerArrayList("REPORT_VALUE_ARRAY")!!
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_pie_chart, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        // Title
        report_question_title.text = questionTitle

        buildPieChart()
    }

    companion object {
        @JvmStatic
        fun newInstance(questionTitle: String, labels: ArrayList<String>, values: ArrayList<Int>) =
            PieChartFragment().apply {
                arguments = Bundle().apply {
                    putString("REPORT_Q_TITLE", questionTitle)
                    putStringArrayList("REPORT_LABEL_ARRAY", labels)
                    putIntegerArrayList("REPORT_VALUE_ARRAY", values)
                }
            }
    }

    private fun buildPieChart() {
        val pieValues = ArrayList<PieEntry>()

        for ((index, label) in labels.withIndex()) {
            if(values[index] > 0)
                pieValues.add(PieEntry(values[index].toFloat(), label))
        }

        val dataSet = PieDataSet(pieValues, "")
        // dataSet.valueTextSize=0f

        dataSet.colors = MATERIAL_COLORS

        val data = PieData(dataSet)
        pie_chart.data = data

        // Pie Chart Properties
//        pie_chart.setUsePercentValues(true)
        pie_chart.centerTextRadiusPercent = 0f
        pie_chart.holeRadius = 0.0f
        pie_chart.transparentCircleRadius = 0f
        pie_chart.legend.isEnabled = false
        pie_chart.description.isEnabled = false
//        pie_chart.isDrawHoleEnabled = false
    }
}
