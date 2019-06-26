package com.kaisalar.android_client.views.fragments

import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.data.BarData
import com.github.mikephil.charting.data.BarDataSet
import com.github.mikephil.charting.data.BarEntry
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.constants.JOYFUL_COLORS
import com.kaisalar.android_client.data.models.CustomValueFormater
import kotlinx.android.synthetic.main.fragment_bar_chart.*


class BarChartFragment : Fragment() {

    //lateinit var answer: ReportAnswerForGettingParcelable
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
        return inflater.inflate(R.layout.fragment_bar_chart, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        // Title
        report_question_title.text = questionTitle

        buildBarChart()
    }

    companion object {
        @JvmStatic
        fun newInstance(questionTitle: String, labels: ArrayList<String>, values: ArrayList<Int>) =
            BarChartFragment().apply {
                arguments = Bundle().apply {
                    putString("REPORT_Q_TITLE", questionTitle)
                    putStringArrayList("REPORT_LABEL_ARRAY", labels)
                    putIntegerArrayList("REPORT_VALUE_ARRAY", values)
                }
            }
    }

    private fun buildBarChart() {
        // create BarEntry for Bar Group
        val barGroup = ArrayList<BarEntry>()

        for((index, _) in labels.withIndex()){
            barGroup.add(BarEntry(index.toFloat(), values[index].toFloat(), values[index].toFloat()))
        }

        // creating data set for Bar Group
        val barDataSet = BarDataSet(barGroup, questionTitle)

        barDataSet.valueTextSize = 10f
        barDataSet.setDrawValues(true)
        // set colors
        barDataSet.colors = JOYFUL_COLORS

        val data = BarData(barDataSet)
        bar_chart.data = data


        // Custom xAxis label
        bar_chart.xAxis.valueFormatter = CustomValueFormater(labels)
        bar_chart.xAxis.labelCount = labels.count()
//        bar_chart.xAxis.setLabelCount(labels.count(), true)

        bar_chart.axisLeft.labelCount = 9
        bar_chart.axisRight.labelCount = 9

        // bar_chart Properties
        bar_chart.xAxis.position = XAxis.XAxisPosition.BOTTOM
        bar_chart.xAxis.enableGridDashedLine(5f, 5f, 0f)
        bar_chart.axisRight.enableGridDashedLine(5f, 5f, 0f)
        bar_chart.axisLeft.enableGridDashedLine(5f, 5f, 0f)
        bar_chart.data.setDrawValues(true)
        bar_chart.data.setValueTextSize(10f)
        bar_chart.description.isEnabled = false
        bar_chart.animateY(1000)
        bar_chart.legend.isEnabled = false
        bar_chart.setPinchZoom(true)
    }
}
