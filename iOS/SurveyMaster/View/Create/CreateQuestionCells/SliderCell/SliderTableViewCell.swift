//
//  SliderTableViewCell.swift
//  SurveyMaster
//
//  Created by Ammar Al-Helali on 6/6/19.
//  Copyright © 2019 Ammar Al-Helali. All rights reserved.
//

import UIKit

class SliderTableViewCell: UITableViewCell {
    
    let TYPE = "QUESTION_SLIDER"
    @IBOutlet var toggle: UISwitch!
    @IBOutlet var slider: UISlider!
    var step : Int?
    var min : Float?
    var max : Float?
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
//        slider.minimumValue = min ?? 0
//        slider.maximumValue = max ?? 0
        slider.addTarget(self, action: #selector(sliderValueChanged), for: UIControl.Event.valueChanged)
        
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
//    @IBAction func valueChanged(_ sender: UISlider) {
//        let newValue = sender.value
//        sender.setValue(newValue + Float(step!), animated: true)
//    }
    
    @objc func sliderValueChanged(sender: UISlider){
        print(sender.value)
        
        //        ValueLabel.text = "\(sender.value)" // Note: not included in this test!!!
        
    }
}