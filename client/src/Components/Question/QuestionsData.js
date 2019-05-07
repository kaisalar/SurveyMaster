import * as Qtypes from './QuestionTypes'
export default [
      { label: "Short Text", value: Qtypes.TEXT,role: "Text Answer" },
      { label: "Paragraph", value: Qtypes.PARAGRAPH,role: "Text Answer" },
      { label: "Radio Group", value: Qtypes.RADIO_GROUP,role: "Muliple Choise"  },
      { label: "Checkbox", value: Qtypes.CHECKBOX,role: "Muliple Choise" },
      { label: "Dropdown Menu", value: Qtypes.DROPDOWN,role: "Muliple Choise" },
      { label: "Rating", value: Qtypes.RATING,role: "Slider" },
      { label: "Slider", value: Qtypes.SLIDER,role: "Slider" },
      { label: "Range", value: Qtypes.RANGE,role: "Slider" },
    ];