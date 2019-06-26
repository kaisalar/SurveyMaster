package com.kaisalar.android_client.views.fragments

import android.graphics.Color
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.Animation
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.data.Entry
import com.github.mikephil.charting.data.LineData
import com.github.mikephil.charting.data.LineDataSet
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet
import com.kaisalar.android_client.R
import com.kaisalar.android_client.data.constants.MATERIAL_COLORS
import com.kaisalar.android_client.data.models.CustomValueFormater
import kotlinx.android.synthetic.main.fragment_line_chart.*
import kotlinx.android.synthetic.main.fragment_line_chart.report_question_title


class LineChartFragment : Fragment() {

    lateinit var questionTitle: String
    lateinit var labels: ArrayList<String>
    lateinit var values: ArrayList<Int>
    var isRange: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            questionTitle = it.getString("REPORT_Q_TITLE", "Question Title ?")!!
            labels = it.getStringArrayList("REPORT_LABEL_ARRAY")!!
            values = it.getIntegerArrayList("REPORT_VALUE_ARRAY")!!
            isRange = it.getBoolean("REPORT_IS_RANGE")
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_line_chart, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        // Title
        report_question_title.text = questionTitle

        buildLineChart()
    }

    companion object {
        @JvmStatic
        fun newInstance(questionTitle: String, labels: ArrayList<String>, values: ArrayList<Int>, isRange: Boolean) =
            LineChartFragment().apply {
                arguments = Bundle().apply {
                    putString("REPORT_Q_TITLE", questionTitle)
                    putStringArrayList("REPORT_LABEL_ARRAY", labels)
                    putIntegerArrayList("REPORT_VALUE_ARRAY", values)
                    putBoolean("REPORT_IS_RANGE", isRange)
                }
            }
    }

    private fun buildLineChart() {
        val lineValues = ArrayList<Entry>()

        for((index, _) in labels.withIndex()){
            lineValues.add(Entry(index.toFloat(), values[index].toFloat()))
        }

        val dataSet = LineDataSet(lineValues, "")

        // dataSet Properties
        // dataSet.fillAlpha = 110
        // dataSet.setFillColor(Color.RED);

        // set the line to be drawn like this "- - - - - -"
        // dataSet.enableDashedLine(5f, 5f, 0f);
        // dataSet.enableDashedHighlightLine(10f, 5f, 0f);

        dataSet.color = Color.BLUE
        dataSet.colors = MATERIAL_COLORS
        dataSet.setCircleColor(Color.BLUE)
        dataSet.lineWidth = 1f
        dataSet.circleRadius = 3f
        dataSet.setDrawCircleHole(true)
        dataSet.valueTextSize = 0f
        dataSet.setDrawFilled(false)
        // if range question make it cubic and fill it
        if(isRange){
            dataSet.mode = LineDataSet.Mode.CUBIC_BEZIER
            dataSet.setDrawFilled(true)
        }

        val dataSets = ArrayList<ILineDataSet>()
        dataSets.add(dataSet)
        val data = LineData(dataSets)

        // set data
        line_chart.data = data

        // Line Chart Properties
        line_chart.description.isEnabled = false
        line_chart.legend.isEnabled = false
        line_chart.setPinchZoom(true)

        // set Custom Value to xAxis
        line_chart.xAxis.setLabelCount(labels.count(), true)
        line_chart.xAxis.valueFormatter = CustomValueFormater(labels)
//        line_chart.xAxis.labelCount = labels.count()
//        line_chart.xAxis.setCenterAxisLabels(true)
        line_chart.xAxis.position = XAxis.XAxisPosition.BOTTOM
//        line_chart.xAxis.setDrawAxisLine(false)
//        line_chart.xAxis.setDrawGridLines(false)

//        xAxis.setDrawGridLines(false);
//        xAxis.setDrawAxisLine(false);

        // set net
        line_chart.xAxis.enableGridDashedLine(5f, 5f, 0f)
        line_chart.axisRight.enableGridDashedLine(5f, 5f, 0f)
        line_chart.axisLeft.enableGridDashedLine(5f, 5f, 0f)
        //lineChart.setDrawGridBackground()

        line_chart.animateY(1500)
    }
}
